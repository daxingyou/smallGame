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
var PlayDengMiPop = (function (_super) {
    __extends(PlayDengMiPop, _super);
    function PlayDengMiPop() {
        var _this = _super.call(this) || this;
        _this.answer = "";
        return _this;
    }
    PlayDengMiPop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.showQuestion();
        this.wordGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.guessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuessBackTouch, this);
        MessageManager.inst().addListener("RETURN", this.onReturn, this);
        MessageManager.inst().addListener("DL_NEXT", this.onNext, this);
        MessageManager.inst().addListener("DL_RESET", this.onReset, this);
    };
    PlayDengMiPop.prototype.onNext = function () {
        this.showQuestion();
    };
    PlayDengMiPop.prototype.onReset = function () {
        this.showQuestion(this.curQuestionCfg.result);
    };
    PlayDengMiPop.prototype.onTouchTap = function (evt) {
        if (evt.target instanceof eui.Group) {
            var label = evt.target.getChildByName("lab");
            if (!!label && label.text) {
                this.answer += label.text;
                if (this.guessGroup.numChildren >= 4) {
                    UserTips.inst().showTips("已达上限");
                    return;
                }
                var group = this.createBlock(label.text);
                group.left = this.guessGroup.numChildren * 30 + (this.guessGroup.numChildren) * 10 - 10;
                group.y = 5;
                this.guessGroup.width = this.guessGroup.numChildren * (30) + (this.guessGroup.numChildren) * 10;
                this.guessGroup.addChild(group);
            }
        }
    };
    PlayDengMiPop.prototype.onGuessBackTouch = function (evt) {
        if (evt.target instanceof eui.Group) {
            var label = evt.target.getChildByName("lab");
            if (!!label) {
                this.guessGroup.removeChild(evt.target);
                for (var i = 0; i < this.guessGroup.numChildren; i++) {
                    this.guessGroup.$children[i].left = i * 30 + (i) * 10 - 10;
                    this.guessGroup.$children[i].y = 5;
                }
                this.guessGroup.width -= 40;
                var index = this.answer.indexOf(label.text);
                if (index != -1) {
                    this.answer.slice(index, 1);
                }
            }
        }
    };
    PlayDengMiPop.prototype.createBlock = function (cnt) {
        var group = new eui.Group();
        group.width = group.height = 30;
        group.touchEnabled = true;
        group.touchChildren = false;
        group.touchThrough = false;
        var block = new eui.Image("img_dengmi_cell_bg_png");
        group.addChild(block);
        block.right = block.top = block.left = block.bottom = 0;
        var txt = new eui.Label();
        group.addChild(txt);
        txt.size = 20;
        txt.horizontalCenter = 0;
        txt.verticalCenter = 0;
        txt.name = "lab";
        txt.text = cnt;
        return group;
    };
    PlayDengMiPop.prototype.showQuestion = function (word) {
        this.guessGroup.removeChildren();
        // for(let i:number = 0;i<this.guessGroup.numChildren;i++){
        // 	let item = this.guessGroup.getChildAt(i);
        // 	if(item && item.parent){
        // 		item.parent.removeChild(item);
        // 	}
        // }
        var wordstr = "";
        for (var i = 0; i <= 5; i++) {
            wordstr += this.randomfont();
        }
        var cfgs = DengMiCfg.cfgs.content;
        var index = (Math.random() * cfgs.length) >> 0;
        var cfg = cfgs[index];
        if (!word) {
            this.guessLab.text = cfg.display;
            this.typeLab.text = cfg.msg;
            this.curQuestionCfg = cfg;
            wordstr += cfg.result;
        }
        else {
            wordstr += word;
        }
        var wordArr = wordstr.split("");
        for (var i = 0; i < 10; i++) {
            var label = this["word" + (i + 1)].getChildByName("lab");
            if (label) {
                var index_1 = (Math.random() * wordArr.length) >> 0;
                var font = wordArr[index_1];
                wordArr.splice(index_1, 1);
                label.text = font;
            }
        }
    };
    PlayDengMiPop.prototype.onSure = function () {
        if (!this.guessGroup.numChildren) {
            UserTips.inst().showTips("请输入有效答案");
            return;
        }
        if (this.answer && this.answer == this.curQuestionCfg.result) {
            //回答正确
            ViewManager.inst().open(OverView, [{ state: "result", win: 1 }]);
        }
        else {
            //回答错误
            ViewManager.inst().open(OverView, [{ state: "result", win: 0, desc: "您给出的答案不正确,是否重新开始" }]);
        }
    };
    PlayDengMiPop.prototype.randomfont = function () {
        var _len = 1;
        var i = 0;
        var _str = "";
        var _base = 20000;
        var _range = 700;
        while (i < _len) {
            i++;
            var _lower = (Math.random() * _range) >> 0;
            _str += String.fromCharCode(_base + _lower);
        }
        return _str;
    };
    PlayDengMiPop.prototype.onReturn = function () {
        ViewManager.inst().close(PlayDengMiPop);
    };
    PlayDengMiPop.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.wordGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.guessGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGuessBackTouch, this);
        MessageManager.inst().removeListener("RETURN", this.onReturn, this);
        MessageManager.inst().removeListener("DL_NEXT", this.onNext, this);
        MessageManager.inst().removeListener("DL_RESET", this.onReset, this);
    };
    return PlayDengMiPop;
}(BaseEuiView));
__reflect(PlayDengMiPop.prototype, "PlayDengMiPop");
ViewManager.inst().reg(PlayDengMiPop, LayerManager.UI_Pop);
//# sourceMappingURL=PlayDengMiPop.js.map