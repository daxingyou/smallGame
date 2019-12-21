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
/**
 * Shopping Mall syy
 */
var ShopView = (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        return _super.call(this) || this;
    }
    ShopView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0]) {
            if (param[0].route) {
                this.route = param[0].route;
            }
        }
        this.shopGroup["autoSize"]();
        this.shopGroup.verticalCenter = -700;
        egret.Tween.get(this.shopGroup).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.shopGroup);
        }, this);
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.dataList = new eui.ArrayCollection();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        MessageManager.inst().addListener(CustomEvt.SHOP_INTRODUCE, this.showIntroduce, this);
        MessageManager.inst().addListener(CustomEvt.UPDATE_SHOP, this.updateShopHandler, this);
        this.setList();
    };
    /**
     *
     * Show introduction
     * @param data information data(object)
     */
    ShopView.prototype.showIntroduce = function (data) {
        console.log(data);
        var obj = [];
        obj.push(data.data);
        ViewManager.inst().open(IntroduceView, obj);
    };
    /**
     * Set uplistdata
     */
    ShopView.prototype.setList = function () {
        this.list.itemRenderer = ShopItem;
        var shopData = ShopCfg.cfgs;
        var generalstr = egret.localStorage.getItem(LocalStorageEnum.GENERALId);
        if (generalstr) {
            var arr = JSON.parse(generalstr);
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < shopData.length; j++) {
                    if (shopData[j].insId == arr[i]) {
                        shopData.splice(j, 1);
                        break;
                    }
                }
            }
        }
        this.dataList.source = shopData;
        this.list.dataProvider = this.dataList;
        this.list.validateNow();
        this.list.scrollV = 0;
    };
    ShopView.prototype.touchTapHandler = function (e) {
        var _this = this;
        switch (e.target) {
            case this.return_btn:
                egret.Tween.get(this.shopGroup).to({ verticalCenter: -700 }, 600, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(_this.shopGroup);
                    ViewManager.inst().close(ShopView);
                }, this);
                break;
        }
    };
    ShopView.prototype.updateShopHandler = function () {
        this.dataList.source = ShopCfg.cfgs;
    };
    ShopView.prototype.close = function () {
        if (this.route) {
            MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, this);
            this.route = null;
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        MessageManager.inst().removeListener(CustomEvt.SHOP_INTRODUCE, this.showIntroduce, this);
        MessageManager.inst().removeListener(CustomEvt.UPDATE_SHOP, this.updateShopHandler, this);
    };
    return ShopView;
}(BaseEuiView));
__reflect(ShopView.prototype, "ShopView");
ViewManager.inst().reg(ShopView, LayerManager.UI_Pop);
//# sourceMappingURL=ShopView.js.map