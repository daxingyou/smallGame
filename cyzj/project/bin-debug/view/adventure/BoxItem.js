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
var BoxItem = (function (_super) {
    __extends(BoxItem, _super);
    function BoxItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "BoxItemSkin";
        return _this;
    }
    BoxItem.prototype.dataChanged = function () {
        this.img.source = this.data.img + "_png";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
    };
    BoxItem.prototype.touchTap = function () {
        MessageManager.inst().dispatch("BOX_PICKUP", this.data);
        if (this.data.img == 10012) {
            GlobalFun.addSuiPian(0, 1);
        }
        else if (this.data.img == 10013) {
            GlobalFun.addSuiPian(1, 1);
        }
        else if (this.data.img == 10014) {
            GlobalFun.addSuiPian(2, 1);
        }
        else if (this.data.img == 10015) {
            GlobalFun.addSuiPian(3, 1);
        }
        GlobalFun.addItemToBag(this.data.img, 1);
        GameConfig.setAdventure(this.data.img);
    };
    return BoxItem;
}(eui.ItemRenderer));
__reflect(BoxItem.prototype, "BoxItem");
//# sourceMappingURL=BoxItem.js.map