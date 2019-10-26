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
var ShopPop = (function (_super) {
    __extends(ShopPop, _super);
    function ShopPop() {
        return _super.call(this) || this;
    }
    ShopPop.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItemPop;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        this.arrayCollect.source = ShopCfg.shopCfgs;
    };
    ShopPop.prototype.close = function () {
    };
    return ShopPop;
}(BaseEuiView));
__reflect(ShopPop.prototype, "ShopPop");
ViewManager.inst().reg(ShopPop, LayerManager.UI_Pop);
//# sourceMappingURL=ShopPop.js.map