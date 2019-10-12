/**
 * Created by wizardc on 2014/7/29.
 */
module game
{
    export class Config
    {
        /**
         * 只要有一块格子到达该数值则游戏成功.
         */
        public static WIN_NUMBER:number = 4096;

        /**
         * 格子行数.
         */
        public static TILE_ROW:number = 4;

        /**
         * 格子列数.
         */
        public static TILE_COLUMN:number = 4;

        /**
         * 格子宽度.
         */
        public static TILE_WIDTH:number = 140;

        /**
         * 格子高度.
         */
        public static TILE_HEIGHT:number = 172;

        /**
         * 格子之间的间距.
         */
        public static TILE_GAP:number = 10;
    }
}
