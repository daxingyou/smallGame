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
var ArchiveView = (function (_super) {
    __extends(ArchiveView, _super);
    function ArchiveView() {
        var _this = _super.call(this) || this;
        _this.haveCard = [];
        _this.notCard = [];
        return _this;
    }
    ArchiveView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.have_btn["autoSize"]();
        this.not_btn["autoSize"]();
        eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.addTouchEvent(this, this.touchTap);
    };
    ArchiveView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
    };
    ArchiveView.prototype.init = function () {
        this.haveCard = GlobalFun.getCardData();
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 4; j++) {
                var card = hszz.CardConfig.cfgs[i][j];
                var cardVis = false;
                for (var k = 0; k < this.haveCard.length; k++) {
                    if (this.haveCard[k].id == card.id) {
                        cardVis = true;
                    }
                }
                if (cardVis == false) {
                    this.notCard.push(card);
                }
            }
        }
        this.have_btn.currentState = "down";
        this.not_btn.currentState = "up";
        this.list.itemRenderer = ArchiveItem;
        this.list.dataProvider = new eui.ArrayCollection(this.haveCard);
    };
    ArchiveView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.have_btn:
                this.have_btn.currentState = "down";
                this.not_btn.currentState = "up";
                this.list.dataProvider = new eui.ArrayCollection(this.haveCard);
                break;
            case this.not_btn:
                this.have_btn.currentState = "up";
                this.not_btn.currentState = "down";
                this.list.dataProvider = new eui.ArrayCollection(this.notCard);
                break;
            case this.returnBtn:
                ViewManager.inst().close(ArchiveView);
                break;
        }
    };
    return ArchiveView;
}(BaseEuiView));
__reflect(ArchiveView.prototype, "ArchiveView");
ViewManager.inst().reg(ArchiveView, LayerManager.UI_Main);
//# sourceMappingURL=ArchiveView.js.map