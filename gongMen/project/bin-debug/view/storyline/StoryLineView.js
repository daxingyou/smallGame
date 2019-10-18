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
/**剧情 */
var StoryLineView = (function (_super) {
    __extends(StoryLineView, _super);
    function StoryLineView() {
        return _super.call(this) || this;
    }
    StoryLineView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.back_img, this.touchClose);
    };
    StoryLineView.prototype.close = function () {
    };
    StoryLineView.prototype.init = function () {
        this.list.itemRenderer = StoryLineItem;
        this.list.dataProvider = new eui.ArrayCollection(StoryLineConfig.storyLinefig);
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
    };
    StoryLineView.prototype.touchClose = function () {
        ViewManager.inst().close(StoryLineView);
        ViewManager.inst().open(HomeView);
    };
    return StoryLineView;
}(BaseEuiView));
__reflect(StoryLineView.prototype, "StoryLineView");
ViewManager.inst().reg(StoryLineView, LayerManager.UI_Main);
//# sourceMappingURL=StoryLineView.js.map