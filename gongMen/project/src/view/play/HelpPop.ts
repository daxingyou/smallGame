class HelpPop extends BaseEuiView{

	private cnt:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.cnt.text = param[0].cnt;
	}
	private onTouchTap():void{
		ViewManager.inst().close(HelpPop);
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(HelpPop,LayerManager.UI_Pop);