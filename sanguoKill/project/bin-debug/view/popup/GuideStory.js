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
var GuideStory = (function (_super) {
    __extends(GuideStory, _super);
    function GuideStory() {
        var _this = _super.call(this) || this;
        _this.nextTip = "";
        return _this;
    }
    GuideStory.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        // this.addTouchEvent(this.continueBtn,this.onContinue,true);
        this.addTouchEvent(this, this.onContinue, true);
        if (param[0].tip) {
            this.contentLab.text = param[0].tip;
        }
        if (param[0].nextTip) {
            this.nextTip = param[0].nextTip;
        }
        if (param[0].cb) {
            this.cb = param[0].cb;
        }
        if (param[0].arg) {
            this.thisArg = param[0].arg;
        }
        if (param[0].obj) {
            this.combobj = param[0].obj;
        }
    };
    GuideStory.prototype.onContinue = function () {
        var _this = this;
        if (this.nextTip) {
            this.touchEnabled = false;
            this.touchChildren = false;
            ViewManager.inst().open(GuideView);
            var guideView = ViewManager.inst().getView(GuideView);
            GameApp.guideView = guideView;
            guideView.nextStep({ id: "1_1", comObj: this.combobj, width: 123, height: 110 });
            egret.Tween.get(this.contentLab).to({ alpha: 0 }, 300).call(function () {
                _this.contentLab.text = _this.nextTip;
            }, this).to({ alpha: 1 }, 300).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                _this.nextTip = "";
                egret.Tween.removeTweens(_this.contentLab);
            }, this);
        }
        else {
            egret.Tween.get(this).to({ alpha: 0 }, 600, egret.Ease.circIn).call(function () {
                egret.Tween.removeTweens(_this);
                ViewManager.inst().close(GuideStory);
                if (_this.cb && _this.thisArg) {
                    _this.cb.call(_this.thisArg);
                }
            }, this);
        }
    };
    GuideStory.prototype.close = function () {
        this.removeTouchEvent(this.continueBtn, this.onContinue);
    };
    return GuideStory;
}(BaseEuiView));
__reflect(GuideStory.prototype, "GuideStory");
ViewManager.inst().reg(GuideStory, LayerManager.UI_TOP);
//# sourceMappingURL=GuideStory.js.map