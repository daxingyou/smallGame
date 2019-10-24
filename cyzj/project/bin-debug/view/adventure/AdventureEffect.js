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
var AdventureEffect = (function (_super) {
    __extends(AdventureEffect, _super);
    function AdventureEffect(param) {
        var _this = _super.call(this) || this;
        _this.skinName = "AdventureEffectSkin";
        _this.x = param[0].x;
        _this.y = param[0].y - 180;
        _this.img.source = param[0].img + "_png";
        _this.num_label.text = "+ " + param[0].num;
        _this.alpha = 0;
        egret.Tween.get(_this)
            .to({ alpha: 1 }, 200);
        egret.Tween.get(_this)
            .to({ y: _this.y - 60 }, 500)
            .call(function () {
            _this.close();
        });
        return _this;
    }
    AdventureEffect.prototype.close = function () {
        egret.Tween.removeTweens(this);
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return AdventureEffect;
}(BaseView));
__reflect(AdventureEffect.prototype, "AdventureEffect");
//# sourceMappingURL=AdventureEffect.js.map