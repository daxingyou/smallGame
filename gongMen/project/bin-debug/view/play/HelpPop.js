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
var HelpPop = (function (_super) {
    __extends(HelpPop, _super);
    function HelpPop() {
        return _super.call(this) || this;
    }
    HelpPop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.cnt.text = param[0].cnt;
    };
    HelpPop.prototype.onTouchTap = function () {
        ViewManager.inst().close(HelpPop);
    };
    HelpPop.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return HelpPop;
}(BaseEuiView));
__reflect(HelpPop.prototype, "HelpPop");
ViewManager.inst().reg(HelpPop, LayerManager.UI_Pop);
//# sourceMappingURL=HelpPop.js.map