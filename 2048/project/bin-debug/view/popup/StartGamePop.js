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
var StartGamePop = (function (_super) {
    __extends(StartGamePop, _super);
    function StartGamePop() {
        return _super.call(this) || this;
    }
    StartGamePop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.descLab.text = param[0].desc;
        this.scoreLab.text = param[0].score;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this._cb = param[0].cb;
        this._arg = param[0].arg;
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    StartGamePop.prototype.onClose = function () {
        ViewManager.inst().close(StartGamePop);
    };
    StartGamePop.prototype.onStart = function () {
        ViewManager.inst().close(StartGamePop);
        this._cb.call(this._arg);
    };
    StartGamePop.prototype.close = function () {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    return StartGamePop;
}(BaseEuiView));
__reflect(StartGamePop.prototype, "StartGamePop");
ViewManager.inst().reg(StartGamePop, LayerManager.UI_Pop);
//# sourceMappingURL=StartGamePop.js.map