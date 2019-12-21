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
var NpcPhalanx = (function (_super) {
    __extends(NpcPhalanx, _super);
    function NpcPhalanx(_id) {
        var _this = _super.call(this) || this;
        _this.soldierQian = [];
        _this.soldierHou = [];
        _this.round = 0;
        _this.haveObj = true;
        _this.xy = 0; /**vertigo */
        _this.zd = 0; /**poisoning */
        _this.id = _id;
        _this.skinName = "NpcPhalanxSkin";
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.GO_FIGHTING, _this.goFihgt, _this);
        MessageManager.inst().addListener(LocalStorageEnum.NPC_FIGHTING, _this.fighting_n, _this);
        MessageManager.inst().addListener(LocalStorageEnum.NPC_SUBHP, _this.subHp, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.RELEASE_SKILLS, _this.createSkill, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GEANGUANHUO, _this.guanhuo, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    NpcPhalanx.prototype.init = function () {
        this.bg.source = "fight_bg" + this.id + "_png";
        if (GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].qian != 0) {
            for (var i = 0; i < 10; i++) {
                var bing0 = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].qian, false);
                if (bing0.id == 1)
                    bing0.scaleX = bing0.scaleY = 0.4;
                else
                    bing0.scaleX = bing0.scaleY = 0.5;
                if (i <= 4) {
                    if (bing0.id != 1) {
                        bing0.y = 70 + i * 20;
                        bing0.x = -5 * (this.id + 1) + this.qian_group.x + this.qian_group.width / 2 + i * (5 + this.id * 2);
                    }
                    else {
                        bing0.y = 50 + i * 25;
                        bing0.x = -35 + this.qian_group.x + this.qian_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
                    }
                }
                else {
                    if (bing0.id != 1) {
                        bing0.y = 100 + i * 20;
                        bing0.x = -0 * (this.id + 1) + this.qian_group.x + this.qian_group.width / 2 + i * (6 + this.id * 2);
                    }
                    else {
                        bing0.y = 70 + i * 25;
                        bing0.x = -30 + this.qian_group.x + this.qian_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
                    }
                }
                this.addChild(bing0);
                this.soldierQian.push(bing0);
                var bing1 = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].qian, false);
                if (bing1.id == 1)
                    bing1.scaleX = bing1.scaleY = 0.4;
                else
                    bing1.scaleX = bing1.scaleY = 0.5;
                if (i <= 4) {
                    if (bing1.id != 1) {
                        bing1.y = 70 + i * 20;
                        bing1.x = -60 * (this.id + 1) + this.hou_group.x + this.hou_group.width / 2 + i * (5 + this.id * 2);
                    }
                    else {
                        bing1.y = 50 + i * 25;
                        bing1.x = -70 + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
                    }
                }
                else {
                    if (bing1.id != 1) {
                        bing1.y = 100 + i * 20;
                        bing1.x = -55 + this.hou_group.x + this.hou_group.width / 2 + i * (6 + this.id * 2);
                    }
                    else {
                        bing1.y = 70 + i * 25;
                        bing1.x = -65 + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
                    }
                }
                this.addChild(bing1);
                this.soldierQian.push(bing1);
            }
            if (this.soldierQian[0].id == 1 && this.id == 0) {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
                    this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
                    GameCfg.npcAttack += attack;
                }
            }
            else if (this.soldierQian[0].id == 3 && this.id == 1) {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
                    this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
                    GameCfg.npcAttack += attack;
                }
            }
            else if (this.soldierQian[0].id == 2 && this.id == 2) {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
                    this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
                    GameCfg.npcAttack += attack;
                }
            }
            else {
                for (var i = 0; i < this.soldierQian.length; i++) {
                    var attack = this.soldierQian[i].attack;
                    GameCfg.npcAttack += attack;
                }
            }
        }
        // if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].hou!=0)
        // {
        // 	for(let i = 0; i < 10; i++)
        // 	{
        // 		let bing = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].hou, false);
        // 		bing.scaleX = bing.scaleY = 0.5;
        // 		if(i <= 4)
        // 		{	
        // 			bing.y = 20 + i * 30;
        // 			bing.x = -25 * (this.id + 1) + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3);
        // 		}
        // 		else
        // 		{	
        // 			bing.y = 70 + i * 30;
        // 			bing.x = -20 * (this.id + 1) + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3);
        // 		}
        // 		this.addChild(bing);
        // 		this.soldierHou.push(bing);
        // 	}
        // }
        if (GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].qian != 0) {
            for (var i = 0; i < 4; i++) {
                var ta0 = new BuildNpc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].qian, false);
                if (i <= 1) {
                    ta0.y = 70 + i * 50;
                    ta0.x = this.qian_group.x + this.qian_group.width / 2 + i * (10 + this.id * 10) - (20 + this.id * 5) + 25;
                }
                else {
                    ta0.y = 130 + i * 50;
                    ta0.x = this.qian_group.x + this.qian_group.width / 2 + i * (10 + this.id * 10) - (20 + this.id * 5) + 35;
                }
                this.addChild(ta0);
                this.soldierQian.push(ta0);
                // let ta1 = new BuildNpc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].qian, false);
                // ta1.scaleX = ta1.scaleY = 0.5;
                // if(i <= 1)
                // {
                // 	ta1.y = 80 + i * 50;
                // 	ta1.x =  -20 +this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
                // }
                // else
                // {	
                // 	ta1.y = 150 + i * 50;
                // 	ta1.x = -20 + this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
                // }
                // this.addChild(ta1);
                // this.soldierQian.push(ta1);
            }
        }
        // if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].hou!=0)
        // {
        // 	for(let i = 0; i < 4; i++)
        // 	{
        // 		let ta = new BuildNpc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].hou, false);
        // 		ta.scaleX = ta.scaleY = 0.5;
        // 		if(i <= 1)
        // 		{
        // 			ta.y = 80 + i * 50;
        // 			ta.x =  -20 +this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
        // 		}
        // 		else
        // 		{	
        // 			ta.y = 150 + i * 50;
        // 			ta.x = -20 + this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
        // 		}
        // 		this.addChild(ta);
        // 		this.soldierHou.push(ta);
        // 	}
        // }
        if (GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].wj[this.id] != 0) {
            this.wj = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].wj[this.id], false);
            this.wj.scaleX = this.wj.scaleY = 0.5;
            this.wj.x = this.role_group.x + this.role_group.width / 2;
            this.wj.y = this.role_group.y + this.role_group.height / 2;
            this.addChild(this.wj);
        }
        this.addChildAt(this.cloud_group, 999999);
        this.setlayer();
    };
    NpcPhalanx.prototype.goFihgt = function () {
        var level = (GameCfg.chapter - 1) * 4 + GameCfg.level;
        for (var i = 0; i < this.soldierQian.length; i++) {
            var hp = Math.floor(this.soldierQian[i].getData().hp + level * 0.1 * this.soldierQian[i].getData().hp);
            var attack = Math.floor(this.soldierQian[i].getData().attack + level * 0.1 * this.soldierQian[i].getData().attack);
            this.soldierQian[i].setData(hp, attack);
        }
        for (var i = 0; i < this.soldierQian.length; i++) {
            GameCfg.npcPH += this.soldierQian[i].getHp();
        }
        for (var i = 0; i < this.soldierHou.length; i++) {
            GameCfg.npcPH += this.soldierHou[i].getHp();
        }
        GameCfg.npcPH_max = GameCfg.npcPH;
        if (this.soldierHou.length <= 0 && this.soldierQian.length <= 0) {
            this.haveObj = false;
            MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
            MessageManager.inst().removeListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
            MessageManager.inst().removeListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
            egret.Tween.removeTweens(this);
            this.removeMySelf();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        else {
            this.haveObj = true;
        }
        if (this.id == 0) {
            egret.Tween.get(this)
                .to({ x: StageUtils.inst().getWidth() - (150 + this.width) }, 500);
        }
        else {
            egret.Tween.get(this)
                .to({ x: StageUtils.inst().getWidth() + (300 + this.width) }, 500);
        }
        egret.Tween.removeTweens(this.cloud_group);
        egret.Tween.get(this.cloud_group)
            .to({ alpha: 0 }, 300);
    };
    NpcPhalanx.prototype.subHp = function (evt) {
        if (this.id != 0)
            return;
        if (this.soldierQian.length > 0) {
            var num = void 0;
            var any = this.soldierQian[Math.floor(Math.random() * this.soldierQian.length)];
            num = evt.data + Math.floor(evt.data * (Math.random() * 0.4 - 0.2));
            any.setHp(num);
        }
        else if (this.soldierHou.length > 0) {
            var num = void 0;
            var any = this.soldierHou[Math.floor(Math.random() * this.soldierHou.length)];
            num = evt.data + Math.floor(evt.data * (Math.random() * 0.4 - 0.2));
            any.setHp(num);
        }
    };
    NpcPhalanx.prototype.gamePause = function () {
        egret.Tween.pauseTweens(this);
    };
    NpcPhalanx.prototype.gameStart = function () {
        egret.Tween.resumeTweens(this);
    };
    NpcPhalanx.prototype.update = function () {
        if (!GameCfg.gameStart)
            return;
        if (this.soldierHou.length <= 0 && this.soldierQian.length <= 0) {
            this.haveObj = false;
            MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
            MessageManager.inst().dispatch(LocalStorageEnum.SWITCH_NPC, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
            MessageManager.inst().removeListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
            MessageManager.inst().removeListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
            MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
            egret.Tween.removeTweens(this);
            this.removeMySelf();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        else {
            this.haveObj = true;
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
    };
    /**Set up layers */
    NpcPhalanx.prototype.setlayer = function () {
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
        /**sort */
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
    NpcPhalanx.prototype.fighting_n = function () {
        var _this = this;
        setTimeout(function () {
            _this.fighting();
        }, 500);
    };
    NpcPhalanx.prototype.fighting = function () {
        var _this = this;
        if (this.id == 0) {
            if (this.xy > 0) {
                this.xy--;
                if (this.xy <= 0) {
                    this.removeXy();
                }
                MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, this);
                return;
            }
            var str = "";
            str = "Qian";
            if (this["soldier" + str].length <= 0) {
                this.fighting();
            }
            else {
                switch (this["soldier" + str][0].id) {
                    case 1: /**cavalry */
                    case 3:/**Infantry */ 
                        var _x = void 0;
                        if (GameCfg.pp[0].soldierQian.length > 0) {
                            var _x0 = GameCfg.pp[0].localToGlobal(GameCfg.pp[0].qian_group.x, GameCfg.pp[0].qian_group.y);
                            _x = this.globalToLocal(_x0.x, _x0.y).x;
                        }
                        else {
                            var _x0 = GameCfg.pp[0].localToGlobal(GameCfg.pp[0].hou_group.x, GameCfg.pp[0].hou_group.y);
                            _x = this.globalToLocal(_x0.x, _x0.y).x;
                        }
                        var _loop_1 = function (i) {
                            egret.Tween.get(this_1["soldier" + str][i])
                                .wait(Math.floor(Math.random() * 100))
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    _this["soldier" + str][i].setRun("left");
                            }, this_1["soldier" + str][i])
                                .to({ x: _x - i * (4 + this_1.id * 3) + 100 }, 500)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    _this["soldier" + str][i].setAttack();
                            }, this_1["soldier" + str][i])
                                .wait(250)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, _this["soldier" + str][i].getAttack());
                            })
                                .wait(300)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    _this["soldier" + str][i].setRun("right");
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
                            MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, _this);
                        });
                        break;
                    case 2:/**Bowmen */ 
                        var _loop_2 = function (i) {
                            if (!this_2["soldier" + str][i])
                                return { value: void 0 };
                            egret.Tween.get(this_2["soldier" + str][i])
                                .wait(Math.floor(Math.random() * 100))
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    _this["soldier" + str][i].setAttack();
                            }, this_2["soldier" + str][i])
                                .wait(150)
                                .call(function () {
                                if (_this["soldier" + str][i]) {
                                    MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, { type: "npc", x: _this["soldier" + str][i].x, y: _this["soldier" + str][i].y, img: "game_arrow0_png" });
                                    _this["soldier" + str][i].setStand();
                                }
                            })
                                .wait(700)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, _this["soldier" + str][i].getAttack());
                            })
                                .wait(500)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    egret.Tween.removeTweens(_this["soldier" + str][i]);
                            }, this_2["soldier" + str][i]);
                        };
                        var this_2 = this;
                        for (var i = 0; i < this["soldier" + str].length; i++) {
                            var state_1 = _loop_2(i);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                        egret.Tween.get(this)
                            .wait(1500)
                            .call(function () {
                            egret.Tween.removeTweens(_this);
                            MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, _this);
                        });
                        break;
                    case 10008:/**bartizan */ 
                        var _loop_3 = function (i) {
                            if (!this_3["soldier" + str][i])
                                return { value: void 0 };
                            egret.Tween.get(this_3["soldier" + str][i])
                                .wait(Math.floor(Math.random() * 100))
                                .call(function () { })
                                .wait(50)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, { type: "npc", x: _this["soldier" + str][i].x, y: _this["soldier" + str][i].y, img: "game_arrow2_png" });
                            })
                                .wait(500)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, _this["soldier" + str][i].getAttack());
                            })
                                .wait(500)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    egret.Tween.removeTweens(_this["soldier" + str][i]);
                            }, this_3["soldier" + str][i]);
                        };
                        var this_3 = this;
                        for (var i = 0; i < this["soldier" + str].length; i++) {
                            var state_2 = _loop_3(i);
                            if (typeof state_2 === "object")
                                return state_2.value;
                        }
                        egret.Tween.get(this)
                            .wait(1200)
                            .call(function () {
                            egret.Tween.removeTweens(_this);
                            MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, _this);
                        });
                        break;
                    case 10009:/**Catapult */ 
                        var _loop_4 = function (i) {
                            if (!this_4["soldier" + str][i])
                                return { value: void 0 };
                            egret.Tween.get(this_4["soldier" + str][i])
                                .wait(Math.floor(Math.random() * 100))
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    _this["soldier" + str][i].setAttack();
                            }, this_4["soldier" + str][i])
                                .wait(150)
                                .call(function () {
                                if (_this["soldier" + str][i]) {
                                    MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, { type: "npc", x: _this["soldier" + str][i].x, y: _this["soldier" + str][i].y, img: "game_arrow1_png" });
                                    _this["soldier" + str][i].setStand();
                                }
                            })
                                .wait(700)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, _this["soldier" + str][i].getAttack());
                            })
                                .wait(500)
                                .call(function () {
                                if (_this["soldier" + str][i])
                                    egret.Tween.removeTweens(_this["soldier" + str][i]);
                            }, this_4["soldier" + str][i]);
                        };
                        var this_4 = this;
                        for (var i = 0; i < this["soldier" + str].length; i++) {
                            var state_3 = _loop_4(i);
                            if (typeof state_3 === "object")
                                return state_3.value;
                        }
                        egret.Tween.get(this)
                            .wait(1500)
                            .call(function () {
                            egret.Tween.removeTweens(_this);
                            MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, _this);
                        });
                        break;
                }
            }
        }
    };
    NpcPhalanx.prototype.createSkill = function (evt) {
        var _this = this;
        if (evt.data[0].x >= this.x && evt.data[0].x <= this.x + this.width && evt.data[0].y >= this.y && evt.data[0].y <= this.y + this.height) {
            switch (evt.data[0].id) {
                case 100071:
                case 100072:
                case 100073:
                case 100074:
                    /**Catch bandits first catch the ringleader */
                    if (GameCfg.gameStart) {
                        this.showEff(100071, function () {
                            var card = GlobalFun.getCardDataFromId(evt.data[0].id);
                            for (var i = 0; i < 8; i++) {
                                setTimeout(function () {
                                    var ani = new MovieClip();
                                    ani.x = _this.wj.x + Math.random() * 20;
                                    ani.y = -ani.height + 60;
                                    _this.role_group.addChild(ani);
                                    ani.playFile(EFFECT + "wang_effect", 1, null, true);
                                    MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, Math.floor(card.atk * 0.5));
                                    var hurt = new Hurt(card.atk);
                                    hurt.x = _this.wj.x + Math.random() * 20;
                                    hurt.y = -ani.height + 60;
                                    _this.role_group.addChild(hurt);
                                }, i * 300);
                            }
                            card.ownNum -= 1;
                            GlobalFun.refreshCardData(evt.data[0].id, { ownNum: card.ownNum });
                            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, _this);
                        });
                    }
                    else {
                        UserTips.inst().showTips("Currently unavailable");
                    }
                    break;
                case 100061:
                case 100062:
                case 100063:
                case 100064:
                    /**The sucker */
                    if (GameCfg.gameStart) {
                        this.showEff(evt.data[0].id, function () {
                            var card = GlobalFun.getCardDataFromId(evt.data[0].id);
                            // let num = this.soldierQian.length + this.soldierHou.length;
                            // for(let i = 0; i < num; i++)
                            // {
                            // 	MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, card.atk);
                            // }
                            for (var i = 0; i < 6; i++) {
                                setTimeout(function () {
                                    var ani = new MovieClip();
                                    ani.x = Math.random() * _this.width;
                                    ani.y = Math.random() * _this.height;
                                    ani.scaleX = ani.scaleY = 0.5;
                                    _this.addChild(ani);
                                    ani.playFile(EFFECT + "adcc_effect", 1, null, true, "", null, 10);
                                    for (var i_1 = 0; i_1 < _this.soldierQian.length; i_1++) {
                                        _this.soldierQian[i_1].setHp(Math.floor(card.atk * 0.1));
                                    }
                                    for (var i_2 = 0; i_2 < _this.soldierHou.length; i_2++) {
                                        _this.soldierHou[i_2].setHp(Math.floor(card.atk * 0.1));
                                    }
                                }, i * 500);
                            }
                            card.ownNum -= 1;
                            GlobalFun.refreshCardData(evt.data[0].id, { ownNum: card.ownNum });
                            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, _this);
                        });
                    }
                    else {
                        UserTips.inst().showTips("Currently unavailable");
                    }
                    break;
                case 100051:
                case 100052:
                case 100053:
                case 100054:
                    /**Beauty trap */
                    if (GameCfg.gameStart) {
                        this.showEff(evt.data[0].id, function () {
                            var card = GlobalFun.getCardDataFromId(evt.data[0].id);
                            _this.xy = card.buffTime;
                            var ani = new MovieClip();
                            ani.x = _this.width / 2;
                            ani.y = _this.height / 2;
                            _this.addChild(ani);
                            ani.playFile(EFFECT + "mrj_effect", 1, null, true);
                            _this.xyEffect();
                            card.ownNum -= 1;
                            GlobalFun.refreshCardData(evt.data[0].id, { ownNum: card.ownNum });
                            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, _this);
                        });
                    }
                    else {
                        UserTips.inst().showTips("Currently unavailable");
                    }
                    break;
                case 100041:
                case 100042:
                case 100043:
                case 100044:
                    /**Rob the owner while his house is on fire */
                    if (GameCfg.gameStart) {
                        this.showEff(evt.data[0].id, function () {
                            var card = GlobalFun.getCardDataFromId(evt.data[0].id);
                            for (var i = 0; i < _this.soldierQian.length; i++) {
                                _this.soldierQian[i].poisoning(card.atk, "chdj_effect");
                            }
                            for (var i = 0; i < _this.soldierHou.length; i++) {
                                _this.soldierHou[i].poisoning(card.atk, "chdj_effect");
                            }
                            _this.zhongdu();
                            card.ownNum -= 1;
                            GlobalFun.refreshCardData(evt.data[0].id, { ownNum: card.ownNum });
                            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, _this);
                        });
                    }
                    else {
                        UserTips.inst().showTips("Currently unavailable");
                    }
                    break;
                case 10003:
                    /**Look on at sb.'s trouble with indifference */
                    if (!GameCfg.gameStart) {
                        this.showEff(10003, function () {
                            var card = GlobalFun.getCardDataFromId(evt.data[0].id);
                            MessageManager.inst().dispatch(LocalStorageEnum.GEANGUANHUO, _this);
                            card.ownNum -= 1;
                            GlobalFun.refreshCardData(evt.data[0].id, { ownNum: card.ownNum });
                            MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, _this);
                        });
                    }
                    else {
                        UserTips.inst().showTips("Currently unavailable");
                    }
                    break;
            }
        }
    };
    NpcPhalanx.prototype.showEff = function (_id, cb) {
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
    /**poisoning */
    NpcPhalanx.prototype.zhongdu = function () {
        var _this = this;
        this.zd = 3;
        egret.Tween.pauseTweens(this.qian_group);
        egret.Tween.removeTweens(this.qian_group);
        egret.Tween.get(this.qian_group, { loop: true })
            .wait(500)
            .call(function () {
            if (_this.zd <= 0) {
                egret.Tween.pauseTweens(_this.qian_group);
                egret.Tween.removeTweens(_this.qian_group);
                return;
            }
            for (var i = 0; i < _this.soldierQian.length; i++) {
                _this.soldierQian[i].poisoning(Math.floor(Math.random() * 5 + 10), "buff4");
            }
            for (var i = 0; i < _this.soldierHou.length; i++) {
                _this.soldierHou[i].poisoning(Math.floor(Math.random() * 5 + 10), "buff4");
            }
            _this.zd--;
        }, this);
    };
    NpcPhalanx.prototype.guanhuo = function () {
        egret.Tween.get(this.cloud_group)
            .to({ alpha: 0 }, 300)
            .wait(1500)
            .to({ alpha: 1 }, 300);
    };
    /**Vertigo Effect */
    NpcPhalanx.prototype.xyEffect = function () {
        for (var i = 0; i < this.soldierQian.length; i++) {
            this.soldierQian[i].xuanyun();
        }
        for (var i = 0; i < this.soldierHou.length; i++) {
            this.soldierHou[i].xuanyun();
        }
    };
    NpcPhalanx.prototype.removeXy = function () {
        for (var i = 0; i < this.soldierQian.length; i++) {
            this.soldierQian[i].removeAni();
        }
        for (var i = 0; i < this.soldierHou.length; i++) {
            this.soldierHou[i].removeAni();
        }
    };
    NpcPhalanx.prototype.setBg = function (_num) {
        switch (_num) {
            case 1:
                this.bg.source = "fight_bg" + this.id + "_png";
                break;
            case 2:
                this.bg.source = "fight_bg" + this.id + "_lv_png";
                break;
        }
    };
    NpcPhalanx.prototype.removeMySelf = function () {
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
        MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
        MessageManager.inst().removeListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
        MessageManager.inst().removeListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
        MessageManager.inst().removeListener(LocalStorageEnum.RELEASE_SKILLS, this.createSkill, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GEANGUANHUO, this.guanhuo, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return NpcPhalanx;
}(BaseView));
__reflect(NpcPhalanx.prototype, "NpcPhalanx");
//# sourceMappingURL=NpcPhalanx.js.map