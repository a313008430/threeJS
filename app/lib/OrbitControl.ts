import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CoreEvent, CoreEventMap } from "../core/CoreEvent";

/**
 * 自由拖拽相机
 */
export class OrbitControl {
	orbit: OrbitControls | null = null;
	constructor(currentCamera: THREE.Camera, render: Function, domElement?: HTMLElement) {
		this.orbit = new OrbitControls(currentCamera, domElement);

		// this.orbit.addEventListener('change', )
	}

	init() {}

	update() {
		this.orbit?.update();
	}
}
