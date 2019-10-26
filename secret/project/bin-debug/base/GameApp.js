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
        var _this = _super.call(this) || this;
        _this.start = false;
        return _this;
    }
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        // GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        // MapView.inst().initMap(true);
        var levestr = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
        if (!levestr) {
            GameApp.level = 1;
        }
        else {
            GameApp.level = parseInt(levestr);
        }
        eui.Binding.bindHandler(GameApp, ["level"], this.levelChange, this);
        var womanLevelstr = egret.localStorage.getItem(LocalStorageEnum.WOMANLEVEL);
        if (!womanLevelstr) {
            GameApp.womanLevel = 1;
        }
        else {
            GameApp.womanLevel = parseInt(womanLevelstr);
        }
        eui.Binding.bindHandler(GameApp, ["womanLevel"], this.womanlevelChange, this);
        var gemstr = egret.localStorage.getItem(LocalStorageEnum.GEM_NUM);
        if (!gemstr) {
            GameApp.gem = 2;
        }
        else {
            GameApp.gem = parseInt(gemstr);
        }
        eui.Binding.bindHandler(GameApp, ["gem"], this.onGemChange, this);
        var healthstr = egret.localStorage.getItem(LocalStorageEnum.HEALTH);
        if (!healthstr) {
            GameApp.health = 5;
        }
        else {
            GameApp.health = parseInt(healthstr);
        }
        eui.Binding.bindHandler(GameApp, ["health"], this.onHealthChange, this);
        var passGatherstr = egret.localStorage.getItem(LocalStorageEnum.PASS);
        if (!passGatherstr) {
            egret.localStorage.setItem(LocalStorageEnum.PASS, JSON.stringify({ 1: {}, 2: {} }));
        }
        ViewManager.inst().open(StartGameView);
        GlobalFun.sendToNativeLoadEnd();
    };
    GameApp.prototype.startRecover = function () {
        if (this.start) {
            return;
        }
        this.start = true;
        this.interInval = setInterval(function () {
            GameApp.time += 1;
            if (GameApp.time >= 10 * 60) {
                GameApp.time = 0;
                GameApp.health += 1;
            }
        }, 1000);
    };
    GameApp.prototype.stopRecover = function () {
        this.start = false;
        clearInterval(this.interInval);
        GameApp.time = 0;
    };
    GameApp.prototype.levelChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.LEVEL, GameApp.level.toString());
    };
    GameApp.prototype.womanlevelChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.WOMANLEVEL, GameApp.womanLevel.toString());
    };
    GameApp.prototype.onGemChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.GEM_NUM, GameApp.gem.toString());
    };
    GameApp.prototype.onHealthChange = function () {
        egret.localStorage.setItem(LocalStorageEnum.HEALTH, GameApp.health.toString());
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            GameApp.gem += parseInt(value);
            UserTips.inst().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u94BB\u77F3x" + value);
        }
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.level = 1;
    GameApp.gem = 2;
    GameApp.health = 18;
    GameApp.progress = 1;
    GameApp.womanLevel = 1;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
//# sourceMappingURL=GameApp.js.map