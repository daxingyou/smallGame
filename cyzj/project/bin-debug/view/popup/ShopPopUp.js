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
var ShopPopUp = (function (_super) {
    __extends(ShopPopUp, _super);
    function ShopPopUp() {
        return _super.call(this) || this;
    }
    ShopPopUp.prototype.open = function () {
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
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = ShopItem;
        this.list.dataProvider = this.arrayCollect;
        this.scroller.viewport = this.list;
        this.scroller.verticalScrollBar.autoVisibility = false;
        this.scroller.verticalScrollBar.visible = false;
        var dataArr = [];
        var costs = [100, 150, 260, 375, 470, 580, 635, 765, 900];
        for (var i = 0; i < 9; i++) {
            var id = 10000 + i;
            var itemCfg = ItemCfg.itemCfg[id];
            var obj = {
                icon: id + "_png",
                name: itemCfg.name,
                id: id,
                cost: costs[i],
                num: 5
            };
            dataArr.push(obj);
        }
        this.arrayCollect.source = dataArr;
    };
    ShopPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(ShopPopUp);
        }, this);
    };
    ShopPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        for (var i = 0; i < this.list.$children.length; i++) {
            var item = this.list.$children[i];
            if (item) {
                item.dispose();
            }
        }
    };
    return ShopPopUp;
}(BaseEuiView));
__reflect(ShopPopUp.prototype, "ShopPopUp");
ViewManager.inst().reg(ShopPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=ShopPopUp.js.map