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
var DrawCircle = (function (_super) {
    __extends(DrawCircle, _super);
    function DrawCircle() {
        var _this = _super.call(this) || this;
        _this.angle = -75;
        return _this;
    }
    DrawCircle.prototype.childrenCreated = function () {
        var circle = new eui.Image("circle_png");
        this.addChild(circle);
        circle.anchorOffsetX = circle.width >> 1;
        circle.anchorOffsetY = circle.height >> 1;
        this.shape = new egret.Shape();
        this.addChild(this.shape);
        circle.mask = this.shape;
        egret.startTick(this.timeUp, this);
    };
    DrawCircle.prototype.timeUp = function () {
        this.changeGraphics();
        this.angle += 12;
        if (this.angle >= 270) {
            this.angle = this.angle % 270;
            egret.stopTick(this.timeUp, this);
            this.removeChild(this.shape);
            this.shape = null;
            this.angle = -75;
        }
        return false;
    };
    DrawCircle.prototype.changeGraphics = function () {
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xf7f7f7, 1);
        this.shape.graphics.moveTo(0, 0);
        this.shape.graphics.lineTo(65, 0);
        this.shape.graphics.drawArc(0, 0, 65, -75 * Math.PI / 180, this.angle * Math.PI / 180, false);
        this.shape.graphics.lineTo(0, 0);
        this.shape.graphics.endFill();
    };
    return DrawCircle;
}(eui.Component));
__reflect(DrawCircle.prototype, "DrawCircle");
//# sourceMappingURL=DrawCircle.js.map