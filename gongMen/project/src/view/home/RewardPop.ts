class RewardPop extends BaseEuiView{

	private title:eui.Label;
	private cnt:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.title.text = param[0].title;
		this.cnt.text = param[0].cnt;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap():void{
		ViewManager.inst().close(RewardPop);
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(RewardPop,LayerManager.UI_Pop);