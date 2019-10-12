/**
 * Created by wizardc on 2014/7/31.
 */
module game
{
    export class Util
    {
        /**
         * 图块区域.
         */
        public static tileRect:egret.Rectangle;

        /**
         * 根据行列获取位置.
         * @param column 列数.
         * @param row 行数.
         * @returns {egret.Point} 对应的坐标.
         */
        public static getPosition(column:number, row:number):egret.Point
        {
            var p:egret.Point = new egret.Point();
            p.x = (game.Util.tileRect.x + game.Config.TILE_GAP) + (game.Config.TILE_GAP + game.Config.TILE_WIDTH) * column + game.Config.TILE_WIDTH / 2;
            p.y = (game.Util.tileRect.y + game.Config.TILE_GAP) + (game.Config.TILE_GAP + game.Config.TILE_HEIGHT) * row + game.Config.TILE_HEIGHT / 2;
            return p;
        }
    }
}
