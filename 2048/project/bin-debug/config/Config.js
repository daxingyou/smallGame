var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wizardc on 2014/7/29.
 */
var game;
(function (game) {
    var Config = (function () {
        function Config() {
        }
        /**
         * 只要有一块格子到达该数值则游戏成功.
         */
        Config.WIN_NUMBER = 4096;
        /**
         * 格子行数.
         */
        Config.TILE_ROW = 4;
        /**
         * 格子列数.
         */
        Config.TILE_COLUMN = 4;
        /**
         * 格子宽度.
         */
        Config.TILE_WIDTH = 140;
        /**
         * 格子高度.
         */
        Config.TILE_HEIGHT = 172;
        /**
         * 格子之间的间距.
         */
        Config.TILE_GAP = 10;
        return Config;
    }());
    game.Config = Config;
    __reflect(Config.prototype, "game.Config");
})(game || (game = {}));
//# sourceMappingURL=Config.js.map