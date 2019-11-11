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
/**军需处 */
var TapPopUp = (function (_super) {
    __extends(TapPopUp, _super);
    function TapPopUp() {
        var _this = _super.call(this) || this;
        //物资的运输时间 以及加速消耗 以及生产数量毫秒
        _this.feTime = 20 * 60 * 1000;
        _this.feQuickCost = 15;
        _this.feProductNum = 200;
        _this.woodTime = 15 * 60 * 1000;
        _this.woodQuickCost = 5;
        _this.woodProductNum = 150;
        _this.goodTime = 30 * 60 * 1000;
        _this.goodQuickCost = 30;
        _this.goodProductNum = 300;
        //开始收集
        _this.endFeTime = 0;
        _this.endWoodTime = 0;
        _this.endGoodTime = 0;
        return _this;
    }
    TapPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            if (GameApp.guilding) {
                if (GameApp.guildView) {
                    GameApp.guildView.nextStep({ id: GameApp.nextStepId, comObj: _this.feGetBtn, width: 88, height: 31 });
                }
            }
        });
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.feCostLab.text = this.feQuickCost.toString();
        this.woodCostLab.text = this.woodQuickCost.toString();
        this.goodCostLab.text = this.goodQuickCost.toString();
        this.addTouchEvent(this.feGetBtn, this.onFeGet, true);
        this.addTouchEvent(this.woodGetBtn, this.onWoodGet, true);
        this.addTouchEvent(this.goodGetBtn, this.onGoodGet, true);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.feQuickBtn.visible = false;
        this.woodQuickBtn.visible = false;
        this.goodQuickBtn.visible = false;
        this.fe_Pro.mask = this.fe_mask;
        this.wood_Pro.mask = this.wood_mask;
        this.good_Pro.mask = this.good_mask;
        var feTimestr = egret.localStorage.getItem(LocalStorageEnum.FE_TIMESPAN);
        if (feTimestr) {
            this.endFeTime = parseInt(feTimestr);
            this.feGetBtn.visible = false;
        }
        ;
        var woodTimestr = egret.localStorage.getItem(LocalStorageEnum.WOOD_TIMESPAN);
        if (woodTimestr) {
            this.endWoodTime = parseInt(woodTimestr);
            this.woodGetBtn.visible = false;
        }
        var goodTimeStr = egret.localStorage.getItem(LocalStorageEnum.GOOD_TIMESPAN);
        if (goodTimeStr) {
            this.endGoodTime = parseInt(goodTimeStr);
            this.goodGetBtn.visible = false;
        }
        ;
        if (feTimestr || woodTimestr || goodTimeStr) {
            this.timerStartBoo = true;
            this.timer.start();
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_COLLECT_FE, this.onCollectFe, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_QUICK_FE, this.onQuickFe, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_COLLECT_WOOD, this.onWoodCollect, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_COLLECT_GOOD, this.onGoodCollect, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLOSE_COLLECT, this.onReturn, this);
    };
    //新手引导相关--------------------------
    TapPopUp.prototype.onCollectFe = function () {
        this.onFeGet();
        GlobalFun.guideToNext(this.feQuickBtn, 88, 31);
    };
    TapPopUp.prototype.onWoodCollect = function () {
        this.onWoodGet();
        GlobalFun.guideToNext(this.goodGetBtn, 88, 31);
    };
    TapPopUp.prototype.onGoodCollect = function () {
        this.onGoodGet();
        GlobalFun.guideToNext(this.returnBtn, 50, 50);
    };
    TapPopUp.prototype.onQuickFe = function () {
        this.feQuickBtn.visible = false;
        GameApp.inst().gold -= this.feQuickCost;
        this.endFeTime = new Date().getTime() - this.feTime;
        this.onTimer();
        GlobalFun.guideToNext(this.woodGetBtn, 88, 31);
    };
    //------------------------------------
    TapPopUp.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.feQuickBtn:
                if (this.feQuickCost > GameApp.m_gold) {
                    UserTips.inst().showTips("黄金不足");
                    return;
                }
                this.feQuickBtn.visible = false;
                GameApp.inst().gold -= this.feQuickCost;
                this.endFeTime = new Date().getTime() - this.feTime;
                this.onTimer();
                break;
            case this.woodQuickBtn:
                if (this.woodQuickCost > GameApp.m_gold) {
                    UserTips.inst().showTips("黄金不足");
                    return;
                }
                this.woodQuickBtn.visible = false;
                GameApp.inst().gold -= this.woodQuickCost;
                this.endWoodTime = new Date().getTime() - this.woodTime;
                this.onTimer();
                break;
            case this.goodQuickBtn:
                if (this.goodQuickCost > GameApp.m_gold) {
                    UserTips.inst().showTips("黄金不足");
                    return;
                }
                this.goodQuickBtn.visible = false;
                GameApp.inst().gold -= this.goodQuickCost;
                this.endGoodTime = new Date().getTime() - this.goodTime;
                this.onTimer();
                break;
        }
    };
    TapPopUp.prototype.onTimer = function () {
        var nowTime = new Date().getTime();
        if (this.endFeTime) {
            if (this.endFeTime > nowTime) {
                this.feGetBtn.visible = false;
                this.feQuickBtn.visible = true;
                this.startCollectFe = true;
                var offsetTime = (this.endFeTime - nowTime);
                var timeStr = DateUtils.getFormatBySecond(offsetTime / 1000, DateUtils.TIME_FORMAT_3);
                this.feTimeLab.text = timeStr;
                this.fe_mask.width = (1 - (offsetTime / this.feTime)) * 146;
            }
            else {
                //当前运输生铁结束
                this.fe_mask.width = 146;
                this.feTimeLab.text = "00:00";
                this.feGetBtn.visible = true;
                this.feQuickBtn.visible = false;
                this.startCollectFe = false;
                GameApp.inst().fe += this.feProductNum;
                UserTips.inst().showTips("恭喜获得生铁x" + this.feProductNum);
                this.endFeTime = null;
                egret.localStorage.setItem(LocalStorageEnum.FE_TIMESPAN, "");
            }
        }
        if (this.endWoodTime) {
            if (this.endWoodTime > nowTime) {
                this.woodGetBtn.visible = false;
                this.woodQuickBtn.visible = true;
                this.startCollectWood = true;
                var offsetTime = (this.endWoodTime - nowTime);
                var timeStr = DateUtils.getFormatBySecond(offsetTime / 1000, DateUtils.TIME_FORMAT_3);
                this.woodTimeLab.text = timeStr;
                this.wood_mask.width = (1 - (offsetTime / this.woodTime)) * 146;
            }
            else {
                //当前运输木材结束
                this.wood_mask.width = 146;
                this.woodTimeLab.text = "00:00";
                this.woodGetBtn.visible = true;
                this.woodQuickBtn.visible = false;
                this.startCollectWood = false;
                GameApp.inst().wood += this.woodProductNum;
                UserTips.inst().showTips("恭喜获得木材x" + this.woodProductNum);
                this.endWoodTime = null;
                egret.localStorage.setItem(LocalStorageEnum.WOOD_TIMESPAN, "");
            }
        }
        if (this.endGoodTime) {
            if (this.endGoodTime > nowTime) {
                this.goodGetBtn.visible = false;
                this.goodQuickBtn.visible = true;
                this.startCollectGood = true;
                var offsetTime = (this.endGoodTime - nowTime);
                var timeStr = DateUtils.getFormatBySecond(offsetTime / 1000, DateUtils.TIME_FORMAT_3);
                this.goodTimeLab.text = timeStr;
                this.good_mask.width = (1 - (offsetTime / this.goodTime)) * 146;
            }
            else {
                //当前运输粮草结束
                this.good_mask.width = 146;
                this.goodTimeLab.text = "00:00";
                this.goodGetBtn.visible = true;
                this.goodQuickBtn.visible = false;
                this.startCollectGood = false;
                GameApp.inst().good += this.goodProductNum;
                UserTips.inst().showTips("恭喜获得粮草x" + this.goodProductNum);
                this.endGoodTime = null;
                egret.localStorage.setItem(LocalStorageEnum.GOOD_TIMESPAN, "");
            }
        }
        if (!this.startCollectFe || !this.startCollectGood || !this.startCollectWood) {
            GameApp.tpxGetState = true;
        }
        else {
            GameApp.tpxGetState = false;
        }
        if (!this.startCollectFe && !this.startCollectGood && !this.startCollectWood) {
            this.timerStartBoo = false;
            this.timer.stop();
        }
    };
    TapPopUp.prototype.onFeGet = function () {
        this.feGetBtn.visible = false;
        this.feQuickBtn.visible = true;
        this.startCollectFe = true;
        this.endFeTime = new Date().getTime() + this.feTime;
        egret.localStorage.setItem(LocalStorageEnum.FE_TIMESPAN, this.endFeTime.toString());
        if (!this.timerStartBoo) {
            this.timerStartBoo = true;
            this.timer.start();
        }
    };
    TapPopUp.prototype.onWoodGet = function () {
        this.woodGetBtn.visible = false;
        this.woodQuickBtn.visible = true;
        this.startCollectWood = true;
        this.endWoodTime = new Date().getTime() + this.woodTime;
        egret.localStorage.setItem(LocalStorageEnum.WOOD_TIMESPAN, this.endWoodTime.toString());
        if (!this.timerStartBoo) {
            this.timerStartBoo = true;
            this.timer.start();
        }
    };
    TapPopUp.prototype.onGoodGet = function () {
        this.goodGetBtn.visible = false;
        this.goodQuickBtn.visible = true;
        this.startCollectGood = true;
        this.endGoodTime = new Date().getTime() + this.goodTime;
        egret.localStorage.setItem(LocalStorageEnum.GOOD_TIMESPAN, this.endGoodTime.toString());
        if (!this.timerStartBoo) {
            this.timerStartBoo = true;
            this.timer.start();
        }
    };
    TapPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(TapPopUp);
            GlobalFun.guideToNext();
        });
    };
    TapPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.feGetBtn, this.onFeGet);
        this.removeTouchEvent(this.woodGetBtn, this.onWoodGet);
        this.removeTouchEvent(this.goodGetBtn, this.onGoodGet);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_COLLECT_FE, this.onCollectFe, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_QUICK_FE, this.onQuickFe, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_COLLECT_WOOD, this.onWoodCollect, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_COLLECT_GOOD, this.onGoodCollect, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLOSE_COLLECT, this.onReturn, this);
    };
    return TapPopUp;
}(BaseEuiView));
__reflect(TapPopUp.prototype, "TapPopUp");
ViewManager.inst().reg(TapPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=TapPopUp.js.map