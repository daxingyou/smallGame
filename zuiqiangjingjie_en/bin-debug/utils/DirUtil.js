var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Direction tool
 */
var DirUtil = (function () {
    function DirUtil() {
    }
    /**
     * adopt2spot，Obtain8Direction value
     * p1 starting point
     * p2 End point
     */
    DirUtil.get8DirBy2Point = function (p1, p2) {
        //Calculation direction
        var angle = MathUtils.getAngle(MathUtils.getRadian2(p1.x, p1.y, p2.x, p2.y));
        return this.angle2dir(angle);
    };
    /**
     * adopt2spot，Obtain4Direction value
     * p1 starting point
     * p2 End point
     */
    DirUtil.get4DirBy2Point = function (p1, p2) {
        return p1.x < p2.x ? (p1.y < p2.y ? 3 : 1) : (p1.y < p2.y ? 5 : 7);
    };
    /** Direction rotation angle */
    DirUtil.dir2angle = function (dir) {
        dir *= 45;
        dir -= 90;
        return dir;
    };
    /** Angle direction */
    DirUtil.angle2dir = function (angle) {
        if (angle < -90)
            angle += 360;
        return Math.round((angle + 90) / 45) % 8;
    };
    /** Negative direction */
    DirUtil.dirOpposit = function (dir) {
        // 7 == 3
        // 6 == 2
        // 5 == 1
        // 4 == 0
        return dir < 4 ? dir + 4 : dir - 4;
    };
    /** 8Direction change5Direction resource direction */
    DirUtil.get5DirBy8Dir = function (dir8) {
        return dir8 - this.isScaleX(dir8);
    };
    /** Whether the current direction needs to be flipped */
    DirUtil.isScaleX = function (dir8) {
        var td = 2 * (dir8 - 4);
        if (td < 0)
            td = 0;
        return td;
    };
    return DirUtil;
}());
__reflect(DirUtil.prototype, "DirUtil");
//# sourceMappingURL=DirUtil.js.map