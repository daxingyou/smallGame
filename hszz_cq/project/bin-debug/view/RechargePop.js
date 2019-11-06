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
var RechargePop = (function (_super) {
    __extends(RechargePop, _super);
    function RechargePop() {
        return _super.call(this) || this;
    }
    RechargePop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.arrayCollect = new eui.ArrayCollection();
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        this.list.itemRenderer = RechargeItem;
        this.list.dataProvider = this.arrayCollect;
        this.arrayCollect.source = ShopCfg.shopCfgs;
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
    };
    RechargePop.prototype.onReturn = function () {
        ViewManager.inst().close(RechargePop);
    };
    RechargePop.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return RechargePop;
}(BaseEuiView));
__reflect(RechargePop.prototype, "RechargePop");
ViewManager.inst().reg(RechargePop, LayerManager.UI_Pop);
//# sourceMappingURL=RechargePop.js.map