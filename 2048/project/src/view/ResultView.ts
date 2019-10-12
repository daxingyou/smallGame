/**
 * Created by wizardc on 2014/7/29.
 */
module game
{
    export class ResultView extends egret.DisplayObjectContainer
    {
        private _root:egret.DisplayObjectContainer;
        private _sheet:egret.SpriteSheet;

        private _winPanel:egret.DisplayObjectContainer;
        private _failPanel:egret.DisplayObjectContainer;

        public constructor(root:egret.DisplayObjectContainer, sheet:egret.SpriteSheet)
        {
            super();
            this._root = root;
            this._sheet = sheet;

            this.createBG();
            this.createWinPanel();
            this.createFailPanel();

            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_SUCCESS, this.gameSuccessHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_FAILURE, this.gameFailureHandler, this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_RESTART, this.gameRestartHandler, this);
        }

        private createBG():void
        {
            var bitmap:eui.Image = new eui.Image();
            bitmap.source = ""
            bitmap.alpha = 0.5;
            bitmap.scale9Grid = new egret.Rectangle(35, 35, 30, 30);
            bitmap.x = game.Util.tileRect.x;
            bitmap.y = game.Util.tileRect.y;
            bitmap.width = game.Util.tileRect.width;
            bitmap.height = game.Util.tileRect.height;
            this.addChild(bitmap);
        }

        private createWinPanel():void
        {
            this._winPanel = new egret.DisplayObjectContainer();
            this.addChild(this._winPanel);

            var label = new egret.TextField();
            label.width = 200;
            label.height = 35;
            label.x = (this._root.stage.stageWidth - label.width) / 2;
            label.y = (this._root.stage.stageHeight - label.height) / 2 - 80;
            label.size = 30;
            label.bold = true;
            label.textAlign = "center";
            label.textColor = 0xFF0000;
            label.text = "你赢了！";
            this._winPanel.addChild(label);
           

            // var btn:game.SimpleButton = new game.SimpleButton(this._sheet, "continueButton_up", "continueButton_over");
            // btn.x = (this._root.stage.stageWidth - btn.width) / 2;
            // btn.y = (this._root.stage.stageHeight - btn.height) / 2 + 80;
            // btn.addEventListener(game.SimpleButton.CLICK, this.winClickHandler, this);
            // this._winPanel.addChild(btn);
        }

        private winClickHandler(event:egret.Event):void
        {
            game.GameDispatcher.getInstance().dispatchEventWith(game.Message.GAME_GO_ON, false);
            this.gameRestartHandler(null);
        }

        private createFailPanel():void
        {
            this._failPanel = new egret.DisplayObjectContainer();
            this.addChild(this._failPanel);

            var bitmap:eui.Image = new eui.Image();
            // bitmap.source = "result_failed";
            bitmap.x = (this._root.stage.stageWidth - bitmap.width) / 2;
            bitmap.y = (this._root.stage.stageHeight - bitmap.height) / 2 - 80;
            this._failPanel.addChild(bitmap);

            // var btn:game.SimpleButton = new game.SimpleButton(this._sheet, "resetButton_up", "resetButton_over");
            // btn.x = (this._root.stage.stageWidth - btn.width) / 2;
            // btn.y = (this._root.stage.stageHeight - btn.height) / 2 + 80;
            // btn.addEventListener(game.SimpleButton.CLICK, this.failClickHandler, this);
            // this._failPanel.addChild(btn);
        }

        private failClickHandler(event:egret.Event):void
        {
            game.GameData.getInstance().newGame();
        }

        private gameSuccessHandler(event:egret.Event):void
        {
            this.visible = true;
            this._winPanel.visible = true;
            this._failPanel.visible = false;
        }

        private gameFailureHandler(event:egret.Event):void
        {
            this.visible = true;
            this._winPanel.visible = false;
            this._failPanel.visible = true;
        }

        private gameRestartHandler(event:egret.Event):void
        {
            this.visible = false;
            this._winPanel.visible = false;
            this._failPanel.visible = false;
        }
    }
}
