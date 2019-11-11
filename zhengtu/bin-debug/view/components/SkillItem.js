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
var SkillItem = (function (_super) {
    __extends(SkillItem, _super);
    function SkillItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SkillItemSkin";
        return _this;
    }
    SkillItem.prototype.childrenCreated = function () {
    };
    SkillItem.prototype.onStudy = function (evt) {
        var level = parseInt(egret.localStorage.getItem("skill_" + this.skillId));
        if (GameApp.inst().gold < (level * this.cost)) {
            UserTips.inst().showTips("黄金不足");
            return;
        }
        level += 1;
        egret.localStorage.setItem("skill_" + this.skillId, level.toString());
        this.skillLevelLab.text = "Lv." + level;
        this.skillCostLab.text = (level * this.cost).toString();
        if (level == 2) {
            this.studyBtn.visible = false;
        }
        else {
            this.studyBtn.visible = true;
            this.studyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStudy, this);
        }
    };
    SkillItem.prototype.dataChanged = function () {
        this.skillIcon.source = this.data.icon;
        this.skillNameLab.text = this.data.sname;
        this.skillDescLab.text = this.data.desc;
        this.skillId = this.data.skillId;
        this.cost = this.data.cost;
        var levelstr = egret.localStorage.getItem("skill_" + this.skillId);
        var level = 1;
        if (!levelstr) {
            egret.localStorage.setItem("skill_" + this.skillId, "1");
        }
        else {
            level = parseInt(levelstr);
        }
        this.skillCostLab.text = (this.cost * level).toString();
        this.skillLevelLab.text = "Lv." + level;
        // let level:number = parseInt(egret.localStorage.getItem("skill_"+this.skillId));
        if (level == 2) {
            this.studyBtn.visible = false;
        }
        else {
            this.studyBtn.visible = true;
            this.studyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStudy, this);
        }
    };
    SkillItem.prototype.dispose = function () {
        this.studyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStudy, this);
    };
    return SkillItem;
}(eui.ItemRenderer));
__reflect(SkillItem.prototype, "SkillItem");
//# sourceMappingURL=SkillItem.js.map