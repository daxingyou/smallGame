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
        this.group["autoSize"]();
        // this.levelGroup.visible = false;
        this.levelGroup.alpha = 0;
        this.contentGroup.mask = this.contentMask;
        this.contentMask.width = 0;
        egret.Tween.get(this.contentMask).to({ width: 609 }, 2000).call(function () {
            egret.Tween.removeTweens(_this.contentMask);
        }, this);
        egret.Tween.get(this.leftImg).to({ x: 0 }, 2000).call(function () {
            egret.Tween.removeTweens(_this.leftImg);
        }, this);
        egret.Tween.get(this.rightImg).to({ x: 630 }, 2000).call(function () {
            egret.Tween.removeTweens(_this.rightImg);
        }, this);
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            egret.Tween.get(self.levelGroup).to({ alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(self.levelGroup);
            }, this);
        }, 2500);
        this.addTouchEvent(this.level_1, this.onChallenge, true);
        this.addTouchEvent(this.level_2, this.onChallenge, true);
        this.addTouchEvent(this.level_3, this.onChallenge, true);
    };
    StartGameView.prototype.onChallenge = function (evt) {
        var _this = this;
        var level = evt.target.name;
        if (level) {
            GameApp.chapterLevel = parseInt(level);
            egret.Tween.get(this.levelGroup).to({ alpha: 0 }, 600).call(function () {
                egret.Tween.removeTweens(_this.levelGroup);
                egret.Tween.get(_this.contentMask).to({ width: 0 }, 2000).call(function () {
                    egret.Tween.removeTweens(_this.contentMask);
                }, _this);
                egret.Tween.get(_this.leftImg).to({ x: 295 }, 2000).call(function () {
                    egret.Tween.removeTweens(_this.leftImg);
                }, _this);
                egret.Tween.get(_this.rightImg).to({ x: 295 }, 2000).call(function () {
                    egret.Tween.removeTweens(_this.rightImg);
                }, _this);
                egret.Tween.get(_this).to({ alpha: 0 }, 2000).call(function () {
                    egret.Tween.removeTweens(_this);
                    ViewManager.inst().close(StartGameView);
                }, _this);
                ViewManager.inst().open(GameMain);
            }, this);
        }
    };
    StartGameView.prototype.close = function () {
        this.removeTouchEvent(this.level_1, this.onChallenge);
        this.removeTouchEvent(this.level_2, this.onChallenge);
        this.removeTouchEvent(this.level_3, this.onChallenge);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map