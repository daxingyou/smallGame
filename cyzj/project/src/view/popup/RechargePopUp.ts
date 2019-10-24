class RechargePopUp extends BaseEuiView{
	private returnBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private content:eui.Group;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.content.scaleX = this.content.scaleY = 0;
		this.content.alpha = 0;
		egret.Tween.get(this.content).to({scaleX:0.8,scaleY:0.8,alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = RechargeItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		
		let dataarr:any[] = ShopCfg.shopCfgs;
		this.arrayCollect.source = dataarr;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0,alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(RechargePopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(RechargePopUp,LayerManager.UI_Pop);