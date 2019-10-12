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
var Result = (function (_super) {
    __extends(Result, _super);
    function Result() {
        return _super.call(this) || this;
    }
    Result.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.resetBtn, this.onReset, true);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
    };
    Result.prototype.onReset = function () {
        ViewManager.inst().close(Result);
        MessageManager.inst().dispatch("gameEndReset");
    };
    Result.prototype.onSure = function () {
        ViewManager.inst().close(Result);
        MessageManager.inst().dispatch("gameEndExit");
    };
    Result.prototype.close = function () {
        this.removeTouchEvent(this.resetBtn, this.onReset);
        this.removeTouchEvent(this.sureBtn, this.onSure);
    };
    return Result;
}(BaseEuiView));
__reflect(Result.prototype, "Result");
ViewManager.inst().reg(Result, LayerManager.UI_Pop);
//# sourceMappingURL=Result.js.map