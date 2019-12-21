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
        _this.soldier_name = [
            "Bowmen", "Infantry", "cavalry"
        ];
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
        if (cfg) {
            this._insid = cfg.insId;
        }
        switch (this._type) {
            case CardType.general:
                this.skill_group.visible = false;
                this.level_label.text = "Grade\uFF1A" + cfg.level;
                // this.city_img.source = `city_${cfg.city}_png`;
                // this.own_label.text = `Fragment：${cfg.ownNum}/${cfg.upgradeNum}`;
                this.hp_label.text = "life\uFF1A" + cfg.hp;
                this.atk_label.text = "attack\uFF1A" + cfg.atk;
                this.icon_img.source = "" + cfg.cardModel;
                break;
            case CardType.special_skill:
                this.info_group.visible = false;
                this.skill_group.visible = true;
                this.num_label.text = "Number\uFF1A" + cfg.ownNum;
                this.jieshao_label.text = "" + cfg.name;
                // this.quality_img.source = `quality_${cfg.quality}_png`;
                this.icon_img.source = "" + cfg.cardModel;
                break;
            case CardType.soldier:
                this.info_group.visible = false;
                this.skill_group.visible = true;
                // this.own_label.text = `Fragment：${cfg.ownNum}/${cfg.upgradeNum}`;
                this.jieshao_label.text = "Number:" + cfg.ownNum;
                this.icon_img.source = "" + cfg.cardModel;
                this.num_label.visible = false;
                break;
        }
    };
    Object.defineProperty(CardItem.prototype, "insId", {
        get: function () {
            return this._insid;
        },
        enumerable: true,
        configurable: true
    });
    CardItem.prototype.refreshGeneralData = function (id) {
        if (this.insId == id) {
            var cfg = GlobalFun.getCardsFromType(CardType.general, false)[this._id];
            this.skill_group.visible = false;
            this.level_label.text = "Grade\uFF1A" + cfg.level;
            // this.city_img.source = `city_${cfg.city}_png`;
            // this.own_label.text = `Fragment：${cfg.ownNum}/${cfg.upgradeNum}`;
            this.hp_label.text = "life\uFF1A" + cfg.hp;
            this.atk_label.text = "attack\uFF1A" + cfg.atk;
            this.icon_img.source = "" + cfg.cardModel;
        }
    };
    CardItem.prototype.touchTapHandler = function () {
        MessageManager.inst().dispatch(CustomEvt.TOUCH_CARD, { type: this._type, id: this._id, insid: this._insid });
    };
    return CardItem;
}(BaseView));
__reflect(CardItem.prototype, "CardItem");
//# sourceMappingURL=CardItem.js.map