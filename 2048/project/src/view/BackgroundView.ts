/**
 * Created by wizardc on 2014/7/29.
 */
module game
{
    export class BackgroundView extends egret.DisplayObjectContainer
    {
        private _root:egret.DisplayObjectContainer;
        private _sheet:egret.SpriteSheet;

        private _score:number;

        // private _scoreLabel:egret.TextField;
        // private _addScoreLabel:egret.TextField;

        public constructor(root:egret.DisplayObjectContainer, sheet:egret.SpriteSheet)
        {
            super();
            this._root = root;
            this._sheet = sheet;


            this.createBG();
            this.createScoreLabel();

            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_RESTART, this.gameRestartHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.SCORE_UPDATE, this.scoreUpdateHandler, this);
        }

        private createBG():void
        {
            var sw:number = this._root.stage.stageWidth;
            var sh:number = this._root.stage.stageHeight;

            // var bitmap:eui.Image 
            // bitmap.source = "menu"
            // bitmap.x = (sw - bitmap.width) / 2;
            // this.addChild(bitmap);

            let bitmap = new eui.Image();
            bitmap.width = (game.Config.TILE_GAP + game.Config.TILE_WIDTH) * game.Config.TILE_COLUMN + game.Config.TILE_GAP;
            bitmap.height = (game.Config.TILE_GAP + game.Config.TILE_HEIGHT) * game.Config.TILE_ROW + game.Config.TILE_GAP;
            bitmap.scale9Grid = new egret.Rectangle(35, 35, 30, 30);
            // bitmap.source = "background"
            bitmap.x = (sw - bitmap.width) / 2;
            bitmap.y = 50 
            this.addChild(bitmap);

            game.Util.tileRect = new egret.Rectangle(bitmap.x, bitmap.y, bitmap.width, bitmap.height);

            var contentX:number = bitmap.x + game.Config.TILE_GAP;
            var contentY:number = bitmap.y + game.Config.TILE_GAP;

            for(var i:number = 0; i < game.Config.TILE_COLUMN; i++)
            {
                for(var j:number = 0; j < game.Config.TILE_ROW; j++)
                {
                    let bitmap = new eui.Image();
                    bitmap.x = contentX + (game.Config.TILE_GAP + game.Config.TILE_WIDTH) * i;
                    bitmap.y = contentY + (game.Config.TILE_GAP + game.Config.TILE_HEIGHT) * j;
                    bitmap.width = game.Config.TILE_WIDTH;
                    bitmap.height = game.Config.TILE_HEIGHT;
                    bitmap.source = "backtile"
                    this.addChild(bitmap);
                }
            }
        }

        private createScoreLabel():void
        {
            // this._scoreLabel = new egret.TextField();
            // this._scoreLabel.x = 403;
            // this._scoreLabel.y = 30;
            // this._scoreLabel.width = 100;
            // this._scoreLabel.height = 28;
            // this._scoreLabel.size = 23;
            // this._scoreLabel.textAlign = "center";
            // this._scoreLabel.textColor = 0xFFFFFF;
            // this.addChild(this._scoreLabel);

            // this._addScoreLabel = new egret.TextField();
            // this._addScoreLabel.x = 403;
            // this._addScoreLabel.y = 38;
            // this._addScoreLabel.width = 100;
            // this._addScoreLabel.height = 28;
            // this._addScoreLabel.size = 15;
            // this._addScoreLabel.textAlign = "center";
            // this._addScoreLabel.textColor = 0x8B8177;
            // this._addScoreLabel.visible = false;
            // this.addChild(this._addScoreLabel);
        }

        private gameRestartHandler(event:egret.Event):void
        {
            this._score = 0;
            MessageManager.inst().dispatch("reset")
            // this._scoreLabel.text = this._score.toString();
        }

        private scoreUpdateHandler(event:egret.Event):void
        {
            var data:Object = <Object> event.data;
            var addScore:number = <number> data["addScore"];
            this._score += addScore;
            MessageManager.inst().dispatch("refresh",{score:this._score})
            // this._scoreLabel.text = this._score.toString();

            this.playAddScoreEffect(addScore);
        }

        private playAddScoreEffect(addScore:number):void
        {
            // this._addScoreLabel.visible = true;
            // this._addScoreLabel.text = "+".concat(addScore.toString());
            // egret.Tween.removeTweens(this._addScoreLabel);
            // this._addScoreLabel.y = 38;
            // egret.Tween.get(this._addScoreLabel).to({y:0}, 300).call(this.playCompleteHandler, this);
        }

        private playCompleteHandler():void
        {
            // this._addScoreLabel.visible = false;
        }
    }
}
