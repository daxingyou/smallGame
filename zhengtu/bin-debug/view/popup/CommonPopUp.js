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
var CommonPopUp = (function (_super) {
    __extends(CommonPopUp, _super);
    function CommonPopUp() {
        return _super.call(this) || this;
    }
    CommonPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.sureBtn, this.onSure, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        if (param[0] && param[0].tip) {
            this.contentLab.text = param[0].tip;
        }
        this._type = param[0].type;
    };
    CommonPopUp.prototype.onSure = function () {
        this.onReturn(null, CustomEvt.CLICK_SURE);
    };
    CommonPopUp.prototype.onReturn = function (event, evt) {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            if (evt) {
                ViewManager.inst().close(GeneralPopUp);
                ViewManager.inst().open(SoldierCamp, [{ type: _this._type }]);
            }
            ViewManager.inst().close(CommonPopUp);
        }, this);
    };
    CommonPopUp.prototype.close = function () {
        this.removeTouchEvent(this.sureBtn, this.onSure);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return CommonPopUp;
}(BaseEuiView));
__reflect(CommonPopUp.prototype, "CommonPopUp");
ViewManager.inst().reg(CommonPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=CommonPopUp.js.map