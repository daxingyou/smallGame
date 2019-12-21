//Display base class,Used to add some display related common functions
class BaseView extends eui.Component {

	/**
	 * Monitoring events
	 * @param {Function} func Event tag listening
	 * @param {Function} myfunc Functions listening for responses
	 * @param callobj Do you want to execute the response function once
	 */
	// public observe(func: Function, myfunc: Function, callobj: any = undefined) {
	// 	MessageCenter.addListener(func, myfunc, this, callobj);
	// }

	// public removeObserve() {
	// 	MessageCenter.ins().removeAll(this);
	// }

	public addTouchEvent(obj: any, func: Function,isStartEffect:boolean = false) {
		this.addEvent(egret.TouchEvent.TOUCH_TAP, obj, func);
		if(isStartEffect){
			obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEndTouch,this);
			obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEndTouch,this);
		}
	}
	private onBeginTouch(evt:egret.TouchEvent):void{
		if(evt.target){
			this.changeFilter(evt.target);
		}
	}
	private onEndTouch(evt:egret.TouchEvent):void{
		if(evt.target && evt.target.filters){
			evt.target.filters = [];
		}
	}
	private changeFilter(obj:egret.DisplayObjectContainer):void{
		var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		obj.filters = [colorFlilter];
	}
	public addTouchEndEvent(obj: any, func: Function) {
		this.addEvent(egret.TouchEvent.TOUCH_END, obj, func);
	}

	public addChangeEvent(obj: any, func: Function) {
		if (obj && obj instanceof eui.TabBar) {
			this.addEvent(egret.TouchEvent.CHANGE, obj, (...param) => {
				// SoundUtil.ins().playEffect(SoundUtil.WINDOW);
				func.call(this, ...param);
			});
		} else {
			this.addEvent(egret.TouchEvent.CHANGE, obj, func);
		}
	}
	
	/**hide Tab display except the first tab */
    // public hidePageFunc(viewStack:eui.ViewStack):void{
    //     let len:number = viewStack.$children.length;
    //     for(let i:number = 1;i<len;i++){
    //         if(viewStack.$children.length >=2){
    //             let item:BaseComponent = <BaseComponent>viewStack.getChildAt(1);
    //             viewStack.removeChild(item);
    //         }
    //     }
    // }

	public addChangingEvent(obj: any, func: Function) {
		this.addEvent(egret.TouchEvent.CHANGING, obj, func);
	}

	public addEvent(ev: string, obj: any, func: Function) {
		if (!obj) {
			debug.error(`Binding object does not exist`);
			return;
		}
		obj.addEventListener(ev, func, this);
	}

	public removeTouchEvent(obj: any, func: Function) {
		if (obj) {
			obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
			if(obj.hasEventListener("touchBegin")){
				obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
			}
			if(obj.hasEventListener("touchEnd")){
				obj.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
			}
			if(obj.hasEventListener("touchCancel")){
				obj.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEndTouch,this);
			}
			if(obj.hasEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE)){
				obj.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEndTouch,this);
			}
		}
	}

	public $onClose() {

		let fun = function (tar: egret.DisplayObjectContainer) {
			for (let i: number = 0; i < tar.numChildren; i++) {
				let obj = tar.getChildAt(i);
				if (obj instanceof BaseView) {
					(<BaseView>obj).$onClose();
				} else if (obj instanceof egret.DisplayObjectContainer) {
					fun(obj);
				}
			}
		};

		fun(this);

		// this.removeObserve();
	}
}