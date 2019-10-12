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
    var TileController = (function (_super) {
        __extends(TileController, _super);
        function TileController(root) {
            var _this = _super.call(this) || this;
            _this._isRegister = false;
            _this._enabled = false;
            _this._root = root;
            return _this;
        }
        TileController.prototype.register = function () {
            // if(!egret.Browser.getInstance().isMobile)
            // {
            //     if(!this._isRegister)
            //     {
            //         this._isRegister = true;
            //         var self = this;
            //         document.addEventListener("keydown", function(event:KeyboardEvent){
            //             switch(event.keyCode)
            //             {
            //                 case 38:
            //                     self.dispatchMove(0);
            //                     break;
            //                 case 39:
            //                     self.dispatchMove(1);
            //                     break;
            //                 case 40:
            //                     self.dispatchMove(2);
            //                     break;
            //                 case 37:
            //                     self.dispatchMove(3);
            //                     break;
            //             }
            //         });
            //     }
            // }
            // else
            // {
            this._root.touchEnabled = true;
            this._root.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            // }
            this._enabled = true;
        };
        TileController.prototype.touchBeginHandler = function (event) {
            this._root.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_touchMoveHandler, this);
            this._root.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this._root.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_touchEndHandler, this);
            this._downPoint = this._root.globalToLocal(event.stageX, event.stageY);
        };
        TileController.prototype.stage_touchMoveHandler = function (event) {
            if (this._movePoint == null) {
                this._movePoint = new egret.Point();
            }
            this._movePoint.x = event.stageX;
            this._movePoint.y = event.stageY;
        };
        TileController.prototype.stage_touchEndHandler = function (event) {
            this._root.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_touchMoveHandler, this);
            this._root.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this._root.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_touchEndHandler, this);
            this.updateWhenMouseUp();
        };
        TileController.prototype.updateWhenMouseUp = function () {
            if (!this._movePoint) {
                return;
            }
            var p = this._root.globalToLocal(this._movePoint.x, this._movePoint.y);
            var offSetX = p.x - this._downPoint.x;
            var offSetY = p.y - this._downPoint.y;
            if (offSetY < 0 && Math.abs(offSetY) > Math.abs(offSetX)) {
                this.dispatchMove(0);
            }
            else if (offSetX > 0 && offSetX > Math.abs(offSetY)) {
                this.dispatchMove(1);
            }
            else if (offSetY > 0 && offSetY > Math.abs(offSetX)) {
                this.dispatchMove(2);
            }
            else if (offSetX < 0 && Math.abs(offSetX) > Math.abs(offSetY)) {
                this.dispatchMove(3);
            }
        };
        TileController.prototype.dispatchMove = function (direction) {
            if (this._enabled) {
                this.dispatchEventWith(game.TileController.MOVE, false, direction);
            }
        };
        TileController.prototype.unregister = function () {
            // if(egret.Browser.getInstance().isMobile)
            // {
            // }
            this._root.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this._enabled = false;
        };
        /**
         * 移动事件.
         */
        TileController.MOVE = "move";
        return TileController;
    }(egret.EventDispatcher));
    game.TileController = TileController;
    __reflect(TileController.prototype, "game.TileController");
})(game || (game = {}));
//# sourceMappingURL=TileController.js.map