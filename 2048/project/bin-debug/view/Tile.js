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
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(sheet) {
            var _this = _super.call(this) || this;
            _this._sheet = sheet;
            _this.anchorOffsetX = (game.Config.TILE_WIDTH >> 1) - 20;
            _this.anchorOffsetY = game.Config.TILE_HEIGHT >> 1;
            return _this;
            // this.width = game.Config.TILE_WIDTH;
            // this.height = game.Config.TILE_HEIGHT;
        }
        Tile.findTile = function (sheet) {
            if (game.Tile._pool.length > 0) {
                return game.Tile._pool.pop();
            }
            return new Tile(sheet);
        };
        Tile.cacheTile = function (tile) {
            game.Tile._pool.push(tile);
        };
        Object.defineProperty(Tile.prototype, "num", {
            get: function () {
                return this._num;
            },
            set: function (value) {
                if (this._num != value) {
                    this._num = value;
                    var mi = Math.log(this._num) / Math.log(2);
                    this.source = "number" + mi;
                }
            },
            enumerable: true,
            configurable: true
        });
        Tile._pool = [];
        return Tile;
    }(eui.Image));
    game.Tile = Tile;
    __reflect(Tile.prototype, "game.Tile");
})(game || (game = {}));
//# sourceMappingURL=Tile.js.map