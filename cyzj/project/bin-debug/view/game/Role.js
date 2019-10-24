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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role(_id, _x, _y, _nx, _ny) {
        var _this = _super.call(this) || this;
        _this.id = 1;
        _this.dead = false;
        _this.monster = null;
        _this.speedX = Math.floor(Math.random() * 10 + 5);
        _this.speedY = Math.floor(Math.random() * 5 + 5);
        _this.moveBool = false;
        _this.id = _id;
        _this.nx = _nx;
        _this.ny = _ny;
        _this.x = _x;
        _this.y = _y;
        _this.init();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        MessageManager.inst().addListener("PLAYER_PLACE", _this.place, _this);
        MessageManager.inst().addListener("PLAYER_HURT", _this.playerHurt, _this);
        MessageManager.inst().addListener("PLAYER_SKILL", _this.playerSkill, _this);
        MessageManager.inst().addListener("ROLE_ADDHP", _this.addHp, _this);
        MessageManager.inst().addListener("HU_DUN", _this.shield, _this);
        MessageManager.inst().addListener("GAME_OVER", _this.gameOver, _this);
        MessageManager.inst().addListener("ROLE_SKILL_NAME", _this.skillName, _this);
        return _this;
    }
    Role.prototype.init = function () {
        var _this = this;
        if (this.id == 1 || this.id == 2 || this.id == 5) {
            this.priority = 0;
            this.distance = 150;
        }
        else {
            this.priority = 1;
            this.distance = 300;
        }
        this.mc = new MovieClip();
        this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
        this.addChild(this.mc);
        this.mc_skill = new MovieClip();
        this.addChild(this.mc_skill);
        this.mc_buff = new MovieClip();
        this.addChild(this.mc_buff);
        this.mc_hurt = new MovieClip();
        this.mc_hurt.scaleX = this.mc_hurt.scaleY = 0.7;
        this.mc_hurt.x = -10;
        this.mc_hurt.y = -50;
        this.addChild(this.mc_hurt);
        egret.Tween.get(this)
            .to({ x: this.nx - 100, y: this.ny }, 1000)
            .call(function () {
            _this.mc.playFile("resource/res/view/game/role/role_" + _this.id, -1, null, false, "idle", null, 13);
            setTimeout(_this.setPos(), 500);
        });
        this.hp = new Hp(GameConfig.roleData[this.id].hp, GameConfig.roleData[this.id].level);
        this.hp.x = -this.hp.width / 2;
        this.hp.y = -130;
        this.addChild(this.hp);
        this.roleName = new TextEffect(GameApp.roleData[this.id - 1].name, 0xF2A909, 1);
        this.roleName.x = -this.roleName.width / 2;
        this.roleName.y = -170;
        this.addChild(this.roleName);
    };
    /**伤害 */
    Role.prototype.playerHurt = function (evt) {
        var _this = this;
        if (evt.data[0] == this) {
            /**伤害字体 */
            MessageManager.inst().dispatch("HURT_FONT", { any: this, hurt: evt.data[1] });
            this.mc_hurt.visible = true;
            this.mc_hurt.playFile("resource/res/view/game/player_hurt_effect", 1, null, false, "", null, 15);
            setTimeout(function () { _this.mc_hurt.visible = false; }, 800);
            this.hp.setHp(evt.data[1]);
            if (this.hp.getHp() <= 0) {
                this.dead = true;
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.removeMySelf(); }, false, "dead", null, 10);
            }
        }
    };
    Role.prototype.gameOver = function () {
        egret.Tween.removeTweens(this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        MessageManager.inst().removeListener("PLAYER_PLACE", this.place, this);
        MessageManager.inst().removeListener("PLAYER_HURT", this.playerHurt, this);
        MessageManager.inst().removeListener("PLAYER_SKILL", this.playerSkill, this);
        MessageManager.inst().removeListener("ROLE_ADDHP", this.addHp, this);
        MessageManager.inst().removeListener("HU_DUN", this.shield, this);
        MessageManager.inst().removeListener("GAME_OVER", this.gameOver, this);
        MessageManager.inst().removeListener("ROLE_SKILL_NAME", this.skillName, this);
    };
    Role.prototype.update = function () {
        var _this = this;
        if (this.monster == null) {
            this.chooseTarget();
        }
        else if (this.monster != null && this.monster.dead == true && GameConfig.monsterFig.length > 0) {
            this.chooseTarget();
            setTimeout(function () {
                _this.setPos();
            }, 400);
        }
        /**移动 */
        if (this.moveBool) {
            // this.y += this.speedY;
            // if(Math.abs(this.y - this.monster.y) <= 15)
            // {
            // 	this.speedY = 0;
            // }
            if (!this.monster) {
                return;
            }
            if (this.x < this.monster.x - this.distance) {
                this.x += this.speedX;
            }
            if (this.x >= this.monster.x - this.distance) {
                this.moveBool = false;
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 3, function () { _this.attack(); }, false, "idle", null, 13);
            }
        }
    };
    /**选择目标 */
    Role.prototype.chooseTarget = function () {
        if (GameConfig.monster_qian.length > 0) {
            this.monster = GameConfig.monster_qian[Math.floor(Math.random() * GameConfig.monster_qian.length)];
        }
        else if (GameConfig.monster_zhong.length > 0) {
            this.monster = GameConfig.monster_zhong[Math.floor(Math.random() * GameConfig.monster_zhong.length)];
        }
        else if (GameConfig.monster_hou.length > 0) {
            this.monster = GameConfig.monster_hou[Math.floor(Math.random() * GameConfig.monster_hou.length)];
        }
    };
    /**靠近目标 */
    Role.prototype.setPos = function () {
        this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
        this.moveBool = true;
    };
    /**攻击 */
    Role.prototype.attack = function () {
        var _this = this;
        this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.idle(); }, false, "attack", null, 13);
        setTimeout(function () {
            MessageManager.inst().dispatch("MONSTER_HURT", [_this.monster, GameConfig.roleData[_this.id].atk + Math.floor(Math.random() * 40 - 20)]);
            MessageManager.inst().dispatch("NUQI", _this.id);
        }, 200);
    };
    /**站立 */
    Role.prototype.idle = function () {
        var _this = this;
        this.mc.playFile("resource/res/view/game/role/role_" + this.id, 2, function () { _this.attack(); }, false, "idle", null, 13);
    };
    /**归位 */
    Role.prototype.place = function () {
        var _this = this;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.scaleX = -1;
        this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
        this.moveBool = false;
        egret.Tween.get(this)
            .to({ x: this.nx - 100, y: this.ny }, 500)
            .call(function () {
            _this.scaleX = 1;
            MessageManager.inst().dispatch("NEXT_ROUND", _this);
            _this.monster = null;
            _this.mc.playFile("resource/res/view/game/role/role_" + _this.id, -1, null, false, "run", null, 13);
            egret.Tween.get(_this)
                .wait(1500)
                .call(function () {
                _this.mc.playFile("resource/res/view/game/role/role_" + _this.id, -1, null, false, "idle", null, 13);
            })
                .wait(500)
                .call(function () {
                _this.chooseTarget();
                _this.setPos();
                _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            });
        });
    };
    /**技能名字 */
    Role.prototype.skillName = function (evt) {
        if (evt.data.id == this.id) {
            var skill = new TextEffect(evt.data.name, evt.data.color, 0);
            skill.x = -skill.width / 2;
            this.addChild(skill);
        }
    };
    /**释放技能 */
    Role.prototype.playerSkill = function (evt) {
        var _this = this;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        if (this.id == evt.data) {
            if (this.id == 1) {
                setTimeout(function () {
                    MessageManager.inst().dispatch("MONSTER_HURT", [_this.monster, GameConfig.roleData[_this.id].atk + 50]);
                }, 500);
                MessageManager.inst().dispatch("ROLE_SKILL_NAME", { name: GameApp.roleData[this.id - 1].skillName, color: 0xff0000, id: this.id });
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.idle(); _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this); }, false, "skill", null, 10);
            }
            else if (this.id == 2) {
                /**护盾 */
                MessageManager.inst().dispatch("HU_DUN", this);
                this.mc_skill.visible = true;
                MessageManager.inst().dispatch("ROLE_SKILL_NAME", { name: GameApp.roleData[this.id - 1].skillName, color: 0xE5AD16, id: this.id });
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.idle(); _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this); }, false, "skill", null, 10);
                this.mc_skill.playFile("resource/res/view/game/role/role_effect_" + this.id, 1, null, false, "", null, 10);
                setTimeout(function () {
                    _this.mc_skill.visible = false;
                }, 800);
                this.mc_skill.y = -50;
                this.mc_skill.x = 50;
            }
            else if (this.id == 3) {
                /**法师技能 */
                MessageManager.inst().dispatch("FASHI_EFFECT", this);
                MessageManager.inst().dispatch("ROLE_SKILL_NAME", { name: GameApp.roleData[this.id - 1].skillName, color: 0x0843A5, id: this.id });
                this.mc.y = -50;
                this.mc.x = -50;
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.idle(); _this.mc.x = 0; _this.mc.y = 0; _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this); }, false, "skill", null, 8);
            }
            else if (this.id == 4) {
                /**加血 */
                MessageManager.inst().dispatch("ROLE_ADDHP", this);
                MessageManager.inst().dispatch("ROLE_SKILL_NAME", { name: GameApp.roleData[this.id - 1].skillName, color: 0x00ff00, id: this.id });
                this.mc_skill.visible = true;
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.idle(); _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this); }, false, "skill", null, 13);
                this.mc_skill.playFile("resource/res/view/game/role/role_effect_" + this.id, 1, null, false, "", null, 8);
                this.mc_skill.y = -80;
                setTimeout(function () {
                    _this.mc_skill.visible = false;
                }, 800);
            }
            else if (this.id == 5) {
                MessageManager.inst().dispatch("MONSTER_HURT", [this.monster, GameConfig.roleData[this.id].atk + 50]);
                MessageManager.inst().dispatch("ROLE_SKILL_NAME", { name: GameApp.roleData[this.id - 1].skillName, color: 0xCE0808, id: this.id });
                this.mc.y = 200;
                this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, function () { _this.idle(); _this.mc.y = 0; _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this); }, false, "skill", null, 10);
            }
        }
    };
    /**增加护盾 */
    Role.prototype.shield = function () {
        var _this = this;
        this.mc_buff.visible = true;
        this.mc_buff.playFile("resource/res/view/game/huDun", 1, null, false, "", null, 10);
        this.mc_buff.x = -135;
        this.mc_buff.y = -100;
        setTimeout(function () {
            _this.mc_buff.visible = false;
        }, 800);
    };
    /**加血 */
    Role.prototype.addHp = function () {
        var _this = this;
        this.mc_buff.visible = true;
        this.mc_buff.playFile("resource/res/view/game/add_xue", 1, null, false, "", null, 10);
        this.mc_buff.x = -15;
        this.mc_buff.y = 30;
        this.hp.addHp(50);
        setTimeout(function () {
            _this.mc_buff.visible = false;
        }, 800);
    };
    Role.prototype.setSkill = function () {
        this.mc_skill.visible = false;
        this.mc.visible = true;
    };
    Role.prototype.removeMySelf = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        MessageManager.inst().removeListener("PLAYER_PLACE", this.place, this);
        MessageManager.inst().removeListener("PLAYER_HURT", this.playerHurt, this);
        MessageManager.inst().removeListener("PLAYER_SKILL", this.playerSkill, this);
        MessageManager.inst().removeListener("ROLE_ADDHP", this.addHp, this);
        this.mc.destroy();
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return Role;
}(egret.Sprite));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map