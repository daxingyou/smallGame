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
var MonsterHp = (function (_super) {
    __extends(MonsterHp, _super);
    function MonsterHp(_hp) {
        var _this = _super.call(this) || this;
        _this.hp_num = _this.hp_max = _hp;
        _this.skinName = "MonsterHpSkin";
        _this.init();
        return _this;
    }
    MonsterHp.prototype.init = function () {
        this.tiao.mask = this.hp_mask;
        this.hp_mask.x = this.tiao.width - this.hp_num * (this.tiao.width / this.hp_max);
    };
    MonsterHp.prototype.setHp = function (_num) {
        if (this.hp_num >= 0) {
            this.hp_num -= _num;
            this.hp_mask.x = -(this.tiao.width - this.hp_num * (this.tiao.width / this.hp_max));
        }
    };
    MonsterHp.prototype.getHp = function () {
        return this.hp_num;
    };
    return MonsterHp;
}(BaseView));
__reflect(MonsterHp.prototype, "MonsterHp");
//# sourceMappingURL=MonsterHp.js.map