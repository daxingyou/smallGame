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
var BagItem = (function (_super) {
    __extends(BagItem, _super);
    function BagItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "BagItemSkin";
        return _this;
    }
    BagItem.prototype.dataChanged = function () {
        this.icon.source = this.data.icon;
        this.numLab.text = this.data.num;
        this.nameLab.text = this.data.name;
    };
    BagItem.prototype.refreshNum = function (num) {
        if (num <= 0) {
            num = 0;
        }
        this.numLab.text = num;
    };
    Object.defineProperty(BagItem.prototype, "num", {
        get: function () {
            return parseInt(this.numLab.text);
        },
        enumerable: true,
        configurable: true
    });
    return BagItem;
}(eui.ItemRenderer));
__reflect(BagItem.prototype, "BagItem");
//# sourceMappingURL=BagItem.js.map