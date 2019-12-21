/**
 * Created by songyuyang
 */
module img
{
    export class GameUtil
    {
        /**Collision detection based on rectangle*/
        public static hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject):boolean
        {
            var rect1:egret.Rectangle = obj1.getBounds();
            var rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
        public static hitPoint(obj1:egret.DisplayObject,pos1:number,pos2:number):boolean
        {
            return obj1.hitTestPoint(pos1,pos2);
        }
    }

    /**
     * according tonameKeyword create aBitmapobject。nameProperties refer toresources/resource.jsonContent of profile。
     */
    export function createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

}