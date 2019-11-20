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
var NeiWuStoryItem = (function (_super) {
    __extends(NeiWuStoryItem, _super);
    function NeiWuStoryItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "NeiWuStoryItemSkin";
        return _this;
    }
    NeiWuStoryItem.prototype.childrenCreated = function () {
        this.scaleX = this.scaleY = 0.8;
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
        this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancle, this);
    };
    NeiWuStoryItem.prototype.onSure = function () {
        MessageManager.inst().dispatch("SELECT_SURE");
    };
    NeiWuStoryItem.prototype.onCancle = function () {
        MessageManager.inst().dispatch("SELECT_CANCLE");
    };
    NeiWuStoryItem.prototype.initData = function (data) {
        this._skinstate = data.skinState;
        this.invalidateState();
        this.head.source = data.head;
        if (data.skinState == "center") {
            this.label.text = data.story;
        }
        else {
            this.storyLab.text = data.story;
            if (data.skinState == "left") {
                this.nameLab.text = data.name;
            }
            else {
                this.nameLab2.text = data.name;
            }
        }
    };
    NeiWuStoryItem.prototype.getCurrentState = function () {
        return this._skinstate;
    };
    NeiWuStoryItem.prototype.dispose = function () {
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
        this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancle, this);
    };
    return NeiWuStoryItem;
}(eui.Component));
__reflect(NeiWuStoryItem.prototype, "NeiWuStoryItem");
//# sourceMappingURL=NeiWuStoryItem.js.map