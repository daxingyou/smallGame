/**
 * @author
 */
class GameApp extends BaseClass {

	
	public static pay_cbDdata:string;

	public static phurseState:boolean = false;
	public static readonly qualityColor = {1:0x76ff39,2:0x3ecfff,3:0xbf11ff,4:0xffd800}
	/**主城是否开启税收 */
	public static mainStartTax:boolean;
	/**粮草 */
	public static goods:number = 0;
	/**元宝 */
	public static gold:number = 0;
	/**勋章值 */
	public static medal:number = 0;


	/** 弓兵数量*/
	public static soldier1Num:number = 200;
	/** 步兵数量*/
	public static soldier2Num:number = 400;
	/**骑兵数量 */
	public static soldier3Num:number = 100;
	/**当前年限 */
	public static year:number = 0;
	/**人物信息 */
	public static roleInfo:RoleInfoVo;
	/** 卡牌信息*/
	public static cardInfo:CardAttrVo[];

	/** 总关卡配置9关*/
	public static readonly tolevel:number = 9;

	/**当前战斗的城池关卡信息 */
	public static battleMark:string;

	/**关卡id */
	public static chapterid:number = 1;
	/**小关卡 */
	public static levelid:number = 1;

	public static guideView:GuideView;

	public static standW:number = 1334;
	public static standH:number = 750;
	public constructor() {
		super();
	}
	public load() {
		eui.Label.default_fontFamily = "Microsoft YaHei";
		// GlobalConfig.parserData();
		// GameMap.init(RES.getRes("map_json"));
		// LoadingUI.inst().hide();
		eui.Binding.bindHandler(GameApp,["pay_cbDdata"],this.onDataCallBack,this);
		LoadingUI.inst().hide();
		// MapView.inst().initMap(true);
		let chapteridstr:string = egret.localStorage.getItem(LocalStorageEnum.CHAPTERID);
		if(chapteridstr){
			GameApp.chapterid = parseInt(chapteridstr);
		}

		let levelidstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVELID);
		if(levelidstr){
			GameApp.levelid = parseInt(levelidstr);
		}
		
		let goldstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
		if(!goldstr){
			GameApp.gold = 500;
		}else{
			GameApp.gold = parseInt(goldstr);
		}
		eui.Binding.bindHandler(GameApp,["gold"],()=>{egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD,GameApp.gold.toString())},this);
		//-------粮草-------
		
		let goodsstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOODS);
		if(!goodsstr){
			GameApp.goods = 600;
		}else{
			GameApp.goods = parseInt(goodsstr);
		}
		eui.Binding.bindHandler(GameApp,["goods"],()=>{egret.localStorage.setItem(LocalStorageEnum.ROLE_GOODS,GameApp.goods.toString())},this);
		//-------勋章-------
		
		let medalstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_MEDAL);
		if(!medalstr){
			GameApp.medal = 100;
		}else{
			GameApp.medal = parseInt(medalstr);
		}
		eui.Binding.bindHandler(GameApp,["medal"],()=>{egret.localStorage.setItem(LocalStorageEnum.ROLE_MEDAL,GameApp.medal.toString())},this);
		//--------骑兵数量=-----
		
		let soldier1str:string = egret.localStorage.getItem(LocalStorageEnum.SOLDIER1);
		if(!soldier1str){
			GameApp.soldier1Num = 500;
		}else{
			GameApp.soldier1Num = parseInt(soldier1str);
		}
		eui.Binding.bindHandler(GameApp,["soldier1Num"],()=>{egret.localStorage.setItem(LocalStorageEnum.SOLDIER1,GameApp.soldier1Num.toString())},this);

		//--------工兵数量=-----
		
		let soldier2str:string = egret.localStorage.getItem(LocalStorageEnum.SOLDIER2);
		if(!soldier2str){
			GameApp.soldier2Num = 500;
		}else{
			GameApp.soldier2Num = parseInt(soldier2str);
		}
		eui.Binding.bindHandler(GameApp,["soldier2Num"],()=>{egret.localStorage.setItem(LocalStorageEnum.SOLDIER2,GameApp.soldier2Num.toString())},this);
		//--------盾甲兵数量=-----
		
		let soldier3str:string = egret.localStorage.getItem(LocalStorageEnum.SOLDIER3);
		if(!soldier3str){
			GameApp.soldier3Num = 500;
		}else{
			GameApp.soldier3Num = parseInt(soldier3str);
		}
		eui.Binding.bindHandler(GameApp,["soldier3Num"],()=>{egret.localStorage.setItem(LocalStorageEnum.SOLDIER3,GameApp.soldier3Num.toString())},this);
		//----------当前年限------
		
		let yearstr:string = egret.localStorage.getItem(LocalStorageEnum.YEAR);
		if(!yearstr){
			GameApp.year = 1902;
		}else{
			GameApp.year = parseInt(yearstr);
		}
		eui.Binding.bindHandler(GameApp,["year"],()=>{egret.localStorage.setItem(LocalStorageEnum.YEAR,GameApp.year.toString())},this);
		//----------人物信息-------
		let roleInfo:string = egret.localStorage.getItem(LocalStorageEnum.ROLEINFO);
		if(!roleInfo){
			let cityArr:CityInfo[] = [];
			for(let i:number = 0;i<GameApp.tolevel;i++){
				let cityInfo:CityInfo = {isOnly:false,cityId:(i+1),isOwn:false,isMain:false,timespan:0,passLevel:0,goodProduce:((Math.random()*200)>>0),isOpen:false,name:"城市名字"}
				cityArr.push(cityInfo);
			}
			let obj:RoleInfoVo = {name:"名字",citys:cityArr};
			GameApp.roleInfo = obj;
			egret.localStorage.setItem(LocalStorageEnum.ROLEINFO,JSON.stringify(GameApp.roleInfo));
		}else{
			GameApp.roleInfo = JSON.parse(roleInfo);
		}
		//---------卡牌信息---------
		let cardInfo:string = egret.localStorage.getItem(LocalStorageEnum.CARDINFO);
		if(!cardInfo){
			GameApp.cardInfo = this.deepCopy();
		}else{
			GameApp.cardInfo = JSON.parse(cardInfo);
		}

		
		// for(let i = 0; i < CardCfg.cfgs.length; i++)
		// {
		// 	GlobalFun.refreshCardData(CardCfg.cfgs[i].insId, CardCfg.cfgs[i]);
		// }
		GlobalFun.sendToNativeLoadEnd();
		// ViewManager.inst().open(GameView);
		let enterFirststr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		if(!enterFirststr){
			ViewManager.inst().open(StartGameView);
		}else{
			ViewManager.inst().open(GameMainView);
		}
		
		
	}
	private deepCopy():CardAttrVo[]{
		let cardcfgs:CardAttrVo[] = CardCfg.cfgs;
		let arr:CardAttrVo[] = [];
		for(let i:number = 0;i<cardcfgs.length;i++){
			let obj:any = {};
			for(let key in cardcfgs[i]){
				obj[key] = cardcfgs[i][key];
			}
			arr.push(obj);
		}
		return arr;
	}
	public static inst():GameApp{
		let _inst:GameApp = this.single<GameApp>();
		return _inst
	}
	private onDataCallBack(value:string):void{
		if(value){
			GameApp.phurseState = false;
			GameApp.gold += parseInt(value);
			// UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
		}
	}
	
	public postPerLoadProgress(itemsLoaded: number, itemsTotal: number): number[] {
		return [itemsLoaded, itemsTotal];
	}
}