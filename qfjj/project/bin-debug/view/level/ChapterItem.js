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
var ChapterItem = (function (_super) {
    __extends(ChapterItem, _super);
    // private name_label:eui.Label;
    function ChapterItem(_data) {
        var _this = _super.call(this) || this;
        _this.data = _data;
        _this.skinName = "ChapterItemSkin";
        _this.init();
        _this.addTouchEvent(_this, _this.touchTap);
        MessageManager.inst().addListener("UPDATE_CHAPTER", _this.update, _this);
        return _this;
    }
    ChapterItem.prototype.init = function () {
        if (this.data.state == 1) {
            GlobalFun.clearFilters(this);
        }
        else {
            GlobalFun.filterToGrey(this);
        }
        this.img.source = "level_" + this.data.chapter_id + "_png";
        // this.name_label.text = this.data.chapter_name;
    };
    ChapterItem.prototype.touchTap = function () {
        if (this.data.state == 0) {
            UserTips.inst().showTips("章节未开启");
        }
        else {
            console.log("打开章节");
            LevelCfg.chapter = this.data.chapter_id;
            ViewManager.inst().open(LevelView);
        }
    };
    ChapterItem.prototype.update = function () {
        // GlobalFun.clearFilters(this);
        // this.img.source = "chapter_icon" + this.data.state + "_png";
    };
    return ChapterItem;
}(BaseView));
__reflect(ChapterItem.prototype, "ChapterItem");
//# sourceMappingURL=ChapterItem.js.map