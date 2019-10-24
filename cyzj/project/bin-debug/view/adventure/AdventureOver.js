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
var AdventureOver = (function (_super) {
    __extends(AdventureOver, _super);
    function AdventureOver() {
        return _super.call(this) || this;
    }
    AdventureOver.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.btn, this.touchTap);
    };
    AdventureOver.prototype.close = function () {
    };
    AdventureOver.prototype.init = function () {
        this.list.itemRenderer = AdventureOverItem;
        this.list.dataProvider = new eui.ArrayCollection(GameConfig.adventure);
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
    };
    AdventureOver.prototype.touchTap = function () {
        MessageManager.inst().dispatch("ADVENTURE_OVER");
        for (var i = 0; i < GameConfig.adventure.length; i++) {
            GameConfig.adventure[i].num = 0;
        }
        ViewManager.inst().close(AdventureOver);
        ViewManager.inst().close(AdventureView);
        ViewManager.inst().open(GameMainView);
    };
    return AdventureOver;
}(BaseEuiView));
__reflect(AdventureOver.prototype, "AdventureOver");
ViewManager.inst().reg(AdventureOver, LayerManager.UI_Pop);
//# sourceMappingURL=AdventureOver.js.map