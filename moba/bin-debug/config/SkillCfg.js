var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillCfg = (function () {
    function SkillCfg() {
    }
    SkillCfg.cfg = {
        101: {
            skillId: 101,
            skillName: "陷阱",
            skillDesc: "可连续种下3个陷阱，持续存在一定时间，敌人碰触后发生范围爆炸，造成范围伤害.",
            skillCd: 3,
            atk: 50,
            buffTime: 60,
            usenum: 3,
            atkDis: 80
        },
        102: {
            skillId: 102,
            skillName: "狂战",
            skillDesc: "增加2倍攻速攻击持续一段时间",
            skillCd: 10,
            atk: 100,
            buffTime: 30,
            usenum: 1,
            atkDis: 0
        },
        103: {
            skillId: 103,
            skillName: "分身",
            skillDesc: "召唤一个分身进行攻击，分身拥有本身的50%的属性",
            skillCd: 15,
            atk: 100,
            buffTime: 30,
            usenum: 0,
            atkDis: 0
        },
        104: {
            skillId: 104,
            skillName: "技能4",
            skillDesc: "一次性大范围伤害",
            skillCd: 30,
            atk: 300,
            buffTime: 0,
            usenum: 1,
            atkDis: 150
        }
    };
    return SkillCfg;
}());
__reflect(SkillCfg.prototype, "SkillCfg");
//# sourceMappingURL=SkillCfg.js.map