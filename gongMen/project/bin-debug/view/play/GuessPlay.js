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
var GuessPlay = (function (_super) {
    __extends(GuessPlay, _super);
    function GuessPlay() {
        var _this = _super.call(this) || this;
        _this.storyCfg = [
            {
                txt: "\t\t\u597D\u70ED\u95F9\u554A\uFF0C\u60F3\u4E0D\u5230\u53E4\u4EE3\u7684\u82B1\u706F\u4F1A\u8FD9\u4E48\u70ED\u95F9\uFF0C\u53EF\u60DC\u4E86\uFF0C\u8981\u662F\u5E26\u7740\u624B\u673A\u7A7F\u8D8A\u8FC7\u6765\u5C31\u597D\u4E86\uFF0C\u6765\u4E2A\u5927\u7279\u5199\uFF0C\u563F\u563F\uFF01",
                right: null,
                left: 1
            },
            {
                txt: "\u4F60\u63A9\u5634\u5FAE\u7B11\uFF0C\u8138\u4E0A\u5145\u6EE1\u7B11\u610F\uFF01",
                right: null,
                left: 1
            },
            {
                txt: "\u963F\u91CC\u886E\uFF0C\u6211\u4EEC\u4E00\u8D77\u51FA\u53BB\u901B\u901B\u5427\uFF01",
                right: null,
                left: 1
            },
            {
                txt: "\u597D\u7684\uFF0C\u6211\u4E00\u5B9A\u4F1A\u597D\u597D\u4FDD\u62A4\u4F60\uFF01",
                right: 1,
                left: null
            },
            {
                txt: "\u8D70\u4E86\u5F88\u4E45\uFF0C\u770B\u5230\u6709\u7247\u533A\u57DF\u5F88\u70ED\u95F9\uFF0C\u4F60\u770B\u4E86\u4E00\u4E0B\uFF0C\u90A3\u91CC\u6B63\u5728\u731C\u706F\u8C1C\u548C\u731C\u5BF9\u8054\uFF0C\u4F60\u4E5F\u60F3\u73A9\uFF01\u4F60\u6162\u6162\u8D70\u8FC7\u53BB......\uFF0C\u8111\u6D77\u4E2D\u6B63\u5728\u60F3\u7740\u73A9\u54EA\u79CD\u6E38\u620F\uFF1F",
                right: null,
                left: 1
            }
        ];
        return _this;
    }
    GuessPlay.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.jumpBtn, this.onJump, true);
        this.addTouchEvent(this.dengmiBtn, this.onEnterDengmi, true);
        this.addTouchEvent(this.duilianBtn, this.onEnterDuiLian, true);
        var cfg = GlobalFun.getClothCfg();
        this.leftRole.source = cfg.half + "_png";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showStory, this);
        this.showStory();
    };
    GuessPlay.prototype.onEnterDengmi = function () {
        ViewManager.inst().open(PlayDengMiPop);
    };
    GuessPlay.prototype.onEnterDuiLian = function () {
        ViewManager.inst().open(PlayDuiLianPop);
    };
    GuessPlay.prototype.showStory = function () {
        if (this.storyCfg.length) {
            var itemCfg = this.storyCfg.shift();
            this.leftRole.visible = itemCfg.left ? true : false;
            this.rightRole.visible = itemCfg.right ? true : false;
            this.wordLab.text = itemCfg.txt;
        }
        else {
            this.jumpBtn.visible = false;
            //对话结束
            this.onJump();
        }
    };
    GuessPlay.prototype.onJump = function () {
        this.jumpBtn.visible = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showStory, this);
        this.storyGroup.visible = false;
        this.playGroup.visible = true;
    };
    GuessPlay.prototype.onReturn = function () {
        ViewManager.inst().close(GuessPlay);
    };
    GuessPlay.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.jumpBtn, this.onJump);
        this.removeTouchEvent(this.dengmiBtn, this.onEnterDengmi);
        this.removeTouchEvent(this.duilianBtn, this.onEnterDuiLian);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showStory, this);
    };
    return GuessPlay;
}(BaseEuiView));
__reflect(GuessPlay.prototype, "GuessPlay");
ViewManager.inst().reg(GuessPlay, LayerManager.UI_Main);
//# sourceMappingURL=GuessPlay.js.map