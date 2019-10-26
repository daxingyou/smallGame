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
var StoryView = (function (_super) {
    __extends(StoryView, _super);
    function StoryView() {
        var _this = _super.call(this) || this;
        _this.timeouts = [];
        _this.cnts = [];
        _this.curTime = 0;
        return _this;
    }
    StoryView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.curChapter = param[0].data;
        this.storyImg.source = GameApp.progress == 1 ? this.curChapter.pic + "_jpg" : "w_" + this.curChapter.pic + "_jpg";
        this.cnts = this.curChapter.cnt;
        this.refreshCnt();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addTouchEvent(this.answer, this.onAnswer, true);
        this.addTouchEvent(this.helpBtn, this.onHelp, true);
        this.addTouchEvent(this.submitImg, this.onSubmit, true);
        this.circleGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCircleTouch, this);
        MessageManager.inst().addListener("endOneChapter", this.endOneChapter, this);
        MessageManager.inst().addListener("openAnswer", this.onOpenAnswer, this);
        var self = this;
        this.interVal = setInterval(function () {
            self.curTime += 1;
        }, 1000);
    };
    StoryView.prototype.endOneChapter = function () {
        if (!this.cnts.length) {
            var passData = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.PASS));
            passData[GameApp.progress][GameApp.progress == 1 ? GameApp.level : GameApp.womanLevel] = this.curTime;
            egret.localStorage.setItem(LocalStorageEnum.PASS, JSON.stringify(passData));
            if (GameApp.progress == 1) {
                GameApp.level += 1;
            }
            else {
                GameApp.womanLevel += 1;
            }
            clearInterval(this.interVal);
            ViewManager.inst().open(ResultPop, [{ state: "win", end: true, endBoo: this.curChapter.ending, cnt: this.curChapter.endWord }]);
            return;
        }
        this.refreshCnt();
    };
    StoryView.prototype.onOpenAnswer = function () {
        this.lookAnswerGroup.visible = true;
    };
    StoryView.prototype.onTouchTap = function (evt) {
        for (var i = 0; i < this.timeouts.length; i++) {
            egret.clearTimeout(this.timeouts[i]);
        }
        this.timeouts = [];
        this.contentLab.text = this.curCnt.artical;
        switch (evt.target) {
            case this.clickRect:
            case this.clickRect2:
            case this.promptGroup2:
                this.lookAnswerGroup.visible = this.helpGroup.visible = false;
                break;
            case this.promptGroup:
                if (GameApp.health < 2) {
                    UserTips.inst().showTips("体力不足");
                }
                else {
                    GameApp.health -= 2;
                    this.promptGroup.visible = false;
                    this.promptGroup2.visible = true;
                }
                break;
            case this.changeGroup:
                if (GameApp.gem < 1) {
                    UserTips.inst().showTips('钻石不足');
                }
                else {
                    GameApp.gem -= 1;
                    GameApp.health += 2;
                    UserTips.inst().showTips("钻石-1，体力+2");
                }
                break;
        }
    };
    StoryView.prototype.onAnswer = function () {
        this.lookAnswerGroup.visible = true;
    };
    StoryView.prototype.onHelp = function () {
        this.helpGroup.visible = true;
    };
    StoryView.prototype.onSubmit = function () {
        if (!this.curSelectPoint) {
            UserTips.inst().showTips("请先选择线索");
        }
        else {
            if (GameApp.health <= 0) {
                UserTips.inst().showTips("体力不足");
                return;
            }
            //核对是否正确；
            var rectArr_1 = [];
            rectArr_1 = this.curCnt.box.split(";");
            rectArr_1.forEach(function (item, index) {
                rectArr_1[index] = item.split(",");
            });
            var lx = parseInt(rectArr_1[0][0]);
            var rx = parseInt(rectArr_1[1][0]);
            var ty = parseInt(rectArr_1[0][1]);
            var by = parseInt(rectArr_1[2][1]);
            if (this.curSelectPoint.x > lx && this.curSelectPoint.x < rx && this.curSelectPoint.y > ty && this.curSelectPoint.y < by) {
                //回答正确
                ViewManager.inst().open(ResultPop, [{ state: "win", end: false, endBoo: this.curChapter.ending, cnt: this.curCnt.correct }]);
            }
            else {
                //回答错误
                GameApp.health -= 1;
                ViewManager.inst().open(ResultPop, [{ state: "fail" }]);
            }
        }
    };
    StoryView.prototype.onCircleTouch = function (evt) {
        if (this.circle && this.circle.parent) {
            this.circle.parent.removeChild(this.circle);
        }
        this.circle = new DrawCircle();
        this.circleGroup.addChild(this.circle);
        this.circle.x = evt.localX;
        this.circle.y = evt.localY;
        this.curSelectPoint = new egret.Point();
        this.curSelectPoint.x = evt.localX;
        this.curSelectPoint.y = evt.localY;
    };
    StoryView.prototype.refreshCnt = function () {
        if (!this.cnts.length) {
            //当前无内容
            return;
        }
        this.curSelectPoint = null;
        if (this.circle && this.circle.parent) {
            this.circle.parent.removeChild(this.circle);
        }
        this.contentLab.text = "";
        this.curCnt = this.cnts.shift();
        this.promptTxt.text = this.curCnt.prompt;
        this.promptGroup.visible = true;
        this.promptGroup2.visible = false;
        this.typerEffect(this.contentLab, this.curCnt.artical, 200);
    };
    /**
  * 文字打字机效果
  * obj           文本对象
  * content       文字
  * interval      打字间隔 毫秒
  */
    StoryView.prototype.typerEffect = function (obj, content, interval, backFun, thisArg) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        if (backFun === void 0) { backFun = null; }
        if (thisArg === void 0) { thisArg = null; }
        var strArr = content.split("");
        var len = strArr.length;
        var _loop_1 = function (i) {
            var timeout = void 0;
            timeout = egret.setTimeout(function () {
                obj.appendText(strArr[i]);
                if ((Number(i) >= len - 1) && (backFun != null)) {
                    backFun.call(thisArg);
                }
            }, this_1, interval * i);
            this_1.timeouts.push(timeout);
        };
        var this_1 = this;
        for (var i = 0; i < len; i++) {
            _loop_1(i);
        }
    };
    StoryView.prototype.close = function () {
        clearInterval(this.interVal);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().removeListener("endOneChapter", this.endOneChapter, this);
        MessageManager.inst().removeListener("openAnswer", this.onOpenAnswer, this);
        this.removeTouchEvent(this.answer, this.onAnswer);
        this.removeTouchEvent(this.helpBtn, this.onHelp);
        this.removeTouchEvent(this.submitImg, this.onSubmit);
        this.circleGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCircleTouch, this);
    };
    return StoryView;
}(BaseEuiView));
__reflect(StoryView.prototype, "StoryView");
ViewManager.inst().reg(StoryView, LayerManager.UI_Main);
//# sourceMappingURL=StoryView.js.map