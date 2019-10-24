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
    CardItem.prototype.initData = function (data, scale) {
        this.touchChildren = false;
        this.touchEnabled = true;
        this.cardProBar.mask = this.cardMask;
        this.cardMask.width = 0;
        var cardData = data;
        this.cardVo = cardData;
        this.scaleX = this.scaleY = scale;
        if (data.ifUnlock) {
            this.cardImg.source = "card_" + cardData.id + "_png";
        }
        else {
            this.cardImg.source = "card_" + cardData.id + "_grey_png";
        }
        this.nameLab.text = cardData.name;
        this.nameLab.textColor = cardData.qualityColor;
        this.levelLab.text = cardData.level.toString();
        this.progressLab.text = cardData.ownNum + "/" + cardData.level * 100;
        this.cardMask.width = cardData.ownNum / (cardData.level * 100) * 177;
    };
    CardItem.prototype.dataChanged = function () {
        this.initData(this.data, 0.6);
    };
    return CardItem;
}(eui.ItemRenderer));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map