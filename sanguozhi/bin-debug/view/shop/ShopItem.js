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
 * 商店控件 syy
 */
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        /**
         * 当前金币
         */
        _this.current_money = 0;
        _this.skinName = "ShopItemSkin";
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.initComponent, _this);
        return _this;
    }
    /**
     * @description 初始化組件
     */
    ShopItem.prototype.initComponent = function () {
        this.quality.visible = false;
        this.cityIcon.visible = false;
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.initComponent, this);
        this.buy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyGoods, this);
        this.bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.introduce, this);
    };
    /**
     * 发送消息
     */
    ShopItem.prototype.introduce = function () {
        MessageManager.inst().dispatch(CustomEvt.SHOP_INTRODUCE, this.data);
    };
    /**@description 顯示信息 */
    ShopItem.prototype.dataChanged = function () {
        this.initData(this.data);
    };
    ShopItem.prototype.initData = function (data, isshow) {
        if (isshow === void 0) { isshow = true; }
        this.money_label.text = data.cost;
        // this.name_label.text=this.data.name;
        if (data.type == CardType.general) {
            this.cityIcon.visible = true;
            this.cityIcon.source = "city_" + data.city + "_png";
        }
        else {
            this.cityIcon.visible = false;
        }
        this.bg.source = data.cardModel;
        if (data.type == CardType.skill || data.type == CardType.special_skill || data.type == CardType.prop) {
            this.quality.visible = true;
            this.quality.source = "quality_" + data.quality + "_png";
        }
        else {
            this.quality.visible = false;
        }
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
            if (data.type == CardType.general) {
                this.attrLab.visible = this.hpLab.visible = this.atkLab.visible = true;
                this.hpLab.text = "生命:" + data.hp;
                this.atkLab.text = "攻击:" + data.atk;
            }
            else {
                this.attrLab.visible = true;
                this.descLab.visible = true;
                this.descLab.text = data.name;
            }
            this.attrLab.text = "等级:" + data.level + " 碎片:" + data.ownNum;
        }
        this.goldImg.visible = isshow;
        this.buy_btn.visible = isshow;
        this.money_label.visible = isshow;
    };
    /**@description 購買請求 */
    ShopItem.prototype.buyGoods = function () {
        if (GameApp.gold >= this.data.cost) {
            GameApp.gold -= this.data.cost;
            var index = -1;
            if (this.data.insId == 100108) {
                UserTips.inst().showTips("\u83B7\u5F97" + this.data.name + "x" + this.data.atk);
                GameApp.goods += this.data.atk;
                index = -1;
            }
            else if (this.data.insId == 100107) {
                UserTips.inst().showTips("\u83B7\u5F97" + this.data.name + "x10");
                GameApp.soldier2Num += 10;
                index = 2;
            }
            else if (this.data.insId == 100106) {
                UserTips.inst().showTips("\u83B7\u5F97" + this.data.name + "x10");
                GameApp.soldier3Num += 10;
                index = 3;
            }
            else if (this.data.insId == 100105) {
                UserTips.inst().showTips("\u83B7\u5F97" + this.data.name + "x10");
                index = 1;
                GameApp.soldier1Num += 10;
            }
            else {
                var ownNum = GlobalFun.getCardDataFromId(this.data.insId, ["ownNum"]).ownNum;
                ownNum += 1;
                index = 4;
                GlobalFun.refreshCardData(this.data.insId, { ownNum: ownNum });
                UserTips.inst().showTips("\u83B7\u5F97" + this.data.name + "x1");
            }
            MessageManager.inst().dispatch(CustomEvt.CARD_REFRESH, { index: index });
        }
        else {
            UserTips.inst().showTips("元宝不足");
        }
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map