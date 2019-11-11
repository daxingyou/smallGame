class ShopItem extends eui.ItemRenderer{

	private icon:eui.Image;
	private nameLab:eui.Label;
	private descLab:eui.Label;
	private costGroup:eui.Group;
	private moneyCostLab:eui.Label;
	private phurseBtn:eui.Image;
	private goldCostLab:eui.Label;
	private _shop:number = 0;
	private _costNum:number = 0;
	private _buyNum:number = -1;
	private buyLab:eui.Label;
	private _goodid:number;
	private _goodNum:number;
	private _heroIndex:number = 0;
	public constructor() {
		super();
		this.skinName = "ShopItemSkin";
	}
	protected childrenCreated():void{
		this.phurseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.nameLab.text = this.data.name;
		this.descLab.text = this.data.desc;
		this._shop = this.data.shop;
		this._goodid = this.data.goodid;
		if(this.data.shop == 2){
			//当前是货物商店
			this.moneyCostLab.visible = false;
			this.goldCostLab.text = this.data.cost;
			this._costNum = this.data.cost;
			this._buyNum = this.data.buyNum;
			this._heroIndex = this.data.heroIndex;
			if(this._buyNum == 1){
				let buystr:string = egret.localStorage.getItem("shop_"+this.data.goodid);
				if(buystr){
					this.phurseBtn.visible = false;
					this.costGroup.visible = false;
					this.buyLab.visible = true;
				}
			}
		}else{
			this.costGroup.visible = false;
			this.moneyCostLab.text = this.data.cost;
			this._costNum = this.data.costNum;
			
		}
		this._goodNum = this.data.goodNum;
		
	}
	private onTouchTap():void{
		if(this._shop == 2){
			//当前是货物商店；
			if(GameApp.inst().gold < this._costNum){
				//当前黄金不足
				UserTips.inst().showTips("黄金不足");
				return;
			}
			GameApp.inst().gold -= this._costNum;
			if(this._goodid == 10000){
				GameApp.inst().fe += this._goodNum;
				UserTips.inst().showTips("获得生铁x"+this._goodNum);
			}else if(this._goodid == 10001){
				GameApp.inst().good += this._goodNum;
				UserTips.inst().showTips("获得粮草x"+this._goodNum);
			}else if(this._goodid == 10002){
				GameApp.inst().wood += this._goodNum
				UserTips.inst().showTips("获得木材x"+this._goodNum);
			}else{
				let heroAttr:any = HeroAttrCfg.attrCfg[this._heroIndex];
				let ownGeneralstr:string = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
				let ownGeneralArr:any[] = JSON.parse(ownGeneralstr).attr;
				ownGeneralArr.push(heroAttr);
				egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL,JSON.stringify({attr:ownGeneralArr}));
				this.phurseBtn.visible = false;
				this.buyLab.visible = true;
				this.costGroup.visible = false;
				egret.localStorage.setItem("shop_"+this.data.goodid,"1");
				UserTips.inst().showTips("获得武将-"+heroAttr.name);
			}
		}else{
			console.log({goodid:0,goodname:this._goodNum,goodtype:0,price:this._costNum})
			GlobalFun.sendToNativePhurse({goodid:0,goodname:this._goodNum,goodtype:0,price:this._costNum});
		}
	}
	public dispose():void{
		this.phurseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	public get cost():number{
		return this._costNum;
	}
}