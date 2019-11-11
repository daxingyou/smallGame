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
 * 营地
 * 弓兵 。骑兵 。盾甲兵
 */
var SoldierCamp = (function (_super) {
    __extends(SoldierCamp, _super);
    function SoldierCamp() {
        var _this = _super.call(this) || this;
        //单兵加速消耗黄金
        _this.quickCost = 2;
        //生产单个兵需要的时间
        _this.costTime = 3;
        _this.type = -1;
        return _this;
    }
    SoldierCamp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.Tween.get(this.content).to({ verticalCenter: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            GlobalFun.guideToNext(_this.productBtn, 115, 31);
        });
        this.type = param[0].type;
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.attr = SoldierAttrCfg.attrCfg[param[0].type];
        this.titleImg.source = "camp_bg_" + param[0].type + "_png";
        this.modelImg.source = "model_" + param[0].type + "_png";
        this.totalImg.source = "desc_" + param[0].type + "_png";
        // if(param[0].type == SoldierType.ARROW){
        // 	this.titleBg.source = "弓兵营";
        // }else if(param[0].type == SoldierType.QI){
        // 	this.titleBg.source = "骑兵营";
        // }else{
        // 	this.titleBg.source = "盾甲兵营";
        // }
        this.hpLab.text = this.attr.hp.toString();
        this.atkLab.text = this.attr.atk.toString();
        this.zhiliLab.text = this.attr.brains.toString();
        this.soldierNum.text = GameApp.inst()["soldier_" + param[0].type];
        this.productNumLab.text = GameApp.inst()["product_" + this.type].toString();
        this.quickCostLab.text = (this.quickCost * GameApp.inst()["product_" + this.type]).toString();
        this.showGroup.visible = false;
        this.addTouchEvent(this.productBtn, this.onProduct, true);
        this.addTouchEvent(this.reduceBtn, this.onReduce, true);
        this.addTouchEvent(this.quickBtn, this.onQuick, true);
        this.refreshData();
        this.progressBar.mask = this.progressMask;
        this.progressMask.width = 0;
        // this.watcher = eui.Binding.bindHandler(GameApp,[`m_product_${this.type}`],this.onSoldierProduct,this);
        this.watcher = eui.Binding.bindHandler(GameApp, ["m_product_" + this.type], this.productWatcher, this);
        if (this.type == SoldierType.ARROW) {
            MessageManager.inst().addListener(CustomEvt.PROGRESS_0, this.onSoldierProduct, this);
        }
        else if (this.type == SoldierType.QI) {
            MessageManager.inst().addListener(CustomEvt.PROGRESS_1, this.onSoldierProduct, this);
        }
        else {
            MessageManager.inst().addListener(CustomEvt.PROGRESS_2, this.onSoldierProduct, this);
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_TRAIN_SOLDIER, this.onTrainSoldier, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLOSE_SOLDIER, this.onCloseSolder, this);
    };
    SoldierCamp.prototype.onCloseSolder = function () {
        this.onReturn();
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            MessageManager.inst().dispatch(CustomEvt.GUIDE_TO_NEXT);
        }, 600);
    };
    SoldierCamp.prototype.onTrainSoldier = function () {
        this.onProduct();
        GlobalFun.guideToNext(this.returnBtn, 50, 50);
    };
    SoldierCamp.prototype.productWatcher = function (value) {
        if (value) {
            this.showGroup.visible = true;
            this.soldierImg.source = "soldier_" + this.type + "_png";
        }
        else {
            this.showGroup.visible = false;
            this.soldierImg.source = "no_soldier_png";
        }
    };
    SoldierCamp.prototype.onSoldierProduct = function (evt) {
        var time = evt.data.time;
        // egret.Tween.removeTweens(this.progressMask);
        this.progressMask.width = (time / this.costTime) * 200;
        // let tarW:number = this.progressMask.width + (1/this.costTime)*182;
        if (this.progressMask.width >= 200) {
            this.progressMask.width = 0;
        }
        this.refreshData();
    };
    //生产
    SoldierCamp.prototype.onProduct = function () {
        var goodNum = (GameApp.inst()["product_" + this.type]);
        var goodCost = ((goodNum ? goodNum : 1) * this.attr.goodCost);
        var woodNum = GameApp.inst()["product_" + this.type];
        var woodCost = ((woodNum ? woodNum : 1) * this.attr.woodCost);
        var feNum = GameApp.inst()["product_" + this.type];
        var kuangCost = ((feNum ? feNum : 1) * this.attr.feCost);
        if (GameApp.m_good < goodCost) {
            UserTips.inst().showTips("粮草不足");
            return;
        }
        if (GameApp.m_wood < woodCost) {
            UserTips.inst().showTips("木材不足");
            return;
        }
        if (GameApp.m_fe < kuangCost) {
            UserTips.inst().showTips("矿产不足");
            return;
        }
        GameApp.inst().good -= goodCost;
        GameApp.inst().wood -= woodCost;
        GameApp.inst().fe -= kuangCost;
        GameApp.inst()["product_" + this.type] += 1;
        this.refreshData();
    };
    //减少
    SoldierCamp.prototype.onReduce = function () {
        if (GameApp.inst()["product_" + this.type] <= 0) {
            UserTips.inst().showTips("当前未有士兵在生产");
            return;
        }
        GameApp.inst()["product_" + this.type] -= 1;
        this.refreshData();
    };
    /**加速 */
    SoldierCamp.prototype.onQuick = function () {
        egret.Tween.removeTweens(this.progressMask);
        this.progressMask.width = 0;
        if (!GameApp.inst()["product_" + this.type]) {
            UserTips.inst().showTips("当前未有士兵在生产");
            return;
        }
        var cost = GameApp.inst()["product_" + this.type] * this.quickCost;
        if (cost > GameApp.inst().gold) {
            UserTips.inst().showTips("黄金不足");
            return;
        }
        GameApp.inst().gold -= cost;
        GameApp.inst()["soldier_" + this.type] += GameApp.inst()["product_" + this.type];
        UserTips.inst().showTips("生产完成,获得士兵x" + GameApp.inst()["product_" + this.type]);
        GameApp.inst()["product_" + this.type] = 0;
        this.refreshData();
    };
    /**刷新界面数据 */
    SoldierCamp.prototype.refreshData = function () {
        this.productNumLab.text = GameApp.inst()["product_" + this.type].toString();
        this.quickCostLab.text = (this.quickCost * GameApp.inst()["product_" + this.type]).toString();
        this.goodCostLab.text = (GameApp.inst()["product_" + this.type] * this.attr.goodCost).toString();
        this.woodCostLab.text = (GameApp.inst()["product_" + this.type] * this.attr.woodCost).toString();
        this.kuangCostLab.text = (GameApp.inst()["product_" + this.type] * this.attr.feCost).toString();
        this.soldierNum.text = GameApp.inst()["soldier_" + this.type].toString();
    };
    SoldierCamp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ verticalCenter: -600 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(SoldierCamp);
        });
    };
    SoldierCamp.prototype.close = function () {
        if (this.watcher) {
            this.watcher.unwatch();
        }
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.productBtn, this.onProduct);
        this.removeTouchEvent(this.reduceBtn, this.onReduce);
        this.removeTouchEvent(this.quickBtn, this.onQuick);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_TRAIN_SOLDIER, this.onTrainSoldier, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLOSE_SOLDIER, this.onCloseSolder, this);
        if (this.type == SoldierType.ARROW) {
            MessageManager.inst().removeListener(CustomEvt.PROGRESS_0, this.onSoldierProduct, this);
        }
        else if (this.type == SoldierType.QI) {
            MessageManager.inst().removeListener(CustomEvt.PROGRESS_1, this.onSoldierProduct, this);
        }
        else {
            MessageManager.inst().removeListener(CustomEvt.PROGRESS_2, this.onSoldierProduct, this);
        }
    };
    return SoldierCamp;
}(BaseEuiView));
__reflect(SoldierCamp.prototype, "SoldierCamp");
ViewManager.inst().reg(SoldierCamp, LayerManager.UI_Pop);
//# sourceMappingURL=SoldierCamp.js.map