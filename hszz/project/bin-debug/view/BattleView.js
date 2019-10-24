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
        _this.initEnergy = 5;
        _this.totalEnergy = 10;
        _this.curEnergy = 5;
        //能量恢复时间
        _this.recoverTimer = 2000;
        _this._entitys = [];
        _this._ownEntitys = [];
        _this._levelEntitys = [];
        _this._singleFrame = 33.3;
        _this._curTime = 0;
        _this.actionExecStandTime = 1000;
        _this.promptLevel = 0.2;
        /**当前游戏时间 */
        _this.curGameTime = 0;
        /**游戏时间 */
        _this.gameTime = 3 * 60;
        /**电脑卡牌生成冷却时间 */
        _this.cardCdTime = 3;
        /**当前电脑于冷却计时 */
        _this.curCdTime = 3;
        /**电脑的当前能量 */
        _this.computerEnergy = 5;
        _this.buildBoo = false;
        return _this;
    }
    BattleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._entitys = [];
        this.computerCards = [];
        this._ownEntitys = [];
        this._levelEntitys = [];
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = CardItem2;
        this.list.dataProvider = this.arrayCollect;
        var dataArr = this.createRandomCard(3, GameApp.locks);
        this.arrayCollect.source = dataArr;
        this.nextGroup["autoSize"]();
        this.nextCard.cardVo = this.createRandomCard(1, GameApp.locks)[0];
        this.energyPro.mask = this.energyMask;
        this.energyMask.width = this.curEnergy / this.totalEnergy * 483;
        this.enemyBar.mask = this.enemyMask;
        this.hpBar.mask = this.hpMask;
        this.computerCards = this.createRandomCard(3, GameApp.allCards, true);
        this.nextComputerCard = this.createRandomCard(1, GameApp.allCards, true)[0];
        this.hpMask.width = this.enemyMask.width = 100;
        // this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
        this.touchRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.touchRect.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.curOwnHp = this.ownHp = GameApp.level * 20000;
        if (GameApp.level <= 3) {
            this.curEnemyhp = this.enemyHp = GameApp.level * 17000;
        }
        else {
            this.curEnemyhp = this.enemyHp = GameApp.level * 23000;
        }
        // this.touchRect.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancle,this);
        // this.touchRect.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCancle,this);
        this.watcher = eui.Binding.bindHandler(this, ["curEnergy"], this.onEnergyChange, this);
        MessageManager.inst().addListener(CustomEvt.ITEM_BEGIN, this.onItemBegin, this);
        MessageManager.inst().addListener(CustomEvt.ITEM_END, this.onEnd, this);
        MessageManager.inst().addListener(CustomEvt.REDUCE_HP, this.onReduceHp, this);
        egret.startTick(this.execAction, this);
        var self = this;
        this.timer = new egret.Timer(this.recoverTimer);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
        // this.onTimer(null);
        // let timout = setTimeout(function() {
        // 	clearTimeout(timout);
        // 	self.createComputerEntity();
        // }, 1500);
    };
    BattleView.prototype.execAction = function (timespan) {
        this._curTime += this._singleFrame;
        if (this._curTime >= this.actionExecStandTime) {
            this._curTime = 0;
            this.action(1);
            this.action(-1);
        }
        return false;
    };
    BattleView.prototype.action = function (camp) {
        var ownEntitys = camp == 1 ? this._ownEntitys : this._levelEntitys;
        var levelEntitys = camp == 1 ? this._levelEntitys : this._ownEntitys;
        var _loop_1 = function (i) {
            var item = ownEntitys[i];
            if (item.isDead) {
                for (var j = 0; j < this_1._entitys.length; j++) {
                    if (this_1._entitys[j] == item) {
                        this_1._entitys.splice(j, 1);
                        break;
                    }
                }
                item.dispose();
                ownEntitys.splice(i, 1);
                i -= 1;
                return out_i_1 = i, "continue";
            }
            else {
                if (item.soldierAttr.cardType != 1) {
                    //非建筑单位处理逻辑
                    // let index:number = (Math.random()*levelEntitys.length)>>0;
                    // let atkItem:any;
                    // atkItem = this.getNearByEntity(item,levelEntitys);
                    // if(item.general){
                    // 	if(levelEntitys[0] && levelEntitys[0].general){
                    // 		atkItem = levelEntitys[0];
                    // 	}
                    // }
                    var xy = { x: item.x, y: 0 };
                    if (item.camp == 1) {
                        xy.y = this_1.enemyBorder.y + item.soldierAttr.atkDis;
                    }
                    else {
                        xy.y = this_1.ownBorder.y - item.soldierAttr.atkDis;
                    }
                    if (item.isInAtk) {
                        //打建筑 
                        item.unLookAt();
                        item.execAtkAction();
                    }
                    else {
                        item.execMoveAction({ x: xy.x, y: xy.y }, function () {
                            //当前移动到了塔的附近 到达了攻击距离 //执行攻击
                            item.isInAtk = true;
                        }, this_1);
                        for (var key in levelEntitys) {
                            var dis = egret.Point.distance(new egret.Point(item.x, item.y), new egret.Point(levelEntitys[key].x, levelEntitys[key].y));
                            if (dis <= item.soldierAttr.atkDis) {
                                //进入了攻击范围
                                item.lookAt(levelEntitys[key]);
                                item.execAtkAction();
                                break;
                            }
                        }
                    }
                    // if(item.isInAtkDis()){
                    // 	//在攻击距离
                    // 	console.log("进入攻击距离");
                    // }else{
                    // 	// let dicObj:boolean = this.checkYBlock(item,ownEntitys);
                    // 	// if(dicObj){
                    // 	// 	//当前y轴前方有阻挡
                    // 	// 	item.waitMoveAction();
                    // 	// }else{
                    // 	// }
                    // }
                }
                else {
                    //建筑单位相关处理
                    var dis = item.soldierAttr.atkDis;
                    var atkItem = this_1.getNearByEntity(item, levelEntitys);
                    if (atkItem) {
                        var curDis = egret.Point.distance(new egret.Point(atkItem.x, atkItem.y), new egret.Point(item.x, item.y));
                        if (curDis <= dis && !item.cdstate) {
                            //当前进入了攻击距离;
                            item.execAtkAction();
                            var skillMc = new MovieClip();
                            this_1.addChild(skillMc);
                            skillMc.playFile(EFFECT + "skill/skill_1005", 1, null, true);
                            skillMc.x = atkItem.x;
                            skillMc.y = atkItem.y;
                            if (atkItem instanceof SoldierEntity) {
                                atkItem.reduceHp(item.soldierAttr.atk);
                            }
                        }
                    }
                }
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        for (var i = 0; i < ownEntitys.length; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        this.dealLayerRelation();
    };
    /**处理层级显示关系 */
    BattleView.prototype.dealLayerRelation = function () {
        this._entitys.sort(this.sortFun);
        for (var i = 0; i < this._entitys.length; i++) {
            this.setChildIndex(this._entitys[i], 3 + i);
        }
    };
    BattleView.prototype.sortFun = function (param1, param2) {
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
    /**检测y轴是否有阻挡 */
    BattleView.prototype.checkYBlock = function (item, entitys) {
        var obj = { dit: null };
        var y = item.y;
        for (var i = 0; i < entitys.length; i++) {
            var otherItem = entitys[i];
            if (item != otherItem) {
                var oy = otherItem.y;
                if (y - oy <= 15 && y - oy >= 0) {
                    return true;
                }
            }
        }
        return false;
    };
    /**获取最近攻击单位 */
    BattleView.prototype.getNearByEntity = function (atkEntity, soldiers) {
        var minEntity = soldiers[0];
        if (minEntity) {
            var dis = Math.sqrt(Math.pow(minEntity.x - atkEntity.x, 2) + Math.pow(minEntity.y - atkEntity.y, 2));
            // let len:number = soldiers.length;
            // if(len >= 15){
            // 	len = 15;
            // }
            // let index:number = (Math.random()*len)>>0;
            // minEntity = soldiers[index];
            for (var i = 0; i < soldiers.length; i++) {
                var item1 = soldiers[i];
                var dis2 = Math.sqrt(Math.pow(item1.x - atkEntity.x, 2) + Math.pow(item1.y - atkEntity.y, 2));
                if (dis2 <= dis) {
                    minEntity = item1;
                    dis = dis2;
                }
            }
        }
        return minEntity;
    };
    BattleView.prototype.onEnergyChange = function () {
        egret.Tween.removeTweens(this.energyMask);
        var width = this.curEnergy / this.totalEnergy * 483;
        egret.Tween.get(this.energyMask).to({ width: width }, this.recoverTimer - 50);
    };
    BattleView.prototype.onBegin = function (evt) {
        this.createVirtualCardMode();
        this.refershBorder(evt.stageX, evt.stageY);
    };
    BattleView.prototype.onItemBegin = function (evt) {
        this.onItemTap(null, evt.data.itemIndex);
        this.createVirtualCardMode();
        this.refershBorder(evt.data.x, evt.data.y);
    };
    BattleView.prototype.onTouchMove = function (evt) {
        this.refershBorder(evt.stageX, evt.stageY);
    };
    BattleView.prototype.refershBorder = function (x, y) {
        var group = this.getChildByName("virtualGroup");
        if (!!group) {
            group.x = x;
            group.y = y;
            var circle = group.getChildByName("circle");
            var area = this.curItem.cardVo.cardType == 2 ? this.skillArea : this.ownArea;
            if (group.y <= area.y || group.y >= area.y + area.height) {
                //出了边界的范围
                if (!!circle) {
                    circle.graphics.clear();
                    circle.graphics.beginFill(0xff0000, 0.3);
                    circle.graphics.drawCircle(0, 0, 50);
                    circle.graphics.endFill();
                    this.buildBoo = false;
                }
            }
            else {
                if (!!circle) {
                    var isBuild = true;
                    for (var i = 0; i < this._entitys.length; i++) {
                        var item = this._entitys[i];
                        if (item.soldierAttr.cardType == 1) {
                            if (Math.abs(item.x - group.x) <= 70 && Math.abs(item.y - group.y) <= 70) {
                                isBuild = false;
                            }
                        }
                    }
                    circle.graphics.clear();
                    if (isBuild) {
                        circle.graphics.beginFill(0xffffff, 0.3);
                        circle.graphics.drawCircle(0, 0, 50);
                        circle.graphics.endFill();
                        this.buildBoo = true;
                    }
                    else {
                        circle.graphics.beginFill(0xff0000, 0.3);
                        circle.graphics.drawCircle(0, 0, 50);
                        circle.graphics.endFill();
                        this.buildBoo = false;
                    }
                }
            }
        }
    };
    BattleView.prototype.onEnd = function () {
        if (this.buildBoo && this.curItem) {
            //当前可以建造
            var costEnergy = this.curItem.cardVo.energy;
            if (this.curEnergy < costEnergy) {
                this.buildBoo = false;
                UserTips.inst().showTips("能量不足");
                this.restoreCardMode();
                // this.curItem.resetCard();
                // this.curItem = null;
                return;
            }
            var group = this.getChildByName("virtualGroup");
            if (this.curItem.cardVo.cardType == 2) {
                this.useSkill(this.curItem.cardVo, { x: group.x, y: group.y });
                this.reduceEnemyHp(this.curItem.cardVo, { x: group.x, y: group.y });
            }
            else if (this.curItem.cardVo.cardType == 0) {
                //当前是entity
                this.createOwnEntity(this.curItem.cardVo, { x: group.x, y: group.y });
            }
            else if (this.curItem.cardVo.cardType == 1) {
                //当前是建筑;
                this.createBuild(this.curItem.cardVo, { x: group.x, y: group.y });
            }
            this.recoverTimer = 200;
            this.curEnergy -= costEnergy;
            this.curItem.cardVo = this.nextCard.cardVo;
            var nextCardVo = this.createRandomCard(1, GameApp.locks)[0];
            this.nextCard.cardVo = nextCardVo;
            this.curItem.resetCard();
            this.curItem = null;
            for (var i = 0; i < this.list.numChildren; i++) {
                var item = this.list.getChildAt(i);
                item.showCd();
            }
        }
        else {
            //不可以建造
        }
        this.restoreCardMode();
    };
    /**使用技能 */
    BattleView.prototype.useSkill = function (cardVo, pos, camp) {
        if (camp === void 0) { camp = 1; }
        var skillMc = new MovieClip();
        this.addChild(skillMc);
        skillMc.playFile(EFFECT + "skill/" + cardVo.model, 1, null, true);
        if (cardVo.id == 15 || cardVo.id == 16) {
            var boomc = new MovieClip();
            this.addChild(boomc);
            this.swapChildren(boomc, skillMc);
            var count = cardVo.id == 15 ? 2 : 5;
            boomc.playFile(EFFECT + "skill/boom2", count, null, true);
            boomc.x = pos.x;
            boomc.y = pos.y;
        }
        skillMc.x = pos.x;
        skillMc.y = pos.y;
    };
    /**点击创建对应的单位实体 */
    BattleView.prototype.createOwnEntity = function (cardVo, pos, camp) {
        if (camp === void 0) { camp = 1; }
        var offestX = pos.x;
        var offestY = pos.y;
        for (var i = 0; i < cardVo.num; i++) {
            var soldier = new SoldierEntity();
            soldier.setSoldierData(camp, cardVo.model, cardVo.id);
            this.addChild(soldier);
            soldier.x = offestX;
            soldier.y = offestY;
            if (camp == 1) {
                this._ownEntitys.push(soldier);
            }
            else {
                this._levelEntitys.push(soldier);
            }
            this._entitys.push(soldier);
            offestX = (pos.x + 80) - 160 * i;
            offestY = pos.y + 50 * camp;
        }
    };
    /**创建电脑卡牌单位 */
    BattleView.prototype.createComputerEntity = function () {
        //首先判断电脑禁区单是否有地方单位;
        var curItem;
        for (var key in this._ownEntitys) {
            var item = this._ownEntitys[key];
            if (item instanceof SoldierEntity) {
                var height = StageUtils.inst().getHeight() - this.enemyArea.top - this.enemyArea.bottom;
                if (item.y <= this.enemyArea.top + height) {
                    curItem = item;
                }
                break;
            }
        }
        var xy = { x: 0, y: 0 };
        var cardIndex = (Math.random() * this.computerCards.length) >> 0;
        var cardVo = this.computerCards[cardIndex];
        if (curItem) {
            //如果当前禁区存在单位
            var dicIndex = (Math.random() * 3) >> 0;
            if (dicIndex == 0) {
                xy.x = curItem.x - cardVo.atkDis + Math.random() * 15;
                xy.y = curItem.y;
            }
            else if (dicIndex == 1) {
                xy.x = curItem.x;
                xy.y = curItem.y - cardVo.atkDis + Math.random() * 15;
            }
            else {
                xy.x = curItem.x + cardVo.atkDis - Math.random() * 15;
                xy.y = curItem.y;
            }
        }
        else {
            var width = StageUtils.inst().getWidth() - this.enemyArea.left - this.enemyArea.right - 150;
            var height = StageUtils.inst().getHeight() - this.enemyArea.top - this.enemyArea.bottom;
            var x = this.enemyArea.left + 50 + ((Math.random() * width) >> 0);
            var y = this.enemyArea.top + ((Math.random() * height) >> 0);
            xy.x = x;
            xy.y = y;
        }
        if (cardVo.energy <= this.computerEnergy && (this.curCdTime >= this.cardCdTime)) {
            //当前电脑能量充足 。并且 不处于cd状态 释放卡牌
            this.curCdTime = 0;
            var self_1 = this;
            var timeInterval_1 = setInterval(function () {
                self_1.curCdTime += 1;
                if (self_1.curCdTime >= self_1.cardCdTime) {
                    clearTimeout(timeInterval_1);
                }
            }, 1000);
            this.computerEnergy -= cardVo.energy;
            if (cardVo.cardType == 0) {
                //当前是实体
                this.createOwnEntity(cardVo, xy, -1);
            }
            else if (cardVo.cardType == 1) {
                //当前是建筑
                this.createBuild(cardVo, xy, -1);
            }
            else if (cardVo.cardType == 2) {
                //当前释放技能  需要选定目标 和目标范围内的对象 如果没有对象 。直接攻击主基地
                if (!this._ownEntitys.length) {
                    //如果没有地方单位 直接攻击主基地
                    var x = StageUtils.inst().getWidth() >> 1;
                    var y = StageUtils.inst().getHeight() - this.ownBorder.bottom + 50;
                    this.useSkill(cardVo, { x: x, y: y }, -1);
                    this.reduceEnemyHp(cardVo, { x: x, y: y }, -1);
                }
                else {
                    //
                    var index = (Math.random() * this._ownEntitys.length) >> 0;
                    var entity = this._ownEntitys[index];
                    //获取到一个目标 。这个目标周围 100米距离单位 都会受到伤害
                    if (entity) {
                        for (var key in this._ownEntitys) {
                            var item = this._ownEntitys[key];
                            var dis = egret.Point.distance(new egret.Point(item.x, item.y), new egret.Point(entity.x, entity.y));
                            if (item != entity && dis <= 100) {
                                item.reduceHp(cardVo.atk);
                            }
                        }
                        entity.reduceHp(cardVo.atk);
                        this.useSkill(cardVo, { x: entity.x, y: entity.y }, -1);
                    }
                }
            }
            for (var key in this.nextComputerCard) {
                this.computerCards[cardIndex][key] = this.nextComputerCard[key];
            }
            this.nextComputerCard = this.createRandomCard(1, GameApp.allCards, true)[0];
        }
    };
    /**点击创建建筑单位 */
    BattleView.prototype.createBuild = function (cardVo, pos, camp) {
        if (camp === void 0) { camp = 1; }
        var buildEntity = new BuildEntity();
        buildEntity.setBuildData(camp, cardVo);
        this.addChild(buildEntity);
        buildEntity.anchorOffsetX = buildEntity.width >> 1;
        buildEntity.anchorOffsetY = buildEntity.height >> 1;
        if (camp == 1) {
            this._ownEntitys.push(buildEntity);
        }
        else {
            this._levelEntitys.push(buildEntity);
        }
        this._entitys.push(buildEntity);
        buildEntity.x = pos.x;
        buildEntity.y = pos.y;
    };
    BattleView.prototype.reduceEnemyHp = function (cardVo, pos, camp) {
        if (camp === void 0) { camp = 1; }
        if (camp == 1) {
            if (pos.y <= this.enemyBorder.y + this.enemyBorder.height) {
                //当前技能 伤害到了敌方的基地塔
                this.curEnemyhp -= cardVo.atk;
                if (this.curEnemyhp <= 0) {
                    //游戏结束 胜利
                    this.gameWin();
                    this.curEnemyhp = 0;
                }
                this.enemyMask.width = this.curEnemyhp / this.enemyHp * 100;
            }
            for (var key in this._levelEntitys) {
                var enemyItem = this._levelEntitys[key];
                //当前距离小于100米 。在技能攻击范围
                var dis = egret.Point.distance(new egret.Point(enemyItem.x, enemyItem.y), new egret.Point(pos.x, pos.y));
                if (dis <= 100 && enemyItem) {
                    enemyItem.reduceHp(cardVo.atk);
                }
            }
        }
        else {
            this.curOwnHp -= cardVo.atk;
            if (this.curOwnHp <= 0) {
                //游戏结束 失败
                this.gameFail();
                this.curOwnHp = 0;
            }
            this.hpMask.width = this.curOwnHp / this.ownHp * 100;
        }
    };
    BattleView.prototype.onReduceHp = function (evt) {
        if (evt.data.camp == 1) {
            this.curEnemyhp -= evt.data.hp;
            if (this.curEnemyhp <= 0) {
                //游戏结束
                this.gameWin();
                this.curEnemyhp = 0;
            }
            this.enemyMask.width = this.curEnemyhp / this.enemyHp * 100;
        }
        else {
            this.curOwnHp -= evt.data.hp;
            if (this.curOwnHp <= 0) {
                //游戏失败
                this.gameFail();
                this.curOwnHp = 0;
            }
            this.hpMask.width = this.curOwnHp / this.ownHp * 100;
        }
    };
    BattleView.prototype.gameWin = function () {
        this.timer.stop();
        egret.stopTick(this.execAction, this);
        console.log("游戏胜利");
        ViewManager.inst().open(OverView, [{ state: "win", hp: this.ownHp }]);
    };
    BattleView.prototype.gameFail = function () {
        this.timer.stop();
        egret.stopTick(this.execAction, this);
        console.log("游戏失败");
        ViewManager.inst().open(OverView, [{ state: "failure", hp: 0 }]);
    };
    // private onCancle():void{
    // 	this.restoreCardMode();
    // }
    /**创建虚拟卡组形象 */
    BattleView.prototype.createVirtualCardMode = function () {
        if (!!this.curItem) {
            var group = new eui.Group();
            group.touchEnabled = false;
            group.touchChildren = false;
            group.touchThrough = false;
            group.name = "virtualGroup";
            this.addChild(group);
            var circle = new egret.Shape();
            circle.name = "circle";
            group.addChild(circle);
            circle.graphics.beginFill(0xffffff, 0.3);
            circle.graphics.drawCircle(0, 0, 50);
            circle.graphics.endFill();
            if (this.curItem.cardVo.cardType == 0) {
                //实体
                var cardMode = new MovieClip();
                group.addChild(cardMode);
                cardMode.playFile("" + EFFECT + this.curItem.cardVo.model + "_stand", -1, null, false, "1");
                cardMode.alpha = 0.3;
                cardMode.scaleX = cardMode.scaleY = 0.5;
            }
            else if (this.curItem.cardVo.cardType == 1) {
                //建筑
            }
            else if (this.curItem.cardVo.cardType == 2) {
            }
            return group;
        }
    };
    /**还原 */
    BattleView.prototype.restoreCardMode = function () {
        var group = this.getChildByName("virtualGroup");
        if (!!group) {
            group.parent.removeChild(group);
        }
    };
    BattleView.prototype.onItemTap = function (evt, index) {
        if (index === void 0) { index = 0; }
        if (!!this.curItem) {
            this.curItem.resetCard();
        }
        var item = this.list.getChildAt(evt ? evt.itemIndex : index);
        if (item.ifInCd) {
            UserTips.inst().showTips("冷却中");
            return;
        }
        if (item != this.curItem) {
            this.curItem = item;
            item.upCard();
        }
    };
    BattleView.prototype.onTimer = function (evt) {
        if (this.computerEnergy < this.totalEnergy) {
            this.computerEnergy += 1;
        }
        this.curGameTime += 1;
        if (this.curGameTime >= this.gameTime) {
            if (this.ownHp > this.enemyHp) {
                this.gameWin();
            }
            else {
                this.gameFail();
            }
            return;
        }
        this.remainTime.text = DateUtils.getFormatBySecond(this.gameTime - this.curGameTime, DateUtils.TIME_FORMAT_1);
        if (this.curCdTime >= this.cardCdTime) {
            //当前计时结束 可以生成新的电脑卡牌
            this.createComputerEntity();
        }
        if (this.curEnergy >= this.totalEnergy) {
            return;
        }
        this.recoverTimer = 2000;
        this.curEnergy += 1;
    };
    /**
     * 随机生成卡牌
     * @param num 生成的数量
     * */
    BattleView.prototype.createRandomCard = function (num, gathers, isPrompt) {
        if (isPrompt === void 0) { isPrompt = false; }
        var cards = gathers;
        var arr = [];
        for (var i = 0; i < num; i++) {
            var index = (Math.random() * cards.length) >> 0;
            if (isPrompt) {
                if (GameApp.level == 1) {
                    this.promptLevel = -Math.abs(this.promptLevel);
                }
                else {
                    this.promptLevel = Math.abs(this.promptLevel);
                }
                cards[index].atk += (cards[index].atk * this.promptLevel * GameApp.level);
                cards[index].hp += (cards[index].atk * this.promptLevel * GameApp.level);
            }
            arr.push(cards[index]);
        }
        return arr;
    };
    BattleView.prototype.close = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        if (this.watcher) {
            this.watcher.unwatch();
        }
        MessageManager.inst().removeListener(CustomEvt.ITEM_BEGIN, this.onItemBegin, this);
        MessageManager.inst().removeListener(CustomEvt.ITEM_END, this.onEnd, this);
        MessageManager.inst().removeListener(CustomEvt.REDUCE_HP, this.onReduceHp, this);
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
ViewManager.inst().reg(BattleView, LayerManager.UI_Main);
//# sourceMappingURL=BattleView.js.map