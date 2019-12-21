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
var TaxPopUp = (function (_super) {
    __extends(TaxPopUp, _super);
    function TaxPopUp() {
        var _this = _super.call(this) || this;
        _this.maxTime = 30 * 60;
        //每秒产值
        _this.singleCost = 5;
        _this.count = 0;
        _this.goodsNum = 0;
        return _this;
    }
    TaxPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.taxGroup["autoSize"]();
        this.taxGroup.verticalCenter = -700;
        egret.Tween.get(this.taxGroup).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.taxGroup);
        }, this);
        this.goodsNum = 0;
        this.goodsLab.text = "x0";
        this.addTouchEvent(this.collectBtn, this.onCollect, true);
        this.addTouchEvent(this.getBtn, this.onGet, true);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        var cdTime = egret.localStorage.getItem(LocalStorageEnum.TAX_CD_TIME);
        if (cdTime && parseInt(cdTime) > new Date().getTime()) {
            //当前记录的cd时间比现在的时间大 。在cd中 
            var offValue = parseInt(cdTime) - new Date().getTime();
            var timestr = DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
            //显示到文本上
            this.timeLab.text = timestr;
            this.goodsNum = (600 - ((Math.ceil(offValue / 60000)) * 20));
            this.goodsLab.text = "x" + this.goodsNum;
            this.timer.start();
            this.showTaxCd();
        }
        else {
            if (cdTime) {
                this.goodsNum = 600;
                this.goodsLab.text = "x" + (600).toString();
                this.showGetPage();
            }
            else {
                this.showNormalPage();
            }
        }
        // let endTime = egret.localStorage.getItem(LocalStorageEnum.mainTaxTimespan);
        // if(endTime && parseInt(endTime) > new Date().getTime()){
        // 	this.timer.start();
        // }
    };
    TaxPopUp.prototype.onCollect = function () {
        this.startTax();
    };
    TaxPopUp.prototype.onGet = function () {
        if (!this.goodsNum) {
            UserTips.inst().showTips("当前未征收到物资");
            return;
        }
        // this.stopTax();
        egret.localStorage.setItem(LocalStorageEnum.TAX_CD_TIME, "");
        this.showNormalPage();
        UserTips.inst().showTips("征收到物资x" + this.goodsNum);
        GameApp.goods += this.goodsNum;
        this.goodsNum = 0;
        this.goodsLab.text = "x0";
    };
    /**显示收集 */
    TaxPopUp.prototype.showTaxCd = function () {
        this.collectBtn.visible = false;
        this.getBtn.visible = false;
    };
    /**显示正常状态界面 */
    TaxPopUp.prototype.showNormalPage = function () {
        this.collectBtn.visible = true;
        this.getBtn.visible = false;
    };
    /**显示领取状态 */
    TaxPopUp.prototype.showGetPage = function () {
        this.collectBtn.visible = false;
        this.getBtn.visible = true;
    };
    /**开始税收 */
    TaxPopUp.prototype.startTax = function () {
        //点击了征收 。开始满仓时间
        var endTime = new Date().getTime() + this.maxTime * 1000; //10分钟;
        egret.localStorage.setItem(LocalStorageEnum.TAX_CD_TIME, endTime.toString());
        this.getBtn.visible = false;
        this.collectBtn.visible = false;
        this.timer.start();
        this.showTaxCd();
        //需要切换界面按钮状态
        MessageManager.inst().dispatch(CustomEvt.TAX_START);
    };
    /**结束收集 */
    TaxPopUp.prototype.stopTax = function () {
        this.timer.stop();
        this.timeLab.text = "00:00";
        //需要切换界面按钮状态;
        // this.showNormalPage();
        MessageManager.inst().dispatch(CustomEvt.TAX_END);
    };
    TaxPopUp.prototype.onTimer = function () {
        var endTime = parseInt(egret.localStorage.getItem(LocalStorageEnum.TAX_CD_TIME));
        if (endTime > new Date().getTime()) {
            var offValue = endTime - new Date().getTime();
            var timestr = DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
            //显示到文本上
            this.timeLab.text = timestr;
            this.goodsNum = (600 - ((Math.ceil(offValue / 60000)) * 20));
            this.goodsLab.text = "x" + this.goodsNum;
        }
        else {
            this.goodsNum = 600;
            this.goodsLab.text = "x" + (600).toString();
            this.stopTax();
            this.showGetPage();
        }
    };
    TaxPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.taxGroup).to({ verticalCenter: -700 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.taxGroup);
            ViewManager.inst().close(TaxPopUp);
        }, this);
    };
    TaxPopUp.prototype.close = function () {
        this.removeTouchEvent(this.getBtn, this.onGet);
        this.removeTouchEvent(this.collectBtn, this.onCollect);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    return TaxPopUp;
}(BaseEuiView));
__reflect(TaxPopUp.prototype, "TaxPopUp");
ViewManager.inst().reg(TaxPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=TaxPopUp.js.map