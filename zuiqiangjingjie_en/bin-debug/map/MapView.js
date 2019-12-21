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
 * Game map
 *
 * eg ： Initialize map module 。Need to callinitMap; Other method selective calls
 *
 * function:  initMap Initialize map
 *
 * function1 ：resetMapviewPort；Reset map layer location 。Default to00spot
 *
 * function2 : startRoleClickMove Turn on character click map move operation
 */
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        _this.initia = false;
        //Moving speed
        _this.speed = 200;
        return _this;
    }
    MapView.inst = function () {
        var _inst = _super.single.call(this);
        return _inst;
    };
    /**
     * Map initialization
     * drawGrid Whether to draw test grid
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
        /**test */
        var hero = new egret.Shape();
        hero.graphics.beginFill(0xff0000);
        hero.graphics.drawRect(0, 0, 50, 50);
        hero.anchorOffsetX = hero.anchorOffsetY = 25;
        hero.graphics.endFill();
        LayerManager.MAP_LAYER.addChild(hero);
        hero.x = hero.y = 200;
        this.startRoleClickMove(hero);
        //------------------
    };
    /**
     * Turn on character click map layer move operation
     * param：roleEntity Main character entity object to be clicked
     */
    MapView.prototype.startRoleClickMove = function (roleEntity) {
        this.hero = roleEntity;
        LayerManager.MAP_LAYER.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMapTouch, this);
    };
    /**Map click operation */
    MapView.prototype.onMapTouch = function (evt) {
        var pxy = LayerManager.MAP_LAYER.globalToLocal(evt.stageX, evt.stageY);
        var gxy = GameMap.point2Grid(pxy.x, pxy.y);
        var _path = this.findPath(gxy.x, gxy.y);
        if (_path) {
            this._path = _path;
        }
        else {
            return;
        }
        if (this._path && this._path.length) {
            //Remove the first grid 。This grid is in the same grid with the characters
            this._path.shift();
            if (this._path.length) {
                egret.Tween.removeTweens(this.hero);
                this.execMove(this._path.shift());
            }
        }
    };
    /**Execute move master logic */
    MapView.prototype.execMove = function (node) {
        var _this = this;
        var gx = node.x;
        var gy = node.y;
        var point = GameMap.grid2Point(gx, gy);
        var _offestX = this.hero.x;
        var _offestY = this.hero.y;
        egret.Tween.get(this.hero, { loop: false, onChange: function () {
                if (!_this.juageIfInXBorder()) {
                    var xx = _this.hero.x - _offestX;
                    LayerManager.MAP_LAYER.x -= xx;
                    _offestX = _this.hero.x;
                }
                _this.judageMapImgX();
                if (!_this.juageIfInYBorder()) {
                    var yy = _this.hero.y - _offestY;
                    LayerManager.MAP_LAYER.y -= yy;
                    _offestY = _this.hero.y;
                }
                _this.judageMapImgY();
            }, onChangeObj: this }).to({ x: point.x, y: point.y }, this.speed).call(function () {
            egret.Tween.removeTweens(_this.hero);
            if (_this._path && _this._path.length) {
                _this.execMove(_this._path.shift());
            }
        });
    };
    /**Finding path */
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
    /**Initialize map layer location */
    MapView.prototype.resetMapviewPort = function () {
        LayerManager.MAP_LAYER.y = 0;
        LayerManager.MAP_LAYER.x = 0;
    };
    //Determine whether theXboundary
    MapView.prototype.juageIfInXBorder = function () {
        return (this.hero.x <= StageUtils.inst().getWidth() >> 1) || (this.hero.x >= (GameMap.MAX_WIDTH - (StageUtils.inst().getWidth() >> 1)));
    };
    //Determine whether theXboundary
    MapView.prototype.juageIfInYBorder = function () {
        return (this.hero.y <= StageUtils.inst().getHeight() >> 1) || (this.hero.y >= (GameMap.MAX_HEIGHT - (StageUtils.inst().getHeight() >> 1)));
    };
    //Judgement mapxBoundary movement processing
    MapView.prototype.judageMapImgX = function () {
        // LayerManager.MAP_LAYER.x -= this._offestX;
        if (LayerManager.MAP_LAYER.x < -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth())) {
            LayerManager.MAP_LAYER.x = -(GameMap.MAX_WIDTH - StageUtils.inst().getWidth());
        }
        if (LayerManager.MAP_LAYER.x > 0) {
            LayerManager.MAP_LAYER.x = 0;
        }
    };
    //Judgement mapyBoundary movement processing
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
     * Draw map node
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