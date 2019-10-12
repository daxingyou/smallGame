/**
 * Created by wizardc on 2014/7/29.
 */
module game
{
    export class TileView extends egret.DisplayObjectContainer
    {
        private _root:egret.DisplayObjectContainer;
        private _sheet:egret.SpriteSheet;

        private _controller:game.TileController;
        private _lastTime:number = 0;

        private _tileMap:Object;

        public constructor(root:egret.DisplayObjectContainer, sheet:egret.SpriteSheet)
        {
            super();
            this._root = root;
            this._sheet = sheet;

            game.GameDispatcher.getInstance().addEventListener(game.Message.MOVE_TILE, this.moveTileHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.MERGE_REMOVE_TILE, this.mergeRemoveTileHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.MERGE_NEW_TILE, this.mergeNewTileHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.INSERT_TILE, this.insertTileHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_SUCCESS, this.gameEndHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_FAILURE, this.gameEndHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_RESTART, this.gameRestartHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_GO_ON, this.gameGoOnHandler, this);

            this._controller = new game.TileController(this._root);
            this._controller.addEventListener(game.TileController.MOVE, this.moveHandler, this);
        }

        private moveTileHandler(event:egret.Event):void
        {
            var data:Object = <Object> event.data;
            var newPos:egret.Point = game.Util.getPosition(<number> data["newColumn"], <number> data["newRow"]);

            var oldKey:string = data["oldColumn"] + "_" + data["oldRow"];
            var newKey:string = data["newColumn"] + "_" + data["newRow"];

            var tile:game.Tile = <game.Tile> this._tileMap[oldKey];
            delete this._tileMap[oldKey];
            this._tileMap[newKey] = tile;

            //特效
            egret.Tween.get(tile).to({x:newPos.x, y:newPos.y}, 100);
        }

        private mergeRemoveTileHandler(event:egret.Event):void
        {
            var data:Object = <Object> event.data;
            var newPos:egret.Point = game.Util.getPosition(<number> data["newColumn"], <number> data["newRow"]);

            var oldKey:string = data["oldColumn"] + "_" + data["oldRow"];

            var tile:game.Tile = <game.Tile> this._tileMap[oldKey];
            delete this._tileMap[oldKey];

            //特效
            egret.Tween.get(tile).to({x:newPos.x, y:newPos.y}, 100).call(this.mergeRemoveCompleteHandler, this, [tile]);
        }

        private mergeRemoveCompleteHandler(tile:game.Tile):void
        {
            tile.parent.removeChild(tile);
            game.Tile.cacheTile(tile);
        }

        private mergeNewTileHandler(event:egret.Event):void
        {
            var data:Object = <Object> event.data;
            var pos:egret.Point = game.Util.getPosition(<number> data["column"], <number> data["row"]);

            var tile:game.Tile = game.Tile.findTile(this._sheet);
            tile.x = pos.x;
            tile.y = pos.y;
            tile.num = <number> data["num"];
            this.addChild(tile);

            this._tileMap[data["column"] + "_" + data["row"]] = tile;

            //特效
            tile.scaleX = tile.scaleY = 1;
            egret.Tween.get(tile).to({scaleX:1.3, scaleY:1.3}, 50).wait(50).call(this.mergeNewCompleteHandler, this, [tile]);
        }

        private mergeNewCompleteHandler(tile:game.Tile):void
        {
            egret.Tween.get(tile).to({scaleX:1, scaleY:1}, 50);
        }

        private insertTileHandler(event:egret.Event):void
        {
            var data:Object = <Object> event.data;
            var pos:egret.Point = game.Util.getPosition(<number> data["column"], <number> data["row"]);

            var tile:game.Tile = game.Tile.findTile(this._sheet);
            tile.x = pos.x;
            tile.y = pos.y;
            tile.num = <number> data["num"];
            this.addChild(tile);

            this._tileMap[data["column"] + "_" + data["row"]] = tile;

            //特效
            tile.scaleX = tile.scaleY = 0.1;
            egret.Tween.get(tile).to({scaleX:1, scaleY:1}, 100);
        }

        private gameEndHandler(event:egret.Event):void
        {
            console.log("游戏结束")
            this._controller.unregister();
        }

        private gameRestartHandler(event:egret.Event):void
        {
            var key:string;
            for(key in this._tileMap)
            {
                var tile:game.Tile = this._tileMap[key];
                tile.parent.removeChild(tile);
                game.Tile.cacheTile(tile);
            }

            this._tileMap = {};

            this._controller.register();
        }

        private gameGoOnHandler(event:egret.Event):void
        {
            this._controller.register();
        }

        private moveHandler(event:egret.Event):void
        {
            var nowTime:number = egret.getTimer();
            var interval:number = nowTime - this._lastTime;
            //避免过快的操作
            if(interval >= 200)
            {
                this._lastTime = nowTime;

                var direction:number = <number> event.data;
                if(direction == null)
                {
                    direction = 0;
                }
                game.GameData.getInstance().doMove(direction);
            }
        }
    }
}
