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
var MainGameView = (function (_super) {
    __extends(MainGameView, _super);
    function MainGameView() {
        return _super.call(this) || this;
    }
    MainGameView.prototype.open = function () {
        this.showClose(MainGameView);
        this.arrayCollect = new eui.ArrayCollection();
        this.list.itemRenderer = MainGameViewItem;
        var dataPro = [{ img: "select_type_1_png", level: 1, title: "사막의 유적" },
            { img: "select_type_2_png", level: 2, title: "제국 입구" }, { img: "select_type_3_png", level: 3, title: "거북궁" }];
        this.arrayCollect.source = dataPro;
        this.list.dataProvider = this.arrayCollect;
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    MainGameView.prototype.onItemTap = function (evt) {
        var item = this.list.getChildAt(evt.itemIndex);
        GameData.level = item.level;
        ViewManager.ins().open(LevelSelectView, [{ level: item.level, title: item.title }], true);
    };
    MainGameView.prototype.close = function () {
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    };
    return MainGameView;
}(BaseEuiView));
__reflect(MainGameView.prototype, "MainGameView");
ViewManager.ins().reg(MainGameView, LayerManager.UI_Main);
//# sourceMappingURL=MainGameView.js.map