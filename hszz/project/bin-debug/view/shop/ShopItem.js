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
        this.card_img.source = "card_" + this.data.id + "_png";
        this.card_name.text = this.data.name;
        this.card_name.textColor = this.data.qualityColor;
        this.tiao.mask = this.mask_rect;
        this.num_label.text = this.data.ownNum + " / " + this.data.level * 100;
        this.mask_rect.width = this.data.ownNum * (this.tiao.width / (this.data.level * 100));
        this.card_num.text = ShopCfg.shopCardAny[this.data.id - 1].num + "";
        this.gold.text = (ShopCfg.shopCardAny[this.data.id - 1].num * this.data.cost) + "";
    };
    ShopItem.prototype.touchBuy = function () {
        if (GameApp.gold >= (ShopCfg.shopCardAny[this.data.id - 1].num * this.data.cost)) {
            GameApp.gold -= (ShopCfg.shopCardAny[this.data.id - 1].num * this.data.cost);
            var card = GlobalFun.getCardDataFromId(this.data.id);
            card.ownNum += ShopCfg.shopCardAny[this.data.id - 1].num;
            GlobalFun.refreshCardData(card);
        }
        else {
            UserTips.inst().showTips("金币不足");
        }
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map