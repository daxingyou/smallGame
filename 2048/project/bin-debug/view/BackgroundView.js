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
    var BackgroundView = (function (_super) {
        __extends(BackgroundView, _super);
        // private _scoreLabel:egret.TextField;
        // private _addScoreLabel:egret.TextField;
        function BackgroundView(root, sheet) {
            var _this = _super.call(this) || this;
            _this._root = root;
            _this._sheet = sheet;
            _this.createBG();
            _this.createScoreLabel();
            game.GameDispatcher.getInstance().addEventListener(game.Message.GAME_RESTART, _this.gameRestartHandler, _this);
            game.GameDispatcher.getInstance().addEventListener(game.Message.SCORE_UPDATE, _this.scoreUpdateHandler, _this);
            return _this;
        }
        BackgroundView.prototype.createBG = function () {
            var sw = this._root.stage.stageWidth;
            var sh = this._root.stage.stageHeight;
            // var bitmap:eui.Image 
            // bitmap.source = "menu"
            // bitmap.x = (sw - bitmap.width) / 2;
            // this.addChild(bitmap);
            var bitmap = new eui.Image();
            bitmap.width = (game.Config.TILE_GAP + game.Config.TILE_WIDTH) * game.Config.TILE_COLUMN + game.Config.TILE_GAP;
            bitmap.height = (game.Config.TILE_GAP + game.Config.TILE_HEIGHT) * game.Config.TILE_ROW + game.Config.TILE_GAP;
            bitmap.scale9Grid = new egret.Rectangle(35, 35, 30, 30);
            // bitmap.source = "background"
            bitmap.x = (sw - bitmap.width) / 2;
            bitmap.y = 50;
            this.addChild(bitmap);
            game.Util.tileRect = new egret.Rectangle(bitmap.x, bitmap.y, bitmap.width, bitmap.height);
            var contentX = bitmap.x + game.Config.TILE_GAP;
            var contentY = bitmap.y + game.Config.TILE_GAP;
            for (var i = 0; i < game.Config.TILE_COLUMN; i++) {
                for (var j = 0; j < game.Config.TILE_ROW; j++) {
                    var bitmap_1 = new eui.Image();
                    bitmap_1.x = contentX + (game.Config.TILE_GAP + game.Config.TILE_WIDTH) * i;
                    bitmap_1.y = contentY + (game.Config.TILE_GAP + game.Config.TILE_HEIGHT) * j;
                    bitmap_1.width = game.Config.TILE_WIDTH;
                    bitmap_1.height = game.Config.TILE_HEIGHT;
                    bitmap_1.source = "backtile";
                    this.addChild(bitmap_1);
                }
            }
        };
        BackgroundView.prototype.createScoreLabel = function () {
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
        };
        BackgroundView.prototype.gameRestartHandler = function (event) {
            this._score = 0;
            MessageManager.inst().dispatch("reset");
            // this._scoreLabel.text = this._score.toString();
        };
        BackgroundView.prototype.scoreUpdateHandler = function (event) {
            var data = event.data;
            var addScore = data["addScore"];
            this._score += addScore;
            MessageManager.inst().dispatch("refresh", { score: this._score });
            // this._scoreLabel.text = this._score.toString();
            this.playAddScoreEffect(addScore);
        };
        BackgroundView.prototype.playAddScoreEffect = function (addScore) {
            // this._addScoreLabel.visible = true;
            // this._addScoreLabel.text = "+".concat(addScore.toString());
            // egret.Tween.removeTweens(this._addScoreLabel);
            // this._addScoreLabel.y = 38;
            // egret.Tween.get(this._addScoreLabel).to({y:0}, 300).call(this.playCompleteHandler, this);
        };
        BackgroundView.prototype.playCompleteHandler = function () {
            // this._addScoreLabel.visible = false;
        };
        return BackgroundView;
    }(egret.DisplayObjectContainer));
    game.BackgroundView = BackgroundView;
    __reflect(BackgroundView.prototype, "game.BackgroundView");
})(game || (game = {}));
//# sourceMappingURL=BackgroundView.js.map