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
/**
 * 游戏地图
 *
 * eg ： 初始化地图模块 。需要调用initMap; 其他方法选择性调用
 *
 * function:  initMap 初始化地图
 *
 * function1 ：resetMapviewPort；重置地图层位置 。默认到00点
 *
 * function2 : startRoleClickMove 开启人物点击地图移动操作
 */
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        _this.initia = false;
        _this.levelMonIds = [10002, 10003, 10004, 10005, 10006, 10007, 10008, 10022, 10027, 10031];
        _this.typeindexs = [0, 2, 1, 2, 1, 0, 1, 2, 1, 0];
        _this.monsters = [];
        _this.roles = [];
        _this.drops = [];
        _this.mapClick = false;
        //移动速度
        _this.speed = 260;
        //当前格子是否移动完毕
        _this.moveEnd = true;
        return _this;
    }
    MapView.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**清除地图单位 */
    MapView.prototype.clearMapUnit = function () {
        for (var key in this.monsters) {
            if (this.monsters[key] && this.monsters[key].parent) {
                this.monsters[key].parent.removeChild(this.monsters[key]);
            }
        }
        this.monsters = [];
        for (var key in this.roles) {
            if (this.roles[key] && this.roles[key].parent) {
                this.roles[key].parent.removeChild(this.roles[key]);
            }
        }
        this.roles = [];
        for (var key in this.drops) {
            if (this.drops[key] && this.drops[key].parent) {
                this.drops[key].parent.removeChild(this.drops[key]);
            }
        }
        this.drops = [];
        if (this._mapImage && this._mapImage.parent) {
            this._mapImage.parent.removeChild(this._mapImage);
            this._mapImage = null;
        }
        this._itemLayer.removeChildren();
        this.initia = false;
        if (this.hero && this.hero.parent) {
            this.hero.parent.removeChild(this.hero);
        }
        LayerManager.MAP_LAYER.removeChildren();
        this._path = [];
        this.mapClick = false;
        this.moveEnd = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        LayerManager.MAP_LAYER.x = 0;
        LayerManager.MAP_LAYER.y = 0;
    };
    /**
     * 地图初始化
     * drawGrid 是否绘制测试格子
     */
    MapView.prototype.initMap = function (drawGrid) {
        if (this.initia) {
            return;
        }
        this.initia = true;
        this._mapImage = new MapViewBg();
        LayerManager.MAP_LAYER.addChild(this._mapImage);
        this._itemLayer = new egret.DisplayObjectContainer();
        LayerManager.MAP_LAYER.addChild(this._itemLayer);
        if (drawGrid) {
            this.drawTestGrid();
        }
        /**测试 */
        var hero = new SoldierEntity();
        var vo = { level: 1, atkDis: 140, spd: 50, atk: 500 + ((Math.random() * 100) >> 0), hp: 3000 };
        hero.soldierAttr = vo;
        hero.setSoldierData(1, "body001", "weapon100");
        LayerManager.MAP_LAYER.addChild(hero);
        this.roles.push(hero);
        var birthGrids = GameMap.roleBirthGrid;
        var index = (Math.random() * birthGrids.length) >> 0;
        var birthXY = birthGrids[index];
        var xy = GameMap.grid2Point(birthXY.col, birthXY.row);
        hero.x = xy.x;
        hero.y = xy.y;
        this.startRoleClickMove(hero);
        this.refreshMapPos();
        //------------------
    };
    /**初始化 关卡怪物 */
    MapView.prototype.initLevelMonster = function () {
        //    GameApp.monsterRes = bodyres;
        var num = 10;
        for (var i = 0; i < num; i++) {
            this.initBoss();
        }
    };
    MapView.prototype.initBossMon = function () {
        this.initBoss("boss");
    };
    /**移除item
     *
     * @item 移除的monster
     * @leveladd 是否在移除后 一段时间后 添加一个
     */
    MapView.prototype.refreshMonItem = function (item, leveladd) {
        if (leveladd === void 0) { leveladd = false; }
        var _loop_1 = function (i) {
            if (this_1.monsters[i] == item) {
                var self_1 = this_1;
                if (GameApp.fuben == "fuben") {
                    //掉落物
                    var drops = GlobalFun.dropItems();
                    var xy = [{ x: item.x, y: item.y }, { x: item.x - 50, y: item.y - 50 }, { x: item.x + 50, y: item.y - 50 }];
                    var mainRole_1 = this_1.roles[0];
                    var _loop_2 = function (i_1) {
                        var dropItem = new DropEntity(drops[i_1], xy[i_1]);
                        this_1.drops.push(dropItem);
                        LayerManager.MAP_LAYER.addChildAt(dropItem, 1);
                        var cardData = GlobalFun.getCardDataFromId(drops[i_1].id);
                        var vo = cardData ? cardData : drops[i_1];
                        vo.ownNum += 1;
                        GlobalFun.refreshCardData(vo);
                        var timeout = setTimeout(function () {
                            clearTimeout(timeout);
                            if (dropItem && dropItem.parent && (!GameApp.gameEnd && GameApp.fuben == "fuben")) {
                                egret.Tween.get(dropItem).to({ x: mainRole_1.x, y: mainRole_1.y, alpha: 0, scaleX: 0, scaleY: 0 }, 300).call(function () {
                                    egret.Tween.removeTweens(dropItem);
                                    if (dropItem && dropItem.parent) {
                                        dropItem.parent.removeChild(dropItem);
                                    }
                                }, this);
                            }
                        }, 1500);
                    };
                    for (var i_1 = 0; i_1 < drops.length; i_1++) {
                        _loop_2(i_1);
                    }
                    if (leveladd && (!GameApp.gameEnd && GameApp.fuben == "fuben")) {
                        //关卡循环添加怪物
                        var timeout2_1 = setTimeout(function () {
                            clearTimeout(timeout2_1);
                            if (!GameApp.gameEnd && GameApp.fuben == "fuben") {
                                self_1.initBoss();
                            }
                        }, 3000);
                    }
                }
                else {
                    MessageManager.inst().dispatch(CustomEvt.GAMEEND, { end: "gameend" });
                }
                this_1.monsters.splice(i, 1);
                return "break";
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.monsters.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
    };
    /**初始化boss关卡 */
    MapView.prototype.initBoss = function (bossMon) {
        if (GameApp.gameEnd) {
            return;
        }
        var bossindex = (Math.random() * this.levelMonIds.length) >> 0;
        var res = "monster" + this.levelMonIds[bossindex];
        var boss = new MonsterEntity();
        if (!bossMon) {
            var vo = { level: 1, atkDis: 64, spd: 50, atk: GameApp.level * 30 + ((Math.random() * 30) >> 0), hp: GameApp.level * 700 };
            var typeindex = this.typeindexs[bossindex];
            boss.type = typeindex;
            boss.setSoldierData(-1, res, vo);
        }
        else {
            var vo = { level: 1, atkDis: 64, spd: 50, atk: GameApp.level * 100 + ((Math.random() * 30) >> 0), hp: GameApp.level * 10000 };
            var typeindex = (Math.random() * 3) >> 0;
            boss.type = typeindex;
            GameApp.bossType = typeindex;
            boss.setSoldierData(-1, "", vo);
            boss.scaleX = boss.scaleY = 1.5;
        }
        LayerManager.MAP_LAYER.addChild(boss);
        var birthGrids = GameMap.monsterGrid;
        var index = (Math.random() * birthGrids.length) >> 0;
        var birthXY = birthGrids[index];
        var xy = GameMap.grid2Point(birthXY.col, birthXY.row);
        boss.x = xy.x;
        boss.y = xy.y;
        boss.gx = birthXY.col;
        boss.gy = birthXY.row;
        this.monsters.push(boss);
        // GameMap.AstarNode.setWalkable(birthXY.col,birthXY.row,false);
    };
    /**刷新地图位置 */
    MapView.prototype.refreshMapPos = function () {
        LayerManager.MAP_LAYER.x = -this.hero.x + (StageUtils.inst().getWidth() >> 1);
        LayerManager.MAP_LAYER.y = -this.hero.y + (StageUtils.inst().getHeight() >> 1);
        this.judageMapImgX();
        this.judageMapImgY();
    };
    /**
     * 开启人物点击地图层移动操作
     * param：roleEntity 需要点击操作的主人物实体对象
     */
    MapView.prototype.startRoleClickMove = function (roleEntity) {
        this.hero = roleEntity;
        LayerManager.MAP_LAYER.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMapTouch, this);
    };
    /**地图点击操作 */
    MapView.prototype.onMapTouch = function (evt) {
        var pxy = LayerManager.MAP_LAYER.globalToLocal(evt.stageX, evt.stageY);
        if (this.timeout) {
            clearTimeout(this.timeout), this.timeout = null;
        }
        this.execMoveAction(pxy, true);
    };
    MapView.prototype.execMoveAction = function (pxy, effect) {
        var gxy = GameMap.point2Grid(pxy.x, pxy.y);
        var _path = this.findPath(gxy.x, gxy.y);
        if (_path) {
            this._path = _path;
            if (effect) {
                var clickMc = new MovieClip();
                clickMc.touchEnabled = false;
                this.mapClick = true;
                LayerManager.MAP_LAYER.addChild(clickMc);
                clickMc.playFile(EFFECT + "click", 1, null, true);
                clickMc.x = pxy.x;
                clickMc.y = pxy.y;
            }
        }
        else {
            this.mapClick = false;
            return;
        }
        if (this._path && this._path.length) {
            //去掉第一个格子 。这个格子与人物在一个格子
            this._path.shift();
            if (this._path.length && this.moveEnd) {
                egret.Tween.removeTweens(this.hero);
                this.execMove(this._path.shift());
            }
        }
    };
    /**执行移动主逻辑 */
    MapView.prototype.execMove = function (node) {
        var _this = this;
        var gx = node.x;
        var gy = node.y;
        this.moveEnd = false;
        var point = GameMap.grid2Point(gx, gy);
        var _offestX = this.hero.x;
        var _offestY = this.hero.y;
        this.hero.changeRoleAction(ActionState.RUN, new egret.Point(point.x, point.y));
        var dis = egret.Point.distance(new egret.Point(point.x, point.y), new egret.Point(this.hero.x, this.hero.y));
        var time = dis / this.speed;
        egret.Tween.get(this.hero, { loop: false, onChange: function () {
                if (!_this.juageIfInXBorder()) {
                    var xx = _this.hero.x - _offestX;
                    // LayerManager.MAP_LAYER.x -= xx;
                    // _offestX = this.hero.x;
                    _this.refreshMapPos();
                }
                _this.judageMapImgX();
                if (!_this.juageIfInYBorder()) {
                    var yy = _this.hero.y - _offestY;
                    // LayerManager.MAP_LAYER.y -= yy;
                    // _offestY = this.hero.y;
                    _this.refreshMapPos();
                }
                _this.judageMapImgY();
            }, onChangeObj: this }).to({ x: point.x, y: point.y }, time * 1000).call(function () {
            egret.Tween.removeTweens(_this.hero);
            _this.moveEnd = true;
            if (_this._path && _this._path.length) {
                _this.execMove(_this._path.shift());
            }
            else {
                _this.hero.changeRoleAction(ActionState.STAND);
                if (_this.mapClick) {
                    var self_2 = _this;
                    self_2.timeout = setTimeout(function () {
                        clearTimeout(self_2.timeout);
                        self_2.mapClick = false;
                    }, 2000);
                }
            }
        });
    };
    /**找寻路径 */
    MapView.prototype.findPath = function (ex, ey) {
        GameMap.AstarNode.setEndNode(ex, ey);
        var pxy = GameMap.point2Grid(this.hero.x, this.hero.y);
        GameMap.AstarNode.setStartNode(pxy.x, pxy.y);
        var aStar = new astar.AStar();
        if (aStar.findPath(GameMap.AstarNode)) {
            var _path = aStar.path;
            return _path;
        }
        return null;
    };
    /**初始化地图层位置 */
    MapView.prototype.resetMapviewPort = function () {
        LayerManager.MAP_LAYER.y = 0;
        LayerManager.MAP_LAYER.x = 0;
    };
    //判断是否在X边界
    MapView.prototype.juageIfInXBorder = function () {
        return (this.hero.x <= StageUtils.inst().getWidth() >> 1) || (this.hero.x >= (GameMap.MAX_WIDTH - (StageUtils.inst().getWidth() >> 1)));
    };
    //判断是否在X边界
    MapView.prototype.juageIfInYBorder = function () {
        return (this.hero.y <= StageUtils.inst().getHeight() >> 1) || (this.hero.y >= (GameMap.MAX_HEIGHT - (StageUtils.inst().getHeight() >> 1)));
    };
    //判断地图x边界移动处理
    MapView.prototype.judageMapImgX = function () {
        // LayerManager.MAP_LAYER.x -= this._offestX;
        if (LayerManager.MAP_LAYER.x < -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth())) {
            LayerManager.MAP_LAYER.x = -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth());
        }
        if (LayerManager.MAP_LAYER.x > 0) {
            LayerManager.MAP_LAYER.x = 0;
        }
    };
    //判断地图y边界移动处理
    MapView.prototype.judageMapImgY = function () {
        // LayerManager.MAP_LAYER.y -= this._offestY;
        if (LayerManager.MAP_LAYER.y < -(GameMap.MAX_HEIGHT - StageUtils.inst().getHeight())) {
            LayerManager.MAP_LAYER.y = -(GameMap.MAX_HEIGHT - StageUtils.inst().getHeight());
        }
        if (LayerManager.MAP_LAYER.y > 0) {
            LayerManager.MAP_LAYER.y = 0;
        }
    };
    /**
     * 绘制地图节点
     */
    MapView.prototype.drawTestGrid = function () {
        this._shapeContainer = new egret.DisplayObjectContainer();
        this._shapeContainer.cacheAsBitmap = true;
        this._shapeContainer.touchEnabled = false;
        this._shapeContainer.touchChildren = false;
        var maxX = GameMap.COL;
        var maxY = GameMap.ROW;
        for (var i = 0; i < maxY; i++) {
            for (var j = 0; j < maxX; j++) {
                if (!GameMap.walkable(i, j)) {
                    var rect = new egret.Shape();
                    rect.graphics.clear();
                    rect.graphics.lineStyle(0.1);
                    rect.graphics.beginFill(0xff0000, 0.3);
                    rect.graphics.drawRect(j * GameMap.CELL_SIZE, i * GameMap.CELL_SIZE, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                    rect.graphics.endFill();
                    var text = new eui.Label();
                    text.size = 12;
                    text.text = j + "," + i;
                    text.x = j * GameMap.CELL_SIZE;
                    text.y = i * GameMap.CELL_SIZE;
                    this._shapeContainer.addChild(rect);
                    this._shapeContainer.addChild(text);
                }
            }
        }
        LayerManager.MAP_LAYER.addChild(this._shapeContainer);
    };
    return MapView;
}(BaseClass));
__reflect(MapView.prototype, "MapView");
//# sourceMappingURL=MapView.js.map