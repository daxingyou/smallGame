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
var GameMainView = (function (_super) {
    __extends(GameMainView, _super);
    function GameMainView() {
        var _this = _super.call(this) || this;
        _this.chap = [];
        _this.succChap = [];
        _this.curMark = 0;
        return _this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = CardItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        var sheet = RES.getRes("res");
        var bg = new game.BackgroundView(this.playgroup, sheet);
        this.playgroup.addChild(bg);
        var tile = new game.TileView(this.playgroup, sheet);
        this.playgroup.addChild(tile);
        var result = new game.ResultView(this.playgroup, sheet);
        this.playgroup.addChild(result);
        game.GameData.getInstance().newGame();
        var level = param[0].level;
        GameApp.level = level;
        this.levelCfg = StoryCfg.cfg[level];
        this.tarScoreLab.text = this.levelCfg.score;
        this.curScoreLab.text = "0";
        var dataArr = [];
        for (var i = 0; i < 12; i++) {
            var obj = {};
            dataArr.push(obj);
        }
        this.guideGroup.visible = false;
        var storystr = egret.localStorage.getItem("story_" + level);
        if (!storystr) {
            egret.localStorage.setItem("story_" + level, "1");
            this.guideGroup.visible = true;
            this.chap = this.levelCfg.chap;
            this.succChap = this.levelCfg.succhap;
            this.showChap();
        }
        this.arrayCollect.source = dataArr;
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.guideGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showChap, this);
        MessageManager.inst().addListener("reset", this.onReset, this);
        MessageManager.inst().addListener("refresh", this.onRefresh, this);
        MessageManager.inst().addListener("gameEndReset", this.onGameEndReset, this);
        MessageManager.inst().addListener("gameEndExit", this.onGameEndExit, this);
    };
    GameMainView.prototype.onGameEndReset = function () {
        game.GameData.getInstance().newGame();
    };
    GameMainView.prototype.onGameEndExit = function () {
        GameApp.level = null;
        ViewManager.inst().close(GameMainView);
    };
    GameMainView.prototype.onReset = function () {
        this.curScoreLab.text = "0";
    };
    GameMainView.prototype.onRefresh = function (evt) {
        this.curScoreLab.text = evt.data.score;
        if (parseInt(evt.data.score) >= parseInt(this.tarScoreLab.text)) {
            //游戏胜利
            var passLevelstr = egret.localStorage.getItem("pass_" + GameApp.level);
            if (!passLevelstr) {
                egret.localStorage.setItem("pass_" + GameApp.level, "1");
                GameApp.gold += parseInt(this.levelCfg.reward);
                UserTips.inst().showTips("获得金币x" + this.levelCfg.reward);
                this.guideGroup.visible = true;
                this.curMark = 1;
                this.showChap();
            }
        }
    };
    GameMainView.prototype.showChap = function () {
        if (this.curMark == 0) {
            //战斗前的对话
            if (!this.chap.length) {
                this.guideGroup.visible = false;
                return;
            }
            var itemWordobj = this.chap.shift();
            this.ownIcon.visible = (itemWordobj.person == "我");
            this.nameLab.text = itemWordobj.person ? itemWordobj.person + ":" : "";
            this.wordLab.text = itemWordobj.content;
        }
        else {
            //胜利后的对话
            if (!this.succChap.length) {
                ViewManager.inst().close(GameMainView);
                return;
            }
            else {
                var itemWordobj = this.succChap.shift();
                this.ownIcon.visible = (itemWordobj.person == "我");
                this.nameLab.text = itemWordobj.person ? itemWordobj.person + ":" : "";
                this.wordLab.text = itemWordobj.content;
            }
        }
    };
    GameMainView.prototype.onReturn = function () {
        ViewManager.inst().close(GameMainView);
    };
    GameMainView.prototype.close = function () {
        MessageManager.inst().removeListener("reset", this.onReset, this);
        MessageManager.inst().removeListener("refresh", this.onRefresh, this);
        MessageManager.inst().removeListener("gameEndReset", this.onGameEndReset, this);
        MessageManager.inst().removeListener("gameEndExit", this.onGameEndExit, this);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.guideGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showChap, this);
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map