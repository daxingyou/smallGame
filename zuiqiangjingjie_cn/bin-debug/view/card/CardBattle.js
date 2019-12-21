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
var CardBattle = (function (_super) {
    __extends(CardBattle, _super);
    function CardBattle(_type, _id, data) {
        var _this = _super.call(this) || this;
        _this.move = true;
        _this.skinName = "SkillItemSkin";
        _this.id = _id;
        _this.type = _type;
        _this.cfg = data;
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, _this.removeMove, _this);
        return _this;
    }
    CardBattle.prototype.init = function () {
        this.item.source = "skill_" + this.cfg.skillIcon + "_png";
    };
    CardBattle.prototype.removeMove = function () {
        if (this.move) {
            this.removeMySelf();
        }
    };
    CardBattle.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return CardBattle;
}(BaseView));
__reflect(CardBattle.prototype, "CardBattle");
//# sourceMappingURL=CardBattle.js.map