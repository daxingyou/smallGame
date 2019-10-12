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
 * Created by wizardc on 2014/7/29.
 */
var game;
(function (game) {
    var TileView = (function (_super) {
        __extends(TileView, _super);
        function TileView(root, sheet) {
            var _this = _super.call(this) || this;
            _this._lastTime = 0;
            _this._root = root;
            _this._sheet = sheet;
            game.GameDispatcher.getInstance().addEventListener(game.Message.MOVE_TILE, _this.moveTileHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.MERGE_REMOVE_TILE, _this.mergeRemoveTileHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.MERGE_NEW_TILE, _this.mergeNewTileHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.INSERT_TILE, _this.insertTileHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_SUCCESS, _this.gameEndHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_FAILURE, _this.gameEndHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_RESTART, _this.gameRestartHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_GO_ON, _this.gameGoOnHandler, _this);
            _this._controller = new game.TileController(_this._root);
            _this._controller.addEventListener(game.TileController.MOVE, _this.moveHandler, _this);
            return _this;
        }
        TileView.prototype.moveTileHandler = function (event) {
            var data = event.data;
            var newPos = game.Util.getPosition(data["newColumn"], data["newRow"]);
            var oldKey = data["oldColumn"] + "_" + data["oldRow"];
            var newKey = data["newColumn"] + "_" + data["newRow"];
            var tile = this._tileMap[oldKey];
            delete this._tileMap[oldKey];
            this._tileMap[newKey] = tile;
            //特效
            egret.Tween.get(tile).to({ x: newPos.x, y: newPos.y }, 100);
        };
        TileView.prototype.mergeRemoveTileHandler = function (event) {
            var data = event.data;
            var newPos = game.Util.getPosition(data["newColumn"], data["newRow"]);
            var oldKey = data["oldColumn"] + "_" + data["oldRow"];
            var tile = this._tileMap[oldKey];
            delete this._tileMap[oldKey];
            //特效
            egret.Tween.get(tile).to({ x: newPos.x, y: newPos.y }, 100).call(this.mergeRemoveCompleteHandler, this, [tile]);
        };
        TileView.prototype.mergeRemoveCompleteHandler = function (tile) {
            tile.parent.removeChild(tile);
            game.Tile.cacheTile(tile);
        };
        TileView.prototype.mergeNewTileHandler = function (event) {
            var data = event.data;
            var pos = game.Util.getPosition(data["column"], data["row"]);
            var tile = game.Tile.findTile(this._sheet);
            tile.x = pos.x;
            tile.y = pos.y;
            tile.num = data["num"];
            this.addChild(tile);
            this._tileMap[data["column"] + "_" + data["row"]] = tile;
            //特效
            tile.scaleX = tile.scaleY = 1;
            egret.Tween.get(tile).to({ scaleX: 1.3, scaleY: 1.3 }, 50).wait(50).call(this.mergeNewCompleteHandler, this, [tile]);
        };
        TileView.prototype.mergeNewCompleteHandler = function (tile) {
            egret.Tween.get(tile).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        TileView.prototype.insertTileHandler = function (event) {
            var data = event.data;
            var pos = game.Util.getPosition(data["column"], data["row"]);
            var tile = game.Tile.findTile(this._sheet);
            tile.x = pos.x;
            tile.y = pos.y;
            tile.num = data["num"];
            this.addChild(tile);
            this._tileMap[data["column"] + "_" + data["row"]] = tile;
            //特效
            tile.scaleX = tile.scaleY = 0.1;
            egret.Tween.get(tile).to({ scaleX: 1, scaleY: 1 }, 100);
        };
        TileView.prototype.gameEndHandler = function (event) {
            console.log("游戏结束");
            this._controller.unregister();
        };
        TileView.prototype.gameRestartHandler = function (event) {
            var key;
            for (key in this._tileMap) {
                var tile = this._tileMap[key];
                tile.parent.removeChild(tile);
                game.Tile.cacheTile(tile);
            }
            this._tileMap = {};
            this._controller.register();
        };
        TileView.prototype.gameGoOnHandler = function (event) {
            this._controller.register();
        };
        TileView.prototype.moveHandler = function (event) {
            var nowTime = egret.getTimer();
            var interval = nowTime - this._lastTime;
            //避免过快的操作
            if (interval >= 200) {
                this._lastTime = nowTime;
                var direction = event.data;
                if (direction == null) {
                    direction = 0;
                }
                game.GameData.getInstance().doMove(direction);
            }
        };
        return TileView;
    }(egret.DisplayObjectContainer));
    game.TileView = TileView;
    __reflect(TileView.prototype, "game.TileView");
})(game || (game = {}));
//# sourceMappingURL=TileView.js.map