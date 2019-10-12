/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public static gold:number = 0;

	public static level:number = 0;

	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		GlobalConfig.parserData();
		GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		// MapView.inst().initMap(true);

		//测试
		ViewManager.inst().open(StartGameView); 

		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
		if(!goldstr){
			GameApp.gold = 0;
		}else{
			GameApp.gold = parseInt(goldstr);
		}
		eui.Binding.bindHandler(GameApp,["gold"],this.goldChange,this);
		

		//
	}
	private goldChange(value:number):void{
		egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,value.toString());
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
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