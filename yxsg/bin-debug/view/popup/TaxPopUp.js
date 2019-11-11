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
/**
 * 征收界面
 */
var TaxPopUp = (function (_super) {
    __extends(TaxPopUp, _super);
    function TaxPopUp() {
        var _this = _super.call(this) || this;
        _this.singleMarket = 1;
        _this.singleField = 1;
        _this.maxTime = 30 * 60 * 1000;
        _this.singleTime = 60 * 1000;
        return _this;
    }
    TaxPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.market_collect, this.onMarketCollect, true);
        this.addTouchEvent(this.field_collect, this.onFieldCollect, true);
        var marketInfoStr = egret.localStorage.getItem(LocalStorageEnum.MARKET_INFO);
        if (marketInfoStr) {
            this.marketStartTime = parseInt(marketInfoStr);
        }
        var fieldInfoStr = egret.localStorage.getItem(LocalStorageEnum.FIELD_INFO);
        if (fieldInfoStr) {
            this.fieldStartTime = parseInt(fieldInfoStr);
        }
        this.market_pro.mask = this.market_mask;
        this.field_pro.mask = this.field_mask;
        this.refreshview();
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.start();
    };
    TaxPopUp.prototype.onTimer = function (evt) {
        this.refreshview();
    };
    /**界面刷新 */
    TaxPopUp.prototype.refreshview = function () {
        this.fieldNumLab.text = this.refreshItem(this.fieldStartTime, this.field_mask, LocalStorageEnum.FIELD_INFO, this.fieldTimeLab, 1).toString();
        this.marketNumLab.text = this.refreshItem(this.marketStartTime, this.market_mask, LocalStorageEnum.MARKET_INFO, this.marketTimeLab, 2).toString();
    };
    TaxPopUp.prototype.refreshItem = function (param1, mask, localStr, label, id) {
        var num = 0;
        if (param1) {
            var startTimespan = param1;
            var newtime = new Date().getTime();
            var offvalue = newtime - startTimespan;
            if (offvalue >= this.maxTime) {
                offvalue = this.maxTime;
            }
            var percent = offvalue / this.maxTime;
            mask.width = percent * 273;
            num = ((offvalue / this.singleTime) >> 0) * this.singleField;
            var timeSpan = this.maxTime - offvalue;
            label.text = DateUtils.getFormatBySecond(timeSpan / 1000, DateUtils.TIME_FORMAT_3);
        }
        else {
            mask.width = 0;
            if (id == 1) {
                this.fieldStartTime = new Date().getTime();
                egret.localStorage.setItem(localStr, this.fieldStartTime.toString());
            }
            else {
                this.marketStartTime = new Date().getTime();
                egret.localStorage.setItem(localStr, this.marketStartTime.toString());
            }
            label.text = DateUtils.getFormatBySecond(this.maxTime / 1000, DateUtils.TIME_FORMAT_3);
        }
        return num;
    };
    /**集市征收 */
    TaxPopUp.prototype.onMarketCollect = function () {
        if (parseInt(this.marketNumLab.text) <= 0) {
            UserTips.ins().showTips("未有物品可以征收");
            return;
        }
        this.marketStartTime = new Date().getTime();
        this.addItemToBag("gold_icon_png", "五铢钱", parseInt(this.marketNumLab.text), LocalStorageEnum.MARKET_INFO, this.marketStartTime);
    };
    /**田野征收 */
    TaxPopUp.prototype.onFieldCollect = function () {
        if (parseInt(this.fieldNumLab.text) <= 0) {
            UserTips.ins().showTips("未有物品可以征收");
            return;
        }
        this.fieldStartTime = new Date().getTime();
        this.addItemToBag("gem_icon_png", "粮草", parseInt(this.fieldNumLab.text), LocalStorageEnum.FIELD_INFO, this.fieldStartTime);
    };
    /**添加物品到背包 */
    TaxPopUp.prototype.addItemToBag = function (res, name, num, localstr, localval) {
        MapView.ins().refreshGoods(res, name, 20, 20, num);
        egret.localStorage.setItem(localstr, localval.toString());
        this.refreshview();
    };
    TaxPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.ins().close(TaxPopUp);
        }, this);
    };
    TaxPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.market_collect, this.onMarketCollect);
        this.removeTouchEvent(this.field_collect, this.onFieldCollect);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.marketStartTime = null;
        this.fieldStartTime = null;
    };
    return TaxPopUp;
}(BaseEuiView));
__reflect(TaxPopUp.prototype, "TaxPopUp");
ViewManager.ins().reg(TaxPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=TaxPopUp.js.map