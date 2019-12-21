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
var GameCard = (function (_super) {
    __extends(GameCard, _super);
    function GameCard(_type, _id) {
        var _this = _super.call(this) || this;
        _this.move = true;
        _this.skinName = "GameCardItemSkin";
        _this.id = _id;
        _this.type = _type;
        _this.init();
        MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, _this.removeMove, _this);
        return _this;
    }
    GameCard.prototype.init = function () {
        this.scaleX = this.scaleY = 0.7;
        var cfg = GlobalFun.getCardsFromType(this.type, false);
        var cfg_0;
        for (var i = 0; i < cfg.length; i++) {
            if (cfg[i].insId == this.id) {
                cfg_0 = cfg[i];
            }
        }
        this.icon_img.source = "" + cfg_0.cardModel;
        this.quality_img.source = "quality_" + cfg_0.quality + "_png";
        switch (this.type) {
            case CardType.general:
                this.skill_group.visible = false;
                this.info_group.visible = true;
                this.level_label.text = "Grade\uFF1A" + cfg_0.level;
                this.city_img.source = "city_" + cfg_0.city + "_png";
                this.own_label.text = "Fragment\uFF1A" + cfg_0.ownNum + "/" + cfg_0.upgradeNum;
                this.hp_label.text = "life\uFF1A" + cfg_0.hp;
                this.atk_label.text = "attack\uFF1A" + cfg_0.atk;
                break;
            case CardType.special_skill:
                this.info_group.visible = false;
                this.skill_group.visible = true;
                this.num_label.text = "Number\uFF1A" + cfg_0.ownNum;
                break;
            case CardType.build:
                this.skill_group.visible = false;
                this.info_group.visible = true;
                this.city_img.visible = false;
                this.level_group.horizontalCenter = 0;
                this.level_label.text = "Grade\uFF1A" + cfg_0.level;
                this.own_label.text = "Fragment\uFF1A" + cfg_0.ownNum + "/" + cfg_0.upgradeNum;
                this.hp_label.text = "life\uFF1A" + cfg_0.hp;
                this.atk_label.text = "attack\uFF1A" + cfg_0.atk;
                break;
        }
    };
    GameCard.prototype.removeMove = function () {
        if (this.move) {
            this.removeMySelf();
        }
    };
    GameCard.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return GameCard;
}(BaseView));
__reflect(GameCard.prototype, "GameCard");
//# sourceMappingURL=GameCard.js.map