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
var MotionBlends = (function (_super) {
    __extends(MotionBlends, _super);
    function MotionBlends() {
        return _super.call(this) || this;
    }
    MotionBlends.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tip_label.text = param[0];
        this.group.scaleX = this.group.scaleY = 0;
        egret.Tween.get(this.group).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.group);
        }, this);
        this.addTouchEvent(this, function () {
            egret.Tween.get(_this.group).to({ scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
                ViewManager.inst().close(MotionBlends);
                MessageManager.inst().dispatch("closeStory");
            }, _this);
        });
    };
    MotionBlends.prototype.close = function () {
    };
    return MotionBlends;
}(BaseEuiView));
__reflect(MotionBlends.prototype, "MotionBlends");
ViewManager.inst().reg(MotionBlends, LayerManager.OPEN_SHOW);
//# sourceMappingURL=MotionBlends.js.map