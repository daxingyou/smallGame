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
var SettingPopUp = (function (_super) {
    __extends(SettingPopUp, _super);
    function SettingPopUp() {
        var _this = _super.call(this) || this;
        _this._oper = 0;
        return _this;
    }
    SettingPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        this.content.scaleY = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this);
            egret.Tween.get(_this.content).to({ scaleY: 1 }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(_this.content);
            }, _this);
        });
        this.addTouchEvent(this.continueBtn, this.onContinue, true);
        this.addTouchEvent(this.exitBtn, this.onExit, true);
    };
    SettingPopUp.prototype.onContinue = function () {
        this._oper = 1;
        this.onClose();
    };
    SettingPopUp.prototype.onExit = function () {
        egret.Tween.removeAllTweens();
        GameApp.battleEnd = true;
        this._oper = 0;
        this.onClose();
    };
    SettingPopUp.prototype.onClose = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            if (_this._oper == 0) {
                CommonLoading.inst().show(null, function () {
                    egret.Tween.get(_this).to({ alpha: 0 }, 600, egret.Ease.circOut).call(function () {
                        egret.Tween.removeTweens(_this);
                    }, _this);
                    ViewManager.inst().close(SettingPopUp);
                    ViewManager.inst().close(BattleView);
                    ViewManager.inst().open(SelectFightView);
                    // MessageManager.inst().dispatch(CustomEvt.SETTINGCLICK,{oper:this._oper})
                }, _this);
            }
            else {
                ViewManager.inst().close(SettingPopUp);
            }
        }, this);
    };
    SettingPopUp.prototype.close = function () {
        this.removeTouchEvent(this.continueBtn, this.onContinue);
        this.removeTouchEvent(this.exitBtn, this.onExit);
    };
    return SettingPopUp;
}(BaseEuiView));
__reflect(SettingPopUp.prototype, "SettingPopUp");
ViewManager.inst().reg(SettingPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=SettingPopUp.js.map