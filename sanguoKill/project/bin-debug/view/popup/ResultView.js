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
var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        return _super.call(this) || this;
    }
    ResultView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0].state == 0) {
            this.skin.currentState = "fail";
        }
        else {
            if (GameApp.curLevel >= GameApp.battleLevel) {
                GameApp.battleLevel += 1;
            }
            this.skin.currentState = "win";
            var gold = (GameApp.battleLevel - 1) * 300 + 500;
            var exp = (GameApp.battleLevel - 1) * 20 + 100;
            GameApp.inst().gold += gold;
            this.goldLab.text = "获得" + gold + "两银子";
            this.expLap.text = "获得" + exp + "经验";
            //给人物发送过去
            UpgradeCfg.ins.addExp(exp);
        }
        this.level_0.text = "Lv " + UpgradeCfg.ins.roleData[0].level;
        this.level_1.text = "Lv " + UpgradeCfg.ins.roleData[1].level;
        this.level_2.text = "Lv " + UpgradeCfg.ins.roleData[2].level;
        this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
        this.exitBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
    };
    ResultView.prototype.onExit = function (evt) {
        CommonLoading.inst().show(null, function () {
            ViewManager.inst().close(ResultView);
            ViewManager.inst().close(BattleView);
            //进入主界面;
            ViewManager.inst().open(SelectFightView);
        }, this);
    };
    ResultView.prototype.close = function () {
        this.exitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
        this.exitBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
    };
    return ResultView;
}(BaseEuiView));
__reflect(ResultView.prototype, "ResultView");
ViewManager.inst().reg(ResultView, LayerManager.UI_Pop);
//# sourceMappingURL=ResultView.js.map