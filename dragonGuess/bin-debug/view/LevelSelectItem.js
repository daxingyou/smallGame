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
var LevelSelectItem = (function (_super) {
    __extends(LevelSelectItem, _super);
    function LevelSelectItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "LevelSelectItemSkin";
        return _this;
    }
    LevelSelectItem.prototype.dataChanged = function () {
        if (this.data.img) {
            this.icon.source = this.data.img;
        }
        this.lockGroup.visible = !parseInt(this.data.start);
    };
    Object.defineProperty(LevelSelectItem.prototype, "isClick", {
        get: function () {
            return !this.lockGroup.visible;
        },
        enumerable: true,
        configurable: true
    });
    return LevelSelectItem;
}(eui.ItemRenderer));
__reflect(LevelSelectItem.prototype, "LevelSelectItem");
//# sourceMappingURL=LevelSelectItem.js.map