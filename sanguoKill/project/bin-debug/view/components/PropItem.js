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
var PropItem = (function (_super) {
    __extends(PropItem, _super);
    function PropItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PropItemSkin";
        return _this;
    }
    PropItem.prototype.dataChanged = function () {
        this.cardAttr = this.data;
        this.propImg.source = this.cardAttr.instId + "_jpg";
        this.descLab.text = this.cardAttr.tip;
        this.focus = false;
        if (this.itemIndex == 0) {
            this.focus = true;
        }
    };
    Object.defineProperty(PropItem.prototype, "attr", {
        get: function () {
            return this.cardAttr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropItem.prototype, "focus", {
        set: function (value) {
            this.focusImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return PropItem;
}(eui.ItemRenderer));
__reflect(PropItem.prototype, "PropItem");
//# sourceMappingURL=PropItem.js.map