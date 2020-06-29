import * as THREE from "three";
import { CoreEvent, CoreEventMap } from "./core/CoreEvent";

// //TransformControls 可拖拽组件(有辅助线)  url => examples/#misc_controls_transform
// //OrbitControls 自由相机

/**
 * 游戏主入口和配置逻辑
 */
class GameControl {
	/** 场景 */
	scene!: THREE.Scene;
	/** 渲染器 */
	renderer!: THREE.WebGLRenderer;
	/** 当前相机 => 透视 */
	currentCamera!: THREE.PerspectiveCamera;
	// /** 当前相机 => 正交 */
	// currentCamera!: THREE.OrthographicCamera;

	init() {
		//添加相机 => 透视相机
		let camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			1,
			30000
		);
		// let width = window.innerWidth / 2,
		// 	height = window.innerHeight / 2;
		// //正交相机
		// let camera = new THREE.OrthographicCamera(-width, width, height, -height, 1, 3000);
		camera.position.set(0, 500, 1000);
		camera.lookAt(0, 0, 0);
		this.currentCamera = camera;

		//添加渲染器
		let renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		document.body.appendChild(renderer.domElement);
		this.renderer = renderer;

		//添加场景
		this.scene = new THREE.Scene();

		//启动渲染器
		this.update();

		//窗口尺寸改变
		window.addEventListener("resize", () => {
			CoreEvent.emit(CoreEventMap.RESIZE);
			let width = window.innerWidth / 2,
				height = window.innerHeight / 2;
			// camera.left = -width;
			// camera.right = width;
			// camera.top = height;
			// camera.bottom = -height;
			camera.aspect = window.innerWidth / window.innerHeight; //仅用透视
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		});
	}

	/**
	 *
	 * @param time requestAnimationFrame 自带的时间戳
	 * @param elapsed 间隔值
	 */
	update(time = 0, elapsed = 0) {
		//这里的60 就是最大只能60帧
		if (elapsed >= 1000 / 60) {
			this.render();
			CoreEvent.emit(CoreEventMap.UPDATE);
			//这个60的值不动 上限
			elapsed = 1000 / 60;
		}
		//每帧执行一次
		requestAnimationFrame((_time) => {
			this.update(_time, elapsed + _time - time);
		});
	}

	/**
	 * 渲染
	 */
	render() {
		this.renderer.render(this.scene, this.currentCamera);
	}
}

export const Game = new GameControl();
