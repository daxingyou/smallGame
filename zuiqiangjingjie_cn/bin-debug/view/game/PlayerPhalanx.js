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
var PlayerPhalanx = (function (_super) {
    __extends(PlayerPhalanx, _super);
    function PlayerPhalanx(_id) {
        var _this = _super.call(this) || this;
        _this.soldierQian = [];
        _this.soldierHou = [];
        _this.haveObj = false;
        _this.round = 0;
        _this.have = false;
        _this.id = _id;
        _this.skinName = "PlayerPhalanxSkin";
        MessageManager.inst().addListener(LocalStorageEnum.CREATE_PLAYER, _this.createRole, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GO_FIGHTING, _this.goFihgt, _this);
        MessageManager.inst().addListener(LocalStorageEnum.PLAYER_SUBHP, _this.subHp, _this);
        MessageManager.inst().addListener(LocalStorageEnum.PLAYER_FIGHTING, _this.fighting_p, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.RELEASE_SKILLS, _this.createSkill, _this);
        _this.qian_rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchQian, _this);
        _this.hou_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchHou, _this);
        _this.role_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchWJ, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        _this.bg.source = "fight_bg" + _this.id + "_png";
        return _this;
    }
    PlayerPhalanx.prototype.createRole = function (evt) {
        switch (evt.data[0].type) {
            case "player":
                switch (evt.data[0].id) {
                    case 1:
                        this.create(1, evt.data[0].x, evt.data[0].y);
                        break;
                    case 2:
                        this.create(2, evt.data[0].x, evt.data[0].y);
                        break;
                    case 3:
                        this.create(3, evt.data[0].x, evt.data[0].y);
                        break;
                    default:
                        this.createWJ(evt.data[0].id, evt.data[0].x, evt.data[0].y);
                        break;
                }
                break;
            case "build":
                this.createBuild(evt.data[0].id, evt.data[0].x, evt.data[0].y);
                break;
        }
    };
    /**创建小兵 */
    PlayerPhalanx.prototype.create = function (_id, _x, _y) {
        var hit_qian = this.qian_rect.hitTestPoint(_x, _y);
        var hit_hou = this.hou_rect.hitTestPoint(_x, _y);
        if (hit_qian) {
            GameApp["soldier" + _id + "Num"] -= 20;
            if (this.soldierQian.length != 0) {
                if (egret.getQualifiedClassName(this.soldierQian[0]) == "Player") {
                    if (this.soldierQian[0].id == 1)
                        GameApp.soldier1Num += 20;
                    else if (this.soldierQian[0].id == 2)
                        GameApp.soldier2Num += 20;
                    else if (this.soldierQian[0].id == 3)
                        GameApp.soldier3Num += 20;
                }
                else if (egret.getQualifiedClassName(this.soldierQian[0]) == "Build") {
                    var card = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
                    GlobalFun.refreshCardData(card.insId, { ownNum: card.ownNum });
                    MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
                }
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = this.soldierQian[i].attack;
                    GameCfg.playerAttack -= attack;
                }
            }
            for (var i = 0; i < this.soldierQian.length; i++) {
                this.removeChild(this.soldierQian[i]);
            }
            this.soldierQian = [];
            for (var i = 0; i < 10; i++) {
                var role0 = new Player(_id, false);
                if (_id == 1)
                    role0.scaleX = role0.scaleY = 0.4;
                else
                    role0.scaleX = role0.scaleY = 0.5;
                if (i <= 4) {
                    if (_id != 1) {
                        role0.y = 70 + i * 20;
                        role0.x = 5 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (5 + this.id * 2);
                    }
                    else {
                        role0.y = 50 + i * 25;
                        role0.x = 20 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (6 + this.id * 3);
                    }
                }
                else {
                    if (_id != 1) {
                        role0.y = 100 + i * 20;
                        role0.x = 0 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (6 + this.id * 2);
                    }
                    else {
                        role0.y = 70 + i * 25;
                        role0.x = 15 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (6 + this.id * 3);
                    }
                }
                this.addChild(role0);
                this.soldierQian.push(role0);
                var role1 = new Player(_id, false);
                if (_id == 1)
                    role1.scaleX = role1.scaleY = 0.4;
                else
                    role1.scaleX = role1.scaleY = 0.5;
                if (i <= 4) {
                    if (_id != 1) {
                        role1.y = 70 + i * 20;
                        role1.x = 55 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (5 + this.id * 2);
                    }
                    else {
                        role1.y = 50 + i * 25;
                        role1.x = 60 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (6 + this.id * 3);
                    }
                }
                else {
                    if (_id != 1) {
                        role1.y = 100 + i * 20;
                        role1.x = 50 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (6 + this.id * 2);
                    }
                    else {
                        role1.y = 70 + i * 25;
                        role1.x = 50 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (6 + this.id * 3);
                    }
                }
                this.addChild(role1);
                this.soldierQian.push(role1);
            }
            if (this.soldierQian[0].id == 1 && this.id == 0) {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
                    this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
                    GameCfg.playerAttack += attack;
                }
            }
            else if (this.soldierQian[0].id == 3 && this.id == 1) {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
                    this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
                    GameCfg.playerAttack += attack;
                }
            }
            else if (this.soldierQian[0].id == 2 && this.id == 2) {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
                    this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
                    GameCfg.playerAttack += attack;
                }
            }
            else {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = this.soldierQian[i].attack;
                    GameCfg.playerAttack += attack;
                }
            }
            this.setlayer();
        }
    };
    /**创建将军 */
    PlayerPhalanx.prototype.createWJ = function (_id, _x, _y) {
        if (_y > this.y + this.height / 2 - 60 && _y < this.y + this.height / 2 + 60 && _x > this.x && _x < this.x + this.width) {
            for (var i = 0; i < GameCfg.wjAny.length; i++) {
                if (_id == GameCfg.wjAny[i]) {
                    UserTips.inst().showTips("不可重复使用");
                    return;
                }
            }
            if (this.wj) {
                var card_1 = GlobalFun.getCardDataFromId(this.wj.id);
                GlobalFun.refreshCardData(this.wj.id, { ownNum: card_1.ownNum });
                this.removeChild(this.wj);
                this.wj = null;
            }
            this.wj = new Player(_id, false);
            this.wj.scaleX = this.wj.scaleY = 0.5;
            this.wj.x = this.role_group.x + this.role_group.width / 2;
            this.wj.y = this.role_group.y + this.role_group.height / 2 + 30;
            this.addChild(this.wj);
            var card = GlobalFun.getCardDataFromId(_id);
            GlobalFun.refreshCardData(_id, { ownNum: card.ownNum });
            this.wj.touchEnabled = false;
            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
            GameCfg.wjAny.push(this.wj.id);
            this.setlayer();
        }
    };
    PlayerPhalanx.prototype.touchQian = function (evt) {
        if (GameCfg.gameStart) {
            return;
        }
        if (this.soldierQian.length > 0) {
            if (egret.getQualifiedClassName(this.soldierQian[0]) == "Player") {
                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, { card: this.soldierQian[0].id, x: evt.stageX, y: evt.stageY });
                GameApp["soldier" + this.soldierQian[0].id + "Num"] += 100;
            }
            else if (egret.getQualifiedClassName(this.soldierQian[0]) == "Build") {
                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_BUILD, { card: this.soldierQian[0].id, x: evt.stageX, y: evt.stageY });
                var card = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
                GlobalFun.refreshCardData(card.insId, { ownNum: card.ownNum });
            }
            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
            for (var i = 0; i < this.soldierQian.length; i++) {
                var attack = this.soldierQian[i].attack;
                GameCfg.playerAttack -= attack;
            }
            for (var i = 0; i < this.soldierQian.length; i++) {
                this.removeChild(this.soldierQian[i]);
            }
            this.soldierQian = [];
            this.setlayer();
        }
    };
    PlayerPhalanx.prototype.touchHou = function (evt) {
        if (GameCfg.gameStart) {
            return;
        }
        if (this.soldierHou.length > 0) {
            if (egret.getQualifiedClassName(this.soldierHou[0]) == "Player") {
                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, { card: this.soldierHou[0].id, x: evt.stageX, y: evt.stageY });
                GameApp["soldier" + this.soldierHou[0].id + "Num"] += 100;
            }
            else if (egret.getQualifiedClassName(this.soldierHou[0]) == "Build") {
                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_BUILD, { card: this.soldierHou[0].id, x: evt.stageX, y: evt.stageY });
                var card = GlobalFun.getCardDataFromId(this.soldierHou[0].id);
                GlobalFun.refreshCardData(card.insId, { ownNum: card.ownNum });
            }
            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
            for (var i = 0; i < this.soldierHou.length; i++) {
                this.removeChild(this.soldierHou[i]);
            }
            this.soldierHou = [];
            this.setlayer();
        }
    };
    PlayerPhalanx.prototype.touchWJ = function (evt) {
        if (GameCfg.gameStart) {
            return;
        }
        if (this.wj) {
            MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, { card: this.wj.id, x: evt.stageX, y: evt.stageY });
            var card = GlobalFun.getCardDataFromId(this.wj.id);
            GlobalFun.refreshCardData(this.wj.id, { ownNum: card.ownNum });
            for (var i = 0; i < GameCfg.wjAny.length; i++) {
                if (this.wj.id == GameCfg.wjAny[i]) {
                    GameCfg.wjAny.splice(i, 1);
                    i--;
                }
            }
            this.removeChild(this.wj);
            this.wj = null;
            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
            this.setlayer();
        }
    };
    /**创建建筑物 */
    PlayerPhalanx.prototype.createBuild = function (_id, _x, _y) {
        var hit_qian = this.qian_rect.hitTestPoint(_x, _y);
        var hit_hou = this.hou_rect.hitTestPoint(_x, _y);
        if (hit_qian) {
            if (this.soldierQian.length != 0) {
                if (egret.getQualifiedClassName(this.soldierQian[0]) == "Player") {
                    if (this.soldierQian[0].id == 1)
                        GameApp.soldier1Num += 20;
                    else if (this.soldierQian[0].id == 2)
                        GameApp.soldier2Num += 20;
                    else if (this.soldierQian[0].id == 3)
                        GameApp.soldier3Num += 20;
                }
                else if (egret.getQualifiedClassName(this.soldierQian[0]) == "Build") {
                    var card_2 = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
                    GlobalFun.refreshCardData(card_2.insId, { ownNum: card_2.ownNum });
                }
            }
            for (var i = 0; i < this.soldierQian.length; i++) {
                this.removeChild(this.soldierQian[i]);
            }
            this.soldierQian = [];
            for (var i = 0; i < 4; i++) {
                var build = new Build(_id, false);
                if (i <= 1) {
                    build.y = 70 + i * 50;
                    build.x = this.qian_group.x + this.qian_group.width / 2 - 20 - i * 15 + (this.id * 5);
                }
                else {
                    build.y = 130 + i * 50;
                    build.x = this.qian_group.x + this.qian_group.width / 2 - 30 - i * 15 + (this.id * 1);
                }
                this.addChild(build);
                this.soldierQian.push(build);
                // let build0 = new Build(_id, false);
                // if(i <= 1)
                // {
                // 	build0.y = 70 + i * 50;
                // 	build0.x = 50 + this.hou_group.x + this.hou_group.width / 2 - i * (20 + this.id * 10) - (10 + this.id * 5);
                // }
                // else
                // {	
                // 	build0.y = 120 + i * 50;
                // 	build0.x = 50 + this.hou_group.x + this.hou_group.width / 2 - i * (20 + this.id * 10) - (10 + this.id * 5);
                // }
                // this.addChild(build0);
                // this.soldierQian.push(build0);
            }
            this.setlayer();
            var card = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
            GlobalFun.refreshCardData(card.insId, { ownNum: card.ownNum });
            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
        }
    };
    PlayerPhalanx.prototype.goFihgt = function () {
        var _this = this;
        if (this.wj) {
            var card = GlobalFun.getCardDataFromId(this.wj.id);
            var level = card.level;
            switch (this.wj.id) {
                /**高级将军 */
                case 10000:
                case 10001:
                case 10002:
                    for (var i = 0; i < this.soldierQian.length; i++) {
                        var hp = Math.floor(this.soldierQian[i].getData().hp + (0.3 + level * 0.05) * this.soldierQian[i].getData().hp);
                        var attack = Math.floor(this.soldierQian[i].getData().attack + (0.3 + level * 0.05) * this.soldierQian[i].getData().attack);
                        this.soldierQian[i].setData(hp, attack);
                    }
                    break;
                /**低级将军 */
                default:
                    for (var i = 0; i < this.soldierQian.length; i++) {
                        var hp = Math.floor(this.soldierQian[i].getData().hp + (0.2 + level * 0.05) * this.soldierQian[i].getData().hp);
                        var attack = Math.floor(this.soldierQian[i].getData().attack + (0.2 + level * 0.05) * this.soldierQian[i].getData().attack);
                        this.soldierQian[i].setData(hp, attack);
                    }
                    break;
            }
        }
        for (var i = 0; i < this.soldierQian.length; i++) {
            GameCfg.playerPH += this.soldierQian[i].getHp();
        }
        for (var i = 0; i < this.soldierHou.length; i++) {
            GameCfg.playerPH += this.soldierHou[i].getHp();
        }
        GameCfg.playerPH_max = GameCfg.playerPH;
        console.log(GameCfg.playerPH_max);
        if (this.id == 0) {
            egret.Tween.get(this)
                .to({ x: 150 }, 500)
                .wait(300)
                .call(function () {
                _this.fighting();
            });
        }
        else {
            egret.Tween.get(this)
                .to({ x: -300 }, 500);
        }
    };
    PlayerPhalanx.prototype.fighting_p = function () {
        var _this = this;
        setTimeout(function () {
            _this.fighting();
        }, 500);
    };
    PlayerPhalanx.prototype.fighting = function () {
        var _this = this;
        if (this.id != 0) {
            return;
        }
        var str = "";
        str = "Qian";
        if (this["soldier" + str].length <= 0) {
            this.fighting();
        }
        else {
            switch (this["soldier" + str][0].id) {
                case 1: /**骑兵 */
                case 3:/**步兵 */ 
                    var _x = void 0;
                    if (GameCfg.np[0].soldierQian.length > 0) {
                        var _x0 = GameCfg.np[0].localToGlobal(GameCfg.np[0].qian_group.x, GameCfg.np[0].qian_group.y);
                        _x = this.globalToLocal(_x0.x, _x0.y).x;
                    }
                    else {
                        var _x0 = GameCfg.np[0].localToGlobal(GameCfg.np[0].hou_group.x, GameCfg.np[0].hou_group.y);
                        _x = this.globalToLocal(_x0.x, _x0.y).x;
                    }
                    var _loop_1 = function (i) {
                        egret.Tween.get(this_1["soldier" + str][i])
                            .wait(Math.floor(Math.random() * 100))
                            .call(function () {
                            if (_this["soldier" + str][i])
                                _this["soldier" + str][i].setRun("right");
                        }, this_1["soldier" + str][i])
                            .to({ x: _x + i * (5 + this_1.id * 3) - 30 }, 500)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                _this["soldier" + str][i].setAttack();
                        }, this_1["soldier" + str][i])
                            .wait(250)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, _this["soldier" + str][i].getAttack());
                        })
                            .wait(300)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                _this["soldier" + str][i].setRun("left");
                        }, this_1["soldier" + str][i])
                            .to({ x: this_1["soldier" + str][i].x }, 500)
                            .call(function () {
                            if (_this["soldier" + str][i]) {
                                _this["soldier" + str][i].setStand();
                                egret.Tween.removeTweens(_this["soldier" + str][i]);
                            }
                        }, this_1["soldier" + str][i]);
                    };
                    var this_1 = this;
                    for (var i = 0; i < this["soldier" + str].length; i++) {
                        _loop_1(i);
                    }
                    egret.Tween.get(this)
                        .wait(1700)
                        .call(function () {
                        egret.Tween.removeTweens(_this);
                        MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, _this);
                    });
                    break;
                case 2:/**弓兵 */ 
                    var _loop_2 = function (i) {
                        egret.Tween.get(this_2["soldier" + str][i])
                            .wait(Math.floor(Math.random() * 100))
                            .call(function () {
                            if (_this["soldier" + str][i])
                                _this["soldier" + str][i].setAttack();
                        }, this_2["soldier" + str][i])
                            .wait(150)
                            .call(function () {
                            if (_this["soldier" + str][i]) {
                                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, { type: "player", x: _this["soldier" + str][i].x, y: _this["soldier" + str][i].y, img: "game_arrow0_png" });
                                _this["soldier" + str][i].setStand();
                            }
                        })
                            .wait(700)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, _this["soldier" + str][i].getAttack());
                        })
                            .to({ x: this_2["soldier" + str][i].x }, 500)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                egret.Tween.removeTweens(_this["soldier" + str][i]);
                        }, this_2["soldier" + str][i]);
                    };
                    var this_2 = this;
                    for (var i = 0; i < this["soldier" + str].length; i++) {
                        _loop_2(i);
                    }
                    egret.Tween.get(this)
                        .wait(1500)
                        .call(function () {
                        egret.Tween.removeTweens(_this);
                        MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, _this);
                    });
                    break;
                case 10008:/**箭塔 */ 
                    var _loop_3 = function (i) {
                        egret.Tween.get(this_3["soldier" + str][i])
                            .wait(Math.floor(Math.random() * 100))
                            .call(function () { })
                            .wait(50)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, { type: "player", x: _this["soldier" + str][i].x, y: _this["soldier" + str][i].y, img: "game_arrow2_png" });
                        })
                            .wait(500)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, _this["soldier" + str][i].getAttack());
                        })
                            .wait(500)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                egret.Tween.removeTweens(_this["soldier" + str][i]);
                        }, this_3["soldier" + str][i]);
                    };
                    var this_3 = this;
                    for (var i = 0; i < this["soldier" + str].length; i++) {
                        _loop_3(i);
                    }
                    egret.Tween.get(this)
                        .wait(1200)
                        .call(function () {
                        egret.Tween.removeTweens(_this);
                        MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, _this);
                    });
                    break;
                case 10009:/**投石车 */ 
                    var _loop_4 = function (i) {
                        egret.Tween.get(this_4["soldier" + str][i])
                            .wait(Math.floor(Math.random() * 100))
                            .call(function () {
                            if (_this["soldier" + str][i])
                                _this["soldier" + str][i].setAttack();
                        }, this_4["soldier" + str][i])
                            .wait(150)
                            .call(function () {
                            if (_this["soldier" + str][i]) {
                                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, { type: "player", x: _this["soldier" + str][i].x, y: _this["soldier" + str][i].y, img: "game_arrow1_png" });
                                _this["soldier" + str][i].setStand();
                            }
                        })
                            .wait(700)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, _this["soldier" + str][i].getAttack());
                        })
                            .wait(500)
                            .call(function () {
                            if (_this["soldier" + str][i])
                                egret.Tween.removeTweens(_this["soldier" + str][i]);
                        }, this_4["soldier" + str][i]);
                    };
                    var this_4 = this;
                    for (var i = 0; i < this["soldier" + str].length; i++) {
                        _loop_4(i);
                    }
                    egret.Tween.get(this)
                        .wait(1500)
                        .call(function () {
                        egret.Tween.removeTweens(_this);
                        MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, _this);
                    });
                    break;
            }
        }
    };
    PlayerPhalanx.prototype.gamePause = function () {
        egret.Tween.pauseTweens(this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    PlayerPhalanx.prototype.gameStart = function () {
        egret.Tween.resumeTweens(this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    PlayerPhalanx.prototype.update = function () {
        if (this.soldierQian.length <= 0 && this.soldierHou.length <= 0) {
            this.haveObj = false;
            this.have = false;
        }
        else {
            this.haveObj = true;
            this.have = true;
        }
    };
    /**设置图层 */
    PlayerPhalanx.prototype.setlayer = function () {
        var layerAny = [];
        if (this.soldierQian.length > 0) {
            for (var i = 0; i < this.soldierQian.length; i++) {
                layerAny.push(this.soldierQian[i]);
            }
        }
        if (this.soldierHou.length > 0) {
            for (var i = 0; i < this.soldierHou.length; i++) {
                layerAny.push(this.soldierHou[i]);
            }
        }
        if (this.wj) {
            layerAny.push(this.wj);
        }
        /**排序 */
        var n = layerAny.length;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n - i - 1; j++) {
                if (layerAny[j].y > layerAny[j + 1].y) {
                    var any = layerAny[j];
                    layerAny[j] = layerAny[j + 1];
                    layerAny[j + 1] = any;
                }
            }
        }
        this.setChildIndex(this.bg, 0);
        for (var i = 0; i < layerAny.length; i++) {
            this.setChildIndex(layerAny[i], i + 1);
        }
    };
    PlayerPhalanx.prototype.subHp = function (evt) {
        if (this.id != 0)
            return;
        if (this.soldierQian.length > 0) {
            var num = void 0;
            var any = this.soldierQian[Math.floor(Math.random() * this.soldierQian.length)];
            num = evt.data + Math.floor(evt.data * (Math.random() * 0.4 - 0.2));
            ;
            any.setHp(num);
            var hurt = new Hurt(num);
            hurt.x = any.x;
            hurt.y = any.y;
            this.addChildAt(hurt, 99999999);
        }
        else if (this.soldierHou.length > 0) {
            var num = void 0;
            var any = this.soldierHou[Math.floor(Math.random() * this.soldierHou.length)];
            num = evt.data + Math.floor(evt.data * (Math.random() * 0.4 - 0.2));
            ;
            any.setHp(num);
            var hurt = new Hurt(num);
            hurt.x = any.x;
            hurt.y = any.y;
            this.addChildAt(hurt, 99999999);
        }
        for (var i = 0; i < this.soldierQian.length; i++) {
            if (this.soldierQian[i].vis == false) {
                this.soldierQian[i].die();
                this.soldierQian.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < this.soldierHou.length; i++) {
            if (this.soldierHou[i].vis == false) {
                this.soldierHou[i].die();
                this.soldierHou.splice(i, 1);
                i--;
            }
        }
        if (this.soldierQian.length <= 0 && this.soldierHou.length <= 0) {
            this.haveObj = false;
            MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
            MessageManager.inst().dispatch(LocalStorageEnum.SWITCH_PLAPER, this);
            MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_FIGHTING, this.fighting_p, this);
            MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_SUBHP, this.subHp, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
            egret.Tween.removeTweens(this);
            this.removeMySelf();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
    };
    PlayerPhalanx.prototype.createSkill = function (evt) {
        var _this = this;
        if (evt.data[0].x >= this.x && evt.data[0].x <= this.x + this.width && evt.data[0].y >= this.y && evt.data[0].y <= this.y + this.height) {
            switch (evt.data[0].id) {
                /**加血 */
                case 100101:
                case 100102:
                case 100103:
                case 100104:
                    if (GameCfg.gameStart) {
                        this.showEff(evt.data[0].id, function () {
                            _this.addHp("Qian", evt.data[0].id);
                        });
                    }
                    else {
                        UserTips.inst().showTips("当前不可使用");
                    }
                    break;
            }
        }
    };
    PlayerPhalanx.prototype.showEff = function (_id, cb) {
        var rect = new eui.Rect();
        rect.fillColor = 0x000000;
        rect.width = StageUtils.inst().getWidth();
        rect.height = StageUtils.inst().getHeight();
        rect.alpha = 0.3;
        LayerManager.UI_Main.addChild(rect);
        var group = new eui.Group();
        LayerManager.UI_Main.addChild(group);
        group.scaleX = group.scaleY = 0.8;
        group.verticalCenter = 0;
        group.left = 100;
        var skillBg = new eui.Image("skill_eff_bg_png");
        group.addChild(skillBg);
        var mask = new eui.Rect();
        group.addChild(mask);
        mask.height = skillBg.height;
        mask.width = 0;
        skillBg.mask = mask;
        egret.Tween.get(mask).to({ width: skillBg.width }, 600).call(function () { egret.Tween.removeTweens(mask); }, this);
        var role = new eui.Image("skill_role_png");
        group.addChild(role);
        role.anchorOffsetX = role.width >> 1;
        role.anchorOffsetY = role.height;
        role.x = -50;
        role.y = skillBg.y + skillBg.height - 30;
        role.alpha = 0;
        egret.Tween.get(role).to({ x: 100, alpha: 1 }, 400, egret.Ease.circOut).to({ x: 140 }, 3000);
        var id = _id;
        var eff = "skill_eff_" + id.toString().substr(0, 5) + "_png";
        var img = new eui.Image(eff);
        img.alpha = 0;
        group.addChild(img);
        img.anchorOffsetY = img.height >> 1;
        img.verticalCenter = 0;
        img.x = skillBg.x + 450;
        egret.Tween.get(img).to({ x: skillBg.x + 240, alpha: 1 }, 400, egret.Ease.circOut).to({ x: skillBg.x + 200 }, 3000);
        var self = this;
        var timeout = setTimeout(function () {
            egret.Tween.removeTweens(img);
            egret.Tween.removeTweens(role);
            group.parent.removeChild(group);
            rect.parent.removeChild(rect);
            cb();
        }, 1000);
    };
    PlayerPhalanx.prototype.addHp = function (str, id) {
        var card = GlobalFun.getCardDataFromId(id);
        for (var i = 0; i < this["soldier" + str].length; i++) {
            this["soldier" + str][i].addHp(card.upgradeNum);
        }
        card.ownNum -= 1;
        GlobalFun.refreshCardData(id, { ownNum: card.ownNum });
        MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
    };
    PlayerPhalanx.prototype.setBg = function (_num) {
        switch (_num) {
            case 1:
                this.bg.source = "fight_bg" + this.id + "_png";
                break;
            case 2:
                this.bg.source = "fight_bg" + this.id + "_lv_png";
                break;
        }
    };
    PlayerPhalanx.prototype.removeMySelf = function () {
        for (var i = 0; i < this.soldierQian.length; i++) {
            this.removeChild(this.soldierQian[i]);
            this.soldierQian.splice(i, 1);
            i--;
        }
        this.soldierQian = [];
        if (this.wj) {
            this.removeChild(this.wj);
            this.wj = null;
        }
        MessageManager.inst().removeListener(LocalStorageEnum.CREATE_PLAYER, this.createRole, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
        MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_SUBHP, this.subHp, this);
        MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_FIGHTING, this.fighting_p, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
        MessageManager.inst().removeListener(LocalStorageEnum.RELEASE_SKILLS, this.createSkill, this);
        this.qian_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchQian, this);
        this.hou_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHou, this);
        this.role_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchWJ, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return PlayerPhalanx;
}(BaseView));
__reflect(PlayerPhalanx.prototype, "PlayerPhalanx");
//# sourceMappingURL=PlayerPhalanx.js.map