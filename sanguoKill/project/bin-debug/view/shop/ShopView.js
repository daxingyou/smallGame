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
var ShopView = (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        var _this = _super.call(this) || this;
        _this.itemAny = [];
        _this.shopitem = [];
        _this.item_id = 0;
        _this.tab = 1; /**页数 */
        return _this;
    }
    ShopView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.weapon_btn, this.touchWeapon);
        this.addTouchEvent(this.protection_btn, this.touchProtection);
        this.addTouchEvent(this.prop_btn, this.touchProp);
        this.addTouchEvent(this.left_btn, this.touchLeft);
        this.addTouchEvent(this.right_btn, this.touchRight);
        this.addTouchEvent(this.close_btn, this.onclose);
        this.goldLab.text = GameApp.inst().gold.toString();
        this.watcher = eui.Binding.bindProperty(GameApp.inst(), ["gold"], this.goldLab, "text");
        this.content.x = (StageUtils.inst().getWidth() >> 1) - 765 / 2;
        this.content.y = (StageUtils.inst().getHeight() >> 1) - 455 / 2;
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                GameApp.guideView.nextStep({ id: "1_3", comObj: this.guideGroup, width: 98, height: 184 });
            }
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_SHOP_ITEM, this.onClickItem, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_SHOP_CLOSE, this.onShopClose, this);
    };
    ShopView.prototype.onShopClose = function () {
        ViewManager.inst().close(ShopView);
        ViewManager.inst().open(MenuView);
    };
    ShopView.prototype.refreshPage = function () {
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                GameApp.guideView.nextStep({ id: "1_5", comObj: this.close_btn, width: 43, height: 46 }, -90);
            }
        }
    };
    ShopView.prototype.onClickItem = function () {
        var item = this.shopitem[0];
        item.touchTap();
    };
    ShopView.prototype.onclose = function () {
        ViewManager.inst().close(ShopView);
    };
    ShopView.prototype.close = function () {
        if (this.watcher) {
            this.watcher.unwatch();
        }
        ;
        this.removeTouchEvent(this.weapon_btn, this.touchWeapon);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_SHOP_ITEM, this.onClickItem, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_SHOP_CLOSE, this.onShopClose, this);
        this.removeTouchEvent(this.protection_btn, this.touchProtection);
        this.removeTouchEvent(this.prop_btn, this.touchProp);
        this.removeTouchEvent(this.left_btn, this.touchLeft);
        this.removeTouchEvent(this.right_btn, this.touchRight);
        this.removeTouchEvent(this.close_btn, this.onclose);
    };
    ShopView.prototype.init = function () {
        this.item_id = 0;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 5; j++) {
                this.shopitem[this.item_id] = new ShopItem();
                this.shopitem[this.item_id].x = 6 + j * 111;
                this.shopitem[this.item_id].y = 2 + i * 185;
                this.item_group.addChild(this.shopitem[this.item_id]);
                this.item_id++;
            }
        }
        this.touchWeapon();
    };
    ShopView.prototype.touchLeft = function () {
        this.left_btn.visible = false;
        this.right_btn.visible = true;
        for (var j = 0; j < this.shopitem.length; j++) {
            this.shopitem[j].visible = true;
        }
        for (var i = 0; i < 10; i++) {
            this.shopitem[i].setData(this.itemAny[i]);
        }
    };
    ShopView.prototype.touchRight = function () {
        this.left_btn.visible = true;
        this.right_btn.visible = false;
        var id = 0;
        for (var i = 10; i < this.itemAny.length; i++) {
            this.shopitem[id].setData(this.itemAny[i]);
            id++;
        }
        for (var j = id; j < this.shopitem.length; j++) {
            this.shopitem[j].visible = false;
        }
    };
    ShopView.prototype.touchWeapon = function () {
        this.itemAny = [];
        for (var i = 0; i < ItemCfg.itemCfg.length; i++) {
            if (ItemCfg.itemCfg[i].type == ItemType.weapon || ItemCfg.itemCfg[i].type == ItemType.weapon_ma) {
                this.itemAny.push(ItemCfg.itemCfg[i]);
            }
        }
        this.sorting();
    };
    ShopView.prototype.touchProtection = function () {
        this.itemAny = [];
        for (var i = 0; i < ItemCfg.itemCfg.length; i++) {
            if (ItemCfg.itemCfg[i].type == ItemType.protection || ItemCfg.itemCfg[i].type == ItemType.protection_ma) {
                this.itemAny.push(ItemCfg.itemCfg[i]);
            }
        }
        this.sorting();
    };
    ShopView.prototype.touchProp = function () {
        this.itemAny = [];
        for (var i = 0; i < ItemCfg.itemCfg.length; i++) {
            if (ItemCfg.itemCfg[i].type == ItemType.prop) {
                this.itemAny.push(ItemCfg.itemCfg[i]);
            }
        }
        this.sorting();
    };
    ShopView.prototype.sorting = function () {
        for (var j = 0; j < this.shopitem.length; j++) {
            this.shopitem[j].visible = true;
        }
        var length = this.itemAny.length;
        if (length <= 10) {
            this.left_btn.visible = false;
            this.right_btn.visible = false;
        }
        else {
            this.left_btn.visible = false;
            this.right_btn.visible = true;
        }
        if (length >= 10) {
            for (var i = 0; i < 10; i++) {
                this.shopitem[i].setData(this.itemAny[i]);
            }
        }
    };
    return ShopView;
}(BaseEuiView));
__reflect(ShopView.prototype, "ShopView");
ViewManager.inst().reg(ShopView, LayerManager.UI_Main);
//# sourceMappingURL=ShopView.js.map