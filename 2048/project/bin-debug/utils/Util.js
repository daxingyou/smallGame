var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wizardc on 2014/7/31.
 */
var game;
(function (game) {
    var Util = (function () {
        function Util() {
        }
        /**
         * 根据行列获取位置.
         * @param column 列数.
         * @param row 行数.
         * @returns {egret.Point} 对应的坐标.
         */
        Util.getPosition = function (column, row) {
            var p = new egret.Point();
            p.x = (game.Util.tileRect.x + game.Config.TILE_GAP) + (game.Config.TILE_GAP + game.Config.TILE_WIDTH) * column + game.Config.TILE_WIDTH / 2;
            p.y = (game.Util.tileRect.y + game.Config.TILE_GAP) + (game.Config.TILE_GAP + game.Config.TILE_HEIGHT) * row + game.Config.TILE_HEIGHT / 2;
            return p;
        };
        return Util;
    }());
    game.Util = Util;
    __reflect(Util.prototype, "game.Util");
})(game || (game = {}));
//# sourceMappingURL=Util.js.map