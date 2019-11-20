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
var BuildNpc = (function (_super) {
    __extends(BuildNpc, _super);
    function BuildNpc(_id, _move) {
        var _this = _super.call(this) || this;
        _this.move = false;
        _this.vis = true;
        _this.id = _id;
        _this.move = _move;
        _this.skinName = "BuildNpcSkin";
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, _this.removeMove, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        return _this;
    }
    BuildNpc.prototype.gameStart = function () {
        // this.ani.play();
        // this.ani_1.play();
        egret.Tween.resumeTweens(this);
    };
    BuildNpc.prototype.gamePause = function () {
        // this.ani.stop();
        // this.ani_1.stop();
        egret.Tween.pauseTweens(this);
    };
    BuildNpc.prototype.init = function () {
        var _this = this;
        if (this.id == 10008) {
            this.ta_img.visible = true;
        }
        else {
            this.ani_1 = new MovieClip();
            egret.Tween.get(this)
                .wait(Math.floor(Math.random() * 100))
                .call(function () {
                _this.ani_1.playFile(EFFECT + "role_10009", -1, null, false, "stand_left");
            });
            this.ani_1.scaleX = this.ani_1.scaleY = 0.5;
            this.addChild(this.ani_1);
        }
        var card = GlobalFun.getCardDataFromId(this.id);
        this.hp_max = this.hp = card.hp;
        this.attack = card.atk;
    };
    BuildNpc.prototype.setStand = function () {
        this.ani_1.playFile(EFFECT + "role_10009", -1, null, false, "stand_left");
    };
    BuildNpc.prototype.setAttack = function () {
        this.ani_1.playFile(EFFECT + "role_10009", 1, null, false, "attack_left");
    };
    BuildNpc.prototype.setRun = function (str) {
        this.ani_1.playFile(EFFECT + "role_10009", -1, null, false, "run_" + str);
    };
    BuildNpc.prototype.setData = function (_hp, _attack) {
        this.hp_max = this.hp = _hp;
        this.attack = _attack;
    };
    BuildNpc.prototype.getData = function () {
        return { hp: this.hp, attack: this.attack };
    };
    BuildNpc.prototype.setHp = function (_num) {
        var hurt = new MovieClip();
        hurt.x = -hurt.width / 2 + Math.random() * 10;
        hurt.y = -hurt.height + Math.random() * 10;
        ;
        this.addChild(hurt);
        hurt.playFile(EFFECT + "hurt", 1);
        var hurt_num = new Hurt(_num);
        hurt_num.x = -hurt_num.width / 2;
        hurt_num.y = -hurt_num.height;
        hurt_num.scaleX = hurt_num.scaleY = 1.5;
        this.addChildAt(hurt_num, 99999999);
        if (this.hp - _num > 0) {
            GameCfg.npcPH -= _num;
        }
        else {
            GameCfg.npcPH -= (_num - this.hp);
        }
        if (GameCfg.npcPH <= 0)
            GameCfg.npcPH = 0;
        this.hp -= _num;
        if (this.hp <= 0) {
            egret.Tween.removeTweens(this);
            this.vis = false;
        }
    };
    BuildNpc.prototype.die = function () {
        var _this = this;
        if (this.id == 10008) {
            this.removeMySelf();
        }
        else {
            this.ani_1.playFile(EFFECT + "role_" + this.id, 1, null, false, "die_left");
            egret.Tween.get(this)
                .wait(1500)
                .call(function () {
                _this.removeMySelf();
            });
        }
    };
    BuildNpc.prototype.poisoning = function (_num, _effect) {
        var skill = new MovieClip();
        skill.x = -skill.width / 2;
        skill.y = -skill.height / 2;
        skill.scaleX = skill.scaleY = 1.5;
        this.addChild(skill);
        skill.playFile("" + EFFECT + _effect, 1);
        this.setHp(_num);
    };
    BuildNpc.prototype.getAttack = function () {
        return this.attack;
    };
    BuildNpc.prototype.getHp = function () {
        return this.hp;
    };
    BuildNpc.prototype.xuanyun = function () {
        this.ani = new MovieClip();
        this.ani.x = -this.ani.width / 2;
        this.ani.y = -this.ani.height;
        this.addChild(this.ani);
        this.ani.playFile(EFFECT + "buff3", -1);
    };
    BuildNpc.prototype.removeAni = function () {
        if (this.ani)
            this.ani.destroy();
    };
    BuildNpc.prototype.removeMove = function () {
        if (this.move) {
            this.removeMySelf();
        }
    };
    BuildNpc.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return BuildNpc;
}(BaseView));
__reflect(BuildNpc.prototype, "BuildNpc");
//# sourceMappingURL=BuildNpc.js.map