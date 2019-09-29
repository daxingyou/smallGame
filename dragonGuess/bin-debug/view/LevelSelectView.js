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
var LevelSelectView = (function (_super) {
    __extends(LevelSelectView, _super);
    function LevelSelectView() {
        var _this = _super.call(this) || this;
        _this.levelIconCfg = {};
        _this._level = 0;
        return _this;
    }
    LevelSelectView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.showClose(LevelSelectView);
        this.param = param;
        this.levelIconCfg = { 1: 3, 2: 5, 3: 7 };
        var dataPro = [];
        var level = param[0].level;
        this._level = level;
        var num = this.levelIconCfg[level];
        // levelCfg_1 ---  {levelCfg:[1_1_0,1_2_0]} 大关_小关_是否通关
        var levelCfgStr = egret.localStorage.getItem('levelCfg' + param[0].level);
        var levelCfgObj;
        if (levelCfgStr) {
            levelCfgObj = JSON.parse(levelCfgStr).levelCfg;
            levelCfgObj.forEach(function (item, index) {
                var arr = item.split("_");
                var obj = {};
                obj["img"] = "lev_icon_" + arr[1] + "_png";
                obj["start"] = arr[2];
                dataPro.push(obj);
            }, this);
        }
        else {
            //没有本地存储值
            var levelCfgs = [];
            for (var i = 0; i < num; i++) {
                var obj = {};
                obj["img"] = "lev_icon_" + (i + 1) + "_png";
                var str = level + "_" + (i + 1) + "_" + (level == 1 ? (i == 0 ? 1 : 0) : 0);
                levelCfgs.push(str);
                obj["start"] = (level == 1 ? (i == 0 ? 1 : 0) : 0);
                dataPro.push(obj);
            }
            egret.localStorage.setItem('levelCfg' + param[0].level, JSON.stringify({ levelCfg: levelCfgs }));
        }
        this.title.text = param[0].title;
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = LevelSelectItem;
        this.arrayCollect.source = dataPro;
        this.list.dataProvider = this.arrayCollect;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    LevelSelectView.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        if (item.isClick) {
            ViewManager.ins().open(PlayFunView, [{ level: this._level, index: item.itemIndex, fbName: this.title.text }], true);
        }
    };
    /**刷新页面 */
    LevelSelectView.prototype.refreshPage = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!param || (param && param.length == 0)) {
            param = this.param;
        }
        var dataPro = [];
        var level = GameData.level;
        this._level = level;
        var num = this.levelIconCfg[level];
        // levelCfg_1 ---  {levelCfg:[1_1_0,1_2_0]} 大关_小关_是否通关
        var levelCfgStr = egret.localStorage.getItem('levelCfg' + this._level);
        var levelCfgObj;
        if (levelCfgStr) {
            levelCfgObj = JSON.parse(levelCfgStr).levelCfg;
            levelCfgObj.forEach(function (item, index) {
                var arr = item.split("_");
                var obj = {};
                obj["img"] = "lev_icon_" + arr[1] + "_png";
                obj["start"] = arr[2];
                dataPro.push(obj);
            }, this);
        }
        else {
            //没有本地存储值
            var levelCfgs = [];
            for (var i = 0; i < num; i++) {
                var obj = {};
                obj["img"] = "lev_icon_" + (i + 1) + "_png";
                var str = level + "_" + (i + 1) + "_" + (level == 1 ? (i == 0 ? 1 : 0) : 0);
                levelCfgs.push(str);
                obj["start"] = (level == 1 ? (i == 0 ? 1 : 0) : 0);
                dataPro.push(obj);
            }
            egret.localStorage.setItem('levelCfg' + this._level, JSON.stringify({ levelCfg: levelCfgs }));
        }
        this.title.text = param[0].title;
        this.arrayCollect.source = dataPro;
        this.list.dataProviderRefreshed();
    };
    LevelSelectView.prototype.close = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return LevelSelectView;
}(BaseEuiView));
__reflect(LevelSelectView.prototype, "LevelSelectView");
ViewManager.ins().reg(LevelSelectView, LayerManager.UI_Main);
//# sourceMappingURL=LevelSelectView.js.map