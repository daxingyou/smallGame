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
        _this.preload_load_count = 0;
        /**角色元宝数 */
        _this.role_gold = 0;
        /**角色职业 */
        _this.role_job = 0;
        /**当前职称 */
        _this.levelName = "平民";
        /**当前经验值 */
        _this.curExp = 0;
        /**当前等级最大经验值 */
        _this.curLevelMaxExp = 400;
        /**当前我的总血量 */
        _this.totalHp = 0;
        /**当前关卡 */
        _this.level = 0;
        _this.TrainCfg = {
            time: 600, minExp: 2, maxExp: 4, getExpTime: 10
        };
        return _this;
    }
    GameApp.prototype.load = function () {
        var generalInfoStr = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
        if (generalInfoStr) {
            var arr = generalInfoStr.split("_");
            GameApp.ownGeneralNum = arr.length;
        }
        else {
            GameApp.ownGeneralNum = 1;
        }
        var powerstr = egret.localStorage.getItem(LocalStorageEnum.POWER);
        if (!powerstr) {
            egret.localStorage.setItem(LocalStorageEnum.POWER, "1000");
            GameApp.power = 1000;
        }
        //测试、
        // GameApp.ownGeneralNum = 4;
        // egret.localStorage.setItem(LocalStorageEnum.LEVEL,"8")
        // egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,"900000")
        //
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        GameMap.init(RES.getRes("map_json"));
        ViewManager.ins().open(StartGameView);
        var roleGoldStr = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
        // if(!roleGoldStr || parseInt(roleGoldStr) < this.enterLimit){
        // MapView.ins<MapView>().initMap();
        // EntityManager.ins<EntityManager>().init();
        // MapView.ins<MapView>().refrehMapViewPort();
        // }
        if (roleGoldStr) {
            this.gold = parseInt(roleGoldStr);
        }
        var roleJob = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        if (!roleJob) {
            this.role_job = 0;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_JOB, this.role_job.toString());
        }
        else {
            this.role_job = parseInt(roleJob);
        }
        this.totalHp = GameApp.soldierCfg[this.role_job].length * 10 * 100;
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        eui.Binding.bindHandler(GameApp, ["power"], this.powerChange, this);
        //测试元宝
        eui.Binding.bindHandler(window, ["gold"], this.onTestAddGold, this);
        eui.Binding.bindHandler(window, ["level"], this.onTestlevelChange, this);
    };
    GameApp.prototype.powerChange = function (value) {
        if (!isNaN(value)) {
            GameApp.power = value;
            egret.localStorage.setItem(LocalStorageEnum.POWER, value.toString());
        }
    };
    Object.defineProperty(GameApp.prototype, "rolePower", {
        get: function () {
            return GameApp.power;
        },
        set: function (value) {
            GameApp.power = value;
            egret.localStorage.setItem(LocalStorageEnum.POWER, value.toString());
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.onTestlevelChange = function (value) {
        egret.localStorage.setItem(LocalStorageEnum.LEVEL, value.toString());
    };
    GameApp.prototype.onTestAddGold = function (value) {
        if (value) {
            this.gold += value;
        }
    };
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            this.gold += parseInt(value);
            GameApp.pay_cbDdata = "";
            UserTips.ins().showTips("\u8D2D\u4E70\u6210\u529F,\u83B7\u5F97\u5143\u5B9Dx" + value);
            ViewManager.ins().close(ShopView);
        }
    };
    Object.defineProperty(GameApp.prototype, "gold", {
        get: function () {
            return this.role_gold;
        },
        set: function (value) {
            this.role_gold = value;
            egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM, this.role_gold.toString());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameApp.prototype, "exp", {
        get: function () {
            return this.curExp;
        },
        set: function (value) {
            this.curExp = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP, this.curExp.toString());
        },
        enumerable: true,
        configurable: true
    });
    /**执行升级以后的数据刷新 */
    GameApp.prototype.upgradeLevel = function () {
        if (this.curExp >= this.curLevelMaxExp) {
            this.curExp = this.curExp - this.curLevelMaxExp;
            this.role_job += 1;
            this.totalHp = GameApp.soldierCfg[this.role_job].length * 10 * 100;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_JOB, this.role_job.toString());
            this.levelName = GameApp.jobCfg[this.role_job];
            this.curLevelMaxExp = 400 * (this.role_job + 1);
            UserTips.ins().showTips("恭喜您!!! 成功晋升到 " + ("<font color=0x00ff00>" + this.levelName + "</font>"));
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP, this.curExp.toString());
        egret.localStorage.setItem(LocalStorageEnum.ROLE_MAIN_EXP, this.curLevelMaxExp.toString());
    };
    Object.defineProperty(GameApp.prototype, "Texp", {
        get: function () {
            return this.curLevelMaxExp;
        },
        set: function (value) {
            this.curLevelMaxExp = value;
            egret.localStorage.setItem(LocalStorageEnum.ROLE_MAIN_EXP, this.curLevelMaxExp.toString());
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    //开发阶段 。假数据保存
    GameApp.prompt = false;
    GameApp.phurseState = false;
    GameApp.power = 1000;
    GameApp.jobCfg = { 0: "平民", 1: "军士", 2: "牙门将", 3: "护军将", 4: "领军将", 5: "骠骑将", 6: "大将军" };
    GameApp.soldierCfg = { 0: [0], 1: [0], 2: [0, 1], 3: [0, 1, 2], 4: [0, 1, 2, 1], 5: [0, 1, 2, 1, 2] };
    //所拥有的将军数量
    GameApp.ownGeneralNum = 1;
    GameApp.battleState = false;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
MessageCenter.compile(GameApp);
window["gold"] = 0;
window["level"] = 1;
//# sourceMappingURL=GameApp.js.map