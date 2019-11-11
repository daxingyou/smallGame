var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuideCfg = (function () {
    function GuideCfg() {
    }
    GuideCfg.guidecfg = {
        "1_1": { "event": CustomEvt.GUIDE_CLICK_COLLECT, next: "", wait: "1_2", param: {}, tip: "集结队伍,准备征战" },
        "1_2": { "event": CustomEvt.GUIDE_CLICK_BATTLE, next: "", param: {}, wait: "1_3", tip: "" },
        "1_3": { "event": CustomEvt.GUIDE_SELECT_LEVEL, next: "", wait: "2_1", param: {} },
        // "1_3":{"event":CustomEvt.GUIDE_USE_SKILL,next:"",wait:"2_1",param:{},tip:"使用强力技能,击退敌人,切记每个技能可以使用一次"},
        "2_1": { "event": CustomEvt.GUIDE_OPEN_GENERAL, next: "", wait: "2_2", param: {} },
        "2_2": { "event": CustomEvt.GUIDE_ADD_SOLDIER, next: "2_3", wait: "", param: {}, tip: "及时的补充兵力,为下一回的战斗做准备" },
        "2_3": { "event": CustomEvt.GUIDE_TRAIN_SOLDIER, next: "2_4", param: {} },
        "2_4": { "event": CustomEvt.GUIDE_CLOSE_SOLDIER, next: "", param: {} },
    };
    return GuideCfg;
}());
__reflect(GuideCfg.prototype, "GuideCfg");
//# sourceMappingURL=GuideCfg.js.map