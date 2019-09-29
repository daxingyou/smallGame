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
var ResultPopUp = (function (_super) {
    __extends(ResultPopUp, _super);
    function ResultPopUp() {
        return _super.call(this) || this;
    }
    ResultPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.img.scaleX = this.img.scaleY = 0;
        egret.Tween.get(this.img).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.img);
        }, this);
        if (param[0].state == 1) {
            this.img.source = "win_png";
        }
        else {
            this.img.source = "fail_png";
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ResultPopUp.prototype.onTouchTap = function () {
        var _this = this;
        egret.Tween.get(this.img).to({ scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.img);
            ViewManager.inst().close(ResultPopUp);
            ViewManager.inst().close(BattleView);
            ViewManager.inst().open(ChapterView);
        }, this);
    };
    ResultPopUp.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return ResultPopUp;
}(BaseEuiView));
__reflect(ResultPopUp.prototype, "ResultPopUp");
ViewManager.inst().reg(ResultPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=ResultPopUp.js.map