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
var AdventureOverItem = (function (_super) {
    __extends(AdventureOverItem, _super);
    function AdventureOverItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "AdventureOverItemSkin";
        return _this;
    }
    AdventureOverItem.prototype.dataChanged = function () {
        this.img.source = this.data.id + "_png";
        this.num.text = this.data.name + "  x " + this.data.num;
    };
    return AdventureOverItem;
}(eui.ItemRenderer));
__reflect(AdventureOverItem.prototype, "AdventureOverItem");
//# sourceMappingURL=AdventureOverItem.js.map