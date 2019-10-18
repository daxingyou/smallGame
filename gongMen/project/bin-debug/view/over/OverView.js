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
var OverView = (function (_super) {
    __extends(OverView, _super);
    function OverView() {
        var _this = _super.call(this) || this;
        _this.rewardGold = 0;
        return _this;
    }
    OverView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.close_btn, this.touchClose);
        if (param[0] && param[0].state == "result") {
            this.close_btn.visible = false;
            this.titleImg.source = param[0].win ? "img_tip_top_success_png" : "img_tip_top_failure_png";
            this.winGroup.visible = param[0].win ? true : false;
            this.failGroup.visible = param[0].win ? false : true;
            if (!param[0].win) {
                //失败
                this.rewardgroup.visible = false;
                this.descLab.visible = true;
            }
            if (param[0].gold) {
                this.rewardGold = param[0].gold;
            }
            if (param[0].desc) {
                this.descLab.text = param[0].desc;
            }
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.returnBtn2, this.onReturn, true);
        this.addTouchEvent(this.nextBtn, this.onNext, true);
        this.addTouchEvent(this.resetBtn, this.onReset, true);
    };
    OverView.prototype.onNext = function () {
        this.touchClose();
        MessageManager.inst().dispatch("DL_NEXT");
    };
    OverView.prototype.onReset = function () {
        this.touchClose();
        MessageManager.inst().dispatch("DL_RESET");
    };
    OverView.prototype.onReturn = function () {
        this.touchClose();
        MessageManager.inst().dispatch("RETURN");
    };
    OverView.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.returnBtn2, this.onReturn);
        this.removeTouchEvent(this.nextBtn, this.onNext);
        this.removeTouchEvent(this.resetBtn, this.onReset);
    };
    OverView.prototype.touchClose = function () {
        ViewManager.inst().close(OverView);
    };
    OverView.prototype.init = function () {
        StoryLineConfig.storyLinefig[GameConfig.gqNum].first = false;
        GameConfig.gqNum++;
        if (GameConfig.gqNum < StoryLineConfig.storyLinefig.length)
            StoryLineConfig.storyLinefig[GameConfig.gqNum].state = "normal";
        this.tiao.mask = this.tiao_mask;
        GameConfig.gqExe += 20;
        if (GameConfig.gqExe >= 100) {
            GameConfig.level++;
            GameConfig.gqExe -= 100;
        }
        if (GameConfig.level >= 11) {
            GameConfig.level = 11;
            GameConfig.gqExe = 100;
        }
        this.jindu.text = GameConfig.gqExe + " / 100";
        if (GameConfig.level >= 10) {
            this.level.source = "img_level_normal_" + GameConfig.level + "_png";
        }
        else {
            this.level.source = "img_level_normal_0" + GameConfig.level + "_png";
        }
        this.tiao_mask.x = -(this.tiao.width - (GameConfig.gqExe * this.tiao.width / 100));
        this.gold.text = "" + 50;
        GameConfig.gold += 50;
    };
    return OverView;
}(BaseEuiView));
__reflect(OverView.prototype, "OverView");
ViewManager.inst().reg(OverView, LayerManager.UI_Pop);
//# sourceMappingURL=OverView.js.map