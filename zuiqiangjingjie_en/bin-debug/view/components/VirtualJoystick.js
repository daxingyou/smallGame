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
 * Virtual rocker
 * @author chenkai
 * @since 2017/5/4
 */
var VirtualJoystick = (function (_super) {
    __extends(VirtualJoystick, _super);
    function VirtualJoystick() {
        var _this = _super.call(this) || this;
        _this.circleRadius = 0; //Radius of circle
        _this.ballRadius = 0; //Ball radius
        _this.centerX = 0; //Center point coordinates
        _this.centerY = 0;
        //Touch Mobile，Set the position of the ball
        _this.p1 = new egret.Point();
        _this.p2 = new egret.Point();
        _this.skinName = "VirtualJoystickSkin";
        return _this;
    }
    VirtualJoystick.prototype.childrenCreated = function () {
        //Get circle and sphere radius
        this.circle.width = this.circle.height = 141;
        this.ball.width = this.ball.height = 42;
        this.circleRadius = this.circle.height / 2;
        this.ballRadius = this.ball.height / 2;
        //Get center point
        this.centerX = this.circleRadius;
        this.centerY = this.circleRadius;
        //Setting anchor points
        this.ball.anchorOffsetX = this.ballRadius;
        this.ball.anchorOffsetY = this.ballRadius;
        //Set the ball's initial position
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
    };
    //Start virtual rocker 
    VirtualJoystick.prototype.start = function () {
        this.ball.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        StageUtils.inst().getStage().addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    //Stop virtual rocker
    VirtualJoystick.prototype.stop = function () {
        this.ball.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        StageUtils.inst().getStage().removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    //Touch start，Show virtual rocker
    VirtualJoystick.prototype.onTouchBegin = function (e) {
        // if(this.parent){
        // 	return;
        // }
        this.touchID = e.touchPointID;
        this.x = e.stageX;
        this.y = e.stageY;
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        // GameConst.stage.addChild(this);
        this.dispatchEvent(new VJEvent(VJEvent.VJ_START));
    };
    //End of touch，Hide virtual rocker
    VirtualJoystick.prototype.onTouchEnd = function (e) {
        if (this.touchID != e.touchPointID) {
            return;
        }
        this.touchID = null;
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
        // this.hide();
        this.dispatchEvent(new VJEvent(VJEvent.VJ_END));
    };
    VirtualJoystick.prototype.onTouchMove = function (e) {
        if (this.touchID != e.touchPointID) {
            return;
        }
        var stageP = this.localToGlobal(this.centerX, this.centerY);
        //Get the distance between finger and virtual rocker
        // this.p1.x = this.x;
        // this.p1.y = this.y;
        this.p2.x = e.stageX;
        this.p2.y = e.stageY;
        var dist = egret.Point.distance(stageP, this.p2);
        var angle = Math.atan2(e.stageY - stageP.y, e.stageX - stageP.x);
        //Finger distance within the circle
        if (dist <= (this.circleRadius - this.ballRadius)) {
            var point = this.globalToLocal(e.stageX, e.stageY);
            // this.ball.x = this.centerX + e.stageX - this.x;
            // this.ball.y = this.centerY + e.stageY - this.y;
            this.ball.x = point.x;
            this.ball.y = point.y;
            //Finger distance outside the circle
        }
        else {
            this.ball.x = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
            this.ball.y = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
        }
        //Distribution events
        this.dispatchEvent(new VJEvent(VJEvent.VJ_MOVE, false, angle));
    };
    VirtualJoystick.prototype.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return VirtualJoystick;
}(eui.Component));
__reflect(VirtualJoystick.prototype, "VirtualJoystick");
//# sourceMappingURL=VirtualJoystick.js.map