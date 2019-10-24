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
var CultivateView = (function (_super) {
    __extends(CultivateView, _super);
    function CultivateView() {
        var _this = _super.call(this) || this;
        _this.cardAny = [];
        return _this;
    }
    CultivateView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.card_id = param[0].id;
        this.init();
        this.addTouchEvent(this.btn, this.touchTap);
        this.addTouchEvent(this.close_btn, this.touchClose);
    };
    CultivateView.prototype.close = function () {
        this.removeTouchEvent(this.btn, this.touchTap);
        this.removeTouchEvent(this.close_btn, this.touchClose);
    };
    CultivateView.prototype.init = function () {
        this.cardAny = GlobalFun.getCardData();
        this.tiao.mask = this.mask_rect;
        for (var i = 0; i < this.cardAny.length; i++) {
            if (this.card_id == this.cardAny[i].id) {
                this.carditem = this.cardAny[i];
            }
        }
        this.card.source = "card_" + this.carditem.id + "_png";
        this.card_name.text = this.carditem.name;
        this.card_name.textColor = this.carditem.qualityColor;
        this.descLab.text = this.carditem.desc;
        this.updateCard();
    };
    CultivateView.prototype.updateCard = function () {
        this.levelLab.text = "" + this.carditem.level;
        this.num_label.text = this.carditem.ownNum + " / " + this.carditem.level * 100;
        this.gold.text = "" + this.carditem.level * 500;
        this.hp_num.text = "" + (this.carditem.hp);
        this.attack_num.text = "" + (this.carditem.atk);
        this.attack_dis.text = "" + this.carditem.atkDis;
        this.attack_spd.text = "" + this.carditem.atkSpd;
        if (this.carditem.ownNum >= this.carditem.level * 100) {
            this.mask_rect.width = 242;
        }
        else {
            this.mask_rect.width = this.carditem.ownNum / (this.carditem.level * 100) * 242;
        }
        // this.mask_rect.width = this.carditem.ownNum * (this.tiao.width / (this.carditem.level * 100));
    };
    CultivateView.prototype.touchTap = function () {
        if (GameApp.gold >= this.carditem.level * 500) {
            if (this.carditem.ownNum >= this.carditem.level * 100) {
                this.carditem.ownNum -= this.carditem.level * 100;
                GameApp.gold -= this.carditem.level * 500;
                this.carditem.level++;
                this.carditem.hp += ((this.carditem.level - 1) * 300);
                this.carditem.atk += ((this.carditem.level - 1) * 120);
                UserTips.inst().showTips("升级成功");
                GlobalFun.refreshCardData(this.carditem);
                this.updateCard();
            }
            else {
                UserTips.inst().showTips("卡牌碎片不足");
            }
        }
        else {
            UserTips.inst().showTips("金币不足");
        }
    };
    CultivateView.prototype.touchClose = function () {
        ViewManager.inst().close(CultivateView);
    };
    return CultivateView;
}(BaseEuiView));
__reflect(CultivateView.prototype, "CultivateView");
ViewManager.inst().reg(CultivateView, LayerManager.UI_Pop);
//# sourceMappingURL=CultivateView.js.map