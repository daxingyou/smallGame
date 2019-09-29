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
var LevelItem = (function (_super) {
    __extends(LevelItem, _super);
    function LevelItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "LevelItemSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        return _this;
    }
    LevelItem.prototype.dataChanged = function () {
        this.img.source = "level_s_" + this.data.gq_id + "_png";
        if (this.data.state == 1) {
            GlobalFun.clearFilters(this);
        }
        else {
            GlobalFun.filterToGrey(this);
        }
        this.level_label.text = "" + LevelCfg.chapter + " - " + this.data.gq_id;
    };
    LevelItem.prototype.touchTap = function () {
        if (this.data.state == 0) {
            UserTips.inst().showTips("关卡未开启");
        }
        else {
            // console.log("打开关卡");
            LevelCfg.gq = this.data.gq_id;
            ViewManager.inst().close(ChapterView);
            ViewManager.inst().close(LevelView);
            ViewManager.inst().open(BattleView, [{ blevel: LevelCfg.chapter, slevel: LevelCfg.gq }]);
            var str = "";
            if (LevelCfg.chapter == 1 && LevelCfg.gq == 1) {
                str = "入侵的恐怖分子占领了诺曼工业区,为了解救被困的工人,现在你在进行前线侦查,遇到了敌人的埋伏。为了防止计划泄露,必须在这里消灭它们。";
            }
            else if (LevelCfg.chapter == 1 && LevelCfg.gq == 2) {
                str = "在返回基地途中遇到了敌方的追兵,要把情报完好无损带回去,必须在这里拦截敌人的追击.";
            }
            if (str) {
                ViewManager.inst().open(MotionBlends, [str]);
            }
            else {
                MessageManager.inst().dispatch("closeStory");
            }
        }
    };
    return LevelItem;
}(eui.ItemRenderer));
__reflect(LevelItem.prototype, "LevelItem");
//# sourceMappingURL=LevelItem.js.map