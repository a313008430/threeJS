import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CoreEvent, CoreEventMap } from "../core/CoreEvent";

/**
 * 自由拖拽相机
 */
export class OrbitControl {
	orbit: OrbitControls | null = null;
	constructor(currentCamera: THREE.Camera, render: Function, domElement?: HTMLElement) {
		this.orbit = new OrbitControls(currentCamera, domElement);
		this.orbit.target.set(0, 1, 0); //可以让物体在中心
		this.orbit.update();
		// this.orbit.addEventListener("change", (e) => {
		// 	console.log(e);
		// });
	}

	init() {}

	update() {
		this.orbit?.update();
	}
}
