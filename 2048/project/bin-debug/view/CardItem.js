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
var CardItem = (function (_super) {
    __extends(CardItem, _super);
    function CardItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "CardItemSkin";
        return _this;
    }
    CardItem.prototype.dataChanged = function () {
        this.icon.source = "number" + (this.itemIndex + 1);
    };
    return CardItem;
}(eui.ItemRenderer));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map