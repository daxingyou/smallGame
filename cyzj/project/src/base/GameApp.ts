/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public static roleGold:number = 0;

	public static roleDataIndex:number = 0;

	// public static roleLevel:number = 0;

	// public static roleExp:number = 0;
	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		GlobalConfig.parserData();
		GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		// ViewManager.inst().open(StartGameView);
		ViewManager.inst().open(StartGameView);
		// MapView.inst().initMap(true);
		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM)
		eui.Binding.bindHandler(GameApp,["roleGold"],this.goldChange,this);
		if(goldstr){
			GameApp.roleGold = parseInt(goldstr);
		}else{
			GameApp.roleGold = 2000;
		}

		eui.Binding.bindHandler(GameApp,["roleDataIndex"],this.roleDataIndexChange,this);
		let roleIndexstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_INDEX);
		if(roleIndexstr){
			GameApp.roleDataIndex = parseInt(roleIndexstr);
		}else{
			GameApp.roleDataIndex = 0;
		}

		
		// eui.Binding.bindHandler(GameApp,["roleLevel"],this.roleLevelChange,this);
		// let roleLevelstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_LEVEL);
		// if(roleLevelstr && parseInt(roleLevelstr)){
		// 	GameApp.roleLevel = parseInt(roleLevelstr);
		// }else{
		// 	GameApp.roleLevel = 1;
		// }

		// eui.Binding.bindHandler(GameApp,["roleExp"],this.expChange,this);
		// let roleExpstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
		// if(roleExpstr){
		// 	GameApp.roleExp = parseInt(roleExpstr);
		// }else{
		// 	GameApp.roleExp =0;
		// }
	}
	private expChange(value:number):void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP,value.toString());
	}
	private roleLevelChange(value:number):void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_LEVEL,value.toString());
	}
	private goldChange(value:number):void{
		egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,value.toString());
	}
	private roleDataIndexChange(value:number):void{
		egret.localStorage.setItem(LocalStorageEnum.ROLE_INDEX,value.toString());
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	/**获取人物数据 */
	public static get roleData():RoleInfoVo[]{
		return JSON.parse(egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA));
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			GameApp.roleGold += parseInt(value);
			// UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
		}
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}