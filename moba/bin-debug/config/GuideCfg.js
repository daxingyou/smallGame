var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideCfg = (function () {
    function GuideCfg() {
    }
    GuideCfg.guidecfg = {
        "1_1": { "event": CustomEvt.GUIDE_CLICK_INFO, next: "1_2", param: { id: "1_1" } },
        "1_2": { "event": CustomEvt.GUIDE_CLICK_INFO, next: "1_3", param: { id: "1_2" } },
        "1_3": { "event": CustomEvt.GUIDE_CLICK_INFO, next: "1_4", param: { id: "1_3" } },
        "1_4": { "event": CustomEvt.GUIDE_CLICK_INFO, next: "1_5", param: { id: "1_4" } },
        "1_5": { "event": CustomEvt.GUIDE_CLICK_INFO, next: "1_6", param: { id: "1_5" } },
        "1_6": { "event": CustomEvt.GUIDE_CLICK_END, next: "", param: { id: "1_6" } },
    };
    return GuideCfg;
}());
__reflect(GuideCfg.prototype, "GuideCfg");
//# sourceMappingURL=GuideCfg.js.map