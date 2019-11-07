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
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopItemSkin";
        _this.btn_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchBuy, _this);
        return _this;
    }
    ShopItem.prototype.dataChanged = function () {
        this.card_img.source = "card_" + this.data.cardId + "_" + this.data.level + "_png";
        this.card_name.text = this.data.name;
        this.card_name.textColor = this.data.qualityColor;
        this.card_num.text = "数量:" + ShopCfg.shopCardAny[ShopCfg.cardAny.indexOf(this.data)].num;
        this.gold.text = (ShopCfg.shopCardAny[ShopCfg.cardAny.indexOf(this.data)].num * this.data.cost) + "";
    };
    ShopItem.prototype.touchBuy = function () {
        if (GameApp.gold >= parseInt(this.gold.text)) {
            GameApp.gold -= parseInt(this.gold.text);
            var card = this.data;
            card.ownNum += ShopCfg.shopCardAny[ShopCfg.cardAny.indexOf(this.data)].num;
            GlobalFun.refreshCardData(card);
            UserTips.inst().showTips("\u83B7\u5F97<font color=" + card.qualityColor + ">" + card.name + "</font>" + card.ownNum);
            // card.ownNum += ShopCfg.shopCardAny[this.data.id - 1001].num;
            // GlobalFun.refreshCardData(card);
        }
        else {
            UserTips.inst().showTips("元宝不足");
        }
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map