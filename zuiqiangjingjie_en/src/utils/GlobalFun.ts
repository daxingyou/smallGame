/**
 * Sharing method
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
	private static initX:number;                //initial position
    private static initY: number;  
    private static target:egret.DisplayObject;  //Vibration target
    private static maxDis: number;              //Vibration distance
    private static count: number = 0;           //Number of timers
    private static rate: number;                //Number of vibrations per second
    private static timer:egret.Timer = new egret.Timer(1000);
	/**
     * Vibration display object
     * @param        target    Vibration target object
     * @param        time      Duration of vibration（second）
     * @param        rate      Vibration frequency(How many vibrations per second)
     * @param        maxDis    Maximum vibration distance
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
        // if(this.showstate){return}
        // this.showstate = true;
        // var leafContainer = document.querySelector('.falling-leaves');
		// this.leaf = new window["LeafScene"](leafContainer);
		// this.leaf.init();
		// this.leaf.render();
		// let self = this;
    }
    public static stopAnimateleaf():void{
    //    this.showstate = false;
    //    if(this.leaf){
    //        this.leaf["stop"]();
    //    }
    }
	private static shaking(): void {
        egret.Tween.removeTweens(this.target);
        this.target.x = this.initX - this.maxDis + Math.random()*this.maxDis*2;
        this.target.y = this.initY - this.maxDis +  Math.random()*this.maxDis*2;
        egret.Tween.get(this.target).to({x:this.initX, y:this.initY},999/this.rate);    
    }
    /**External normal light */
    public static lighting(obj:egret.DisplayObject,color:number = 0xEFAE10,boo:boolean = false):void{
        var color:number = color;        /// Halo color，Hexadecimal，No transparency
        var alpha:number = 0.8;             /// Color transparency of halos，Yes. color Transparency setting of parameters。Valid value is 0.0 reach 1.0。for example，0.8 Set transparency value to 80%。
        var blurX:number = 35;              /// Horizontal ambiguity。Valid value is 0 reach 255.0（floating-point）
        var blurY:number = 35;              /// Vertical ambiguity。Valid value is 0 reach 255.0（floating-point）
        var strength:number = 2;            /// Strength of impression，The bigger the value is.，The darker the color is imprinted，And the contrast between the light and the background is stronger。Valid value is 0 reach 255。Not yet realized
        var quality:number = egret.BitmapFilterQuality.HIGH;        /// Number of filter applications，Suggested use BitmapFilterQuality Class to represent
        var inner:boolean = boo;            /// Specifies whether the glow is inside，Not yet realized
        var knockout:boolean = false;            /// Specifies whether the object has a hollowing effect，Not yet realized
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
	/**Stop shaking */
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
                //Violet --Rage
                colorMatrix = [
                    1,0,0,0,196,
                    0,1,0,0,64,
                    0,0,1,0,201,
                    0,0,0,1,0
                ]
                break;
            case 10001:
                //Resourcefulness-- green
                colorMatrix = [
                    1,0,0,0,102,
                    0,1,0,0,158,
                    0,0,1,0,39,
                    0,0,0,1,0
                ]
                break;
            case 10002:
                //defense--yellow
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
    /**Send toiosRequest for purchase */
    public static sendToNativePhurse(_data:{goodid:number,goodnum:number,goodtype:number,price:number}):void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.payGood)
        {
            window["webkit"].messageHandlers.payGood.postMessage(JSON.stringify(_data));
        }
    }
    /**Send outiosLoad complete */
    public static sendToNativeLoadEnd():void{
        if(window["webkit"] &&window["webkit"].messageHandlers && window["webkit"].messageHandlers.loadingFinish)
        {
            window["webkit"].messageHandlers.loadingFinish.postMessage({});
        }
    }
    /**Purchase return */
    public static payCallBack(_cb):void{
        GameApp.pay_cbDdata = _cb;
    }
    /**After the role information is created, it is called. */
    public static changeName(name:string){
        GameApp.roleInfo.name = name;
        egret.localStorage.setItem(LocalStorageEnum.ROLEINFO,JSON.stringify(GameApp.roleInfo));
    }
    /**
     * Get the card data owned by the character according to the type
     * type: CardType.build || CardType.general...
     * 
     * isJudge Will judge whether it has 。Parameter isfalse Will return Card data owned 。 Parameter istrue All card data of the corresponding type will be returned
     */
    public static getCardsFromType(type:number,isJudge:boolean = false):CardAttrVo[]{
        let arr:CardAttrVo[] = [];
       
        for(let i:number = 0;i<GameApp.cardInfo.length;i++){
            let itemCardVo:CardAttrVo = GameApp.cardInfo[i];
             let condition:boolean = isJudge?true:(itemCardVo.level > 1 || itemCardVo.ownNum > 0);
            if(itemCardVo.type == type && condition){
                //Same type 。also Class greater than1 perhaps Quantity owned greater than0 Description already owned；
                arr.push(this.deepObj(itemCardVo));
            }
        }
        return arr;
    }
    /**Get my current card information */
    public static getOwnCards():CardAttrVo[]{
       let arr:CardAttrVo[] = [];
        for(let i:number = 0;i<GameApp.cardInfo.length;i++){
            let itemCardVo:CardAttrVo = GameApp.cardInfo[i];
            if((itemCardVo.level > 1 || itemCardVo.ownNum > 0)){
                //Same type 。also Class greater than1 perhaps Quantity owned greater than0 Description already owned；
                arr.push(this.deepObj(itemCardVo));
            }
        }
        return arr;
    }
    /**according toidGet the corresponding card data 
     * 
     * cardid Cardsid；Return CardAttrVotype
     * 
     * attr Corresponding CardAttrVoKey value in Data of corresponding key value will be returned eg: afferent ["ownNum","atk","hp"] Return：{ownNum:1,atk:200,hp:500};
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
            console.error("Incoming cardsidNo data present-----insid:"+cardid);
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
    /**Acquisition formation 
     * ownSolderis data
     * state 0Game player 1npc
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
        let formation:number = 0; /**Square matrix number */
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
                    let card:CardAttrVo = GlobalFun.getCardDataFromId(ownSolderis[i].soldierID)
                    switch(ownSolderis[i].soldierID)
                    {
                        case 100105:
                        case 100106:
                        case 100112:
                            lie = 3;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {
                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:Math.floor(card.atk/36),hp:Math.floor(card.hp/36),type:ownSolderis[i].soldierType,id:ownSolderis[i].soldierID}
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.setSoldierData(state==0?1:-1,`${EFFECT}role_${ownSolderis[i].soldierID}`);
                                    entitys.push(ani)
                                    // ani.playFile(`${EFFECT}role_${ownSolderis[i].soldierType}_stand`, -1);
                                    _group.addChild(ani);
                                    if(ownSolderis[i].soldierID == 100106)
                                    {
                                        ani.scaleX = ani.scaleY = 0.8;
                                    }
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
                        case 100109:
                        case 100110:
                        case 100113:
                        case 100107:
                            lie = 2;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {
                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:Math.floor(card.atk/24),hp:Math.floor(card.hp/24),type:ownSolderis[i].soldierType,id:ownSolderis[i].soldierID}
                                    ani.parentGroupIndex = i;
                                    ani.soldierAttr = vo;
                                    ani.scaleX = ani.scaleY = 0.5;
                                    ani.setSoldierData(state==0?1:-1,`${EFFECT}role_${ownSolderis[i].soldierID}`)
                                    entitys.push(ani)
                                    _group.addChild(ani);
                                    if(formation == 4)
                                    {
                                        ani.x = 8 + k * 62 - Math.floor(j/4) * pos[i].x1 * ani.scaleX - j * pos[i].x2;
								        ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
                                    }else if(formation == 6)
                                    {
                                        // ani.x = 8 + k * 52 - Math.floor(j/6) * pos[i].x1 * ani.scaleX - j * pos[i].x2;
								        // ani.y = 18 + j * 30 + Math.floor(j/6) * 30;

                                        ani.x = 8 + k * 62 - Math.floor(j/6) * (pos[i].x1 + 20 + i * 8) * ani.scaleX - j * (pos[i].x2 - 2);
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
                            let vo:RoleVo = {level:1,atk:card.atk,hp:card.hp,type:CardType.general,id:ownSolderis[i].generalId}
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
                    let card:CardAttrVo = GlobalFun.getCardDataFromId(ownSolderis[i].soldierID)
                    switch(ownSolderis[i].soldierID)
                    {
                        case 100105:
                        case 100106:
                        case 100112:
                            lie = 3;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {

                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:Math.floor(card.atk / 36),hp:Math.floor(card.hp / 36),type:ownSolderis[i].soldierType,id:ownSolderis[i].soldierID}
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
                                    let vo:RoleVo = {level:1,atk:card.atk,hp:card.hp,type:CardType.general,id:ownSolderis[i].generalId}
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
                        case 100109:
                        case 100110:
                        case 100113:
                        case 100107:
                            lie = 2;
                            for(let k = 0; k < lie; k++)
                            {
                                for(let j = 0; j < 12; j++)
                                {
                                    let ani:SoldierEntity = new SoldierEntity();
                                    let vo:RoleVo = {level:1,atk:Math.floor(card.atk / 24),hp:Math.floor(card.hp / 24),type:ownSolderis[i].soldierType,id:ownSolderis[i].soldierID}
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
                                        ani.x = 8 + k * 62 + Math.floor(j/4) * pos[i].x1 * ani.scaleX + j * pos[i].x2;
								        ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
                                    }else if(formation == 6)
                                    {
                                        ani.x = 8 + k * 62 + Math.floor(j/6) * pos[i].x1 * ani.scaleX + j * pos[i].x2;
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
                                    let vo:RoleVo = {level:1,atk:card.atk,hp:card.hp,type:CardType.general,id:ownSolderis[i].generalId}
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
     * Update card data 
     * 
     * cardid Cardsid
     * 
     * attr Corresponding to the data to be changed Be careful：Key value needs to match CardAttrVoAgreement 。 eg: {ownNum:20,atk:200} Will directly cover No logic algorithm
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
            console.error("Incoming cardsidNo data present-----insid:"+cardId);
            return;
        }
        for(let key in attr){
            cardAttr[key] = attr[key];
        }
        egret.localStorage.setItem(LocalStorageEnum.CARDINFO,JSON.stringify(GameApp.cardInfo));
    }
    /**
     * Get current city information 
     * 
     * id：Cityid Corresponding checkpointsid 123456789；
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
     * Modify the current city information 
     * 
     * id:Cityid Corresponding checkpointsid 123456789；
     * 
     * attr CorrespondingRoleInfoVo Medium CityInfoKey value in eg {isMain:true,timespan:30000}
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
            console.error("Current cityiderror----cityId："+id);
            return;
        }else{
            for(let key in attr){
                curCityInfo[key] = attr[key];
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLEINFO,JSON.stringify(GameApp.roleInfo));
    }

    /**Change current age */
    public static getYearShow():string{
        let year:number = GameApp.year;
        let yearArr:string[] = year.toString().split("");
        var cnNums:string[] = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
        return `West dollar${cnNums[parseInt(yearArr[0])]}${cnNums[parseInt(yearArr[1])]}${cnNums[parseInt(yearArr[2])]}year${cnNums[parseInt(yearArr[3])]}month`
    }
    /**Get the question list of the corresponding camp hero */;
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
	*Judge local storage
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
	*Get local data
	*/
	public static getlocalStorage():Object
	{
		let objString=egret.localStorage.getItem("sanguozhi_shop");
		let obj=JSON.parse(objString);
		return obj;
	}
	/*
	*Store local data
	*/
	public static savelocalStorage(obj:Object)
	{
		egret.localStorage.setItem("sanguozhi_shop",JSON.stringify(obj));
	}
    private static cloudInit:boolean = false;
    /**Display clouds */
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
    /**Hidden clouds */
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
