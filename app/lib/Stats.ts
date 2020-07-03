import Stats from "three/examples/jsm/libs/stats.module";
import { WebGLInfo } from "three/src/renderers/webgl/WebGLInfo";

/**
 *  小性能面板 + 底部性能面板
 */
export class StatsControl {
	stats!: Stats;

	private callsNode!: HTMLElement;
	private frameTimeNode!: HTMLElement;
	private linesNode!: HTMLElement;
	private pointsNode!: HTMLElement;
	private trianglesNode!: HTMLElement;
	private info: WebGLInfo | null = null;
	constructor() {
		let stats: Stats = Stats();
		document.body.append(stats.dom);
		this.stats = stats;
		this.callsNode = this.getElement("#calls");
		// this.frameTimeNode = this.getElement("#frameTime");
		this.linesNode = this.getElement("#lines");
		this.pointsNode = this.getElement("#points");
		this.trianglesNode = this.getElement("#triangles");
	}

	getElement(name: string): any {
		return document.querySelector(name)!;
	}

	rendererInfo(info: WebGLInfo) {
		this.info = info;
		setInterval(() => {
			this.callsNode.innerText = info.render.calls + "";
			this.linesNode.innerText = info.render.lines + "";
			this.pointsNode.innerText = info.render.points + "";
			this.trianglesNode.innerText = info.render.triangles + "";
		}, 1000);
	}

	update() {
		this.stats?.update();
	}
}
