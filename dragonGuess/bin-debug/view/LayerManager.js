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
var LayerManager = (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayerManager.prototype.iniaizlize = function (p) {
        p.addChild(LayerManager.UI_Main);
        LayerManager.UI_Main.touchThrough = true;
        p.addChild(LayerManager.UI_Pop);
        LayerManager.UI_Pop.touchThrough = true;
    };
    LayerManager.UI_Main = new eui.UILayer();
    LayerManager.UI_Pop = new eui.UILayer();
    return LayerManager;
}(BaseClass));
__reflect(LayerManager.prototype, "LayerManager");
//# sourceMappingURL=LayerManager.js.map