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
var FightingView = (function (_super) {
    __extends(FightingView, _super);
    function FightingView() {
        return _super.call(this) || this;
    }
    FightingView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
    };
    FightingView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
    };
    FightingView.prototype.init = function () {
        GlobalFun.filterToGrey(this.duoqi);
        GlobalFun.filterToGrey(this.fengkuang);
    };
    FightingView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.tianti:
                console.log("打开天梯模式");
                ViewManager.inst().open(HighLadderView);
                break;
            case this.duoqi:
                console.log("打开夺旗模式");
                break;
            case this.fengkuang:
                console.log("打开疯狂模式");
                break;
        }
    };
    return FightingView;
}(BaseEuiView));
__reflect(FightingView.prototype, "FightingView");
ViewManager.inst().reg(FightingView, LayerManager.UI_Pop);
//# sourceMappingURL=FightingView.js.map