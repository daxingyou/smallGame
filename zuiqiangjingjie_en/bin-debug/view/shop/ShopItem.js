var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Store controls syy
 */
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        /**
         * Current gold coins
         */
        _this.current_money = 0;
        _this._skinState = "";
        _this.skinName = "ShopItemSkin";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.initComponent, _this);
        return _this;
    }
    /**
     * @description Initialize components
     */
    ShopItem.prototype.initComponent = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.initComponent, this);
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyGoods, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.introduce, this);
    };
    /**
     * send message
     */
    ShopItem.prototype.introduce = function () {
        MessageManager.inst().dispatch(CustomEvt.SHOP_INTRODUCE, this.data);
    };
    /**@description Display information */
    ShopItem.prototype.dataChanged = function () {
        this.initData(this.data);
    };
    ShopItem.prototype.initData = function (data, isshow, state) {
        if (isshow === void 0) { isshow = true; }
        if (state === void 0) { state = "normal"; }
        this.skin.currentState = state;
        this._skinState = state;
        this.invalidateState();
        this.money_label.text = data.cost;
        // this.name_label.text=this.data.name;
        // if(data.type == CardType.general){
        //     this.cityIcon.visible = true;
        //     this.cityIcon.source = "city_"+data.city+"_png";
        // }else{
        //     this.cityIcon.visible = false;
        // }
        this.bg.source = data.cardModel;
        if (state != "normal") {
            this.rewardBg.source = "b" + data.cardModel;
        }
        // if(data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.prop){
        // }else{
        //     this.quality.visible = false;
        // }
        if (!isshow) {
            var eff = new MovieClip();
            this.addChild(eff);
            eff.playFile(EFFECT + "star", -1);
            eff.scaleX = eff.scaleY = 0.5;
            eff.x = -20;
            var eff2 = new MovieClip();
            this.addChild(eff2);
            eff2.playFile(EFFECT + "star", -1);
            eff2.scaleX = eff2.scaleY = 0.5;
            eff2.y = 70;
            if (data.type == CardType.general || data.type == CardType.soldier) {
                this.attrLab.visible = this.hpLab.visible = this.atkLab.visible = true;
                this.hpLab.text = "life:" + data.hp;
                this.atkLab.text = "attack:" + data.atk;
                this.rewardLab.text = "life:" + data.hp + "\n" + "attack:" + data.atk;
            }
            else {
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
            if (data.insId != 10003 && data.insId != 10008) {
                this.attrLab.text = "Grade:" + data.level;
            }
            if (data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.soldier) {
                this.attrLab.horizontalCenter = 0;
                if (GameCfg.resultBool)
                    this.attrLab.text = "Number：" + 1;
                else
                    this.attrLab.text = "Number：" + data.ownNum;
            }
            if (data.insId == 10008 || data.insId == 10003) {
                this.attrLab.horizontalCenter = 0;
                if (GameCfg.resultBool)
                    this.attrLab.text = "Number：" + 1;
                else
                    this.attrLab.text = "Number：" + data.ownNum;
            }
            if (GameCfg.resultBool) {
                if (data.type == CardType.soldier) {
                    this.attrLab.horizontalCenter = 0;
                    if (data.soldierType == 1 || data.soldierType == 2) {
                        this.attrLab.text = "Number：" + 36;
                    }
                    else if (data.soldierType == 3) {
                        this.attrLab.text = "Number：" + 24;
                    }
                }
            }
        }
    };
    ShopItem.prototype.getCurrentState = function () {
        return this._skinState;
    };
    /**@description Purchase request */
    ShopItem.prototype.buyGoods = function () {
        if (GameApp.gold >= this.data.cost) {
            GameApp.gold -= this.data.cost;
            var index = -1;
            if (this.data.type == CardType.soldier) {
                index = 2;
                UserTips.inst().showTips("Get" + this.data.name + "x36");
                var card = GlobalFun.getCardDataFromId(this.data.insId);
                card.ownNum += 36;
                GlobalFun.refreshCardData(this.data.insId, { ownNum: card.ownNum });
            }
            else if (this.data.insId == 100108) {
                UserTips.inst().showTips("Get" + this.data.name + "x" + this.data.atk);
                GameApp.goods += this.data.atk;
                index = -1;
            }
            else if (this.data.insId == 100301) {
                UserTips.inst().showTips("Gain experiencex100");
                index = 1;
                GameApp.exp += 100;
            }
            else if (this.data.insId == 100302) {
                UserTips.inst().showTips("Gain experiencex200");
                index = 1;
                GameApp.exp += 200;
            }
            else if (this.data.insId == 100303) {
                UserTips.inst().showTips("Gain experiencex400");
                index = 1;
                GameApp.exp += 400;
            }
            else if (this.data.insId == 10003) {
                UserTips.inst().showTips("Get information pointsx1");
                index = 1;
                GameApp.intelligence += 1;
            }
            else {
                var ownNum = GlobalFun.getCardDataFromId(this.data.insId, ["ownNum"]).ownNum;
                ownNum += 1;
                index = 4;
                GlobalFun.refreshCardData(this.data.insId, { ownNum: ownNum });
                UserTips.inst().showTips("Get" + this.data.name + "x1");
                if (this.data.type == CardType.general) {
                    for (var i = 0; i < ShopCfg.cfgs.length; i++) {
                        if (this.data.name == ShopCfg.cfgs[i].name) {
                            var generalstr = egret.localStorage.getItem(LocalStorageEnum.GENERALId);
                            var arr = [];
                            if (generalstr) {
                                arr = JSON.parse(generalstr);
                                arr.push(ShopCfg.cfgs[i].insId);
                            }
                            else {
                                arr = [ShopCfg.cfgs[i].insId];
                            }
                            egret.localStorage.setItem(LocalStorageEnum.GENERALId, JSON.stringify(arr));
                            ShopCfg.cfgs.splice(i, 1);
                        }
                    }
                    MessageManager.inst().dispatch(CustomEvt.UPDATE_SHOP);
                }
            }
            MessageManager.inst().dispatch(CustomEvt.CARD_REFRESH, { index: index });
            if (this.data.type == CardType.general || this.data.type == CardType.special_skill) {
                var rect_1 = new eui.Rect(StageUtils.inst().getWidth(), StageUtils.inst().getHeight(), 0x000000);
                LayerManager.TIPS_LAYER.addChild(rect_1);
                rect_1.alpha = 0.8;
                rect_1.left = 0;
                rect_1.right = 0;
                rect_1.top = 0;
                rect_1.bottom = 0;
                var lightMc = new MovieClip();
                LayerManager.TIPS_LAYER.addChild(lightMc);
                lightMc.x = StageUtils.inst().getWidth() >> 1;
                lightMc.y = StageUtils.inst().getHeight() >> 1;
                lightMc.scaleX = lightMc.scaleY = 2;
                lightMc.playFile(EFFECT + "lighting", 1, null, true);
                var lightpng_1 = new eui.Image();
                lightpng_1.source = "light_png";
                LayerManager.TIPS_LAYER.addChild(lightpng_1);
                lightpng_1.alpha = 0;
                lightpng_1.anchorOffsetX = lightpng_1.width >> 1;
                lightpng_1.anchorOffsetY = lightpng_1.height >> 1;
                lightpng_1.verticalCenter = 0;
                lightpng_1.horizontalCenter = 0;
                lightpng_1.scaleX = lightpng_1.scaleY = 7;
                var item_1 = new ShopItem();
                item_1.alpha = 0;
                item_1.anchorOffsetX = item_1.width >> 1;
                item_1.anchorOffsetY = item_1.height >> 1;
                item_1.touchEnabled = false;
                item_1.touchChildren = false;
                LayerManager.TIPS_LAYER.addChild(item_1);
                item_1.x = StageUtils.inst().getWidth() >> 1;
                item_1.y = StageUtils.inst().getHeight() >> 1;
                item_1.scaleX = item_1.scaleY = 2;
                item_1.initData(GlobalFun.getCardDataFromId(this.data.insId), false);
                var qualityIndex = this.data.type == CardType.general ? 4 : this.data.quality;
                GlobalFun.lighting(item_1, GameApp.qualityColor[qualityIndex]);
                var localpos = LayerManager.TIPS_LAYER.globalToLocal(GameApp.cardStaticX, GameApp.cardStaticY);
                var timeout_1 = setTimeout(function () {
                    lightpng_1.alpha = 1;
                    clearTimeout(timeout_1);
                    egret.Tween.get(lightpng_1).to({ rotation: 360 }, 2000).call(function () {
                        egret.Tween.removeTweens(lightpng_1);
                    }, this);
                }, 300);
                egret.Tween.get(item_1).wait(300).to({ alpha: 1 }, 100).wait(1000).to({ alpha: 0 }, 100).call(function () {
                    egret.Tween.removeTweens(item_1);
                    if (item_1 && item_1.parent) {
                        item_1.parent.removeChild(item_1);
                    }
                    if (rect_1 && rect_1.parent) {
                        rect_1.parent.removeChild(rect_1);
                    }
                    egret.Tween.removeTweens(lightpng_1);
                    if (lightpng_1 && lightpng_1.parent) {
                        lightpng_1.parent.removeChild(lightpng_1);
                    }
                }, this);
            }
        }
        else {
            // UserTips.inst().showTips("Insufficient gold");
            ViewManager.inst().open(RechargeTipPop);
        }
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map