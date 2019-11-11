var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * @author
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        return _super.call(this) || this;
    }
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        // MapView.inst().initMap(true);
        GlobalFun.sendToNativeLoadEnd();
        var firstEnterstr = egret.localStorage.getItem(LocalStorageEnum.IS_FIRST_ENTER);
        if (firstEnterstr && firstEnterstr == "1") {
            //进入主城 游戏界面
            var goldstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
            this.gold = parseInt(goldstr);
            ViewManager.inst().open(GameMainView);
            var woodStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_WOOD);
            var goodStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOOD);
            var feStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_FE);
            this.wood = parseInt(woodStr);
            this.good = parseInt(goodStr);
            this.fe = parseInt(feStr);
        }
        else {
            ViewManager.inst().open(StartGameView);
            egret.localStorage.setItem(LocalStorageEnum.IS_FIRST_ENTER, "0");
            this.gold += 200;
            this.good += 200;
            this.wood += 200;
            this.fe += 200;
        }
        var ownSoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
        if (ownSoldierstr) {
            var soldierObj = JSON.parse(ownSoldierstr);
            if (soldierObj[SoldierType.ARROW]) {
                GameApp.m_soldier0_num = soldierObj[SoldierType.ARROW];
            }
            if (soldierObj[SoldierType.QI]) {
                GameApp.m_soldier1_num = soldierObj[SoldierType.QI];
            }
            if (soldierObj[SoldierType.SHIELD]) {
                GameApp.m_soldier2_num = soldierObj[SoldierType.SHIELD];
            }
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS, JSON.stringify({ 0: 0, 1: 0, 2: 0 }));
        }
        var ownProductSoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
        if (ownProductSoldierstr) {
            var productObj = JSON.parse(ownProductSoldierstr);
            if (productObj[SoldierType.ARROW]) {
                GameApp.m_product_0 = productObj[SoldierType.ARROW];
            }
            if (productObj[SoldierType.QI]) {
                GameApp.m_product_1 = productObj[SoldierType.QI];
            }
            if (productObj[SoldierType.SHIELD]) {
                GameApp.m_product_2 = productObj[SoldierType.SHIELD];
            }
        }
        else {
            egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS, JSON.stringify({ 0: 0, 1: 0, 2: 0 }));
        }
        eui.Binding.bindHandler(window, ["gold"], this.onTestGoldChange, this);
    };
    GameApp.prototype.onTestGoldChange = function (value) {
        this.gold += value;
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            UserTips.inst().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u9EC4\u91D1x" + value);
        }
    };
    Object.defineProperty(GameApp.prototype, "gold", {
        get: function () {
            return GameApp.m_gold;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_gold = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "fe", {
        get: function () {
            return GameApp.m_fe;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_fe = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_FE, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "wood", {
        get: function () {
            return GameApp.m_wood;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_wood = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_WOOD, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "good", {
        get: function () {
            return GameApp.m_good;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_good = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GOOD, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "soldier_0", {
        get: function () {
            return GameApp.m_soldier0_num;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_soldier0_num = value;
            var ownsoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
            var obj = JSON.parse(ownsoldierstr);
            obj[0] = value;
            egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS, JSON.stringify(obj));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "soldier_1", {
        get: function () {
            return GameApp.m_soldier1_num;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_soldier1_num = value;
            var ownsoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
            var obj = JSON.parse(ownsoldierstr);
            obj[1] = value;
            egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS, JSON.stringify(obj));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "soldier_2", {
        get: function () {
            return GameApp.m_soldier2_num;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_soldier2_num = value;
            var ownsoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNSOLDIERS);
            var obj = JSON.parse(ownsoldierstr);
            obj[2] = value;
            egret.localStorage.setItem(LocalStorageEnum.OWNSOLDIERS, JSON.stringify(obj));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "product_0", {
        get: function () {
            return GameApp.m_product_0;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_product_0 = value;
            var ownsoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
            var obj = JSON.parse(ownsoldierstr);
            obj[0] = value;
            egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS, JSON.stringify(obj));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "product_1", {
        get: function () {
            return GameApp.m_product_1;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_product_1 = value;
            var ownsoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
            var obj = JSON.parse(ownsoldierstr);
            obj[1] = value;
            egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS, JSON.stringify(obj));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "product_2", {
        get: function () {
            return GameApp.m_product_2;
        },
        set: function (value) {
            if (value <= 0) {
                value = 0;
            }
            GameApp.m_product_2 = value;
            var ownsoldierstr = egret.localStorage.getItem(LocalStorageEnum.OWNPRODUCTSOLDIERS);
            var obj = JSON.parse(ownsoldierstr);
            obj[2] = value;
            egret.localStorage.setItem(LocalStorageEnum.OWNPRODUCTSOLDIERS, JSON.stringify(obj));
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.guilding = false;
    GameApp.buildStep = 1;
    GameApp.nextStepId = "";
    GameApp.waitStepId = "";
    /**人物黄金数量 */
    GameApp.m_gold = 0;
    /**人物生铁数量 */
    GameApp.m_fe = 0;
    /**人物木材数量 */
    GameApp.m_wood = 0;
    /**人物粮草数量 */
    GameApp.m_good = 0;
    /**当前弓兵的数量 */
    GameApp.m_soldier0_num = 0;
    /**当前骑兵数量 */
    GameApp.m_soldier1_num = 0;
    /**当前盾甲兵数量 */
    GameApp.m_soldier2_num = 0;
    /**当前弓兵正在生产的数量 */
    GameApp.m_product_0 = 0;
    /**当前骑兵正在生产的数量 */
    GameApp.m_product_1 = 0;
    /**当前盾甲兵正在生产的数量 */
    GameApp.m_product_2 = 0;
    GameApp.battleEnd = true;
    GameApp.tpxGetState = true;
    GameApp.curBattleLevel = 0;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
window["gold"] = 0;
//# sourceMappingURL=GameApp.js.map