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
var OverItem = (function (_super) {
    __extends(OverItem, _super);
    function OverItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "OverItemSkin";
        _this.scaleX = _this.scaleY = 0.7;
        return _this;
    }
    OverItem.prototype.dataChanged = function () {
        this.card_img.source = "card_" + this.data.cardId + "_" + this.data.level + "_png";
        this.card_name.text = this.data.name;
        this.card_name.textColor = this.data.qualityColor;
        this.card_num.text = "数量:" + this.data.ownNum;
    };
    return OverItem;
}(eui.ItemRenderer));
__reflect(OverItem.prototype, "OverItem");
//# sourceMappingURL=OverItem.js.map