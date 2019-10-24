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
    /**已经拥有的卡牌列表 */ ;
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        // GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        // MapView.inst().initMap(true);
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
        if (!goldstr) {
            GameApp.gold = 1000;
        }
        else {
            GameApp.gold = parseInt(goldstr);
        }
        eui.Binding.bindHandler(GameApp, ["gold"], this.onGoldChange, this);
        var medalstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_MEDAL);
        if (!medalstr) {
            GameApp.medal = 0;
        }
        else {
            GameApp.medal = parseInt(medalstr);
        }
        eui.Binding.bindHandler(GameApp, ["medal"], this.onMedalChange, this);
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_LEVEL);
        if (!levelstr) {
            GameApp.level = 1;
        }
        else {
            GameApp.level = parseInt(levelstr);
        }
        eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        var expstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
        if (!expstr) {
            GameApp.exp = 0;
        }
        else {
            GameApp.exp = parseInt(expstr);
        }
        eui.Binding.bindHandler(GameApp, ["exp"], this.onExpChange, this);
        var cfgs = [];
        for (var key in hszz.CardConfig.cfgs) {
            if (hszz.CardConfig.cfgs[key].cardType != 1) {
                GameApp.allCards.push(hszz.CardConfig.cfgs[key]);
            }
        }
        var lockstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_OWNER_CARDIDS);
        if (!lockstr) {
            cfgs = hszz.CardConfig.cfgs;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_OWNER_CARDIDS, JSON.stringify(cfgs));
        }
        else {
            cfgs = JSON.parse(lockstr);
        }
        var arr = [];
        var unlockArr = [];
        for (var key in cfgs) {
            if (cfgs[key].ifUnlock) {
                arr.push(cfgs[key]);
            }
            else {
                unlockArr.push(cfgs[key]);
            }
        }
        GameApp.unlocks = unlockArr;
        GameApp.locks = arr;
        ViewManager.inst().open(GameMainView);
        // ViewManager.inst().open(BattleView);
    };
    GameApp.prototype.onGoldChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD, GameApp.gold.toString());
    };
    GameApp.prototype.onMedalChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_MEDAL, GameApp.medal.toString());
    };
    GameApp.prototype.onLevelChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_LEVEL, GameApp.level.toString());
    };
    GameApp.prototype.onExpChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP, GameApp.exp.toString());
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            UserTips.inst().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u5143\u5B9Dx" + value);
        }
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    /**金币 */
    GameApp.gold = 0;
    /**勋章 */
    GameApp.medal = 0;
    /**等级 */
    GameApp.level = 0;
    /**当前经验 */
    GameApp.exp = 0;
    /**未拥有的卡牌列表 */
    GameApp.unlocks = [];
    GameApp.locks = [];
    /**所有的卡牌列表 */
    GameApp.allCards = [];
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
//# sourceMappingURL=GameApp.js.map