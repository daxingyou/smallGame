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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        return _super.call(this) || this;
    }
    StartGameView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.localStorage.clear();
        this.addTouchEvent(this.startBtn, this.onStartClick, true);
        this.addTouchEvent(this.help, this.onHelp, true);
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 1000).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
    };
    StartGameView.prototype.onHelp = function () {
        ViewManager.ins().open(HelpView, null, true);
    };
    StartGameView.prototype.onStartClick = function () {
        ViewManager.ins().open(MainGameView, null, true);
    };
    StartGameView.prototype.close = function () {
        this.removeTouchEvent(this.startBtn, this.onStartClick);
        this.removeTouchEvent(this.help, this.onHelp);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.ins().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map