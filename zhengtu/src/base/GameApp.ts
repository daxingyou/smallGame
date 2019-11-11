/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;

	public static guilding:boolean = false;

	public static buildStep:number = 1;

	public static nextStepId:string = "";

	public static waitStepId:string = "";
	/**人物黄金数量 */
	public static m_gold:number = 0;
	/**人物生铁数量 */
	public static m_fe:number = 0;
	/**人物木材数量 */
	public static m_wood:number = 0;
	/**人物粮草数量 */
	public static m_good:number = 0;

	/**当前弓兵的数量 */
	public static m_soldier0_num = 0;
	/**当前骑兵数量 */
	public static m_soldier1_num = 0;
	/**当前盾甲兵数量 */
	public static m_soldier2_num = 0;

	/**当前弓兵正在生产的数量 */
	public static m_product_0:number = 0;
	/**当前骑兵正在生产的数量 */
	public static m_product_1:number = 0;
	/**当前盾甲兵正在生产的数量 */
	public static m_product_2:number = 0;

	public static battleEnd = true;

	public static guildView:GuideView;

	public static tpxGetState:boolean = true;

	public static curBattleLevel:number = 0;
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
		GlobalFun.sendToNativeLoadEnd();
		let firstEnterstr:string = egret.localStorage.getItem(LocalStorageEnum.IS_FIRST_ENTER);
		if(firstEnterstr && firstEnterstr=="1"){
			//进入主城 游戏界面
			let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
			this.gold = parseInt(goldstr);
			ViewManager.inst().open(GameMainView);

			let woodStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_WOOD);
			let goodStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOOD);
			let feStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_FE);
			this.wood = parseInt(woodStr);
			this.good = parseInt(goodStr);
			this.fe = parseInt(feStr);
		}else{
			ViewManager.inst().open(StartGameView);
			egret.localStorage.setItem(LocalStorageEnum.IS_FIRST_ENTER,"0");
			this.gold += 200;
			this.good += 200;
			this.wood += 200;
			this.fe += 200;
		}
		let ownSoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
		if(ownSoldierstr){
			let soldierObj:any = JSON.parse(ownSoldierstr);
			if(soldierObj[SoldierType.ARROW]){
				GameApp.m_soldier0_num = soldierObj[SoldierType.ARROW];
			}
			if(soldierObj[SoldierType.QI]){
				GameApp.m_soldier1_num = soldierObj[SoldierType.QI];
			}
			if(soldierObj[SoldierType.SHIELD]){
				GameApp.m_soldier2_num = soldierObj[SoldierType.SHIELD];
			}
		}else{
			egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS,JSON.stringify({0:0,1:0,2:0}));
		}

		let ownProductSoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
		if(ownProductSoldierstr){
			let productObj:any = JSON.parse(ownProductSoldierstr);
			if(productObj[SoldierType.ARROW]){
				GameApp.m_product_0 = productObj[SoldierType.ARROW];
			}
			if(productObj[SoldierType.QI]){
				GameApp.m_product_1 = productObj[SoldierType.QI];
			}
			if(productObj[SoldierType.SHIELD]){
				GameApp.m_product_2 = productObj[SoldierType.SHIELD];
			}
		}else{
			egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS,JSON.stringify({0:0,1:0,2:0}));
		}
		eui.Binding.bindHandler(window,["gold"],this.onTestGoldChange,this);
	}
	private onTestGoldChange(value:number):void{
		this.gold += value;
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.pay_cbDdata = "";
			UserTips.inst().showTips(`购买成功,获得黄金x${value}`);
		}
	}
	public get gold():number{
		return  GameApp.m_gold;
	}
	public set gold(value:number){
		if(value <= 0){value = 0}
		GameApp.m_gold = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD,value.toString());
	}
	public get fe():number{
		return GameApp.m_fe;
	}
	public set fe(value:number){
		if(value <= 0){value = 0}
		GameApp.m_fe = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_FE,value.toString())
	}
	public get wood():number{
		return GameApp.m_wood;
	}
	public set wood(value:number){
		if(value <= 0){value = 0}
		GameApp.m_wood = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_WOOD,value.toString())
	}
	public get good():number{
		return GameApp.m_good;
	}
	public set good(value:number){
		if(value <= 0){value = 0}
		GameApp.m_good = value;
		egret.localStorage.setItem(LocalStorageEnum.ROLE_GOOD,value.toString())
	}

	public get soldier_0():number{
		return GameApp.m_soldier0_num
	}
	public set soldier_0(value:number){
		if(value <= 0){value = 0}
		GameApp.m_soldier0_num = value;
		let ownsoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
		let obj:any = JSON.parse(ownsoldierstr);
		obj[0] = value;
		egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS,JSON.stringify(obj));
	}

	public get soldier_1():number{
		return GameApp.m_soldier1_num
	}
	public set soldier_1(value:number){
		if(value <= 0){value = 0}
		GameApp.m_soldier1_num = value;
		let ownsoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
		let obj:any = JSON.parse(ownsoldierstr);
		obj[1] = value;
		egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS,JSON.stringify(obj));
	}

	public get soldier_2():number{
		return GameApp.m_soldier2_num
	}
	public set soldier_2(value:number){
		if(value <= 0){value = 0}
		GameApp.m_soldier2_num = value;
		let ownsoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
		let obj:any = JSON.parse(ownsoldierstr);
		obj[2] = value;
		egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS,JSON.stringify(obj));
	}


	public get product_0():number{
		return GameApp.m_product_0
	}
	public set product_0(value:number){
		if(value <= 0){value = 0}
		GameApp.m_product_0 = value;
		let ownsoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
		let obj:any = JSON.parse(ownsoldierstr);
		obj[0] = value;
		egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS,JSON.stringify(obj));
	}

	public get product_1():number{
		return GameApp.m_product_1;
	}
	public set product_1(value:number){
		if(value <= 0){value = 0}
		GameApp.m_product_1 = value;
		let ownsoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
		let obj:any = JSON.parse(ownsoldierstr);
		obj[1] = value;
		egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS,JSON.stringify(obj));
	}

	public get product_2():number{
		return GameApp.m_product_2
	}
	public set product_2(value:number){
		if(value <= 0){value = 0}
		GameApp.m_product_2 = value;
		let ownsoldierstr:string = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
		let obj:any = JSON.parse(ownsoldierstr);
		obj[2] = value;
		egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS,JSON.stringify(obj));
	}

	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}
window["gold"] = 0