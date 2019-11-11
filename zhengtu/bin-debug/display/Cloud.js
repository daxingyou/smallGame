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
var Cloud = (function (_super) {
    __extends(Cloud, _super);
    function Cloud() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    // protected childrenCreated():void{
    // }
    Cloud.prototype.update = function () {
        this.x += this.speedX;
        if (this.x >= StageUtils.inst().getWidth() + this.width + 20) {
            this.x = -this.width - 20;
            this.reset();
        }
    };
    Cloud.prototype.init = function () {
        this.touchEnabled = false;
        this.img = new egret.Bitmap(RES.getRes("cloud_png"));
        this.addChild(this.img);
        this.x = Math.random() * StageUtils.inst().getWidth() + this.width / 2;
        this.reset();
    };
    Cloud.prototype.reset = function () {
        this.y = Math.random() * StageUtils.inst().getHeight();
        this.scaleX = this.scaleY = Math.random() * 0.5 + 0.6;
        // this.alpha = Math.random()*0.6 + 0.5;
        this.speedX = Math.random() * 1 + 1;
    };
    return Cloud;
}(egret.Sprite));
__reflect(Cloud.prototype, "Cloud");
//# sourceMappingURL=Cloud.js.map