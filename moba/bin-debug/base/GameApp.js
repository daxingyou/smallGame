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
        LoadingUI.inst().hide();
        var goldstr = egret.localStorage.getItem(LocalStorageEnum.Role_gold);
        if (!goldstr) {
            GameApp.gold = 1000;
        }
        else {
            GameApp.gold = parseInt(goldstr);
        }
        eui.Binding.bindHandler(GameApp, ["gold"], function (value) { egret.localStorage.setItem(LocalStorageEnum.Role_gold, GameApp.gold.toString()); }, this);
        var levelstr = egret.localStorage.getItem(LocalStorageEnum.Role_level);
        if (!levelstr) {
            GameApp.level = 1;
        }
        else {
            GameApp.level = parseInt(levelstr);
        }
        eui.Binding.bindHandler(GameApp, ["level"], function (value) { egret.localStorage.setItem(LocalStorageEnum.Role_level, GameApp.level.toString()); }, this);
        var expstr = egret.localStorage.getItem(LocalStorageEnum.Role_exp);
        if (!expstr) {
            GameApp.exp = 0;
        }
        else {
            GameApp.exp = parseInt(expstr);
        }
        eui.Binding.bindHandler(GameApp, ["exp"], function (value) { egret.localStorage.setItem(LocalStorageEnum.Role_exp, GameApp.exp.toString()); }, this);
        var skillLevelstr = egret.localStorage.getItem(LocalStorageEnum.Skill_Level);
        if (!skillLevelstr) {
            GameApp.skillLevel = { 101: 0, 102: 0, 103: 0, 104: 0 };
            egret.localStorage.setItem(LocalStorageEnum.Skill_Level, JSON.stringify(GameApp.skillLevel));
        }
        else {
            GameApp.skillLevel = JSON.parse(skillLevelstr);
        }
        var equipidstr = egret.localStorage.getItem(LocalStorageEnum.Role_equip);
        if (!equipidstr) {
            GameApp.equipIds = [];
            egret.localStorage.setItem(LocalStorageEnum.Role_equip, JSON.stringify([]));
        }
        else {
            GameApp.equipIds = JSON.parse(equipidstr);
        }
        recharge.sendToNativeLoadEnd();
        ViewManager.inst().open(StartGameView);
    };
    GameApp.inst = function () {
        var _inst = this.single();
        return _inst;
    };
    GameApp.prototype.postPerLoadProgress = function (itemsLoaded, itemsTotal) {
        return [itemsLoaded, itemsTotal];
    };
    GameApp.phurseState = false;
    GameApp.gameEnd = true;
    GameApp.chapterLevel = 1;
    GameApp.selectIndex = 0;
    return GameApp;
}(BaseClass));
__reflect(GameApp.prototype, "GameApp");
//# sourceMappingURL=GameApp.js.map