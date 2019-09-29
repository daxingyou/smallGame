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
        //保存数据 代表格子 坐标
        _this.gridData = {};
        //初始格子数据
        _this.gData = {};
        //回合代表值 1为我方回合 。-1 为敌方回合
        _this.battleCount = 1;
        _this.countTime = 180;
        return _this;
    }
    BattleView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.entitys = [];
        this.focusRects = [];
        this.nameLab.text = LevelCfg.levelCfgs[LevelCfg.chapter - 1].chapter_name;
        //生成关卡格子
        var col = 5;
        var row = 7;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (param[0].blevel == 1) {
                    if (param[0].slevel == 1) {
                        if (i == 0 || i == row - 1) {
                            this.gridData[j + "_" + i] = -1;
                            this.gData[j + "_" + i] = -1;
                            this.createBlock(i * (100), j * (100));
                            continue;
                        }
                        if (j == 0 || j == col - 1) {
                            this.gridData[j + "_" + i] = -1;
                            this.gData[j + "_" + i] = -1;
                            this.createBlock(i * (100), j * (100));
                            continue;
                        }
                    }
                    else if (param[0].slevel == 2) {
                        if ((i == 0 && j == 0) || (i == 0 && j == col - 1) || (i == row - 1 && j == 0) || (i == row - 1 && j == col - 1)) {
                            this.gridData[j + "_" + i] = -1;
                            this.gData[j + "_" + i] = -1;
                            this.createBlock(i * (100), j * (100));
                            continue;
                        }
                    }
                }
                this.gridData[j + "_" + i] = 1;
                this.gData[j + "_" + i] = 1;
                var img = new eui.Image();
                img.source = "grid_png";
                this.gridGroup.addChild(img);
                img.x = j * (100);
                img.y = i * (100);
            }
        }
        var leveCfg = param[0].blevel == 1 ? ChapterCfg.leveCfg[1][param[0].slevel - 1] : ChapterCfg.leveCfg[2][0];
        this._levelCfg = leveCfg;
        this.timer = new egret.Timer(1000, this.countTime);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        //卡牌类型索引
        this.refreshCardShow(0, leveCfg);
        this.refreshCardShow(1, leveCfg);
        //	
        this.refreshTopInfo();
        this.gridGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().addListener("closeStory", this.onCloseStory, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.resetBtn, this.onReset, true);
    };
    BattleView.prototype.onReturn = function () {
        ViewManager.inst().close(BattleView);
        ViewManager.inst().open(ChapterView);
    };
    BattleView.prototype.onReset = function () {
        this.countTime = 180;
        this.timer.reset();
        this.timer.start();
        for (var i = 0; i < this.entitys.length; i++) {
            this.entitys[i].parent.removeChild(this.entitys[i]);
        }
        this.entitys = [];
        egret.Tween.removeAllTweens();
        this.battleCount = 1;
        for (var j = 0; j < this.focusRects.length; j++) {
            this.focusRects[j].parent.removeChild(this.focusRects[j]);
        }
        this.timeLab.text = "180";
        this.focusRects = [];
        this.gridData = this.gData;
        this.refreshCardShow(0, this._levelCfg);
        this.refreshCardShow(1, this._levelCfg);
        this.refreshTopInfo();
    };
    BattleView.prototype.onCloseStory = function () {
        this.showAnimate();
        this.timer.start();
    };
    BattleView.prototype.onTimer = function () {
        this.countTime -= 1;
        if (this.countTime <= 0) {
            this.countTime = 0;
        }
        this.timeLab.text = this.countTime.toFixed();
    };
    BattleView.prototype.onComplete = function () {
        var enemyEntitys = this.getEntitysFromCamp(0);
        if (enemyEntitys.length) {
            this.battleFail();
        }
    };
    /**刷新顶部信息显示 */
    BattleView.prototype.refreshTopInfo = function () {
        var ownEntitys = this.getEntitysFromCamp(1);
        var enemyEntitys = this.getEntitysFromCamp(0);
        this.ownCountLab.text = ownEntitys.length.toString();
        this.enemyCountLab.text = enemyEntitys.length.toString();
    };
    /**显示回合label */
    BattleView.prototype.showAnimate = function () {
        var _this = this;
        var label = new eui.Label();
        this.addChild(label);
        label.size = 40;
        label.fontFamily = "yt";
        label.text = this.battleCount == 1 ? "我方回合" : "敌方回合";
        label.verticalCenter = 0;
        label.left = this.battleCount == 1 ? -110 : StageUtils.inst().getWidth() + 110;
        if (this.battleCount == 1) {
            this.touchEnabled = false;
            this.touchChildren = false;
            var x = (StageUtils.inst().getWidth() >> 1) - (label.width >> 1);
            var nx = StageUtils.inst().getWidth() + 110;
            egret.Tween.get(label).to({ left: x }, 600, egret.Ease.circOut).wait(100).to({ left: nx }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(label);
                label.parent.removeChild(label);
                _this.touchEnabled = true;
                _this.touchChildren = true;
            }, this);
        }
        else {
            this.touchEnabled = false;
            this.touchChildren = false;
            var x = (StageUtils.inst().getWidth() >> 1) - (label.width >> 1);
            var nx = -110;
            egret.Tween.get(label).to({ left: x }, 600, egret.Ease.circOut).wait(100).to({ left: nx }, 600, egret.Ease.circOut).call(function () {
                egret.Tween.removeTweens(label);
                label.parent.removeChild(label);
                _this.execAiOper();
            }, this);
        }
    };
    /**执行电脑ai操作 先判断 只有电脑才会走这个逻辑
     *
     * 先遍历每个单位附近上下左右四方 。查询是否有可以攻击的单位 。找寻攻击利益最大化的 进行攻击
     * 如果有：
     *   需要判断是否可以安全攻击。 （攻击以后 不会被攻击）
     *     如果可以：
     *        执行攻击动作 （攻击完成进入下一个回合）
     *     如果不可以
     *        查询下一个有攻击的单位 重复以上逻辑
     * 如果没有
     *   随机一个单位 进行移动操作 是否有可以安全的攻击移动对象
     *      是否可以安全的移动
     * 		   首先判断 移动后的位置 周围 是否进行安全的攻击操作 。如果有 。移动过去 如果没有 向一个方向移动 需要判断这个移动后方向的周围4格子是否有可能被攻击 或者直接被攻击
     *         如果4个方向都不可以移动的话 判断周围 是否有可以帮助的己方单位。有的话并且安全 可以移动到可以移动的周围。
     *      不可以安全移动 （移动任何方向都会直接被攻击） 重复以上操作 更换下一个单位 执行逻辑
    */
    BattleView.prototype.execAiOper = function () {
        var _this = this;
        //获取当前玩家的实体卡牌
        var playerEntitys = this.getEntitysFromCamp(1);
        //获取当前电脑的实体卡牌
        var computerEntitys = this.getEntitysFromCamp(0);
        //当前电脑可以攻击的集合
        var atkEntitys = {}; // { computerEntity:[]}
        //当前电脑可以移动的集合
        var moveEntitys = {};
        //获取电脑单位 所有 周围 。可攻击的玩家卡牌
        for (var i = 0; i < computerEntitys.length; i++) {
            var xy = { x: computerEntitys[i].attr.x, y: computerEntitys[i].attr.y };
            var leftGrid = this.getRangeRectCfg({ x: xy.x - 1, y: xy.y }, 0);
            var rightGrid = this.getRangeRectCfg({ x: xy.x + 1, y: xy.y }, 0);
            var bottomGrid = this.getRangeRectCfg({ x: xy.x, y: xy.y + 1 }, 0);
            var topGrid = this.getRangeRectCfg({ x: xy.x, y: xy.y - 1 }, 0);
            var curKey = computerEntitys[i].attr.x + "_" + computerEntitys[i].attr.y;
            if (!atkEntitys[curKey]) {
                atkEntitys[curKey] = [];
            }
            if (!moveEntitys[curKey]) {
                moveEntitys[curKey] = [];
            }
            if (leftGrid && leftGrid.isAtk) {
                atkEntitys[curKey].push(leftGrid);
            }
            ;
            if (rightGrid && rightGrid.isAtk) {
                atkEntitys[curKey].push(rightGrid);
            }
            ;
            if (bottomGrid && bottomGrid.isAtk) {
                atkEntitys[curKey].push(bottomGrid);
            }
            ;
            if (topGrid && topGrid.isAtk) {
                atkEntitys[curKey].push(topGrid);
            }
            ;
            if (leftGrid && !leftGrid.isAtk) {
                moveEntitys[curKey].push(leftGrid);
            }
            ;
            if (rightGrid && !rightGrid.isAtk) {
                moveEntitys[curKey].push(rightGrid);
            }
            ;
            if (bottomGrid && !bottomGrid.isAtk) {
                moveEntitys[curKey].push(bottomGrid);
            }
            ;
            if (topGrid && !topGrid.isAtk) {
                moveEntitys[curKey].push(topGrid);
            }
            ;
        }
        var cardDatas = {};
        //key值 为当前电脑卡牌的位置索引 value值 为对应的4周格子情况
        for (var key in atkEntitys) {
            var couputerPosArr = key.split("_");
            var computerXY = { x: parseInt(couputerPosArr[0]), y: parseInt(couputerPosArr[1]) };
            //获取每一个电脑的卡牌攻击集合中 。可以进行安全攻击的 。利益最大化的 卡牌数据
            var cardData = this.getSafeAtk(computerXY, atkEntitys[key]);
            if (cardData) {
                cardDatas[key] = cardData;
            }
        }
        if (Object.keys(cardDatas).length) {
            //当前存在可以进行 安全攻击 。利益最大的卡牌数据集合 需要 选取其中一个收益最大的卡牌 进行攻击;
            var keys = Object.keys(cardDatas);
            var max_1 = cardDatas[keys[0]];
            var computerKey_1 = keys[0];
            var item = this.getEntityFromGrid(max_1.xy);
            for (var i = 1; i < keys.length; i++) {
                var item2 = this.getEntityFromGrid(cardDatas[keys[i]].xy);
                if (item2.attr.type < item.attr.type) {
                    item = item2;
                    computerKey_1 = keys[i];
                    max_1 = cardDatas[keys[i]];
                }
            }
            //找到了 利益最大的卡牌 进行攻击操作
            var couputerPosArr = computerKey_1.split("_");
            var computerXY = { x: parseInt(couputerPosArr[0]), y: parseInt(couputerPosArr[1]) };
            var atkComputerItem_1 = this.getEntityFromGrid(computerXY);
            //执行攻击缓动 
            this.execAtkAction(max_1.xy, atkComputerItem_1, function () {
                _this.refreshTopInfo();
                _this.refreshGrid(computerKey_1, 1);
                atkComputerItem_1.attr.x = max_1.xy.x;
                atkComputerItem_1.attr.y = max_1.xy.y;
                _this.refreshGrid(max_1.xy.x + "_" + max_1.xy.y, 0);
            }, this);
        }
        else {
            //不存在电脑可以攻击的卡牌 。执行移动逻辑判断
            var runs_1 = {};
            var count_1 = 0;
            var len_1 = Object.keys(moveEntitys).length;
            for (var key in moveEntitys) {
                // 移动时 首先 是否满足 可以 安全的攻击
                var couputerPosArr = key.split("_");
                var computerXY = { x: parseInt(couputerPosArr[0]), y: parseInt(couputerPosArr[1]) };
                //
                this.moveDirectionJudge(computerXY, moveEntitys[key], function (data, xy) {
                    runs_1[xy.x + "_" + xy.y] = data;
                    count_1 += 1;
                    if (count_1 >= len_1) {
                        //循环执行完毕
                        var keys = Object.keys(runs_1);
                        //优先有危险的格子先移动
                        var dangerKey = _this.judgeDanger(runs_1);
                        var atkKey = _this.judgeAtk(runs_1);
                        var index = (Math.random() * keys.length) >> 0;
                        var moveItemKey = keys[index];
                        if (dangerKey) {
                            //保留 有危险中 。价值最高的卡牌
                            moveItemKey = dangerKey;
                        }
                        else {
                            //没有危险 执行以下逻辑
                        }
                        var moveDirections = runs_1[moveItemKey];
                        if (!dangerKey && atkKey) {
                            moveItemKey = Object.keys(atkKey)[0];
                            moveDirections = atkKey[moveItemKey];
                        }
                        if (!moveDirections.length) {
                            for (var key_1 in runs_1) {
                                if (key_1 != moveItemKey && runs_1[key_1].length) {
                                    moveItemKey = key_1;
                                    moveDirections = runs_1[key_1];
                                    break;
                                }
                            }
                        }
                        var curIndex = keys.indexOf(moveItemKey);
                        var directionIndex = (Math.random() * moveDirections.length) >> 0;
                        var direction = moveDirections[directionIndex];
                        var couputerPosArr_1 = moveItemKey.split("_");
                        var computerXY_1 = { x: parseInt(couputerPosArr_1[0]), y: parseInt(couputerPosArr_1[1]) };
                        var computerItem_1 = _this.getEntityFromGrid(computerXY_1);
                        if (!direction) {
                            console.log("index----" + directionIndex);
                            console.log(moveDirections);
                            console.log(runs_1);
                            direction = moveDirections[0];
                            if (!direction) {
                                //备用逻辑 防止直接卡死 。
                                var walkArea = _this.getWalkArea(computerXY_1, 0);
                                direction = walkArea[0];
                                if (!direction) {
                                    //如果还没有 。直接切换回合 重新走逻辑
                                    _this.battleCount = -_this.battleCount;
                                    _this.showAnimate();
                                    return;
                                }
                            }
                        }
                        var mx = direction.xy.x * (100);
                        var my = direction.xy.y * (100);
                        _this.refreshGrid(moveItemKey, 1);
                        computerItem_1.attr.x = direction.xy.x;
                        computerItem_1.attr.y = direction.xy.y;
                        _this.refreshGrid(direction.xy.x + "_" + direction.xy.y, 0);
                        egret.Tween.get(computerItem_1).to({ x: mx, y: my }, 300).call(function () {
                            egret.Tween.removeTweens(computerItem_1);
                            _this.battleCount = -_this.battleCount;
                            _this.showAnimate();
                        }, _this);
                    }
                }, this);
            }
            //筛选出 电脑卡牌所有实际可走的格子后(已经排除了移动后直接被攻击的情况) 。先选择快要有危险的格子进行移动 
            //需要先选出一个 对自己有利的格子进行行走(可以安全的攻击敌方的) 如果没有 。随便选择一个移动
            //安全的攻击敌方条件 。 我移动后的位置周围 卡牌 优先级 都比我低 安全的直接攻击敌方 | 离敌方还有一定距离 如果是相同的话 优先级排后边 或者不移动
        }
    };
    BattleView.prototype.battleSuccess = function () {
        console.log("战斗胜利");
        this.timer.stop();
        egret.Tween.removeAllTweens();
        GlobalFun.setLevelDate();
        ViewManager.inst().open(ResultPopUp, [{ state: 1 }]);
    };
    BattleView.prototype.battleFail = function () {
        this.timer.stop();
        console.log("战斗失败");
        egret.Tween.removeAllTweens();
        ViewManager.inst().open(ResultPopUp, [{ state: 0 }]);
    };
    /**当移动对象 没有可移动的格子时切换目标 */
    BattleView.prototype.changeNextTarget = function (runs, moveItemKey, moveDirections, index) {
        // if(moveDirections.length <= 0){
        // 	//当前不能走 重新选择
        // 	if(isNaN(index)){
        // 		index = 0;
        // 	}else{
        // 		index+=1;
        // 	}
        // 	let newmoveItemKey:string = Object.keys(runs)[index];
        // 	let newmoveDirections:{xy:XY,isAtk:boolean}[] = runs[moveItemKey];
        // 	this.changeNextTarget(runs,newmoveItemKey,newmoveDirections,index);
        // 	return;
        // }
    };
    /**获取当前可以前往攻击的格子 --ai */
    BattleView.prototype.judgeAtk = function (runs) {
        var obj = null;
        for (var key in runs) {
            var couputerPosArr = key.split("_");
            var computerXY = { x: parseInt(couputerPosArr[0]), y: parseInt(couputerPosArr[1]) };
            var computerEntity = this.getEntityFromGrid(computerXY);
            //获取卡牌 周围第二格 的情况
            var routes = runs[key];
            var atkGther = [];
            for (var i = 0; i < routes.length; i++) {
                var walkArea = this.getWalkArea(routes[i].xy, 0);
                var boo = false;
                for (var j = 0; j < walkArea.length; j++) {
                    if (walkArea[j].isAtk) {
                        //周围存在不同阵营的卡牌 并且 这些卡 都比我的优先级小
                        var item = this.getEntityFromGrid(walkArea[j].xy);
                        var isAtk = GlobalFun.isAtk(computerEntity.attr, item.attr);
                        if (isAtk && computerEntity.attr.type < item.attr.type) {
                            //相同的移动过去 可能会被杀掉
                            boo = true;
                        }
                        if (!isAtk && computerEntity.attr.type >= item.attr.type) {
                            boo = false;
                        }
                    }
                }
                if (boo) {
                    //满足了 移动过去主动攻击的条件
                    obj = {};
                    obj[key] = routes[i];
                    break;
                }
            }
            if (obj) {
                break;
            }
        }
        return obj;
    };
    /**获取当前有危险的格子 --ai */
    BattleView.prototype.judgeDanger = function (runs) {
        var dangerEntity = [];
        for (var key in runs) {
            //key为我当前的电脑卡牌位置
            var couputerPosArr_2 = key.split("_");
            var computerXY_2 = { x: parseInt(couputerPosArr_2[0]), y: parseInt(couputerPosArr_2[1]) };
            var computerEntity = this.getEntityFromGrid(computerXY_2);
            //获取卡牌四周的情况
            var walkArea = this.getWalkArea(computerXY_2, 0);
            for (var i = 0; i < walkArea.length; i++) {
                if (walkArea[i].isAtk) {
                    //当前电脑格子周围存在敌方单位；
                    //判断是否会被攻击；
                    var item = this.getEntityFromGrid(walkArea[i].xy);
                    var isAtk = GlobalFun.isAtk(item.attr, computerEntity.attr);
                    if (isAtk) {
                        //敌方可以攻击
                        dangerEntity.push(key);
                        break;
                    }
                }
            }
        }
        var max = dangerEntity[0];
        var couputerPosArr = [];
        var computerXY = null;
        var maxComputerEntity = null;
        if (max) {
            couputerPosArr = max.split("_");
            computerXY = { x: parseInt(couputerPosArr[0]), y: parseInt(couputerPosArr[1]) };
            maxComputerEntity = this.getEntityFromGrid(computerXY);
        }
        for (var i = 1; i < dangerEntity.length; i++) {
            var posArr = dangerEntity[i].split("_");
            var xy = { x: parseInt(posArr[0]), y: parseInt(posArr[1]) };
            var computerEntity = this.getEntityFromGrid(xy);
            if (maxComputerEntity.attr.type > computerEntity.attr.type) {
                maxComputerEntity = computerEntity;
                max = dangerEntity[i];
            }
        }
        return max;
    };
    /**
     * 移动方向后的判断 可移动的区域
     * xy 当前电脑卡牌的 xy
     *
     * moveEntitys 当前可以移动的集合
     *
     * 需要做特殊处理 。如果 都有危险 那么随便选择一个移动
     * */
    BattleView.prototype.moveDirectionJudge = function (xy, moveEntitys, execCom, arg) {
        //第一个集合中的方向
        var index = 0;
        //真正可以行走的集合
        var relaticRun = [];
        var self = this;
        //备用
        var randomindex = (Math.random() * moveEntitys.length) >> 0;
        var randomEntity = moveEntitys[randomindex];
        function juage(_index) {
            if (_index === void 0) { _index = 0; }
            if (!moveEntitys.length) {
                if (execCom && arg) {
                    execCom.call(arg, relaticRun, xy);
                }
                return;
            }
            var dangerBoo = false;
            var direction = moveEntitys[_index];
            var walkArea = self.getWalkArea(direction.xy, 0);
            for (var i = 0; i < walkArea.length; i++) {
                if (walkArea[i].isAtk) {
                    //当前存在不同阵营的卡牌 需要判断我是否会被攻击
                    //
                    var item1 = self.getEntityFromGrid(walkArea[i].xy);
                    var computerCard = self.getEntityFromGrid(xy);
                    var isAtk = GlobalFun.isAtk(item1.attr, computerCard.attr);
                    if (isAtk) {
                        dangerBoo = true;
                        break;
                    }
                }
            }
            if (!dangerBoo) {
                //移动后没有危险
                relaticRun.push(moveEntitys[index]);
            }
            index += 1;
            if (index < moveEntitys.length) {
                //判断完成
                juage(index);
            }
            else {
                if (!relaticRun.length) {
                    //备用移动 。当都不能移动的时候 。随机移动一个
                    relaticRun = [randomEntity];
                }
                if (execCom && arg) {
                    execCom.call(arg, relaticRun, xy);
                }
            }
        }
        //获取移动后的周围情况
        juage(index);
    };
    /**获取可以安全攻击的 可以获取最大利益的一个对象 ---ai */
    BattleView.prototype.getSafeAtk = function (computerXY, rangeGrids) {
        var computerItem = this.getEntityFromGrid(computerXY);
        var atkList = [];
        for (var i = 0; i < rangeGrids.length; i++) {
            var item = this.getEntityFromGrid(rangeGrids[i].xy);
            var isAtk = GlobalFun.isAtk(computerItem.attr, item.attr);
            if (isAtk) {
                //当前属性 满足 可以进行攻击 。然后判断是否可以安全攻击
                //获取 假如电脑攻击后的位置 周围情况 当前阵营
                var xy = { x: item.attr.x, y: item.attr.y };
                //匹配到的数据是 玩家的阵营数据
                var walkArea = this.getWalkArea(xy, 0);
                var isDangerBoo = false;
                for (var key in walkArea) {
                    if (walkArea[key].isAtk) {
                        var item_1 = this.getEntityFromGrid(walkArea[key].xy);
                        var atkboo = GlobalFun.isAtk(item_1.attr, computerItem.attr);
                        if (atkboo) {
                            //当前如果电脑攻击以后 。会有危险
                            isDangerBoo = true;
                            break;
                        }
                    }
                }
                if (isDangerBoo) {
                    //有危险 放弃攻击
                    continue;
                }
                else {
                    //没有危险；
                    //放到可以进行攻击的列表中 。最后从这个列表中选出一个 攻击得到利益最大的一个;
                    atkList.push(rangeGrids[i]);
                }
            }
        }
        var max = null;
        if (atkList.length) {
            max = atkList[0];
            var item = this.getEntityFromGrid(max.xy);
            for (var i = 1; i < atkList.length; i++) {
                var item2 = this.getEntityFromGrid(atkList[i].xy);
                if (item2.attr.type < item.attr.type) {
                    item = item2;
                    max = atkList[i];
                }
            }
        }
        return max;
    };
    BattleView.prototype.onTouchTap = function (evt) {
        var target = evt.target;
        if (target instanceof CardEntity) {
            if (target.attr.camp == 1) {
                if (this.selectEntity == target) {
                    return;
                }
                this.refreshFocusRect(null, true);
                this.selectEntity = target;
                //当前点击的是己方阵营实体
                var rangeGrids = this.getWalkArea({ x: target.attr.x, y: target.attr.y }, this.selectEntity.attr.camp);
                this.refreshFocusRect(rangeGrids);
            }
        }
    };
    /**焦点区域点击 */
    BattleView.prototype.onFocusRectTouch = function (evt) {
        var _this = this;
        var namestr = evt.target.name;
        if (namestr) {
            //当前点击到了焦点区域
            var nameArr = namestr.split("_");
            this.touchEnabled = false;
            this.touchChildren = false;
            var xy = { x: parseInt(nameArr[0]), y: parseInt(nameArr[1]) };
            var key = this.selectEntity.attr.x + "_" + this.selectEntity.attr.y;
            this.refreshGrid(key, 1);
            this.selectEntity.attr.x = xy.x;
            this.selectEntity.attr.y = xy.y;
            this.refreshGrid(xy.x + "_" + xy.y, 0);
            this.refreshFocusRect(null, true);
            var mx = xy.x * (100);
            var my = xy.y * (100);
            if (parseInt(nameArr[2]) == 0) {
                //当前是移动操作
                egret.Tween.get(this.selectEntity).to({ x: mx, y: my }, 300).call(function () {
                    // this.touchEnabled = true;
                    // this.touchChildren = true;
                    _this.battleCount = -_this.battleCount;
                    egret.Tween.removeTweens(_this.selectEntity);
                    _this.selectEntity = null;
                    _this.showAnimate();
                }, this);
            }
            else {
                //当前是攻击操作
                this.execAtkAction(xy, this.selectEntity, function () {
                    _this.refreshTopInfo();
                    _this.selectEntity = null;
                }, this);
            }
        }
    };
    /**
     * 执行攻击动作
     * xy 被攻击者的xy；
     * atkItem 执行攻击的对象
     *
     * */
    BattleView.prototype.execAtkAction = function (xy, atkItem, cb, arg) {
        var _this = this;
        var dmgItem = this.getEntityFromGrid(xy);
        var layerIndex = dmgItem.parent.getChildIndex(dmgItem);
        this.gridGroup.setChildIndex(atkItem, layerIndex + 1);
        var mx = xy.x * (100);
        var my = xy.y * (100);
        egret.Tween.get(atkItem).to({ x: mx, y: my }, 300, egret.Ease.circOut).to({ x: atkItem.x, y: atkItem.y }, 200);
        if (dmgItem) {
            GlobalFun.shakeObj(dmgItem, 1, 5, 5, function () {
                //受击震动完成
                egret.Tween.get(dmgItem).to({ alpha: 0.5 }, 200).to({ alpha: 1 }, 200).to({ alpha: 0.5 }, 200).to({ alpha: 1 }, 200).call(function () {
                    //死亡闪烁完成
                    egret.Tween.removeTweens(dmgItem);
                    _this.removeEntityFromGrid(xy);
                    egret.Tween.get(atkItem).to({ x: mx, y: my }, 300).call(function () {
                        //当前攻击单位移动到攻击实体的位置完成
                        _this.touchEnabled = true;
                        _this.touchChildren = true;
                        egret.Tween.removeTweens(atkItem);
                        // this.selectEntity = null;
                        if (cb && arg) {
                            cb.call(arg);
                        }
                        var computerEntitys = _this.getEntitysFromCamp(0);
                        var playerEntitys = _this.getEntitysFromCamp(1);
                        if (!computerEntitys.length) {
                            _this.battleSuccess();
                            return;
                        }
                        if (!playerEntitys.length) {
                            _this.battleFail();
                            return;
                        }
                        _this.battleCount = -_this.battleCount;
                        _this.showAnimate();
                    }, _this);
                });
            }, this);
        }
    };
    /**刷新焦点区域 */
    BattleView.prototype.refreshFocusRect = function (rangeGrids, remove) {
        if (remove) {
            for (var i = 0; i < this.focusRects.length; i++) {
                egret.Tween.removeTweens(this.focusRects[i]);
                this.focusRects[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFocusRectTouch, this);
                if (this.focusRects[i] && this.focusRects[i].parent) {
                    this.focusRects[i].parent.removeChild(this.focusRects[i]);
                }
            }
            this.focusRects = [];
            return;
        }
        for (var i = 0; i < rangeGrids.length; i++) {
            var img = new eui.Image();
            img.source = "focusRect_png";
            if (rangeGrids[i].isAtk) {
                var item = this.getEntityFromGrid(rangeGrids[i].xy);
                var isAtk = GlobalFun.isAtk(this.selectEntity.attr, item.attr);
                var num = isAtk ? 1 : 0;
                if (!isAtk) {
                    img.visible = false;
                    img.touchEnabled = false;
                }
                // rect.fillColor = 0xfc3434;
                img.name = rangeGrids[i].xy.x + "_" + rangeGrids[i].xy.y + "_" + num;
            }
            else {
                // rect.fillColor = 0x00ff00
                img.name = rangeGrids[i].xy.x + "_" + rangeGrids[i].xy.y + "_" + 0;
            }
            img.alpha = 0.8;
            this.gridGroup.addChild(img);
            this.focusRects.push(img);
            img.x = rangeGrids[i].xy.x * (100);
            img.y = rangeGrids[i].xy.y * (100);
            egret.Tween.get(img, { loop: true }).to({ alpha: 0.5 }, 600).to({ alpha: 0.8 }, 600);
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFocusRectTouch, this);
        }
    };
    /**生成卡牌显示
     * ecards 敌方的卡牌
     * ocards 己方的卡牌
     * epos 敌方卡牌的位置
     * opos 己方卡牌的位置
    */
    BattleView.prototype.refreshCardShow = function (camp, cfg) {
        var cardsArr = camp == 0 ? cfg.ecards.split("_") : cfg.ocards.split("_");
        var posArr = camp == 0 ? cfg.epos.split("|") : cfg.opos.split("|");
        for (var i = 0; i < posArr.length; i++) {
            this.refreshGrid(posArr[i], 0);
            var grid = posArr[i].split("_");
            var cardType = parseInt(cardsArr[i]);
            var attr = { camp: camp, type: cardType, res: "", x: parseInt(grid[0]), y: parseInt(grid[1]) };
            var cardEntity = new CardEntity();
            cardEntity.attr = attr;
            this.gridGroup.addChild(cardEntity);
            cardEntity.x = attr.x * (100);
            cardEntity.y = attr.y * (100);
            this.entitys.push(cardEntity);
        }
    };
    /**
     * 获取当前选择的格子 周围可走区域
     * xy 当前选择格子的xy坐标
     *
     * camp 当前执行操作的阵营
     *
     * */
    BattleView.prototype.getWalkArea = function (xy, camp, range) {
        if (range === void 0) { range = 1; }
        var leftGrid = this.getRangeRectCfg({ x: xy.x - range, y: xy.y }, camp);
        var rightGrid = this.getRangeRectCfg({ x: xy.x + range, y: xy.y }, camp);
        var bottomGrid = this.getRangeRectCfg({ x: xy.x, y: xy.y + range }, camp);
        var topGrid = this.getRangeRectCfg({ x: xy.x, y: xy.y - range }, camp);
        var walkArea = [];
        if (leftGrid) {
            walkArea.push(leftGrid);
        }
        ;
        if (rightGrid) {
            walkArea.push(rightGrid);
        }
        ;
        if (bottomGrid) {
            walkArea.push(bottomGrid);
        }
        ;
        if (topGrid) {
            walkArea.push(topGrid);
        }
        ;
        return walkArea;
    };
    /**获取周围格子对应配置 */
    BattleView.prototype.getRangeRectCfg = function (xy, camp) {
        var obj;
        if (!isNaN(this.gridData[xy.x + "_" + xy.y])) {
            if (this.gridData[xy.x + "_" + xy.y] == 1) {
                //当前是可以走
                obj = { xy: xy, isAtk: false };
            }
            else if (this.gridData[xy.x + "_" + xy.y] == 0) {
                //当前有阻挡
                var item = this.getEntityFromGrid(xy);
                if (item && item.attr.camp != camp) {
                    //当前左边是敌方单位 可以进行选择攻击
                    obj = { xy: xy, isAtk: true };
                }
            }
        }
        return obj;
    };
    /**根据格子坐标 获取对应的实体单位 */
    BattleView.prototype.getEntityFromGrid = function (xy) {
        for (var i = 0; i < this.entitys.length; i++) {
            var item = this.entitys[i];
            if (item.attr.x == xy.x && item.attr.y == xy.y) {
                // let isAtk:boolean = GlobalFun.isAtk(this.selectEntity.attr,item.attr);
                // if(isAtk){
                return item;
                // }
            }
        }
        return null;
    };
    /**根据坐标移除对应的实体单位 */
    BattleView.prototype.removeEntityFromGrid = function (xy) {
        for (var i = 0; i < this.entitys.length; i++) {
            var item = this.entitys[i];
            if (item.attr.x == xy.x && item.attr.y == xy.y) {
                if (item && item.parent) {
                    item.parent.removeChild(item);
                }
                this.entitys.splice(i, 1);
                break;
            }
        }
    };
    /**根据阵营获取所有存在的实体对象 */
    BattleView.prototype.getEntitysFromCamp = function (camp) {
        if (camp === void 0) { camp = 0; }
        var arr = [];
        for (var i = 0; i < this.entitys.length; i++) {
            var item = this.entitys[i];
            if (item.attr.camp == camp) {
                arr.push(item);
            }
        }
        return arr;
    };
    /**更新格子坐标 */
    BattleView.prototype.refreshGrid = function (key, value) {
        this.gridData[key] = value;
    };
    //生成阻挡物
    BattleView.prototype.createBlock = function (x, y) {
        var img = new eui.Image();
        img.source = "grid_png";
        this.gridGroup.addChild(img);
        img.x = y;
        img.y = x;
        var forbidIcon = new eui.Image();
        forbidIcon.source = "forbid_icon_png";
        this.gridGroup.addChild(forbidIcon);
        forbidIcon.x = y + 10;
        forbidIcon.y = x + 10;
    };
    BattleView.prototype.close = function () {
        this.gridGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onComplete, this);
        MessageManager.inst().removeListener("closeStory", this.onCloseStory, this);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.resetBtn, this.onReset);
    };
    return BattleView;
}(BaseEuiView));
__reflect(BattleView.prototype, "BattleView");
ViewManager.inst().reg(BattleView, LayerManager.UI_Main);
//# sourceMappingURL=BattleView.js.map