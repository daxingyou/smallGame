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
 * Created by wizardc on 2014/7/30.
 */
var game;
(function (game) {
    var GameDispatcher = (function (_super) {
        __extends(GameDispatcher, _super);
        function GameDispatcher() {
            return _super.call(this) || this;
        }
        GameDispatcher.getInstance = function () {
            if (this._instance == null) {
                this._instance = new GameDispatcher();
            }
            return this._instance;
        };
        return GameDispatcher;
    }(egret.EventDispatcher));
    game.GameDispatcher = GameDispatcher;
    __reflect(GameDispatcher.prototype, "game.GameDispatcher");
})(game || (game = {}));
//# sourceMappingURL=GameDispatcher.js.map