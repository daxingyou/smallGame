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
    ShopCfg.shopCfgs = {
        1: {
            icon: "gold_60_png",
            goldNum: 60,
            cost: "￥6",
            desc: "花费6元可获得60元宝",
            costNum: 6,
            goodid: 0
        },
        2: {
            icon: "gold_500_png",
            goldNum: 500,
            cost: "￥50",
            desc: "花费50元可获得500元宝",
            costNum: 50,
            goodid: 1
        },
        3: {
            icon: "gold_680_png",
            goldNum: 680,
            cost: "￥68",
            desc: "花费68元可获得680元宝",
            costNum: 68,
            goodid: 2
        },
        4: {
            icon: "gold_980_png",
            goldNum: 980,
            cost: "￥98",
            desc: "花费98元可获得980元宝",
            costNum: 98,
            goodid: 3
        }
    };
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map