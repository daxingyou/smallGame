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
var EffectFont = (function (_super) {
    __extends(EffectFont, _super);
    function EffectFont(_hurtNum, _x, _y) {
        var _this = _super.call(this) || this;
        _this.hurtNum = Math.abs(_hurtNum);
        _this.x = _x - 50;
        _this.y = _y - 80 - Math.random() * 30;
        _this.scaleX = _this.scaleY = 0.7;
        _this.skinName = "EffectFontSkin";
        _this.init();
        return _this;
    }
    EffectFont.prototype.init = function () {
        var _this = this;
        this.hurt.text = "-" + this.hurtNum;
        egret.Tween.get(this)
            .to({ y: this.y - 50 }, 300);
        egret.Tween.get(this)
            .wait(200)
            .to({ alpha: 0 }, 100)
            .call(function () {
            _this.removeMySelf();
        });
    };
    EffectFont.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return EffectFont;
}(eui.Component));
__reflect(EffectFont.prototype, "EffectFont");
//# sourceMappingURL=EffectFont.js.map