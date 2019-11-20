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
    function CardItem(type, id) {
        var _this = _super.call(this) || this;
        _this.skinName = "CardItemSkin";
        _this._type = type;
        _this._id = id;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        return _this;
    }
    CardItem.prototype.add_view_handler = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.add_view_handler, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.init();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    CardItem.prototype.remove_view_handler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    CardItem.prototype.init = function () {
        var cfg = GlobalFun.getCardsFromType(this._type, false)[this._id];
        this.icon_img.source = "" + cfg.cardModel;
        switch (this._type) {
            case CardType.general:
                this.skill_group.visible = false;
                this.level_label.text = "\u7B49\u7EA7\uFF1A" + cfg.level;
                this.city_img.source = "city_" + cfg.city + "_png";
                this.own_label.text = "\u788E\u7247\uFF1A" + cfg.ownNum + "/" + cfg.upgradeNum;
                this.hp_label.text = "\u751F\u547D\uFF1A" + cfg.hp;
                this.atk_label.text = "\u653B\u51FB\uFF1A" + cfg.atk;
                break;
            case CardType.special_skill:
                this.info_group.visible = false;
                this.skill_group.visible = true;
                this.num_label.text = "\u6570\u91CF\uFF1A" + cfg.ownNum;
                this.jieshao_label.text = "" + cfg.name;
                this.quality_img.texture = RES.getRes("quality_" + cfg.quality + "_png");
                break;
            case CardType.build:
                this.skill_group.visible = false;
                this.city_img.visible = false;
                this.level_group.horizontalCenter = 0;
                this.level_label.text = "\u7B49\u7EA7\uFF1A" + cfg.level;
                this.own_label.text = "\u788E\u7247\uFF1A" + cfg.ownNum + "/" + cfg.upgradeNum;
                this.hp_label.text = "\u751F\u547D\uFF1A" + cfg.hp;
                this.atk_label.text = "\u653B\u51FB\uFF1A" + cfg.atk;
                break;
        }
    };
    CardItem.prototype.touchTapHandler = function () {
        MessageManager.inst().dispatch(CustomEvt.TOUCH_CARD, { type: this._type, id: this._id });
    };
    return CardItem;
}(BaseView));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map