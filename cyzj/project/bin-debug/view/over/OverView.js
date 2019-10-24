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
        return _super.call(this) || this;
    }
    OverView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.state = param[0];
        this.init();
        this.addTouchEvent(this.over_btn, this.touchTap);
    };
    OverView.prototype.close = function () {
    };
    OverView.prototype.init = function () {
        this.over_btn["autoSize"]();
        ViewManager.inst().close(PauseView);
        this.img.source = this.state + "_png";
        if (this.state == "win") {
            this.item_group.visible = true;
            this.money.text = "x 100";
            GameApp.roleGold += 100;
            this.item0.source = this.chooseItem() + "_png";
            this.item1.source = this.chooseItem() + "_png";
            this.item2.source = this.chooseItem() + "_png";
        }
        else if (this.state == "failure") {
            this.item_group.visible = false;
        }
    };
    OverView.prototype.chooseItem = function () {
        var num = Math.floor(Math.random() * 100);
        var item = 0;
        if (num < 5) {
            item = Math.floor(GameConfig.gq + 10012);
            GlobalFun.addSuiPian(GameConfig.gq, 1);
            GlobalFun.addItemToBag(item, 1);
            return item;
        }
        else if (num < 15) {
            item = Math.floor(Math.random() * 3 + 10009);
            GlobalFun.addItemToBag(item, 1);
            return item;
        }
        else {
            item = Math.floor(Math.random() * 9 + 10000);
            GlobalFun.addItemToBag(item, 1);
            return item;
        }
    };
    OverView.prototype.touchTap = function () {
        if (GameConfig.fight_state == "adventure") {
            MessageManager.inst().dispatch("GAME_START");
        }
        else {
            // ViewManager.inst().open(GameMainView);
        }
        ViewManager.inst().close(OverView);
        ViewManager.inst().close(GameView);
    };
    return OverView;
}(BaseEuiView));
__reflect(OverView.prototype, "OverView");
ViewManager.inst().reg(OverView, LayerManager.UI_Pop);
//# sourceMappingURL=OverView.js.map