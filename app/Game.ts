import THREE from "three";

/**
 * 游戏主入口和配置逻辑
 */
class GameControl {
	/** 场景 */
	scene!: THREE.Scene;
	/** 渲染器 */
	renderer!: THREE.WebGLRenderer;
	/** 当前相机 */
	currentCamera!: THREE.PerspectiveCamera;

	init() {
		//添加相机
		let camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			1,
			3000
		);
		camera.position.set(100, 50, 100);
		// camera.position.set(1000, 500, 1000);
		camera.lookAt(0, 200, 0);
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
	}

	/**
	 *
	 * @param time requestAnimationFrame 自带的时间戳
	 * @param elapsed 间隔值
	 */
	update(time = 0, elapsed = 0) {
		if (elapsed > 1000 / 60) {
			this.render();
			elapsed = 0;
		}
		//每帧执行一次
		requestAnimationFrame((_time) => {
			this.update(_time, elapsed + _time - time);
		});
	}

	render() {}
}

export const Game = new GameControl();
