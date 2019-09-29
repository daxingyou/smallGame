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
var BagItem_bg = (function (_super) {
    __extends(BagItem_bg, _super);
    function BagItem_bg() {
        var _this = _super.call(this) || this;
        _this.skinName = "BagItem_bgSkin";
        _this.card_img.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        return _this;
    }
    BagItem_bg.prototype.dataChanged = function () {
        if (this.data == null) {
            this.card_img.visible = false;
        }
        else {
            this.card_img.visible = true;
            this.card_img.source = this.data.instId + "_jpg";
        }
    };
    BagItem_bg.prototype.touchTap = function () {
        ViewManager.inst().open(BagTip, [this.data]);
    };
    return BagItem_bg;
}(eui.ItemRenderer));
__reflect(BagItem_bg.prototype, "BagItem_bg");
//# sourceMappingURL=BagItem_bg.js.map