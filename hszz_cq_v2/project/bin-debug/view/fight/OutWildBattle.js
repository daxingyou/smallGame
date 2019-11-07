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
var OutWildBattle = (function (_super) {
    __extends(OutWildBattle, _super);
    function OutWildBattle() {
        var _this = _super.call(this) || this;
        _this.singleFrame = 33.3;
        _this.curXunLuoTime = 0;
        _this.execXunLuoTime = 5000;
        _this.gameframe = 1500;
        _this.curGameFrame = 0;
        _this.showing = false;
        _this.activeWeaponNum = 1;
        return _this;
    }
    OutWildBattle.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GameApp.gameEnd = false;
        var index = param[0].fuben == "boss" ? ((Math.random() * 2 + 1) >> 0) : ((Math.random() * 3 + 3) >> 0);
        var res = "map00" + index;
        GameMap.init(RES.getRes(res + "_json"));
        this.expBar.mask = this.expMask;
        this.headImg.source = "head_" + GameApp.sex + "_png";
        this.nameLab.text = GameApp.roleName;
        this.expMask.width = GameApp.exp / (GameApp.level * 500) * 640;
        GameApp.curLevelMapId = res;
        this.tipBg["autoSize"]();
        MapView.inst().initMap();
        if (param[0].fuben == "boss") {
            MapView.inst().initBossMon();
            this.bossHpCom.visible = true;
            this.bossHpCom.initData(GameApp.bossId, GameApp.level * 10, GameApp.level * 10000);
        }
        else {
            MapView.inst().initLevelMonster();
            this.bossHpCom.visible = false;
        }
        for (var i = 0; i < 3; i++) {
            GlobalFun.filterToGrey(this["type_" + i]);
            if (i == GameApp.weapon) {
                this["type_" + i].alpha = 1;
                var mainRole = MapView.inst().roles[0];
                var unlock = false;
                if (GameApp.weapon <= this.activeWeaponNum - 1) {
                    //当前点击的是已经激活的buff
                    unlock = true;
                }
                mainRole.changeWeaponBuff(i, unlock);
            }
            else {
                this["type_" + i].alpha = 0.5;
            }
        }
        this.execAtkAi();
        this.bloodGroup.visible = false;
        this.bloodGroup.alpha = 0;
        // GlobalFun.lighting(this,0xff0000);
        MessageManager.inst().addListener(CustomEvt.DMGSHOW, this.onDmgShow, this);
        MessageManager.inst().addListener(CustomEvt.DMGHIDE, this.onDmgHide, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = CardItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
        egret.Tween.get(this.tipBg, { loop: true }).to({ y: this.tipBg.y - 20 }, 1000).to({ y: this.tipBg.y }, 1000);
        MessageManager.inst().addListener("CardDataRefresh", this.onCardRefresh, this);
        MessageManager.inst().addListener(CustomEvt.BOSS_DMG, this.onRefreshBossCom, this);
        MessageManager.inst().addListener(CustomEvt.BOSS_DEAD, this.onBossDead, this);
        MessageManager.inst().addListener(CustomEvt.GAMEEND, this.onGameEnd, this);
        this.watcher1 = eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        this.watcher2 = eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.watcher3 = eui.Binding.bindHandler(GameApp, ["exp"], this.onExpChange, this);
        this.watcher4 = eui.Binding.bindHandler(GameApp, ["level"], this.onLevelChange, this);
        // MessageManager.inst().addListener(CustomEvt.ITEM_BEGIN,this.onItemBegin,this);
        // MessageManager.inst().addListener(CustomEvt.ITEM_END,this.onItemEnd,this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)
        // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        GlobalFun.refreshCardData();
        this.addTouchEvent(this.rechargeBtn, this.onRecharge, true);
        this.addTouchEvent(this.boxBtn, this.onOpenBox, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    OutWildBattle.prototype.onGameEnd = function (evt) {
        if (evt.data.end == "close") {
            this.onReturn();
        }
        else {
            this.gameWin();
        }
    };
    OutWildBattle.prototype.onTouchTap = function (evt) {
        if (evt.target == this.type_0 || evt.target == this.type_1 || evt.target == this.type_2) {
            var typeIndex = parseInt(evt.target.name);
            GameApp.weapon = typeIndex;
            for (var i = 0; i < 3; i++) {
                if (i == GameApp.weapon) {
                    this["type_" + i].alpha = 1;
                }
                else {
                    this["type_" + i].alpha = 0.5;
                }
            }
            var unlock = false;
            if (GameApp.weapon <= this.activeWeaponNum - 1) {
                //当前点击的是已经激活的buff
                unlock = true;
            }
            var mainRole = MapView.inst().roles[0];
            mainRole.changeWeaponBuff(typeIndex, unlock);
        }
    };
    OutWildBattle.prototype.onBossDead = function () {
        this.bossHpCom.reduceHp();
    };
    OutWildBattle.prototype.onExpChange = function () {
        if (GameApp.exp >= GameApp.level * 500) {
            var remainexp = GameApp.exp - GameApp.level * 500;
            GameApp.level += 1;
            var mainRole = MapView.inst().roles[0];
            mainRole.refreshAttr();
            if (GameApp.level == 2) {
                UserTips.inst().showTips("\u606D\u559C\u89E3\u9501\u6B66\u5668<font color=0x00ff00>[\u7834\u7532\u7BAD]</font>\u53EF\u70B9\u51FB\u53F3\u65B9\u6B66\u5668\u5217\u8868\u5207\u6362");
            }
            else if (GameApp.level == 3) {
                UserTips.inst().showTips("\u606D\u559C\u89E3\u9501\u6B66\u5668<font color=0x00ff00>[\u95EA\u7535\u67AA]</font>\u53EF\u70B9\u51FB\u53F3\u65B9\u6B66\u5668\u5217\u8868\u5207\u6362");
            }
            GameApp.exp = remainexp;
            // this.maxExp = GameApp.level*500;
        }
        // this.progressLab.text = GameApp.exp+"/"+this.maxExp;
        this.expMask.width = GameApp.exp / (GameApp.level * 500) * 640;
    };
    OutWildBattle.prototype.onLevelChange = function () {
        this.levelLab.text = "Lv." + GameApp.level;
        if (GameApp.level == 1) {
            GlobalFun.clearFilters(this.type_0);
            this.activeWeaponNum = 1;
        }
        else if (GameApp.level == 2) {
            this.activeWeaponNum = 2;
            GlobalFun.clearFilters(this.type_0);
            GlobalFun.clearFilters(this.type_1);
        }
        else {
            this.activeWeaponNum = 3;
            GlobalFun.clearFilters(this.type_0);
            GlobalFun.clearFilters(this.type_1);
            GlobalFun.clearFilters(this.type_2);
        }
    };
    /**刷新boss血条组件 */
    OutWildBattle.prototype.onRefreshBossCom = function (evt) {
        this.bossHpCom.reduceHp(evt.data.dmg);
    };
    OutWildBattle.prototype.onRecharge = function () {
        ViewManager.inst().open(RechargePop);
    };
    /**打开在线 */
    OutWildBattle.prototype.onOpenBox = function () {
        ViewManager.inst().open(TreasureBox);
        GameMainView.treasureOpen = true;
    };
    OutWildBattle.prototype.onReturn = function () {
        GameApp.gameEnd = true;
        egret.stopTick(this.execAction, this);
        MapView.inst().clearMapUnit();
        if (GameApp.fuben == "boss") {
            egret.localStorage.setItem(LocalStorageEnum.CDTIME, (new Date().getTime() + 10 * 60 * 1000).toString());
        }
        ViewManager.inst().close(OutWildBattle);
        ViewManager.inst().open(GameMainView);
    };
    OutWildBattle.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        var mainRole = MapView.inst().roles[0];
        if (mainRole.isnoMp && item.cardVo.costMp > 0) {
            //当前没有蓝了
            UserTips.inst().showTips("当前蓝量不足");
            return;
        }
        MapView.inst().roles[0].changeRoleMp(item.cardVo.costMp);
        var stageXy = item.parent.localToGlobal(item.x, item.y);
        var item2 = new CardItem();
        item2.initData(item.cardVo, 1);
        this.addChild(item2);
        item2.x = stageXy.x;
        item2.y = stageXy.y;
        item2.scaleX = item2.scaleY = 0.25;
        item2.anchorOffsetX = item2.width >> 1;
        item2.anchorOffsetY = item2.height >> 1;
        item2.alpha = 0;
        var stagep = mainRole.parent.localToGlobal(mainRole.x, mainRole.y);
        egret.Tween.get(item2).to({ scaleX: 1, scaleY: 1, alpha: 1, x: StageUtils.inst().getWidth() >> 1, y: StageUtils.inst().getHeight() >> 1 }, 300).wait(200).
            to({ x: stagep.x, y: stagep.y, scaleX: 0, scaleY: 0, alpha: 0 }, 150, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(item2);
            if (item2 && item2.parent) {
                item2.parent.removeChild(item2);
            }
        }, this);
        var cardData = GlobalFun.getCardDataFromId(item.cardVo.id);
        var vo = cardData ? cardData : item.cardVo;
        vo.ownNum -= 1;
        GlobalFun.refreshCardData(vo);
        // for(let i:number = 0;i<this.list.$children.length;i++){
        // 	(this.list.$children[i] as CardItem2).showCd();
        // }
        // this.list.removeChild(item);
        this.curItem = item;
        switch (this.curItem.cardVo.cardType) {
            case 0:
                MapView.inst().roles[0].addHp(this.curItem.cardVo.atk);
                break;
            case 1:
                var skillres = ["boom2", "skill_1002", "skill_1003", "skill_1004", "skill_1005"];
                var index = (Math.random() * skillres.length) >> 0;
                GlobalFun.createSkillEff(1, skillres[index], LayerManager.MAP_LAYER, 2, { x: MapView.inst().roles[0].x, y: MapView.inst().roles[0].y });
                var num = this.curItem.cardVo.num;
                for (var i = 0; i < num; i++) {
                    var index_1 = (Math.random() * MapView.inst().monsters.length) >> 0;
                    var mon = MapView.inst().monsters[index_1];
                    if (mon) {
                        mon.reduceHp(this.curItem.cardVo.atk);
                    }
                }
                break;
            case 2:
            case 3:
            case 4:
                this.skillSummon();
                break;
            case 5:
                MapView.inst().roles[0].refreshEquip(this.curItem.cardVo);
                break;
            case 6:
                MapView.inst().roles[0].changeRoleMp(-this.curItem.cardVo.atk);
                break;
        }
    };
    OutWildBattle.prototype.onDmgShow = function () {
        if (!this.showing) {
            this.showing = true;
            this.bloodGroup.visible = true;
            this.bloodGroup.alpha = 0;
            egret.Tween.get(this.bloodGroup, { loop: true }).to({ alpha: 1 }, 600, egret.Ease.circOut).to({ alpha: 0 }, 600, egret.Ease.circOut);
        }
    };
    OutWildBattle.prototype.onDmgHide = function () {
        egret.Tween.removeTweens(this.bloodGroup);
        this.showing = false;
        this.bloodGroup.visible = false;
    };
    /**卡牌数据刷新了 */
    OutWildBattle.prototype.onCardRefresh = function () {
        var viewPoint = this.scroller.viewport.scrollH;
        this.arrayCollect.source = GameApp.ownCards;
        this.list.dataProviderRefreshed();
        this.scroller.viewport.scrollH = viewPoint;
        this.scroller.validateNow();
        this.list.scrollH = viewPoint;
        this.list.validateNow();
    };
    OutWildBattle.prototype.skillSummon = function () {
        var num = this.curItem.cardVo.num;
        var mainRole = MapView.inst().roles[0];
        var scale = 1;
        if (this.curItem.cardVo.cardType == 2) {
            // scale = this.curItem.cardVo.quality*0.1 + 0.6;
            scale = 0.5;
        }
        var _loop_1 = function (i) {
            var vo = { level: 1, atkDis: this_1.curItem.cardVo.atkDis, spd: this_1.curItem.cardVo.spd, atk: this_1.curItem.cardVo.atk + ((Math.random() * 100) >> 0), hp: 3000 };
            var hero = new MonsterEntity();
            hero.setSoldierData(1, this_1.curItem.cardVo.model, vo, this_1.curItem.cardVo.buffTime, scale);
            LayerManager.MAP_LAYER.addChild(hero);
            var xIndex = (Math.random() * 100) >> 0;
            var x = mainRole.x + (xIndex >= 50 ? -1 : 1) * ((Math.random() * 200) >> 0);
            var yIndex = (Math.random() * 100) >> 0;
            var y = mainRole.y + (yIndex >= 50 ? -1 : 1) * ((Math.random() * 200) >> 0);
            hero.x = x;
            hero.y = y;
            hero.alpha = 0;
            hero.scaleX = hero.scaleY = scale;
            var eff = new MovieClip();
            LayerManager.MAP_LAYER.addChild(eff);
            eff.x = x;
            eff.y = y;
            eff.playFile(EFFECT + "bottomCir", 2, null, true);
            egret.Tween.get(hero).to({ alpha: 1 }, 600).call(function () {
                egret.Tween.removeTweens(hero);
                MapView.inst().roles.push(hero);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
    };
    /**执行攻击怪物ai */
    OutWildBattle.prototype.execAtkAi = function () {
        egret.startTick(this.execAction, this);
    };
    OutWildBattle.prototype.gameEnd = function () {
        egret.stopTick(this.execAction, this);
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            ViewManager.inst().open(OverView, [{ state: "failure" }]);
        }, 1000);
    };
    OutWildBattle.prototype.gameWin = function () {
        egret.stopTick(this.execAction, this);
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            ViewManager.inst().open(OverView, [{ state: "win", gold: 50 }]);
        }, 1000);
    };
    OutWildBattle.prototype.execAction = function () {
        this.curXunLuoTime += this.singleFrame;
        this.curGameFrame += this.singleFrame;
        if (this.curXunLuoTime >= this.execXunLuoTime) {
            //怪物自由巡逻
            this.curXunLuoTime = 0;
            for (var key in MapView.inst().monsters) {
                var item = MapView.inst().monsters[key];
                var moveIndex = (Math.random() * GameMap.monsterGrid.length) >> 0;
                var birthXY = GameMap.monsterGrid[moveIndex];
                if (GameMap.walkable(birthXY.col, birthXY.row) && !item.atkState) {
                    var xy = GameMap.grid2Point(birthXY.col, birthXY.row);
                    item.refreshPos(birthXY.col, birthXY.row);
                    item.execMoveAction(xy);
                }
            }
        }
        if (this.curGameFrame >= this.gameframe) {
            this.curGameFrame = 0;
            var roles = MapView.inst().roles;
            // let monsters:any[] = MapView.inst().monsters;
            for (var i = 0; i < roles.length; i++) {
                var roleItem = roles[i];
                if (roleItem.isDead) {
                    if (i == 0) {
                        //游戏结束;
                        this.gameEnd();
                    }
                    roles.splice(i, 1);
                    i -= 1;
                    continue;
                }
                if (MapView.inst().mapClick && roleItem.atkTar && i == 0) {
                    roleItem.atkTar.atkState = false;
                    continue;
                }
                if (!roleItem.atkTar || (roleItem.atkTar && roleItem.atkTar.isDead)) {
                    var nearbyMon = this.getNearByEntity(roleItem);
                    roleItem.lookAt(nearbyMon);
                }
                var dis = egret.Point.distance(new egret.Point(roleItem.x, roleItem.y), new egret.Point(roleItem.atkTar.x, roleItem.atkTar.y));
                if (dis <= roleItem.soldierAttr.atkDis) {
                    if (i == 0) {
                        egret.Tween.removeTweens(roleItem);
                    }
                    else {
                        MapView.inst().moveEnd = true;
                    }
                    roleItem.atkTar.lookAt(roleItem);
                    roleItem.atkTar.execAtkAction();
                    roleItem.execAtkAction();
                }
                else {
                    // let tg:XY = this.returnGrid(roleItem.atkTar.gx,roleItem.atkTar.gy);
                    if (i == 0) {
                        //第一个角色 。为主人公
                        MapView.inst().execMoveAction({ x: roleItem.atkTar.x, y: roleItem.atkTar.y });
                    }
                    else {
                        //召唤出来的伙伴
                        var time = dis / roleItem.soldierAttr.spd;
                        roleItem.execMoveAction({ x: roleItem.atkTar.x, y: roleItem.atkTar.y });
                    }
                }
            }
        }
        this.dealLayerRelation();
        return false;
    };
    /**处理层级显示关系 */
    OutWildBattle.prototype.dealLayerRelation = function () {
        var monsters = MapView.inst().monsters;
        var entitys = monsters.concat(MapView.inst().roles);
        entitys.sort(this.sortFun);
        for (var i = 0; i < entitys.length; i++) {
            if (entitys[i] && entitys[i].parent) {
                entitys[i].parent.setChildIndex(entitys[i], 3 + i + MapView.inst().drops.length);
            }
        }
    };
    /**获取最近攻击单位 */
    OutWildBattle.prototype.getNearByEntity = function (atkEntity) {
        var mons = MapView.inst().monsters;
        var minEntity = mons[0];
        if (minEntity) {
            var dis = Math.sqrt(Math.pow(minEntity.x - atkEntity.x, 2) + Math.pow(minEntity.y - atkEntity.y, 2));
            for (var i = 0; i < mons.length; i++) {
                var item1 = mons[i];
                var dis2 = Math.sqrt(Math.pow(item1.x - atkEntity.x, 2) + Math.pow(item1.y - atkEntity.y, 2));
                if (dis2 <= dis) {
                    minEntity = item1;
                    dis = dis2;
                }
            }
        }
        return minEntity;
    };
    OutWildBattle.prototype.sortFun = function (param1, param2) {
        var s1y = param1.y;
        var s2y = param2.y;
        if (s1y > s2y) {
            return 1;
        }
        else if (s1y < s2y) {
            return -1;
        }
        else {
            return 0;
        }
    };
    OutWildBattle.prototype.close = function () {
        MessageManager.inst().removeListener(CustomEvt.DMGSHOW, this.onDmgShow, this);
        MessageManager.inst().removeListener(CustomEvt.DMGHIDE, this.onDmgHide, this);
        MessageManager.inst().removeListener("CardDataRefresh", this.onCardRefresh, this);
        MessageManager.inst().removeListener(CustomEvt.BOSS_DMG, this.onRefreshBossCom, this);
        MessageManager.inst().removeListener(CustomEvt.BOSS_DEAD, this.onBossDead, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().addListener(CustomEvt.GAMEEND, this.onGameEnd, this);
        this.removeTouchEvent(this.rechargeBtn, this.onRecharge);
        this.removeTouchEvent(this.boxBtn, this.onOpenBox);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        if (this.watcher1) {
            this.watcher1.unwatch();
        }
        if (this.watcher2) {
            this.watcher2.unwatch();
        }
        if (this.watcher3) {
            this.watcher3.unwatch();
        }
        if (this.watcher4) {
            this.watcher4.unwatch();
        }
        // MessageManager.inst().removeListener(CustomEvt.ITEM_BEGIN,this.onItemBegin,this);
        // MessageManager.inst().removeListener(CustomEvt.ITEM_END,this.onItemEnd,this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        // this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)
    };
    return OutWildBattle;
}(BaseEuiView));
__reflect(OutWildBattle.prototype, "OutWildBattle");
ViewManager.inst().reg(OutWildBattle, LayerManager.UI_Main);
//# sourceMappingURL=OutWildBattle.js.map