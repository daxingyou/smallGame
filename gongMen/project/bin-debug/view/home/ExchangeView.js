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
var ExchangeView = (function (_super) {
    __extends(ExchangeView, _super);
    function ExchangeView() {
        return _super.call(this) || this;
    }
    ExchangeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this.back_img, this.touchBack);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    ExchangeView.prototype.close = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    ExchangeView.prototype.init = function () {
        if (GameConfig.level >= 10) {
            this.level_name.source = "img_level_normal_" + GameConfig.level + "_png";
        }
        else {
            this.level_name.source = "img_level_normal_0" + GameConfig.level + "_png";
        }
        this.head_img.source = BagConfig.bagFig[BagConfig.bagID].header + "_png";
        this.list.itemRenderer = ExchangeItem;
        this.list.dataProvider = new eui.ArrayCollection(ExchangeConfig.exchangeFig);
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
    };
    ExchangeView.prototype.update = function () {
        this.zhu.text = "" + GameConfig.zhu;
        this.head_frame.source = "img_head_frame_noraml_" + GameConfig.frame + "_png";
    };
    ExchangeView.prototype.touchBack = function () {
        ViewManager.inst().close(ExchangeView);
    };
    return ExchangeView;
}(BaseEuiView));
__reflect(ExchangeView.prototype, "ExchangeView");
ViewManager.inst().reg(ExchangeView, LayerManager.UI_Pop);
//# sourceMappingURL=ExchangeView.js.map