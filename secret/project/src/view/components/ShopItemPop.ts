class ShopItemPop extends eui.ItemRenderer{

	private icon:eui.Image;
	private descLab:eui.Label;
	private buyBtn:eui.Image;
	public constructor() {
		super();
		this.skinName = "ShopItemSkin";
	}
	protected childrenCreated():void{
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		console.log("buy" + this.data);
		GlobalFun.sendToNativePhurse({goodid:this.data.goodid,goodnum:this.data.goldNum,goodtype:1,price:this.data.costNum})
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.descLab.text = this.data.desc;
	}
}