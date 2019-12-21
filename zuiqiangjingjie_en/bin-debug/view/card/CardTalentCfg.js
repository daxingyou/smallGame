var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CardTalentCfg = (function () {
    function CardTalentCfg() {
    }
    CardTalentCfg.list = {
        general: [
            {
                name: "Ma Chao",
                talent: "Increase all attributes of cavalry in this array\u3002"
            },
            {
                name: "Guan Yu",
                talent: "When skills are released\uFF0CYes30%Probability trigger talent\uFF0CThat is to say, each attack of the array is a two-stage attack\uFF0CContinued2Round\u3002"
            },
            {
                name: "Zhu Geliang",
                talent: "When skills are released\uFF0CYes30%Probability trigger talent\uFF0CThat is, all soldiers strengthen1Round\u3002"
            },
            {
                name: "Zhou Yu",
                talent: "When skills are released\uFF0CYes30%Probability trigger talent\uFF0CThat's to shield all the soldiers\uFF0CContinued1round\u3002"
            },
            {
                name: "Tai Shi Ci",
                talent: "Increase the attack of bowmen in this array\u3002"
            },
            {
                name: "Gan Ning",
                talent: "When skills are released\uFF0CYes30%Probability trigger talent\uFF0CThat is, to shield the soldiers of this array\uFF0CContinued2round\u3002"
            },
            {
                name: "Sima Yi",
                talent: "When skills are released\uFF0CYes30%Probability trigger talent\uFF0CThat's to shield all the soldiers\uFF0CContinued1round\u3002"
            },
            {
                name: "Wei and Wei",
                talent: "Increase the life of infantry in this array\u3002"
            },
            {
                name: "Xu Huang",
                talent: "When skills are released\uFF0CYes30%Probability trigger talent\uFF0CWhen our soldiers are attacked\uFF0CFight back at once\uFF0CContinued2round\u3002"
            },
        ],
        soldier: [
            {
                name: "Bowmen",
                talent: "Restraint of cavalry\uFF0CFighting with cavalry\uFF0Cattack+15%\u3002",
                hp: 2880,
                atk: 1440
            },
            {
                name: "Infantry",
                talent: "Restraint of the bowmen\uFF0CFighting with bowmen\uFF0Cattack+15%\u3002",
                hp: 3600,
                atk: 720
            },
            {
                name: "cavalry",
                talent: "Restraint of infantry\uFF0CEngage infantry\uFF0Cattack+15%\u3002",
                hp: 2880,
                atk: 720
            },
        ]
    };
    return CardTalentCfg;
}());
__reflect(CardTalentCfg.prototype, "CardTalentCfg");
//# sourceMappingURL=CardTalentCfg.js.map