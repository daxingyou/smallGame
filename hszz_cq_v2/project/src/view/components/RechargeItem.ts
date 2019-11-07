class RechargeItem extends eui.ItemRenderer{
	
	private costLab:eui.Label;
	private icon:eui.Image;
	private phurseBtn:eui.Image;
	private descLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "RechargeItemSkin";
	}
	protected childrenCreated():void{
		this.phurseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuy,this);
	}
	private onBuy():void{
		console.log({goodid:this.data.goodid,goodnum:this.data.goldNum,goodtype:0,price:this.data.costNum})
		GlobalFun.sendToNativePhurse({goodid:this.data.goodid,goodnum:this.data.goldNum,goodtype:0,price:this.data.costNum})
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.costLab.text = this.data.cost;
		this.descLab.text = this.data.desc;
	}
}