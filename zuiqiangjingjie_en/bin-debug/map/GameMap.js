var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * Map grid auxiliary class
 */
var GameMap = (function () {
    function GameMap() {
    }
    /** Initialization */
    GameMap.init = function (data) {
        var gds = data.grids;
        GameMap.grid = [];
        GameMap.runGrid = [];
        GameMap.CELL_SIZE = data.gridw;
        GameMap.MAX_WIDTH = data.pixwidth;
        GameMap.MAX_HEIGHT = data.pixheight;
        GameMap.COL = data.cols;
        GameMap.ROW = data.rows;
        this.AstarNode = new astar.Grid(data.cols, data.rows);
        for (var i = 0; i < data.rows; i++) {
            GameMap.grid[i] = [];
            for (var j = 0; j < data.cols; j++) {
                GameMap.grid[i][j] = gds[i * data.cols + j];
                if (GameMap.grid[i][j] == 1) {
                    var obj = { row: i, col: j };
                    GameMap.runGrid.push(obj);
                }
                if (GameMap.grid[i][j] == 0) {
                    this.AstarNode.setWalkable(j, i, false);
                }
            }
        }
    };
    /**Pixel to grid coordinates */
    GameMap.point2Grid = function (px, py) {
        var gridXnum = (px / GameMap.CELL_SIZE) >> 0;
        var gridYnum = (py / GameMap.CELL_SIZE) >> 0;
        return { x: gridXnum, y: gridYnum };
    };
    /**Grid position to pixel */
    GameMap.grid2Point = function (gx, gy) {
        var x = gx * GameMap.CELL_SIZE;
        var y = gy * GameMap.CELL_SIZE;
        return { x: x, y: y };
    };
    /**
     * Calculate the set of grids occupied by buildings
     * Returns the set of grid coordinates occupied
     */
    GameMap.calculBuildGridArea = function (rect) {
        var blockXNum = Math.ceil(rect.width / GameMap.CELL_SIZE);
        var blockYNum = Math.ceil(rect.height / GameMap.CELL_SIZE);
        var xys = [];
        var firstGrid = GameMap.point2Grid(rect.x, rect.y);
        for (var i = 0; i < blockXNum; i++) {
            for (var j = 0; j < blockYNum; j++) {
                var xy = { x: firstGrid.x + i, y: firstGrid.y + j };
                xys.push(xy);
            }
        }
        return xys;
    };
    /**Judge whether it is at the blocking point according to the grid coordinates  */
    GameMap.walkable = function (x, y) {
        if (!(GameMap.grid[x])) {
            return null;
        }
        if (isNaN(GameMap.grid[x][y])) {
            return null;
        }
        var grid = GameMap.grid[x][y];
        if (grid == 3) {
            return null;
        }
        return grid;
    };
    /** Lattice data */
    GameMap.buildTouch = false;
    GameMap.grid = [];
    GameMap.runGrid = [];
    return GameMap;
}());
__reflect(GameMap.prototype, "GameMap");
//# sourceMappingURL=GameMap.js.map