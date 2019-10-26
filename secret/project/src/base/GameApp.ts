/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public static level:number = 1;

	public static gem:number = 2;

	public static health:number = 18;

	public static progress:number = 1;

	public static womanLevel:number = 1;

	public static time:number;
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

		let levestr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		if(!levestr){
			GameApp.level = 1;
		}else{
			GameApp.level = parseInt(levestr);
		}
		eui.Binding.bindHandler(GameApp,["level"],this.levelChange,this);

		let womanLevelstr:string = egret.localStorage.getItem(LocalStorageEnum.WOMANLEVEL);
		if(!womanLevelstr){
			GameApp.womanLevel = 1;
		}else{
			GameApp.womanLevel = parseInt(womanLevelstr);
		}
		eui.Binding.bindHandler(GameApp,["womanLevel"],this.womanlevelChange,this);

		let gemstr:string = egret.localStorage.getItem(LocalStorageEnum.GEM_NUM);
		if(!gemstr){
			GameApp.gem = 2;
		}else{
			GameApp.gem = parseInt(gemstr);
		}
		eui.Binding.bindHandler(GameApp,["gem"],this.onGemChange,this);

		let healthstr:string = egret.localStorage.getItem(LocalStorageEnum.HEALTH);
		if(!healthstr){
			GameApp.health = 5;
		}else{
			GameApp.health = parseInt(healthstr);
		}
		eui.Binding.bindHandler(GameApp,["health"],this.onHealthChange,this);

		let passGatherstr:string = egret.localStorage.getItem(LocalStorageEnum.PASS);
		if(!passGatherstr){
			egret.localStorage.setItem(LocalStorageEnum.PASS,JSON.stringify({1:{},2:{}}));
		}
		
		ViewManager.inst().open(StartGameView);
		GlobalFun.sendToNativeLoadEnd();
	}
	private start:boolean = false;
	private interInval;
	public startRecover():void{
		if(this.start){return}
		this.start = true;
		this.interInval = setInterval(()=>{
			GameApp.time += 1;
			if(GameApp.time >= 10*60){
				GameApp.time = 0;
				GameApp.health += 1;
			}
		},1000)
	}
	public stopRecover():void{
		this.start = false;
		clearInterval(this.interInval);
		GameApp.time = 0;
	}
	private levelChange():void{
		egret.localStorage.setItem(LocalStorageEnum.LEVEL,GameApp.level.toString());
	}
	private womanlevelChange():void{
		egret.localStorage.setItem(LocalStorageEnum.WOMANLEVEL,GameApp.womanLevel.toString())
	}
	private onGemChange():void{
		egret.localStorage.setItem(LocalStorageEnum.GEM_NUM,GameApp.gem.toString());
	}
	private onHealthChange():void{
		egret.localStorage.setItem(LocalStorageEnum.HEALTH,GameApp.health.toString());
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			GameApp.gem += parseInt(value);
			UserTips.inst().showTips(`购买成功,获得钻石x${value}`);
		}
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}