/**
 * @author
 */
class GameApp extends BaseClass {

	//开发阶段 。假数据保存
	public static prompt:boolean = false;

	public preload_load_count:number = 0;
	/**角色实例id */
	public role_insId:number;
	/**角色元宝数 */
	public role_gold:number = 0;
	/**角色职业 */
	public role_job:number = 0;
	/**当前职称 */
	public levelName:string= "平民";
	/**当前经验值 */
	public curExp:number = 0;
	/**当前等级最大经验值 */
	public curLevelMaxExp:number = 400;

	/**当前我的总血量 */
	public totalHp:number = 0;

	/**当前关卡 */
	public level:number = 0;
	//默认进入主城限制
	// public enterLimit:number = 200
	/**练兵配置：time练兵总时长 minExp-maxExp 获得经验值范围  getExpTime 单次获得经验的时间*/

	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public static power:number = 1000;
	public TrainCfg:{time:number,minExp:number,maxExp:number,getExpTime:number} = {
		time:600,minExp:2,maxExp:4,getExpTime:10
	}
	public static jobCfg:any = {0:"平民",1:"军士",2:"牙门将",3:"护军将",4:"领军将",5:"骠骑将",6:"大将军"}
	public static soldierCfg:any = {0:[0],1:[0],2:[0,1],3:[0,1,2],4:[0,1,2,1],5:[0,1,2,1,2]};

	//所拥有的将军数量
	public static ownGeneralNum:number = 1;

	public static battleState:boolean = false;
	public constructor() {
		super();
	}
	public load() {
		let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET); 
		if(generalInfoStr){
			let arr:string[] = generalInfoStr.split("_");
			GameApp.ownGeneralNum = arr.length;
		}else{
			GameApp.ownGeneralNum = 1;
		}
		let powerstr:string = egret.localStorage.getItem(LocalStorageEnum.POWER);
		if(!powerstr){
			egret.localStorage.setItem(LocalStorageEnum.POWER,"1000");
			GameApp.power = 1000;
		}
		//测试、
			// GameApp.ownGeneralNum = 4;
			// egret.localStorage.setItem(LocalStorageEnum.LEVEL,"8")
			// egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,"900000")
		//

		eui.Label.default_fontFamily = "Microsoft YaHei";
		GlobalConfig.parserData();
		GameMap.init(RES.getRes("map_json"));
		ViewManager.ins<ViewManager>().open(StartGameView);
		let roleGoldStr:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
		// if(!roleGoldStr || parseInt(roleGoldStr) < this.enterLimit){
			// MapView.ins<MapView>().initMap();
			// EntityManager.ins<EntityManager>().init();
			// MapView.ins<MapView>().refrehMapViewPort();
		// }
		if(roleGoldStr){
			this.gold = parseInt(roleGoldStr);
		}
		let roleJob:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		if(!roleJob){
			this.role_job = 0;
			egret.localStorage.setItem(LocalStorageEnum.ROLE_JOB,this.role_job.toString());
		}else{
			this.role_job = parseInt(roleJob)
		}
		this.totalHp = GameApp.soldierCfg[this.role_job].length*10*100;
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		eui.Binding.bindHandler(GameApp,["power"],this.powerChange,this);

		//测试元宝
		eui.Binding.bindHandler(window,["gold"],this.onTestAddGold,this);
		eui.Binding.bindHandler(window,["level"],this.onTestlevelChange,this);
	}
	private powerChange(value:number):void{
		if(!isNaN(value)){
			GameApp.power = value;
			egret.localStorage.setItem(LocalStorageEnum.POWER,value.toString());
		}
	}
	public set rolePower(value:number){
		GameApp.power = value;
		egret.localStorage.setItem(LocalStorageEnum.POWER,value.toString())
	}
	public get rolePower():number{
		return GameApp.power;
	}
	private onTestlevelChange(value:number):void{
		egret.localStorage.setItem(LocalStorageEnum.LEVEL,value.toString());
	}
	private onTestAddGold(value:number):void{
		if(value){
			this.gold += value;
		}
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			this.gold += parseInt(value);
			GameApp.pay_cbDdata = "";
			UserTips.ins<UserTips>().showTips(`购买成功,获得元宝x${value}`);
			ViewManager.ins<ViewManager>().close(ShopView);
		}
	}
	public set gold(value:number){
		this.role_gold = value;
		egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,this.role_gold.toString());
	}
	public get gold():number{
		return this.role_gold;
	}
	public set exp(value:number){
		this.curExp = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP,this.curExp.toString());
	}
	/**执行升级以后的数据刷新 */
	public upgradeLevel():void{
		if(this.curExp >= this.curLevelMaxExp){
			this.curExp = this.curExp - this.curLevelMaxExp;
			this.role_job += 1;
			this.totalHp = GameApp.soldierCfg[this.role_job].length*10*100;
			egret.localStorage.setItem(LocalStorageEnum.ROLE_JOB,this.role_job.toString());
			this.levelName = GameApp.jobCfg[this.role_job];
			this.curLevelMaxExp = 400*(this.role_job+1);
			UserTips.ins<UserTips>().showTips("恭喜您!!! 成功晋升到 "+`<font color=0x00ff00>${this.levelName}</font>`);
		}
		egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP,this.curExp.toString());
		egret.localStorage.setItem(LocalStorageEnum.ROLE_MAIN_EXP,this.curLevelMaxExp.toString());
	}
	public get exp():number{
		return this.curExp;
	}
	public set Texp(value:number){
		this.curLevelMaxExp = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_MAIN_EXP,this.curLevelMaxExp.toString());
	}
	public get Texp():number{
		return this.curLevelMaxExp;
	}
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}
MessageCenter.compile(GameApp);

window["gold"] = 0;
window["level"] = 1