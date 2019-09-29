class ResultPopUpView extends BaseEuiView{

	public returnBtn:eui.Image;
	public sureBtn:eui.Image;
	private _callBack:Function;
	private _thisArg:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		if(param[0].state == 1){
			this.skin.currentState = "win";
		}else{
			this.skin.currentState = "fail";
		}
		this._callBack = param[0].cb;
		this._thisArg = param[0].ta;
		this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturnTouch,this);
		this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSureTap,this);
	}
	private onReturnTouch(evt:egret.TouchEvent):void{
		if(this._callBack && this._thisArg){
			this._callBack.call(this._thisArg,"return");
			ViewManager.ins<ViewManager>().close(ResultPopUpView);
		}
	}
	private onSureTap(evt:egret.TouchEvent):void{
		if(this._callBack && this._thisArg){
			this._callBack.call(this._thisArg,"reset");
			ViewManager.ins<ViewManager>().close(ResultPopUpView);
		}
	}
	public close():void{
		this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturnTouch,this);
		this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSureTap,this);
		
	}
}
ViewManager.ins<ViewManager>().reg(ResultPopUpView,LayerManager.UI_Pop);