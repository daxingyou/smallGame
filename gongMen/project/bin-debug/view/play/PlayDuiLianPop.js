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
var PlayDuiLianPop = (function (_super) {
    __extends(PlayDuiLianPop, _super);
    function PlayDuiLianPop() {
        var _this = _super.call(this) || this;
        _this.correctAnswer = "";
        _this.wrongCount = 0;
        return _this;
    }
    PlayDuiLianPop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.infoBtn, this.onOpenInfo, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        var cfg = GlobalFun.getClothCfg();
        this.roleImg.source = cfg.half + "_png";
        this.getCfg();
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.wrongBtn, this.onWrong, true);
        MessageManager.inst().addListener("DL_NEXT", this.onNext, this);
        MessageManager.inst().addListener("DL_RESET", this.onReset, this);
        MessageManager.inst().addListener("RETURN", this.onReturn, this);
    };
    PlayDuiLianPop.prototype.onNext = function () {
        this.getCfg();
        this.getRandomAnswer();
    };
    PlayDuiLianPop.prototype.onReset = function () {
        var index = (Math.random() * 10) >> 0;
        if (index >= 5 && this.wrongCount >= (Math.random() * 5) >> 0) {
            //显示正确答案
            this.correctAnswer = this.curDuilianCfg.result;
            this.down.text = this.correctAnswer;
        }
        else {
            this.getRandomAnswer();
        }
    };
    PlayDuiLianPop.prototype.onSure = function () {
        var obj = {
            state: "result",
            win: this.correctAnswer == this.curDuilianCfg.result ? 1 : 0
        };
        if (!obj.win) {
            this.wrongCount += 1;
        }
        else {
            this.wrongCount = 0;
        }
        ViewManager.inst().open(OverView, [obj]);
    };
    PlayDuiLianPop.prototype.onWrong = function () {
        var obj = {
            state: "result",
            win: this.correctAnswer == this.curDuilianCfg.result ? 0 : 1
        };
        if (!obj.win) {
            this.wrongCount += 1;
        }
        else {
            this.wrongCount = 0;
        }
        ViewManager.inst().open(OverView, [obj]);
    };
    PlayDuiLianPop.prototype.getCfg = function () {
        var duilianCfg = DuiLiancfg.cfgs.content;
        var index = (Math.random() * duilianCfg.length) >> 0;
        this.curDuilianCfg = duilianCfg[index];
        this.up.text = this.curDuilianCfg.display;
        this.getRandomAnswer();
    };
    PlayDuiLianPop.prototype.getRandomAnswer = function () {
        var randomIndex = (Math.random() * 10) >> 0;
        if (randomIndex <= 4) {
            var duilianCfg = DuiLiancfg.cfgs.content;
            var index = (Math.random() * duilianCfg.length) >> 0;
            this.correctAnswer = duilianCfg[index].result;
            this.down.text = this.correctAnswer;
        }
        else {
            this.correctAnswer = this.curDuilianCfg.result;
            this.down.text = this.correctAnswer;
        }
    };
    PlayDuiLianPop.prototype.onReturn = function () {
        ViewManager.inst().close(PlayDuiLianPop);
    };
    PlayDuiLianPop.prototype.onOpenInfo = function () {
        var cnt = "猜对联玩法介绍:\n\t\t系统会根据上联随机产生下联,玩家根据上联或者横批猜出当前给出的下联是否与上联对上,\n\t\t如果认为可以对上,则选择绝妙,\n\t\t如果认为对不上,则选择糟糕\n答案正确的话,就可以获取升级经验和金币哦!";
        ViewManager.inst().open(HelpPop, [{ cnt: cnt }]);
    };
    PlayDuiLianPop.prototype.close = function () {
        this.removeTouchEvent(this.infoBtn, this.onOpenInfo);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.wrongBtn, this.onWrong);
        MessageManager.inst().removeListener("DL_NEXT", this.onNext, this);
        MessageManager.inst().removeListener("DL_RESET", this.onReset, this);
        MessageManager.inst().removeListener("RETURN", this.onReturn, this);
    };
    return PlayDuiLianPop;
}(BaseEuiView));
__reflect(PlayDuiLianPop.prototype, "PlayDuiLianPop");
ViewManager.inst().reg(PlayDuiLianPop, LayerManager.UI_Pop);
//# sourceMappingURL=PlayDuiLianPop.js.map