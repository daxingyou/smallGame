/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		// GlobalConfig.parserData();
		// GameMap.init(RES.getRes("map_json"));
		LoadingUI.inst().hide();
		// eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		// MapView.inst().initMap(true);
		 ViewManager.inst().open(GameView)
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