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
	public static unlocks:CardVo[] = [];
	/**已经拥有的卡牌列表 */;
	public static locks:CardVo[] = [];
	/**所有的卡牌列表 */
	public static allCards:CardVo[] = [];
	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		GlobalConfig.parserData();
		// GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		// MapView.inst().initMap(true);
		

		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
		if(!goldstr){
			GameApp.gold = 1000;
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
		let lockstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_OWNER_CARDIDS);
		if(!lockstr){
			cfgs = hszz.CardConfig.cfgs;
			egret.localStorage.setItem(LocalStorageEnum.ROLE_OWNER_CARDIDS,JSON.stringify(cfgs));
		}else{
			cfgs = JSON.parse(lockstr);
		}
		let arr:CardVo[] = [];
		let unlockArr:CardVo[] = [];
		for(let key  in cfgs){
			if(cfgs[key].ifUnlock){
				arr.push(cfgs[key])
			}else{
				unlockArr.push(cfgs[key]);
			}
		}
		GameApp.unlocks = unlockArr;
		GameApp.locks = arr;




		ViewManager.inst().open(GameMainView)
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