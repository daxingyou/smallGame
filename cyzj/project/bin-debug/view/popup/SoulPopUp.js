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
var SoulPopUp = (function (_super) {
    __extends(SoulPopUp, _super);
    function SoulPopUp() {
        var _this = _super.call(this) || this;
        _this.curHeroIndex = 0;
        _this.lockRoleData = [];
        return _this;
    }
    SoulPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.expBar.mask = this.expMask;
        this.content.scaleX = this.content.scaleY = 0;
        this.content.alpha = 0;
        this.leftArrow.visible = this.rightArrow.visible = false;
        egret.Tween.get(this.title).to({ top: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.title);
        }, this);
        egret.Tween.get(this.content).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        var roleData = GameApp.roleData;
        for (var key in roleData) {
            if (roleData[key].isUnlock) {
                this.lockRoleData.push(roleData[key]);
            }
        }
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.refreshData();
        this.addTouchEvent(this.leftArrow, this.onLeft, true);
        this.addTouchEvent(this.rightArrow, this.onRight, true);
        GlobalFun.filterToGrey(this.item1);
        GlobalFun.filterToGrey(this.item2);
        GlobalFun.filterToGrey(this.item3);
        this.item1_num.text = "" + GlobalFun.getItemNumFromBag(10009);
        this.item2_num.text = "" + GlobalFun.getItemNumFromBag(10010);
        this.item3_num.text = "" + GlobalFun.getItemNumFromBag(10011);
        var upgradeMetaris = GlobalFun.getMetarisFromBag(1);
        for (var i = 0; i < upgradeMetaris.length; i++) {
            if (upgradeMetaris[i].id == 10009) {
                GlobalFun.clearFilters(this.item1);
                continue;
            }
            else if (upgradeMetaris[i].id == 10010) {
                GlobalFun.clearFilters(this.item2);
                continue;
            }
            else if (upgradeMetaris[i].id == 10011) {
                GlobalFun.clearFilters(this.item3);
                continue;
            }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    SoulPopUp.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.item1:
                this.useItemToUp(10009, 1);
                break;
            case this.item2:
                this.useItemToUp(10010, 2);
                break;
            case this.item3:
                this.useItemToUp(10011, 3);
                break;
        }
    };
    /**使用物品升级 */
    SoulPopUp.prototype.useItemToUp = function (id, num) {
        if (GlobalFun.getItemNumFromBag(id) > 0) {
            GlobalFun.removeItemFromBag(id, 1);
            this.refreshProgress(num);
            if (GlobalFun.getItemNumFromBag(id) <= 0) {
                GlobalFun.filterToGrey(this["item" + num]);
            }
            this.item1_num.text = "" + GlobalFun.getItemNumFromBag(10009);
            this.item2_num.text = "" + GlobalFun.getItemNumFromBag(10010);
            this.item3_num.text = "" + GlobalFun.getItemNumFromBag(10011);
        }
        else {
            UserTips.inst().showTips("卷轴不足,请先合成");
        }
    };
    SoulPopUp.prototype.refreshProgress = function (num) {
        var exp = 75 * num;
        var rexp = this.curSelectRole.exp + exp;
        var upboo = false;
        if (rexp >= 500 * this.curSelectRole.level) {
            this.curSelectRole.exp = rexp - 500 * this.curSelectRole.level;
            this.curSelectRole.level += 1;
            //升级人物属性
            this.curSelectRole.atk += this.curSelectRole.level * 50;
            this.curSelectRole.hp += this.curSelectRole.level * 75;
            this.curSelectRole.def += this.curSelectRole.level * 15;
            upboo = true;
        }
        else {
            this.curSelectRole.exp += exp;
        }
        var roleData = GameApp.roleData;
        for (var i = 0; i < roleData.length; i++) {
            if (roleData[i].id == this.curSelectRole.id) {
                roleData[i] = this.curSelectRole;
                break;
            }
        }
        egret.localStorage.setItem(LocalStorageEnum.ROLE_DATA, JSON.stringify(roleData));
        if (GameApp.roleDataIndex == this.curHeroIndex) {
            //告诉主界面 人物升级了
            MessageManager.inst().dispatch("mainRoleUp");
        }
        this.refreshData();
    };
    SoulPopUp.prototype.onLeft = function () {
        this.curHeroIndex -= 1;
        this.refreshData();
    };
    SoulPopUp.prototype.onRight = function () {
        this.curHeroIndex += 1;
        this.refreshData();
    };
    SoulPopUp.prototype.refreshData = function () {
        if (this.lockRoleData.length < 2) {
            this.leftArrow.visible = false;
            this.rightArrow.visible = false;
        }
        else {
            if (this.curHeroIndex <= 0) {
                this.leftArrow.visible = false;
                this.rightArrow.visible = true;
            }
            else if (this.curHeroIndex >= (this.lockRoleData.length - 1)) {
                this.rightArrow.visible = false;
                this.leftArrow.visible = true;
            }
            else {
                this.leftArrow.visible = this.rightArrow.visible = true;
            }
        }
        var showRoleData = this.lockRoleData[this.curHeroIndex];
        this.curSelectRole = showRoleData;
        this.roleMode.source = showRoleData.roleModel;
        this.nameLab.text = showRoleData.name;
        this.atkLab.text = showRoleData.atk.toString();
        this.defLab.text = showRoleData.def.toString();
        this.hpLab.text = showRoleData.hp.toString();
        this.storyDesc.text = showRoleData.desc;
        this.skillIcon.source = "skill_" + showRoleData.id + "_png";
        this.skillDesc.text = showRoleData.skillDesc;
        this.skillName.text = showRoleData.skillName;
        this.powerLab.text = (showRoleData.atk + showRoleData.def + showRoleData.hp).toString();
        this.levelIcon.source = "levelicon_" + showRoleData.level + "_png";
        // this.levelLab.text = "Lv."+showRoleData.level;
        this.expMask.width = showRoleData.exp / (500 * showRoleData.level) * 385;
        this.expLab.text = ((showRoleData.exp / (500 * showRoleData.level) * 100) >> 0) + "%";
    };
    SoulPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.title).to({ top: -100 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.title);
        }, this);
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(SoulPopUp);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    SoulPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.leftArrow, this.onLeft);
        this.removeTouchEvent(this.rightArrow, this.onRight);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return SoulPopUp;
}(BaseEuiView));
__reflect(SoulPopUp.prototype, "SoulPopUp");
ViewManager.inst().reg(SoulPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=SoulPopUp.js.map