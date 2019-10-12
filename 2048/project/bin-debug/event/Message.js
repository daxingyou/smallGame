var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by wizardc on 2014/7/30.
 */
var game;
(function (game) {
    var Message = (function () {
        function Message() {
        }
        /**
         * 移动一个格子到指定的位置.
         */
        Message.MOVE_TILE = "moveTile";
        /**
         * 合并的一个格子, 需要移动到指定的位置并消失.
         */
        Message.MERGE_REMOVE_TILE = "mergeRemoveTile";
        /**
         * 合并后生成的新格子.
         */
        Message.MERGE_NEW_TILE = "mergeNewTile";
        /**
         * 添加一个格子.
         */
        Message.INSERT_TILE = "insertTile";
        /**
         * 得分更新.
         */
        Message.SCORE_UPDATE = "scoreUpdate";
        /**
         * 游戏成功.
         */
        Message.GAME_SUCCESS = "gameSuccess";
        /**
         * 游戏失败.
         */
        Message.GAME_FAILURE = "gameFailure";
        /**
         * 重新开始游戏.
         */
        Message.GAME_RESTART = "gameRestart";
        /**
         * 继续游戏.
         */
        Message.GAME_GO_ON = "gameGoOn";
        return Message;
    }());
    game.Message = Message;
    __reflect(Message.prototype, "game.Message");
})(game || (game = {}));
//# sourceMappingURL=Message.js.map