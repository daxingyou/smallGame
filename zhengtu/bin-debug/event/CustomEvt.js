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
var CustomEvt = (function (_super) {
    __extends(CustomEvt, _super);
    function CustomEvt(type, data, bubbles, cancelable) {
        if (data === void 0) { data = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._data = data;
        return _this;
    }
    Object.defineProperty(CustomEvt.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**游戏loading完成 */
    CustomEvt.GAMELOADINGEND = 'gameLoadingEnd';
    /**引导集结队伍 */
    CustomEvt.GUIDE_CLICK_COLLECT = "guide_click_collect";
    /**引导点击确定按钮 */
    CustomEvt.GUIDE_CLICL_SURE = "guide_click_sure";
    /**引导第一场战斗 */
    CustomEvt.GUIDE_CLICK_BATTLE = "guide_click_battle";
    /**引导选择关卡 */
    CustomEvt.GUIDE_SELECT_LEVEL = "guide_select_level";
    /**引导技能释放 */
    CustomEvt.GUIDE_USE_SKILL = "guide_use_skill";
    /**打开武将面板 */
    CustomEvt.GUIDE_OPEN_GENERAL = "guide_open_general";
    /**补充兵力 */
    CustomEvt.GUIDE_ADD_SOLDIER = "guide_add_soldier";
    /**训练 */
    CustomEvt.GUIDE_TRAIN_SOLDIER = "guide_train_soldier";
    /**关闭兵营 */
    CustomEvt.GUIDE_CLOSE_SOLDIER = "guide_close_soldier";
    /**下一步引导 */
    CustomEvt.GUIDE_TO_NEXT = "guide_to_next";
    /**引导点击军需处 */
    CustomEvt.GUIDE_CLICK_BUILD_GOODS = "guide_click_build_goods";
    /**引导收集生铁 */
    CustomEvt.GUIDE_COLLECT_FE = "guide_collect_fe";
    /**引导加速生铁的生产 */
    CustomEvt.GUIDE_QUICK_FE = "guide_quick_fe";
    /**引导收集木材 */
    CustomEvt.GUIDE_COLLECT_WOOD = "guide_collect_wood";
    /**引导收集粮草 */
    CustomEvt.GUIDE_COLLECT_GOOD = "guide_collect_good";
    /**引导关闭军需处 */
    CustomEvt.GUIDE_CLOSE_COLLECT = "guide_close_collect";
    /**士兵进度刷新1 */
    CustomEvt.PROGRESS_0 = "progress_0";
    /**士兵进度刷新2 */
    CustomEvt.PROGRESS_1 = "progress_1";
    /**士兵进度刷新3 */
    CustomEvt.PROGRESS_2 = "progress_2";
    /**战斗结算界面退出 */
    CustomEvt.BATTLE_END = "battle_end";
    /**重置战斗 */
    CustomEvt.BATTLE_RESET = "battle_reset";
    /**点击确定 */
    CustomEvt.CLICK_SURE = "clicl_sure";
    /**人物升级 */
    CustomEvt.UPGRADE = "upgrade";
    return CustomEvt;
}(egret.Event));
__reflect(CustomEvt.prototype, "CustomEvt");
//# sourceMappingURL=CustomEvt.js.map