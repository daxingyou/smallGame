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
 * 商城 syy
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
        this.shopGroup.verticalCenter = -600;
        egret.Tween.get(this.shopGroup).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.shopGroup);
        }, this);
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.shopGroup["autoSize"]();
        this.dataList = new eui.ArrayCollection();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        MessageManager.inst().addListener(CustomEvt.SHOP_INTRODUCE, this.showIntroduce, this);
        this.setList();
    };
    /**
     *
     * 显示介绍信息
     * @param data 信息数据(object)
     */
    ShopView.prototype.showIntroduce = function (data) {
        console.log(data);
        var obj = [];
        obj.push(data.data);
        ViewManager.inst().open(IntroduceView, obj);
    };
    /**
     * 设置list数据
     */
    ShopView.prototype.setList = function () {
        this.list.itemRenderer = ShopItem;
        this.dataList.source = ShopCfg.cfgs;
        this.list.dataProvider = this.dataList;
        this.list.validateNow();
        this.list.scrollV = 0;
    };
    ShopView.prototype.touchTapHandler = function (e) {
        var _this = this;
        switch (e.target) {
            case this.return_btn:
                egret.Tween.get(this.shopGroup).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(_this.shopGroup);
                    ViewManager.inst().close(ShopView);
                }, this);
                break;
        }
    };
    ShopView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        MessageManager.inst().removeListener(CustomEvt.SHOP_INTRODUCE, this.showIntroduce, this);
    };
    return ShopView;
}(BaseEuiView));
__reflect(ShopView.prototype, "ShopView");
ViewManager.inst().reg(ShopView, LayerManager.UI_Pop);
//# sourceMappingURL=ShopView.js.map