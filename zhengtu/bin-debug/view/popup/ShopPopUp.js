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
var ShopPopUp = (function (_super) {
    __extends(ShopPopUp, _super);
    function ShopPopUp() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 1;
        return _this;
    }
    ShopPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.visible = false;
        this.refreshViewData();
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShopPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(ShopPopUp);
        }, this);
    };
    ShopPopUp.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.tabBtn_good:
                this.selectIndex = 1;
                this.tabBtn_good.currentState = "down";
                this.tabBtn_recharge.currentState = "up";
                this.refreshViewData();
                break;
            case this.tabBtn_recharge:
                this.selectIndex = 2;
                this.tabBtn_good.currentState = "up";
                this.tabBtn_recharge.currentState = "down";
                this.refreshViewData();
                break;
        }
    };
    ShopPopUp.prototype.refreshViewData = function () {
        var shopCfg = ShopCfg.shopCfgs[this.selectIndex];
        var dataArr = [];
        for (var key in shopCfg) {
            dataArr.push(shopCfg[key]);
        }
        this.arrayCollect.source = dataArr;
        this.list.dataProviderRefreshed();
    };
    ShopPopUp.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        var len = this.list.$children.length;
        for (var i = 0; i < len; i++) {
            var item = this.list.getChildAt(i);
            item.dispose();
        }
    };
    return ShopPopUp;
}(BaseEuiView));
__reflect(ShopPopUp.prototype, "ShopPopUp");
ViewManager.inst().reg(ShopPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=ShopPopUp.js.map