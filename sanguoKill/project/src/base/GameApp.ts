/**
 * @author
 */
class GameApp extends BaseClass {
	public static show_video:boolean=false;
	public static charpter_info:any;
	public static ownDeadState:number[] = [0,0,0];
	public static levelDeadState:number[] = [0,0,0];

	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	private _gold:number = 0;

	private _remainBag:number = 10;

	public static roleDeadNum:number = 0;
	public static enemyDeadNum:number = 0;

	public static battleLevel:number = 1;
	public static battleEnd:boolean = true;

	public static guilding:boolean = false;
	public static guideView:GuideView;
	public static isLast:boolean = false;
	public static curLevel:number = 1;
	public constructor() {
		super();
	}
	public load() {
		GlobalFun.getBagList();
		UpgradeCfg.ins.getLocalRoleInfo();
		eui.Label.default_fontFamily = "Microsoft YaHei";
		GlobalConfig.parserData();
		GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		// MapView.inst().initMap(true);
		// ViewManager.inst().open(StartView)
		ViewManager.inst().open(BeginView)
		// ViewManager.inst().open(StartGameView,[{data:123}])
		let firststr:string = egret.localStorage.getItem(LocalStorageEnum.FIRST_ENTER);
		if(!firststr){
			egret.localStorage.setItem(LocalStorageEnum.FIRST_ENTER,"1");
			this.gold = 1000;
		}
		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
		if(goldstr){
			this.gold = parseInt(goldstr);
		}
		eui.Binding.bindHandler(window,["gold"],this.onTestGold,this);
		// egret.localStorage.clear();
	}
	private onTestGold(value:number):void{
		if(value){
			this.gold += value;
		}
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	public get gold():number{
		return this._gold;
	}
	public set gold(value:number){
		this._gold = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD,value.toString());
	}
	public get remainBag():number{
		return this._remainBag;
	}
	public set remainBag(value:number){
		this._remainBag = value;
		egret.localStorage.setItem(LocalStorageEnum.BAG_REMAIN,value.toString());
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
		}
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}
window["gold"] = 0;