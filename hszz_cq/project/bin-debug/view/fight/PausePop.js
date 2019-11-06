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
var PausePop = (function (_super) {
    __extends(PausePop, _super);
    function PausePop() {
        return _super.call(this) || this;
    }
    PausePop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.closeRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addTouchEvent(this.continueBtn, this.onTouchTap, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    PausePop.prototype.onTouchTap = function () {
        ViewManager.inst().close(PausePop);
        MessageManager.inst().dispatch(CustomEvt.CONTINUE);
    };
    PausePop.prototype.onReturn = function () {
        ViewManager.inst().close(PausePop);
        // ViewManager.inst().close(BattleView);
    };
    PausePop.prototype.close = function () {
        this.closeRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeTouchEvent(this.continueBtn, this.onTouchTap);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return PausePop;
}(BaseEuiView));
__reflect(PausePop.prototype, "PausePop");
ViewManager.inst().reg(PausePop, LayerManager.UI_Pop);
//# sourceMappingURL=PausePop.js.map