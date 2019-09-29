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
var PlayFunView = (function (_super) {
    __extends(PlayFunView, _super);
    function PlayFunView() {
        var _this = _super.call(this) || this;
        _this.count = 30;
        _this.levelIconCfg = {};
        _this.winboo = false;
        _this.createRightRectCfg = {
            "3_7": [173, 60, 61, 45],
            "3_6": [136, 93, 51, 44],
            "1_3": [355, 316, 50, 41],
            "2_1": [300, 117, 46, 42],
            "2_2": [303, 226, 37, 31],
            "2_3": [188, 151, 38, 43],
            "2_4": [368, 149, 40, 35],
            "2_5": [324, 117, 34, 27],
            "3_1": [305, 145, 53, 47],
            "3_2": [146, 198, 35, 27],
            "3_3": [130, 97, 37, 33],
            "3_4": [115, 172, 32, 32],
            "3_5": [207, 125, 38, 34],
            "1_2": [243, 277, 50, 53],
            "1_1": [355, 119, 38, 38]
        };
        return _this;
    }
    PlayFunView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.showClose(PlayFunView, true, this.onExitCall, this);
        this.addTouchEvent(this.goBtn, this.onStart, true);
        this.time = new egret.Timer(1000, this.count);
        this.time.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        this.addTouchEvent(this.resetBtn, this.onReset, true);
        this.guessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuessClick, this);
        this.rightGrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuessClick, this);
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this.refreshPage(param[0]);
    };
    PlayFunView.prototype.onGuessClick = function (evt) {
        var _this = this;
        this.guessGroup.globalToLocal(evt.stageX, evt.stageY);
        if (this.hitArea(evt.localX, evt.localY)) {
            this.selectCir0.x = this.selectCir.x = this.correctRect.x - 15;
            this.selectCir0.y = this.selectCir.y = this.correctRect.y - 15;
            this.selectCir0.visible = this.selectCir.visible = true;
            var key_1 = 'levelCfg' + this._level;
            var levelCfgObj_1 = JSON.parse(egret.localStorage.getItem(key_1)).levelCfg;
            this.winboo = true;
            this.resetBtn.touchEnabled = false;
            levelCfgObj_1.forEach(function (item, index) {
                var arr = item.split("_");
                if (arr[0] == _this._level && arr[1] == (_this._index + 1)) {
                    var num = _this.levelIconCfg[_this._level];
                    if (arr[1] >= num) {
                        //当前达到本大关的最后一小关 开启下一个大关的第一关
                        if (_this._level <= 2) {
                            var nextLevelcfgStr = egret.localStorage.getItem('levelCfg' + (_this._level + 1));
                            if (nextLevelcfgStr) {
                                var nextArr = JSON.parse(nextLevelcfgStr).levelCfg;
                                var str = (_this._level + 1) + "_" + 1 + "_" + 1;
                                nextArr[0] = str;
                                egret.localStorage.setItem('levelCfg' + (_this._level + 1), JSON.stringify({ levelCfg: nextArr }));
                            }
                            else {
                                var num2 = _this.levelIconCfg[_this._level + 1];
                                var levelCfgs = [];
                                for (var i = 0; i < num2; i++) {
                                    var str = (_this._level + 1) + "_" + (i + 1) + "_" + (i == 0 ? 1 : 0);
                                    levelCfgs.push(str);
                                }
                                egret.localStorage.setItem('levelCfg' + (_this._level + 1), JSON.stringify({ levelCfg: levelCfgs }));
                            }
                        }
                    }
                    else {
                        var str = _this._level + "_" + (_this._index + 2) + "_" + 1;
                        levelCfgObj_1[index + 1] = str;
                        egret.localStorage.setItem(key_1, JSON.stringify({ levelCfg: levelCfgObj_1 }));
                    }
                }
            }, this);
            var tieout = egret.setTimeout(function () {
                _this.onComplete(null);
                ViewManager.ins().open(ResultPopUpView, [{ state: 1, cb: _this.popCall, ta: _this }]);
            }, this, 1000);
        }
    };
    /* */
    PlayFunView.prototype.popCall = function (str) {
        this.winboo = false;
        this.resetBtn.touchEnabled = true;
        this.selectCir0.visible = this.selectCir.visible = false;
        if (str == "return") {
            ViewManager.ins().closeReturnEffect(PlayFunView);
        }
        else {
            var num = this.levelIconCfg[this._level];
            if (this._index + 1 >= num) {
                ViewManager.ins().closeReturnEffect(PlayFunView);
            }
            else {
                this._index += 1;
                this.answerCount.text = (this._index + 1) + "/" + num;
                this.correctRect = this.getLevelImgShow(this._level, (this._index + 1));
                this.onReset();
            }
        }
    };
    /**判断点击区域 */
    PlayFunView.prototype.hitArea = function (lx, ly) {
        var condition1 = ((lx >= this.correctRect.x) && (lx <= (this.correctRect.x + this.correctRect.width)));
        var condition2 = ((ly >= this.correctRect.y) && (ly <= (this.correctRect.y + this.correctRect.height)));
        return condition1 && condition2;
    };
    /**点击时间重置 */
    PlayFunView.prototype.onReset = function () {
        this.time.reset();
        this.time.stop();
        this.count = 30;
        this.timeLab.text = "00:" + this.count;
        this.time.start();
    };
    PlayFunView.prototype.onComplete = function (evt) {
        this.count = 30;
        this.time.stop();
        this.time.reset();
        if (!this.winboo) {
            ViewManager.ins().open(ResultPopUpView, [{ state: 0, cb: this.popCall, ta: this }]);
        }
    };
    PlayFunView.prototype.onTimer = function (evt) {
        this.count -= 1;
        var str = "00:" + (this.count < 10 ? "0" + this.count : this.count);
        if (this.count <= 0) {
            str = "00:00";
        }
        this.timeLab.text = str;
    };
    PlayFunView.prototype.popUpResult = function () {
    };
    //点击退出回调
    PlayFunView.prototype.onExitCall = function () {
        this.count = 30;
        this.time.stop();
        this.time.reset();
    };
    PlayFunView.prototype.onStart = function () {
        this.rect.visible = false;
        this.goBtn.visible = false;
        this.time.start();
    };
    /**路由刷新界面 */
    PlayFunView.prototype.refreshPage = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._curParam = param;
        this.rect.visible = true;
        this.goBtn.visible = true;
        this.selectCir.visible = false;
        this.selectCir0.visible = false;
        var level = param[0].level;
        this._level = level;
        var index = param[0].index;
        this._index = index;
        this.fbName.text = param[0].fbName;
        this.levelIconCfg = { 1: 3, 2: 5, 3: 7 };
        var num = this.levelIconCfg[level];
        this.answerCount.text = (index + 1) + "/" + num;
        this.correctRect = this.getLevelImgShow(level, (index + 1));
    };
    /**获取当前 图片显示 并且返回正确区域*/
    PlayFunView.prototype.getLevelImgShow = function (big_level, smallLevel) {
        var showImgUrl = "resource/res/view/level/type" + big_level + "Level" + smallLevel + "R.png";
        var guessImgUrl = "resource/res/view/level/type" + big_level + "Level" + smallLevel + "G.png";
        this.rightImg.source = showImgUrl;
        this.guessImg.source = guessImgUrl;
        var str = big_level + "_" + smallLevel;
        var rect = new egret.Rectangle();
        var arr = this.createRightRectCfg[str];
        rect.x = arr[0];
        rect.y = arr[1];
        rect.width = arr[2];
        rect.height = arr[3];
        return rect;
    };
    PlayFunView.prototype.close = function () {
        this.removeTouchEvent(this.goBtn, this.onStart);
        this.rightGrop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuessClick, this);
        this.guessGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuessClick, this);
        this.removeTouchEvent(this.resetBtn, this.onReset);
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
    };
    return PlayFunView;
}(BaseEuiView));
__reflect(PlayFunView.prototype, "PlayFunView");
ViewManager.ins().reg(PlayFunView, LayerManager.UI_Main);
//# sourceMappingURL=PlayFunView.js.map