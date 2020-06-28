import "./index.scss";
import { Game } from "./Game";
import { CoreEvent, CoreEventMap } from "./core/CoreEvent";
import { StatsControl } from "./lib/Stats";
import { GridHelper } from "three/src/helpers/GridHelper";
import { OrbitControl } from "./lib/OrbitControl";
import { BoxBufferGeometry } from "three/src/geometries/Geometries";
import { MeshLambertMaterial, MeshNormalMaterial } from "three/src/materials/Materials";
import { Mesh } from "three/src/objects/Mesh";
import { DirectionalLight } from "three/src/lights/DirectionalLight";
import { transformControl } from "./lib/TransformControl";

//游戏初始化
Game.init();

//辅助线 100总长宽*10个
Game.scene.add(new GridHelper(100, 20));
//小性能面板
let stats = new StatsControl();
//自由拖拽相机
let orbitControl = new OrbitControl(Game.currentCamera, Game.render, Game.renderer.domElement);
//物体可拖拽
transformControl.init(Game.currentCamera, Game.render, Game.renderer.domElement);
let control = transformControl.control!;
Game.scene.add(control);
control.addEventListener("dragging-changed", function (event) {
	//防止事件冲突
	orbitControl.orbit!.enabled = !event.value;
});

CoreEvent.on(CoreEventMap.UPDATE, () => {
	stats.update();
	orbitControl.update();
});

var geometry = new BoxBufferGeometry(20, 20, 20);
// var material = new MeshLambertMaterial({ transparent: true });
var material = new MeshNormalMaterial({ transparent: true });
var mesh = new Mesh(geometry, material);
Game.scene.add(mesh);

transformControl.control?.attach(mesh);
