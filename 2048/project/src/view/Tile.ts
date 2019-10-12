/**
 * Created by wizardc on 2014/7/29.
 */
module game
{
    export class Tile extends eui.Image
    {
        private static _pool:Array<Tile> = [];

        public static findTile(sheet:egret.SpriteSheet):Tile
        {
            if(game.Tile._pool.length > 0)
            {
                return game.Tile._pool.pop();
            }
            return new Tile(sheet);
        }

        public static cacheTile(tile:Tile):void
        {
            game.Tile._pool.push(tile);
        }

        private _sheet:egret.SpriteSheet;

        private _num:number;

        public constructor(sheet:egret.SpriteSheet)
        {
            super();
            this._sheet = sheet;
            this.anchorOffsetX = (Config.TILE_WIDTH>>1) - 20;
            this.anchorOffsetY = Config.TILE_HEIGHT>>1
            // this.width = game.Config.TILE_WIDTH;
            // this.height = game.Config.TILE_HEIGHT;
        }

        public set num(value:number)
        {
            if(this._num != value)
            {
                this._num = value;

                var mi:number = Math.log(this._num) / Math.log(2);
                this.source = "number" + mi
            }
        }
        public get num():number
        {
            return this._num;
        }
    }
}
