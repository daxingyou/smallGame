var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by wizardc on 2014/7/29.
 */
var game;
(function (game) {
    var ResultView = (function (_super) {
        __extends(ResultView, _super);
        function ResultView(root, sheet) {
            var _this = _super.call(this) || this;
            _this._root = root;
            _this._sheet = sheet;
            _this.createBG();
            _this.createWinPanel();
            _this.createFailPanel();
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_SUCCESS, _this.gameSuccessHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_FAILURE, _this.gameFailureHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_RESTART, _this.gameRestartHandler, _this);
            return _this;
        }
        ResultView.prototype.createBG = function () {
            var bitmap = new eui.Image();
            bitmap.source = "";
            bitmap.alpha = 0.5;
            bitmap.scale9Grid = new egret.Rectangle(35, 35, 30, 30);
            bitmap.x = game.Util.tileRect.x;
            bitmap.y = game.Util.tileRect.y;
            bitmap.width = game.Util.tileRect.width;
            bitmap.height = game.Util.tileRect.height;
            this.addChild(bitmap);
        };
        ResultView.prototype.createWinPanel = function () {
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
        };
        ResultView.prototype.winClickHandler = function (event) {
            game.GameDispatcher.getInstance().dispatchEventWith(game.Message.GAME_GO_ON, false);
            this.gameRestartHandler(null);
        };
        ResultView.prototype.createFailPanel = function () {
            this._failPanel = new egret.DisplayObjectContainer();
            this.addChild(this._failPanel);
            var bitmap = new eui.Image();
            // bitmap.source = "result_failed";
            bitmap.x = (this._root.stage.stageWidth - bitmap.width) / 2;
            bitmap.y = (this._root.stage.stageHeight - bitmap.height) / 2 - 80;
            this._failPanel.addChild(bitmap);
            // var btn:game.SimpleButton = new game.SimpleButton(this._sheet, "resetButton_up", "resetButton_over");
            // btn.x = (this._root.stage.stageWidth - btn.width) / 2;
            // btn.y = (this._root.stage.stageHeight - btn.height) / 2 + 80;
            // btn.addEventListener(game.SimpleButton.CLICK, this.failClickHandler, this);
            // this._failPanel.addChild(btn);
        };
        ResultView.prototype.failClickHandler = function (event) {
            game.GameData.getInstance().newGame();
        };
        ResultView.prototype.gameSuccessHandler = function (event) {
            this.visible = true;
            this._winPanel.visible = true;
            this._failPanel.visible = false;
        };
        ResultView.prototype.gameFailureHandler = function (event) {
            this.visible = true;
            this._winPanel.visible = false;
            this._failPanel.visible = true;
        };
        ResultView.prototype.gameRestartHandler = function (event) {
            this.visible = false;
            this._winPanel.visible = false;
            this._failPanel.visible = false;
        };
        return ResultView;
    }(egret.DisplayObjectContainer));
    game.ResultView = ResultView;
    __reflect(ResultView.prototype, "game.ResultView");
})(game || (game = {}));
//# sourceMappingURL=ResultView.js.map