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
var PubItem = (function (_super) {
    __extends(PubItem, _super);
    function PubItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "PubItemsSkin";
        return _this;
    }
    PubItem.prototype.childrenCreated = function () {
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
    };
    PubItem.prototype.onGet = function () {
        if (GameApp.ins().role_gold < this._cost) {
            UserTips.ins().showTips("\u5143\u5B9D\u4E0D\u8DB3,\u53EF\u901A\u8FC7<font color=0x00ff00>\u3010\u626B\u8361\u3011\u3010\u5F81\u6536\u3011</font>\u83B7\u5F97");
            return;
        }
        var campstr = egret.localStorage.getItem(LocalStorageEnum.CAMP);
        var skillCfgs = SkillCfg.skillCfg[parseInt(campstr)];
        var power = 0;
        var skillName = '';
        for (var i = 0; i < skillCfgs.length; i++) {
            if (this._skillId == skillCfgs[i].skillId) {
                power = skillCfgs[i].power;
                skillName = skillCfgs[i].skillName;
                break;
            }
        }
        UserTips.ins().showTips("\u606D\u559C\u83B7\u5F97\u4E0A\u5929\u7684\u8D4F\u8D50--\u83B7\u5F97\u6280\u80FD<font color=0x00ff00>[" + skillName + "]</font>");
        GameApp.ins().rolePower += power;
        this.getBtn.visible = false;
        GameApp.ins().gold -= this._cost;
        var generalInfoStr = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
        if (generalInfoStr) {
            var arr = generalInfoStr.split("_");
            GameApp.ownGeneralNum = arr.length + 2;
            var str = generalInfoStr + "_" + this._skillId;
            egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET, str);
        }
        else {
            GameApp.ownGeneralNum = 2;
            egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET, this._skillId.toString());
        }
    };
    PubItem.prototype.dataChanged = function () {
        if (this.data.cost) {
            this._cost = this.data.cost;
            this.costLab.text = this.data.cost.toString();
        }
        if (this.data.skillName) {
            this.skillName.text = this.data.skillName;
        }
        if (this.data.res) {
            var mc = new MovieClip();
            this.skillGroup.addChild(mc);
            mc.playFile("" + SKILL_EFF + this.data.res, -1, null, false, "", null, 12);
            mc.x = this.skillGroup.width >> 1;
            mc.y = this.skillGroup.height >> 1;
        }
        if (this.data.skillId) {
            this._skillId = this.data.skillId;
            var generalInfoStr = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
            if (generalInfoStr) {
                var arr = generalInfoStr.split("_");
                if (arr.indexOf(this._skillId.toString()) == -1) {
                    this.getBtn.visible = true;
                }
                else {
                    this.getBtn.visible = false;
                }
            }
        }
        if (this.data.attr) {
            this.attrLab.text = this.data.attr;
        }
    };
    PubItem.prototype.dispose = function () {
        this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGet, this);
    };
    return PubItem;
}(eui.ItemRenderer));
__reflect(PubItem.prototype, "PubItem");
//# sourceMappingURL=PubItem.js.map