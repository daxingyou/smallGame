var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideCfg = (function () {
    function GuideCfg() {
    }
    GuideCfg.guidecfg = {
        "1_1": { "event": CustomEvt.GUIDE_CLICK_CITY, next: "1_2", param: { id: "1_1" }, cnt: "commander,Let's start from here!!!" },
        "1_2": { "event": CustomEvt.GUIDE_CLICK_BATTLE, next: "", param: { id: "1_1" }, cnt: "Click to start the pre War deployment" }
    };
    return GuideCfg;
}());
__reflect(GuideCfg.prototype, "GuideCfg");
//# sourceMappingURL=GuideCfg.js.map