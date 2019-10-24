class CardItem extends eui.ItemRenderer{

	private lockNum:eui.Label;
	private lockImg:eui.Image;
	private nameLab:eui.Label;
	private roleImg:eui.Image;
	private img:eui.Image;

	private isLock:boolean = true;
	private isOwn:boolean = true;
	private titleStr:string[] = ["魂士解锁","魂师解锁","大魂师解锁","魂王解锁","魂皇解锁","魂宗解锁","魂尊解锁","魂圣解锁","魂帝解锁"];
	public constructor() {
		super();
		this.skinName = "CardItemSkin";
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(this.isLock){
			UserTips.inst().showTips("未满足解锁条件");
			return;
		}
		// if(this.isOwn){
		// 	UserTips.inst().showTips("碎片不足");
		// 	return;
		// }
		//开启boss战斗
		GameConfig.fight_state = "boss";
		if(this.data.role == "card_10002_png")
			GameConfig.gq = 0;
		else if(this.data.role == "card_10004_png")
			GameConfig.gq = 1;
		else if(this.data.role == "card_10005_png")
			GameConfig.gq = 2;
		else if(this.data.role == "card_10003_png")
			GameConfig.gq = 3;
		
		ViewManager.inst().open(GameView);
	}
	protected dataChanged():void{
		this.refreshItemData(this.data);
		
	}
	/**itemdata 刷新 */
	public refreshItemData(data:any):void{
		this.lockNum.text = data.ownNum+"/"+data.totalNum;
		this.roleImg.source = data.role;
		this.nameLab.text = data.nameStr;
		this.lockImg.visible = true;
		if(data.ownNum >= data.totalNum){
			this.lockNum.visible = false;
			this.img.visible = false;
			this.isOwn = true;
		}else{
			this.lockNum.visible = true;
			this.img.visible = true;
			this.isOwn = false;
		}
		this.refreshLock();
	}
	public refreshLock():void{
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_LEVEL);
		let ifexist:boolean = false;
		let roleData:RoleInfoVo[] = GameApp.roleData;
		for(let key in roleData){
			if(roleData[key].level >= this.data.lockLevel){
				ifexist = true;
				break;
			}
		}
		// let level:number = levelstr?parseInt(levelstr):1;
		if(ifexist){
			this.lockImg.visible = false;
			this.isLock = false;
		}else{
			this.lockImg.visible = true;
			this.isLock = true;
			this.nameLab.text = this.titleStr[this.data.lockLevel-1];	
		}
	}
	public dispose():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}