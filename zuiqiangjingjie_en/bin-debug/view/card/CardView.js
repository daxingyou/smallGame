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
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView() {
        var _this = _super.call(this) || this;
        _this.list_name = [
            "wujiang", "miaoji", "qixie"
        ];
        _this.soldier_name = [
            "Bowmen", "Infantry", "cavalry"
        ];
        return _this;
    }
    CardView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        for (var i = 0; i < this.list_name.length; i++) {
            this.addTouchEvent(this[this.list_name[i] + "_txt"], this.touchTapHandler, false);
            this.addTouchEvent(this[this.list_name[i] + "_bg"], this.touchTapHandler, false);
        }
        this.addTouchEvent(this.back_btn, this.touchTapHandler, true);
        MessageManager.inst().addListener(CustomEvt.TOUCH_CARD, this.touchCardHandler, this);
        MessageManager.inst().addListener("refreshItemCard", this.refreshCard, this);
        var generalNum = GlobalFun.getCardsFromType(CardType.general, false).length;
        this.generalLab.textFlow = new egret.HtmlTextParser().parse("<font color=0x45df34>" + generalNum + "</font>");
        var skillNum = GlobalFun.getCardsFromType(CardType.special_skill, false).length;
        this.skillLab.textFlow = new egret.HtmlTextParser().parse("<font color=0x45df34>" + skillNum + "</font>");
        var soldiercfgs = GlobalFun.getCardsFromType(CardType.soldier, false);
        var soldierNum = 0;
        soldiercfgs.forEach(function (cfg) {
            soldierNum += cfg.ownNum;
        }, this);
        this.soldierLab.textFlow = new egret.HtmlTextParser().parse("<font color=0x45df34>" + soldierNum + "</font>");
    };
    CardView.prototype.close = function () {
        for (var i = 0; i < this.list_name.length; i++) {
            this.removeTouchEvent(this[this.list_name[i] + "_txt"], this.touchTapHandler);
            this.removeTouchEvent(this[this.list_name[i] + "_bg"], this.touchTapHandler);
        }
        this.removeTouchEvent(this.back_btn, this.touchTapHandler);
        MessageManager.inst().removeListener(CustomEvt.TOUCH_CARD, this.touchCardHandler, this);
        MessageManager.inst().removeListener("refreshItemCard", this.refreshCard, this);
    };
    CardView.prototype.init = function () {
        this.view_group.verticalCenter = -700;
        egret.Tween.get(this.view_group)
            .to({ verticalCenter: 0 }, 600, egret.Ease.circOut);
        this.adapter();
        this.select_list(0);
        this.listInit();
        this.soldierInit();
    };
    CardView.prototype.soldierInit = function () {
        for (var i = 0; i < 3; i++) {
            this["soldier_" + i].text = this.soldier_name[i] + "\uFF1A" + GameApp["soldier" + (i + 1) + "Num"];
        }
    };
    CardView.prototype.touchTapHandler = function (e) {
        var _this = this;
        for (var i = 0; i < this.list_name.length; i++) {
            if (e.target == this[this.list_name[i] + "_txt"] ||
                e.target == this[this.list_name[i] + "_bg"]) {
                this.select_list(i);
            }
        }
        switch (e.target) {
            case this.back_btn:
                egret.Tween.get(this.view_group).to({ verticalCenter: -700 }, 600, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(_this.view_group);
                    ViewManager.inst().close(CardView);
                }, this);
                break;
        }
    };
    CardView.prototype.listInit = function () {
        var type = [
            CardType.general, CardType.special_skill, CardType.soldier
        ];
        for (var j = 0; j < 3; j++) {
            var length_1 = GlobalFun.getCardsFromType(type[j], false).length;
            // if( j == 2 ) {
            //     length = 3;
            // }
            for (var i = 0; i < length_1; i++) {
                var card = new CardItem(type[j], i);
                var interval_y = (this[this.list_name[j] + "_scroller"].height - card.height * 2) / 3;
                var interval_x = (this[this.list_name[j] + "_scroller"].width - card.width * 6) / 7;
                card.y = interval_y + (i % 2) * (card.height + interval_y);
                card.x = interval_x + Math.floor(i / 2) * (card.width + interval_x);
                this[this.list_name[j] + "_group"].addChild(card);
            }
        }
    };
    CardView.prototype.refreshCard = function (evt) {
        for (var i = 0; i < this["wujiang_group"].numChildren; i++) {
            var cardItem = this["wujiang_group"].getChildAt(i);
            if (!!cardItem) {
                cardItem.refreshGeneralData(evt.data.id);
            }
        }
    };
    CardView.prototype.touchCardHandler = function (e) {
        MessageManager.inst().dispatch(LocalStorageEnum.CLOSE_CARDINFO, this);
        var cardInfo = new CardInfo(e.data.type, e.data.id, e.data.insid);
        this.addChild(cardInfo);
    };
    CardView.prototype.select_list = function (id) {
        for (var i = 0; i < this.list_name.length; i++) {
            this[this.list_name[i] + "_bg"].source = "card_btn_off_png";
            this[this.list_name[i] + "_txt"].source = "card_select_txt_" + i + "_1_png";
            this[this.list_name[i] + "_scroller"].visible = false;
        }
        this[this.list_name[id] + "_bg"].source = "card_btn_on_png";
        this[this.list_name[id] + "_txt"].source = "card_select_txt_" + id + "_0_png";
        this[this.list_name[id] + "_scroller"].visible = true;
    };
    CardView.prototype.adapter = function () {
        var scale = this.stage.stageWidth / 1334;
        // this.select_group.scaleX = this.select_group.scaleY = scale;
        this.view_group.scaleX = this.view_group.scaleY = scale;
    };
    return CardView;
}(BaseEuiView));
__reflect(CardView.prototype, "CardView");
ViewManager.inst().reg(CardView, LayerManager.UI_Pop);
//# sourceMappingURL=CardView.js.map