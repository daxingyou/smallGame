/**
 * Created by wizardc on 2014/7/30.
 */
module game
{
    export class SimpleButton extends egret.Sprite
    {
        /**
         * 点击.
         */
        public static CLICK:string = "click";

        private _sheet:egret.SpriteSheet;

        private _upSkinName:string;
        private _downSkinName:string;

        private _bitmap:eui.Image;

        public constructor(sheet:egret.SpriteSheet, upSkinName:string, downSkinName?:string)
        {
            super();

            this.touchEnabled = true;
            this._sheet = sheet;
            this._upSkinName = upSkinName;
            if(downSkinName !== null && downSkinName !== undefined)
            {
                this._downSkinName = downSkinName;
            }
            else
            {
                this._downSkinName = this._upSkinName;
            }

            this._bitmap = new eui.Image();
            this._bitmap.source = this._upSkinName;
            this.addChild(this._bitmap);

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        }

        private touchBeginHandler(event:egret.TouchEvent):void
        {
            // this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.touchRollOutHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);

            this._bitmap.source = this._downSkinName
        }

        private touchRollOutHandler(event:egret.TouchEvent):void
        {
            // this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.touchRollOutHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);

            this._bitmap.source = this._upSkinName;
        }

        private touchEndHandler(event:egret.TouchEvent):void
        {
            // this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.touchRollOutHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);

            this._bitmap.source  = this._upSkinName
            this.dispatchEventWith(game.SimpleButton.CLICK, true);
        }
    }
}
