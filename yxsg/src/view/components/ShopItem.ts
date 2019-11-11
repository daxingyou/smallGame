class ShopItem extends eui.ItemRenderer{
	private icon:eui.Image;
	private goldNum:eui.Label;
	private desc:eui.Label;
	private buyBtn:eui.Image;
	private costNum:eui.Label;
	private touchBeginboo:boolean;
	public constructor() {
		super();
		this.skinName = "ShopItemSkin";
	}
	protected childrenCreated():void{
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginTouch,this);
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndTouch,this);
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancle,this);
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCancle,this);
	}
	private onBeginTouch(evt:egret.TouchEvent):void{
		this.changeFilter(this.buyBtn);
		this.touchBeginboo = true;
	}
	private onCancle():void{
		this.touchBeginboo = false;
		this.buyBtn.filters = [];
	}
	private onEndTouch(evt:egret.TouchEvent):void{
		this.buyBtn.filters = [];
		if(this.touchBeginboo){
			this.onBuy();
			this.touchBeginboo = false;
		}
	}
	private changeFilter(obj):void{
		var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		];
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		obj.filters = [colorFlilter];
	}
	private onBuy():void{
		let obj = {"goodid":this.data.goodid,"goodname":this.data.goldNum,"goodtype":0,"price":this.data.costNum}
		GlobalFun.sendToNativePhurse(obj);
	}
	protected dataChanged():void{
		if(this.data.icon){
			this.icon.source = this.data.icon;
		}
		if(this.data.goldNum){
			this.goldNum.text = this.data.goldNum+"元宝";
		}
		if(this.data.desc){
			this.desc.text = this.data.desc;
		}
		if(this.data.cost){
			this.costNum.text = this.data.cost;
		}
	}
	public dispose():void{
		this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuy,this);
	}
}