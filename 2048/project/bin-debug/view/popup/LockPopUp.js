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
var LockPopUp = (function (_super) {
    __extends(LockPopUp, _super);
    function LockPopUp() {
        return _super.call(this) || this;
    }
    LockPopUp.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.lockStr.text = "解锁此关卡需要金币x" + param[0].cost;
        this.cost = param[0].cost;
        this.addTouchEvent(this.lockBtn, this.onLock, true);
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        if (param[0].cb && param[0].arg) {
            this._cb = param[0].cb;
            this._arg = param[0].arg;
        }
    };
    LockPopUp.prototype.onReturn = function () {
        ViewManager.inst().close(LockPopUp);
    };
    LockPopUp.prototype.onLock = function () {
        if (this.btnLab.text == "关闭") {
            ViewManager.inst().close(LockPopUp);
            return;
        }
        else {
            if (this.cost > GameApp.gold) {
                this.lockStr.text = "解锁失败,还差金币x" + (this.cost - GameApp.gold);
                this.btnLab.text = "关闭";
            }
            else {
                GameApp.gold -= this.cost;
                ViewManager.inst().close(LockPopUp);
                if (this._cb) {
                    this._cb.call(this._arg);
                }
            }
        }
    };
    LockPopUp.prototype.close = function () {
        this.removeTouchEvent(this.lockBtn, this.onLock);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
    };
    return LockPopUp;
}(BaseEuiView));
__reflect(LockPopUp.prototype, "LockPopUp");
ViewManager.inst().reg(LockPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=LockPopUp.js.map