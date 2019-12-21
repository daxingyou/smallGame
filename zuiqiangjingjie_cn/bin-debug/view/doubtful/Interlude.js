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
var Interlude = (function (_super) {
    __extends(Interlude, _super);
    function Interlude() {
        return _super.call(this) || this;
    }
    Interlude.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.group)
            .to({ x: -20 }, 300, egret.Ease.quintOut)
            .wait(500)
            .call(function () {
            ViewManager.inst().close(DoubtfulView);
            ViewManager.inst().open(BattleView);
        })
            .to({ x: -this.group.width }, 300, egret.Ease.quintIn)
            .call(function () {
            ViewManager.inst().close(Interlude);
        });
    };
    Interlude.prototype.close = function () {
    };
    return Interlude;
}(BaseEuiView));
__reflect(Interlude.prototype, "Interlude");
ViewManager.inst().reg(Interlude, LayerManager.TIPS_LAYER);
//# sourceMappingURL=Interlude.js.map