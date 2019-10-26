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
var StartGameView = (function (_super) {
    __extends(StartGameView, _super);
    function StartGameView() {
        var _this = _super.call(this) || this;
        _this.levels = [2, 4, 6, 8, 10, 12];
        return _this;
    }
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.watcher = eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
    };
    StartGameView.prototype.onLevelChange = function () {
        this.openLab.visible = (GameApp.level < 10);
        var level = (GameApp.level / 2) >> 0;
        var nextOpenLevel;
        var index = 0;
        for (var i = 0; i < this.levels.length; i++) {
            if (GameApp.level < this.levels[i]) {
                nextOpenLevel = this.levels[i];
                index = i + 1;
                break;
            }
        }
        if (nextOpenLevel) {
            this.unlockLab.text = "\u8FD8\u5DEE" + (nextOpenLevel - GameApp.level) + "\u5173,\u89E3\u9501" + (index + 1) + "\u7EA7\u6E23\u7537";
        }
        else {
            this.unlockLab.visible = false;
        }
        this.levelPage.source = "page_show_" + (level + 1) + "_jpg";
    };
    StartGameView.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.womanGroup:
                GameApp.progress = 2;
                if (GameApp.level < 10) {
                    UserTips.inst().showTips("请先玩男友版升到10级,才开放哦");
                    return;
                }
                ViewManager.inst().open(GameMainView, [{ state: 2 }]);
                break;
            case this.manBtn:
                GameApp.progress = 1;
                ViewManager.inst().open(GameMainView, [{ state: 1 }]);
                break;
        }
    };
    StartGameView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this.watcher) {
            this.watcher.unwatch();
        }
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map