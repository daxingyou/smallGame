var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PartnerCfg = (function () {
    function PartnerCfg() {
    }
    PartnerCfg.parenerCfg = [
        { name: "灵珊", o_suipian: 0, t_suipian: 0, cardModel: "", roleModel: "role_10001_png", icon: "head_10001_png", unlock: 0, isUnlock: true, atk: 100, def: 10, hp: 500,
            desc: "灵珊是一个高爆发伤害型英雄,可以迅速切入战场,毁灭对面所有单位",
            skillName: '重击',
            skillDesc: "蓄力将剑向前方挥出,对敌方单位造成不可恢复的伤害",
            id: 10001,
            level: 1,
            exp: 0,
        },
        { name: "狄青", o_suipian: 0, t_suipian: 20, cardModel: "card_10002_png", roleModel: "role_10002_png", icon: "head_10002_png", unlock: 0, isUnlock: false, atk: 150, def: 15, hp: 600,
            desc: "狄青是一个辅助性防御英雄,为友方护盾,建造起坚不可摧的壁垒",
            skillName: '壁垒',
            skillDesc: "坚不可摧的护盾,减少受到的伤害",
            id: 10002,
            level: 1, exp: 0 },
        { name: "程琳", o_suipian: 0, t_suipian: 40, cardModel: "card_10004_png", roleModel: "role_10004_png", icon: "head_10004_png", unlock: 4, isUnlock: false, atk: 230, def: 30, hp: 700,
            desc: "程琳是一个高爆发的伤害型魔法英雄，距离雷云展开真正的落雷毁灭敌方单位",
            skillName: '落雷',
            skillDesc: "召唤雷云,降落雷劫,对地方造成毁灭性打击",
            id: 10004, level: 1, exp: 0 },
        { name: "青叶", o_suipian: 0, t_suipian: 60, cardModel: "card_10005_png", roleModel: "role_10005_png", icon: "head_10005_png", unlock: 6, isUnlock: false, atk: 300, def: 50, hp: 800,
            desc: "青叶是一个辅助性治疗英雄,为友方提供一定的血量恢复",
            skillName: '治疗',
            skillDesc: "恢复所有友方单位一定的生命值",
            id: 10005, level: 1, exp: 0 },
        { name: "剑痴", o_suipian: 0, t_suipian: 80, cardModel: "card_10003_png", roleModel: "role_10003_png", icon: "head_10003_png", unlock: 8, isUnlock: false, atk: 375, def: 75, hp: 900,
            desc: "剑痴是一个高机动突击英雄,他可以使用四方斩快速切入战场，并对地方造成致命伤害",
            skillName: '雷刃',
            skillDesc: "雷神附体,提升全属性,并释放能量对敌方进行打击",
            id: 10003, level: 1, exp: 0 }
    ];
    return PartnerCfg;
}());
__reflect(PartnerCfg.prototype, "PartnerCfg");
//# sourceMappingURL=PartnerCfg.js.map