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
var BagUp = (function (_super) {
    __extends(BagUp, _super);
    function BagUp() {
        return _super.call(this) || this;
    }
    BagUp.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.close_btn, this.close);
        this.addTouchEvent(this.btn, this.touchBtn);
    };
    BagUp.prototype.close = function () {
        ViewManager.inst().close(BagUp);
    };
    BagUp.prototype.touchBtn = function () {
        if (this.tip_label.text == "升级成功") {
            ViewManager.inst().close(BagUp);
            return;
        }
        if (GameApp.inst().gold >= 10000) {
            GameApp.inst().gold -= 10000;
            MessageManager.inst().dispatch("SHENG_JI_BAG");
            this.tip_label.text = "升级成功";
            // this.close();
        }
        else {
            this.tip_label.text = "银两不足";
        }
    };
    return BagUp;
}(BaseEuiView));
__reflect(BagUp.prototype, "BagUp");
ViewManager.inst().reg(BagUp, LayerManager.UI_Pop);
//# sourceMappingURL=BagUp.js.map