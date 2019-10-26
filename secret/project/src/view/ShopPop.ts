class ShopPop extends BaseEuiView{

	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = ShopItemPop;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		this.arrayCollect.source = ShopCfg.shopCfgs;
	}
	public close():void{

	}
}
ViewManager.inst().reg(ShopPop,LayerManager.UI_Pop);