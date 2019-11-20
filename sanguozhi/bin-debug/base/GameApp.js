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
        // GlobalConfig.parserData();
        // GameMap.init(RES.getRes("map_json"));
        // LoadingUI.inst().hide();
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        LoadingUI.inst().hide();
        // MapView.inst().initMap(true);
        var chapteridstr = egret.localStorage.getItem(LocalStorageEnum.CHAPTERID);
        if (chapteridstr) {
            GameApp.chapterid = parseInt(chapteridstr);
        }
        var levelidstr = egret.localStorage.getItem(LocalStorageEnum.LEVELID);
        if (levelidstr) {
            GameApp.levelid = parseInt(levelidstr);
        }
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
        if (!goldstr) {
            GameApp.gold = 500;
        }
        else {
            GameApp.gold = parseInt(goldstr);
        }
        eui.Binding.bindHandler(GameApp, ["gold"], function () { egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD, GameApp.gold.toString()); }, this);
        //-------粮草-------
        var goodsstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOODS);
        if (!goodsstr) {
            GameApp.goods = 600;
        }
        else {
            GameApp.goods = parseInt(goodsstr);
        }
        eui.Binding.bindHandler(GameApp, ["goods"], function () { egret.localStorage.setItem(LocalStorageEnum.ROLE_GOODS, GameApp.goods.toString()); }, this);
        //-------勋章-------
        var medalstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_MEDAL);
        if (!medalstr) {
            GameApp.medal = 100;
        }
        else {
            GameApp.medal = parseInt(medalstr);
        }
        eui.Binding.bindHandler(GameApp, ["medal"], function () { egret.localStorage.setItem(LocalStorageEnum.ROLE_MEDAL, GameApp.medal.toString()); }, this);
        //--------骑兵数量=-----
        var soldier1str = egret.localStorage.getItem(LocalStorageEnum.SOLDIER1);
        if (!soldier1str) {
            GameApp.soldier1Num = 500;
        }
        else {
            GameApp.soldier1Num = parseInt(soldier1str);
        }
        eui.Binding.bindHandler(GameApp, ["soldier1Num"], function () { egret.localStorage.setItem(LocalStorageEnum.SOLDIER1, GameApp.soldier1Num.toString()); }, this);
        //--------工兵数量=-----
        var soldier2str = egret.localStorage.getItem(LocalStorageEnum.SOLDIER2);
        if (!soldier2str) {
            GameApp.soldier2Num = 500;
        }
        else {
            GameApp.soldier2Num = parseInt(soldier2str);
        }
        eui.Binding.bindHandler(GameApp, ["soldier2Num"], function () { egret.localStorage.setItem(LocalStorageEnum.SOLDIER2, GameApp.soldier2Num.toString()); }, this);
        //--------盾甲兵数量=-----
        var soldier3str = egret.localStorage.getItem(LocalStorageEnum.SOLDIER3);
        if (!soldier3str) {
            GameApp.soldier3Num = 500;
        }
        else {
            GameApp.soldier3Num = parseInt(soldier3str);
        }
        eui.Binding.bindHandler(GameApp, ["soldier3Num"], function () { egret.localStorage.setItem(LocalStorageEnum.SOLDIER3, GameApp.soldier3Num.toString()); }, this);
        //----------当前年限------
        var yearstr = egret.localStorage.getItem(LocalStorageEnum.YEAR);
        if (!yearstr) {
            GameApp.year = 1902;
        }
        else {
            GameApp.year = parseInt(yearstr);
        }
        eui.Binding.bindHandler(GameApp, ["year"], function () { egret.localStorage.setItem(LocalStorageEnum.YEAR, GameApp.year.toString()); }, this);
        //----------人物信息-------
        var roleInfo = egret.localStorage.getItem(LocalStorageEnum.ROLEINFO);
        if (!roleInfo) {
            var cityArr = [];
            for (var i = 0; i < GameApp.tolevel; i++) {
                var cityInfo = { isOnly: false, cityId: (i + 1), isOwn: false, isMain: false, timespan: 0, passLevel: 0, goodProduce: ((Math.random() * 200) >> 0), isOpen: false, name: "城市名字" };
                cityArr.push(cityInfo);
            }
            var obj = { name: "名字", citys: cityArr };
            GameApp.roleInfo = obj;
            egret.localStorage.setItem(LocalStorageEnum.ROLEINFO, JSON.stringify(GameApp.roleInfo));
        }
        else {
            GameApp.roleInfo = JSON.parse(roleInfo);
        }
        //---------卡牌信息---------
        var cardInfo = egret.localStorage.getItem(LocalStorageEnum.CARDINFO);
        if (!cardInfo) {
            GameApp.cardInfo = this.deepCopy();
        }
        else {
            GameApp.cardInfo = JSON.parse(cardInfo);
        }
        // for(let i = 0; i < CardCfg.cfgs.length; i++)
        // {
        // 	GlobalFun.refreshCardData(CardCfg.cfgs[i].insId, CardCfg.cfgs[i]);
        // }
        GlobalFun.sendToNativeLoadEnd();
        // ViewManager.inst().open(GameView);
        var enterFirststr = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        if (!enterFirststr) {
            ViewManager.inst().open(StartGameView);
        }
        else {
            ViewManager.inst().open(GameMainView);
        }
    };
    GameApp.prototype.deepCopy = function () {
        var cardcfgs = CardCfg.cfgs;
        var arr = [];
        for (var i = 0; i < cardcfgs.length; i++) {
            var obj = {};
            for (var key in cardcfgs[i]) {
                obj[key] = cardcfgs[i][key];
            }
            arr.push(obj);
        }
        return arr;
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.gold += parseInt(value);
            // UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
        }
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.qualityColor = { 1: 0x76ff39, 2: 0x3ecfff, 3: 0xbf11ff, 4: 0xffd800 };
    /**粮草 */
    GameApp.goods = 0;
    /**元宝 */
    GameApp.gold = 0;
    /**勋章值 */
    GameApp.medal = 0;
    /** 弓兵数量*/
    GameApp.soldier1Num = 200;
    /** 步兵数量*/
    GameApp.soldier2Num = 400;
    /**骑兵数量 */
    GameApp.soldier3Num = 100;
    /**当前年限 */
    GameApp.year = 0;
    /** 总关卡配置9关*/
    GameApp.tolevel = 9;
    /**关卡id */
    GameApp.chapterid = 1;
    /**小关卡 */
    GameApp.levelid = 1;
    GameApp.standW = 1334;
    GameApp.standH = 750;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
//# sourceMappingURL=GameApp.js.map