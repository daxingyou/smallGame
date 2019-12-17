class RechargeItem extends eui.ItemRenderer{

	private buyBtn:eui.Group;
	private icon:eui.Image;
	private costLab:eui.Label;
	private descLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "RechargeItemSkin"
	}
	protected childrenCreated():void{
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap():void{
		recharge.sendToNativePhurse({Key1:this.data.costNum},(goldNum)=>{
			GameApp.gold += goldNum;
		},this)
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.costLab.text = this.data.cost;
		this.descLab.text = this.data.desc;
	}
	public dispose():void{
		this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}