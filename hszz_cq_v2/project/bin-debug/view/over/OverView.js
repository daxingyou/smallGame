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
var OverView = (function (_super) {
    __extends(OverView, _super);
    function OverView() {
        var _this = _super.call(this) || this;
        _this.card = [];
        return _this;
    }
    OverView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.state = param[0].state;
        this.gold_num = param[0].gold;
        this.init();
        this.addTouchEvent(this, this.touchTap);
    };
    OverView.prototype.close = function () {
        this.removeTouchEvent(this.over_btn, this.touchTap);
    };
    OverView.prototype.init = function () {
        this.over_bg.source = this.state + "_bg_png";
        switch (this.state) {
            case "win":
                this.win_group.visible = true;
                this.failure_group.visible = false;
                // GameApp.medal += 100;
                // let gold:number = 40 + (GameApp.curChapter-1)*20 ;
                // GameApp.gold += gold;.
                this.gold.text = "x " + this.gold_num;
                GameApp.gold += this.gold_num;
                for (var i = 0; i < 3; i++) {
                    this.card.push(hszz.CardConfig.cfgs[Math.floor(Math.random() * 7)][Math.floor(Math.random() * 4)]);
                    var card_1 = this.card[i];
                    card_1.ownNum += 1;
                    GlobalFun.refreshCardData(card_1);
                }
                this.list.itemRenderer = OverItem;
                this.list.dataProvider = new eui.ArrayCollection(this.card);
                break;
            case "failure":
                this.win_group.visible = false;
                this.failure_group.visible = true;
                // GameApp.medal += 50;
                // GameApp.gold += 20;
                break;
        }
    };
    OverView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.over_btn:
                // ViewManager.inst().close(BattleView);
                MessageManager.inst().dispatch(CustomEvt.GAMEEND, { end: "close" });
                ViewManager.inst().close(OverView);
                break;
            case this.over_btn0:
                // ViewManager.inst().close(BattleView);
                MessageManager.inst().dispatch(CustomEvt.GAMEEND, { end: "close" });
                ViewManager.inst().close(OverView);
                break;
            case this.shop_btn:
                ViewManager.inst().close(OverView);
                ViewManager.inst().open(ShopView);
                break;
            case this.fuben_btn:
                break;
            case this.boss_btn:
                break;
        }
    };
    return OverView;
}(BaseEuiView));
__reflect(OverView.prototype, "OverView");
ViewManager.inst().reg(OverView, LayerManager.UI_Pop);
//# sourceMappingURL=OverView.js.map