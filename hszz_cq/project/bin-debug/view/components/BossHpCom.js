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
var BossHpCom = (function (_super) {
    __extends(BossHpCom, _super);
    function BossHpCom() {
        var _this = _super.call(this) || this;
        _this.names = { 84001: "祖玛教主", 84004: "赤月恶魔", 84009: "深渊魔君", 84010: "诡眼魔君", 10026: "吸血魔君", 10054: "烛龙魔君", 84012: "魔化蝠王", 10115: "远古魔王" };
        _this.skinName = "BossHpComSkin";
        return _this;
    }
    BossHpCom.prototype.initData = function (id, level, hp) {
        this.monHead.source = "monhead" + id + "_png";
        this.levelLab.text = level.toString();
        this.curHp = this.totalHp = hp;
        this.progressLab.text = this.curHp + "/" + this.totalHp;
        this.nameLab.text = this.names[id];
        this.watcher = eui.Binding.bindHandler(GameApp, ["weapon"], this.onWeaponChange, this);
        this.effectIcon.source = "effect_" + GameApp.bossType + "_png";
        this.effectIcon.visible = false;
    };
    BossHpCom.prototype.onWeaponChange = function () {
        if (GameApp.weapon == GameApp.bossType) {
            //激活武器效果
            this.effectIcon.visible = true;
        }
        else {
            this.effectIcon.visible = false;
        }
    };
    BossHpCom.prototype.reduceHp = function (dmg) {
        var _this = this;
        egret.Tween.removeTweens(this.hpBar);
        egret.Tween.removeTweens(this.hpBar2);
        this.hpBar.width = this.curHp / this.totalHp * 372;
        this.hpBar2.width = this.curHp / this.totalHp * 372;
        this.curHp -= dmg;
        if (this.curHp <= 0) {
            this.curHp = 0;
        }
        this.progressLab.text = this.curHp + "/" + this.totalHp;
        var perw = this.curHp / this.totalHp * 372;
        egret.Tween.get(this.hpBar).to({ width: perw }, 300).call(function () {
            egret.Tween.removeTweens(_this.hpBar);
            egret.Tween.get(_this.hpBar2).to({ width: perw }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(_this.hpBar2);
            }, _this);
        }, this);
    };
    return BossHpCom;
}(eui.Component));
__reflect(BossHpCom.prototype, "BossHpCom");
//# sourceMappingURL=BossHpCom.js.map