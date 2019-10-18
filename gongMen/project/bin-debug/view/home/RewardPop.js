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
var RewardPop = (function (_super) {
    __extends(RewardPop, _super);
    function RewardPop() {
        return _super.call(this) || this;
    }
    RewardPop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.title.text = param[0].title;
        this.cnt.text = param[0].cnt;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    RewardPop.prototype.onTouchTap = function () {
        ViewManager.inst().close(RewardPop);
    };
    RewardPop.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return RewardPop;
}(BaseEuiView));
__reflect(RewardPop.prototype, "RewardPop");
ViewManager.inst().reg(RewardPop, LayerManager.UI_Pop);
//# sourceMappingURL=RewardPop.js.map