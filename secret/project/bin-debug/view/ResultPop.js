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
var ResultPop = (function (_super) {
    __extends(ResultPop, _super);
    function ResultPop() {
        var _this = _super.call(this) || this;
        _this.isEnd = false;
        _this._endBoo = false;
        return _this;
    }
    ResultPop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.skin.currentState = param[0].state;
        if (param[0].state == "win") {
            if (param[0].end) {
                this.isEnd = true;
                //已经结束了
                this.title.text = "[结局]";
                this.continueBtn.visible = false;
                this.gameBtn.visible = true;
                this.nextLevelBtn.visible = true;
                this.heartGroup.visible = true;
                if (GameApp.progress == 1) {
                    //男
                    this._endBoo = param[0].endBoo;
                    if (param[0].endBoo) {
                        //好的结果
                        this.img.source = "result_4_1_jpg";
                        this.gameBtn.source = "common_btn_png";
                        this.oper = 1;
                    }
                    else {
                        this.img.source = "result_3_1_jpg";
                        this.gameBtn.source = "btn_teach_1_png";
                        this.oper = 0;
                    }
                }
                else {
                    this.img.source = "result_3_2_jpg";
                    this.gameBtn.source = "btn_teach_2_png";
                    this.oper = 0;
                }
            }
            else {
                this.heartGroup.visible = false;
                this.title.text = "[真相]";
                this.isEnd = false;
                if (GameApp.progress == 1) {
                    var index = (Math.random() * 2) >> 0;
                    this.img.source = "result_" + (index + 1) + "_1_jpg";
                }
                else {
                    this.img.source = "result_1_2_jpg";
                }
                this.continueBtn.visible = true;
                this.gameBtn.visible = false;
                this.nextLevelBtn.visible = false;
            }
            this.resultTxt.text = param[0].cnt;
        }
        else {
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ResultPop.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.continueBtn:
                ViewManager.inst().close(ResultPop);
                MessageManager.inst().dispatch("endOneChapter");
                break;
            case this.nextLevelBtn:
                ViewManager.inst().close(ResultPop);
                ViewManager.inst().close(StoryView);
                ViewManager.inst().close(GameMainView);
                ViewManager.inst().open(GameMainView);
                GameApp.health += 1;
                break;
            case this.gameBtn:
                ViewManager.inst().open(TeachPop, [{ source: this.gameBtn.source, endBoo: this._endBoo }]);
                ViewManager.inst().close(ResultPop);
                ViewManager.inst().close(StoryView);
                ViewManager.inst().close(GameMainView);
                break;
            case this.returnBtn:
                ViewManager.inst().close(ResultPop);
                break;
            case this.answerBtn:
                ViewManager.inst().close(ResultPop);
                MessageManager.inst().dispatch("openAnswer");
                break;
        }
    };
    ResultPop.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return ResultPop;
}(BaseEuiView));
__reflect(ResultPop.prototype, "ResultPop");
ViewManager.inst().reg(ResultPop, LayerManager.UI_Pop);
//# sourceMappingURL=ResultPop.js.map