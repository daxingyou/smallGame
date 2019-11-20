class RechargePopUp extends BaseEuiView{

	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private returnBtn:eui.Image;
	private shopGroup:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.shopGroup["autoSize"]();
		this.shopGroup.verticalCenter = -600
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = RechargeItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.arrayCollect.source = RechargeCfg.cfg;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		egret.Tween.get(this.shopGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.shopGroup);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onReturn():void{
		egret.Tween.get(this.shopGroup).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.shopGroup);
			ViewManager.inst().close(RechargePopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(RechargePopUp,LayerManager.UI_Pop)