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
var CardInfo = (function (_super) {
    __extends(CardInfo, _super);
    function CardInfo(type, id, insid) {
        var _this = _super.call(this) || this;
        _this.skinName = "CardInfoSkin";
        _this._type = type;
        _this._id = id;
        _this._insid = insid;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        return _this;
    }
    CardInfo.prototype.add_view_handler = function () {
        this.infoGroup["autoSize"]();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.add_view_handler, this);
        MessageManager.inst().addListener(LocalStorageEnum.CLOSE_CARDINFO, this.removeThis, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.init();
        this.addTouchEvent(this.close_img, this.touchTapHandler, true);
        this.addTouchEvent(this.upgrade_img, this.touchTapHandler, true);
    };
    CardInfo.prototype.remove_view_handler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.removeTouchEvent(this.close_img, this.touchTapHandler);
        this.removeTouchEvent(this.upgrade_img, this.touchTapHandler);
        MessageManager.inst().removeListener(LocalStorageEnum.CLOSE_CARDINFO, this.removeThis, this);
    };
    CardInfo.prototype.init = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.progress_img.mask = this.progress_mask;
        var cfg = GlobalFun.getCardsFromType(this._type, false)[this._id];
        // this.jieshao_label.text = `${cfg.jieshao}`;
        switch (this._type) {
            case CardType.special_skill:
                this.hp_label.text = "\u65E0";
                this.atk_label.text = "\u65E0";
                this.talent_label.text = "\u65E0";
                this.jieshao_label.textFlow = new egret.HtmlTextParser().parse("" + cfg.jieshao);
                this.upgrade_group.visible = false;
                this.dengji_group.visible = false;
                this.hp_group.y -= 62;
                this.tianfu_group.y -= 62;
                this.xiangqing_group.y -= 62;
                break;
            case CardType.general:
                this.jieshao_label.textFlow = new egret.HtmlTextParser().parse("" + cfg.jieshao);
                this.talent_label.text = "" + cfg.buffDesc;
                this.tianfu_group.visible = true;
                this.xiangqing_group.y = 184.98;
                this.hp_label.text = "" + cfg.hp;
                this.atk_label.text = "" + cfg.atk;
                this.level_label.text = "\u7B49\u7EA7\uFF1A" + cfg.level;
                var scale = GameApp.exp / cfg.cost;
                if (scale >= 1)
                    scale = 1;
                this.progress_mask.scaleX = scale;
                this.level_have_label.text = GameApp.exp + "/" + cfg.cost;
                break;
            case CardType.soldier:
                this.talent_label.text = "\u65E0";
                // this.jieshao_label.textFlow = new egret.HtmlTextParser().parse(`${cfg.jieshao}`);
                var card = GlobalFun.getCardDataFromId(this._insid);
                // let c = CardTalentCfg.list.soldier[ this._id ];
                this.talent_label.text = "" + card.jieshao;
                this.jieshao_label.text = "" + card.jieshao;
                this.hp_label.text = "" + card.hp;
                this.atk_label.text = "" + card.atk;
                this.upgrade_group.visible = false;
                this.dengji_group.visible = false;
                this.hp_group.y -= 62;
                this.tianfu_group.y -= 62;
                this.xiangqing_group.y -= 62;
                break;
        }
        // this.gold_cost.text = `${cfg.cost}`;
        this.card = new CardItem(this._type, this._id);
        this.card_group.addChild(this.card);
    };
    CardInfo.prototype.UIReset = function () {
        var cfg = GlobalFun.getCardsFromType(this._type, false)[this._id];
        this.hp_label.text = "" + cfg.hp;
        this.atk_label.text = "" + cfg.atk;
        this.level_label.text = "\u7B49\u7EA7\uFF1A" + cfg.level;
        var scale = GameApp.exp / cfg.cost;
        if (scale >= 1)
            scale = 1;
        this.progress_mask.scaleX = scale;
        this.level_have_label.text = GameApp.exp + "/" + cfg.cost;
    };
    CardInfo.prototype.touchTapHandler = function (e) {
        switch (e.target) {
            case this.close_img:
                this.removeThis();
                break;
            case this.upgrade_img:
                var cfg = GlobalFun.getCardsFromType(this._type, false)[this._id];
                // if( cfg.ownNum >= cfg.upgradeNum ) {
                if (cfg.cost <= GameApp.exp) {
                    GameApp.exp -= cfg.cost;
                    var _id = cfg.insId;
                    var _ownNum = cfg.ownNum - cfg.upgradeNum;
                    var _atk = cfg.atk + Math.floor(cfg.atk * 0.1);
                    var _hp = cfg.hp + Math.floor(cfg.hp * 0.1);
                    var _level = cfg.level + 1;
                    cfg.cost = 100 * cfg.level;
                    GlobalFun.refreshCardData(_id, { ownNum: _ownNum, atk: _atk, hp: _hp, level: _level, cost: cfg.cost });
                    UserTips.inst().showTips("升级成功！");
                    // this.removeThis();
                    this.UIReset();
                    MessageManager.inst().dispatch("refreshItemCard", { id: _id });
                    this.card.refreshGeneralData(_id);
                }
                else {
                    UserTips.inst().showTips("经验不足！");
                    // ViewManager.inst().open(RechargeTipPop);
                }
                // } else {
                //     UserTips.inst().showTips( "卡牌不足！" );
                // }
                break;
        }
    };
    CardInfo.prototype.removeThis = function () {
        if (this.parent && this.parent.contains(this)) {
            this.parent.removeChild(this);
        }
    };
    return CardInfo;
}(BaseView));
__reflect(CardInfo.prototype, "CardInfo");
//# sourceMappingURL=CardInfo.js.map