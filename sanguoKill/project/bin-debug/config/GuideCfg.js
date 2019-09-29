var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideCfg = (function () {
    function GuideCfg() {
    }
    GuideCfg.guidecfg = {
        "1_1": { "event": CustomEvt.GUIDE_CLICK_INFO, next: "1_2", param: { id: "1_1" } },
        "1_2": { "event": CustomEvt.GUIDE_CLICK_MENU_SHOP, next: "1_3", param: {} },
        "1_3": { "event": CustomEvt.GUIDE_CLICK_SHOP_ITEM, next: "1_4", param: {} },
        "1_4": { "event": CustomEvt.GUIDE_CLICK_SHOP_BUY, next: "1_5", param: {} },
        "1_5": { "event": CustomEvt.GUIDE_CLICK_SHOP_CLOSE, next: "1_6", param: {} },
        "1_6": { "event": CustomEvt.GUIDE_CLICK_UPGRADE, next: "1_7", param: {} },
        "1_7": { "event": CustomEvt.GUIDE_CLICK_CHANGE, next: "1_8", param: {} },
        "1_8": { "event": CustomEvt.GUIDE_CLICK_Equip, next: "1_9", param: {} },
        "1_9": { "event": CustomEvt.GUIDE_CLICK_Equip_CLOSE, next: "1_10", param: {} },
        "1_10": { "event": CustomEvt.GUIDE_CLICK_CLOSE_MENU, next: "1_11", param: {} }
    };
    return GuideCfg;
}());
__reflect(GuideCfg.prototype, "GuideCfg");
//# sourceMappingURL=GuideCfg.js.map