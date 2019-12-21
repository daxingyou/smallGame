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
    /**Introduction to shopping mall interface*/
    CustomEvt.SHOP_INTRODUCE = 'shop_introduce';
    /**Gameloadingcomplete */
    CustomEvt.GAMELOADINGEND = 'gameLoadingEnd';
    /**Guide click Help */
    CustomEvt.GUIDE_CLICK_CITY = "GUIDE_CLICK_CITY";
    /**Lead into battle */
    CustomEvt.GUIDE_CLICK_BATTLE = "GUIDE_CLICK_BATTLE";
    /**Start collecting */
    CustomEvt.TAX_START = "tax_start";
    /**End of collection */
    CustomEvt.TAX_END = "tax_end";
    /**Start conscription */
    CustomEvt.COLLECT_START = "collect_start";
    /**Ending conscription */
    CustomEvt.COLLECT_END = "collect_end";
    /**Choice of city*/
    CustomEvt.SELECT_MAIN_CITY = "select_main_city";
    /**Interior cooling */
    CustomEvt.NEIWU_CD = "neiwu_cd";
    /**Click card */
    CustomEvt.TOUCH_CARD = "touch_card";
    /**Card purchase notice */
    CustomEvt.CARD_REFRESH = "card_refresh";
    /** Refresh mall */
    CustomEvt.UPDATE_SHOP = "update_shop";
    return CustomEvt;
}(egret.Event));
__reflect(CustomEvt.prototype, "CustomEvt");
//# sourceMappingURL=CustomEvt.js.map