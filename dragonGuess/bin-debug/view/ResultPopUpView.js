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
var ResultPopUpView = (function (_super) {
    __extends(ResultPopUpView, _super);
    function ResultPopUpView() {
        return _super.call(this) || this;
    }
    ResultPopUpView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0].state == 1) {
            this.skin.currentState = "win";
        }
        else {
            this.skin.currentState = "fail";
        }
        this._callBack = param[0].cb;
        this._thisArg = param[0].ta;
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturnTouch, this);
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureTap, this);
    };
    ResultPopUpView.prototype.onReturnTouch = function (evt) {
        if (this._callBack && this._thisArg) {
            this._callBack.call(this._thisArg, "return");
            ViewManager.ins().close(ResultPopUpView);
        }
    };
    ResultPopUpView.prototype.onSureTap = function (evt) {
        if (this._callBack && this._thisArg) {
            this._callBack.call(this._thisArg, "reset");
            ViewManager.ins().close(ResultPopUpView);
        }
    };
    ResultPopUpView.prototype.close = function () {
        this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturnTouch, this);
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureTap, this);
    };
    return ResultPopUpView;
}(BaseEuiView));
__reflect(ResultPopUpView.prototype, "ResultPopUpView");
ViewManager.ins().reg(ResultPopUpView, LayerManager.UI_Pop);
//# sourceMappingURL=ResultPopUpView.js.map