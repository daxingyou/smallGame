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
        _this.lockGold = 500;
        return _this;
    }
    StartGameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = LevelItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        var dataArr = [];
        for (var i = 1; i <= 10; i++) {
            var obj = {};
            dataArr.push(obj);
        }
        this.arrayCollect.source = dataArr;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    StartGameView.prototype.onItemTap = function (evt) {
        var _this = this;
        var item = this.list.getChildAt(evt.itemIndex);
        this.curLevel = evt.itemIndex;
        if (item.lockState) {
            //当前是锁定状态、
            ViewManager.inst().open(LockPopUp, [{ cost: StoryCfg.cfg[this.curLevel].lockcoin, cb: function () {
                        item.lock();
                    }, arg: this }]);
        }
        else {
            //不是锁定状态 可以游戏
            var desc = StoryCfg.cfg[this.curLevel].des;
            var score = StoryCfg.cfg[this.curLevel].score;
            ViewManager.inst().open(StartGamePop, [{ desc: desc, score: score, cb: function () {
                        ViewManager.inst().open(GameMainView, [{ level: _this.curLevel }]);
                    }, arg: this }]);
        }
    };
    StartGameView.prototype.close = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return StartGameView;
}(BaseEuiView));
__reflect(StartGameView.prototype, "StartGameView");
ViewManager.inst().reg(StartGameView, LayerManager.UI_Main);
//# sourceMappingURL=StartGameView.js.map