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
/**
 * 太学
 */
var StudyPopUp = (function (_super) {
    __extends(StudyPopUp, _super);
    function StudyPopUp() {
        return _super.call(this) || this;
    }
    StudyPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        var leve1str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
        var leve2str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
        var leve3str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
        if (!leve1str) {
            egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF1_LEVEL, "0");
        }
        if (!leve2str) {
            egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF2_LEVEL, "0");
        }
        if (!leve3str) {
            egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF3_LEVEL, "0");
        }
        this.refreshActiveIcon();
        this.addTouchEvent(this.upgrade_1, this.onUpgrade, true);
        this.addTouchEvent(this.upgrade_2, this.onUpgrade, true);
        this.addTouchEvent(this.upgrade_3, this.onUpgrade, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    StudyPopUp.prototype.onUpgrade = function (evt) {
        var boo = this.judgeIfUpgrade();
        if (boo) {
            var bookIcon = new eui.Image();
            this.content.addChild(bookIcon);
            if (evt.target == this.upgrade_1) {
                bookIcon.source = "active_1_png";
                bookIcon.x = this.icon1.x;
                bookIcon.y = this.icon1.y;
                this.slideToActive(bookIcon, this.active_1);
                var leve1str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
                egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF1_LEVEL, (parseInt(leve1str) + 1).toString());
            }
            else if (evt.target == this.upgrade_2) {
                bookIcon.source = "active_2_png";
                bookIcon.x = this.icon2.x;
                bookIcon.y = this.icon2.y;
                this.slideToActive(bookIcon, this.active_2);
                var leve2str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
                egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF2_LEVEL, (parseInt(leve2str) + 1).toString());
            }
            else {
                bookIcon.source = "active_3_png";
                bookIcon.x = this.icon3.x;
                bookIcon.y = this.icon3.y;
                this.slideToActive(bookIcon, this.active_3);
                var leve3str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
                egret.localStorage.setItem(LocalStorageEnum.STUDY_BUFF3_LEVEL, (parseInt(leve3str) + 1).toString());
            }
            this.refreshActiveIcon();
        }
    };
    StudyPopUp.prototype.slideToActive = function (display, tar) {
        egret.Tween.get(display).to({ scaleX: 1.5, scaleY: 1.5 }, 800, egret.Ease.circOut).wait(200).to({ x: tar.x, y: tar.y, alpha: 0, scaleX: 0, scaleY: 0 }, 1000, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(display);
            if (display && display.parent) {
                display.parent.removeChild(display);
            }
        }, this);
    };
    StudyPopUp.prototype.judgeIfUpgrade = function () {
        var min = this.getMinLevel(0) + 1;
        var cost = min * 300;
        var roleGold = GameApp.ins().gold;
        var boo = roleGold >= cost;
        if (boo == false) {
            UserTips.ins().showTips("元宝不足,可通过<font color=0x00ff00>【扫荡】【征收】</font>获得");
        }
        else {
            GameApp.ins().gold -= cost;
            var min_1 = this.getMinLevel(0);
            GameApp.ins().rolePower += 200 * (min_1 + 1);
        }
        return boo;
    };
    StudyPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(StudyPopUp);
        }, this);
    };
    StudyPopUp.prototype.refreshActiveIcon = function () {
        var leve1str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
        var leve2str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
        var leve3str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
        var min = this.getMinLevel(0);
        var max = this.getMinLevel(1);
        if (min >= 3) {
            this.upgrade_1.visible = this.upgrade_2.visible = this.upgrade_3.visible = false;
        }
        else {
            if (min == parseInt(leve1str) && min == parseInt(leve2str) && min == parseInt(leve3str)) {
                GlobalFun.filterToGrey(this.active_1);
                GlobalFun.filterToGrey(this.active_2);
                GlobalFun.filterToGrey(this.active_3);
                this.upgrade_1.visible = this.upgrade_2.visible = this.upgrade_3.visible = true;
                if (min == 0) {
                    this.icon.source = "icon_1_png";
                }
                else {
                    this.icon.source = "icon_" + (min + 1) + "_png";
                }
            }
            else {
                if (min == parseInt(leve1str)) {
                    GlobalFun.filterToGrey(this.active_1);
                    this.upgrade_1.visible = true;
                }
                if (max == parseInt(leve1str)) {
                    GlobalFun.clearFilters(this.active_1);
                    this.upgrade_1.visible = false;
                }
                if (min == parseInt(leve2str)) {
                    GlobalFun.filterToGrey(this.active_2);
                    this.upgrade_2.visible = true;
                }
                if (max == parseInt(leve2str)) {
                    GlobalFun.clearFilters(this.active_2);
                    this.upgrade_2.visible = false;
                }
                if (min == parseInt(leve3str)) {
                    GlobalFun.filterToGrey(this.active_3);
                    this.upgrade_3.visible = true;
                }
                if (max == parseInt(leve3str)) {
                    GlobalFun.clearFilters(this.active_3);
                    this.upgrade_3.visible = false;
                }
                this.icon.source = "icon_" + (min + 1) + "_png";
            }
        }
        this.levelLab.text = min.toString();
        var campstr = egret.localStorage.getItem(LocalStorageEnum.CAMP);
        var buffName = CampCfg.campCfg[parseInt(campstr)].buffName;
        this.nameLab.text = buffName;
        var attrArr = [];
        if (parseInt(campstr) == 0) {
            attrArr = ["军事+", "智谋+", "防御+"];
        }
        else if (parseInt(campstr) == 1) {
            attrArr = ["智谋+", "防御+", "军事+"];
        }
        else if (parseInt(campstr) == 2) {
            attrArr = ["防御+", "军事+", "智谋+"];
        }
        this.attr_1.text = attrArr[0] + ((min + 1) * 300).toString();
        this.attr_2.text = attrArr[1] + ((min + 1) * 150).toString();
        this.attr_3.text = attrArr[2] + ((min + 1) * 70).toString();
        this.cost_1.text = ((min + 1) * 375).toString();
        this.cost_2.text = ((min + 1) * 235).toString();
        this.cost_3.text = ((min + 1) * 165).toString();
        // this.attr_1.text = this.attr_2.text = this.attr_3.text = attrstr+((min+1)*10).toString();
        // this.cost_1.text = this.cost_2.text = this.cost_3.text = ((min+1)*300).toString();
        this.descLab.text = CampCfg.campCfg[parseInt(campstr)].buffDesc + (min + 1) * 20 + "点";
    };
    /**
     * param 1
     */
    StudyPopUp.prototype.getMinLevel = function (param) {
        var value = 0;
        var leve1str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
        var leve2str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
        var leve3str = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
        if (param == 0) {
            value = Math.min(parseInt(leve1str), parseInt(leve2str), parseInt(leve3str));
        }
        else {
            value = Math.max(parseInt(leve1str), parseInt(leve2str), parseInt(leve3str));
        }
        return value;
    };
    StudyPopUp.prototype.close = function () {
        this.removeTouchEvent(this.upgrade_1, this.onUpgrade);
        this.removeTouchEvent(this.upgrade_2, this.onUpgrade);
        this.removeTouchEvent(this.upgrade_3, this.onUpgrade);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
    };
    return StudyPopUp;
}(BaseEuiView));
__reflect(StudyPopUp.prototype, "StudyPopUp");
ViewManager.ins().reg(StudyPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=StudyPopUp.js.map