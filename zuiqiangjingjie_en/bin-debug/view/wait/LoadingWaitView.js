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
var LoadingWaitView = (function (_super) {
    __extends(LoadingWaitView, _super);
    function LoadingWaitView() {
        return _super.call(this) || this;
    }
    LoadingWaitView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.progress_img.mask = this.progress_mask;
        this._arg = param[0].arg;
        this._callback = param[0].call;
        egret.Tween.get(this.progress_mask)
            .to({ scaleY: 1 }, 4000);
        egret.Tween.get(this.eff_img)
            .wait(4000)
            .to({ alpha: 1 }, 300)
            .call(this._callback, this._arg);
    };
    LoadingWaitView.prototype.close = function () {
    };
    return LoadingWaitView;
}(BaseEuiView));
__reflect(LoadingWaitView.prototype, "LoadingWaitView");
ViewManager.inst().reg(LoadingWaitView, LayerManager.UI_Pop);
//# sourceMappingURL=LoadingWaitView.js.map