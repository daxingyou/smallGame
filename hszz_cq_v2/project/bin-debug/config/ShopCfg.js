var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商城配置
 */
var ShopCfg = (function () {
    function ShopCfg() {
    }
    ShopCfg.cardAny = [];
    ShopCfg.cardData = [];
    ShopCfg.shopFirst = true;
    ShopCfg.shopFirst_open = null;
    ShopCfg.shopFirst_close = null;
    ShopCfg.shopCardAny = [
        { id: 1, num: 0 },
        { id: 2, num: 0 },
        { id: 3, num: 0 },
        { id: 4, num: 0 },
        { id: 5, num: 0 },
        { id: 6, num: 0 },
        { id: 7, num: 0 },
        { id: 8, num: 0 },
        { id: 9, num: 0 },
        { id: 10, num: 0 },
        { id: 11, num: 0 },
        { id: 12, num: 0 },
        { id: 13, num: 0 },
        { id: 14, num: 0 },
        { id: 15, num: 0 },
        { id: 16, num: 0 },
    ];
    ShopCfg.shopCfgs = [
        {
            icon: "gold_6_png",
            goldNum: 60,
            cost: "￥6",
            desc: "花费6元可获得60元宝",
            costNum: 6,
            goodid: 0
        },
        {
            icon: "gold_30_png",
            goldNum: 300,
            cost: "￥30",
            desc: "花费30元可获得300元宝",
            costNum: 30,
            goodid: 1
        },
        {
            icon: "gold_68_png",
            goldNum: 680,
            cost: "￥68",
            desc: "花费68元可获得680元宝",
            costNum: 68,
            goodid: 2
        },
        {
            icon: "gold_128_png",
            goldNum: 1280,
            cost: "￥128",
            desc: "花费128元可获得1280元宝",
            costNum: 128,
            goodid: 3
        },
        {
            icon: "gold_328_png",
            goldNum: 3280,
            cost: "￥328",
            desc: "花费328元可获得3280元宝",
            costNum: 328,
            goodid: 4
        },
        {
            icon: "gold_648_png",
            goldNum: 6480,
            cost: "￥648",
            desc: "花费648元可获得6480元宝",
            costNum: 648,
            goodid: 5
        }
        // ,
        // {
        // 	icon:"gold_998_png",
        // 	goldNum:9980,
        // 	cost:"￥998",
        // 	desc:"花费998元可获得9980元宝",
        // 	costNum:998,
        // 	goodid:6
        // },
        // {
        // 	icon:"gold_1998_png",
        // 	goldNum:19980,
        // 	cost:"￥1998",
        // 	desc:"花费1998元可获得19980元宝",
        // 	costNum:1998,
        // 	goodid:7
        // }
    ];
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map