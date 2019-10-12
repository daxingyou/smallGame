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
    var SimpleButton = (function (_super) {
        __extends(SimpleButton, _super);
        function SimpleButton(sheet, upSkinName, downSkinName) {
            var _this = _super.call(this) || this;
            _this.touchEnabled = true;
            _this._sheet = sheet;
            _this._upSkinName = upSkinName;
            if (downSkinName !== null && downSkinName !== undefined) {
                _this._downSkinName = downSkinName;
            }
            else {
                _this._downSkinName = _this._upSkinName;
            }
            _this._bitmap = new eui.Image();
            _this._bitmap.source = _this._upSkinName;
            _this.addChild(_this._bitmap);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBeginHandler, _this);
            return _this;
        }
        SimpleButton.prototype.touchBeginHandler = function (event) {
            // this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.touchRollOutHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this._bitmap.source = this._downSkinName;
        };
        SimpleButton.prototype.touchRollOutHandler = function (event) {
            // this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.touchRollOutHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this._bitmap.source = this._upSkinName;
        };
        SimpleButton.prototype.touchEndHandler = function (event) {
            // this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.touchRollOutHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            this._bitmap.source = this._upSkinName;
            this.dispatchEventWith(game.SimpleButton.CLICK, true);
        };
        /**
         * 点击.
         */
        SimpleButton.CLICK = "click";
        return SimpleButton;
    }(egret.Sprite));
    game.SimpleButton = SimpleButton;
    __reflect(SimpleButton.prototype, "game.SimpleButton");
})(game || (game = {}));
//# sourceMappingURL=SimpleButton.js.map