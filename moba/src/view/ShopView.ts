class ShopView extends BaseEuiView{

	private shopGroup:eui.Group;
	private goldLab:eui.Label;
	private goldWatcher:eui.Watcher;
	private shopBtn:eui.Button;
	private rechargeBtn:eui.Button;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private selectIndex:number = 0;
	private returnBtn:eui.Image;
	private _cb:()=>void;
	private _arg:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		egret.Tween.get(this).to({alpha:1},600).call(()=>{
			egret.Tween.removeTweens(this);
		},this)
		if(param[0]){
			if(param[0].cb){
				this._cb = param[0].cb;
			}
			if(param[0].arg){
				this._arg = param[0].arg;
			}
		}
		this.shopGroup["autoSize"]();
		this.goldWatcher = eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = ShopItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		this.switchPage();
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.rechargeBtn:
				this.selectIndex = 1;
				this.switchPage();
				break;
			case this.shopBtn:
				this.selectIndex = 0;
				this.switchPage();
				break;
			case this.returnBtn:
				egret.Tween.get(this).to({alpha:0},600).call(()=>{
					egret.Tween.removeTweens(this);
					ViewManager.inst().close(ShopView);
					if(this._cb && this._arg){
						this._cb.call(this._arg);
					}
				},this)
				break;
		}
	}
	private switchPage():void{
		GameApp.selectIndex = this.selectIndex;
		if(this.selectIndex == 0){
			this.shopBtn.currentState = "down";
			this.rechargeBtn.currentState = "up";
		}else{
			this.rechargeBtn.currentState = "down";
			this.shopBtn.currentState = "up";
		}
		this.arrayCollect.source = ShopCfg.shopCfgs[this.selectIndex];
	}
	public close():void{
		if(this.goldWatcher){this.goldWatcher.unwatch()}
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(ShopView,LayerManager.UI_Pop)