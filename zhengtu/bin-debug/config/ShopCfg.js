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
        2: {
            1: {
                icon: "60_png",
                goodNum: 60,
                cost: "￥6",
                desc: "花费6元可获得60黄金",
                costNum: 6,
                goodid: 0,
                name: "60黄金",
                shop: 1
            },
            2: {
                icon: "300_png",
                goodNum: 300,
                cost: "￥30",
                desc: "花费30元可获得300黄金",
                costNum: 30,
                goodid: 1,
                name: "300黄金",
                shop: 1
            },
            3: {
                icon: "680_png",
                goodNum: 680,
                cost: "￥68",
                desc: "花费68元可获得680黄金",
                costNum: 68,
                goodid: 2,
                name: "680黄金",
                shop: 1
            },
            4: {
                icon: "1280_png",
                goodNum: 1280,
                cost: "￥128",
                desc: "花费128元可获得1280黄金",
                costNum: 128,
                goodid: 3,
                name: "1280黄金",
                shop: 1
            },
            5: {
                icon: "3280_png",
                goodNum: 3280,
                cost: "￥328",
                desc: "花费328元可获得3280黄金",
                costNum: 328,
                goodid: 3,
                name: "3280黄金",
                shop: 1
            },
            6: {
                icon: "6480_png",
                goodNum: 6480,
                cost: "￥648",
                desc: "花费648元可获得6480黄金",
                costNum: 648,
                goodid: 3,
                name: "6480黄金",
                shop: 1
            },
            7: {
                icon: "9980_png",
                goodNum: 9980,
                cost: "￥998",
                desc: "花费998元可获得9980黄金",
                costNum: 998,
                goodid: 3,
                name: "9980黄金",
                shop: 1
            },
            8: {
                icon: "19980_png",
                goodNum: 19980,
                cost: "￥1998",
                desc: "花费1998元可获得19980黄金",
                costNum: 1998,
                goodid: 3,
                name: "19980黄金",
                shop: 1
            }
        },
        1: {
            1: {
                icon: "fe_item_icon_png",
                goodNum: 200,
                cost: 200,
                desc: "花费200黄金可获得200生铁",
                goodid: 10000,
                name: "生铁",
                shop: 2,
                buyNum: -1,
            },
            2: {
                icon: "goods_item_icon_png",
                goodNum: 200,
                cost: 200,
                desc: "花费200黄金可获得200粮草",
                goodid: 10001,
                name: "粮草",
                shop: 2,
                buyNum: -1,
            },
            3: {
                icon: "woods_item_icon_png",
                goodNum: 200,
                cost: 200,
                desc: "花费200黄金可获得200木材",
                goodid: 10002,
                name: "木材",
                shop: 2,
                buyNum: -1,
            },
            4: {
                icon: "shop_general_1_png",
                cost: 2100,
                desc: "花费2100黄金可获得吕布",
                goodid: 10003,
                name: "吕布",
                shop: 2,
                buyNum: 1,
                heroIndex: 10
            },
            5: {
                icon: "shop_general_2_png",
                cost: 1500,
                desc: "花费1500黄金可获得赵云",
                goodid: 10004,
                name: "赵云",
                shop: 2,
                buyNum: 1,
                heroIndex: 11
            },
        }
    };
    return ShopCfg;
}());
__reflect(ShopCfg.prototype, "ShopCfg");
//# sourceMappingURL=ShopCfg.js.map