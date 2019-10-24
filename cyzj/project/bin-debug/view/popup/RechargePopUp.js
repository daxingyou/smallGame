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
var RechargePopUp = (function (_super) {
    __extends(RechargePopUp, _super);
    function RechargePopUp() {
        return _super.call(this) || this;
    }
    RechargePopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.content.scaleX = this.content.scaleY = 0;
        this.content.alpha = 0;
        egret.Tween.get(this.content).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = RechargeItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        var dataarr = ShopCfg.shopCfgs;
        this.arrayCollect.source = dataarr;
    };
    RechargePopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(RechargePopUp);
        }, this);
    };
    RechargePopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return RechargePopUp;
}(BaseEuiView));
__reflect(RechargePopUp.prototype, "RechargePopUp");
ViewManager.inst().reg(RechargePopUp, LayerManager.UI_Pop);
//# sourceMappingURL=RechargePopUp.js.map