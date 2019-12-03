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
        _this._islock = true;
        _this._isCd = false;
        _this.curUseNum = 0;
        _this.skinName = "SkillItemSkin";
        return _this;
    }
    SkillItem.prototype.childrenCreated = function () {
        this.upBtn.visible = false;
        this.skillLevel.visible = false;
        this.numLab.visible = false;
        this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpSkill, this);
        this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
        // this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReleaseSkill,this);
        this.cdGroup.visible = false;
    };
    SkillItem.prototype.onBegin = function (evt) {
        if (!this.timeInterval) {
            var self_1 = this;
            this.timeInterval = setInterval(function () {
                clearInterval(self_1.timeInterval);
                self_1.timeInterval = null;
                self_1.showInfo = true;
                MessageManager.inst().dispatch("showSkillInfo", { skillId: self_1._cfg.skillId });
            }, 1000);
        }
    };
    SkillItem.prototype.onEnd = function () {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
        if (!this.showInfo) {
            if (this._islock) {
                UserTips.inst().showTips("当前技能未开启,请先提升等级");
                return;
            }
            if (this._cfg.skillId == 101 && this.curUseNum > 0) {
                this.curUseNum -= 1;
                this.numLab.text = this.curUseNum.toString();
            }
            MessageManager.inst().dispatch("releaseSkill", { skillId: this._cfg.skillId });
        }
        else {
            this.showInfo = false;
            MessageManager.inst().dispatch("hideSkillInfo");
        }
    };
    // private onReleaseSkill():void{
    // }
    SkillItem.prototype.initialize = function (cfg) {
        this._cfg = cfg;
        this.showIcon();
        this.showUp();
    };
    /**设置cd */
    SkillItem.prototype.setCd = function (time, cb, arg) {
        this._isCd = true;
        var self = this;
        var count = 0;
        this.cdGroup.visible = true;
        this.cdTime.text = time.toString();
        var timeout = setInterval(function () {
            count += 1;
            self.cdTime.text = (time - count).toString();
            if (count >= time) {
                self.curUseNum = 3;
                self.numLab.text = self.curUseNum.toString();
                clearInterval(timeout);
                self._isCd = false;
                self.cdGroup.visible = false;
                if (cb && arg) {
                    cb.call(arg);
                }
            }
        }, 1000);
    };
    Object.defineProperty(SkillItem.prototype, "isInCd", {
        /**是否在cd中 */
        get: function () {
            return this._isCd;
        },
        enumerable: true,
        configurable: true
    });
    /**人物等级提升 显示技能提升图标 */
    SkillItem.prototype.showUp = function () {
        this.upBtn.y = 0;
        this.upBtn.touchEnabled = true;
        var tolLevel = 0;
        for (var key in GameApp.skillLevel) {
            tolLevel += GameApp.skillLevel[key];
        }
        if (GameApp.level > tolLevel) {
            //当前人物等级大于技能总等级 。
            if (this._cfg.skillId == 104) {
                this.upBtn.visible = GameApp.level >= 4;
            }
            else {
                this.upBtn.visible = true;
            }
        }
        if (this.upBtn.visible) {
            egret.Tween.get(this.upBtn, { loop: true }).to({ y: this.upBtn.y - 10 }, 1000).to({ y: this.upBtn.y }, 1000);
        }
        else {
            egret.Tween.removeTweens(this.upBtn);
        }
    };
    /**隐藏提升 */
    SkillItem.prototype.hideUp = function () {
        var _this = this;
        egret.Tween.removeTweens(this.upBtn);
        egret.Tween.get(this.upBtn).to({ y: 120 }, 400, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.upBtn);
            _this.upBtn.visible = false;
        }, this);
    };
    SkillItem.prototype.onUpSkill = function () {
        this.upBtn.touchEnabled = false;
        GameApp.skillLevel[this._cfg.skillId] += 1;
        egret.localStorage.setItem(LocalStorageEnum.Skill_Level, JSON.stringify(GameApp.skillLevel));
        this.skillLevel.text = "Lv." + GameApp.skillLevel[this._cfg.skillId];
        this.showIcon();
        MessageManager.inst().dispatch("skillUpgrade");
    };
    SkillItem.prototype.showIcon = function () {
        var clevel = GameApp.skillLevel[this._cfg.skillId];
        if (!clevel) {
            this.skillImg.source = "skill_" + this._cfg.skillId + "_unlock_png";
            this.skillLevel.visible = false;
            this._islock = true;
        }
        else {
            this.skillImg.source = "skill_" + this._cfg.skillId + "_png";
            this.skillLevel.visible = true;
            if (this._cfg.usenum > 1) {
                this.curUseNum = this._cfg.usenum;
                this.numLab.visible = true;
                this.numLab.text = this.curUseNum.toString();
            }
            else {
                this.numLab.visible = false;
            }
            this._islock = false;
            this.skillLevel.text = "Lv." + clevel;
        }
    };
    return SkillItem;
}(eui.Component));
__reflect(SkillItem.prototype, "SkillItem");
//# sourceMappingURL=SkillItem.js.map