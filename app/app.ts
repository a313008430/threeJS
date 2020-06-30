import "./index.scss";
import { Game } from "./Game";
import { CoreEvent, CoreEventMap } from "./core/CoreEvent";
import { StatsControl } from "./lib/Stats";
import { GridHelper } from "three/src/helpers/GridHelper";
import { OrbitControl } from "./lib/OrbitControl";
import { transformControl } from "./lib/TransformControl";
import { GameMainControl } from "./src/GameMainControl";
//游戏初始化
Game.init();

//辅助线 100总长宽*10个
Game.scene.add(new GridHelper(50, 100));
//小性能面板
let stats = new StatsControl();
stats.rendererInfo(Game.renderer.info);
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
});

//游戏逻辑开始
new GameMainControl();
