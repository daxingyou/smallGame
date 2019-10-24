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
    // public static roleLevel:number = 0;
    // public static roleExp:number = 0;
    function GameApp() {
        return _super.call(this) || this;
    }
    GameApp.prototype.load = function () {
        eui.Label.default_fontFamily = "Microsoft YaHei";
        GlobalConfig.parserData();
        GameMap.init(RES.getRes("map_json"));
        LoadingUI.inst().hide();
        eui.Binding.bindHandler(GameApp, ["pay_cbDdata"], this.onDataCallBack, this);
        // ViewManager.inst().open(StartGameView);
        ViewManager.inst().open(StartGameView);
        // MapView.inst().initMap(true);
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
        eui.Binding.bindHandler(GameApp, ["roleGold"], this.goldChange, this);
        if (goldstr) {
            GameApp.roleGold = parseInt(goldstr);
        }
        else {
            GameApp.roleGold = 2000;
        }
        eui.Binding.bindHandler(GameApp, ["roleDataIndex"], this.roleDataIndexChange, this);
        var roleIndexstr = egret.localStorage.getItem(LocalStorageEnum.ROLE_INDEX);
        if (roleIndexstr) {
            GameApp.roleDataIndex = parseInt(roleIndexstr);
        }
        else {
            GameApp.roleDataIndex = 0;
        }
        // eui.Binding.bindHandler(GameApp,["roleLevel"],this.roleLevelChange,this);
        // let roleLevelstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_LEVEL);
        // if(roleLevelstr && parseInt(roleLevelstr)){
        // 	GameApp.roleLevel = parseInt(roleLevelstr);
        // }else{
        // 	GameApp.roleLevel = 1;
        // }
        // eui.Binding.bindHandler(GameApp,["roleExp"],this.expChange,this);
        // let roleExpstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
        // if(roleExpstr){
        // 	GameApp.roleExp = parseInt(roleExpstr);
        // }else{
        // 	GameApp.roleExp =0;
        // }
    };
    GameApp.prototype.expChange = function (value) {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_EXP, value.toString());
    };
    GameApp.prototype.roleLevelChange = function (value) {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_LEVEL, value.toString());
    };
    GameApp.prototype.goldChange = function (value) {
        egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM, value.toString());
    };
    GameApp.prototype.roleDataIndexChange = function (value) {
        egret.localStorage.setItem(LocalStorageEnum.ROLE_INDEX, value.toString());
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    Object.defineProperty(GameApp, "roleData", {
        /**获取人物数据 */
        get: function () {
            return JSON.parse(egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA));
        },
        enumerable: true,
        configurable: true
    });
    GameApp.prototype.onDataCallBack = function (value) {
        if (value) {
            GameApp.phurseState = false;
            GameApp.pay_cbDdata = "";
            GameApp.roleGold += parseInt(value);
            // UserTips.inst().showTips(`购买成功,获得元宝x${value}`);
        }
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.roleGold = 0;
    GameApp.roleDataIndex = 0;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
//# sourceMappingURL=GameApp.js.map