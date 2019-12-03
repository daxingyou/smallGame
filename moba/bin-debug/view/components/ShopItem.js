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
        this.buyGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShopItem.prototype.dataChanged = function () {
        if (GameApp.selectIndex) {
            this.goldIcon.visible = false;
            this.cost.x = 20;
            this.cost.width = 150;
            this.cost.text = "¥ " + this.data.costNum;
            this.cardGroup.touchEnabled = true;
            this.cardGroup.touchChildren = true;
            this.cardGroup.touchThrough = true;
            GlobalFun.clearFilters(this.cardGroup);
        }
        else {
            this.goldIcon.visible = true;
            this.cost.x = 65;
            this.cost.width = 105;
            this.cost.text = this.data.costNum;
            if (GameApp.equipIds.indexOf(this.data.itemid) != -1) {
                this.cardGroup.touchEnabled = false;
                this.cardGroup.touchChildren = false;
                this.cardGroup.touchThrough = false;
                this.cost.text = "已购买";
                GlobalFun.filterToGrey(this.cardGroup);
            }
            else {
                this.cardGroup.touchEnabled = true;
                this.cardGroup.touchChildren = true;
                this.cardGroup.touchThrough = true;
                GlobalFun.clearFilters(this.cardGroup);
            }
        }
        this.singleCost = this.data.costNum;
        this.icon.source = this.data.icon;
        this.nameLab.text = this.data.name;
        this.descLab.text = this.data.desc;
    };
    ShopItem.prototype.onTouchTap = function (evt) {
        if (GameApp.selectIndex == 1) {
            //目前是充值
            recharge.sendToNativePhurse({ Key1: (this.singleCost * 10).toString() }, function (num) {
                GameApp.gold += parseInt(num);
            }, this);
        }
        else {
            //目前是商城
            if (this.singleCost > GameApp.gold) {
                UserTips.inst().showTips("元宝不足");
                return;
            }
            GameApp.gold -= this.singleCost;
            MessageManager.inst().dispatch("buyEquip", { id: this.data.itemid });
            //处理购买了装备以后的操作
            if (GameApp.equipIds.indexOf(this.data.itemid) != -1) {
                this.cardGroup.touchEnabled = false;
                this.cardGroup.touchChildren = false;
                this.cardGroup.touchThrough = false;
                this.cost.text = "已购买";
                GlobalFun.filterToGrey(this.cardGroup);
            }
            else {
                this.cardGroup.touchEnabled = true;
                this.cardGroup.touchChildren = true;
                this.cardGroup.touchThrough = true;
                GlobalFun.clearFilters(this.cardGroup);
            }
        }
    };
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map