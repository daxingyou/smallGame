var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoldierAttrCfg = (function () {
    function SoldierAttrCfg() {
    }
    SoldierAttrCfg.attrCfg = {
        0: {
            //弓
            hp: 500,
            atk: 100,
            atkDis: 500,
            SPD: 100,
            brains: 50,
            w: 101,
            h: 85,
            woodCost: 40,
            goodCost: 20,
            feCost: 20
        },
        1: {
            //骑兵
            hp: 500,
            atk: 100,
            atkDis: 50,
            SPD: 100,
            brains: 80,
            w: 177,
            h: 141,
            woodCost: 20,
            goodCost: 40,
            feCost: 20
        },
        2: {
            //甲
            hp: 500,
            atk: 100,
            atkDis: 50,
            brains: 40,
            SPD: 100,
            w: 111,
            h: 92,
            woodCost: 20,
            goodCost: 20,
            feCost: 40
        }
    };
    return SoldierAttrCfg;
}());
__reflect(SoldierAttrCfg.prototype, "SoldierAttrCfg");
//# sourceMappingURL=SoldierAttrCfg.js.map