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
var AboutView = (function (_super) {
    __extends(AboutView, _super);
    function AboutView() {
        return _super.call(this) || this;
    }
    AboutView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.back_btn, this.close);
    };
    AboutView.prototype.close = function () {
        ViewManager.inst().close(AboutView);
    };
    return AboutView;
}(BaseEuiView));
__reflect(AboutView.prototype, "AboutView");
ViewManager.inst().reg(AboutView, LayerManager.UI_Main);
//# sourceMappingURL=AboutView.js.map