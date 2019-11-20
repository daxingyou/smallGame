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
    /**商城界面介绍*/
    CustomEvt.SHOP_INTRODUCE = 'shop_introduce';
    /**游戏loading完成 */
    CustomEvt.GAMELOADINGEND = 'gameLoadingEnd';
    /**引导点击帮助 */
    CustomEvt.GUIDE_CLICK_CITY = "GUIDE_CLICK_CITY";
    /**引导进入战斗 */
    CustomEvt.GUIDE_CLICK_BATTLE = "GUIDE_CLICK_BATTLE";
    /**开始征收 */
    CustomEvt.TAX_START = "tax_start";
    /**结束征收 */
    CustomEvt.TAX_END = "tax_end";
    /**开始征兵 */
    CustomEvt.COLLECT_START = "collect_start";
    /**结束征兵 */
    CustomEvt.COLLECT_END = "collect_end";
    /**选择城市*/
    CustomEvt.SELECT_MAIN_CITY = "select_main_city";
    /**内务冷却 */
    CustomEvt.NEIWU_CD = "neiwu_cd";
    /**点击卡牌 */
    CustomEvt.TOUCH_CARD = "touch_card";
    /**卡牌购买通知 */
    CustomEvt.CARD_REFRESH = "card_refresh";
    return CustomEvt;
}(egret.Event));
__reflect(CustomEvt.prototype, "CustomEvt");
//# sourceMappingURL=CustomEvt.js.map