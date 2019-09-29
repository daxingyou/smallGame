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
        _this._gold = 0;
        _this._remainBag = 10;
        return _this;
    }
    GameApp.prototype.load = function () {
        GlobalFun.getBagList();
        UpgradeCfg.ins.getLocalRoleInfo();
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        // MapView.inst().initMap(true);
        // ViewManager.inst().open(StartView)
        ViewManager.inst().open(BeginView);
        // ViewManager.inst().open(StartGameView,[{data:123}])
        var firststr = egret.localStorage.getItem(LocalStorageEnum.FIRST_ENTER);
        if (!firststr) {
            egret.localStorage.setItem(LocalStorageEnum.FIRST_ENTER, "1");
            this.gold = 1000;
        }
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_GOLD);
        if (goldstr) {
            this.gold = parseInt(goldstr);
        }
        eui.Binding.bindHandler(window, ["gold"], this.onTestGold, this);
        // egret.localStorage.clear();
    };
    GameApp.prototype.onTestGold = function (value) {
        if (value) {
            this.gold += value;
        }
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    Object.defineProperty(GameApp.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        set: function (value) {
            this._gold = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_GOLD, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "remainBag", {
        get: function () {
            return this._remainBag;
        },
        set: function (value) {
            this._remainBag = value;
            egret.localStorage.setItem(LocalStorageEnum.BAG_REMAIN, value.toString());
        },
        enumerable: true,
        configurable: true
    });
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
    GameApp.show_video = false;
    GameApp.ownDeadState = [0, 0, 0];
    GameApp.levelDeadState = [0, 0, 0];
    GameApp.phurseState = false;
    GameApp.roleDeadNum = 0;
    GameApp.enemyDeadNum = 0;
    GameApp.battleLevel = 1;
    GameApp.battleEnd = true;
    GameApp.guilding = false;
    GameApp.isLast = false;
    GameApp.curLevel = 1;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
window["gold"] = 0;
//# sourceMappingURL=GameApp.js.map