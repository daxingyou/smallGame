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
var LevelItem = (function (_super) {
    __extends(LevelItem, _super);
    function LevelItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "LevelItemSkin";
        return _this;
    }
    LevelItem.prototype.dataChanged = function () {
        this.icon.source = "level_" + (this.itemIndex + 1) + "_png";
        if (this.itemIndex > 0 && this.itemIndex != 9) {
            var lockStr = egret.localStorage.getItem("lock_" + this.itemIndex);
            if (!lockStr) {
                this.lockImg.visible = true;
                this.lockBoo = true;
            }
            else {
                this.lockImg.visible = false;
                this.lockBoo = false;
            }
        }
        else {
            this.lockImg.visible = false;
            this.lockBoo = false;
        }
    };
    LevelItem.prototype.lock = function () {
        egret.localStorage.setItem("lock_" + this.itemIndex, "1");
        this.lockImg.visible = false;
        this.lockBoo = false;
    };
    Object.defineProperty(LevelItem.prototype, "lockState", {
        get: function () {
            return this.lockBoo;
        },
        enumerable: true,
        configurable: true
    });
    return LevelItem;
}(eui.ItemRenderer));
__reflect(LevelItem.prototype, "LevelItem");
//# sourceMappingURL=LevelItem.js.map