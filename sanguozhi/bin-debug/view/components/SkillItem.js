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
var SkillItem = (function (_super) {
    __extends(SkillItem, _super);
    function SkillItem() {
        var _this = _super.call(this) || this;
        _this.canPro = false;
        _this.skinName = "SkillItemSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        return _this;
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchBegin, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
    }
    SkillItem.prototype.dataChanged = function () {
        this.cfg = this.data;
        this.item.source = "skill_" + this.cfg.skillIcon + "_png";
        this.numLab.text = this.cfg.ownNum.toString();
    };
    Object.defineProperty(SkillItem.prototype, "vo", {
        get: function () {
            return this.cfg;
        },
        enumerable: true,
        configurable: true
    });
    SkillItem.prototype.touchBegin = function (evt) {
        MessageManager.inst().dispatch(LocalStorageEnum.BEGIN_MOVE_CARD, { card: this.data, x: evt.stageX, y: evt.stageY });
    };
    return SkillItem;
}(eui.ItemRenderer));
__reflect(SkillItem.prototype, "SkillItem");
//# sourceMappingURL=SkillItem.js.map