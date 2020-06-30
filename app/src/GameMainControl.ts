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
} from "three";
import { gltfLoader } from "../core/Loader";

import xbot from "../res/Xbot.glb";
import soldier from "../res/Soldier.glb";
import baiditan_01 from "../res/baiditan_01.FBX";
import baiditan_02 from "../res/baiditan_01.png";
import { CoreEvent, CoreEventMap } from "../core/CoreEvent";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

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

		console.log(baiditan_01);
		var loader = new FBXLoader();
		loader.load(baiditan_01, (e) => {
			console.log(e);
			e.scale.set(0.1, 0.1, 0.1);
			Game.scene.add(e);

			let mixer = new AnimationMixer(e);
			var action = mixer.clipAction(e["animations"][0]);
			action.play();
			// e.traverse(function (child) {
			// 	child.castShadow = true;
			// 	child.receiveShadow = true;
			// });

			let clock = new Clock();
			CoreEvent.on(CoreEventMap.UPDATE, () => {
				var mixerUpdateDelta = clock.getDelta();

				mixer.update(mixerUpdateDelta);

				// mixer.update(mixerUpdateDelta);
			});
		});

		gltfLoader.load(xbot, (e: any) => {
			// console.log(e.scene);
			// Game.scene.add(e.scene);

			// Game.scene.add(SkeletonUtils.clone(e.scene) as any);

			let mixer: any[] = [];
			for (let x = 0; x < 0; x++) {
				let obj = SkeletonUtils.clone(e.scene) as Object3D;
				Game.scene.add(obj);
				obj.traverse(function (object) {
					object.castShadow = true;
				});

				obj.position.x += x * 0.5;

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
				all[4].play();
				all[4].weight = 0.5;

				setTimeout(() => {
					all[3].play();
					all[6].crossFadeTo(all[3], 0.35, true);
				}, 1000);
			}

			// e.scene.traverse(function (object) {
			// 	object.castShadow = true;
			// });

			// let additiveActions = ["sneak_pose", "sad_pose", "agree", "headShake"];
			// var animations = e.animations;
			// let mixer = new AnimationMixer(e.scene);

			// let numAnimations = animations.length;

			// let all: AnimationAction[] = [];
			// for (let i = 0; i !== numAnimations; ++i) {
			// 	let clip = animations[i];
			// 	if (additiveActions.includes(clip.name)) {
			// 		//Make the clip additive and remove the reference frame
			// 		//这里也不晓得是干啥的功能反正就是，一些动画可以不重复执行，然后还可以肢体动作和行为动作一起放
			// 		AnimationUtils.makeClipAdditive(clip); //这个大致的意思是可以和另外一个动作一起播
			// 		if (clip.name.endsWith("_pose")) {
			// 			clip = AnimationUtils.subclip(clip, clip.name, 2, 3, 30); //当前动作不循环
			// 		}
			// 	}
			// 	all.push(mixer.clipAction(clip));
			// }
			// all[6].time = 0;
			// all[6].play();
			// all[6].weight = 1;
			// all[4].play();
			// all[4].weight = 0.5;

			// setTimeout(() => {
			// 	all[3].play();
			// 	all[6].crossFadeTo(all[3], 0.35, true);
			// }, 1000);

			let clock = new Clock();
			CoreEvent.on(CoreEventMap.UPDATE, () => {
				var mixerUpdateDelta = clock.getDelta();
				mixer.forEach((e) => {
					e.update(mixerUpdateDelta);
				});
				// mixer.update(mixerUpdateDelta);
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
		directionLight.position.set(-3, 10, 10);
		directionLight.castShadow = true;
		// TODO 这下面都不晓得是干啥的
		directionLight.shadow.camera.top = 2;
		directionLight.shadow.camera.bottom = -2;
		directionLight.shadow.camera.left = -2;
		directionLight.shadow.camera.right = 2;
		directionLight.shadow.camera.near = 0.1;
		directionLight.shadow.camera.far = 40;
		Game.scene.add(directionLight);
		Game.scene.add(new DirectionalLightHelper(directionLight));
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

		// 地面
		// TODO 这里的代码和投影相关  相当于创建了一个透明的地面
		var mesh = new Mesh(
			new PlaneBufferGeometry(100, 100),
			new ShadowMaterial({ depthWrite: false, opacity: 0.3 })
		);
		mesh.rotation.x = -Math.PI / 2;
		mesh.receiveShadow = true;
		Game.scene.add(mesh);
	}
}
