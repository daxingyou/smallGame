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
/**合成界面 */
var HCPopUp = (function (_super) {
    __extends(HCPopUp, _super);
    // private noDataLab:eui.Label;
    function HCPopUp() {
        return _super.call(this) || this;
    }
    HCPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.hcCondition = [[10000, 10001, 10002], [10003, 10004, 10005], [10006, 10007, 10008], [10000, 10000, 10000], [10001, 10001, 10001], [10002, 10002, 10002],
            [10003, 10003, 10003], [10004, 10004, 10004], [10005, 10005, 10005]];
        this.hcReward = [10009, 10010, 10011, 10003, 10004, 10005, 10006, 10007, 10008];
        this.content.scaleX = this.content.scaleY = 0;
        this.content.alpha = 0;
        egret.Tween.get(this.content).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.addTouchEvent(this.hcBtn, this.onHc, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = BagItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        var metarisData = GlobalFun.getMetarisFromBag(0);
        this.item1.source = "";
        this.item2.source = "";
        this.item3.source = "";
        this.hc_item.source = "";
        this.hc_item.alpha = 0.5;
        this.hcBtn.visible = false;
        this.refreshList();
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    HCPopUp.prototype.refreshList = function () {
        var dataArr = [];
        for (var i = 0; i < 9; i++) {
            var itemCfg = ItemCfg.itemCfg[10000 + i];
            var obj = {
                icon: 10000 + i + "_png",
                id: 10000 + i,
                name: itemCfg.name,
                num: 0,
            };
            dataArr.push(obj);
        }
        var metarisData = GlobalFun.getMetarisFromBag(0);
        for (var i = 0; i < metarisData.length; i++) {
            var itemCfg = ItemCfg.itemCfg[metarisData[i].id];
            for (var j = 0; j < dataArr.length; j++) {
                if (dataArr[j].id == metarisData[i].id) {
                    dataArr[j].num = metarisData[i].num;
                    break;
                }
            }
        }
        // this.noDataLab.visible = !dataArr.length;
        this.arrayCollect.source = dataArr;
        this.list.dataProviderRefreshed();
    };
    HCPopUp.prototype.onTouchTap = function (evt) {
        switch (evt.target) {
            case this.item1:
                if (this.pos1Data) {
                    var itemIndex = this.pos1Data.index;
                    var bagitem = this.list.getChildAt(itemIndex);
                    bagitem.refreshNum(bagitem.num + 1);
                    this.pos1Data = null;
                    this.item1.source = "";
                    this.hcBtn.visible = false;
                }
                break;
            case this.item2:
                if (this.pos2Data) {
                    var itemIndex = this.pos2Data.index;
                    var bagitem = this.list.getChildAt(itemIndex);
                    bagitem.refreshNum(bagitem.num + 1);
                    this.pos2Data = null;
                    this.item2.source = "";
                    this.hcBtn.visible = false;
                }
                break;
            case this.item3:
                if (this.pos3Data) {
                    this.prevItem.refreshNum(this.prevItem.num + 1);
                    this.item3.source = "";
                    this.prevItem = null;
                    this.pos3Data = null;
                    this.hcBtn.visible = false;
                }
                break;
        }
    };
    HCPopUp.prototype.onItemTap = function (evt) {
        var bagitem = this.list.getChildAt(evt.itemIndex);
        if (bagitem.num <= 0) {
            UserTips.inst().showTips("材料不足");
            return;
        }
        if (this.pos1Data && this.pos2Data && this.pos3Data) {
            if (this.prevItem) {
                this.prevItem.refreshNum(this.prevItem.num + 1);
            }
        }
        if (!this.pos1Data) {
            this.pos1Data = evt.item;
            this.item1.source = this.pos1Data.id + "_png";
            this.pos1Data["index"] = evt.itemIndex;
        }
        else if (!this.pos2Data) {
            this.pos2Data = evt.item;
            this.item2.source = this.pos2Data.id + "_png";
            this.pos2Data["index"] = evt.itemIndex;
        }
        else {
            this.prevItem = bagitem;
            this.pos3Data = evt.item;
            this.pos3Data["index"] = evt.itemIndex;
            this.item3.source = this.pos3Data.id + "_png";
        }
        bagitem.refreshNum(bagitem.num - 1);
        if (this.pos1Data && this.pos2Data && this.pos3Data) {
            for (var key in this.hcCondition) {
                var itemCondition = this.hcCondition[key];
                var arr = [];
                arr = arr.concat(itemCondition);
                var condition1 = !!~arr.indexOf(this.pos1Data.id);
                if (condition1) {
                    arr.splice(arr.indexOf(this.pos1Data.id), 1);
                }
                var condition2 = !!~arr.indexOf(this.pos2Data.id);
                if (condition2) {
                    arr.splice(arr.indexOf(this.pos2Data.id), 1);
                }
                var condition3 = !!~arr.indexOf(this.pos3Data.id);
                if (condition1 && condition2 && condition3) {
                    //满足合成条件
                    this.hcBtn.visible = true;
                    this.curHcCondition = parseInt(key);
                    this.hc_item.source = this.hcReward[key] + "_png";
                    return;
                }
            }
            this.hc_item.source = "";
            this.curHcCondition = null;
            this.hcBtn.visible = false;
        }
    };
    /**合成 */
    HCPopUp.prototype.onHc = function () {
        var _this = this;
        if (!this.pos1Data || !this.pos2Data || !this.pos3Data) {
            UserTips.inst().showTips("未满足合成条件");
            return;
        }
        var rewardId = this.hcReward[this.curHcCondition];
        GlobalFun.addItemToBag(rewardId, 1);
        var itemcfg = ItemCfg.itemCfg[rewardId];
        var cost1 = this.pos1Data.id;
        GlobalFun.removeItemFromBag(cost1, 1);
        var cost2 = this.pos2Data.id;
        GlobalFun.removeItemFromBag(cost2, 1);
        var cost3 = this.pos3Data.id;
        GlobalFun.removeItemFromBag(cost3, 1);
        UserTips.inst().showTips("\u5408\u6210\u6750\u6599\u6210\u529F,\u83B7\u5F97<font color=0x00ff00>" + itemcfg.name + "</font>x1");
        this.refreshList();
        var qianghuaMc = new MovieClip();
        this.content.addChild(qianghuaMc);
        qianghuaMc.playFile(EFFECT + "qianghua", 2, null, true, "action");
        qianghuaMc.x = this.hc_item.x + 37;
        qianghuaMc.y = this.hc_item.y + 42;
        egret.Tween.get(this.hc_item).to({ alpha: 1 }, 600).wait(100).call(function () {
            _this.hc_item.source = "";
            egret.Tween.removeTweens(_this.hc_item);
            _this.hc_item.alpha = 0.5;
        }, this);
        this.item1.source = "";
        this.item2.source = "";
        this.item3.source = "";
        this.pos1Data = null;
        this.pos2Data = null;
        this.pos3Data = null;
        this.curHcCondition = null;
        this.prevItem = null;
    };
    HCPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 400, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(HCPopUp);
        }, this);
    };
    HCPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.removeTouchEvent(this.hcBtn, this.onHc);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    return HCPopUp;
}(BaseEuiView));
__reflect(HCPopUp.prototype, "HCPopUp");
ViewManager.inst().reg(HCPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=HCPopUp.js.map