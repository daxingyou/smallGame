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
var GameCardItem = (function (_super) {
    __extends(GameCardItem, _super);
    function GameCardItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameCardItemSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
        return _this;
    }
    GameCardItem.prototype.dataChanged = function () {
        this.icon_img.source = "" + this.data.cardModel;
        this.quality_img.source = "quality_" + this.data.quality + "_png";
        switch (this.data.type) {
            case CardType.general:
                this.skill_group.visible = false;
                this.info_group.visible = true;
                this.level_label.text = "\u7B49\u7EA7\uFF1A" + this.data.level;
                this.city_img.source = "city_" + this.data.city + "_png";
                this.own_label.text = "\u788E\u7247\uFF1A" + this.data.ownNum + "/" + this.data.upgradeNum;
                this.hp_label.text = "\u751F\u547D\uFF1A" + this.data.hp;
                this.atk_label.text = "\u653B\u51FB\uFF1A" + this.data.atk;
                break;
            case CardType.special_skill:
                this.skill_group.visible = true;
                this.info_group.visible = false;
                this.num_label.text = "\u6570\u91CF\uFF1A" + this.data.ownNum;
                break;
            case CardType.build:
                this.skill_group.visible = false;
                this.info_group.visible = true;
                this.city_img.visible = false;
                this.level_group.horizontalCenter = 0;
                this.level_label.text = "\u7B49\u7EA7\uFF1A" + this.data.level;
                this.own_label.text = "\u788E\u7247\uFF1A" + this.data.ownNum + "/" + this.data.upgradeNum;
                this.hp_label.text = "\u751F\u547D\uFF1A" + this.data.hp;
                this.atk_label.text = "\u653B\u51FB\uFF1A" + this.data.atk;
                break;
        }
        this.scaleX = this.scaleY = 0.7;
    };
    GameCardItem.prototype.touchBegin = function (evt) {
        if (this.data.type == CardType.general) {
            if (GameCfg.gameStart) {
                UserTips.inst().showTips("对战进行中无法选择武将");
                return;
            }
            MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, { card: this.data.insId, x: evt.stageX, y: evt.stageY });
        }
        else if (this.data.type == CardType.build) {
            if (GameCfg.gameStart) {
                UserTips.inst().showTips("对战进行中无法选择");
                return;
            }
            MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_BUILD, { card: this.data.insId, x: evt.stageX, y: evt.stageY });
        }
        else {
            MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_SKILL, { card: this.data, x: evt.stageX, y: evt.stageY });
        }
    };
    return GameCardItem;
}(eui.ItemRenderer));
__reflect(GameCardItem.prototype, "GameCardItem");
//# sourceMappingURL=GameCardItem.js.map