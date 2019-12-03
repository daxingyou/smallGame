class ShopItem extends eui.ItemRenderer{

	private nameLab:eui.Label;
	private icon:eui.Image;
	private cost:eui.Label;
	private goldIcon:eui.Image;
	private buyGroup:eui.Group;
	private singleCost:number;
	private descLab:eui.Label;
	private cardGroup:eui.Group;
	public constructor() {
		super();
		this.skinName = "ShopItemSkin";
	}
	protected childrenCreated():void{
		this.buyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	protected dataChanged():void{
		if(GameApp.selectIndex){
			this.goldIcon.visible = false;
			this.cost.x = 20;
			this.cost.width = 150;
			this.cost.text = "¥ "+this.data.costNum;
			this.cardGroup.touchEnabled = true;
			this.cardGroup.touchChildren = true;
			this.cardGroup.touchThrough =  true;
			GlobalFun.clearFilters(this.cardGroup);
		}else{
			this.goldIcon.visible = true;
			this.cost.x = 65;
			this.cost.width = 105;
			this.cost.text = this.data.costNum;
			if(GameApp.equipIds.indexOf(this.data.itemid) != -1){
				this.cardGroup.touchEnabled = false;
				this.cardGroup.touchChildren = false;
				this.cardGroup.touchThrough =  false;
				this.cost.text = "已购买"
				GlobalFun.filterToGrey(this.cardGroup);
			}else{
				this.cardGroup.touchEnabled = true;
				this.cardGroup.touchChildren = true;
				this.cardGroup.touchThrough =  true;
				GlobalFun.clearFilters(this.cardGroup);
			}
		}
		this.singleCost = this.data.costNum;
		this.icon.source = this.data.icon;
		this.nameLab.text = this.data.name;
		this.descLab.text = this.data.desc;
		
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(GameApp.selectIndex == 1){
			//目前是充值
			recharge.sendToNativePhurse({Key1:(this.singleCost*10).toString()},num=>{
				GameApp.gold += parseInt(num);
			},this)
		}else{
			//目前是商城
			if(this.singleCost > GameApp.gold){
				UserTips.inst().showTips("元宝不足");
				return;
			}
			GameApp.gold -= this.singleCost;
			MessageManager.inst().dispatch("buyEquip",{id:this.data.itemid});
			//处理购买了装备以后的操作
			if(GameApp.equipIds.indexOf(this.data.itemid) != -1){
				this.cardGroup.touchEnabled = false;
				this.cardGroup.touchChildren = false;
				this.cardGroup.touchThrough =  false;
				this.cost.text = "已购买"
				GlobalFun.filterToGrey(this.cardGroup);
			}else{
				this.cardGroup.touchEnabled = true;
				this.cardGroup.touchChildren = true;
				this.cardGroup.touchThrough =  true;
				GlobalFun.clearFilters(this.cardGroup);
			}
			
		}
	}
}