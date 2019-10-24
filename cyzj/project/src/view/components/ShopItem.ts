class ShopItem extends eui.ItemRenderer{

	private icon:eui.Image;
	private nameLab:eui.Label;
	private numLab:eui.Label;
	private costLab:eui.Label;
	private buyBtn:eui.Image;
	private itemId:number;
	private cost:number;
	private costNum:number;
	public constructor() {
		super();
		this.skinName = "ShopItemSkin";
	}
	protected childrenCreated():void{
		this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap():void{
		if(GameApp.roleGold < this.cost){
			UserTips.inst().showTips("金币不足");
			return;
		}
		GameApp.roleGold -= this.cost;
		GlobalFun.addItemToBag(this.itemId,this.costNum);
		let itemInfo:any = ItemCfg.itemCfg[this.itemId];
		UserTips.inst().showTips("恭喜获得"+`<font color=0x00ff00>${itemInfo.name}</font>`+"x"+this.costNum)
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.nameLab.text = this.data.name;
		this.numLab.text = this.data.num;
		this.costLab.text = this.data.cost;
		this.itemId = this.data.id;
		this.cost = this.data.cost;
		this.costNum = this.data.num;
	}	
	public dispose():void{
		this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}