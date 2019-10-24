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
var TextEffect = (function (_super) {
    __extends(TextEffect, _super);
    function TextEffect(_name, _color, _state) {
        var _this = _super.call(this) || this;
        _this.skinName = "TextEffectSkin";
        _this.label.text = _name;
        _this.label.textColor = _color;
        _this.state = _state;
        _this.init();
        return _this;
    }
    TextEffect.prototype.init = function () {
        switch (this.state) {
            case 0:
                this.y = -130;
                egret.Tween.get(this)
                    .to({ y: this.y - 50 }, 600)
                    .call(this.removeMySelf);
                break;
            case 1:
                this.label.size = 24;
                break;
        }
    };
    TextEffect.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return TextEffect;
}(BaseView));
__reflect(TextEffect.prototype, "TextEffect");
//# sourceMappingURL=TextEffect.js.map