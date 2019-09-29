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
var StartView = (function (_super) {
    __extends(StartView, _super);
    function StartView() {
        return _super.call(this) || this;
    }
    StartView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btn, function () {
            ViewManager.inst().close(StartView);
            ViewManager.inst().open(ChapterView);
        }, true);
    };
    StartView.prototype.close = function () {
    };
    return StartView;
}(BaseEuiView));
__reflect(StartView.prototype, "StartView");
ViewManager.inst().reg(StartView, LayerManager.UI_Main);
//# sourceMappingURL=StartView.js.map