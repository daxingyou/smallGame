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
var ShopTip = (function (_super) {
    __extends(ShopTip, _super);
    function ShopTip() {
        return _super.call(this) || this;
    }
    ShopTip.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ShopTip.prototype.close = function () {
    };
    return ShopTip;
}(BaseEuiView));
__reflect(ShopTip.prototype, "ShopTip");
//# sourceMappingURL=ShopTip.js.map