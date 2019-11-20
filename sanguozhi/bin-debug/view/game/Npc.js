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
var Npc = (function (_super) {
    __extends(Npc, _super);
    function Npc(_id, _move) {
        var _this = _super.call(this) || this;
        _this.move = false;
        _this.vis = true;
        _this.id = _id;
        _this.move = _move;
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, _this.removeMove, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        return _this;
    }
    Npc.prototype.gameStart = function () {
        egret.Tween.resumeTweens(this);
    };
    Npc.prototype.gamePause = function () {
        egret.Tween.pauseTweens(this);
    };
    Npc.prototype.init = function () {
        var _this = this;
        if (this.id == 1 || this.id == 2 || this.id == 3) {
            this.hp_max = this.hp = GameCfg.bingDate[this.id].hp;
            this.attack = GameCfg.bingDate[this.id].attack;
        }
        this.mc = new MovieClip();
        egret.Tween.get(this)
            .wait(Math.floor(Math.random() * 100))
            .call(function () {
            _this.mc.playFile(EFFECT + "role_" + _this.id, -1, null, false, "stand_left");
        });
        this.addChild(this.mc);
    };
    Npc.prototype.setStand = function () {
        if (this.yan)
            this.yan.destroy();
        this.mc.playFile(EFFECT + "role_" + this.id, -1, null, false, "stand_left");
    };
    Npc.prototype.setAttack = function () {
        if (this.yan)
            this.yan.destroy();
        this.mc.playFile(EFFECT + "role_" + this.id, 1, null, false, "attack_left");
    };
    Npc.prototype.setRun = function (str) {
        if (this.yan)
            this.yan.destroy();
        if (str == "right") {
            this.yan = new MovieClip();
            this.yan.x = this.mc.x - this.mc.width / 2;
            this.yan.y = this.mc.y + this.mc.height / 2;
            this.addChild(this.yan);
            this.yan.scaleX = -0.1;
            this.yan.scaleY = 0.2;
            this.yan.playFile(EFFECT + "yan", -1);
        }
        else if (str == "left") {
            this.yan = new MovieClip();
            this.yan.x = this.mc.x + this.mc.width / 2;
            this.yan.y = this.mc.y + this.mc.height / 2;
            this.addChild(this.yan);
            this.yan.scaleX = 0.2;
            this.yan.scaleY = 0.2;
            this.yan.playFile(EFFECT + "yan", -1);
        }
        this.mc.playFile(EFFECT + "role_" + this.id, -1, null, false, "run_" + str);
    };
    Npc.prototype.removeMove = function () {
        if (this.move) {
            this.removeMySelf();
        }
    };
    Npc.prototype.setData = function (_hp, _attack) {
        this.hp_max = this.hp = _hp;
        this.attack = _attack;
    };
    Npc.prototype.getData = function () {
        return { hp: this.hp, attack: this.attack };
    };
    Npc.prototype.setHp = function (_num) {
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
    Npc.prototype.die = function () {
        var _this = this;
        if (this.yan)
            this.yan.destroy();
        this.mc.playFile(EFFECT + "role_" + this.id, 1, null, false, "die_left");
        egret.Tween.get(this)
            .wait(1500)
            .call(function () {
            _this.removeMySelf();
        });
    };
    Npc.prototype.xuanyun = function () {
        this.ani = new MovieClip();
        this.ani.x = -this.ani.width / 2;
        this.ani.y = -this.ani.height;
        this.addChild(this.ani);
        this.ani.playFile(EFFECT + "buff3", -1);
    };
    Npc.prototype.poisoning = function (_num, _effect) {
        var _this = this;
        setTimeout(function () {
            var skill = new MovieClip();
            skill.x = -skill.width / 2;
            skill.y = -skill.height / 2;
            skill.scaleX = skill.scaleY = 1.5;
            _this.addChild(skill);
            skill.playFile("" + EFFECT + _effect, 1);
            _this.setHp(_num);
        }, Math.random() * 200);
    };
    Npc.prototype.removeAni = function () {
        if (this.ani)
            this.ani.destroy();
    };
    Npc.prototype.getAttack = function () {
        return this.attack;
    };
    Npc.prototype.getHp = function () {
        return this.hp;
    };
    Npc.prototype.removeMySelf = function () {
        egret.Tween.removeTweens(this);
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return Npc;
}(egret.Sprite));
__reflect(Npc.prototype, "Npc");
//# sourceMappingURL=Npc.js.map