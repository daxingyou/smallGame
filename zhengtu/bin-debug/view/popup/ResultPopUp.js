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
var ResultPopUp = (function (_super) {
    __extends(ResultPopUp, _super);
    function ResultPopUp() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        return _this;
    }
    ResultPopUp.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._state = param[0].state;
        if (param[0].state == 1) {
            this.skin.currentState = "win";
            var level = param[0].level;
            this.expLab.text = param[0].exp + "经验";
            var baseValue = 100 * level;
            var woodNum = baseValue + ((Math.random() * 50) >> 0);
            var goodNum = baseValue + ((Math.random() * 50) >> 0);
            var feNum = baseValue + ((Math.random() * 50) >> 0);
            var goldNum = 20 + (level - 1) * 10;
            this.woodLab.text = woodNum.toString();
            this.goodLab.text = goodNum.toString();
            this.feLab.text = feNum.toString();
            this.goldLab.text = goldNum.toString();
            GameApp.inst().gold += goldNum;
            GameApp.inst().wood += woodNum;
            GameApp.inst().good += goodNum;
            GameApp.inst().fe += feNum;
            if (param[0].awardRole) {
                this.awardRoleGroup.visible = true;
                this.nameLab.text = param[0].name;
                this.icon.source = param[0].icon;
            }
            else {
                this.awardRoleGroup.visible = false;
            }
        }
        else {
            this.skin.currentState = "fail";
        }
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.correctBtn, this.onSure, true);
        this.addTouchEvent(this.resetBtn, this.onReset, true);
    };
    ResultPopUp.prototype.onReset = function () {
        this.onClose();
        MessageManager.inst().dispatch(CustomEvt.BATTLE_RESET);
    };
    ResultPopUp.prototype.onSure = function () {
        this.onClose(CustomEvt.BATTLE_END);
    };
    ResultPopUp.prototype.onClose = function (event) {
        ViewManager.inst().close(ResultPopUp);
        if (event) {
            // MessageManager.inst().dispatch(event);
            if (GameApp.guildView) {
                GameApp.guilding = false;
                ViewManager.inst().close(GuideView);
            }
            ViewManager.inst().close(BattleView);
            ViewManager.inst().open(GameMainView);
        }
    };
    ResultPopUp.prototype.close = function () {
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.correctBtn, this.onSure);
        this.removeTouchEvent(this.resetBtn, this.onReset);
    };
    return ResultPopUp;
}(BaseEuiView));
__reflect(ResultPopUp.prototype, "ResultPopUp");
ViewManager.inst().reg(ResultPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=ResultPopUp.js.map