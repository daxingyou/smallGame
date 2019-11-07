/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	/**金币 */
	public static gold:number = 0;
	/**勋章 */
	public static medal:number = 0;
	/**等级 */
	public static level:number = 0;
	/**当前经验 */
	public static exp:number = 0;
	/**未拥有的卡牌列表 */
	// public static unlocks:CardVo[] = [];
	/**已经拥有的卡牌列表 */;
	public static ownCards:CardVo[] = [];
	/**所有的卡牌列表 */
	public static allCards:CardVo[] = [];

	/**当前进入的关卡 */
	public static curChapter:number = 1;
	/**当前关卡地图id */
	public static curLevelMapId:string = "";
	/**当前关卡随机到的关卡怪物模型 */
	public static monsterRes:string = "";
	/**性别 */
	public static sex:number = 0;
	/**战斗结束 */
	public static gameEnd:boolean = false;
	/**当前挑战的bossid */
	public static bossId:number;
	/**当前挑战的boss类型 */
	public static bossType:number;
	/**当前副本 */
	public static fuben:string;
	/**人物名字 */
	public static roleName:string = "人物名字";
	/**当前装备的武器 */
	public static weapon:number = 0;

	public static guilding:boolean = false;
	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		// GlobalConfig.parserData();
		
		// LoadingUI.inst().hide();
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		// MapView.inst().initMap(true);
		

		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
		if(!goldstr){
			GameApp.gold = 50;
		}else{
			GameApp.gold = parseInt(goldstr);
		}
		eui.Binding.bindHandler(GameApp,["gold"],this.onGoldChange,this);

		let medalstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_MEDAL);
		if(!medalstr){
			GameApp.medal = 0 ;
		}else{
			GameApp.medal = parseInt(medalstr);
		}
		eui.Binding.bindHandler(GameApp,["medal"],this.onMedalChange,this);

		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_LEVEL);
		if(!levelstr){
			GameApp.level = 1;
		}else{
			GameApp.level = parseInt(levelstr);
		}
		eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);

		let expstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
		if(!expstr){
			GameApp.exp = 0;
		}else{
			GameApp.exp = parseInt(expstr);
		}
		eui.Binding.bindHandler(GameApp,["exp"],this.onExpChange,this);

		let cfgs:CardVo[] = [];
		for(let key in  hszz.CardConfig.cfgs){
			if(hszz.CardConfig.cfgs[key].cardType != 1){
				GameApp.allCards.push(hszz.CardConfig.cfgs[key]);
			}
		}

		let firstEnterstr:string = egret.localStorage.getItem("hszz_first_enter");
		if(!firstEnterstr){
			GameApp.guilding = true;
		}else{
			GameApp.guilding = false;
		}
		// GlobalFun.refreshCardData();

		//测试
		let lockstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_OWNER_CARDIDS);
		if(lockstr){
			GameApp.ownCards = JSON.parse(lockstr);
		}else{
			let arr:CardVo[] = [];
			for(let key in hszz.CardConfig.cfgs){
				arr = arr.concat(hszz.CardConfig.cfgs[key]);
			}
			egret.localStorage.setItem(LocalStorageEnum.ROLE_OWNER_CARDIDS,JSON.stringify(arr));
			// GameApp.ownCards = arr;
			GlobalFun.refreshCardData();
		}
		//

		let sexStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_SEX);
		if(sexStr){
			GameApp.sex = parseInt(sexStr);
		}
		let nameStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_NAME);
		if(nameStr)
		{
			GameApp.roleName = nameStr;
		}
		
		// let arr:CardVo[] = [];
		// let unlockArr:CardVo[] = [];
		// for(let key  in cfgs){
		// 	if(cfgs[key].ifUnlock){
		// 		arr.push(cfgs[key])
		// 	}else{
		// 		unlockArr.push(cfgs[key]);
		// 	}
		// }
		// GameApp.unlocks = unlockArr;

		// if(nameStr)
		// {
		// 	ViewManager.inst().open(GameMainView)
		// }else
		// {
		// 	ViewManager.inst().open(ChooseView);
		// }
		
		
		
		MessageManager.inst().dispatch("LOADING_OVER", this);
		GlobalFun.sendToNativeLoadEnd();
		// ViewManager.inst().open(BattleView);
		
	}
	
	private onGoldChange():void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD,GameApp.gold.toString());
	}
	private onMedalChange():void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_MEDAL,GameApp.medal.toString());
	}
	private onLevelChange():void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_LEVEL,GameApp.level.toString());
	}
	private onExpChange():void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP,GameApp.exp.toString());
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.gold += parseInt(value)
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
		}
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}