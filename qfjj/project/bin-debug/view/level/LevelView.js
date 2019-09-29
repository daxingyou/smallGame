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
var LevelView = (function (_super) {
    __extends(LevelView, _super);
    function LevelView() {
        return _super.call(this) || this;
    }
    LevelView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.selectGroup.scaleX = this.selectGroup.scaleY = 0;
        egret.Tween.get(this.selectGroup).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.selectGroup);
        }, this);
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    LevelView.prototype.onTouchTap = function (evt) {
        var _this = this;
        egret.Tween.get(this.selectGroup).to({ scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.selectGroup);
            ViewManager.inst().close(LevelView);
        }, this);
    };
    LevelView.prototype.init = function () {
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.list.itemRenderer = LevelItem;
        this.list.dataProvider = new eui.ArrayCollection(LevelCfg.levelCfgs[LevelCfg.chapter - 1].gq);
    };
    LevelView.prototype.close = function () {
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return LevelView;
}(BaseEuiView));
__reflect(LevelView.prototype, "LevelView");
ViewManager.inst().reg(LevelView, LayerManager.UI_Pop);
//# sourceMappingURL=LevelView.js.map