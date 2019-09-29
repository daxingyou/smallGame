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
var MainGameViewItem = (function (_super) {
    __extends(MainGameViewItem, _super);
    function MainGameViewItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MainGameViewItemSkin";
        return _this;
    }
    MainGameViewItem.prototype.dataChanged = function () {
        if (this.data.img) {
            this.itemImg.source = this.data.img;
        }
        this._level = this.data.level;
        this._title = this.data.title;
    };
    Object.defineProperty(MainGameViewItem.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainGameViewItem.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    return MainGameViewItem;
}(eui.ItemRenderer));
__reflect(MainGameViewItem.prototype, "MainGameViewItem");
//# sourceMappingURL=MainGameViewItem.js.map