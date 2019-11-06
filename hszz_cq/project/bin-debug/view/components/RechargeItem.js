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
var RechargeItem = (function (_super) {
    __extends(RechargeItem, _super);
    function RechargeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "RechargeItemSkin";
        return _this;
    }
    RechargeItem.prototype.childrenCreated = function () {
        this.phurseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuy, this);
    };
    RechargeItem.prototype.onBuy = function () {
        console.log({ goodid: this.data.goodid, goodnum: this.data.goldNum, goodtype: 0, price: this.data.costNum });
        GlobalFun.sendToNativePhurse({ goodid: this.data.goodid, goodnum: this.data.goldNum, goodtype: 0, price: this.data.costNum });
    };
    RechargeItem.prototype.dataChanged = function () {
        this.icon.source = this.data.icon;
        this.costLab.text = this.data.cost;
        this.descLab.text = this.data.desc;
    };
    return RechargeItem;
}(eui.ItemRenderer));
__reflect(RechargeItem.prototype, "RechargeItem");
//# sourceMappingURL=RechargeItem.js.map