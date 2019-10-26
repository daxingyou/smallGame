var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商城配置
 */
var ShopCfg = (function () {
    function ShopCfg() {
    }
    ShopCfg.shopCfgs = [
        {
            icon: "gold_6_png",
            goldNum: 60,
            cost: "￥6",
            desc: "花费6元可获得60钻石",
            costNum: 6,
            goodid: 0
        },
        {
            icon: "gold_30_png",
            goldNum: 300,
            cost: "￥30",
            desc: "花费30元可获得300钻石",
            costNum: 30,
            goodid: 1
        },
        {
            icon: "gold_68_png",
            goldNum: 680,
            cost: "￥68",
            desc: "花费68元可获得680钻石",
            costNum: 68,
            goodid: 2
        },
        {
            icon: "gold_128_png",
            goldNum: 1280,
            cost: "￥128",
            desc: "花费128元可获得1280钻石",
            costNum: 128,
            goodid: 3
        },
        {
            icon: "gold_328_png",
            goldNum: 3280,
            cost: "￥328",
            desc: "花费328元可获得3280钻石",
            costNum: 328,
            goodid: 4
        },
        {
            icon: "gold_648_png",
            goldNum: 6480,
            cost: "￥648",
            desc: "花费648元可获得6480钻石",
            costNum: 648,
            goodid: 5
        },
        {
            icon: "gold_998_png",
            goldNum: 9980,
            cost: "￥9980",
            desc: "花费998元可获得9980钻石",
            costNum: 98,
            goodid: 6
        },
        {
            icon: "gold_1998_png",
            goldNum: 19980,
            cost: "￥1998",
            desc: "花费1998元可获得19980钻石",
            costNum: 1998,
            goodid: 7
        }
    ];
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map