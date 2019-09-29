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
var MenuView = (function (_super) {
    __extends(MenuView, _super);
    function MenuView() {
        return _super.call(this) || this;
    }
    MenuView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._param = param;
        this.addTouchEvent(this.upgrade_btn, this.touchHandler, true);
        this.addTouchEvent(this.shop_btn, this.touchHandler, true);
        this.addTouchEvent(this.bag_btn, this.touchHandler, true);
        this.addTouchEvent(this.back_btn, this.touchHandler, true);
        this.shop_btn.x = (StageUtils.inst().getWidth() >> 1) - 105;
        this.upgrade_btn.x = (StageUtils.inst().getWidth() >> 1) - 105;
        this.back_btn.x = (StageUtils.inst().getWidth() >> 1) - 105;
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                GameApp.guideView.nextStep({ id: "1_2", comObj: this.shop_btn, width: 210, height: 51 });
            }
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_MENU_SHOP, this.onClickShop, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_UPGRADE, this.onOpenUpgrade, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_CLOSE_MENU, this.onCloseMenu, this);
    };
    MenuView.prototype.onCloseMenu = function () {
        ViewManager.inst().close(MenuView);
        //引导已经结束
        GameApp.guilding = false;
        ViewManager.inst().close(GuideView);
        ViewManager.inst().open(GuideStory, [{ tip: "最后，祝主公马到成功。" }]);
    };
    MenuView.prototype.onOpenUpgrade = function () {
        ViewManager.inst().open(UpgradeView);
    };
    MenuView.prototype.onClickShop = function () {
        ViewManager.inst().open(ShopView);
    };
    MenuView.prototype.refreshPage = function () {
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                if (GameApp.isLast) {
                    GameApp.guideView.nextStep({ id: "1_10", comObj: this.back_btn, width: 210, height: 51 });
                }
                else {
                    GameApp.guideView.nextStep({ id: "1_6", comObj: this.upgrade_btn, width: 210, height: 51 });
                }
            }
        }
    };
    MenuView.prototype.touchHandler = function (e) {
        switch (e.target) {
            case this.upgrade_btn:
                ViewManager.inst().open(UpgradeView);
                break;
            case this.shop_btn:
                ViewManager.inst().open(ShopView);
                break;
            case this.bag_btn:
                ViewManager.inst().open(BagView);
                break;
            case this.back_btn:
                ViewManager.inst().close(MenuView);
                break;
        }
    };
    MenuView.prototype.close = function () {
        this.removeTouchEvent(this.upgrade_btn, this.touchHandler);
        this.removeTouchEvent(this.shop_btn, this.touchHandler);
        this.removeTouchEvent(this.bag_btn, this.touchHandler);
        this.removeTouchEvent(this.back_btn, this.touchHandler);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_MENU_SHOP, this.onClickShop, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_UPGRADE, this.onOpenUpgrade, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_CLOSE_MENU, this.onCloseMenu, this);
    };
    return MenuView;
}(BaseEuiView));
__reflect(MenuView.prototype, "MenuView");
ViewManager.inst().reg(MenuView, LayerManager.UI_Main);
//# sourceMappingURL=MenuView.js.map