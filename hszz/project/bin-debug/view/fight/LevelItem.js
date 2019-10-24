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
    function LevelItem(_id) {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.id = _id;
        _this.skinName = "LevelItemSkin";
        _this.init();
        _this.addTouchEvent(_this, _this.touchTap);
        return _this;
    }
    LevelItem.prototype.init = function () {
        this.level_font.text = "d " + this.id + " t";
        this.hz_num.text = "" + HighLadderCfg.levelAny[this.id - 1].hz_num;
        if (GameApp.medal >= HighLadderCfg.levelAny[this.id - 1].hz_num) {
        }
        else {
            GlobalFun.filterToGrey(this);
        }
    };
    LevelItem.prototype.touchTap = function () {
        if (GameApp.medal >= HighLadderCfg.levelAny[this.id - 1].hz_num) {
            /**进入游戏 */
            ViewManager.inst().open(BattleView);
            ViewManager.inst().close(HighLadderView);
        }
        else {
            UserTips.inst().showTips("勋章不足，无法挑战");
        }
    };
    return LevelItem;
}(BaseView));
__reflect(LevelItem.prototype, "LevelItem");
//# sourceMappingURL=LevelItem.js.map