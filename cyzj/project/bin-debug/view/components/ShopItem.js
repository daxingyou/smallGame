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
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopItemSkin";
        return _this;
    }
    ShopItem.prototype.childrenCreated = function () {
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShopItem.prototype.onTouchTap = function () {
        if (GameApp.roleGold < this.cost) {
            UserTips.inst().showTips("金币不足");
            return;
        }
        GameApp.roleGold -= this.cost;
        GlobalFun.addItemToBag(this.itemId, this.costNum);
        var itemInfo = ItemCfg.itemCfg[this.itemId];
        UserTips.inst().showTips("恭喜获得" + ("<font color=0x00ff00>" + itemInfo.name + "</font>") + "x" + this.costNum);
    };
    ShopItem.prototype.dataChanged = function () {
        this.icon.source = this.data.icon;
        this.nameLab.text = this.data.name;
        this.numLab.text = this.data.num;
        this.costLab.text = this.data.cost;
        this.itemId = this.data.id;
        this.cost = this.data.cost;
        this.costNum = this.data.num;
    };
    ShopItem.prototype.dispose = function () {
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map