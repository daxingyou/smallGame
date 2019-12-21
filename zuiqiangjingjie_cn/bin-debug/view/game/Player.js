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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(_id, _move) {
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
    Player.prototype.gameStart = function () {
        egret.Tween.resumeTweens(this);
    };
    Player.prototype.gamePause = function () {
        egret.Tween.pauseTweens(this);
    };
    Player.prototype.init = function () {
        var _this = this;
        if (this.id == 1 || this.id == 2 || this.id == 3) {
            this.hp_max = this.hp = GameCfg.bingDate[this.id].hp;
            this.attack = GameCfg.bingDate[this.id].attack;
        }
        this.mc = new MovieClip();
        egret.Tween.get(this)
            .wait(Math.floor(Math.random() * 100))
            .call(function () {
            _this.mc.playFile(EFFECT + "role_" + _this.id, -1, null, false, "stand_right");
        });
        this.addChild(this.mc);
    };
    Player.prototype.removeMove = function () {
        if (this.move) {
            this.removeMySelf();
        }
    };
    Player.prototype.setData = function (_hp, _attack) {
        this.hp_max = this.hp = _hp;
        this.attack = _attack;
    };
    Player.prototype.getData = function () {
        return { hp: this.hp, attack: this.attack };
    };
    Player.prototype.setHp = function (_num) {
        var hurt = new MovieClip();
        hurt.x = -hurt.width / 2 + Math.random() * 10;
        hurt.y = -hurt.height + Math.random() * 10;
        ;
        this.addChild(hurt);
        hurt.playFile(EFFECT + "hurt", 1);
        if (this.hp - _num > 0) {
            GameCfg.playerPH -= _num;
        }
        else {
            GameCfg.playerPH -= (_num - this.hp);
        }
        if (GameCfg.playerPH <= 0)
            GameCfg.playerPH = 0;
        this.hp -= _num;
        if (this.hp <= 0) {
            egret.Tween.removeTweens(this);
            this.vis = false;
        }
    };
    Player.prototype.die = function () {
        var _this = this;
        if (this.yan)
            this.yan.destroy();
        this.mc.playFile(EFFECT + "role_" + this.id, 1, null, false, "die_right");
        egret.Tween.get(this)
            .wait(1500)
            .call(function () {
            _this.removeMySelf();
        });
    };
    Player.prototype.addHp = function (_num) {
        var ani = new MovieClip();
        ani.x = -ani.width / 2;
        ani.y = -ani.height / 2;
        this.addChild(ani);
        ani.playFile(EFFECT + "hp_effect", 1, null, true);
        if (_num > this.hp_max - this.hp) {
            GameCfg.playerPH += (this.hp_max - this.hp);
        }
        else {
            GameCfg.playerPH += _num;
        }
        if (GameCfg.playerPH >= GameCfg.playerPH_max) {
            GameCfg.playerPH = GameCfg.playerPH_max;
        }
        this.hp += _num;
        if (this.hp >= this.hp_max) {
            this.hp = this.hp_max;
        }
    };
    Player.prototype.setStand = function () {
        if (this.yan)
            this.yan.destroy();
        this.mc.playFile(EFFECT + "role_" + this.id, -1, null, false, "stand_right");
    };
    Player.prototype.setAttack = function () {
        if (this.yan)
            this.yan.destroy();
        this.mc.playFile(EFFECT + "role_" + this.id, 1, null, false, "attack_right");
    };
    Player.prototype.setRun = function (str) {
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
    Player.prototype.getAttack = function () {
        return this.attack;
    };
    Player.prototype.getHp = function () {
        return this.hp;
    };
    Player.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return Player;
}(egret.Sprite));
__reflect(Player.prototype, "Player");
//# sourceMappingURL=Player.js.map