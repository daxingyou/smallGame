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
var HelpPopUpView = (function (_super) {
    __extends(HelpPopUpView, _super);
    function HelpPopUpView() {
        return _super.call(this) || this;
    }
    HelpPopUpView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    HelpPopUpView.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(HelpPopUpView);
        }, this);
    };
    HelpPopUpView.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return HelpPopUpView;
}(BaseEuiView));
__reflect(HelpPopUpView.prototype, "HelpPopUpView");
ViewManager.ins().reg(HelpPopUpView, LayerManager.UI_Pop);
//# sourceMappingURL=HelpPopUpView.js.map