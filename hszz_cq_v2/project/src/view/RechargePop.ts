class RechargePop extends BaseEuiView{

	public returnBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private medalLab:eui.Label;
	private goldLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.arrayCollect = new eui.ArrayCollection();
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		this.list.itemRenderer = RechargeItem;
		this.list.dataProvider = this.arrayCollect;
		this.arrayCollect.source = ShopCfg.shopCfgs;
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		eui.Binding.bindProperty(GameApp,["medal"],this.medalLab,"text");
		eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
	}
	private onReturn():void{
		ViewManager.inst().close(RechargePop);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn)
	}
}
ViewManager.inst().reg(RechargePop,LayerManager.UI_Pop);