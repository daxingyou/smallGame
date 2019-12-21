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
var Build = (function (_super) {
    __extends(Build, _super);
    function Build(_id, _move) {
        var _this = _super.call(this) || this;
        _this.move = false;
        _this.vis = true;
        _this.id = _id;
        _this.move = _move;
        _this.skinName = "BuildSkin";
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, _this.removeMove, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        return _this;
    }
    Build.prototype.gameStart = function () {
        // this.ani.play();
        // this.ani_1.play();
        egret.Tween.resumeTweens(this);
    };
    Build.prototype.gamePause = function () {
        // this.ani.stop();
        // this.ani_1.stop();
        egret.Tween.pauseTweens(this);
    };
    Build.prototype.removeMove = function () {
        if (this.move) {
            this.removeMySelf();
        }
    };
    Build.prototype.init = function () {
        var _this = this;
        if (this.id == 10008) {
            this.ta_img.visible = true;
        }
        else {
            this.ani = new MovieClip();
            egret.Tween.get(this)
                .wait(Math.floor(Math.random() * 100))
                .call(function () {
                _this.ani.playFile(EFFECT + "role_10009", -1, null, false, "stand_right");
            });
            this.ani.scaleX = this.ani.scaleY = 0.5;
            this.addChild(this.ani);
        }
        this.card = GlobalFun.getCardDataFromId(this.id);
        this.hp_max = this.hp = this.card.hp;
        this.attack = this.card.atk;
    };
    Build.prototype.setStand = function () {
        this.ani.playFile(EFFECT + "role_10009", -1, null, false, "stand_right");
    };
    Build.prototype.setAttack = function () {
        this.ani.playFile(EFFECT + "role_10009", 1, null, false, "attack_right");
    };
    Build.prototype.setRun = function (str) {
        this.ani.playFile(EFFECT + "role_10009", -1, null, false, "run_" + str);
    };
    Build.prototype.setData = function (_hp, _attack) {
        this.hp_max = this.hp = _hp;
        this.attack = _attack;
    };
    Build.prototype.setHp = function (_num) {
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
    Build.prototype.die = function () {
        var _this = this;
        if (this.id == 10008) {
            this.removeMySelf();
        }
        else {
            this.ani.playFile(EFFECT + "role_" + this.id, 1, null, false, "die_right");
            egret.Tween.get(this)
                .wait(1500)
                .call(function () {
                _this.removeMySelf();
            });
        }
    };
    Build.prototype.addHp = function (_num) {
        this.ani_1 = new MovieClip();
        this.ani_1.x = -this.ani_1.width / 2;
        this.ani_1.y = -this.ani_1.height / 2;
        this.addChild(this.ani_1);
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
        if (this.hp >= this.card.hp) {
            this.hp = this.card.hp;
        }
    };
    Build.prototype.getAttack = function () {
        return this.attack;
    };
    Build.prototype.getHp = function () {
        return this.hp;
    };
    Build.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return Build;
}(BaseView));
__reflect(Build.prototype, "Build");
//# sourceMappingURL=Build.js.map