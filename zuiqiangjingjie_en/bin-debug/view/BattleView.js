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
var BattleView = (function (_super) {
    __extends(BattleView, _super);
    function BattleView() {
        var _this = _super.call(this) || this;
        _this.singleFrame = 33.3;
        _this.gameframe = 4000;
        _this.curGameFrame = 0;
        _this.battleCount = 0;
        _this.enemyIndex = [0, 1, 2];
        _this.ownIndex = [0, 1, 2];
        _this.arr_obj = [];
        _this.ownHp = 0;
        _this.curOwnHp = 0;
        _this.enemtHp = 0;
        _this.curEnemyHp = 0;
        _this.release10008 = false;
        _this.release10009 = false;
        return _this;
    }
    BattleView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0] && param[0].type) {
            this._type = param[0].type;
        }
        egret.Tween.get(this.topGroup).to({ y: 0 }, 600).call(function () {
            egret.Tween.removeTweens(_this.topGroup);
        }, this);
        egret.Tween.get(this.shop_btn).to({ right: 44 }, 600).call(function () {
            egret.Tween.removeTweens(_this.shop_btn);
        }, this);
        egret.Tween.get(this.back_btn).to({ bottom: 0 }, 600).call(function () {
            egret.Tween.removeTweens(_this.back_btn);
        }, this);
        egret.Tween.get(this.skillGroup).to({ bottom: 0 }, 600).call(function () {
            egret.Tween.removeTweens(_this.skillGroup);
        }, this);
        this.touchEnabled = false;
        this.touchChildren = false;
        /**test--- */
        // GameApp.ownSolderis[0].soldierType = 3;
        // GameApp.ownSolderis[0].generalId = 100011
        // GameApp.ownSolderis[1].soldierType = 2;
        // GameApp.ownSolderis[1].generalId = 100001
        // GameApp.ownSolderis[2].soldierType = 1;
        // GameApp.ownSolderis[2].generalId = 100011
        this.fighting_p.textAlign = egret.HorizontalAlign.CENTER;
        this.fighting_n.textAlign = egret.HorizontalAlign.CENTER;
        this.game_icon.source = "game_icon" + Math.floor(Math.random() * 3) + "_png";
        this.player_lc.text = "" + GameApp.goods;
        this.fighting_p.text = GameCfg.playerAttack.toString();
        this.fighting_n.text = GameCfg.npcAttack.toString();
        var num = 0;
        for (var i = 0; i < GameApp.roleInfo.citys.length; i++) {
            if (GameApp.roleInfo.citys[i].isOwn) {
                num++;
            }
        }
        this.player_cc.text = "" + num;
        this.player_exp.text = "" + GameApp.exp;
        // this.npc_bl.text = "Soldiers：" + Math.floor(Math.random()*5000 + 5000);
        this.npc_cc.text = "" + Math.floor(Math.random() * 1 + 4);
        this.npc_lc.text = "" + Math.floor(Math.random() * 20000 + 30000);
        this.npc_exp.text = "" + Math.floor(Math.random() * 300 + 500);
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        this.arrayCollect = new eui.ArrayCollection();
        this.list.dataProvider = this.arrayCollect;
        this.list.itemRenderer = SkillItem;
        this.list.validateNow();
        this.list.scrollH = 0;
        this.scroller.viewport.scrollH = 0;
        this.scroller.bounces = false;
        // let skillCards:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.special_skill,false);
        // this.arrayCollect.source = skillCards;
        // MessageManager.inst().addListener(CustomEvt.CARD_REFRESH,this.onrefresh,this);
        MessageManager.inst().addListener("role_dead", this.roleDead, this);
        this.addTouchEvent(this.shop_btn, this.touchShop, true);
        this.addTouchEvent(this.back_btn, this.touchBack, true);
        this.ownEntitys = [];
        this.enemyEntitys = [];
        this.createOwnSoldier();
        this.createLevelSoldier(GameCfg.chapter - 1, GameCfg.level - 1);
        var _ownHp = 0;
        for (var i = 0; i < this.ownEntitys.length; i++) {
            _ownHp += this.ownEntitys[i].soldierAttr.hp;
        }
        var _enemyHp = 0;
        for (var i = 0; i < this.enemyEntitys.length; i++) {
            _enemyHp += this.enemyEntitys[i].soldierAttr.hp;
        }
        this.curOwnHp = this.ownHp = _ownHp;
        this.curEnemyHp = this.enemtHp = _enemyHp;
        this.ownHpCom.setData(this.curOwnHp, this.ownHp);
        this.ownHpCom.initData('flag_4_png', GameApp.roleInfo.name);
        this.enemyHpCom.setData(this.curEnemyHp, this.enemtHp);
        var index = (Math.random() * 3 + 1) >> 0;
        var cityInfo = GlobalFun.getCityInfo(GameCfg.chapter);
        var cityName = "" + NameList.inst().city_name[GameCfg.chapter];
        this.enemyHpCom.initData("flag_" + index + "_png", cityName ? cityName + "Commanding" : "Mountain thief");
        this.soldierGroup["autoSize"]();
        this.enemyGroup["autoSize"]();
        this.skillGroup["autoSize"]();
        this.topGroup["autoSize"]();
        this.shop_btn["autoSize"]();
        this.back_btn["autoSize"]();
        this.walkToScene();
        this.addList();
        MessageManager.inst().addListener(CustomEvt.CARD_REFRESH, this.onrefresh, this);
        MessageManager.inst().addListener(LocalStorageEnum.RELEASE_SKILLS, this.playSkill, this);
        MessageManager.inst().addListener(LocalStorageEnum.BEGIN_MOVE_CARD, this.beginMove, this);
        MessageManager.inst().addListener(LocalStorageEnum.SEND_BATTLE_POS, this.getPos, this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.onGameStart, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        var percentW = StageUtils.inst().getHeight() / 750;
        this.ownHpCom.top *= percentW;
        this.enemyHpCom.top *= percentW;
        this.back_btn.top *= percentW;
    };
    BattleView.prototype.onGameStart = function () {
        egret.startTick(this.execTurnBattle, this);
    };
    BattleView.prototype.getPos = function (evt) {
        console.log(evt.data);
        switch (evt.data[0]) {
            case 100054:
                //Beauty trap
                var point = evt.data[1][0];
                var localXY = this.enemyGroup.globalToLocal(point.x, point.y);
                for (var i = 0; i < this.enemyGroup.numChildren; i++) {
                    var group = this.enemyGroup.$children[i];
                    if (group && group.numChildren) {
                        for (var j = 0; j < group.numChildren; j++) {
                            var item = group.$children[j];
                            if (item) {
                                item.showWaitState();
                            }
                        }
                        break;
                    }
                    // if(group.x < localXY.x && localXY.x <= group.x + group.width && group.y < localXY.y && localXY.y <= group.y + group.height){
                    // }
                }
                break;
            case 100044:
                var point2 = evt.data[1][0];
                var localXY2 = this.enemyGroup.globalToLocal(point2.x, point2.y);
                var atk_1 = GlobalFun.getCardDataFromId(100044, ["atk"]).atk;
                var curGroup_1;
                var index_1;
                for (var i = 0; i < this.enemyGroup.numChildren; i++) {
                    var group = this.enemyGroup.$children[i];
                    if (group && group.numChildren) {
                        if (group.numChildren) {
                            curGroup_1 = group;
                            index_1 = i;
                        }
                        for (var j = 0; j < group.numChildren; j++) {
                            var item = group.$children[j];
                            if (item) {
                                item.showPosion();
                            }
                        }
                        break;
                    }
                    // if(group.x < localXY2.x && localXY2.x <= group.x + group.width && group.y < localXY2.y && localXY2.y <= group.y + group.height){
                    // }
                }
                if (curGroup_1 && (!isNaN(index_1))) {
                    var self_1 = this;
                    var count_1 = 5;
                    var interval_1 = setInterval(function () {
                        count_1 -= 1;
                        self_1.floatDmgFont(atk_1 + ((Math.random() * 20) >> 0), curGroup_1.$children, index_1);
                        if (count_1 <= 0) {
                            clearInterval(interval_1);
                        }
                    }, 1000);
                }
                break;
            case 100064:
                this.showSkillDmg(100064);
                break;
            case 100074:
                this.showSkillDmg(100074);
                break;
            case 10008:
                //Use arrow tower skill;
                this.createArrowBuild_0();
                break;
            case 10009:
                //Use the skill of stone throwing cart
                this.createArrowBuild_1();
                break;
        }
    };
    /**Create arrows */
    BattleView.prototype.createArrowBuild_0 = function () {
        if (this.release10008) {
            return;
        }
        if (!this.release10008) {
            this.release10008 = true;
        }
        var offx = 15;
        var percentW = StageUtils.inst().getWidth() / 1334;
        var percenth = StageUtils.inst().getHeight() / 750;
        var arrowArr = [];
        var _loop_1 = function (i) {
            var img_1 = new eui.Image();
            img_1.source = "ta_player_png";
            img_1.anchorOffsetX = img_1.width >> 1;
            img_1.anchorOffsetY = img_1.height;
            // img["autoSize"]();
            this_1.addChild(img_1);
            img_1.x = this_1.soldierGroup.left + this_1.soldierGroup.width * percentW - offx * i - 130;
            img_1.y = this_1.soldierGroup.top * percenth + i * (img_1.height * percentW + 20) + 10;
            img_1.alpha = 0;
            arrowArr.push(img_1);
            egret.Tween.get(img_1).to({ alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(img_1);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            var _loop_2 = function (j) {
                var timeout2 = setTimeout(function () {
                    clearTimeout(timeout2);
                    var _loop_3 = function (i) {
                        var randomX = self.enemyGroup.x + 200 + ((Math.random() * 200) >> 0);
                        var bullet = new Bullet(arrowArr[i].x, arrowArr[i].y, randomX, arrowArr[i].y, 0, "game_arrow0_png", function () {
                            var mc = new MovieClip();
                            mc.playFile(EFFECT + "arrow", 1, null, true);
                            mc.scaleX = mc.scaleY = 0.5;
                            self.addChild(mc);
                            mc.x = bullet.x;
                            mc.y = bullet.y;
                        }, self);
                        GlobalFun.lighting(bullet);
                        self.addChild(bullet);
                    };
                    for (var i = 0; i < arrowArr.length; i++) {
                        _loop_3(i);
                    }
                }, 200 * j);
            };
            for (var j = 0; j < 20; j++) {
                _loop_2(j);
            }
        }, 600);
        var cardatk = GlobalFun.getCardDataFromId(10008, ["atk"]).atk;
        var count = 6;
        var interval = setInterval(function () {
            count -= 1;
            for (var i = 0; i < self.enemyGroup.numChildren; i++) {
                var group = self.enemyGroup.$children[i];
                if (group.numChildren) {
                    self.floatDmgFont(cardatk + ((Math.random() * 20) >> 0), group.$children, i);
                    group.$children.forEach(function (item) {
                        if (item) {
                            item.showHurtMc();
                        }
                    }, self);
                }
            }
            if (count <= 0) {
                self.release10008 = false;
                clearInterval(interval);
                var _loop_4 = function (i) {
                    var item = arrowArr[i];
                    egret.Tween.get(item).to({ alpha: 0 }, 600).call(function () {
                        egret.Tween.removeTweens(item);
                        if (item && item.parent) {
                            item.parent.removeChild(item);
                        }
                    }, self);
                };
                for (var i = 0; i < arrowArr.length; i++) {
                    _loop_4(i);
                }
                arrowArr = [];
            }
        }, 1000);
    };
    /**Create a stone cart */
    BattleView.prototype.createArrowBuild_1 = function () {
        if (this.release10009) {
            return;
        }
        if (!this.release10009) {
            this.release10009 = true;
        }
        var offx = 15;
        var percentW = StageUtils.inst().getWidth() / 1334;
        var percenth = StageUtils.inst().getHeight() / 750;
        var arrowArr = [];
        var _loop_5 = function (i) {
            var img_2 = new eui.Image();
            img_2.source = "ta_player_png";
            img_2.anchorOffsetX = img_2.width >> 1;
            img_2.anchorOffsetY = img_2.height;
            // img["autoSize"]();
            this_2.addChild(img_2);
            img_2.x = this_2.soldierGroup.left + this_2.soldierGroup.width * percentW - offx * i - 130;
            img_2.y = this_2.soldierGroup.top * percenth + i * (img_2.height * percentW + 20) + 10;
            img_2.alpha = 0;
            arrowArr.push(img_2);
            egret.Tween.get(img_2).to({ alpha: 0 }, 600).call(function () {
                egret.Tween.removeTweens(img_2);
            }, this_2);
        };
        var this_2 = this;
        for (var i = 0; i < 5; i++) {
            _loop_5(i);
        }
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            var _loop_6 = function (j) {
                var timeout2 = setTimeout(function () {
                    clearTimeout(timeout2);
                    var _loop_7 = function (i) {
                        var randomX = self.enemyGroup.x + 200 + ((Math.random() * 200) >> 0);
                        // let bullet:Bullet = new Bullet((arrowArr[i].x - Math.random()*100), -100, randomX, arrowArr[i].y, 0, "game_arrow1_png",()=>{
                        // 	// let mc:MovieClip = new MovieClip();
                        // 	// mc.playFile(`${EFFECT}arrow`,1,null,true);
                        // 	// mc.scaleX = mc.scaleY = 0.5;
                        // 	// self.addChild(mc);
                        // 	// mc.x = bullet.x;
                        // 	// mc.y = bullet.y;
                        // },self);
                        var bullet = new eui.Image();
                        bullet.source = "game_arrow1_png";
                        bullet.x = self.enemyGroup.x + 200 + Math.random() * 200;
                        bullet.y = -80;
                        var scale = Math.random() * 0.5 + 0.5;
                        bullet.scaleX = bullet.scaleY = scale;
                        // bullet.rotation = Math.random()*360;
                        egret.Tween.get(bullet)
                            .to({ y: arrowArr[i].y + 80 }, 800, egret.Ease.circIn)
                            .call(function () {
                            var mc = new MovieClip();
                            mc.playFile(EFFECT + "explode", 1, null, true);
                            mc.scaleX = mc.scaleY = (scale - 0.49);
                            self.addChildAt(mc, 1);
                            mc.x = bullet.x;
                            mc.y = bullet.y;
                            self.removeChild(bullet);
                        }, self);
                        GlobalFun.lighting(bullet);
                        self.addChild(bullet);
                    };
                    for (var i = 0; i < arrowArr.length; i++) {
                        _loop_7(i);
                    }
                }, 200 * j);
            };
            for (var j = 0; j < 20; j++) {
                _loop_6(j);
            }
        }, 800);
        var cardatk = GlobalFun.getCardDataFromId(10008, ["atk"]).atk;
        var count = 6;
        var interval = setInterval(function () {
            count -= 1;
            for (var i = 0; i < self.enemyGroup.numChildren; i++) {
                var group = self.enemyGroup.$children[i];
                if (group.numChildren) {
                    self.floatDmgFont(cardatk + ((Math.random() * 20) >> 0), group.$children, i);
                    group.$children.forEach(function (item) {
                        item.showHurtMc();
                    }, self);
                }
            }
            if (count <= 0) {
                self.release10009 = false;
                clearInterval(interval);
                var _loop_8 = function (i) {
                    var item = arrowArr[i];
                    egret.Tween.get(item).to({ alpha: 0 }, 600).call(function () {
                        egret.Tween.removeTweens(item);
                        if (item && item) {
                            item.parent.removeChild(item);
                        }
                    }, self);
                };
                for (var i = 0; i < arrowArr.length; i++) {
                    _loop_8(i);
                }
                arrowArr = [];
            }
        }, 1000);
    };
    BattleView.prototype.showSkillDmg = function (skillid) {
        var atk = GlobalFun.getCardDataFromId(skillid, ["atk"]).atk;
        var self = this;
        var _loop_9 = function (j) {
            var timeout2 = setTimeout(function () {
                clearTimeout(timeout2);
                var _loop_10 = function (i) {
                    var group = self.enemyGroup.$children[i];
                    if (group.numChildren) {
                        var timeout_1 = setTimeout(function () {
                            clearTimeout(timeout_1);
                            self.floatDmgFont(atk + ((Math.random() * 20) >> 0), group.$children, i);
                            group.$children.forEach(function (item) {
                                item.showHurtMc();
                            }, this);
                        }, i * 300);
                    }
                };
                for (var i = 0; i < self.enemyGroup.numChildren; i++) {
                    _loop_10(i);
                }
            }, j * 300);
        };
        for (var j = 0; j < 2; j++) {
            _loop_9(j);
        }
    };
    /**
     * Add tolistdata
     */
    BattleView.prototype.addList = function () {
        var precentw = StageUtils.inst().getWidth() / 1334;
        // this.time_num=egret.setTimeout(function(){
        var skillCards = GlobalFun.getCardsFromType(CardType.special_skill, false);
        this.removeItem(skillCards);
        this.arrayCollect.source = skillCards;
        this.time_num = null;
        // },this,4000*precentw);
    };
    /**
     * Start moving cards
     */
    BattleView.prototype.beginMove = function (evt) {
        this.moveCard = new CardBattle(evt.data.card.type, evt.data.card.insId, evt.data.card);
        this.moveCard.x = evt.data.x;
        this.moveCard.y = evt.data.y;
        this.moveCard.visible = false;
        this.addChild(this.moveCard);
    };
    BattleView.prototype.touchBegin = function (evt) {
        if (!this.beginPoint) {
            this.beginPoint = new egret.Point();
            this.beginPoint.x = evt.stageX;
            this.beginPoint.y = evt.stageY;
        }
    };
    /**
     * In the process of moving the card
     */
    BattleView.prototype.touchMove = function (evt) {
        //this.scroller.viewport.scrollH=0;
        if (!this.moveCard)
            return;
        this.moveCard.x = evt.stageX - this.moveCard.width / 2;
        this.moveCard.y = evt.stageY - this.moveCard.height / 2;
        if (evt.stageY <= StageUtils.inst().getHeight() - 180) {
            this.moveCard.visible = true;
        }
    };
    /**
     * Display special effects and skill name
     */
    BattleView.prototype.showEff = function (_id, cb) {
        var speakIndex = ((Math.random() * 3 + 1) >> 0);
        SoundManager.inst().playOtherEffect(MUSIC + "hero" + speakIndex + ".mp3");
        var rect = new eui.Rect();
        rect.fillColor = 0x000000;
        rect.width = StageUtils.inst().getWidth();
        rect.height = StageUtils.inst().getHeight();
        rect.alpha = 0.2;
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
        role.x = -100;
        role.y = skillBg.y + skillBg.height - 30;
        role.alpha = 0;
        egret.Tween.get(role).to({ x: 70, alpha: 1 }, 400, egret.Ease.circOut).to({ x: 120 }, 3000);
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
    /**
     * Display skills
     */
    BattleView.prototype.playSkill = function (evt) {
        var _this = this;
        switch (evt.data[0].id) {
            case 100074:
                /**Catch bandits first catch the ringleader */
                this.showEff(100071, function () {
                    _this.arr_obj = [];
                    var _loop_11 = function (i) {
                        setTimeout(function () {
                            var ani = new MovieClip();
                            var randomx = Math.floor(Math.random() * _this.enemyGroup.width);
                            var randomy = Math.floor(Math.random() * _this.enemyGroup.height);
                            ani.x = _this.enemyGroup.x + randomx;
                            ani.y = _this.enemyGroup.y + randomy;
                            _this.arr_obj.push({ x: ani.x, y: ani.y });
                            if (i == 7) {
                                var obj = [];
                                obj.push(evt.data[0].id);
                                obj.push(_this.arr_obj);
                                MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                            }
                            ani.anchorOffsetX = ani.width / 2;
                            ani.anchorOffsetY = ani.height / 2;
                            _this.addChild(ani);
                            ani.playFile(EFFECT + "wang_effect", 1, null, true);
                        }, i * 300);
                    };
                    for (var i = 0; i < 8; i++) {
                        _loop_11(i);
                    }
                });
                break;
            case 100061:
            case 100062:
            case 100063:
            case 100064:
                this.arr_obj = [];
                /**The sucker */
                this.showEff(evt.data[0].id, function () {
                    var _loop_12 = function (i) {
                        setTimeout(function () {
                            var ani = new MovieClip();
                            var randomx = Math.floor(Math.random() * _this.enemyGroup.width);
                            var randomy = Math.floor(Math.random() * _this.enemyGroup.height);
                            ani.x = _this.enemyGroup.x + 200;
                            ani.y = _this.enemyGroup.y + randomy;
                            ani.anchorOffsetX = ani.width / 2;
                            ani.anchorOffsetY = ani.height / 2;
                            ani.scaleX = ani.scaleY = 0.5;
                            _this.addChild(ani);
                            _this.arr_obj.push({ x: ani.x, y: ani.y });
                            if (i == 5) {
                                var obj = [];
                                obj.push(evt.data[0].id);
                                obj.push(_this.arr_obj);
                                MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                            }
                            ani.playFile(EFFECT + "adcc_effect", 1, null, true, "", null, 10);
                        }, i * 500);
                    };
                    for (var i = 0; i < 6; i++) {
                        _loop_12(i);
                    }
                });
                break;
            case 100051:
            case 100052:
            case 100053:
            case 100054:
                this.arr_obj = [];
                /**Beauty trap */
                this.showEff(evt.data[0].id, function () {
                    var ani = new MovieClip();
                    ani.x = _this.enemyGroup.x + _this.enemyGroup.width / 2;
                    ani.y = _this.enemyGroup.y + _this.enemyGroup.height / 2;
                    ani.anchorOffsetX = ani.width / 2;
                    ani.anchorOffsetY = ani.height / 2;
                    _this.addChild(ani);
                    var obj = [];
                    obj.push(evt.data[0].id);
                    obj.push(_this.arr_obj);
                    _this.arr_obj.push({ x: ani.x, y: ani.y });
                    MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                    ani.playFile(EFFECT + "mrj_effect", 1, null, true);
                });
                break;
            case 100041:
            case 100042:
            case 100043:
            case 100044:
                this.arr_obj = [];
                /**
                 * Rob the owner while his house is on fire
                 */
                this.showEff(evt.data[0].id, function () {
                    var obj = [];
                    _this.arr_obj.push({ x: _this.enemyGroup.x + _this.enemyGroup.width / 2, y: _this.enemyGroup.y + _this.enemyGroup.height / 2 });
                    obj.push(evt.data[0].id);
                    obj.push(_this.arr_obj);
                    MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                });
                break;
            case 100101:
            case 100102:
            case 100103:
            case 100104:
                this.arr_obj = [];
                /**
                 * Water of life
                 */
                this.showEff(evt.data[0].id, function () {
                    var obj = [];
                    obj.push(evt.data[0].id);
                    obj.push(_this.arr_obj);
                    MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                });
                break;
            case 10008:
                this.arr_obj = [];
                /**
                 * bartizan
                 */
                this.showEff(evt.data[0].id, function () {
                    var obj = [];
                    obj.push(evt.data[0].id);
                    obj.push(_this.arr_obj);
                    MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                });
                break;
            case 10009:
                this.arr_obj = [];
                /**
                 * bartizan
                 */
                this.showEff(evt.data[0].id, function () {
                    var obj = [];
                    obj.push(evt.data[0].id);
                    obj.push(_this.arr_obj);
                    MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS, obj);
                });
                break;
        }
    };
    /**
     * Click Finish
     */
    BattleView.prototype.touchEnd = function (evt) {
        if (!this.moveCard) {
            return;
        }
        if (!this.beginPoint || (this.beginPoint && Math.abs(evt.stageY - this.beginPoint.y) <= 100)) {
            MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_MOVE_CARD);
            this.moveCard = null;
            return;
        }
        if (Math.floor(this.moveCard.id / 10) == 10010 || Math.floor(this.moveCard.id / 10) == 1000) {
            // if(img.GameUtil.hitPoint(this.soldierGroup,evt.stageX,evt.stageY))
            // // if((evt.stageX<this.stage.stageWidth/2-50)&&(evt.stageY<(this.stage.stageHeight-100))&&(evt.stageY>150))
            // {
            var obj = {};
            obj["ownNum"] = this.moveCard.cfg.ownNum - 1;
            obj["atk"] = this.moveCard.cfg.atk;
            GlobalFun.refreshCardData(this.moveCard.id, obj);
            this.onrefresh();
            MessageManager.inst().dispatch(LocalStorageEnum.RELEASE_SKILLS, [{ type: "gameCard", id: this.moveCard.id, x: evt.stageX, y: evt.stageY }]);
            // }else
            // {
            // 	if(!this.moveCard.visible)
            // 	{
            // 	}else
            // 	{
            // 		UserTips.inst().showTips("Not in use area");
            // 	}
            // }
        }
        else {
            // if(img.GameUtil.hitPoint(this.enemyGroup,evt.stageX,evt.stageY))
            // // if((evt.stageX>this.stage.stageWidth/2+50)&&(evt.stageY<(this.stage.stageHeight-100))&&(evt.stageY>150))
            // {
            var obj = {};
            obj["ownNum"] = this.moveCard.cfg.ownNum - 1;
            obj["atk"] = this.moveCard.cfg.atk;
            GlobalFun.refreshCardData(this.moveCard.id, obj);
            this.onrefresh();
            MessageManager.inst().dispatch(LocalStorageEnum.RELEASE_SKILLS, [{ type: "gameCard", id: this.moveCard.id, x: evt.stageX, y: evt.stageY }]);
            // }else
            // {
            // 	if(!this.moveCard.visible)
            // 	{
            // 	}else
            // 	{
            // 		UserTips.inst().showTips("Not in use area");
            // 	}
            // }
        }
        MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_MOVE_CARD);
        this.moveCard = null;
    };
    /**
     * Remove useless data
     */
    BattleView.prototype.removeItem = function (card) {
        var obj = [];
        for (var i = 0; i < card.length; i++) {
            if (card[i]["insId"] < 100041) {
                if (card[i]["insId"] == 10008 || card[i]["insId"] == 10009) {
                }
                else {
                    obj.push(card[i]);
                }
            }
        }
        for (var i = 0; i < obj.length; i++) {
            card.splice(card.indexOf(obj[i]), 1);
        }
        obj = null;
    };
    /**
     * refresh data
     */
    BattleView.prototype.touchShop = function () {
        egret.stopTick(this.execTurnBattle, this);
        ViewManager.inst().open(ShopView, [{ route: "battle" }]);
    };
    BattleView.prototype.touchBack = function () {
        egret.stopTick(this.execTurnBattle, this);
        MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
        ViewManager.inst().open(PauseView, [{ type: this._type }]);
    };
    /**Death of soldier entity */
    BattleView.prototype.roleDead = function (evt) {
        var entitys = evt.data.camp == 1 ? this.ownEntitys : this.enemyEntitys;
        for (var i = 0; i < entitys.length; i++) {
            if (entitys[i] == evt.data.tar) {
                entitys.splice(i, 1);
                break;
            }
        }
    };
    /**Card refresh */
    BattleView.prototype.onrefresh = function () {
        var skillCards = GlobalFun.getCardsFromType(CardType.special_skill, false);
        this.removeItem(skillCards);
        this.arrayCollect.source = skillCards;
        this.list.dataProviderRefreshed();
    };
    /**Both sides enter the scene */
    BattleView.prototype.walkToScene = function () {
        var _this = this;
        SoundManager.inst().playEffect(MUSIC + "run.mp3");
        this.changeState(ActionState.RUN, 1);
        this.changeState(ActionState.RUN, -1);
        var precentw = StageUtils.inst().getWidth() / 1334;
        egret.Tween.get(this.soldierGroup).to({ left: 0 }, 2000 * precentw).call(function () {
            egret.Tween.removeTweens(_this.soldierGroup);
            _this.changeState(ActionState.STAND, 1);
        }, this);
        egret.Tween.get(this.enemyGroup).to({ right: 0 }, 2000 * precentw).call(function () {
            SoundManager.inst().playEffect(MUSIC + "speak.mp3");
            egret.Tween.removeTweens(_this.enemyGroup);
            _this.changeState(ActionState.STAND, -1);
            _this.touchEnabled = true;
            _this.touchChildren = true;
            egret.startTick(_this.execTurnBattle, _this);
        }, this);
        egret.Tween.get(this.ownHpCom).to({ left: 240 }, 2000 * precentw).call(function () {
            egret.Tween.removeTweens(_this.ownHpCom);
        }, this);
        egret.Tween.get(this.enemyHpCom).to({ right: 240 }, 2000 * precentw).call(function () {
            egret.Tween.removeTweens(_this.enemyHpCom);
        }, this);
    };
    /**The battle logic of executing turn system */
    BattleView.prototype.execTurnBattle = function () {
        this.curGameFrame += this.singleFrame;
        if (this.curGameFrame >= this.gameframe) {
            this.curGameFrame = 0;
            this.execBattle();
        }
        return false;
    };
    BattleView.prototype.execBattle = function () {
        var _this = this;
        if (!this.enemyEntitys.length) {
            this.gameWin();
            return;
        }
        if (!this.ownEntitys.length) {
            this.gameFail();
            return;
        }
        /**Collection of objects currently executing attack logic */
        var execEntitys = this.battleCount % 2 ? this.enemyEntitys : this.ownEntitys;
        //Attack group
        var atkGroupIndex = 0;
        var camp = 1;
        if (!(this.battleCount % 2)) {
            //We
            camp = 1;
            atkGroupIndex = (this.battleCount >> 1) > 2 ? (this.battleCount >> 1) % 3 : (this.battleCount >> 1);
        }
        else {
            //enemy
            camp = -1;
            atkGroupIndex = ((this.battleCount - 1) >> 1) > 2 ? ((this.battleCount - 1) >> 1) % 3 : ((this.battleCount - 1) >> 1);
        }
        var atkGroup = [];
        var execAtkedEntitys = this.battleCount % 2 ? this.ownEntitys : this.enemyEntitys;
        var atkedGroup = [];
        this.createAtkedGroup(atkGroupIndex, execEntitys, camp, function (group, index) {
            atkGroup = group;
            if (atkGroup[0].buffWait) {
                _this.battleCount += 1;
                //Speed up waiting time
                _this.curGameFrame += 3000;
                return;
            }
            _this.createAtkedGroup(index, execAtkedEntitys, camp * -1, function (atkedgrop) {
                atkedGroup = atkedgrop;
                //If the currently attacked array exists
                var parentIndex = atkedGroup[0].parentGroupIndex;
                //Offset value
                var offx = 10;
                var mainGeneral;
                var buffBoo;
                atkGroup.forEach(function (item) {
                    if (item.general && item.camp == 1) {
                        mainGeneral = item;
                    }
                });
                var attrstr = [];
                var buffPrompt = 0;
                var buffType = 0;
                if (mainGeneral) {
                    var index_2 = (Math.random() * 100) >> 0;
                    if (index_2 >= 30) {
                        //Activate general talent now
                        // mainGeneral.execAtkAction(mainGeneral.generalId);
                        buffBoo = true;
                        var vo = GlobalFun.getCardDataFromId(mainGeneral.generalId);
                        attrstr = vo.buffAttr.split("_");
                        buffPrompt = vo.buffPrompt;
                        buffType = vo.buffCondition;
                    }
                }
                var attr = _this.calculOwnGroupAtk(atkGroup);
                var tolHp = attr.thp;
                var dmage = attr.atk;
                var atkType = atkGroup[0].soldierAttr.type;
                var atkedType = atkedGroup[0].soldierAttr.type;
                var restritIndex = _this.calculSoldierType(atkType, atkedType);
                dmage += (((dmage * 0.15) >> 0) * restritIndex);
                var dmgboo = false;
                atkGroup.forEach(function (item, index) {
                    // if(buffBoo && mainGeneral && buffType == item.soldierAttr.type && (!item.general)){
                    if (buffBoo && mainGeneral && (!item.general)) {
                        if (!dmgboo) {
                            //Show only once
                            if (attrstr.indexOf('atk') != -1) {
                                dmage += ((dmage * buffPrompt) >> 0);
                            }
                            dmgboo = true;
                            attrstr.forEach(function (str) {
                                var txt = new eui.Label();
                                txt.size = 22;
                                txt.fontFamily = 'fzbwksjw';
                                txt.text = str == "atk" ? "Attack promotion" : "Defense enhancement";
                                item.parent.addChild(txt);
                                txt.textColor = 0x00ff00;
                                txt.x = mainGeneral.x;
                                txt.y = mainGeneral.y - 50 - ((Math.random() * 50) >> 0);
                                GlobalFun.lighting(txt);
                                egret.Tween.get(txt).to({ y: txt.y - 50 }, 1000).to({ alpha: 0, y: txt.y - 100 }, 600).call(function () {
                                    egret.Tween.removeTweens(txt);
                                    if (txt && txt.parent) {
                                        txt.parent.removeChild(txt);
                                    }
                                }, _this);
                            }, _this);
                        }
                        attrstr.forEach(function (str) {
                            if (str == "atk") {
                                item.showAtkBuff();
                            }
                            else {
                                item.showDefBuff(buffPrompt);
                            }
                        }, _this);
                    }
                    var group;
                    if (item.camp == 1) {
                        group = _this.enemyGroup.getChildAt(parentIndex);
                    }
                    else {
                        group = _this.soldierGroup.getChildAt(parentIndex);
                    }
                    if (group) {
                        var stageXY = group.parent.localToGlobal(group.x, group.y);
                        var localXY = item.parent.globalToLocal(stageXY.x, stageXY.y);
                        var standIndex = (item.y / 30) >> 0;
                        item.targetDis = localXY.x + standIndex * item.camp * offx;
                        // offx += 5;
                    }
                    var timeout = setTimeout(function () {
                        clearTimeout(timeout);
                        // if(buffBoo){
                        // 	if(!item.general){item.execAtkAction(mainGeneral.generalId);}
                        // }else{
                        item.execAtkAction();
                        // }
                    }, (Math.random() * 100) >> 0);
                }, _this);
                var self = _this;
                //The attacked array performs the attacked state
                var timeout = setTimeout(function () {
                    var boo = false;
                    atkedGroup.forEach(function (item) {
                        item.execAtkedAction();
                    }, self);
                    self.floatDmgFont(dmage, atkedGroup, parentIndex, null, null, null, restritIndex);
                }, 700);
                _this.battleCount += 1;
            });
        });
    };
    /**Calculate if there is arms restraint */
    BattleView.prototype.calculSoldierType = function (atkType, atkedType) {
        if (atkType == SoldierType.SOLDIER_BU && atkedType == SoldierType.SOLDIER_GONG ||
            atkType == SoldierType.SOLDIER_GONG && atkedType == SoldierType.SOLDIER_QI ||
            atkType == SoldierType.SOLDIER_QI && atkedType == SoldierType.SOLDIER_BU) {
            //Attacker restraint enemy
            return 1;
        }
        else if (atkedType == SoldierType.SOLDIER_BU && atkType == SoldierType.SOLDIER_GONG ||
            atkedType == SoldierType.SOLDIER_GONG && atkType == SoldierType.SOLDIER_QI ||
            atkedType == SoldierType.SOLDIER_QI && atkType == SoldierType.SOLDIER_BU) {
            return -1;
        }
        return 0;
    };
    /**Skill word display */
    BattleView.prototype.showFont = function (cnt, p) {
        var txt = new eui.Label();
        txt.text = cnt;
        txt.size = 25;
        p.parent.addChild(txt);
        txt.scaleX = txt.scaleY = 4;
        txt.alpha = 0;
        txt.anchorOffsetX = txt.width >> 1;
        txt.anchorOffsetY = txt.height >> 1;
        txt.x = p.x;
        txt.y = p.y;
        egret.Tween.get(txt).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.circIn).wait(500).call(function () {
            egret.Tween.removeTweens(txt);
            txt.parent.removeChild(txt);
        }, this);
    };
    /**Floating blood volume */
    BattleView.prototype.floatDmgFont = function (dmage, soldierGroup, parentIndex, offx, offy, fnt, restritIndex) {
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = 0; }
        if (fnt === void 0) { fnt = ""; }
        if (restritIndex === void 0) { restritIndex = 0; }
        var group;
        if (!soldierGroup || (soldierGroup && soldierGroup.length == 0)) {
            return;
        }
        if (soldierGroup[0].camp == 1) {
            group = this.soldierGroup.getChildAt(parentIndex);
        }
        else {
            group = this.enemyGroup.getChildAt(parentIndex);
        }
        //---Blood volume settlement-
        this.reduceHp(soldierGroup, dmage);
        //------------
        var dmgFont = new eui.BitmapLabel();
        if (fnt) {
            dmgFont.font = fnt;
        }
        else {
            dmgFont.font = "dmg_fnt";
        }
        group.parent.addChild(dmgFont);
        if (offx) {
            var x = group.globalToLocal(offx, 0).x + 150;
            dmgFont.x = x;
        }
        else {
            dmgFont.x = group.x;
        }
        dmgFont.y = group.y + offy;
        // dmgFont.scaleX = dmgFont.scaleY = 0.7;
        // dmgFont.scaleX *= this.camp;
        if (restritIndex == 1) {
            dmgFont.text = "c-" + dmage;
        }
        else {
            dmgFont.text = "-" + dmage;
        }
        egret.Tween.get(dmgFont).to({ y: dmgFont.y - 100, alpha: 0 }, 2000).call(function () {
            egret.Tween.removeTweens(dmgFont);
            dmgFont.parent.removeChild(dmgFont);
        }, this);
        return group;
    };
    BattleView.prototype.reduceHp = function (soldierGroup, dmage) {
        var maingeneral = null;
        var soldier = null;
        for (var i = 0; i < soldierGroup.length; i++) {
            if (soldierGroup[i].general) {
                maingeneral = soldierGroup[i];
            }
            else {
                soldier = soldierGroup[i];
            }
        }
        if (!soldier && maingeneral) {
            if (soldierGroup[0].camp == 1) {
                if (dmage > maingeneral.hp) {
                    this.curOwnHp -= maingeneral.hp;
                }
                else {
                    this.curOwnHp -= dmage;
                }
                this.ownHpCom.setData(this.curOwnHp, this.ownHp);
            }
            else {
                if (dmage > maingeneral.hp) {
                    this.curEnemyHp -= maingeneral.hp;
                }
                else {
                    this.curEnemyHp -= dmage;
                }
                this.enemyHpCom.setData(this.curEnemyHp, this.enemtHp);
            }
            maingeneral.reduceHp(dmage);
        }
        if (!maingeneral && soldier && soldier.soldierAttr && soldier.soldierAttr.hp) {
            var num = (dmage / soldier.soldierAttr.hp) >> 0;
            for (var i = 0; i < num; i++) {
                var index = ((Math.random() * soldierGroup.length) >> 0);
                var entity = soldierGroup[index];
                if (entity.camp == 1) {
                    if (dmage > entity.hp) {
                        this.curOwnHp -= entity.hp;
                    }
                    else {
                        this.curOwnHp -= dmage;
                    }
                    this.ownHpCom.setData(this.curOwnHp, this.ownHp);
                }
                else {
                    if (dmage > entity.hp) {
                        this.curEnemyHp -= entity.hp;
                    }
                    else {
                        this.curEnemyHp -= dmage;
                    }
                    this.enemyHpCom.setData(this.curEnemyHp, this.enemtHp);
                }
                entity.reduceHp(soldier.soldierAttr.hp);
            }
        }
        if (maingeneral && soldier && soldier.soldierAttr && soldier.soldierAttr.hp) {
            var mainDmg = (dmage * 0.3) >> 0;
            if (maingeneral.camp == 1) {
                if (dmage > maingeneral.hp) {
                    this.curOwnHp -= maingeneral.hp;
                }
                else {
                    this.curOwnHp -= dmage;
                }
                this.ownHpCom.setData(this.curOwnHp, this.ownHp);
            }
            else {
                if (dmage > maingeneral.hp) {
                    this.curEnemyHp -= maingeneral.hp;
                }
                else {
                    this.curEnemyHp -= dmage;
                }
                this.enemyHpCom.setData(this.curEnemyHp, this.enemtHp);
            }
            maingeneral.reduceHp(mainDmg);
            var soldierDmg = (dmage * 0.7) >> 0;
            var num = (soldierDmg / soldier.soldierAttr.hp) >> 0;
            for (var i = 0; i < num; i++) {
                var index = ((Math.random() * soldierGroup.length) >> 0);
                var entity = soldierGroup[index];
                if (!entity.general) {
                    if (entity.camp == 1) {
                        if (dmage > entity.hp) {
                            this.curOwnHp -= entity.hp;
                        }
                        else {
                            this.curOwnHp -= dmage;
                        }
                        this.ownHpCom.setData(this.curOwnHp, this.ownHp);
                    }
                    else {
                        if (dmage > entity.hp) {
                            this.curEnemyHp -= entity.hp;
                        }
                        else {
                            this.curEnemyHp -= dmage;
                        }
                        this.enemyHpCom.setData(this.curEnemyHp, this.enemtHp);
                    }
                    entity.reduceHp(soldier.soldierAttr.hp);
                }
            }
        }
    };
    /**Calculate the attack power of the corresponding array And the current total blood volume */
    BattleView.prototype.calculOwnGroupAtk = function (group) {
        var tolHp = 0;
        var dmage = ((Math.random() * 20) >> 0);
        var boo = false;
        group.forEach(function (item) {
            tolHp += item.hp;
            dmage += item.soldierAttr.atk;
        }, self);
        return { thp: tolHp, atk: dmage };
    };
    BattleView.prototype.createAtkedGroup = function (atkGroupindex, entitys, camp, cb) {
        var groups = [];
        entitys.forEach(function (item) { if (item.parentGroupIndex == atkGroupindex) {
            groups.push(item);
        } }, this);
        var _newIndex = atkGroupindex;
        if (!groups.length) {
            if (camp == -1) {
                //The current enemy
                var index = this.enemyIndex.indexOf(atkGroupindex);
                if (index != -1) {
                    this.enemyIndex.splice(index, 1);
                }
                if (this.enemyIndex.length) {
                    var newIndex = this.enemyIndex[0];
                    _newIndex = newIndex;
                    this.createAtkedGroup(newIndex, entitys, camp, cb);
                }
                else {
                    return [];
                }
            }
            else {
                //We are now
                var index = this.ownIndex.indexOf(atkGroupindex);
                if (index != -1) {
                    this.ownIndex.splice(index, 1);
                }
                if (this.ownIndex.length) {
                    var newIndex = this.ownIndex[0];
                    _newIndex = newIndex;
                    this.createAtkedGroup(newIndex, entitys, camp, cb);
                }
                else {
                    return [];
                }
            }
        }
        else {
            if (cb) {
                cb(groups, _newIndex);
            }
            return groups;
        }
    };
    /**Game win */
    BattleView.prototype.gameWin = function () {
        var _this = this;
        egret.stopTick(this.execTurnBattle, this);
        console.log("Game win");
        /**victory */
        ViewManager.inst().close(ShopView);
        ViewManager.inst().close(PauseView);
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            SoundManager.inst().playEffect(MUSIC + "win.mp3");
            ViewManager.inst().open(ResultView, [{ state: "win", type: _this._type, cb: function (type) {
                        ViewManager.inst().close(BattleView);
                        if (type) {
                            GlobalFun.changeCityInfo(type, { isEnemy: false });
                        }
                        ViewManager.inst().open(GameMainView, [{ type: _this._type }]);
                    }, arg: _this }]);
        }, 1000);
    };
    /**Game failure */
    BattleView.prototype.gameFail = function () {
        var _this = this;
        egret.stopTick(this.execTurnBattle, this);
        console.log("Game failure");
        ViewManager.inst().close(ShopView);
        ViewManager.inst().close(PauseView);
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            ViewManager.inst().open(ResultView, [{ state: "fail", type: _this._type, cb: function (type) {
                        ViewManager.inst().close(BattleView);
                        if (type) {
                            GlobalFun.changeCityInfo(type, { isEnemy: false });
                        }
                        ViewManager.inst().open(GameMainView, [{ type: _this._type }]);
                    }, arg: _this }]);
        }, 1000);
    };
    /**Change the sequence frame state of solid object */
    BattleView.prototype.changeState = function (state, camp) {
        var entitys = camp == 1 ? this.ownEntitys : this.enemyEntitys;
        entitys.forEach(function (item) {
            item.changeRoleAction(state);
        }, this);
    };
    BattleView.prototype.createLevelSoldier = function (biglevel, smallLevel) {
        var levelcfg = GameCfg.levelCfg[biglevel][smallLevel];
        var group = GlobalFun.getFormation(levelcfg, 1, this.enemyEntitys).group;
        group.right = -370;
        var percentW = StageUtils.inst().getHeight() / 750;
        group.top = 190 * percentW;
        this.enemyGroup = group;
        this.addChildAt(group, 2);
        // for(let i:number = 0;i<levelcfg.length;i++){
        // 	let itemcfg:SoldierRect = GameApp.ownSolderis[i];
        // 	this.createway2(itemcfg,i,-1);
        // }
    };
    /**Create our camp test*/
    BattleView.prototype.createOwnSoldier = function () {
        var group = GlobalFun.getFormation(GameApp.ownSolderis, 0, this.ownEntitys).group;
        group.left = -370;
        var percentH = StageUtils.inst().getHeight() / 750;
        group.top = 190 * percentH;
        this.soldierGroup = group;
        this.addChildAt(group, 1);
        // for(let i:number = 0;i<GameApp.ownSolderis.length;i++){
        // 	let itemcfg:SoldierRect = GameApp.ownSolderis[i];
        // 	this.createway2(itemcfg,i,1);
        // }
    };
    BattleView.prototype.close = function () {
        egret.stopTick(this.execTurnBattle, this);
        if (this.time_num) {
            egret.clearTimeout(this.time_num);
        }
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.onGameStart, this);
        MessageManager.inst().removeListener(CustomEvt.CARD_REFRESH, this.onrefresh, this);
        MessageManager.inst().removeListener(LocalStorageEnum.BEGIN_MOVE_CARD, this.beginMove, this);
        MessageManager.inst().removeListener(LocalStorageEnum.SEND_BATTLE_POS, this.getPos, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        MessageManager.inst().removeListener(CustomEvt.CARD_REFRESH, this.onrefresh, this);
        MessageManager.inst().removeListener("role_dead", this.roleDead, this);
        this.removeTouchEvent(this.shop_btn, this.touchShop);
        this.removeTouchEvent(this.back_btn, this.touchBack);
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
ViewManager.inst().reg(BattleView, LayerManager.UI_Main);
//# sourceMappingURL=BattleView.js.map