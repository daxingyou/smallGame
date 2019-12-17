var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商城配置
 */
var RechargeCfg = (function () {
    function RechargeCfg() {
    }
    RechargeCfg.cfg = [
        {
            icon: "gold_6_png",
            goldNum: 60,
            cost: "花费6元可购得60枚元宝",
            desc: "60枚元宝",
            costNum: 6,
            goodid: 0
        },
        {
            icon: "gold_68_png",
            goldNum: 680,
            cost: "花费68元可购得680枚元宝",
            desc: "680枚元宝",
            costNum: 68,
            goodid: 1
        },
        {
            icon: "gold_128_png",
            goldNum: 1280,
            cost: "花费128元可购得1280枚元宝",
            desc: "1280枚元宝",
            costNum: 128,
            goodid: 2
        },
        {
            icon: "gold_328_png",
            goldNum: 328,
            cost: "花费328元可购得3280枚元宝",
            desc: "3280枚元宝",
            costNum: 328,
            goodid: 3
        },
        {
            icon: "gold_648_png",
            goldNum: 648,
            cost: "花费6488元可购得6480枚元宝",
            desc: "6480枚元宝",
            costNum: 648,
            goodid: 3
        }
    ];
    return RechargeCfg;
}());
__reflect(RechargeCfg.prototype, "RechargeCfg");
//# sourceMappingURL=RechargeCfg.js.map