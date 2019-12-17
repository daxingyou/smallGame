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
var HpCom = (function (_super) {
    __extends(HpCom, _super);
    function HpCom() {
        var _this = _super.call(this) || this;
        _this.skinName = "HpComSkin";
        return _this;
    }
    HpCom.prototype.childrenCreated = function () {
        this.hpBar.mask = this.proMask;
    };
    HpCom.prototype.initData = function (flag, namestr) {
        this.nameLab.text = namestr;
        this.flag.source = flag;
    };
    HpCom.prototype.setData = function (c, v) {
        var curW = c / v * 101;
        this.proMask.width = curW;
    };
    return HpCom;
}(eui.Component));
__reflect(HpCom.prototype, "HpCom");
//# sourceMappingURL=HpCom.js.map