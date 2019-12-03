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
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        return _super.call(this) || this;
    }
    ResultView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var goldnum = 0;
        if (param[0].state == 1) {
            this.resultImg.source = 'win_panel_png';
            goldnum = (Math.random() * 100 + 100) >> 0;
        }
        else {
            this.resultImg.source = "fail_panel_png";
            goldnum = (Math.random() * 20 + 5) >> 0;
        }
        this.goldLab.text = goldnum.toString();
        GameApp.gold += goldnum;
        this.resultGroup["autoSize"]();
        this.resultGroup.alpha = 0;
        egret.Tween.get(this.resultGroup).to({ alpha: 1 }, 500).call(function () {
            egret.Tween.removeTweens(_this.resultGroup);
        }, this);
        this.addTouchEvent(this.level_1, this.onChallenge, true);
        this.addTouchEvent(this.level_2, this.onChallenge, true);
        this.addTouchEvent(this.level_3, this.onChallenge, true);
    };
    ResultView.prototype.onChallenge = function (evt) {
        switch (evt.target) {
            case this.level_1:
                GameApp.chapterLevel = 1;
                MessageManager.inst().dispatch("resetGame");
                this.onReturn();
                break;
            case this.level_2:
                GameApp.chapterLevel = 2;
                MessageManager.inst().dispatch("resetGame");
                this.onReturn();
                break;
            case this.level_3:
                GameApp.chapterLevel = 3;
                MessageManager.inst().dispatch("resetGame");
                this.onReturn();
                break;
        }
    };
    ResultView.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.resultGroup).to({ alpha: 0 }, 500).call(function () {
            egret.Tween.removeTweens(_this.resultGroup);
            ViewManager.inst().close(ResultView);
        }, this);
    };
    ResultView.prototype.close = function () {
        this.removeTouchEvent(this.level_1, this.onChallenge);
        this.removeTouchEvent(this.level_2, this.onChallenge);
        this.removeTouchEvent(this.level_3, this.onChallenge);
    };
    return ResultView;
}(BaseEuiView));
__reflect(ResultView.prototype, "ResultView");
ViewManager.inst().reg(ResultView, LayerManager.UI_Pop);
//# sourceMappingURL=ResultView.js.map