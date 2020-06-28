import EventEmitter from "eventemitter3";

/**
 * 分局事件管理器
 */
let CoreEvent = new EventEmitter();

/**
 * 核心事件
 */
enum CoreEventMap {
	/** 窗口尺寸改变 */
	RESIZE = "resize",
	/** update */
	UPDATE = "update",
}

export { CoreEvent, CoreEventMap };
