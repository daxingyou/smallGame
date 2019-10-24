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
/**材料 */
var AdventureItem = (function (_super) {
    __extends(AdventureItem, _super);
    function AdventureItem() {
        var _this = _super.call(this) || this;
        _this.vis = true;
        _this.init();
        return _this;
    }
    AdventureItem.prototype.init = function () {
        var num = Math.random() * 100;
        if (num < 10) {
            this.id = 10016;
        }
        else if (num < 95) {
            this.id = Math.floor(Math.random() * 9 + 10000);
        }
        else if (num < 100) {
            this.id = Math.floor(Math.random() * 3 + 10009);
        }
        this.img = new egret.Bitmap(RES.getRes(this.id + "_png"));
        this.addChild(this.img);
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    AdventureItem.prototype.effect = function () {
        egret.Tween.get(this)
            .to({ alpha: 0 }, 100)
            .call(this.removeMySelf);
    };
    AdventureItem.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return AdventureItem;
}(egret.Sprite));
__reflect(AdventureItem.prototype, "AdventureItem");
//# sourceMappingURL=AdventureItem.js.map