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
var PlayerCard = (function (_super) {
    __extends(PlayerCard, _super);
    function PlayerCard(_id) {
        var _this = _super.call(this) || this;
        _this.skinName = "PlayerCardSkin";
        _this.id = _id;
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, _this.removeMySelf, _this);
        return _this;
    }
    PlayerCard.prototype.init = function () {
        switch (this.id) {
            case 1:
                this.icon_img.source = "qb_png";
                break;
            case 2:
                this.icon_img.source = "gb_png";
                break;
            case 3:
                this.icon_img.source = "bb_png";
                break;
            default:
                var card = GlobalFun.getCardDataFromId(this.id);
                this.icon_img.source = card.cardModel;
                this.quality_img.source = "quality_" + card.quality + "_png";
                break;
        }
        this.scaleX = this.scaleY = 0.7;
    };
    PlayerCard.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return PlayerCard;
}(BaseView));
__reflect(PlayerCard.prototype, "PlayerCard");
//# sourceMappingURL=PlayerCard.js.map