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
var HelpView = (function (_super) {
    __extends(HelpView, _super);
    function HelpView() {
        var _this = _super.call(this) || this;
        _this.removed = true;
        return _this;
    }
    HelpView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.showClose(HelpView);
    };
    HelpView.prototype.close = function () {
    };
    return HelpView;
}(BaseEuiView));
__reflect(HelpView.prototype, "HelpView");
ViewManager.ins().reg(HelpView, LayerManager.UI_Main);
//# sourceMappingURL=HelpView.js.map