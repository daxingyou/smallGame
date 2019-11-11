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
var HeroCardItem = (function (_super) {
    __extends(HeroCardItem, _super);
    function HeroCardItem(attrData) {
        var _this = _super.call(this) || this;
        _this.skinName = "HeroCardItemSkin";
        _this.curHeroAttr = attrData;
        _this.touchEnabled = true;
        _this.touchChildren = false;
        return _this;
    }
    HeroCardItem.prototype.childrenCreated = function () {
        this.focusGroup.visible = false;
        this.nameLab.text = this.curHeroAttr.name;
        this.heroImg.source = this.curHeroAttr.icon;
        this.typeIcon.source = "type_" + this.curHeroAttr.type + "_png";
        this.focusGroup.visible = false;
    };
    Object.defineProperty(HeroCardItem.prototype, "attr", {
        get: function () {
            return this.curHeroAttr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroCardItem.prototype, "focus", {
        set: function (value) {
            this.focusGroup.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return HeroCardItem;
}(eui.Component));
__reflect(HeroCardItem.prototype, "HeroCardItem");
//# sourceMappingURL=HeroCardItem.js.map