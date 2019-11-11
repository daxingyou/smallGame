class ShopPopUp extends BaseEuiView{

	private tabBtn_good:eui.Button;
	private tabBtn_recharge:eui.Button;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private selectIndex:number= 1;
	private returnBtn:eui.Image;
	private content:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = ShopItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.horizontalScrollBar.visible = false;
		this.refreshViewData();
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(ShopPopUp);
		},this)
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.tabBtn_good:
				this.selectIndex = 1;
				this.tabBtn_good.currentState = "down";
				this.tabBtn_recharge.currentState = "up";
				this.refreshViewData();
				break;
			case this.tabBtn_recharge:
				this.selectIndex = 2;
				this.tabBtn_good.currentState = "up";
				this.tabBtn_recharge.currentState = "down";
				this.refreshViewData();
				break;
		}
	}
	private refreshViewData():void{
		let shopCfg:any = ShopCfg.shopCfgs[this.selectIndex]
		let dataArr:any[] = [];
		for(let key in shopCfg){
			dataArr.push(shopCfg[key]);
		}
		this.arrayCollect.source = dataArr;
		this.list.dataProviderRefreshed();
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		let len:number = this.list.$children.length;
		for(let i:number = 0;i<len;i++){
			let item:ShopItem = this.list.getChildAt(i) as ShopItem;
			item.dispose();
		}
	}
}
ViewManager.inst().reg(ShopPopUp,LayerManager.UI_Pop);