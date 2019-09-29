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
var CustomEvt = (function (_super) {
    __extends(CustomEvt, _super);
    function CustomEvt(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._data = data;
        return _this;
    }
    Object.defineProperty(CustomEvt.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**道具使用 */
    CustomEvt.PROP_USE = "prop_use";
    /**点击杀 */
    CustomEvt.CLICK_KILL = "click_kill";
    /**资源加载完成 */
    CustomEvt.COMMONRESEND = "commonresend";
    /**设置操作 */
    CustomEvt.SETTINGCLICK = "settingclick";
    /**游戏loading完成 */
    CustomEvt.GAMELOADINGEND = 'gameLoadingEnd';
    /**引导点击帮助 */
    CustomEvt.GUIDE_CLICK_INFO = "guide_click_info";
    /**引导点击商城 */
    CustomEvt.GUIDE_CLICK_MENU_SHOP = "guide_click_menu_shop";
    /**引导点击商城第一个item */
    CustomEvt.GUIDE_CLICK_SHOP_ITEM = "guide_click_shop_item";
    /**引导购买物品 */
    CustomEvt.GUIDE_CLICK_SHOP_BUY = "guide_click_shop_buy";
    /**引导关闭商城 */
    CustomEvt.GUIDE_CLICK_SHOP_CLOSE = "guide_click_shop_close";
    /**引导升级武将 */
    CustomEvt.GUIDE_CLICK_UPGRADE = "guide_click_upgrade";
    /**引导更换武将装备 */
    CustomEvt.GUIDE_CLICK_CHANGE = "guide_click_change";
    /**引导完成更换装备 */
    CustomEvt.GUIDE_CLICK_Equip = "guide_click_equip";
    /**引导关闭升级 */
    CustomEvt.GUIDE_CLICK_Equip_CLOSE = "guide_click_equip_close";
    /**引导关闭菜单 */
    CustomEvt.GUIDE_CLICK_CLOSE_MENU = "guide_click_close_menu";
    CustomEvt.RANDOM = "11111";
    CustomEvt.SELECT_EQUIP_UPDATA = "select_equip_updata";
    CustomEvt.SELECT_EQUIP = "select_equip";
    return CustomEvt;
}(egret.Event));
__reflect(CustomEvt.prototype, "CustomEvt");
//# sourceMappingURL=CustomEvt.js.map