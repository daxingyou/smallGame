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
 * Materials need to be loaded in advance
 * Material naming rules：type_numerical value（There are types because there are usually several digital pictures at the same time，Such as size or different colors）
 * Point material naming：type_dot
 * EstablishBitmapNumberUsecreateNumPicReturnDisplayObjectContainer
 * CreatedBitmapNumberThe value needs to change is calledchangeNum
 * RecyclingdesstroyNumPic
 *
 * Created by Saco on 2014/8/1.
 */
var BitmapNumber = (function (_super) {
    __extends(BitmapNumber, _super);
    function BitmapNumber() {
        var _this = _super.call(this) || this;
        _this._imgPool = [];
        _this._containerPool = [];
        return _this;
    }
    /*
     * Returns a number and type as neededDisplayObjectContainer
     * numNumeric value，Decimal point support
     * typeMaterial type
     * */
    BitmapNumber.prototype.createNumPic = function (num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var container = this.getContainer();
        var numStr = num.toString();
        var index = 0;
        var tempBm;
        for (index; index < numStr.length; index++) {
            tempBm = this.getSingleNumPic(numStr.charAt(index), type);
            container.addChild(tempBm);
        }
        this.repositionNumPic(container, offset, offsetY);
        return container;
    };
    //Recycle digitalDisplayObjectContainer
    BitmapNumber.prototype.desstroyNumPic = function (picContainer) {
        this.clearContainer(picContainer);
        if (picContainer.parent)
            picContainer.parent.removeChild(picContainer);
        this._containerPool.push(picContainer);
    };
    /*
     * Change with numbersDisplayObjectContainerNumeric value
     * This method is provided to improve efficiency，Directly replace thetexture，Avoid redundant deletion and creation
     * */
    BitmapNumber.prototype.changeNum = function (picContainer, num, type, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var numStr = num.toString();
        if (!picContainer) {
            return;
        }
        //If the current number of digits is more than the target number, the redundant ones will be recycled
        if (picContainer.numChildren > numStr.length) {
            while (picContainer.numChildren > numStr.length) {
                this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1));
            }
        }
        var index = 0;
        var tempStr;
        for (index; index < numStr.length; index++) {
            //If the currentBitmapGet new if the quantity is not enoughBitmapMake up
            if (index >= picContainer.numChildren)
                picContainer.addChild(this.getBitmap());
            tempStr = numStr.charAt(index);
            tempStr = tempStr == "." ? "dot" : tempStr;
            picContainer.getChildAt(index).texture = this.getTexture(tempStr, type);
        }
        this.repositionNumPic(picContainer, offset, offsetY);
    };
    //The width of each number is different，So rearrange it
    BitmapNumber.prototype.repositionNumPic = function (container, offset, offsetY) {
        if (offset === void 0) { offset = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var index = 0;
        var lastX = 0;
        var temp;
        for (index; index < container.numChildren; index++) {
            temp = container.getChildAt(index);
            temp.x = lastX - offset;
            // temp.y = - offsetY;
            lastX = temp.x + temp.width;
        }
    };
    //Cleaning container
    BitmapNumber.prototype.clearContainer = function (picContainer) {
        while (picContainer.numChildren) {
            this.recycleBM(picContainer.getChildAt(picContainer.numChildren - 1));
        }
    };
    //recoveryBitmap
    BitmapNumber.prototype.recycleBM = function (bm) {
        if (bm && bm.parent) {
            bm.parent.removeChild(bm);
            bm.texture = null;
            this._imgPool.push(bm);
        }
    };
    BitmapNumber.prototype.getContainer = function () {
        if (this._containerPool.length)
            return this._containerPool.shift();
        return new egret.DisplayObjectContainer();
    };
    //Get a single numberBitmap
    BitmapNumber.prototype.getSingleNumPic = function (num, type) {
        if (num == ".")
            num = "dot";
        var bm = this.getBitmap();
        bm.texture = this.getTexture(num, type);
        return bm;
    };
    BitmapNumber.prototype.getTexture = function (num, type) {
        return RES.getRes(type + num + "_png");
    };
    BitmapNumber.prototype.getBitmap = function () {
        if (this._imgPool.length)
            return this._imgPool.shift();
        return new egret.Bitmap();
    };
    return BitmapNumber;
}(BaseClass));
__reflect(BitmapNumber.prototype, "BitmapNumber");
//# sourceMappingURL=BitmapNumber.js.map