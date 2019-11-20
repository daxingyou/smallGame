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
var Hurt = (function (_super) {
    __extends(Hurt, _super);
    function Hurt(_num) {
        var _this = _super.call(this) || this;
        _this.skinName = "HurtSkin";
        _this.num.text = "-" + _num;
        _this.init();
        return _this;
    }
    Hurt.prototype.init = function () {
        var _this = this;
        egret.Tween.get(this.num)
            .to({ y: this.num.y - 50 }, 150)
            .call(function () {
            _this.removeMySelf();
        }, this);
    };
    Hurt.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return Hurt;
}(BaseView));
__reflect(Hurt.prototype, "Hurt");
//# sourceMappingURL=Hurt.js.map