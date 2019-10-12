/**
 * Created by wizardc on 2014/7/29.
 */
module game
{
    export class TileController extends egret.EventDispatcher
    {
        /**
         * 移动事件.
         */
        public static MOVE:string = "move";

        private _root:egret.DisplayObjectContainer;

        private _isRegister:boolean = false;
        private _enabled:boolean = false;

        private _downPoint:egret.Point;
        private _movePoint:egret.Point;

        public constructor(root:egret.DisplayObjectContainer)
        {
            super();
            this._root = root;
        }

        public register():void
        {
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
        }

        private touchBeginHandler(event:egret.TouchEvent):void
        {
            this._root.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_touchMoveHandler, this);
            this._root.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this._root.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_touchEndHandler, this);

            this._downPoint = this._root.globalToLocal(event.stageX, event.stageY);
        }

        private stage_touchMoveHandler(event:egret.TouchEvent):void
        {
            if(this._movePoint == null)
            {
                this._movePoint = new egret.Point();
            }
            this._movePoint.x = event.stageX;
            this._movePoint.y = event.stageY;
        }

        private stage_touchEndHandler(event:egret.Event):void
        {
            this._root.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_touchMoveHandler, this);
            this._root.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stage_touchEndHandler, this);
            this._root.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_touchEndHandler, this);

            this.updateWhenMouseUp();
        }

        private updateWhenMouseUp():void
        {
            if(!this._movePoint){
                return;
            }
            var p:egret.Point = this._root.globalToLocal(this._movePoint.x, this._movePoint.y);
            var offSetX:number = p.x - this._downPoint.x;
            var offSetY:number = p.y - this._downPoint.y;

            if(offSetY < 0 && Math.abs(offSetY) > Math.abs(offSetX))
            {
                this.dispatchMove(0);
            }
            else if(offSetX > 0 && offSetX > Math.abs(offSetY))
            {
                this.dispatchMove(1);
            }
            else if(offSetY > 0 && offSetY > Math.abs(offSetX))
            {
                this.dispatchMove(2);
            }
            else if(offSetX < 0 && Math.abs(offSetX) > Math.abs(offSetY))
            {
                this.dispatchMove(3);
            }
        }

        private dispatchMove(direction:number):void
        {
            if(this._enabled)
            {
                this.dispatchEventWith(game.TileController.MOVE, false, direction);
            }
        }

        public unregister():void
        {
            // if(egret.Browser.getInstance().isMobile)
            // {
                
            // }
            this._root.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this._enabled = false;
        }
    }
}
