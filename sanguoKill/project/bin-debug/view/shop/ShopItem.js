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
        _this.addTouchEvent(_this, _this.touchTap);
        return _this;
    }
    ShopItem.prototype.setData = function (_data) {
        this.data = _data;
        this.card_img.source = this.data.instId + "_jpg";
        this.money.text = "售价 " + this.data.cost + "两";
        this.property_0.visible = true;
        this.property_1.visible = true;
        if (this.data.type == ItemType.weapon) {
            this.property_0.text = "攻击 +" + this.data.atk;
            this.property_1.text = "命中 +" + this.data.hit;
        }
        else if (this.data.type == ItemType.weapon_ma) {
            this.property_0.text = "攻击 +" + this.data.atk;
            this.property_1.text = "暴击 +" + this.data.crit;
        }
        else if (this.data.type == ItemType.protection) {
            this.property_0.text = "防御 +" + this.data.protect;
            this.property_1.text = "生命 +" + this.data.hp;
        }
        else if (this.data.type == ItemType.protection_ma) {
            this.property_0.text = "防御 +" + this.data.protect;
            this.property_1.text = "敏捷 +" + this.data.agile;
        }
        else if (this.data.type == ItemType.prop) {
            this.property_0.visible = false;
            this.property_1.visible = false;
        }
    };
    ShopItem.prototype.touchTap = function () {
        ViewManager.inst().open(ShopBuy, [this.data]);
    };
    return ShopItem;
}(BaseView));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map