var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 商城配置
 */
var ShopCfg = (function () {
    function ShopCfg() {
    }
    ShopCfg.shopCfgs = {
        0: [
            {
                itemid: 1001,
                icon: "item_1_png",
                goldNum: 500,
                cost: "500",
                name: "泣血之刃",
                costNum: 500,
                goodid: 0,
                desc: "+30%吸血"
            },
            {
                itemid: 1002,
                icon: "item_2_png",
                goldNum: 500,
                cost: "500",
                name: "王者之风",
                costNum: 500,
                goodid: 0,
                desc: "+50%防御"
            },
            {
                itemid: 1003,
                icon: "item_3_png",
                goldNum: 500,
                cost: "500",
                name: "破军之力",
                costNum: 500,
                goodid: 0,
                desc: "+100攻击力"
            },
            {
                itemid: 1004,
                icon: "item_4_png",
                goldNum: 500,
                cost: "500",
                name: "无尽战刃",
                costNum: 500,
                goodid: 0,
                desc: "+100%暴击"
            },
        ],
        1: [
            {
                icon: "gold_6_png",
                goldNum: 60,
                cost: "￥6",
                name: "60元宝",
                costNum: 6,
                goodid: 0,
                desc: ""
            },
            {
                icon: "gold_30_png",
                goldNum: 300,
                cost: "￥30",
                name: "300元宝",
                costNum: 30,
                goodid: 1,
                desc: ""
            },
            {
                icon: "gold_68_png",
                goldNum: 680,
                cost: "￥68",
                name: "680元宝",
                costNum: 68,
                goodid: 2,
                desc: ""
            },
            {
                icon: "gold_128_png",
                goldNum: 1280,
                cost: "￥128",
                name: "1280元宝",
                costNum: 128,
                goodid: 3,
                desc: ""
            },
            {
                icon: "gold_328_png",
                goldNum: 3280,
                cost: "￥328",
                name: "3280元宝",
                costNum: 328,
                goodid: 4,
                desc: ""
            },
            {
                icon: "gold_648_png",
                goldNum: 6480,
                cost: "￥648",
                name: "6480元宝",
                costNum: 648,
                goodid: 5,
                desc: ""
            }
        ]
    };
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map