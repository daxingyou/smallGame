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
var DoubtfulView = (function (_super) {
    __extends(DoubtfulView, _super);
    function DoubtfulView() {
        var _this = _super.call(this) || this;
        _this.checkBool = false;
        _this.state = "bt";
        _this.moveRole = [];
        _this.roleAny0 = [];
        _this.roleAny1 = [];
        _this.roleAny2 = [];
        _this.pos = [{ x1: -3, x2: 10 }, { x1: 0, x2: 12 }, { x1: 7, x2: 14 }];
        _this.pos_id = 1;
        _this.formation = 3; /**方阵数量 */
        _this.role_id = 0;
        _this.targetAtk = -1;
        _this.ox = 0;
        _this.oy = 0;
        _this.nx = 0;
        _this.ny = 0;
        return _this;
    }
    DoubtfulView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GameCfg.playerAttack = 0;
        GameCfg.npcAttack = 0;
        GameApp.soldiersNum = 0;
        GameApp.ownSolderis = [{ genrealRes: "", soldierType: 0, soldierID: 0, generalId: 0 }, { genrealRes: "", soldierType: 0, soldierID: 0, generalId: 0 }, { genrealRes: "", soldierType: 0, soldierID: 0, generalId: 0 }];
        if (param[0]) {
            if (param[0].key) {
                this._key = param[0].key;
            }
            if (param[0].num) {
                this._num = param[0].num;
            }
            if (param[0].type) {
                this._type = param[0].type;
            }
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeRole, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.removeRole, this);
        MessageManager.inst().addListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateList, this);
        MessageManager.inst().addListener(LocalStorageEnum.DOUBTFUL_MOVE_ROLE, this.createMoveWj, this);
        MessageManager.inst().addListener(LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER, this.createMoveSoldier, this);
        MessageManager.inst().addListener(CustomEvt.CARD_REFRESH, this.updateList, this);
    };
    DoubtfulView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeRole, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.removeRole, this);
        MessageManager.inst().removeListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateList, this);
        MessageManager.inst().removeListener(LocalStorageEnum.DOUBTFUL_MOVE_ROLE, this.createMoveWj, this);
        MessageManager.inst().removeListener(LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER, this.createMoveSoldier, this);
        MessageManager.inst().removeListener(CustomEvt.CARD_REFRESH, this.updateList, this);
        egret.Tween.removeTweens(this.role_group);
        egret.Tween.removeTweens(this.card_group);
        egret.Tween.removeTweens(this.right_group);
        egret.Tween.removeTweens(this.left_group);
        egret.Tween.removeTweens(this);
        for (var i = 0; i < 5; i++) {
            this["flag_group" + i].removeChildren();
        }
    };
    DoubtfulView.prototype.init = function () {
        for (var i = 0; i < 5; i++) {
            var ani = new MovieClip();
            ani.playFile(EFFECT + "flag1", -1, null, false, "", null, Math.floor(Math.random() * 3 + 7));
            ani.scaleX = -1;
            this["flag_group" + i].addChild(ani);
        }
        this.updateList();
        this.list.itemRenderer = GameCardItem;
        this.list.dataProvider = new eui.ArrayCollection(this.allAny);
        this.scroller.scrollPolicyV = "off";
        this.scroller.bounces = false;
        this.state = "all";
        this.switchBtn(this.all_btn);
        var any = GameCfg.levelCfg[GameCfg.chapter - 1][GameCfg.level - 1];
        var num = 0;
        for (var i = 0; i < 3; i++) {
            var num1 = 0;
            var card = GlobalFun.getCardDataFromId(any[i].soldierID);
            if (any[i].soldierType != 0) {
                num1 = card.atk;
            }
            if ((any[i].soldierType == 3 && i == 0) || (any[i].soldierType == 1 && i == 2) || (any[i].soldierType == 2 && i == 1)) {
                num1 = num1 + Math.floor(num1 * 0.1);
            }
            if (any[i].generalId != 0) {
                var card_1 = GlobalFun.getCardDataFromId(any[i].generalId);
                num1 += card_1.atk;
            }
            num += num1;
        }
        GameCfg.npcAttack = num;
        this.role_group["autoSize"]();
        this.card_group["autoSize"]();
        this.right_group["autoSize"]();
        this.left_group["autoSize"]();
        this.move_group["autoSize"]();
        this.card_group.bottom = -180;
        this.right_group.right = -320;
        this.left_group.left = -200;
        egret.Tween.get(this.card_group)
            .to({ bottom: 0 }, 500);
        egret.Tween.get(this.right_group)
            .to({ right: 0 }, 500);
        egret.Tween.get(this.left_group)
            .to({ left: 0 }, 500);
    };
    DoubtfulView.prototype.touchTap = function (evt) {
        var _this = this;
        switch (evt.target) {
            case this.wj_btn:
                this.state = "wj";
                this.updateList();
                this.switchBtn(this.wj_btn);
                break;
            case this.bt_btn:
                this.state = "bt";
                this.updateList();
                this.switchBtn(this.bt_btn);
                break;
            case this.mj_btn:
                this.state = "mj";
                this.updateList();
                this.switchBtn(this.mj_btn);
                break;
            case this.all_btn:
                this.state = "all";
                this.updateList();
                this.switchBtn(this.all_btn);
                break;
            case this.check:/**查看敌方阵容 */ 
                if (this.checkBool) {
                    UserTips.inst().showTips("不可重复查看！");
                    return;
                }
                if (GameApp.intelligence >= 1) {
                    this.checkBool = true;
                    GameApp.intelligence -= 1;
                    this.checkNpc();
                }
                else {
                    UserTips.inst().showTips("情报值不足");
                }
                break;
            case this.start_game:/**开始按钮 */ 
                SoundManager.inst().playEffect(MUSIC + "collect.mp3");
                if (GameApp.ownSolderis[0].generalId == 0 &&
                    GameApp.ownSolderis[1].generalId == 0 &&
                    GameApp.ownSolderis[2].generalId == 0 &&
                    GameApp.ownSolderis[0].soldierType == 0 &&
                    GameApp.ownSolderis[1].soldierType == 0 &&
                    GameApp.ownSolderis[2].soldierType == 0) {
                    UserTips.inst().showTips("请配置上阵兵力！");
                }
                else {
                    GameApp.year += 1;
                    SoundManager.inst().playEffect(MUSIC + "ready.mp3");
                    SoundManager.inst().playBg(MUSIC + "fight.mp3");
                    if (this._key && this._num) {
                        GameApp[this._key] -= this._num;
                    }
                    SoundManager.inst().touchBg();
                    /**开始游戏 */
                    egret.Tween.get(this.card_group)
                        .to({ bottom: -180 }, 500);
                    egret.Tween.get(this.right_group)
                        .to({ right: -320 }, 500);
                    egret.Tween.get(this.left_group)
                        .to({ left: -200 }, 500);
                    GlobalFun.showCloudAni(2, function () {
                        ViewManager.inst().close(DoubtfulView);
                        ViewManager.inst().open(BattleView, [{ type: _this._type }]);
                    }, this);
                    egret.Tween.get(this.role_group)
                        .to({ x: StageUtils.inst().getWidth() }, 1500, egret.Ease.quintIn);
                    this.goFight();
                    egret.Tween.get(this)
                        .wait(600)
                        .call(function () {
                        // ViewManager.inst().open(Interlude);
                    });
                }
                break;
            case this.back_btn:
                for (var i = 0; i < 3; i++) {
                    if (GameApp.ownSolderis[i].soldierType != 0) {
                        var card = GlobalFun.getCardDataFromId(GameApp.ownSolderis[i].soldierID);
                        if (GameApp.ownSolderis[i].soldierType == 1 || GameApp.ownSolderis[i].soldierType == 2) {
                            card.ownNum += 36;
                        }
                        else {
                            card.ownNum += 24;
                        }
                        GlobalFun.refreshCardData(GameApp.ownSolderis[i].soldierID, { ownNum: card.ownNum });
                    }
                }
                GameApp.ownSolderis = [{ genrealRes: "", soldierType: 0, soldierID: 0, generalId: 0 }, { genrealRes: "", soldierType: 0, soldierID: 0, generalId: 0 }, { genrealRes: "", soldierType: 0, soldierID: 0, generalId: 0 }];
                ViewManager.inst().close(DoubtfulView);
                ViewManager.inst().open(GameMainView);
                break;
            case this.shop_img:
                ViewManager.inst().open(ShopView);
                break;
        }
    };
    /**切换战斗 */
    DoubtfulView.prototype.goFight = function () {
        this.bg0.visible = false;
        this.bg1.visible = false;
        this.bg2.visible = false;
        if (this.roleAny0.length > 0) {
            for (var i = 0; i < this.roleAny0.length; i++) {
                this.roleAny0[i].playFile(EFFECT + "role_" + GameApp.ownSolderis[0].soldierID + "_run", -1);
            }
        }
        if (this.roleAny1.length > 0) {
            for (var i = 0; i < this.roleAny1.length; i++) {
                this.roleAny1[i].playFile(EFFECT + "role_" + GameApp.ownSolderis[1].soldierID + "_run", -1);
            }
        }
        if (this.roleAny2.length > 0) {
            for (var i = 0; i < this.roleAny2.length; i++) {
                this.roleAny2[i].playFile(EFFECT + "role_" + GameApp.ownSolderis[2].soldierID + "_run", -1);
            }
        }
        if (this.wj0) {
            this.wj0.playFile(EFFECT + "role_" + GameApp.ownSolderis[0].generalId + "_run", -1);
        }
        if (this.wj1) {
            this.wj1.playFile(EFFECT + "role_" + GameApp.ownSolderis[1].generalId + "_run", -1);
        }
        if (this.wj2) {
            this.wj2.playFile(EFFECT + "role_" + GameApp.ownSolderis[2].generalId + "_run", -1);
        }
    };
    /**切换按钮状态 */
    DoubtfulView.prototype.switchBtn = function (btn) {
        this.mj_btn.currentState = "up";
        this.bt_btn.currentState = "up";
        this.wj_btn.currentState = "up";
        this.all_btn.currentState = "up";
        btn.currentState = "down";
    };
    /**创建拖动将军 */
    DoubtfulView.prototype.createMoveWj = function (evt) {
        if (this.moveWj) {
            return;
        }
        this.role_inid = evt.data.card;
        this.createMoveWj0(evt.data.card);
    };
    DoubtfulView.prototype.createMoveWj0 = function (_id) {
        this.moveWj = new MovieClip();
        this.moveWj.visible = false;
        this.moveWj.playFile(EFFECT + "role_" + _id + "_stand", -1);
        this.addChild(this.moveWj);
    };
    /**创建将军 */
    DoubtfulView.prototype.createWj = function (id, group, group_id) {
        for (var i = 0; i < GameApp.ownSolderis.length; i++) {
            if (GameApp.ownSolderis[i].generalId == this.role_inid) {
                UserTips.inst().showTips("将军不可重复使用!");
                return;
            }
        }
        GameApp.soldiersNum++;
        this["wj" + id] = new MovieClip();
        this["wj" + id].playFile(EFFECT + "role_" + this.role_inid + "_stand", -1);
        group.addChild(this["wj" + id]);
        var card = GlobalFun.getCardDataFromId(this.role_inid);
        this.updateAtk(card.atk, 0, group_id);
        if (group_id != null) {
            GameApp.ownSolderis[group_id].generalId = this.role_inid;
        }
        this.updateList();
    };
    /**创建士兵 _formation方阵数量 _id兵种id _group创建的容器 _any人物集合*/
    DoubtfulView.prototype.createMoveBing = function (_formation, _id, _group, group_id, _any, move) {
        this.formation = _formation;
        this.role_id = _id;
        _group.removeChildren();
        _any.splice(0, _any.length);
        var _y = 0;
        if (group_id != null) {
            GameApp.ownSolderis[group_id].soldierID = _id;
            var card = GlobalFun.getCardDataFromId(_id);
            GameApp.ownSolderis[group_id].soldierType = card.soldierType;
        }
        else {
            group_id = this.pos_id;
        }
        switch (_id) {
            case 100105:
            case 100106:
            case 100112:
                switch (_formation) {
                    case 3:
                        for (var i = 0; i < 3; i++) {
                            for (var j = 0; j < 12; j++) {
                                var ani = new MovieClip();
                                ani.playFile(EFFECT + "role_" + _id + "_stand", -1);
                                _any.push(ani);
                                _group.addChild(ani);
                                if (move)
                                    ani.alpha = 0.7;
                                if (_id == 100106) {
                                    ani.scaleX = ani.scaleY = 0.8;
                                }
                                ani.x = 6 + i * 30 - Math.floor(j / 4) * this.pos[group_id].x1 * ani.scaleX - j * this.pos[group_id].x2;
                                ani.y = 18 + j * 28 + Math.floor(j / 4) * 28;
                            }
                        }
                        break;
                    case 2:
                        for (var i = 0; i < 3; i++) {
                            for (var j = 0; j < 12; j++) {
                                var ani = new MovieClip();
                                ani.playFile(EFFECT + "role_" + _id + "_stand", -1);
                                _any.push(ani);
                                _group.addChild(ani);
                                if (move)
                                    ani.alpha = 0.7;
                                if (_id == 100106) {
                                    ani.scaleX = ani.scaleY = 0.8;
                                }
                                ani.x = 6 + i * 30 - Math.floor(j / 6) * (this.pos[group_id].x1 + 20 + group_id * 2) * ani.scaleX - j * (this.pos[group_id].x2 - 2);
                                ani.y = 10 + j * 27 + Math.floor(j / 6) * 70;
                            }
                        }
                        break;
                }
                break;
            case 100109:
            case 100110:
            case 100113:
            case 100107:
                switch (_formation) {
                    case 3:
                        for (var i = 0; i < 2; i++) {
                            for (var j = 0; j < 12; j++) {
                                var ani = new MovieClip();
                                ani.playFile(EFFECT + "role_" + _id + "_stand", -1);
                                _any.push(ani);
                                _group.addChild(ani);
                                if (move)
                                    ani.alpha = 0.7;
                                ani.x = 5 + i * 62 - Math.floor(j / 4) * this.pos[group_id].x1 * ani.scaleX - j * (this.pos[group_id].x2);
                                ani.y = 18 + j * 28 + Math.floor(j / 4) * 28;
                            }
                        }
                        break;
                    case 2:
                        for (var i = 0; i < 2; i++) {
                            for (var j = 0; j < 12; j++) {
                                var ani = new MovieClip();
                                ani.playFile(EFFECT + "role_" + _id + "_stand", -1);
                                _any.push(ani);
                                _group.addChild(ani);
                                if (move)
                                    ani.alpha = 0.7;
                                ani.x = 5 + i * 62 - Math.floor(j / 6) * (this.pos[group_id].x1 + 20 + group_id * 8) * ani.scaleX - j * (this.pos[group_id].x2 - 2);
                                ani.y = 8 + j * 27 + Math.floor(j / 6) * 76;
                            }
                        }
                        break;
                }
                break;
        }
        var num = 0;
        if (!move) {
            GameApp.soldiersNum += _any.length;
            var card = GlobalFun.getCardDataFromId(_id);
            card.ownNum -= _any.length;
            GlobalFun.refreshCardData(_id, { ownNum: card.ownNum });
            this.updateList();
            if (_any.length > 0) {
                num += card.atk;
            }
            if ((card.soldierType == 1 && group_id == 2) || (card.soldierType == 2 && group_id == 1) || (card.soldierType == 3 && group_id == 0)) {
                num = num + Math.floor(num * 0.1);
            }
            this.updateAtk(num, 0, group_id);
        }
    };
    /**移除士兵 */
    DoubtfulView.prototype.removeBing = function (_group, group_id, _any, _id) {
        var num = 0;
        if (_any != this.moveRole) {
            GameApp.soldiersNum -= _any.length;
            var card = GlobalFun.getCardDataFromId(_id);
            card.ownNum += _any.length;
            GlobalFun.refreshCardData(_id, { ownNum: card.ownNum });
            this.updateList();
            if (_any.length > 0) {
                num += card.atk;
            }
            if ((card.soldierType == 1 && group_id == 2) || (card.soldierType == 2 && group_id == 1) || (card.soldierType == 3 && group_id == 0)) {
                num = num + Math.floor(num * 0.1);
            }
            this.updateAtk(num, 1, group_id);
        }
        _group.removeChildren();
        _any.splice(0, _any.length);
    };
    /**更改位置 */
    DoubtfulView.prototype.setRolePos = function (_role, move, group_id) {
        if (_role.length <= 0)
            return;
        var h_num; /**列 */
        var _formationNum;
        var id = 0;
        if (this["wj" + group_id] != null) {
            _formationNum = 6;
            this.formation = 2;
        }
        else {
            _formationNum = 4;
            this.formation = 3;
        }
        if (_role.length <= 24) {
            h_num = 2;
            for (var i = 0; i < h_num; i++) {
                for (var j = 0; j < 12; j++) {
                    if (move)
                        _role[id].alpha = 0.7;
                    if (_formationNum == 4) {
                        _role[id].x = 8 + i * 62 - Math.floor(j / _formationNum) * this.pos[group_id].x1 * _role[id].scaleX - j * this.pos[group_id].x2;
                        _role[id].y = 18 + j * 28 + Math.floor(j / _formationNum) * 28;
                    }
                    else {
                        _role[id].x = 8 + i * 62 - Math.floor(j / _formationNum) * (this.pos[group_id].x1 + 20 + group_id * 8) * _role[id].scaleX - j * (this.pos[group_id].x2 - 2);
                        _role[id].y = 8 + j * 27 + Math.floor(j / _formationNum) * 76;
                    }
                    id++;
                }
            }
        }
        else {
            h_num = 3;
            for (var i = 0; i < h_num; i++) {
                for (var j = 0; j < 12; j++) {
                    if (move)
                        _role[id].alpha = 0.7;
                    if (_formationNum == 4) {
                        _role[id].x = 6 + i * 30 - Math.floor(j / _formationNum) * this.pos[group_id].x1 * _role[id].scaleX - j * this.pos[group_id].x2;
                        _role[id].y = 18 + j * 28 + Math.floor(j / _formationNum) * 28;
                    }
                    else {
                        _role[id].x = 6 + i * 30 - Math.floor(j / _formationNum) * (this.pos[group_id].x1 + 20 + group_id * 2) * _role[id].scaleX - j * (this.pos[group_id].x2 - 2);
                        _role[id].y = 10 + j * 27 + Math.floor(j / _formationNum) * 70;
                    }
                    id++;
                }
            }
        }
    };
    /** */
    DoubtfulView.prototype.createMoveSoldier = function (evt) {
        var card = evt.data.data;
        if (card.soldierType == 1 || card.soldierType == 2) {
            if (card.ownNum < 36) {
                UserTips.inst().showTips("兵团数量不足！");
                return;
            }
        }
        else if (card.soldierType == 3) {
            if (card.ownNum < 24) {
                UserTips.inst().showTips("兵团数量不足！");
                return;
            }
        }
        var evt1 = evt.data.evt;
        this.move_group.visible = false;
        this.move_group.x = evt1.stageX + 20;
        this.move_group.y = evt1.stageY - 200;
        this.ox = this.nx = evt1.stageX;
        this.oy = this.ny = evt1.stageY;
        this.createMoveBing(2, card.insId, this.move_group, null, this.moveRole, true);
    };
    DoubtfulView.prototype.touchBegin = function (evt) {
        switch (evt.target) {
            case this.touch_wj0:
                this.switchWj(0);
                break;
            case this.touch_wj1:
                this.switchWj(1);
                break;
            case this.touch_wj2:
                this.switchWj(2);
                break;
            case this.bg_rect00:
                this.switchBing(0, evt.stageX, evt.stageY);
                break;
            case this.bg_rect11:
                this.switchBing(1, evt.stageX, evt.stageY);
                break;
            case this.bg_rect22:
                this.switchBing(2, evt.stageX, evt.stageY);
                break;
        }
    };
    /**切换小兵 */
    DoubtfulView.prototype.switchBing = function (_id, _x, _y) {
        if (this["bg_rect" + _id].hitTestPoint(_x, _y) && this["roleAny" + _id].length > 0) {
            this.removeBing(this["role_group" + _id], _id, this["roleAny" + _id], GameApp.ownSolderis[_id].soldierID);
            var point = this.role_group.localToGlobal(this["role_group" + _id].x, this["role_group" + _id].y);
            this.move_group.x = point.x;
            this.move_group.y = point.y;
            this.ox = this.nx = _x;
            this.oy = this.ny = _y;
            if (this["wj" + _id])
                this.createMoveBing(2, GameApp.ownSolderis[_id].soldierID, this.move_group, _id, this.moveRole, true);
            else
                this.createMoveBing(3, GameApp.ownSolderis[_id].soldierID, this.move_group, _id, this.moveRole, true);
            GameApp.ownSolderis[_id].soldierType = 0;
            GameApp.ownSolderis[_id].soldierID = 0;
        }
    };
    /**切换将军 */
    DoubtfulView.prototype.switchWj = function (_id) {
        if (this["wj" + _id]) {
            var card = GlobalFun.getCardDataFromId(GameApp.ownSolderis[_id].generalId);
            this.updateAtk(card.atk, 1, _id);
            GameApp.soldiersNum--;
            this["wj_group" + _id].removeChildren();
            this["wj" + _id] = null;
            this.createMoveWj0(GameApp.ownSolderis[_id].generalId);
            this.updateList();
            this.setRolePos(this["roleAny" + _id], false, _id);
            GameApp.ownSolderis[_id].generalId = 0;
        }
    };
    DoubtfulView.prototype.touchMove = function (evt) {
        this.touchMove1(0, evt.stageX, evt.stageY);
        this.touchMove1(1, evt.stageX, evt.stageY);
        this.touchMove1(2, evt.stageX, evt.stageY);
        this.nx = evt.stageX;
        this.ny = evt.stageY;
        var cx = this.nx - this.ox;
        var cy = this.ny - this.oy;
        this.ox = this.nx;
        this.oy = this.ny;
        if (this.moveWj) {
            if (evt.stageY <= StageUtils.inst().getHeight() - 120) {
                this.moveWj.visible = true;
            }
            this.moveWj.x = evt.stageX;
            this.moveWj.y = evt.stageY + 10;
        }
        if (evt.stageY <= StageUtils.inst().getHeight() - 120) {
            this.move_group.visible = true;
        }
        this.move_group.x += cx;
        this.move_group.y += cy;
    };
    DoubtfulView.prototype.touchEnd = function (evt) {
        // MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_SOLDIERS);
        this.bg0.source = "fight_bg0_png";
        this.bg1.source = "fight_bg1_png";
        this.bg2.source = "fight_bg2_png";
        this.placeRole(0, evt.stageX, evt.stageY);
        this.placeRole(1, evt.stageX, evt.stageY);
        this.placeRole(2, evt.stageX, evt.stageY);
        if (this.moveRole)
            this.removeBing(this.move_group, null, this.moveRole, null);
        if (this.moveWj) {
            this.removeChild(this.moveWj);
            this.moveWj = null;
        }
    };
    DoubtfulView.prototype.removeRole = function () {
        if (this.moveWj) {
            this.removeChild(this.moveWj);
            this.moveWj = null;
        }
    };
    /**移动判定 */
    DoubtfulView.prototype.touchMove1 = function (_id, _x, _y) {
        if (this["bg_rect" + _id].hitTestPoint(_x, _y)) {
            this["bg" + _id].source = "fight_bg" + _id + "_lv_png";
            this.pos_id = _id;
            this.setRolePos(this.moveRole, true, _id);
        }
        else {
            this["bg" + _id].source = "fight_bg" + _id + "_png";
        }
    };
    /**放置 */
    DoubtfulView.prototype.placeRole = function (_id, _x, _y) {
        if (this["bg_rect" + _id].hitTestPoint(_x, _y)) {
            if (this.moveRole.length > 0) {
                if (this["roleAny" + _id].length > 0) {
                    this.removeBing(this["role_group" + _id], _id, this["roleAny" + _id], GameApp.ownSolderis[_id].soldierID);
                }
                this.createMoveBing(this.formation, this.role_id, this["role_group" + _id], _id, this["roleAny" + _id], false);
            }
            if (this.moveWj) {
                if (this["wj" + _id]) {
                    this["wj_group" + _id].removeChild(this["wj" + _id]);
                    this["wj" + _id] = null;
                    var card = GlobalFun.getCardDataFromId(GameApp.ownSolderis[_id].generalId);
                    this.updateAtk(card.atk, 1, _id);
                    GameApp.ownSolderis[_id].generalId = 0;
                }
                this.createWj(_id, this["wj_group" + _id], _id);
                if (this["roleAny" + _id].length > 0) {
                    this.setRolePos(this["roleAny" + _id], false, _id);
                }
            }
        }
    };
    DoubtfulView.prototype.updateList = function () {
        this.wjAny = [];
        this.mjAny = [];
        this.btAny = [];
        this.allAny = [];
        var card = GlobalFun.getOwnCards();
        for (var i = 0; i < card.length; i++) {
            if (card[i].type == CardType.general) {
                this.wjAny.push(card[i]);
            }
            else if (card[i].type == CardType.soldier) {
                this.btAny.push(card[i]);
            }
            else {
                this.mjAny.push(card[i]);
            }
        }
        this.allAny = this.wjAny.concat(this.btAny).concat(this.mjAny);
        if (this.state == "wj") {
            this.list.dataProvider = new eui.ArrayCollection(this.wjAny);
        }
        else if (this.state == "mj") {
            this.list.dataProvider = new eui.ArrayCollection(this.mjAny);
        }
        else if (this.state == "all") {
            this.list.dataProvider = new eui.ArrayCollection(this.allAny);
        }
        else if (this.state == "bt") {
            this.list.dataProvider = new eui.ArrayCollection(this.btAny);
        }
    };
    DoubtfulView.prototype.update = function () {
        this.bb_num.text = GameApp.soldier2Num + "";
        this.qb_num.text = GameApp.soldier3Num + "";
        this.gb_num.text = GameApp.soldier1Num + "";
        this.qingbao.text = "情报:" + GameApp.intelligence;
        this.fighting_p.text = "" + GameCfg.playerAttack;
        this.fighting_n.text = "" + GameCfg.npcAttack;
        this.soldiers.text = "上阵兵量:" + GameApp.soldiersNum;
        if (this.wj0 == null) {
            this.touch_wj0.visible = false;
        }
        else {
            this.touch_wj0.visible = true;
        }
        if (this.wj1 == null) {
            this.touch_wj1.visible = false;
        }
        else {
            this.touch_wj1.visible = true;
        }
        if (this.wj2 == null) {
            this.touch_wj2.visible = false;
        }
        else {
            this.touch_wj2.visible = true;
        }
    };
    /**更新战力 state*/
    DoubtfulView.prototype.updateAtk = function (num, state, group_id) {
        var _this = this;
        this.font_effect.alpha = 2;
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this.font_effect);
        this.font_effect.visible = false;
        this.font_effect.alpha = 1;
        this.font_effect.x = this["role_group" + group_id].x;
        this.font_effect.y = this["role_group" + group_id].y - 50;
        if (this.targetAtk >= 0)
            GameCfg.playerAttack = this.targetAtk;
        if (state == 0) {
            var num1_1 = GameCfg.playerAttack + num;
            this.targetAtk = num1_1;
            this.font_effect.visible = true;
            this.font_effect.text = "+" + num;
            this.font_effect.x = this["role_group" + group_id].x;
            this.font_effect.y = this["role_group" + group_id].y - 50;
            egret.Tween.get(this, { loop: true })
                .wait(10)
                .call(function () {
                GameCfg.playerAttack += 100;
                if (GameCfg.playerAttack >= num1_1) {
                    GameCfg.playerAttack = num1_1;
                    egret.Tween.removeTweens(_this);
                }
            });
        }
        else if (state == 1) {
            var num1_2 = GameCfg.playerAttack - num;
            this.targetAtk = num1_2;
            this.font_effect.visible = true;
            this.font_effect.text = "-" + num;
            this.font_effect.x = this["role_group" + group_id].x;
            this.font_effect.y = this["role_group" + group_id].y - 50;
            egret.Tween.get(this, { loop: true })
                .wait(10)
                .call(function () {
                GameCfg.playerAttack -= 100;
                if (GameCfg.playerAttack <= num1_2) {
                    GameCfg.playerAttack = num1_2;
                    egret.Tween.removeTweens(_this);
                }
            });
        }
        egret.Tween.get(this.font_effect).to({ y: this.font_effect.y - 15 }, 1100)
            .to({ y: this.font_effect.y - 30, alpha: 0 }, 400)
            .call(function () {
            _this.font_effect.visible = false;
            _this.font_effect.alpha = 1;
        })
            .to({ y: this.font_effect.y }, 0)
            .call(function () {
            egret.Tween.removeTweens(_this.font_effect);
        });
    };
    /**查看 */
    DoubtfulView.prototype.checkNpc = function () {
        var any = GameCfg.levelCfg[GameCfg.chapter - 1][GameCfg.level - 1];
        for (var i = 0; i < 3; i++) {
            this["bing_" + i + "_0"].source = "icon_" + any[i].soldierType + "_png";
            if (any[i].generalId != 0)
                this["bing_" + i + "_1"].source = "icon_4_png";
            else
                this["bing_" + i + "_1"].source = "icon_0_png";
            this["bing_" + i + "_2"].source = "icon_" + any[i].soldierType + "_png";
        }
        // egret.Tween.get(this.check)
        // .wait(2500)
        // .call(()=>{
        // 	for(let i = 0; i < 3; i++)
        // 	{
        // 		this["bing_" + i + "_0"].source = "icon_0_png";
        // 		this["bing_" + i + "_1"].source = "icon_0_png";
        // 		this["bing_" + i + "_2"].source = "icon_0_png";
        // 	}
        // 	egret.Tween.removeTweens(this.check);
        // }, this);
    };
    return DoubtfulView;
}(BaseEuiView));
__reflect(DoubtfulView.prototype, "DoubtfulView");
ViewManager.inst().reg(DoubtfulView, LayerManager.UI_Main);
//# sourceMappingURL=DoubtfulView.js.map