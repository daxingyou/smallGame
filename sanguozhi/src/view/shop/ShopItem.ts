/**
 * 商店控件 syy
 */
class ShopItem extends eui.ItemRenderer {
        // private btn: eui.Button;
        // private name_label:eui.Label;
        /**
         * 招募button
         */
        private buy_btn:eui.Button;
        private money_label:eui.Label;
        private quality:eui.Image;
        private cityIcon:eui.Image;
        private goldImg:eui.Image;
        /**
         * 背景区域
         */
        private bg:eui.Image;
        /**
         * 当前金币
         */
        private current_money:number=0;

        private hpLab:eui.Label;
        private atkLab:eui.Label;
        private attrLab:eui.Label;
        private descLab:eui.Label;
        public constructor() {
            super();
            this.skinName="ShopItemSkin";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initComponent, this);
        }
        /**
         * @description 初始化組件
         */
        private initComponent(): void {
            this.quality.visible = false;
            this.cityIcon.visible = false;
            this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.initComponent, this);
            this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyGoods, this);
            this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.introduce, this);
        }
        /**
         * 发送消息
         */
        public introduce()
        {
            MessageManager.inst().dispatch(CustomEvt.SHOP_INTRODUCE,this.data);
        }
        /**@description 顯示信息 */
        protected dataChanged(): void {
            
            this.initData(this.data)
        }
        public initData(data,isshow:boolean = true):void{
            this.money_label.text=data.cost;
            // this.name_label.text=this.data.name;
            if(data.type == CardType.general){
                this.cityIcon.visible = true;
                this.cityIcon.source = "city_"+data.city+"_png";
            }else{
                this.cityIcon.visible = false;
            }
            this.bg.source = data.cardModel
            if(data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.prop){
                this.quality.visible = true;
                this.quality.source = `quality_${data.quality}_png`;
            }else{
                this.quality.visible = false;
            }
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
                if(data.type == CardType.general){
                    this.attrLab.visible = this.hpLab.visible = this.atkLab.visible = true;
                    this.hpLab.text = "生命:"+data.hp;
                    this.atkLab.text = "攻击:"+data.atk;
                }else{
                    this.attrLab.visible = true;
                    this.descLab.visible = true;
                    this.descLab.text = data.name;
                }
                this.attrLab.text = "等级:"+data.level+" 碎片:"+data.ownNum;
                
            }
            this.goldImg.visible = isshow;
            this.buy_btn.visible = isshow;
            this.money_label.visible = isshow;
        }
        /**@description 購買請求 */
        private buyGoods(): void {
            if(GameApp.gold>=this.data.cost)
            {
                GameApp.gold -= this.data.cost;
                let index:number = -1;   
                if(this.data.insId == 100108){
                    UserTips.inst().showTips(`获得${this.data.name}x${this.data.atk}`);
                    GameApp.goods += this.data.atk;
                    index = -1;
                }else if(this.data.insId == 100107){
                    UserTips.inst().showTips(`获得${this.data.name}x10`);
                    GameApp.soldier2Num += 10;
                    index = 2;
                }else if(this.data.insId == 100106){
                    UserTips.inst().showTips(`获得${this.data.name}x10`);
                    GameApp.soldier3Num += 10;
                    index = 3;
                }else if(this.data.insId == 100105){
                    UserTips.inst().showTips(`获得${this.data.name}x10`);
                    index = 1;
                    GameApp.soldier1Num += 10;
                }else{
                    let ownNum:number = GlobalFun.getCardDataFromId(this.data.insId,["ownNum"]).ownNum;
                    ownNum += 1;
                    index = 4;
                    GlobalFun.refreshCardData(this.data.insId,{ownNum:ownNum});
                    UserTips.inst().showTips(`获得${this.data.name}x1`);
                }
                MessageManager.inst().dispatch(CustomEvt.CARD_REFRESH,{index:index});
            }else
            {
                UserTips.inst().showTips("元宝不足");
            }
        }
    }