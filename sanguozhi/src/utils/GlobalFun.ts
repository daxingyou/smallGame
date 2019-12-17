/**
 * 共用方法
 */
class GlobalFun {
	public constructor() {
	}
    
	public static getOption(key:string):string {
        if (window.location) {
            let search = location.search;
            if (search == "") {
                return "";
            }
            search = search.slice(1);
            let searchArr = search.split("&");
            let length = searchArr.length;
            for (let i:number = 0; i < length; i++) {
                let str = searchArr[i];
                let arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return "";
    } 
	private static initX:number;                //初始位置
    private static initY: number;  
    private static target:egret.DisplayObject;  //震动目标
    private static maxDis: number;              //震动距离
    private static count: number = 0;           //计时器次数
    private static rate: number;                //一秒震动次数
    private static timer:egret.Timer = new egret.Timer(1000);
	/**
     * 震动显示对象
     * @param        target    震动目标对象
     * @param        time      震动持续时长（秒）
     * @param        rate      震动频率(一秒震动多少次)
     * @param        maxDis    震动最大距离
     */
	public static shakeObj(target: egret.DisplayObject,time: number,rate: number,maxDis: number):void{
		this.target = target;
        this.initX = target.x;
        this.initY = target.y;
        this.maxDis = maxDis;
        this.count = time * rate;
        this.rate = rate;
        this.timer.delay = 1000/rate;
        this.timer.repeatCount = this.count;
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.shaking, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.shakeComplete, this);
        this.timer.reset();
        this.timer.start();
	}
    private static showstate:boolean = false;
    private static leaf:any;
    /**show leaf */
    public static showAnimateleaf(){
        if(this.showstate){return}
        this.showstate = true;
        var leafContainer = document.querySelector('.falling-leaves');
		this.leaf = new window["LeafScene"](leafContainer);
		this.leaf.init();
		this.leaf.render();
		let self = this;
    }
    public static stopAnimateleaf():void{
       this.showstate = false;
       if(this.leaf){
           this.leaf["stop"]();
       }
    }
	private static shaking(): void {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random()*this.maxDis*2;
        this.target.y = this.initY - this.maxDis +  Math.random()*this.maxDis*2;
        egret.Tween.get(this.target).to({x:this.initX, y:this.initY},999/this.rate);    
    }
    /**外法光 */
    public static lighting(obj:egret.DisplayObject,color:number = 0xEFAE10,boo:boolean = false):void{
        var color:number = color;        /// 光晕的颜色，十六进制，不包含透明度
        var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner:boolean = boo;            /// 指定发光是否为内侧发光，暂未实现
        var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
            strength, quality, inner, knockout );
        obj.filters = [glowFilter]
        
        egret.Tween.get(glowFilter,{loop:true}).to({alpha:0.2},1000).to({alpha:0.8},1000);
    }
    private static shakeComplete(): void {
        if(this.target){
            egret.Tween.removeTweens(this.target);
            this.target.x = this.initX;
            this.target.y = this.initY;
        }
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.shaking,this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.shakeComplete,this);
    }
	/**停止震动 */
    public static stop(){
        this.shakeComplete();
    }
    public static filterToGrey(tar:egret.DisplayObject):void{
        var colorMatrix = [
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0.3,0.6,0,0,0,
            0,0,0,1,0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    }
    public static skillBuffFilter(buffid,tar){
        var colorMatrix = [];
        switch(buffid){
            case 10000:
                //紫色 --狂暴
                colorMatrix = [
                    1,0,0,0,196,
                    0,1,0,0,64,
                    0,0,1,0,201,
                    0,0,0,1,0
                ]
                break;
            case 10001:
                //智谋-- 绿色
                colorMatrix = [
                    1,0,0,0,102,
                    0,1,0,0,158,
                    0,0,1,0,39,
                    0,0,0,1,0
                ]
                break;
            case 10002:
                //防御--黄色
                colorMatrix = [
                    1,0,0,0,155,
                    0,1,0,0,128,
                    0,0,1,0,26,
                    0,0,0,1,0
                ]
                break;
        }
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        tar.filters = [colorFlilter];
    }
    public static clearFilters(tar:egret.DisplayObject):void{
        tar.filters = [];
    }
    /**发送到ios请求购买 */
    public static sendToNativePhurse(_data:{goodid:number,goodnum:number,goodtype:number,price:number}):void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood)
        {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    }
    /**发送ios加载完成 */
    public static sendToNativeLoadEnd():void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish)
        {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    }
    /**购买返回 */
    public static payCallBack(_cb):void{
        GameApp.pay_cbDdata = _cb;
    }
    /**创建了角色信息后调用 */
    public static changeName(name:string){
        GameApp.roleInfo.name = name;
        egret.localStorage.setItem(LocalStorageEnum.ROLEINFO,JSON.stringify(GameApp.roleInfo));
    }
    /**
     * 根据类型获取人物拥有的卡牌数据
     * type: CardType.build || CardType.general...
     * 
     * isJudge 会判断是否拥有 。参数为false 将会返回 拥有的卡牌数据 。 参数为true 将会返回对应类型的所有卡牌数据
     */
    public static getCardsFromType(type:number,isJudge:boolean = false):CardAttrVo[]{
        let arr:CardAttrVo[] = [];
       
        for(let i:number = 0;i<GameApp.cardInfo.length;i++){
            let itemCardVo:CardAttrVo = GameApp.cardInfo[i];
             let condition:boolean = isJudge?true:(itemCardVo.level > 1 || itemCardVo.ownNum > 0);
            if(itemCardVo.type == type && condition){
                //类型相同 。并且 等级大于1 或者 拥有的数量 大于0 说明已经拥有；
                arr.push(this.deepObj(itemCardVo));
            }
        }
        return arr;
    }
    /**获取我当前拥有的卡牌信息 */
    public static getOwnCards():CardAttrVo[]{
       let arr:CardAttrVo[] = [];
        for(let i:number = 0;i<GameApp.cardInfo.length;i++){
            let itemCardVo:CardAttrVo = GameApp.cardInfo[i];
            if((itemCardVo.level > 1 || itemCardVo.ownNum > 0)){
                //类型相同 。并且 等级大于1 或者 拥有的数量 大于0 说明已经拥有；
                arr.push(this.deepObj(itemCardVo));
            }
        }
        return arr;
    }
    /**根据id获得对应的卡牌数据 
     * 
     * cardid 卡牌的id；返回 CardAttrVo类型
     * 
     * attr 对应 CardAttrVo中的键值 将会返回对应键值的数据 eg: 传入 ["ownNum","atk","hp"] 返回：{ownNum:1,atk:200,hp:500};
     * 
    */
    public static getCardDataFromId(cardid:number,attr?:string[]):any{
        let cardVo:CardAttrVo = null;
        for(let i:number = 0;i<GameApp.cardInfo.length;i++){
            if(GameApp.cardInfo[i].insId == cardid){
                cardVo = this.deepObj(GameApp.cardInfo[i]);
                break;
            }
        }
        if(!cardVo){
            console.error("传入的卡牌id不存在数据-----insid:"+cardid);
        }else{
            if(attr){
                let obj:any = {};
                for(let i:number = 0;i<attr.length;i++){
                    obj[attr[i]] = cardVo[attr[i]];
                }
                return obj;
            }
            return cardVo;
        }
    }
    /**获取阵型 
     * ownSolderis 数据
     * state 0玩家 1npc
    */
    public static getFormation(ownSolderis:SoldierRect[], state:number,entitys:SoldierEntity[])
    {
        let group:eui.Group = new eui.Group();
        let group0:eui.Group = new eui.Group();
        let group1:eui.Group = new eui.Group();
        let group2:eui.Group = new eui.Group();
        group.addChild(group0);
        group.addChild(group1);
        group.addChild(group2);
        let formation:number = 0; /**方阵数 */
        let lie:number = 0;
        let pos:any[] = [{x1:-3, x2:10, x3:-13.53, x4:198.3},{x1:0, x2:12, x3:-29.59, x4:198.3},{x1:7, x2:14, x3:-50.59, x4:200.3}];
        group.width = 692;
        group.height = 471;
        group0.width = 150;
        group0.height = 471;
        group1.width = 150;
        group1.height = 471;
        group2.width = 150;
        group2.height = 471;
        
        switch(state)
        {
            case 0:
                group0.x = 431.12;
                group0.y = 41.83;
                group1.x = 313.15;
                group1.y = 41.83;
                group2.x = 198.82;
                group2.y = 39.83;
                for(let i = 0; i < 3; i++)
                {
                    let _group = group.getChildAt(i) as eui.Group;
                    if(ownSolderis[i].generalId != 0)
                    {
                        formation = 6;
                    }else
                    {
                        formation = 4;
                    }
                    switch(ownSolderis[i].soldierID)
                    {
                        case 100105:
                        case 100107:
                        case 100109:
                        case 100110:
                        case 100113:
                            lie = 3;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {
                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:100,hp:100,type:ownSolderis[i].soldierType}
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.setSoldierData(state==0?1:-1,`${EFFECT}role_${ownSolderis[i].soldierID}`);
                                    entitys.push(ani)
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    _group.addChild(ani);
                                    if(formation == 4)
                                    {
                                        ani.x = 6 + k * 30 - Math.floor(j/4) * pos[i].x1 - j * pos[i].x2;
                                        ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
                                    }else if(formation == 6)
                                    {
                                        // ani.x = 6 + k * 30 - Math.floor(j/6) * pos[i].x1 - j * pos[i].x2;
								        // ani.y = 18 + j * 30 + Math.floor(j/6) * 30;
                                        ani.x = 6 + k * 30 - Math.floor(j/6) * (pos[i].x1 + 20 + i * 2) * ani.scaleX - j * (pos[i].x2 - 2);
								        ani.y = 10 + j * 27 + Math.floor(j/6) * 70;
                                    }
                                }
                            }
                            break;
                        case 100106:
                        case 100111:
                        case 100112:
                            lie = 2;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {
                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:100,hp:100,type:ownSolderis[i].soldierType}
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.scaleX = ani.scaleY = 0.5;
                                    ani.setSoldierData(state==0?1:-1,`${EFFECT}role_${ownSolderis[i].soldierID}`)
                                    entitys.push(ani)
                                    _group.addChild(ani);
                                    if(formation == 4)
                                    {
                                        ani.x = 8 + k * 52 - Math.floor(j/4) * pos[i].x1 * ani.scaleX - j * pos[i].x2;
								        ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
                                    }else if(formation == 6)
                                    {
                                        // ani.x = 8 + k * 52 - Math.floor(j/6) * pos[i].x1 * ani.scaleX - j * pos[i].x2;
								        // ani.y = 18 + j * 30 + Math.floor(j/6) * 30;

                                        ani.x = 8 + k * 52 - Math.floor(j/6) * (pos[i].x1 + 20 + i * 8) * ani.scaleX - j * (pos[i].x2 - 2);
								        ani.y = 8 + j * 27 + Math.floor(j/6) * 76;
                                    }
                                }
                            }
                            break;
                    }
                    if(formation == 6)
                    {
                        let bool:boolean = false;
                        if(!bool)
                        {
                            bool = true;
                            let ani_1:SoldierEntity = new SoldierEntity();
                            let vo:RoleVo = {level:1,atk:200,hp:500,type:3}
                            ani_1.soldierAttr = vo;
                            ani_1.general = true;
                            ani_1.generalId = ownSolderis[i].generalId;
                            ani_1.parentGroupIndex = i;
                            entitys.push(ani_1)
                            ani_1.setSoldierData(state==0?1:-1,`${EFFECT}role_${ownSolderis[i].generalId}`);
                            // ani_1.playFile(`${EFFECT}role_${ownSolderis[i].generalId}_stand`, -1);
                            ani_1.x = pos[i].x3;
                            ani_1.y = pos[i].x4;
                            _group.addChildAt(ani_1, 9999999);
                        }
                    }
                }
                break;
            case 1:
                group2.x = 431.12;
                group2.y = 41.83;
                group1.x = 313.15;
                group1.y = 41.83;
                group0.x = 198.82;
                group0.y = 39.83;
                 for(let i = 0; i < 3; i++)
                {
                    let _group = group.getChildAt(i) as eui.Group;
                    if(ownSolderis[i].generalId != 0)
                    {
                        formation = 6;
                    }else
                    {
                        formation = 4;
                    }
                    switch(ownSolderis[i].soldierID)
                    {
                        case 100105:
                        case 100107:
                        case 100109:
                        case 100110:
                        case 100113:
                            lie = 3;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {

                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:100,hp:100,type:ownSolderis[i].soldierType}
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.setSoldierData(state == 1?-1:0,`${EFFECT}role_${ownSolderis[i].soldierID}`)
                                    entitys.push(ani)
                                    // let ani:MovieClip = new MovieClip();
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    ani.scaleX = -1;
                                    _group.addChild(ani);
                                    if(formation == 4)
                                    {
                                        ani.x = 6 + k * 30 + Math.floor(j/4) * pos[i].x1 + j * pos[i].x2;
                                        ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
                                    }else if(formation == 6)
                                    {
                                        ani.x = 6 + k * 30 + Math.floor(j/6) * pos[i].x1 + j * pos[i].x2;
								        ani.y = 18 + j * 30 + Math.floor(j/6) * 30;
                                    }
                                }
                            }
                            if(formation == 6)
                            {
                                let bool:boolean = false;
                                if(!bool)
                                {
                                    bool = true;

                                    let ani_1:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:200,hp:500,type:3}
                                    ani_1.soldierAttr = vo;
                                    ani_1.general = true;
                                    ani_1.generalId = ownSolderis[i].generalId;
                                    ani_1.parentGroupIndex = i;
                                    ani_1.setSoldierData(state==1?-1:1,`${EFFECT}role_${ownSolderis[i].generalId}`);
                                    entitys.push(ani_1)
                                    // let ani_1:MovieClip = new MovieClip();
                                    // ani_1.playFile(`${EFFECT}role_${ownSolderis[i].generalId}_stand`, -1);
                                    ani_1.x = -pos[i].x3;
                                    ani_1.y = pos[i].x4;
                                    ani_1.scaleX = -1;
                                    _group.addChildAt(ani_1, 9999999);
                                }
                            }
                            break;
                        case 100106:
                        case 100111:
                        case 100112:
                            lie = 2;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {
                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:100,hp:100,type:ownSolderis[i].soldierType}
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.scaleX = ani.scaleY = 0.5;
                                    ani.setSoldierData(state == 1?-1:0,`${EFFECT}role_${ownSolderis[i].soldierID}`)
                                    entitys.push(ani)
                                    // let ani:MovieClip = new MovieClip();
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    ani.scaleX = -1;
                                    _group.addChild(ani);
                                    if(formation == 4)
                                    {
                                        ani.x = 8 + k * 52 + Math.floor(j/4) * pos[i].x1 * ani.scaleX + j * pos[i].x2;
								        ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
                                    }else if(formation == 6)
                                    {
                                        ani.x = 8 + k * 52 + Math.floor(j/6) * pos[i].x1 * ani.scaleX + j * pos[i].x2;
								        ani.y = 18 + j * 30 + Math.floor(j/6) * 30;
                                    }
                                }
                            }
                            if(formation == 6)
                            {
                                let bool:boolean = false;
                                if(!bool)
                                {
                                    bool = true;
                                    let ani_1:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:200,hp:500,type:3}
                                    ani_1.soldierAttr = vo;
                                    ani_1.general = true;
                                    ani_1.generalId = ownSolderis[i].generalId;
                                    ani_1.parentGroupIndex = i;
                                    ani_1.setSoldierData(state==1?-1:1,`${EFFECT}role_${ownSolderis[i].generalId}`);
                                    entitys.push(ani_1)
                                    // let ani_1:MovieClip = new MovieClip();
                                    // ani_1.playFile(`${EFFECT}role_${ownSolderis[i].generalId}_stand`, -1);
                                    ani_1.x = -pos[i].x3;
                                    ani_1.y = pos[i].x4;
                                    ani_1.scaleX = -1;
                                    _group.addChildAt(ani_1, 9999999);
                                }
                            }
                            break;
                    }
                }
                break;
        }
        return {group:group, group0:group0, group1:group1, group2:group2};
    }
    /**
     * 更新卡牌数据 
     * 
     * cardid 卡牌id
     * 
     * attr 对应要更改的数据 注意：键值需要与 CardAttrVo一致 。 eg: {ownNum:20,atk:200} 会直接覆盖 不会做逻辑算法
    */
    public static refreshCardData(cardId:number,attr:any):void{
        let cardAttr:CardAttrVo;
        for(let i:number = 0;i<GameApp.cardInfo.length;i++){
            if(GameApp.cardInfo[i].insId == cardId){
                cardAttr = GameApp.cardInfo[i];
                break;
            }
        }
        if(!cardAttr){
            console.error("传入的卡牌id不存在数据-----insid:"+cardId);
            return;
        }
        for(let key in attr){
            cardAttr[key] = attr[key];
        }
        egret.localStorage.setItem(LocalStorageEnum.CARDINFO,JSON.stringify(GameApp.cardInfo));
    }
    /**
     * 获取当前城池信息 
     * 
     * id：城市id 对应关卡id 123456789；
     * */
    public static getCityInfo(id:number):CityInfo{
        let citys:CityInfo[] = GameApp.roleInfo.citys;
        for(let i:number = 0;i<citys.length;i++){
            if(citys[i].cityId == id){
                return this.deepObj(citys[i])
            }
        }
    }
    /**
     * 修改当前城池信息 
     * 
     * id:城市id 对应关卡id 123456789；
     * 
     * attr 对应RoleInfoVo 中的 CityInfo中的键值 eg {isMain:true,timespan:30000}
     * */
    public static changeCityInfo(id:number,attr:any){
        let citys:CityInfo[] = GameApp.roleInfo.citys;
        let curCityInfo:CityInfo;
        for(let i:number = 0;i<citys.length;i++){
            if(citys[i].cityId == id){
                curCityInfo = citys[i];
                break;
            }
        }
        if(!curCityInfo){
            console.error("当前城池id错误----cityId："+id);
            return;
        }else{
            for(let key in attr){
                curCityInfo[key] = attr[key];
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLEINFO,JSON.stringify(GameApp.roleInfo));
    }

    /**更改当前年限 */
    public static getYearShow():string{
        let year:number = GameApp.year;
        let yearArr:string[] = year.toString().split("");
        var cnNums:string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        return `西元${cnNums[parseInt(yearArr[0])]}${cnNums[parseInt(yearArr[1])]}${cnNums[parseInt(yearArr[2])]}年${cnNums[parseInt(yearArr[3])]}月`
    }
    /**获取对应阵营英雄的问题列表 */;
    public static getCityHeroQuestion(city:number):any[]{
        let questions:any[] = QuestionCfg.cfgs[city];
        return questions;
    }
    private static deepObj(param:any):any{
        let obj:any = {};
        for(let key in param){
            obj[key] = param[key];
        }
        return obj;
    }
    /*
	*判断本地存储
	*/
	public static judgelocalStorage():boolean
	{
		if(egret.localStorage.getItem("sanguozhi_shop"))
		{
			return true;
		}else
		{
			return false;
		}
	}
	/*
	*得到本地数据
	*/
	public static getlocalStorage():Object
	{
		let objString=egret.localStorage.getItem("sanguozhi_shop");
		let obj=JSON.parse(objString);
		return obj;
	}
	/*
	*存储本地数据
	*/
	public static savelocalStorage(obj:Object)
	{
		egret.localStorage.setItem("sanguozhi_shop",JSON.stringify(obj));
	}
    private static cloudInit:boolean = false;
    /**显示云彩 */
    public static showCloudAni(time:number,cb:()=>void,arg:any):void{
        let cloud:any = document.getElementsByClassName( 'cloud' )[0];
        if(!GlobalFun.cloudInit){
            GlobalFun.cloudInit = true;
            window["showCloud"]();
        }else{
            window["playCloud"]();
        }
        if(cloud){
            cloud.style.transition = `opacity ${time}s`
            cloud.style.visibility = "visible";
            cloud.style.opacity = 1;
            // cloud.style.left = "0px";
        }
        let timeout = setTimeout(function() {
            clearTimeout(timeout);
            GlobalFun.hideCloudAni(2);
            if(cb&& arg){cb.call(arg)}
        }, time*1000);
    }
    /**隐藏云彩 */
    public static hideCloudAni(time):void{
        let cloud:any = document.getElementsByClassName( 'cloud' )[0];
        if(cloud){
            
            cloud.style.opacity = 0;
            let timeout = setTimeout(function() {
                cloud.style.transition = 'none';
                clearTimeout(timeout);
                cloud.style.display = "hidden";
                window["stopAni"]();
            }, time*1000);
            // cloud.style.left = "-9999px";
        }
    }
}
