import { Game } from "../Game";
import {
	Color,
	DataTexture,
	RGBFormat,
	LinearFilter,
	HemisphereLight,
	HemisphereLightHelper,
	DirectionalLight,
	DirectionalLightHelper,
	SphereBufferGeometry,
	MeshStandardMaterial,
	Mesh,
	PlaneBufferGeometry,
	MeshPhongMaterial,
	Fog,
	ShadowMaterial,
	sRGBEncoding,
	AnimationMixer,
	Clock,
	AnimationUtils,
	AnimationAction,
	UniformsUtils,
	Object3D,
	ImageUtils,
	CameraHelper,
} from "three";
import { gltfLoader } from "../core/Loader";

import xbot from "../res/Xbot.glb";
import soldier from "../res/Soldier.glb";
import baiditan_01 from "../res/baiditan_01.FBX";
import baiditan_02 from "../res/baiditan_02.png";

import { CoreEvent, CoreEventMap } from "../core/CoreEvent";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { transformControl } from "../lib/TransformControl";

/**
 * 游戏主逻辑
 */
export class GameMainControl {
	constructor() {
		this.init();
	}

	init() {
		this.setBackgroundColor();
		this.addLight();

		gltfLoader.load("../res/solodier.glb", () => {});

		gltfLoader.load(xbot, (e: any) => {
			let mixer: any[] = [];
			for (let x = 0; x < 1; x++) {
				let obj = SkeletonUtils.clone(e.scene) as Object3D;
				Game.scene.add(obj);
				obj.traverse(function (object) {
					object.castShadow = true;
				});
				obj.scale.set(3, 3, 3);
				obj.position.x = 0;

				let additiveActions = ["sneak_pose", "sad_pose", "agree", "headShake"];
				var animations = e.animations;
				let mi = new AnimationMixer(obj);
				mixer.push(mi);

				let numAnimations = animations.length;

				let all: AnimationAction[] = [];
				for (let i = 0; i !== numAnimations; ++i) {
					let clip = animations[i];
					if (additiveActions.includes(clip.name)) {
						//Make the clip additive and remove the reference frame
						//这里也不晓得是干啥的功能反正就是，一些动画可以不重复执行，然后还可以肢体动作和行为动作一起放
						AnimationUtils.makeClipAdditive(clip); //这个大致的意思是可以和另外一个动作一起播
						if (clip.name.endsWith("_pose")) {
							clip = AnimationUtils.subclip(clip, clip.name, 2, 3, 30); //当前动作不循环
						}
					}
					all.push(mi.clipAction(clip));
				}
				all[6].time = 0;
				all[6].play();
				all[6].weight = 1;
				// all[4].play();
				// all[4].weight = 0.5;

				// setTimeout(() => {
				// 	all[3].play();
				// 	all[6].crossFadeTo(all[3], 0.35, true);
				// }, 1000);
			}

			let clock = new Clock();
			CoreEvent.on(CoreEventMap.UPDATE, () => {
				var mixerUpdateDelta = clock.getDelta();
				mixer.forEach((e) => {
					e.update(mixerUpdateDelta);
				});
			});
		});
	}

	/**
	 * 添加灯光
	 */
	private addLight() {
		//半球灯光
		let hemisphereLight = new HemisphereLight();
		Game.scene.add(hemisphereLight);
		Game.scene.add(new HemisphereLightHelper(hemisphereLight, 0.5));
		//平行光 => 模拟太阳光 方向
		let directionLight = new DirectionalLight(0xffffff);

		directionLight.position.set(0, 30, 0);
		directionLight.castShadow = false; //阴影这个功能还是能不用就不用，用图片纹理代理  这里有 说明 https://threejsfundamentals.org/threejs/lessons/threejs-shadows.html
		// TODO 这下面都不晓得是干啥的
		// directionLight.shadow.camera.top = 50;
		// directionLight.shadow.camera.bottom = -50;
		// directionLight.shadow.camera.left = -50;
		// directionLight.shadow.camera.right = 50;
		// directionLight.shadow.camera.near = 0.1;
		// directionLight.shadow.camera.far = 100;
		// directionLight.shadow.camera.zoom = 1;

		// directionLight.
		Game.scene.add(directionLight);
		Game.scene.add(new DirectionalLightHelper(directionLight));

		//阴影线
		// var helper = new CameraHelper(directionLight.shadow.camera);
		// Game.scene.add(helper);
	}

	/**
	 * 设置背景颜色
	 */
	private setBackgroundColor() {
		const topLeft = new Color(0xf5883c);
		const topRight = new Color(0xff9043);
		const bottomRight = new Color(0xfccf92);
		const bottomLeft = new Color(0xf5aa58);

		const data = new Uint8Array([
			Math.round(bottomLeft.r * 255),
			Math.round(bottomLeft.g * 255),
			Math.round(bottomLeft.b * 255),
			Math.round(bottomRight.r * 255),
			Math.round(bottomRight.g * 255),
			Math.round(bottomRight.b * 255),
			Math.round(topLeft.r * 255),
			Math.round(topLeft.g * 255),
			Math.round(topLeft.b * 255),
			Math.round(topRight.r * 255),
			Math.round(topRight.g * 255),
			Math.round(topRight.b * 255),
		]);

		const backgroundTexture = new DataTexture(data, 2, 2, RGBFormat);
		backgroundTexture.magFilter = LinearFilter;
		backgroundTexture.needsUpdate = true;
		backgroundTexture.encoding = sRGBEncoding; //颜色纠正

		Game.scene.background = backgroundTexture;
		// Game.scene.background = new Color(0xa0a0a0);

		// 地面
		// TODO 这里的代码和投影相关  相当于创建了一个透明的地面
		var mesh = new Mesh(
			new PlaneBufferGeometry(100, 100),
			// new MeshPhongMaterial({ color: 0x999999, depthWrite: false })
			new ShadowMaterial({ depthWrite: false, opacity: 0.3 })
		);

		// Game.scene.fog = new Fog(0xa0a0a0, 10, 50);

		mesh.rotation.x = -Math.PI / 2;
		// mesh.receiveShadow = true;
		Game.scene.add(mesh);
	}
}
