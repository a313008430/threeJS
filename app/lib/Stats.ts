import Stats from "three/examples/jsm/libs/stats.module";

/**
 *  小性能面板
 */
export class StatsControl {
	stats!: Stats;
	constructor() {
		let stats: Stats = Stats();
		document.body.append(stats.dom);
		this.stats = stats;
	}

	update() {
		this.stats?.update();
	}
}
