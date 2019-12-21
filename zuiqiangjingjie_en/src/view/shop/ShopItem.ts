/**
 * Store controls syy
 */
class ShopItem extends eui.ItemRenderer {
        // private btn: eui.Button;
        // private name_label:eui.Label;
        /**
         * recruitbutton
         */
        private buy_btn:eui.Button;
        private money_label:eui.Label;
        private goldImg:eui.Image;
        /**
         * Background area
         */
        private bg:eui.Image;
        /**
         * Current gold coins
         */
        private current_money:number=0;

        private hpLab:eui.Label;
        private atkLab:eui.Label;
        private attrLab:eui.Label;
        private descLab:eui.Label;
        private rewardLab:eui.Label;
        private rewardBg:eui.Image;
        public constructor() {
            super();
            this.skinName="ShopItemSkin";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initComponent, this);
        }
        /**
         * @description Initialize components
         */
        private initComponent(): void {
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.initComponent, this);
            this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyGoods, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.introduce, this);
        }
        /**
         * send message
         */
        public introduce()
        {
            MessageManager.inst().dispatch(CustomEvt.SHOP_INTRODUCE,this.data);
        }
        /**@description Display information */
        protected dataChanged(): void {
            
            this.initData(this.data)
        }
        private _skinState:string = "";
        public initData(data,isshow:boolean = true,state:string = "normal"):void{
            this.skin.currentState = state;
            this._skinState = state;
            this.invalidateState();
            this.money_label.text=data.cost;
            // this.name_label.text=this.data.name;
            // if(data.type == CardType.general){
            //     this.cityIcon.visible = true;
            //     this.cityIcon.source = "city_"+data.city+"_png";
            // }else{
            //     this.cityIcon.visible = false;
            // }
            this.bg.source = data.cardModel;
            if(state != "normal"){
                this.rewardBg.source = "b"+data.cardModel
            }
            // if(data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.prop){
                
            // }else{
            //     this.quality.visible = false;
            // }
            if(!isshow){
                let eff:MovieClip = new MovieClip();
                this.addChild(eff);
                eff.playFile(`${EFFECT}star`,-1);
                eff.scaleX = eff.scaleY = 0.5;
                eff.x = -20;

                let eff2:MovieClip = new MovieClip();
                this.addChild(eff2);
                eff2.playFile(`${EFFECT}star`,-1);
                eff2.scaleX = eff2.scaleY = 0.5;
                eff2.y = 70;
                if(data.type == CardType.general || data.type == CardType.soldier){
                    this.attrLab.visible = this.hpLab.visible = this.atkLab.visible = true;
                    this.hpLab.text = "life:"+data.hp;
                    this.atkLab.text = "attack:"+data.atk;
                    this.rewardLab.text = "life:"+data.hp + "\n"+"attack:"+data.atk;
                }else{
                    this.attrLab.visible = true;
                    this.descLab.visible = true;
                    this.descLab.text = data.name;
                    this.rewardLab.text = data.name;
                }
                this.goldImg.visible = isshow;
                this.buy_btn.visible = isshow;
                this.money_label.visible = isshow;
                // if(state != "normal"){
                //     return;
                // }
                if(data.insId != 10003 &&  data.insId != 10008){
                    this.attrLab.text = "Grade:"+data.level;
                }
                if(data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.soldier)
                {
                    this.attrLab.horizontalCenter = 0;
                    if(GameCfg.resultBool)
                        this.attrLab.text = "Number："+1;
                    else 
                        this.attrLab.text = "Number："+data.ownNum;
                }
                if(data.insId == 10008 || data.insId == 10003)
                {
                    this.attrLab.horizontalCenter = 0;
                    if(GameCfg.resultBool)
                        this.attrLab.text = "Number："+1;
                    else 
                        this.attrLab.text = "Number："+data.ownNum;
                }
                if(GameCfg.resultBool)
                {
                    if(data.type == CardType.soldier)
                    {
                        this.attrLab.horizontalCenter = 0;
                        if(data.soldierType == 1 || data.soldierType == 2)
                        {
                            this.attrLab.text = "Number："+36;
                        }else if(data.soldierType == 3)
                        {
                            this.attrLab.text = "Number："+24;
                        }
                    }
                }
            }
            
        }
        protected getCurrentState():string{
            return this._skinState;
        }
        /**@description Purchase request */
        private buyGoods(): void {
            if(GameApp.gold>=this.data.cost)
            {
                GameApp.gold -= this.data.cost;
                let index:number = -1;   
                if(this.data.type == CardType.soldier)
                {
                    index = 2;
                    UserTips.inst().showTips(`Get${this.data.name}x36`);
                    let card:CardAttrVo = GlobalFun.getCardDataFromId(this.data.insId);
                    card.ownNum += 36;
                    GlobalFun.refreshCardData(this.data.insId, {ownNum:card.ownNum});
                }else if(this.data.insId == 100108){
                    UserTips.inst().showTips(`Get${this.data.name}x${this.data.atk}`);
                    GameApp.goods += this.data.atk;
                    index = -1;
                }else if(this.data.insId == 100301){
                    UserTips.inst().showTips(`Gain experiencex100`);
                    index = 1;
                    GameApp.exp += 100;
                }else if(this.data.insId == 100302){
                    UserTips.inst().showTips(`Gain experiencex200`);
                    index = 1;
                    GameApp.exp += 200;
                }else if(this.data.insId == 100303){
                    UserTips.inst().showTips(`Gain experiencex400`);
                    index = 1;
                    GameApp.exp += 400;
                }else if(this.data.insId == 10003){
                    UserTips.inst().showTips(`Get information pointsx1`);
                    index = 1;
                    GameApp.intelligence += 1;
                }else{
                    let ownNum:number = GlobalFun.getCardDataFromId(this.data.insId,["ownNum"]).ownNum;
                    ownNum += 1;
                    index = 4;
                    GlobalFun.refreshCardData(this.data.insId,{ownNum:ownNum});
                    UserTips.inst().showTips(`Get${this.data.name}x1`);
                    if( this.data.type == CardType.general ) {
                        for( let i = 0 ; i < ShopCfg.cfgs.length ; i ++ ) {
                            if( this.data.name == ShopCfg.cfgs[i].name ) {
                                let generalstr:string = egret.localStorage.getItem(LocalStorageEnum.GENERALId);
                                let arr:number[] = [];
                                if(generalstr){
                                    arr = JSON.parse(generalstr);
                                    arr.push(ShopCfg.cfgs[i].insId)
                                }else{
                                    arr = [ShopCfg.cfgs[i].insId]
                                }
                                egret.localStorage.setItem(LocalStorageEnum.GENERALId,JSON.stringify(arr));
                                ShopCfg.cfgs.splice( i , 1 );
                            }
                        }
                        MessageManager.inst().dispatch( CustomEvt.UPDATE_SHOP );
                    }
                    
                }
                MessageManager.inst().dispatch(CustomEvt.CARD_REFRESH,{index:index});

                if(this.data.type == CardType.general || this.data.type == CardType.special_skill){

                    let rect:eui.Rect = new eui.Rect(StageUtils.inst().getWidth(),StageUtils.inst().getHeight(),0x000000);
                    LayerManager.TIPS_LAYER.addChild(rect);
                    rect.alpha = 0.8;
                    rect.left = 0;
                    rect.right = 0;
                    rect.top = 0;
                    rect.bottom = 0;

                    let lightMc:MovieClip = new MovieClip();
                    LayerManager.TIPS_LAYER.addChild(lightMc);
                    lightMc.x = StageUtils.inst().getWidth()>>1;
                    lightMc.y = StageUtils.inst().getHeight()>>1;
                    lightMc.scaleX = lightMc.scaleY = 2;
                    lightMc.playFile(`${EFFECT}lighting`,1,null,true);

                    let lightpng:eui.Image = new eui.Image();
                    lightpng.source = "light_png"
                    LayerManager.TIPS_LAYER.addChild(lightpng);
                    lightpng.alpha = 0;
                    lightpng.anchorOffsetX = lightpng.width>>1;
                    lightpng.anchorOffsetY = lightpng.height>>1;
                    lightpng.verticalCenter = 0;
                    lightpng.horizontalCenter = 0;
                    lightpng.scaleX = lightpng.scaleY = 7;

                    let item:ShopItem = new ShopItem();
                    item.alpha = 0;
                    item.anchorOffsetX = item.width>>1;
                    item.anchorOffsetY = item.height>>1;
                    item.touchEnabled = false;
                    item.touchChildren = false;
                    LayerManager.TIPS_LAYER.addChild(item);
                    item.x = StageUtils.inst().getWidth()>>1;
                    item.y = StageUtils.inst().getHeight()>>1;
                    item.scaleX = item.scaleY = 2;
                    item.initData(GlobalFun.getCardDataFromId(this.data.insId),false);
                    let qualityIndex:number = this.data.type == CardType.general?4:this.data.quality;
                    GlobalFun.lighting(item,GameApp.qualityColor[qualityIndex]);
                    let localpos:egret.Point = LayerManager.TIPS_LAYER.globalToLocal(GameApp.cardStaticX,GameApp.cardStaticY);
                    
                    let timeout = setTimeout(function() {
                        lightpng.alpha = 1;
                        clearTimeout(timeout);
                        egret.Tween.get(lightpng).to({rotation:360},2000).call(()=>{
                            egret.Tween.removeTweens(lightpng);
                        },this)
                    }, 300);

                    egret.Tween.get(item).wait(300).to({alpha:1},100).wait(1000).to({alpha:0},100).call(()=>{
                        egret.Tween.removeTweens(item)
                        if(item && item.parent){
                            item.parent.removeChild(item);
                        }
                        if(rect && rect.parent){
                            rect.parent.removeChild(rect);
                        }
                        egret.Tween.removeTweens(lightpng);
                        if(lightpng && lightpng.parent){
                            lightpng.parent.removeChild(lightpng);
                        }
                    },this)
                }
            }else
            {
                // UserTips.inst().showTips("Insufficient gold");
                ViewManager.inst().open(RechargeTipPop);
            }
        }
    }