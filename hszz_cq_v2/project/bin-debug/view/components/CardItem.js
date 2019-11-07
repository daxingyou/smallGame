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
        _this.attr = "";
        _this.skinName = "CardItemSkin";
        return _this;
    }
    CardItem.prototype.initData = function (data, scale, isNoData) {
        if (isNoData === void 0) { isNoData = false; }
        this.touchChildren = false;
        this.touchEnabled = true;
        if (!data) {
            this.cardImg.source = "noCard_png";
            this.nameLab.text = "";
            this.levelLab.text = "";
            return;
        }
        var eff = new MovieClip();
        this.addChild(eff);
        eff.playFile(EFFECT + "star", -1);
        eff.width = this.width;
        eff.height = this.height;
        eff.x = 70;
        eff.y = 50;
        var eff2 = new MovieClip();
        this.addChild(eff2);
        eff2.playFile(EFFECT + "star", -1);
        eff2.width = this.width;
        eff2.height = this.height;
        eff2.x = 70;
        eff2.y = 400;
        var eff3 = new MovieClip();
        this.addChild(eff3);
        eff3.playFile(EFFECT + "star", -1);
        eff3.width = this.width;
        eff3.height = this.height;
        eff3.x = 70;
        eff3.y = 200;
        // this.cardProBar.mask = this.cardMask;
        // this.cardMask.width = 0;
        var cardData = data;
        this.cardVo = cardData;
        this.scaleX = this.scaleY = scale;
        if (data.ifUnlock) {
            this.cardImg.source = "card_" + cardData.cardId + "_" + cardData.quality + "_png";
            // let qualityMc:MovieClip = new MovieClip();
            // this.cardGroup.addChild(qualityMc);
            // qualityMc.touchEnabled = false;
            // qualityMc.scaleY = 1.3;
            // qualityMc.scaleX = 1.5;
            // qualityMc.x = (this.cardGroup.width>>1) ;
            // qualityMc.y = (this.cardGroup.height>>1) - 20;
            // qualityMc.playFile(`${EFFECT}quality_${data.quality}`,-1);
            GlobalFun.clearFilters(this.cardImg);
        }
        else {
            // this.cardImg.source = `card_${cardData.cardId}_grey_png`;
            GlobalFun.filterToGrey(this.cardImg);
        }
        this.nameLab.text = cardData.name;
        this.nameLab.textColor = cardData.qualityColor;
        if (scale == 0.25) {
            this.levelLab.scaleX = this.levelLab.scaleY = 3;
        }
        this.levelLab.text = "数量:" + cardData.ownNum.toString();
        // this.progressLab.text = cardData.ownNum + "/" + 5;
        // this.cardMask.width = cardData.ownNum/(5)*177;
    };
    CardItem.prototype.dataChanged = function () {
        this.initData(this.data, 0.25);
    };
    return CardItem;
}(eui.ItemRenderer));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map