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
var PropPopUp = (function (_super) {
    __extends(PropPopUp, _super);
    function PropPopUp() {
        return _super.call(this) || this;
    }
    PropPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.content.scaleX = this.content.scaleY = 0;
        egret.Tween.get(this.content).to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureHandler, this);
        this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = PropItem;
        this.list.dataProvider = this.arrayCollect;
        var propArr = GlobalFun.getBagData(2);
        this.arrayCollect.source = propArr;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        var self = this;
        var timeout = setTimeout(function () {
            if (propArr && propArr.length) {
                self.curSelectProp = self.list.getChildAt(0);
            }
        }, 300);
    };
    PropPopUp.prototype.onItemTap = function (evt) {
        var len = this.list.$children.length;
        if (!len) {
            return;
        }
        if (!this.curSelectProp) {
            this.curSelectProp = this.list.getChildAt(0);
        }
        if (this.curSelectProp) {
            this.curSelectProp.focus = false;
        }
        var curProp = this.list.getChildAt(evt.itemIndex);
        if (curProp) {
            curProp.focus = true;
            this.curSelectProp = curProp;
        }
    };
    PropPopUp.prototype.onSureHandler = function (evt) {
        if (!this.curSelectProp) {
            UserTips.inst().showTips("未选择锦囊");
            return;
        }
        if (this.curSelectProp.attr.range == 1) {
            //作用范围是1的时候
            ViewManager.inst().open(PropUsePopUp, [{ attr: this.curSelectProp.attr }]);
        }
        else {
            //作用在全体
            MessageManager.inst().dispatch(CustomEvt.PROP_USE, { attr: this.curSelectProp.attr, tarIndex: -1 });
            this.onClose();
        }
    };
    PropPopUp.prototype.onClose = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(PropPopUp);
        }, this);
    };
    PropPopUp.prototype.close = function () {
        this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureHandler, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return PropPopUp;
}(BaseEuiView));
__reflect(PropPopUp.prototype, "PropPopUp");
ViewManager.inst().reg(PropPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=PropPopUp.js.map