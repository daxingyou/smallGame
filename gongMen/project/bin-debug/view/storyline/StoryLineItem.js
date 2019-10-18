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
var StoryLineItem = (function (_super) {
    __extends(StoryLineItem, _super);
    function StoryLineItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "StoryLineItemSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        return _this;
    }
    StoryLineItem.prototype.dataChanged = function () {
        this.bg.source = "img_juqing_cell_" + this.data.state + "_png";
        this.label.text = this.data.juqTitle;
    };
    StoryLineItem.prototype.touchTap = function () {
        if (this.data.state != "gray") {
            GameConfig.gqConfig = this.data.juqopsisPath;
            GameConfig.gqMin = this.data.juqopsisList.split("~")[0];
            GameConfig.gqMax = this.data.juqopsisList.split("~")[1];
            GameConfig.gqNum = this.data.id;
            ViewManager.inst().close(StoryLineView);
            ViewManager.inst().open(GameView);
        }
    };
    return StoryLineItem;
}(eui.ItemRenderer));
__reflect(StoryLineItem.prototype, "StoryLineItem");
//# sourceMappingURL=StoryLineItem.js.map