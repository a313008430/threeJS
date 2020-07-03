import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { CoreEvent, CoreEventMap } from "../core/CoreEvent";
import { transformControl } from "../lib/TransformControl";
import { Mesh, PlaneBufferGeometry } from "three";
import { Fire } from "three/examples/jsm/objects/Fire";
import { Game } from "../Game";
/**
 * 房子管理器
 */
export class HouseControl {
	private fanList: Mesh[] = [];

	constructor(public entity: GLTF) {
		entity.scene.scale.set(0.5, 0.5, 0.5);
		entity.scene.position.set(1.2, -0.2, -4.5);

		// transformControl.attach(entity.scene);

		entity.scene.traverse((e) => {
			switch (e.type) {
				case "Object3D":
					break;
				case "Mesh":
					if (e.name.indexOf("fan") > -1) {
						this.fanList.push(e as Mesh);
					}
					break;
			}
		});

		this.addSmoke();

		//添加 update
		CoreEvent.on(CoreEventMap.UPDATE, this.update, this);
	}

	/**
	 * 添加烟
	 */
	addSmoke() {
		var plane = new PlaneBufferGeometry(20, 20);
		let fire = new Fire(plane, {
			textureWidth: 512,
			textureHeight: 512,
			debug: false,
		});
		fire.position.z = 2;
		// fire.position.y = 23;
		// Game.scene.add(fire);

		var params = {
			color1: "#ffffff",
			color2: "#ffa000",
			color3: "#000000",
			colorBias: 0.8,
			burnRate: 0.35,
			diffuse: 1.33,
			viscosity: 0.25,
			expansion: -0.25,
			swirl: 50.0,
			drag: 0.35,
			airSpeed: 12.0,
			windX: 0.0,
			windY: 0.75,
			speed: 500.0,
			massConservation: false,
		};

		fire.color1.set("#ffffff");
		fire.color2.set("#ffa000");
		fire.color3.set("#000000");
		fire.colorBias = 0.8;
		fire.burnRate = 0.35;
		fire.diffuse = 1.35;
		fire.viscosity = 0.25;
		fire.expansion = -0.25;
		fire.swirl = 50.0;
		fire.drag = 0.35;
		fire.airSpeed = 12;
		// fire.windVector
		// fire.windVector.y
		fire.speed = 0.35;
		fire.massConservation = false;

		fire.clearSources();
		fire.addSource(0.5, 0.1, 0.1, 1.0, 0.0, 1.0);
		fire.clearSources();
		fire.addSource(0.45, 0.1, 0.1, 0.5, 0.0, 1.0);
		fire.addSource(0.55, 0.1, 0.1, 0.5, 0.0, 1.0);

		// transformControl.attach(fire).draggingChangedListener((e) => console.log(e));
	}

	update(e) {
		this.fanList?.forEach((e, i) => {
			e.rotation.z += 0.2;
		});
	}
}
