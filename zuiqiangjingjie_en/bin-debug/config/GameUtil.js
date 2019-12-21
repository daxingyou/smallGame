var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by songyuyang
 */
var img;
(function (img) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        /**Collision detection based on rectangle*/
        GameUtil.hitTest = function (obj1, obj2) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        GameUtil.hitPoint = function (obj1, pos1, pos2) {
            return obj1.hitTestPoint(pos1, pos2);
        };
        return GameUtil;
    }());
    img.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "img.GameUtil");
    /**
     * according tonameKeyword create aBitmapobject。nameProperties refer toresources/resource.jsonContent of profile。
     */
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    img.createBitmapByName = createBitmapByName;
})(img || (img = {}));
//# sourceMappingURL=GameUtil.js.map