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
var RoleName = (function (_super) {
    __extends(RoleName, _super);
    function RoleName() {
        var _this = _super.call(this) || this;
        _this.skinName = "RoleNameSkin";
        return _this;
    }
    RoleName.prototype.dataChanged = function () {
        this.name_label.text = this.data;
    };
    return RoleName;
}(eui.ItemRenderer));
__reflect(RoleName.prototype, "RoleName");
//# sourceMappingURL=RoleName.js.map