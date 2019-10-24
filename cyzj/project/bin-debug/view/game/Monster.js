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
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(_priority, _id, _x, _y, _nx, _ny) {
        var _this = _super.call(this) || this;
        _this.id = 1;
        _this.moveBool = false;
        _this.distance = 150 + Math.random() * 100;
        _this.speedX = Math.floor(Math.random() * 10 + 5);
        _this.speedY = 2;
        _this.dead = false;
        _this.id = _id;
        _this.nx = _nx;
        _this.ny = _ny;
        _this.x = _x;
        _this.y = _y;
        _this.priority = _priority;
        _this.init();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        MessageManager.inst().addListener("MONSTER_HURT", _this.subHp, _this);
        return _this;
    }
    Monster.prototype.init = function () {
        var _this = this;
        this.mc = new MovieClip();
        this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, -1, null, false, "run", null, 13);
        this.addChild(this.mc);
        this.mc_hurt = new MovieClip();
        this.mc_hurt.scaleX = this.mc_hurt.scaleY = 0.6;
        this.mc_hurt.y = -30;
        this.addChild(this.mc_hurt);
        egret.Tween.get(this)
            .to({ x: this.nx + 150, y: this.ny }, 1000)
            .call(function () {
            _this.mc.playFile("resource/res/view/game/monster/monster_" + _this.id, -1, null, false, "idle", null, 13);
            egret.Tween.get(_this)
                .wait(500)
                .call(function () {
                _this.setPos();
            });
        });
        var hp_num;
        if (this.id < 6) {
            hp_num = Math.floor(GameConfig.roleData[this.id - 1].hp / 3);
            this.attack_num = Math.floor(GameConfig.roleData[this.id - 1].atk / 8);
        }
        else {
            hp_num = Math.floor(GameConfig.roleData[this.id - 1 - 5].hp / 3);
            this.attack_num = Math.floor(GameConfig.roleData[this.id - 1 - 5].atk / 8);
        }
        this.hp = new MonsterHp(hp_num);
        switch (this.id) {
            case 1:
            case 9:
                this.hp.x = -this.hp.width / 2;
                this.hp.y = -80;
                break;
            case 2:
                this.hp.x = -this.hp.width / 2;
                this.hp.y = -70;
                break;
            case 3:
                this.hp.x = -this.hp.width / 2;
                this.hp.y = -100;
                break;
            case 4:
                this.hp.x = -this.hp.width / 2;
                this.hp.y = -90;
                break;
            case 5:
                this.hp.x = -this.hp.width / 2;
                this.hp.y = -130;
                break;
            case 6:
            case 8:
                this.hp.x = -this.hp.width / 2;
                this.hp.y = -50;
                break;
            case 7:
                this.hp.x = -this.hp.width / 2 - 15;
                this.hp.y = -90;
                break;
        }
        this.addChild(this.hp);
    };
    Monster.prototype.update = function () {
        var _this = this;
        if (this.role == null) {
            this.chooseTarget();
        }
        else if (this.role != null && this.role.dead == true) {
            this.chooseTarget();
            this.setPos();
        }
        /**移动 */
        if (this.moveBool) {
            // this.y += this.speedY;
            // if(Math.abs(this.y - this.role.y) <= 15)
            // {
            // 	this.speedY = 0;
            // }
            if (this.x > this.role.x + this.distance) {
                this.x -= this.speedX;
            }
            if (this.x <= this.role.x + this.distance) {
                this.moveBool = false;
                this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, Math.floor(Math.random() * 4 + 3), function () { _this.attack(); }, false, "idle", null, 13);
            }
        }
    };
    /**伤害 */
    Monster.prototype.subHp = function (evt) {
        var _this = this;
        if (evt.data[0] == "all") {
            MessageManager.inst().dispatch("HURT_FONT", { any: this, hurt: evt.data[1] + 70 });
            this.mc_hurt.visible = true;
            this.mc_hurt.playFile("resource/res/view/game/monster_hurt_effect", 1, null, false, "", null, 15);
            setTimeout(function () { _this.mc_hurt.visible = false; }, 800);
            this.hp.setHp(evt.data[1]);
            if (this.hp.getHp() <= 0) {
                this.dead = true;
                this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, 1, function () { _this.removeMySelf(); }, false, "dead", null, 13);
            }
        }
        else if (this == evt.data[0]) {
            /**伤害字体 */
            MessageManager.inst().dispatch("HURT_FONT", { any: this, hurt: evt.data[1] });
            this.mc_hurt.visible = true;
            this.mc_hurt.playFile("resource/res/view/game/monster_hurt_effect", 1, null, false, "", null, 15);
            setTimeout(function () { _this.mc_hurt.visible = false; }, 800);
            this.hp.setHp(evt.data[1]);
            if (this.hp.getHp() <= 0) {
                this.dead = true;
                this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, 1, function () { _this.removeMySelf(); }, false, "dead", null, 13);
            }
        }
    };
    /**选择目标 */
    Monster.prototype.chooseTarget = function () {
        if (GameConfig.player_qian.length > 0) {
            this.role = GameConfig.player_qian[Math.floor(Math.random() * GameConfig.player_qian.length)];
        }
        else if (GameConfig.player_hou.length > 0) {
            this.role = GameConfig.player_hou[Math.floor(Math.random() * GameConfig.player_hou.length)];
        }
    };
    /**靠近目标 */
    Monster.prototype.setPos = function () {
        this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, -1, null, false, "run", null, 13);
        this.moveBool = true;
        this.speedY = (this.y < this.role.y) ? -this.speedY : this.speedY;
    };
    /**攻击 */
    Monster.prototype.attack = function () {
        var _this = this;
        this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, 1, function () { _this.idle(); }, false, "attack", null, 13);
        setTimeout(function () {
            MessageManager.inst().dispatch("PLAYER_HURT", [_this.role, _this.attack_num + Math.floor(Math.random() * 10 - 5)]);
        }, 200);
    };
    /**站立 */
    Monster.prototype.idle = function () {
        var _this = this;
        this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, Math.floor(Math.random() * 4 + 3), function () { _this.attack(); }, false, "idle", null, 13);
    };
    Monster.prototype.removeMySelf = function () {
        MessageManager.inst().removeListener("MONSTER_HURT", this.subHp, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.mc.destroy();
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return Monster;
}(egret.Sprite));
__reflect(Monster.prototype, "Monster");
//# sourceMappingURL=Monster.js.map