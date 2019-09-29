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
var BagView = (function (_super) {
    __extends(BagView, _super);
    function BagView() {
        return _super.call(this) || this;
    }
    BagView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        GlobalFun.getBagList();
        // egret.localStorage.clear();
        this.init();
        this.addTouchEvent(this.up_bag, this.touchUp);
        this.addTouchEvent(this.close_btn, this.close);
        MessageManager.inst().addListener("ZHUANG_BEI_OVER", this.zhuangbeiover, this);
        MessageManager.inst().addListener("SHENG_JI_BAG", this.shengji, this);
        MessageManager.inst().addListener("HUAN_ZHUANG", this.huangzhuang, this);
        MessageManager.inst().addListener("BAG_UPDATE", this.bagUpdate, this);
    };
    BagView.prototype.bagUpdate = function () {
        for (var i = 0; i < ItemCfg.bagCfg.length; i++) {
            var tem;
            for (var j = i + 1; j < ItemCfg.bagCfg.length; j++) {
                if (ItemCfg.bagCfg[i] == null && ItemCfg.bagCfg[j] != null) {
                    tem = ItemCfg.bagCfg[j];
                    ItemCfg.bagCfg[j] = ItemCfg.bagCfg[i];
                    ItemCfg.bagCfg[i] = tem;
                }
            }
        }
        this.list.dataProvider = new eui.ArrayCollection(ItemCfg.bagCfg);
    };
    BagView.prototype.zhuangbeiover = function (evt) {
        ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(this.zhuangbei)] = evt.data;
        this.zhuangbei = null;
        MessageManager.inst().dispatch("BAG_UPDATE");
    };
    BagView.prototype.shengji = function () {
        for (var i = 0; i < 5; i++) {
            ItemCfg.bagCfg.push(null);
        }
        this.list.dataProvider = new eui.ArrayCollection(ItemCfg.bagCfg);
    };
    BagView.prototype.init = function () {
        this.goldLab.text = GameApp.inst().gold.toString();
        this.watcher = eui.Binding.bindProperty(GameApp.inst(), ["gold"], this.goldLab, "text");
        this.list.itemRenderer = BagItem_bg;
        this.list.dataProvider = new eui.ArrayCollection(ItemCfg.bagCfg);
    };
    BagView.prototype.huangzhuang = function (evt) {
        this.zhuangbei = evt.data;
    };
    BagView.prototype.touchUp = function () {
        ViewManager.inst().open(BagUp);
    };
    BagView.prototype.close = function () {
        GlobalFun.setBagList();
        if (this.watcher) {
            this.watcher.unwatch();
        }
        ;
        MessageManager.inst().removeListener("ZHUANG_BEI_OVER", this.zhuangbeiover, this);
        MessageManager.inst().removeListener("SHENG_JI_BAG", this.shengji, this);
        MessageManager.inst().removeListener("HUAN_ZHUANG", this.huangzhuang, this);
        MessageManager.inst().removeListener("BAG_UPDATE", this.bagUpdate, this);
        ViewManager.inst().close(BagView);
    };
    return BagView;
}(BaseEuiView));
__reflect(BagView.prototype, "BagView");
ViewManager.inst().reg(BagView, LayerManager.UI_Pop);
//# sourceMappingURL=BagView.js.map