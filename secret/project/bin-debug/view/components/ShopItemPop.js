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
var ShopItemPop = (function (_super) {
    __extends(ShopItemPop, _super);
    function ShopItemPop() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopItemSkin";
        return _this;
    }
    ShopItemPop.prototype.childrenCreated = function () {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShopItemPop.prototype.onTouchTap = function (evt) {
        console.log("buy" + this.data);
        GlobalFun.sendToNativePhurse({ goodid: this.data.goodid, goodnum: this.data.goldNum, goodtype: 1, price: this.data.costNum });
    };
    ShopItemPop.prototype.dataChanged = function () {
        this.icon.source = this.data.icon;
        this.descLab.text = this.data.desc;
    };
    return ShopItemPop;
}(eui.ItemRenderer));
__reflect(ShopItemPop.prototype, "ShopItemPop");
//# sourceMappingURL=ShopItemPop.js.map