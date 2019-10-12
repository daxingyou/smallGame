class Result extends BaseEuiView{
	private resetBtn:eui.Group;
	private sureBtn:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.resetBtn,this.onReset,true);
		this.addTouchEvent(this.sureBtn,this.onSure,true);
	}
	private onReset():void{
		ViewManager.inst().close(Result);
		MessageManager.inst().dispatch("gameEndReset")
	}
	private onSure():void{
		ViewManager.inst().close(Result);
		MessageManager.inst().dispatch("gameEndExit")
	}
	public close():void{
		this.removeTouchEvent(this.resetBtn,this.onReset);
		this.removeTouchEvent(this.sureBtn,this.onSure);
	}
}
ViewManager.inst().reg(Result,LayerManager.UI_Pop);