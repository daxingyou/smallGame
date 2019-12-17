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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.cardAny_qian = [];
        _this.cardAny_hou = [];
        _this.pp = [];
        _this.np = [];
        return _this;
    }
    GameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        if (param[0] && param[0].type) {
            this._type = param[0].type;
        }
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addTouchEvent(this.fight_btn, this.touchFight);
        this.addTouchEvent(this.shop_btn, this.touchShop);
        this.addTouchEvent(this.back_btn, this.touchBack);
        MessageManager.inst().addListener(LocalStorageEnum.CREATE_MOVE_ROLE, this.createMove, this);
        MessageManager.inst().addListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateCard, this);
        MessageManager.inst().addListener(LocalStorageEnum.CREATE_MOVE_BUILD, this.createBuild, this);
        MessageManager.inst().addListener(LocalStorageEnum.SWITCH_NPC, this.switchNpc, this);
        MessageManager.inst().addListener(LocalStorageEnum.SWITCH_PLAPER, this.switchPlayer, this);
        MessageManager.inst().addListener(LocalStorageEnum.CREATE_BULLET, this.createBullet, this);
        MessageManager.inst().addListener(LocalStorageEnum.CREATE_MOVE_SKILL, this.createSkill, this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
        MessageManager.inst().addListener(CustomEvt.CARD_REFRESH, this.updateCard, this);
    };
    GameView.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.removeTouchEvent(this.fight_btn, this.touchFight);
        this.removeTouchEvent(this.shop_btn, this.touchShop);
        this.removeTouchEvent(this.back_btn, this.touchBack);
        MessageManager.inst().removeListener(LocalStorageEnum.CREATE_MOVE_ROLE, this.createMove, this);
        MessageManager.inst().removeListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateCard, this);
        MessageManager.inst().removeListener(LocalStorageEnum.CREATE_MOVE_BUILD, this.createBuild, this);
        MessageManager.inst().removeListener(LocalStorageEnum.SWITCH_NPC, this.switchNpc, this);
        MessageManager.inst().removeListener(LocalStorageEnum.SWITCH_PLAPER, this.switchPlayer, this);
        MessageManager.inst().removeListener(LocalStorageEnum.CREATE_BULLET, this.createBullet, this);
        MessageManager.inst().removeListener(LocalStorageEnum.CREATE_MOVE_SKILL, this.createSkill, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
        MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
        egret.Tween.removeAllTweens();
        GameCfg.gameStart = false;
        GameCfg.wjAny = [];
        GameCfg.playerPH = GameCfg.playerPH_max = 0;
        GameCfg.npcPH = GameCfg.npcPH_max = 0;
        if (!GameCfg.gameStart) {
            if (GameCfg.level != 4) {
                GameApp.goods += (GameCfg.level * 100);
            }
            else {
                GameApp.medal += 1;
            }
            for (var i = 0; i < this.pp.length; i++) {
                if (egret.getQualifiedClassName(this.pp[i].soldierQian[0]) == "Player") {
                    if (this.pp[i].soldierQian[0].id == 1)
                        GameApp.soldier1Num += 20;
                    else if (this.pp[i].soldierQian[0].id == 2)
                        GameApp.soldier2Num += 20;
                    else if (this.pp[i].soldierQian[0].id == 3)
                        GameApp.soldier3Num += 20;
                }
                else if (egret.getQualifiedClassName(this.pp[i].soldierQian[0]) == "Build") {
                    var card = GlobalFun.getCardDataFromId(this.pp[i].soldierQian[0].id);
                    GlobalFun.refreshCardData(card.insId, { ownNum: card.ownNum });
                }
            }
        }
        for (var i = 0; i < this.pp.length; i++) {
            this.pp[i].removeMySelf();
            this.pp.splice(i, 1);
            i--;
        }
        for (var i = 0; i < this.np.length; i++) {
            this.np[i].removeMySelf();
            this.np.splice(i, 1);
            i--;
        }
    };
    GameView.prototype.gameStart = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        egret.Tween.resumeTweens(this);
        egret.Tween.resumeTweens(this.np[0]);
        egret.Tween.resumeTweens(this.pp[0]);
    };
    GameView.prototype.gamePause = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        egret.Tween.pauseTweens(this);
        egret.Tween.pauseTweens(this.np[0]);
        egret.Tween.pauseTweens(this.pp[0]);
    };
    GameView.prototype.touchShop = function () {
        ViewManager.inst().open(ShopView);
    };
    GameView.prototype.touchBack = function () {
        MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
        ViewManager.inst().open(PauseView, [{ type: this._type }]);
    };
    GameView.prototype.init = function () {
        this.card_group["autoSize"]();
        this.up_group["autoSize"]();
        this.tip_group["autoSize"]();
        this.game_icon.source = "game_icon" + Math.floor(Math.random() * 3) + "_png";
        this.player_lc.text = "粮草：" + GameApp.goods;
        this.fighting_p.text = "战斗力：" + GameCfg.playerAttack;
        this.fighting_n.text = "战斗力：" + GameCfg.npcAttack;
        var num = 0;
        for (var i = 0; i < GameApp.roleInfo.citys.length; i++) {
            if (GameApp.roleInfo.citys[i].isOwn) {
                num++;
            }
        }
        this.player_cc.text = "城池：" + num;
        this.npc_bl.text = "兵员：" + Math.floor(Math.random() * 5000 + 5000);
        this.npc_cc.text = "城池：" + Math.floor(Math.random() * 1 + 4);
        this.npc_lc.text = "粮草：" + Math.floor(Math.random() * 20000 + 30000);
        // this.posrect["autoSize"]();
        /**创建玩家场地 */
        for (var i = 0; i < 3; i++) {
            this.pp[i] = new PlayerPhalanx(i);
            this.pp[i].x = 367 - i * 183;
            this.pp[i].y = this.posrect.top - 20;
            this.pp[i]["phalanxSize"]();
            this.addChild(this.pp[i]);
        }
        /**创建敌军场地 */
        for (var i = 0; i < 3; i++) {
            this.np[i] = new NpcPhalanx(i);
            this.np[i].x = 967 - (150 - i * 183);
            this.np[i].y = this.posrect.top - 20;
            this.np[i]["phalanxSize"]();
            this.addChild(this.np[i]);
        }
        var self = this;
        window.onorientationchange = function () {
            self.card_group["autoSize"]();
            self.up_group["autoSize"]();
            // self.tip_group["autoSize"]();
            // self.posrect["autoSize"]();
            for (var i = 0; i < 3; i++) {
                self.pp[i].x = 367 - i * 183;
                self.pp[i].y = self.posrect.top - 20;
                self.pp[i]["phalanxSize"]();
                self.np[i].x = 967 - (150 - i * 183);
                self.np[i].y = self.posrect.top - 20;
                self.np[i]["phalanxSize"]();
            }
            // self.posrect["autoSize"]();
            // for(let i = 0; i < 3; i++)
            // {
            // 	if(window.orientation == 0||window.orientation == 180){
            // 		self.np[i].y = self.posrect.y + 40;
            // 		self.pp[i].y = self.posrect.y + 40;
            // 	}else{
            // 		self.np[i].y = self.posrect.y - 40;
            // 		self.pp[i].y = self.posrect.y - 40;
            // 	}
            // }
        };
        this.opening();
        this.bb_num.text = GameApp.soldier3Num + "";
        this.qb_num.text = GameApp.soldier1Num + "";
        this.gb_num.text = GameApp.soldier2Num + "";
        this.list.itemRenderer = GameCardItem;
        this.updateCard();
        this.scroller.scrollPolicyV = "off";
        this.player_tiao.mask = this.player_mask;
        this.npc_tiao.mask = this.npc_mask;
        this.addChild(this.fight_btn);
        this.addChild(this.card_group);
        this.addChild(this.back_btn);
    };
    GameView.prototype.opening = function () {
        var _this = this;
        this.up_group.y = -this.up_group.height;
        egret.Tween.get(this.up_group)
            .wait(500)
            .to({ y: 0 }, 500);
        this.card_group.y = StageUtils.inst().getHeight();
        egret.Tween.get(this.card_group)
            .wait(500)
            .to({ y: StageUtils.inst().getHeight() - this.card_group.height }, 500);
        egret.Tween.get(this)
            .wait(800)
            .call(function () {
            _this.df_label.visible = true;
        });
        this.fight_btn.scaleX = this.fight_btn.scaleY = 0;
        egret.Tween.get(this.fight_btn)
            .wait(2000)
            .to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backInOut);
        this.tip_group.x = -600;
        this.addChildAt(this.tip_group, 9999999);
        egret.Tween.get(this.tip_group)
            .wait(1000)
            .to({ x: this.pp[0].x + this.pp[0].width / 2, y: this.pp[0].y }, 500)
            .wait(300)
            .call(function () {
            _this.jiantou.visible = true;
            _this.addChild(_this.df_label);
            egret.Tween.get(_this.jiantou, { loop: true })
                .to({ y: _this.jiantou.y + 5 }, 100)
                .to({ y: _this.jiantou.y }, 100)
                .to({ y: _this.jiantou.y - 5 }, 100)
                .to({ y: _this.jiantou.y }, 100);
        }, this);
    };
    GameView.prototype.updateCard = function () {
        this.cardAny_qian = [];
        this.cardAny_hou = [];
        for (var i = 0; i < GameApp.cardInfo.length; i++) {
            if (GameApp.cardInfo[i].ownNum >= 1) {
                if (GameApp.cardInfo[i].type == CardType.build || GameApp.cardInfo[i].type == CardType.general || GameApp.cardInfo[i].insId == 10003) {
                    this.cardAny_qian.push(GameApp.cardInfo[i]);
                }
                else {
                    this.cardAny_hou.push(GameApp.cardInfo[i]);
                }
            }
        }
        if (GameCfg.gameStart)
            this.list.dataProvider = new eui.ArrayCollection(this.cardAny_hou);
        else
            this.list.dataProvider = new eui.ArrayCollection(this.cardAny_qian);
    };
    GameView.prototype.update = function () {
        this.bb_num.text = GameApp.soldier3Num + "";
        this.qb_num.text = GameApp.soldier1Num + "";
        this.gb_num.text = GameApp.soldier2Num + "";
        this.fighting_p.text = "战斗力：" + GameCfg.playerAttack;
        this.fighting_n.text = "战斗力：" + GameCfg.npcAttack;
        if (GameCfg.gameStart) {
            this.player_mask.width = GameCfg.playerPH * (this.player_tiao.width / GameCfg.playerPH_max);
            this.npc_mask.width = GameCfg.npcPH * (this.npc_tiao.width / GameCfg.npcPH_max);
        }
        if (!GameCfg.gameStart) {
            var num = 0;
            for (var i = 0; i < this.pp.length; i++) {
                num += this.pp[i].soldierQian.length;
            }
            this.player_bl.text = "兵员：" + num;
        }
    };
    GameView.prototype.switchNpc = function () {
        var _this = this;
        for (var i = 0; i < this.np.length; i++) {
            if (this.np[i].haveObj == false) {
                this.np.splice(i, 1);
                i--;
            }
        }
        if (this.np.length <= 0) {
            /**胜利 */
            setTimeout(function () {
                ViewManager.inst().open(ResultView, [{ state: "win", type: _this._type, cb: function (type) {
                            ViewManager.inst().close(GameView);
                            if (type) {
                                GlobalFun.changeCityInfo(type, { isEnemy: false });
                            }
                            ViewManager.inst().open(GameMainView, [{ type: _this._type }]);
                        }, arg: _this }]);
            }, 1000);
        }
        else {
            egret.Tween.get(this.np[0])
                .to({ x: StageUtils.inst().getWidth() - (150 + this.np[0].width) }, 500)
                .call(function () {
                _this.np[0].id = 0;
                MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, _this);
            });
        }
    };
    GameView.prototype.switchPlayer = function () {
        var _this = this;
        for (var i = 0; i < this.pp.length; i++) {
            if (this.pp[i].haveObj == false) {
                this.pp.splice(i, 1);
                i--;
            }
        }
        if (this.pp.length <= 0) {
            /**失败 */
            setTimeout(function () {
                ViewManager.inst().open(ResultView, [{ state: "fail", type: _this._type, cb: function (type) {
                            ViewManager.inst().close(GameView);
                            if (type) {
                                GlobalFun.changeCityInfo(type, { isEnemy: false });
                            }
                            ViewManager.inst().open(GameMainView, [{ type: _this._type }]);
                        }, arg: _this }]);
            }, 1000);
        }
        else {
            egret.Tween.get(this.pp[0])
                .to({ x: 150 }, 500)
                .call(function () {
                _this.pp[0].id = 0;
                MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, _this);
            });
        }
    };
    GameView.prototype.touchFight = function () {
        var num = 0;
        for (var i = 0; i < this.pp.length; i++) {
            if (this.pp[i].have) {
                num++;
            }
        }
        if (num == 0) {
            UserTips.inst().showTips("请配置兵力");
            return;
        }
        for (var i = 0; i < this.pp.length; i++) {
            if (this.pp[i].haveObj == false) {
                this.pp[i].id = -1;
                this.removeChild(this.pp[i]);
                this.pp.splice(i, 1);
                i--;
            }
        }
        for (var i = 0; i < this.pp.length; i++) {
            this.pp[i].id = i;
        }
        this.list.dataProvider = new eui.ArrayCollection(this.cardAny_hou);
        GlobalFun.filterToGrey(this.bb);
        GlobalFun.filterToGrey(this.gb);
        GlobalFun.filterToGrey(this.qb);
        this.fight_btn.visible = false;
        MessageManager.inst().dispatch(LocalStorageEnum.GO_FIGHTING, this);
        GameCfg.gameStart = true;
        GameCfg.pp = this.pp;
        GameCfg.np = this.np;
        this.tip_group.visible = false;
        this.df_label.visible = false;
        GameApp.year += 1;
    };
    GameView.prototype.touchBegin = function (evt) {
        switch (evt.target) {
            case this.bb:
                if (GameCfg.gameStart) {
                    UserTips.inst().showTips("不可使用");
                    return;
                }
                if (GameApp.soldier3Num < 20) {
                    UserTips.inst().showTips("步兵数量不足");
                    return;
                }
                this.moveCard = new PlayerCard(3);
                this.moveCard.x = evt.stageX;
                this.moveCard.y = evt.stageY;
                this.addChild(this.moveCard);
                break;
            case this.gb:
                if (GameCfg.gameStart) {
                    UserTips.inst().showTips("不可使用");
                    return;
                }
                if (GameApp.soldier2Num < 20) {
                    UserTips.inst().showTips("弓兵数量不足");
                    return;
                }
                this.moveCard = new PlayerCard(2);
                this.moveCard.x = evt.stageX;
                this.moveCard.y = evt.stageY;
                this.addChild(this.moveCard);
                break;
            case this.qb:
                if (GameCfg.gameStart) {
                    UserTips.inst().showTips("不可使用");
                    return;
                }
                if (GameApp.soldier1Num < 20) {
                    UserTips.inst().showTips("弓兵数量不足");
                    return;
                }
                this.moveCard = new PlayerCard(1);
                this.moveCard.x = evt.stageX;
                this.moveCard.y = evt.stageY;
                this.addChild(this.moveCard);
                break;
        }
    };
    GameView.prototype.touchMove = function (evt) {
        if (!this.moveCard)
            return;
        this.moveCard.x = evt.stageX - this.moveCard.width / 2;
        this.moveCard.y = evt.stageY - this.moveCard.height / 2;
        if (evt.stageY <= StageUtils.inst().getHeight() - 180) {
            this.moveCard.visible = true;
        }
        for (var i = 0; i < this.pp.length; i++) {
            if (evt.stageX >= this.pp[i].x && evt.stageX <= this.pp[i].x + this.pp[i].width &&
                evt.stageY >= this.pp[i].y && evt.stageY <= this.pp[i].y + this.pp[i].height) {
                this.pp[i].setBg(2);
            }
            else {
                this.pp[i].setBg(1);
            }
        }
        for (var i = 0; i < this.np.length; i++) {
            if (evt.stageX >= this.np[i].x && evt.stageX <= this.np[i].x + this.np[i].width &&
                evt.stageY >= this.np[i].y && evt.stageY <= this.np[i].y + this.np[i].height) {
                this.np[i].setBg(2);
            }
            else {
                this.np[i].setBg(1);
            }
        }
    };
    GameView.prototype.touchEnd = function (evt) {
        switch (egret.getQualifiedClassName(this.moveCard)) {
            case "PlayerCard":
                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_PLAYER, [{ type: "player", id: this.moveCard.id, x: evt.stageX, y: evt.stageY }]);
                break;
            case "BuildCard":
                MessageManager.inst().dispatch(LocalStorageEnum.CREATE_PLAYER, [{ type: "build", id: this.moveCard.id, x: evt.stageX, y: evt.stageY }]);
                break;
            case "GameCard":
                MessageManager.inst().dispatch(LocalStorageEnum.RELEASE_SKILLS, [{ type: "gameCard", id: this.moveCard.id, x: evt.stageX, y: evt.stageY }]);
                break;
        }
        // egret.getQualifiedClassName(this.moveCard);
        MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_MOVE_CARD);
        for (var i = 0; i < this.pp.length; i++) {
            this.pp[i].setBg(1);
        }
        for (var i = 0; i < this.np.length; i++) {
            this.np[i].setBg(1);
        }
        this.moveCard = null;
    };
    GameView.prototype.createMove = function (evt) {
        this.moveCard = new PlayerCard(evt.data.card);
        this.moveCard.x = evt.data.x;
        this.moveCard.y = evt.data.y;
        this.moveCard.visible = false;
        this.addChild(this.moveCard);
    };
    GameView.prototype.createBuild = function (evt) {
        this.moveCard = new BuildCard(evt.data.card);
        this.moveCard.x = evt.data.x;
        this.moveCard.y = evt.data.y;
        this.moveCard.visible = false;
        this.addChild(this.moveCard);
    };
    /**创建子弹 */
    GameView.prototype.createBullet = function (evt) {
        var bullet;
        var nx;
        switch (evt.data.type) {
            case "player":
                if (this.np[0].soldierQian.length > 0) {
                    nx = this.np[0].x + this.np[0].soldierQian[0].x;
                }
                else {
                    nx = this.np[0].x + this.np[0].soldierHou[0].x;
                }
                bullet = new Bullet(this.pp[0].x + evt.data.x, this.pp[0].y + evt.data.y, nx + 30, this.pp[0].y + evt.data.y, 0, evt.data.img);
                this.addChild(bullet);
                break;
            case "npc":
                if (this.pp[0].soldierQian.length > 0) {
                    nx = this.pp[0].soldierQian[0].x;
                }
                else {
                    nx = this.pp[0].soldierHou[0].x;
                }
                bullet = new Bullet(this.np[0].x + evt.data.x, this.np[0].y + evt.data.y, nx + 130, this.np[0].y + evt.data.y, 0, evt.data.img);
                this.addChild(bullet);
                break;
        }
    };
    GameView.prototype.createSkill = function (evt) {
        this.moveCard = new GameCard(evt.data.card.type, evt.data.card.insId);
        this.moveCard.x = evt.data.x;
        this.moveCard.y = evt.data.y;
        this.moveCard.visible = false;
        this.addChild(this.moveCard);
    };
    return GameView;
}(BaseEuiView));
__reflect(GameView.prototype, "GameView");
ViewManager.inst().reg(GameView, LayerManager.UI_Main);
//# sourceMappingURL=GameView.js.map