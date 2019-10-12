/**
 * Created by wizardc on 2014/7/30.
 */
module game
{
    export class Message
    {
        /**
         * 移动一个格子到指定的位置.
         */
        public static MOVE_TILE:string = "moveTile";

        /**
         * 合并的一个格子, 需要移动到指定的位置并消失.
         */
        public static MERGE_REMOVE_TILE:string = "mergeRemoveTile";

        /**
         * 合并后生成的新格子.
         */
        public static MERGE_NEW_TILE:string = "mergeNewTile";

        /**
         * 添加一个格子.
         */
        public static INSERT_TILE:string = "insertTile";

        /**
         * 得分更新.
         */
        public static SCORE_UPDATE:string = "scoreUpdate";

        /**
         * 游戏成功.
         */
        public static GAME_SUCCESS:string = "gameSuccess";

        /**
         * 游戏失败.
         */
        public static GAME_FAILURE:string = "gameFailure";

        /**
         * 重新开始游戏.
         */
        public static GAME_RESTART:string = "gameRestart";

        /**
         * 继续游戏.
         */
        public static GAME_GO_ON:string = "gameGoOn";
    }
}
