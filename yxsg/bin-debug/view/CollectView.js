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
var CollectView = (function (_super) {
    __extends(CollectView, _super);
    function CollectView() {
        var _this = _super.call(this) || this;
        //木材商人范围矩阵
        _this.npcWoodRect = new egret.Rectangle(1157, 154, 320, 240);
        //传送条件
        // private condition_gold:number = 5;
        // private infoGroup:eui.Group;
        // private rect:eui.Rect;
        // private collectBtn:eui.Image;
        _this.collectNum = 10;
        _this._first = false;
        _this.walkedGrid = [];
        return _this;
    }
    CollectView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        // let firststr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
        // this._first = !!firststr;
        // this.rect.touchEnabled = false;
        this.param = param;
        // this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this);
        // this.collectBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this)
        this.alpha = 0;
        EntityManager.ins().reestRolePos();
        MapView.ins().resetMapviewPort();
        // this.rect.visible = false;
        egret.Tween.get(this).to({ alpha: 1 }, 1000, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this);
            // if(!this._first){
            // 	// this.rect.visible = true;
            // 	egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"true");
            // 	// egret.Tween.get(this.infoGroup).to({bottom:0},600,egret.Ease.circOut).call(()=>{
            // 	// 	this.rect.touchEnabled = true;
            // 	// 	egret.Tween.removeTweens(this.infoGroup);
            // 	// },this)
            // }else{
            _this.onCloseInfo();
            // }
        }, this);
        // this.addTouchEvent(this.atkBtn,this.onAttack,true);
        this.addTouchEvent(this.cityBtn, this.judgeifTrans, true);
        StageUtils.ins().getStage().addEventListener(StartGameEvent.VJ_END, this.onVjEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAttack, this);
        StageUtils.ins().getStage().addEventListener(StartGameEvent.REMOVE_ITEM, this.onRemoveItem, this);
        // this._transRectGridArea = GameMap.calculBuildGridArea(this._transRect);
        // for(let i:number = 0;i<this._transRectGridArea.length;i++){
        // 	let gp:XY = this._transRectGridArea[i];
        // 	let obj = {col:gp.x,row:gp.y}
        // 	this.walkedGrid.push(obj);
        // }
        // let npcWoodRect:XY[] = GameMap.calculBuildGridArea(this.npcWoodRect);
        // this.clearRunGrid(npcWoodRect);
        //  LayerManager.MAP_LAYER.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMapLayerTouch,this);
        //  LayerManager.MAP_LAYER.touchEnabled = true;
    };
    // private _path:any[]
    // private onMapLayerTouch(evt:egret.TouchEvent):void{
    // 	let localP:egret.Point = LayerManager.MAP_LAYER.globalToLocal(evt.stageX,evt.stageY);
    // 	let gxy:XY = GameMap.point2Grid(localP.x,localP.y);
    // 	this._path = this.findPath(gxy.x,gxy.y);
    // 	this.execRoleMove(this._path.shift());
    // }
    // private execRoleMove(node:any):void{
    // 	let gx:number = node.x;
    // 	let gy:number = node.y;
    // 	egret.Tween.removeTweens(this._hero);
    // }
    CollectView.prototype.onRemoveItem = function (evt) {
        var area = evt.data.area;
        for (var i = 0; i < area.length; i++) {
            for (var j = 0; j < this.walkedGrid.length; j++) {
                var itemGrid = this.walkedGrid[j];
                if (itemGrid.col == area[i].x && itemGrid.row == area[i].y) {
                    this.walkedGrid.splice(j, 1);
                }
            }
        }
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.addCollectItem();
        }, 2000);
    };
    CollectView.prototype.onAttack = function (evt) {
        if (!this._enemyEntity) {
            return;
        }
        var globalP = this._enemyEntity.parent.localToGlobal(this._enemyEntity.x, this._enemyEntity.y);
        var disx = Math.abs(evt.stageX - globalP.x);
        var disy = Math.abs(evt.stageY - globalP.x);
        if (disx > 100 && disy > 100) {
            return;
        }
        if (!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)) {
            return;
        }
        if (Math.abs(this._hero.x - this._enemyEntity.x) <= 80 && Math.abs(this._hero.y - this._enemyEntity.y) <= 80) {
            this._hero.playAction(ActionEnum.attack, 1);
            var self_1 = this;
            var timout2 = setTimeout(function () {
                self_1._hero.playAction(ActionEnum.stand, -1);
            }, 600);
            this._enemyEntity.reduceHp();
            if (this._enemyEntity.hpcount <= 0) {
                //已经死亡;
                // this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAttack,this);
                var getGold = (Math.random() * 10 + 5) >> 0;
                GameApp.ins().gold += getGold;
                UserTips.ins().showTips("恭喜您击杀山贼获得元宝x" + getGold);
                this._enemyEntity.showSpeak("青山不改、绿水长流");
                this._enemyEntity.playAction(ActionEnum.stand, -1);
                EntityManager.ins().removeEntityFromList(this._enemyEntity);
                clearInterval(this.timeInterval);
                clearTimeout(this.endTimeOut);
                var self_2 = this;
                var timeout_1 = setTimeout(function () {
                    clearTimeout(timeout_1);
                    egret.Tween.removeTweens(self_2._enemyEntity);
                    self_2._enemyEntity.parent.removeChild(self_2._enemyEntity);
                    self_2._enemyEntity = null;
                }, 1000);
            }
        }
    };
    CollectView.prototype.onCloseInfo = function () {
        var _this = this;
        // egret.Tween.get(this.infoGroup).to({bottom:-170},600,egret.Ease.circOut).call(()=>{
        // 	egret.Tween.removeTweens(this.infoGroup)
        // 	this.infoGroup.parent.removeChild(this.infoGroup);
        // this.collectBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this);
        // this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseInfo,this);
        // this.rect.parent.removeChild(this.rect);
        this._fingerMc = new MovieClip();
        egret.Tween.get(this.vj).to({ left: 30 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.vj);
        }, this);
        egret.Tween.get(this.cityBtn).to({ top: 10 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.cityBtn);
        }, this);
        this.vj.start();
        this.vj.addEventListener(VJEvent.VJ_START, this.onVjStart, this);
        this.vj.addEventListener(VJEvent.VJ_MOVE, this.onVjChange, this);
        this.vj.addEventListener(VJEvent.VJ_END, this.onVjEnd, this);
        this._hero = EntityManager.ins().getEntity(GameApp.ins().role_insId);
        this.addCollectItem();
        // this.startEnemyMoveAI();
        LayerManager.MAP_LAYER.addChild(this._fingerMc);
        this._fingerMc.visible = false;
        this.addMainCom(this.param);
        // },this)
    };
    /**开启敌人移动ai */
    CollectView.prototype.startEnemyMoveAI = function () {
        var index = (Math.random() * 100) >> 0;
        if (index >= 70) {
            if (!this.runGrid) {
                this.runGrid = [];
                this.runGrid = this.runGrid.concat(GameMap.runGrid);
            }
            var posIndex = (Math.random() * this.runGrid.length) >> 0;
            var posObj = this.runGrid[posIndex];
            var xy = GameMap.grid2Point(posObj.col, posObj.row);
            this._enemyEntity = EntityManager.ins().createEntity(xy);
            this.touchEnabled = true;
            // egret.Tween.get(this.atkBtn).to({right:39},600,egret.Ease.circOut).call(()=>{
            // 	egret.Tween.removeTweens(this.atkBtn);
            // },this)
            this.moveEnd(600);
        }
    };
    /**判断移动完成 */
    CollectView.prototype.moveEnd = function (time) {
        var _this = this;
        if (time === void 0) { time = 5000; }
        this._enemyEntity.playAction(ActionEnum.stand, -1);
        var self = this;
        if (!this.runGrid) {
            this.runGrid = [];
            this.runGrid = this.runGrid.concat(GameMap.runGrid);
        }
        this.endTimeOut = setTimeout(function () {
            clearTimeout(self.endTimeOut);
            var index = (Math.random() * _this.runGrid.length) >> 0;
            var runGrid = _this.runGrid[index];
            self.findPath(runGrid.col, runGrid.row);
        }, time);
    };
    //执行攻击
    CollectView.prototype.execAtk = function () {
        if (!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)) {
            return;
        }
        var gold = GameApp.ins().gold;
        this._enemyEntity.touchEnabled = true;
        if (this._fingerMc.visible == false) {
            var self_3 = this;
            this._fingerMc.playFile(EFFECT + "fingerClick", -1);
            this._fingerMc.x = this._enemyEntity.x;
            this._fingerMc.y = this._enemyEntity.y;
            this._fingerMc.visible = true;
            var timeout_2 = setTimeout(function () {
                clearTimeout(timeout_2);
                self_3._fingerMc.visible = false;
            }, 3000);
        }
        if (gold <= 0) {
            //当前没有元宝
            this._enemyEntity.playAction(ActionEnum.stand, -1);
            this._enemyEntity.showSpeak("竟如此穷困潦倒...罢了，罢了");
            GameApp.ins().gold += 3;
            UserTips.ins().showTips("获得山贼的怜悯,元宝+" + 3);
            //随机一个点走
            this.moveEnd();
        }
        else {
            this._enemyEntity.showSpeak("此山是我开,此树是我栽，若打此山过，留下买路财");
            this._enemyEntity.playAction(ActionEnum.attack, -1);
            var self_4 = this;
            this.timeInterval = setInterval(function () {
                var curGold = GameApp.ins().gold;
                if (Math.abs(self_4._hero.x - self_4._enemyEntity.x) > 80 && Math.abs(self_4._hero.y - self_4._enemyEntity.y) > 80) {
                    //当前人物已经远离
                    var heroPos = GameMap.point2Grid(self_4._hero.x, self_4._hero.y);
                    self_4.findPath(heroPos.x, heroPos.y);
                    clearInterval(self_4.timeInterval);
                    return;
                }
                if (curGold <= 0) {
                    self_4._enemyEntity.showSpeak("青山不改、绿水长流");
                    EntityManager.ins().removeEntityFromList(self_4._enemyEntity);
                    clearInterval(self_4.timeInterval);
                    egret.Tween.get(self_4._enemyEntity).to({ alpha: 0 }, 1000).call(function () {
                        egret.Tween.removeTweens(self_4._enemyEntity);
                        self_4._enemyEntity.parent.removeChild(self_4._enemyEntity);
                        self_4._enemyEntity = null;
                    }, self_4);
                }
                else {
                    var index = (Math.random() * 100) >> 0;
                    if (index >= 95) {
                        GameApp.ins().gold -= 1;
                        UserTips.ins().showTips("失去元宝x" + 1);
                    }
                    var angle = Math.atan2(self_4._hero.y - self_4._enemyEntity.y, self_4._hero.x - self_4._enemyEntity.x) * 180 / Math.PI;
                    EntityManager.ins().calculEntityDic(self_4._enemyEntity, angle);
                    self_4._enemyEntity.playAction(ActionEnum.attack, -1);
                }
            }, 1000);
        }
    };
    CollectView.prototype.findPath = function (ex, ey) {
        if (!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)) {
            return;
        }
        GameMap.AstarNode.setEndNode(ex, ey);
        var pxy = GameMap.point2Grid(this._enemyEntity.x, this._enemyEntity.y);
        GameMap.AstarNode.setStartNode(pxy.x, pxy.y);
        var aStar = new astar.AStar();
        if (aStar.findPath(GameMap.AstarNode)) {
            var _path = aStar.path;
            //怪物需要开启
            // this.runPath(_path);
            return _path;
        }
        return null;
    };
    CollectView.prototype.runPath = function (pathlist) {
        var _this = this;
        if (!this._enemyEntity || (this._enemyEntity && this._enemyEntity.isDead)) {
            return;
        }
        var node = pathlist.shift();
        var gx = node.x;
        var gy = node.y;
        var xy = GameMap.grid2Point(gx, gy);
        var angle = Math.atan2(xy.y - this._enemyEntity.y, xy.x - this._enemyEntity.x) * 180 / Math.PI;
        EntityManager.ins().calculEntityDic(this._enemyEntity, angle);
        this._enemyEntity.playAction(ActionEnum.run);
        egret.Tween.removeTweens(this._enemyEntity);
        egret.Tween.get(this._enemyEntity, { loop: false, onChange: function () {
                if (Math.abs(_this._hero.x - _this._enemyEntity.x) <= 80 && Math.abs(_this._hero.y - _this._enemyEntity.y) <= 80) {
                    //当前已经在人物附近
                    _this.execAtk();
                    egret.Tween.removeTweens(_this._enemyEntity);
                }
                else {
                    _this._enemyEntity.touchEnabled = false;
                    _this._fingerMc.visible = false;
                }
            }, onChangeObj: this }).to({ x: xy.x, y: xy.y }, 800).call(function () {
            egret.Tween.removeTweens(_this._enemyEntity);
            if (pathlist.length) {
                _this.runPath(pathlist);
            }
            else {
                _this.moveEnd(2000);
            }
        }, this);
    };
    //添加收集物 判断空闲的格子
    CollectView.prototype.addCollectItem = function () {
        if (!this.runGrid) {
            this.runGrid = [];
            this.runGrid = this.runGrid.concat(GameMap.runGrid);
        }
        var index = (Math.random() * this.runGrid.length) >> 0;
        var curG = this.runGrid[index];
        if (this.isInWalked(curG)) {
            //当前的点在阻挡点中 需要再次随机
            this.addCollectItem();
            return;
        }
        // this.walkedGrid.push(this.runGrid[index]);
        var p = GameMap.grid2Point(curG.col, curG.row);
        p.x += GameMap.CELL_SIZE / 2;
        p.y += GameMap.CELL_SIZE / 2;
        var resObj = GlobalFun.getResUrl();
        var obj = {
            x: p.x, y: p.y, w: resObj.attr["w"], h: resObj.attr["h"], res: resObj.res, itemName: resObj.attr["name"], resType: resObj.attr["resType"]
        };
        var grids = MapView.ins().addToMapLayer(obj);
        for (var i = 0; i < grids.length; i++) {
            var xy = grids[i];
            for (var j = 0; j < this.runGrid.length; j++) {
                var itemGrid = this.runGrid[j];
                if (itemGrid.col == xy.x && itemGrid.row == xy.y) {
                    this.walkedGrid.push(this.runGrid[j]);
                    break;
                }
            }
        }
        this.collectNum -= 1;
        if (this.collectNum > 0) {
            this.addCollectItem();
        }
        else {
            this.collectNum = 0;
        }
    };
    /**是否在阻挡格子集合中 */
    CollectView.prototype.isInWalked = function (g) {
        for (var j = 0; j < this.walkedGrid.length; j++) {
            var itemGrid = this.walkedGrid[j];
            if (itemGrid.col == g.col && itemGrid.row == g.row) {
                return true;
            }
        }
        return false;
    };
    CollectView.prototype.onVjStart = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    CollectView.prototype.onVjChange = function (evt) {
        this._angle = evt.data;
    };
    CollectView.prototype.onEnterFrame = function (evt) {
        if (this._angle) {
            var offestX = Math.cos(this._angle) * 6;
            var offestY = Math.sin(this._angle) * 6;
            var speedX = this._hero.x + offestX >> 0;
            var speedY = this._hero.y + offestY >> 0;
            // let point: egret.Point = qmr.SceneModel.prototype.mainScene.globalToLocal(evt.stageX, evt.stageY);
            var xy = GameMap.point2Grid(speedX, speedY);
            var moveable = GameMap.walkable(xy.x, xy.y);
            EntityManager.ins().calculEntityDic(this._hero, this._angle * 180 / Math.PI);
            if (moveable) {
                var enemyIndex = LayerManager.MAP_LAYER.getChildIndex(this._enemyEntity);
                if (this._enemyEntity) {
                    if (this._hero.y > this._enemyEntity.y) {
                        LayerManager.MAP_LAYER.setChildIndex(this._hero, enemyIndex + 1);
                    }
                    else {
                        LayerManager.MAP_LAYER.setChildIndex(this._hero, enemyIndex - 1);
                    }
                }
                // if(this._hero.x >= this._transRect.x && this._hero.x <= this._transRect.x + this._transRect.width && this._hero.y >= this._transRect.y && this._hero.y <= this._transRect.y + this._transRect.height){
                // 	//当前在传送阵
                // 	this.judgeifTrans();
                // }
                this._hero.playAction(ActionEnum.run);
                MapView.ins().refrehMapViewPort(offestX, offestY);
                // this.judgeifTrans()
            }
        }
    };
    /**判断是否靠近了木材商人 */
    CollectView.prototype.isNearByNpcWood = function () {
    };
    /**判断是否可以传送 */
    CollectView.prototype.judgeifTrans = function () {
        // let jobstr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
        // let goldStr:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
        var _this = this;
        // if(parseInt(jobstr) < 1 && parseInt(goldStr) < 200){
        // 	//未参军 且参军条件不足
        // 	UserTips.ins<UserTips>().showTips("达到军士等级或交纳300元宝才能进城。")
        // 	return;
        // }
        this.onVjEnd();
        this.touchEnabled = false;
        ViewManager.ins().open(GameMainView);
        egret.Tween.get(this).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(function () {
            egret.Tween.removeTweens(_this);
            ViewManager.ins().close(CollectView);
        }, this);
    };
    CollectView.prototype.onVjEnd = function () {
        this._angle = null;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this._hero.playAction(ActionEnum.stand);
    };
    CollectView.prototype.close = function () {
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
        }
        if (this.endTimeOut) {
            egret.clearTimeout(this.endTimeOut);
        }
        if (this._enemyEntity) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAttack, this);
            EntityManager.ins().removeEntityFromList(this._enemyEntity);
            if (this._enemyEntity.parent) {
                this._enemyEntity.parent.removeChild(this._enemyEntity);
            }
        }
        this.runGrid = null;
        this.walkedGrid = [];
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.VJ_END, this.onVjEnd, this);
        StageUtils.ins().getStage().removeEventListener(StartGameEvent.REMOVE_ITEM, this.onRemoveItem, this);
        this.vj.removeEventListener(VJEvent.VJ_START, this.onVjStart, this);
        this.vj.removeEventListener(VJEvent.VJ_MOVE, this.onVjChange, this);
        this.vj.removeEventListener(VJEvent.VJ_END, this.onVjEnd, this);
        this.removeTouchEvent(this.cityBtn, this.judgeifTrans);
        // this.removeTouchEvent(this.atkBtn,this.onAttack);
        MapView.ins().clearItem();
        this.removeOtherEvent();
    };
    return CollectView;
}(BaseEuiView));
__reflect(CollectView.prototype, "CollectView");
ViewManager.ins().reg(CollectView, LayerManager.UI_Main);
//# sourceMappingURL=CollectView.js.map