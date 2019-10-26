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
var TeachPop = (function (_super) {
    __extends(TeachPop, _super);
    function TeachPop() {
        var _this = _super.call(this) || this;
        _this.count = 3;
        _this.gamecount = 5;
        _this.curClickCount = 0;
        _this._endboo = false;
        return _this;
    }
    TeachPop.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.gameBtn.source = param[0].source;
        if (GameApp.progress == 1) {
            this._endboo = param[0].endBoo;
            if (param[0].endBoo) {
                //好的结果;
                this.upsource = "game_1_0_jpg";
                this.downsource = "game_1_1_jpg";
            }
            else {
                this.upsource = "game_2_0_jpg";
                this.downsource = "game_2_1_jpg";
            }
        }
        else {
            //女
            this.upsource = "game_3_0_png";
            this.downsource = "game_3_1_png";
        }
        this.gameImg.source = this.upsource;
        this.gamecount = GameApp.progress == 1 ? (GameApp.level - 1) * 5 : (GameApp.womanLevel - 1) * 5;
        this.tolClickCount = GameApp.progress == 1 ? (GameApp.level - 1) * 25 : (GameApp.womanLevel - 1) * 25;
        this.progressBar.mask = this.proMask;
        var self = this;
        var interval = setInterval(function () {
            self.count -= 1;
            self.countDownLab.text = self.count.toString();
            if (self.count <= 0) {
                clearInterval(interval);
                self.countDownGroup.visible = false;
                _this.gameInterval = setInterval(function () {
                    self.circle.rotation += 5;
                    self.gamecount -= 1;
                    self.timeLab.text = self.gamecount.toString();
                    if (self.gamecount <= 0) {
                        //游戏结束；失败
                        self.gameFail();
                    }
                }, 1000);
            }
        }, 1000);
        this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onCancle, this);
        this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onCancle, this);
        this.resultGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
    };
    TeachPop.prototype.onReturn = function () {
        this.resultGroup.visible = false;
        ViewManager.inst().close(TeachPop);
        ViewManager.inst().open(GameMainView);
    };
    TeachPop.prototype.onTouchBegin = function () {
        this.gameImg.source = this.downsource;
    };
    TeachPop.prototype.onCancle = function () {
        this.gameImg.source = this.upsource;
    };
    TeachPop.prototype.onTouchEnd = function () {
        this.gameImg.source = this.upsource;
        this.curClickCount += 1;
        var remainCount = this.tolClickCount - this.curClickCount;
        if (remainCount <= 0) {
            remainCount = 0;
            //游戏结束:成功
            this.gameWin();
        }
        var width = remainCount / this.tolClickCount * 581;
        this.proMask.width = width;
    };
    TeachPop.prototype.gameWin = function () {
        this.gameBtn.touchEnabled = false;
        egret.Tween.removeTweens(this.circle);
        clearInterval(this.gameInterval);
        this.resultGroup.visible = true;
        this.addLab.text = "+3";
        GameApp.health += 3;
        this.resultLab.text = "闯关成功";
        if (GameApp.progress == 1) {
            if (this._endboo) {
                //好结果
                this.resultImg.source = "result_4_1_jpg";
            }
            else {
                this.resultImg.source = "result_3_1_jpg";
            }
        }
        else {
            this.resultImg.source = "result_3_2_jpg";
        }
    };
    TeachPop.prototype.gameFail = function () {
        this.gameBtn.touchEnabled = false;
        egret.Tween.removeTweens(this.circle);
        clearInterval(this.gameInterval);
        this.resultGroup.visible = true;
        this.resultLab.text = "闯关失败";
        this.addLab.text = "+0";
        if (GameApp.progress == 1) {
            this.resultImg.source = "result_2_1_jpg";
        }
        else {
            this.resultImg.source = "result_3_2_jpg";
        }
    };
    TeachPop.prototype.close = function () {
        this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onCancle, this);
        this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onCancle, this);
    };
    return TeachPop;
}(BaseEuiView));
__reflect(TeachPop.prototype, "TeachPop");
ViewManager.inst().reg(TeachPop, LayerManager.UI_Pop);
//# sourceMappingURL=TeachPop.js.map