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
var ShopView = (function (_super) {
    __extends(ShopView, _super);
    function ShopView() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        return _this;
    }
    ShopView.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.alpha = 0;
        egret.Tween.get(this).to({ alpha: 1 }, 600).call(function () {
            egret.Tween.removeTweens(_this);
        }, this);
        if (param[0]) {
            if (param[0].cb) {
                this._cb = param[0].cb;
            }
            if (param[0].arg) {
                this._arg = param[0].arg;
            }
        }
        this.shopGroup["autoSize"]();
        this.goldWatcher = eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        this.switchPage();
    };
    ShopView.prototype.onTouchTap = function (evt) {
        var _this = this;
        switch (evt.target) {
            case this.rechargeBtn:
                this.selectIndex = 1;
                this.switchPage();
                break;
            case this.shopBtn:
                this.selectIndex = 0;
                this.switchPage();
                break;
            case this.returnBtn:
                egret.Tween.get(this).to({ alpha: 0 }, 600).call(function () {
                    egret.Tween.removeTweens(_this);
                    ViewManager.inst().close(ShopView);
                    if (_this._cb && _this._arg) {
                        _this._cb.call(_this._arg);
                    }
                }, this);
                break;
        }
    };
    ShopView.prototype.switchPage = function () {
        GameApp.selectIndex = this.selectIndex;
        if (this.selectIndex == 0) {
            this.shopBtn.currentState = "down";
            this.rechargeBtn.currentState = "up";
        }
        else {
            this.rechargeBtn.currentState = "down";
            this.shopBtn.currentState = "up";
        }
        this.arrayCollect.source = ShopCfg.shopCfgs[this.selectIndex];
    };
    ShopView.prototype.close = function () {
        if (this.goldWatcher) {
            this.goldWatcher.unwatch();
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return ShopView;
}(BaseEuiView));
__reflect(ShopView.prototype, "ShopView");
ViewManager.inst().reg(ShopView, LayerManager.UI_Pop);
//# sourceMappingURL=ShopView.js.map