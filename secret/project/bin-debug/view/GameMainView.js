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
        return _super.call(this) || this;
    }
    GameMainView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.healthWatcher = eui.Binding.bindHandler(GameApp, ["health"], this.healthChange, this);
        this.gemWatcher = eui.Binding.bindProperty(GameApp, ["gem"], this.gemNumLab, "text");
        this.timeWatcher = eui.Binding.bindHandler(GameApp, ["time"], this.timeChange, this);
        var curChapter = GlobalConfig.ChapterCfg[GameApp.progress];
        this.list.itemRenderer = StoryItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        this.arrayCollect.source = curChapter;
        this.levelLab.text = "等级:" + (GameApp.progress == 1 ? GameApp.level : GameApp.womanLevel);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.addTouchEvent(this.addBtn, this.onOpenShop, true);
        var tileLayout = new eui.TileLayout();
        // <e:TileLayout ="contentJustify" rowAlign="justifyUsingGap" columnAlign="left" horizontalGap="0"/>
        tileLayout.horizontalAlign = "contentJustify";
        tileLayout.rowAlign = "justifyUsingGap";
        tileLayout.columnAlign = "justifyUsingGap";
        tileLayout.requestedColumnCount = 3;
        if (document.documentElement.clientWidth <= 414) {
            tileLayout.requestedColumnCount = 2;
        }
        this.list.layout = tileLayout;
    };
    GameMainView.prototype.onOpenShop = function () {
        ViewManager.inst().open(ShopPop);
    };
    GameMainView.prototype.timeChange = function () {
        if (GameApp.time <= 0) {
            this.countTimeLab.visible = false;
        }
        else {
            this.countTimeLab.visible = true;
            this.countTimeLab.text = "(" + DateUtils.getFormatBySecond(10 * 60 - GameApp.time, DateUtils.TIME_FORMAT_3) + "\u540E+1)";
        }
    };
    GameMainView.prototype.healthChange = function () {
        this.healtNumLab.text = GameApp.health.toString();
        if (GameApp.health >= 25) {
            GameApp.inst().stopRecover();
        }
        else {
            GameApp.inst().startRecover();
        }
    };
    GameMainView.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        if (item.ifLock) {
            UserTips.inst().showTips("请先通关上一个关卡");
            return;
        }
        ViewManager.inst().open(StoryView, [{ data: evt.item }]);
        // ViewManager.inst().close(GameMainView);
    };
    GameMainView.prototype.onReturn = function () {
        var view = ViewManager.inst().getView(ShopPop);
        var storyView = ViewManager.inst().getView(StoryView);
        if (view) {
            ViewManager.inst().close(ShopPop);
        }
        else if (storyView) {
            ViewManager.inst().close(StoryView);
        }
        else {
            ViewManager.inst().close(GameMainView);
        }
    };
    GameMainView.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        if (this.healthWatcher) {
            this.healthWatcher.unwatch();
        }
        if (this.gemWatcher) {
            this.gemWatcher.unwatch();
        }
        if (this.timeWatcher) {
            this.timeWatcher.unwatch();
        }
        this.removeTouchEvent(this.addBtn, this.onOpenShop);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return GameMainView;
}(BaseEuiView));
__reflect(GameMainView.prototype, "GameMainView");
ViewManager.inst().reg(GameMainView, LayerManager.UI_Main);
//# sourceMappingURL=GameMainView.js.map