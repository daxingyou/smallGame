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
var BagPopUp = (function (_super) {
    __extends(BagPopUp, _super);
    function BagPopUp() {
        return _super.call(this) || this;
    }
    BagPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.content.scaleX = this.content.scaleY = 0;
        this.content.alpha = 0;
        egret.Tween.get(this.content).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = BagItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        var bagDataStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
        var bagDaga = [];
        if (bagDataStr) {
            bagDaga = JSON.parse(bagDataStr);
        }
        var dataArr = [];
        for (var i = 0; i < bagDaga.length; i++) {
            var itemCfg = ItemCfg.itemCfg[bagDaga[i].id];
            var obj = {
                icon: bagDaga[i].id + "_png",
                num: bagDaga[i].num,
                name: itemCfg.name,
                desc: itemCfg.desc
            };
            dataArr.push(obj);
        }
        this.arrayCollect.source = dataArr;
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    BagPopUp.prototype.onItemTap = function (evt) {
        this.descLab.text = evt.item.desc;
    };
    BagPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(BagPopUp);
        }, this);
    };
    BagPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return BagPopUp;
}(BaseEuiView));
__reflect(BagPopUp.prototype, "BagPopUp");
ViewManager.inst().reg(BagPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=BagPopUp.js.map