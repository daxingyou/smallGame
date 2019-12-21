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
var CollectSoldierPop = (function (_super) {
    __extends(CollectSoldierPop, _super);
    function CollectSoldierPop() {
        var _this = _super.call(this) || this;
        /**Index of currently selected arms */
        _this.curSoldierIndex = 1;
        //Currently selected distance representation 100 500 1000 。 1 5 10
        _this.curDisIndex = 1;
        /**100Unit consumption of Li conscription */
        _this.singleCost = 100;
        //100Unit time of Li conscription
        _this.singleTime = 60;
        //Time to refresh next time
        _this.nextTime = 5 * 60 * 1000;
        _this.collectState = false;
        _this.cdstate = false;
        /**Number of units per conscription */
        _this.collectSoldier = 120;
        _this.rewards = { 1: 50, 3: 150, 8: 400 };
        return _this;
    }
    CollectSoldierPop.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.collectGroup["autoSize"]();
        this.collectGroup.verticalCenter = -700;
        egret.Tween.get(this.collectGroup).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.collectGroup);
        }, this);
        var type = egret.localStorage.getItem(LocalStorageEnum.COLLECT_SOLDIER_TYPE);
        if (type) {
            this.curSoldierIndex = parseInt(type);
            this["type_" + type].selected = true;
        }
        else {
            this.curSoldierIndex = 1;
            this.type_1.selected = true;
        }
        var distr = egret.localStorage.getItem(LocalStorageEnum.COLLECT_SOLDIER_DIS);
        if (distr) {
            this.curDisIndex = parseInt(distr);
            this["dis_" + distr].selected = true;
        }
        else {
            this.dis_1.selected = true;
            this.curDisIndex = 1;
        }
        this.costLab.text = (this.singleCost * this.curDisIndex).toString();
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.collectBtn, this.onCollect, true);
        this.addTouchEvent(this.getBtn, this.onGet, true);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        var cdTime = egret.localStorage.getItem(LocalStorageEnum.COLLECT_CD_TIME);
        if (cdTime && parseInt(cdTime) > new Date().getTime()) {
            //Currently recordedcdTime is greater than now 。staycdin
            this.collectState = false;
            this.cdstate = true;
            this.timer.start();
            this.showPageCd();
        }
        else {
            //Be not incdin
            var endTime = egret.localStorage.getItem(LocalStorageEnum.collectTime);
            if (endTime && parseInt(endTime) > new Date().getTime()) {
                this.timer.start();
                this.collectState = true;
                this.cdstate = false;
                this.showPageCollect();
            }
            else {
                this.collectState = false;
                this.cdstate = false;
                if (endTime) {
                    this.showGetPage();
                }
                else {
                    this.showPageNormal();
                }
            }
        }
    };
    CollectSoldierPop.prototype.onTouchTap = function (evt) {
        if (evt.target == this.rect_1 || evt.target == this.rect_2 || evt.target == this.rect_3) {
            var type = evt.target.name.split("_")[1];
            this.curSoldierIndex = parseInt(type);
            for (var i = 1; i <= 3; i++) {
                this["type_" + i].selected = false;
            }
            this["type_" + type].selected = true;
        }
        if (evt.target == this.rect_4 || evt.target == this.rect_5 || evt.target == this.rect_6) {
            var dis = evt.target.name.split("_")[1];
            this.curDisIndex = parseInt(dis);
            this.dis_1.selected = false;
            this.dis_3.selected = false;
            this.dis_8.selected = false;
            this["dis_" + dis].selected = true;
            this.costLab.text = (this.singleCost * this.curDisIndex).toString();
        }
    };
    CollectSoldierPop.prototype.onCollect = function () {
        this.startCollect();
    };
    CollectSoldierPop.prototype.onGet = function () {
        var num = this.rewards[this.curDisIndex];
        // GameApp[`soldier${this.curSoldierIndex}Num`] += num;
        // let str:string = this.curSoldierIndex == 1?"Bowmen":this.curSoldierIndex == 2?"Infantry":"cavalry";
        // UserTips.inst().showTips("Get"+str+"x"+num);
        var card = GlobalFun.getCardsFromType(CardType.soldier, true);
        var length = Math.floor(Math.random() * card.length);
        var card_id = card[length].insId;
        var card_num = card[length].ownNum + num;
        GlobalFun.refreshCardData(card_id, { ownNum: card_num });
        UserTips.inst().showTips("Get" + card[length].name + "x" + num);
        this.stopCollect();
    };
    CollectSoldierPop.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.collectGroup).to({ verticalCenter: -700 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.collectGroup);
            ViewManager.inst().close(CollectSoldierPop);
        }, this);
    };
    CollectSoldierPop.prototype.resultCollect = function () {
        //Ending conscription
        var index = parseInt(LocalStorageEnum.COLLECT_SOLDIER_TYPE);
        var dis = parseInt(LocalStorageEnum.COLLECT_SOLDIER_DIS);
        var soldierNum = dis * (this.collectSoldier + ((Math.random() * 15) >> 0));
        GameApp["soldier" + index + "Num"] += soldierNum;
        UserTips.inst().showTips("Get soldiersx" + soldierNum);
        egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_TYPE, "");
        egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_DIS, "");
        egret.localStorage.setItem(LocalStorageEnum.collectTime, "");
    };
    CollectSoldierPop.prototype.onTimer = function () {
        if (this.collectState) {
            //Need to show progress
            var endTime = egret.localStorage.getItem(LocalStorageEnum.collectTime);
            if (endTime && parseInt(endTime) > new Date().getTime()) {
                var offValue = parseInt(endTime) - new Date().getTime();
                var timestr = DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
                //Show on text
                this.timeLab.text = timestr;
            }
            else {
                this.timer.stop();
                this.collectBtn.visible = false;
                this.collect_text.visible = false;
                this.getBtn.visible = true;
            }
        }
        if (this.cdstate) {
            var endTime = egret.localStorage.getItem(LocalStorageEnum.COLLECT_CD_TIME);
            if (endTime && parseInt(endTime) > new Date().getTime()) {
                var offValue = parseInt(endTime) - new Date().getTime();
                var timestr = DateUtils.getFormatBySecond(offValue / 1000, DateUtils.TIME_FORMAT_3);
                //Show on text
                this.timeLab.text = "Next draft:" + timestr;
            }
            else {
                this.timer.stop();
                this.cdstate = false;
                egret.localStorage.setItem(LocalStorageEnum.COLLECT_CD_TIME, "");
                this.showPageNormal();
            }
        }
    };
    /**Display pagecdstate */
    CollectSoldierPop.prototype.showPageCd = function () {
        this.type_1.touchEnabled = false;
        this.type_2.touchEnabled = false;
        this.type_3.touchEnabled = false;
        this.dis_1.touchEnabled = false;
        this.dis_3.touchEnabled = false;
        this.dis_8.touchEnabled = false;
        for (var i = 1; i <= 6; i++) {
            this["rect_" + i].touchEnabled = false;
        }
        this.timeLab.visible = true;
        this.collectBtn.visible = true;
        this.collect_text.visible = true;
        this.collect_text.text = "conscription";
        this.getBtn.visible = false;
        this.collectBtn.touchEnabled = false;
        GlobalFun.filterToGrey(this.collectBtn);
    };
    /**Display receiving status */
    CollectSoldierPop.prototype.showGetPage = function () {
        this.type_1.touchEnabled = false;
        this.type_2.touchEnabled = false;
        this.type_3.touchEnabled = false;
        this.dis_1.touchEnabled = false;
        this.dis_3.touchEnabled = false;
        this.dis_8.touchEnabled = false;
        for (var i = 1; i <= 6; i++) {
            this["rect_" + i].touchEnabled = false;
        }
        this.timeLab.visible = false;
        this.collectBtn.visible = false;
        this.collect_text.visible = false;
        this.getBtn.visible = true;
    };
    /**Display page normal status */
    CollectSoldierPop.prototype.showPageNormal = function () {
        this.type_1.touchEnabled = true;
        this.type_2.touchEnabled = true;
        this.type_3.touchEnabled = true;
        this.dis_1.touchEnabled = true;
        this.dis_3.touchEnabled = true;
        this.dis_8.touchEnabled = true;
        for (var i = 1; i <= 6; i++) {
            this["rect_" + i].touchEnabled = true;
        }
        this.timeLab.visible = false;
        this.collectBtn.visible = true;
        this.collect_text.visible = true;
        this.getBtn.visible = false;
        this.collect_text.text = "conscription";
        this.collectBtn.touchEnabled = true;
        GlobalFun.clearFilters(this.collectBtn);
    };
    /**Show conscription status */
    CollectSoldierPop.prototype.showPageCollect = function () {
        this.type_1.touchEnabled = false;
        this.type_2.touchEnabled = false;
        this.type_3.touchEnabled = false;
        this.dis_1.touchEnabled = false;
        this.dis_3.touchEnabled = false;
        this.dis_8.touchEnabled = false;
        for (var i = 1; i <= 6; i++) {
            this["rect_" + i].touchEnabled = false;
        }
        this.timeLab.visible = true;
        this.collectBtn.visible = true;
        this.collect_text.visible = true;
        this.getBtn.visible = false;
        this.collect_text.text = "Conscription";
        this.collectBtn.touchEnabled = false;
        GlobalFun.clearFilters(this.collectBtn);
    };
    /**Start conscription */
    CollectSoldierPop.prototype.startCollect = function () {
        var cost = this.singleCost * this.curDisIndex;
        if (cost > GameApp.goods) {
            UserTips.inst().showTips("Insufficient supplies");
            return;
        }
        GameApp.goods -= cost;
        MessageManager.inst().dispatch(CustomEvt.COLLECT_START);
        var tolTime = new Date().getTime() + this.singleTime * this.curDisIndex * 1000;
        egret.localStorage.setItem(LocalStorageEnum.collectTime, tolTime.toString());
        egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_TYPE, this.curSoldierIndex.toString());
        egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_DIS, this.curDisIndex.toString());
        this.collectState = true;
        this.timer.start();
        this.showPageCollect();
    };
    /**Ending conscription */
    CollectSoldierPop.prototype.stopCollect = function () {
        // this.timer.stop();
        this.collectState = false;
        var nextTime = new Date().getTime() + this.nextTime;
        //It also needs to be stored when timing outside
        egret.localStorage.setItem(LocalStorageEnum.COLLECT_CD_TIME, nextTime.toString());
        egret.localStorage.setItem(LocalStorageEnum.collectTime, "");
        this.cdstate = true;
        MessageManager.inst().dispatch(CustomEvt.COLLECT_END);
        this.timer.start();
        this.showPageCd();
    };
    CollectSoldierPop.prototype.close = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeTouchEvent(this.collectBtn, this.onCollect);
        this.removeTouchEvent(this.getBtn, this.onGet);
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
    };
    return CollectSoldierPop;
}(BaseEuiView));
__reflect(CollectSoldierPop.prototype, "CollectSoldierPop");
ViewManager.inst().reg(CollectSoldierPop, LayerManager.UI_Pop);
//# sourceMappingURL=CollectSoldierPop.js.map