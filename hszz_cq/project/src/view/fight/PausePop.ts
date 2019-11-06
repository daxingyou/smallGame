class PausePop extends BaseEuiView{

	private closeRect:eui.Rect;
	private continueBtn:eui.Image;
	private returnBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.closeRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addTouchEvent(this.continueBtn,this.onTouchTap,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onTouchTap():void{
		ViewManager.inst().close(PausePop);
		MessageManager.inst().dispatch(CustomEvt.CONTINUE);
	}
	private onReturn():void{
		ViewManager.inst().close(PausePop);
		// ViewManager.inst().close(BattleView);
	}
	public close():void{
		this.closeRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.continueBtn,this.onTouchTap);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(PausePop,LayerManager.UI_Pop);