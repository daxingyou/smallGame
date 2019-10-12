var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wizardc on 2014/7/30.
 */
var game;
(function (game) {
    var TileVO = (function () {
        function TileVO(column, row) {
            this.column = column;
            this.row = row;
            this.num = 0;
        }
        return TileVO;
    }());
    game.TileVO = TileVO;
    __reflect(TileVO.prototype, "game.TileVO");
})(game || (game = {}));
//# sourceMappingURL=TileVO.js.map