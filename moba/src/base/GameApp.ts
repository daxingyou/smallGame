/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public static gameEnd:boolean = true;

	public static level:number;

	public static exp:number;

	public static gold:number;

	public static chapterLevel:number = 1;

	public static selectIndex:number = 0;

	public static skillLevel:any;

	public static equipIds:number[];

	public static guideView:GuideView;
	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		LoadingUI.inst().hide();
		
		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.Role_gold);
		if(!goldstr){
			GameApp.gold = 1000;
		}else{
			GameApp.gold = parseInt(goldstr);
		}
		eui.Binding.bindHandler(GameApp,["gold"],(value)=>{egret.localStorage.setItem(LocalStorageEnum.Role_gold,GameApp.gold.toString())},this);

		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.Role_level);
		if(!levelstr){
			GameApp.level = 1;
		}else{
			GameApp.level = parseInt(levelstr);
		}
		eui.Binding.bindHandler(GameApp,["level"],(value)=>{egret.localStorage.setItem(LocalStorageEnum.Role_level,GameApp.level.toString())},this);

		let expstr:string = egret.localStorage.getItem(LocalStorageEnum.Role_exp);
		if(!expstr){
			GameApp.exp = 0;
		}else{
			GameApp.exp = parseInt(expstr);
		}
		eui.Binding.bindHandler(GameApp,["exp"],(value)=>{egret.localStorage.setItem(LocalStorageEnum.Role_exp,GameApp.exp.toString())},this);

		let skillLevelstr:string = egret.localStorage.getItem(LocalStorageEnum.Skill_Level);
		if(!skillLevelstr){
			GameApp.skillLevel = {101:0,102:0,103:0,104:0}
			egret.localStorage.setItem(LocalStorageEnum.Skill_Level,JSON.stringify(GameApp.skillLevel));
		}else{
			GameApp.skillLevel = JSON.parse(skillLevelstr);
		}

		let equipidstr:string = egret.localStorage.getItem(LocalStorageEnum.Role_equip);
		if(!equipidstr){
			GameApp.equipIds = [];
			egret.localStorage.setItem(LocalStorageEnum.Role_equip,JSON.stringify([]));
		}else{
			GameApp.equipIds = JSON.parse(equipidstr);
		}
		recharge.sendToNativeLoadEnd();
		ViewManager.inst().open(StartGameView);
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}