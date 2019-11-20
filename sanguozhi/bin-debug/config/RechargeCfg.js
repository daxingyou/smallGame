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
            cost: "￥6",
            desc: "60元宝",
            costNum: 6,
            goodid: 0
        },
        {
            icon: "gold_68_png",
            goldNum: 680,
            cost: "￥68",
            desc: "680元宝",
            costNum: 68,
            goodid: 1
        },
        {
            icon: "gold_128_png",
            goldNum: 1280,
            cost: "￥128",
            desc: "1280元宝",
            costNum: 128,
            goodid: 2
        },
        {
            icon: "gold_328_png",
            goldNum: 328,
            cost: "￥328",
            desc: "3280元宝",
            costNum: 328,
            goodid: 3
        },
        {
            icon: "gold_648_png",
            goldNum: 648,
            cost: "￥648",
            desc: "6480元宝",
            costNum: 648,
            goodid: 3
        }
    ];
    return RechargeCfg;
}());
__reflect(RechargeCfg.prototype, "RechargeCfg");
//# sourceMappingURL=RechargeCfg.js.map