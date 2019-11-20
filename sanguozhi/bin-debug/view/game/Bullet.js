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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(my_x, my_y, x, y, id, _img) {
        var _this = _super.call(this) || this;
        _this._id = 0;
        _this.pos = {
            x: 0,
            y: 0
        };
        _this.lastPos = {
            x: 0,
            y: 0
        };
        _this.pos.x = x;
        _this.pos.y = y;
        _this.x = my_x;
        _this.y = my_y;
        _this.lastPos.x = my_x;
        _this.lastPos.y = my_y;
        _this._id = id;
        _this._img = _img;
        _this.init();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_START, _this.gameStart, _this);
        MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, _this.gamePause, _this);
        return _this;
    }
    Bullet.prototype.gameStart = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        egret.Tween.resumeTweens(this.img);
        egret.Tween.resumeTweens(this);
    };
    Bullet.prototype.gamePause = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        egret.Tween.pauseTweens(this.img);
        egret.Tween.pauseTweens(this);
    };
    Bullet.prototype.add_view_handler = function () {
    };
    Bullet.prototype.init = function () {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes(this._img);
        this.img.anchorOffsetX = this.width / 2;
        this.img.anchorOffsetY = this.width / 2;
        this.img.rotation = 60;
        this.addChild(this.img);
        if (this._id == 3) {
            this.img.texture = RES.getRes("game_stone_png");
            this.img.anchorOffsetX = this.width / 2;
            this.img.anchorOffsetY = this.width / 2;
        }
        var t = Math.floor(Math.random() * 300);
        egret.Tween.get(this)
            .to({ x: this.pos.x, y: this.pos.y }, 700 + t)
            .call(this.removeMyself);
        egret.Tween.get(this.img)
            .to({ y: -150 }, 350 + t / 2, egret.Ease.sineOut)
            .to({ y: 0 }, 350 + t / 2, egret.Ease.sineIn);
        this.visible = false;
    };
    Bullet.prototype.update = function () {
        this.img.rotation = Compute.instance.Direction({ x: this.x, y: this.y + this.img.y }, this.lastPos);
        this.lastPos.x = this.x;
        this.lastPos.y = this.y + this.img.y;
        this.visible = true;
    };
    Bullet.prototype.removeMyself = function () {
        // Message.instance.send( MsgCMD.EXPLODE , this );
        if (this.parent && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return Bullet;
}(egret.Sprite));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map