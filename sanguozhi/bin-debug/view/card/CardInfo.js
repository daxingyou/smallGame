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
    function CardInfo(type, id) {
        var _this = _super.call(this) || this;
        _this.skinName = "CardInfoSkin";
        _this._type = type;
        _this._id = id;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        return _this;
    }
    CardInfo.prototype.add_view_handler = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.add_view_handler, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.init();
        this.addTouchEvent(this.close_img, this.touchTapHandler, true);
        this.addTouchEvent(this.upgrade_img, this.touchTapHandler, true);
    };
    CardInfo.prototype.remove_view_handler = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_view_handler, this);
        this.removeTouchEvent(this.close_img, this.touchTapHandler);
        this.removeTouchEvent(this.upgrade_img, this.touchTapHandler);
    };
    CardInfo.prototype.init = function () {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        var cfg = GlobalFun.getCardsFromType(this._type, false)[this._id];
        this.jieshao_label.textFlow = new egret.HtmlTextParser().parse("" + cfg.jieshao);
        // this.jieshao_label.text = `${cfg.jieshao}`;
        if (this._type == CardType.special_skill) {
            this.hp_label.text = "\u65E0";
            this.atk_label.text = "\u65E0";
            this.upgrade_group.visible = false;
        }
        else {
            this.hp_label.text = "" + cfg.hp;
            this.atk_label.text = "" + cfg.atk;
        }
        this.gold_cost.text = "" + cfg.cost;
        var card = new CardItem(this._type, this._id);
        this.card_group.addChild(card);
    };
    CardInfo.prototype.touchTapHandler = function (e) {
        switch (e.target) {
            case this.close_img:
                this.removeThis();
                break;
            case this.upgrade_img:
                var cfg = GlobalFun.getCardsFromType(this._type, false)[this._id];
                if (cfg.ownNum >= cfg.upgradeNum) {
                    if (cfg.cost <= GameApp.gold) {
                        GameApp.gold -= cfg.cost;
                        var _id = cfg.insId;
                        var _ownNum = cfg.ownNum - cfg.upgradeNum;
                        var _atk = cfg.atk + Math.floor(cfg.atk * 0.1);
                        var _hp = cfg.hp + Math.floor(cfg.hp * 0.1);
                        var _level = cfg.level + 1;
                        GlobalFun.refreshCardData(_id, { ownNum: _ownNum, atk: _atk, hp: _hp, level: _level });
                        UserTips.inst().showTips("升级成功！");
                        this.removeThis();
                    }
                    else {
                        UserTips.inst().showTips("元宝不足！");
                    }
                }
                else {
                    UserTips.inst().showTips("卡牌不足！");
                }
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