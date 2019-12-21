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
var RechargeTipPop = (function (_super) {
    __extends(RechargeTipPop, _super);
    function RechargeTipPop() {
        return _super.call(this) || this;
    }
    RechargeTipPop.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tipGroup.alpha = 0;
        this.tipGroup.scaleX = this.tipGroup.scaleY = 0;
        egret.Tween.get(this.tipGroup).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.tipGroup);
        }, this);
        this.addTouchEvent(this.close_img, this.onReturn, true);
        this.addTouchEvent(this.cancleBtn, this.onReturn, true);
        this.addTouchEvent(this.rechargeBtn, this.onRecharge, true);
    };
    RechargeTipPop.prototype.onRecharge = function () {
        this.onReturn(null, true);
    };
    RechargeTipPop.prototype.onReturn = function (evt, boo) {
        var _this = this;
        egret.Tween.get(this.tipGroup).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.tipGroup);
            ViewManager.inst().close(RechargeTipPop);
            if (boo) {
                ViewManager.inst().open(RechargePopUp);
            }
        }, this);
    };
    RechargeTipPop.prototype.close = function () {
        this.removeTouchEvent(this.close_img, this.onReturn);
        this.removeTouchEvent(this.cancleBtn, this.onReturn);
        this.removeTouchEvent(this.rechargeBtn, this.onRecharge);
    };
    return RechargeTipPop;
}(BaseEuiView));
__reflect(RechargeTipPop.prototype, "RechargeTipPop");
ViewManager.inst().reg(RechargeTipPop, LayerManager.UI_Pop);
//# sourceMappingURL=RechargeTipPop.js.map