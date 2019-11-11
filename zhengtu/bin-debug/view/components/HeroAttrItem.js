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
var HeroAttrItem = (function (_super) {
    __extends(HeroAttrItem, _super);
    function HeroAttrItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "HeroAttrItemSkin";
        return _this;
    }
    HeroAttrItem.prototype.dataChanged = function () {
        this.nameLab.text = this.data.name;
        this.levelLab.text = "Lv." + (this.data.level + 1);
        this.lockGroup.visible = false;
        this.headImg.source = "general_head_" + this.data.index + "_png";
        if (!this.data.lock) {
            this.lockGroup.visible = true;
        }
        this._attr = this.data;
    };
    Object.defineProperty(HeroAttrItem.prototype, "attr", {
        get: function () {
            return this._attr;
        },
        enumerable: true,
        configurable: true
    });
    return HeroAttrItem;
}(eui.ItemRenderer));
__reflect(HeroAttrItem.prototype, "HeroAttrItem");
//# sourceMappingURL=HeroAttrItem.js.map