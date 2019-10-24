class RechargeItem extends eui.ItemRenderer{
	private numLab:eui.Label;
	private costLab:eui.Label;
	private buyBtn:eui.Image;
	private _cost:number;
	private _num:number;
	public constructor() {
		super();
		this.skinName = "RechargeItemSkin";
	}
	protected childrenCreated():void{
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuy,this);
	}
	private onBuy():void{
		console.log({goodid:0,goodnum:this._num,goodtype:0,price:this._cost})
		GlobalFun.sendToNativePhurse({goodid:0,goodnum:this._num,goodtype:0,price:this._cost});
	}
	protected dataChanged():void{
		this.numLab.text = this.data.num;
		this.costLab.text = "¥"+this.data.cost;
		this._cost = this.data.cost;
		this._num = this.data.num;
	}
}