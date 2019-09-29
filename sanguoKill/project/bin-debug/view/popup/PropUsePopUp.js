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
var PropUsePopUp = (function (_super) {
    __extends(PropUsePopUp, _super);
    function PropUsePopUp() {
        return _super.call(this) || this;
    }
    PropUsePopUp.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.arrayCollect = new eui.ArrayCollection();
        this.curUseCardAttr = param[0].attr;
        this.list.itemRenderer = PropUseItem;
        this.list.dataProvider = this.arrayCollect;
        var arr = [];
        var deadstate = [];
        if (this.curUseCardAttr.forTar == Camp.owner) {
            //作用与己方
            this.titleLab.text = "请选择一员大将";
            arr = GlobalFun.getTestRoleData();
            deadstate = deadstate.concat(GameApp.ownDeadState);
        }
        else {
            this.titleLab.text = "请选择一名敌方";
            arr = GlobalFun.getEnemyTestData();
            deadstate = deadstate.concat(GameApp.levelDeadState);
        }
        var dataArr = [];
        var first = false;
        for (var i = 0; i < arr.length; i++) {
            var obj = {
                icon: arr[i].icon,
                isDead: !!deadstate[i],
                focus: false
            };
            if (this.curUseCardAttr.forTar == Camp.anamy) {
                obj.icon = LEVEL_ICON + "level_" + arr[i].level + "_" + i + ".jpg";
            }
            if (!first && !obj.isDead) {
                first = true;
                obj.focus = true;
            }
            dataArr.push(obj);
        }
        var newarr = [dataArr[1], dataArr[0], dataArr[2]];
        this.arrayCollect.source = newarr;
        this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        var self = this;
        var timeout = setTimeout(function () {
            self.selectItem = self.list.getChildAt(0);
        }, 300);
    };
    PropUsePopUp.prototype.onItemTap = function (evt) {
        if (this.selectItem) {
            this.selectItem.focus = false;
        }
        var item = this.list.getChildAt(evt.itemIndex);
        if (item) {
            item.focus = true;
            this.selectItem = item;
        }
        MessageManager.inst().dispatch(CustomEvt.PROP_USE, { attr: this.curUseCardAttr, tarIndex: evt.itemIndex });
        ViewManager.inst().close(PropPopUp);
        this.onReturn();
    };
    PropUsePopUp.prototype.onReturn = function () {
        ViewManager.inst().close(PropUsePopUp);
    };
    PropUsePopUp.prototype.close = function () {
        this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReturn, this);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return PropUsePopUp;
}(BaseEuiView));
__reflect(PropUsePopUp.prototype, "PropUsePopUp");
ViewManager.inst().reg(PropUsePopUp, LayerManager.UI_Pop);
var PropUseItem = (function (_super) {
    __extends(PropUseItem, _super);
    function PropUseItem() {
        var _this = _super.call(this) || this;
        _this._isDead = false;
        _this.skinName = "PropUseItemSkin";
        return _this;
    }
    PropUseItem.prototype.dataChanged = function () {
        this.roleImg.source = this.data.icon;
        this.focus = this.data.focus;
        this._isDead = this.data.isDead;
    };
    Object.defineProperty(PropUseItem.prototype, "isDead", {
        get: function () {
            return this._isDead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropUseItem.prototype, "focus", {
        set: function (value) {
            this.focusImg.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return PropUseItem;
}(eui.ItemRenderer));
__reflect(PropUseItem.prototype, "PropUseItem");
//# sourceMappingURL=PropUsePopUp.js.map