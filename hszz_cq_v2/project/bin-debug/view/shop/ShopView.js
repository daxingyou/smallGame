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
        _this.card_id = 0;
        return _this;
    }
    ShopView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    ShopView.prototype.onReturn = function () {
        GameMainView.shopOpen = false;
        ViewManager.inst().close(ShopView);
    };
    ShopView.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        egret.Tween.removeTweens(this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    ShopView.prototype.init = function () {
        if (ShopCfg.shopFirst) {
            this.updateCard();
            ShopCfg.shopFirst = false;
        }
        var time_num = new Date();
        ShopCfg.shopFirst_open = time_num.getTime();
        if (ShopCfg.shopFirst_close == null) {
            this.minute = 10;
            this.seconds = 0;
        }
        else {
            var time_cha = ShopCfg.shopFirst_open - ShopCfg.shopFirst_close;
            if (time_cha >= 600000) {
                egret.localStorage.removeItem(LocalStorageEnum.SHOP_ROLE);
                egret.localStorage.removeItem(LocalStorageEnum.SHOP_ROLE_NUM);
                egret.localStorage.removeItem("SHOP_TIME");
                ShopCfg.cardAny = [];
                this.updateCard();
                this.minute = 10;
                this.seconds = 0;
            }
            else {
                this.seconds = 60 - Math.floor((time_cha % 60000) / 1000);
                this.minute = 9 - Math.floor(time_cha / 60000);
            }
        }
        this.updateTime(this.minute, this.seconds);
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = new eui.ArrayCollection(ShopCfg.cardAny);
        this.scroller.horizontalScrollBar.autoVisibility = false;
        this.scroller.horizontalScrollBar.visible = false;
    };
    ShopView.prototype.updateTime = function (m, s) {
        var _this = this;
        egret.Tween.get(this, { loop: true })
            .wait(1000)
            .call(function () {
            if (s != 0) {
                s--;
                _this.seconds = s;
            }
            else if (m != 0) {
                m--;
                s = 59;
                _this.seconds = s;
                _this.minute = m;
            }
            else {
                egret.Tween.removeTweens(_this);
                _this.init();
            }
        });
    };
    ShopView.prototype.update = function () {
        if (this.minute < 10 && this.seconds >= 10)
            this.time_label.text = "0" + this.minute + " : " + this.seconds;
        else if (this.minute >= 10 && this.seconds < 10)
            this.time_label.text = "" + this.minute + " : 0" + this.seconds;
        else if (this.minute < 10 && this.seconds < 10)
            this.time_label.text = "0" + this.minute + " : 0" + this.seconds;
    };
    ShopView.prototype.updateCard = function () {
        if (egret.localStorage.getItem("SHOP_TIME")) {
            ShopCfg.shopFirst_close = parseInt(egret.localStorage.getItem("SHOP_TIME"));
        }
        else {
            var time_num = new Date();
            ShopCfg.shopFirst_close = time_num.getTime();
            egret.localStorage.setItem("SHOP_TIME", ShopCfg.shopFirst_close + "");
        }
        if (!egret.localStorage.getItem(LocalStorageEnum.SHOP_ROLE)) {
            for (var i = 0; i < 6; i++) {
                ShopCfg.cardAny.push(hszz.CardConfig.cfgs[i][Math.floor(Math.random() * 4)]);
            }
            for (var j = 0; j < ShopCfg.shopCardAny.length; j++) {
                ShopCfg.shopCardAny[j].num = Math.floor(Math.random() * 5 + 1);
            }
            egret.localStorage.setItem(LocalStorageEnum.SHOP_ROLE_NUM, JSON.stringify(ShopCfg.shopCardAny));
            egret.localStorage.setItem(LocalStorageEnum.SHOP_ROLE, JSON.stringify(ShopCfg.cardAny));
        }
        else {
            ShopCfg.shopCardAny = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.SHOP_ROLE_NUM));
            ShopCfg.cardAny = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.SHOP_ROLE));
        }
    };
    return ShopView;
}(BaseEuiView));
__reflect(ShopView.prototype, "ShopView");
ViewManager.inst().reg(ShopView, LayerManager.UI_Pop);
//# sourceMappingURL=ShopView.js.map