import { Game } from "../Game";
import { Color, DataTexture, RGBFormat, LinearFilter } from "three";

/**
 * 游戏主逻辑
 */
export class GameMainControl {
	constructor() {
		this.init();
	}

	init() {
		this.setBackgroundColor();
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

		Game.scene.background = backgroundTexture;
	}
}
