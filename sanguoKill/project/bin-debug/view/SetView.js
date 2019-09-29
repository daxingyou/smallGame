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
var SetView = (function (_super) {
    __extends(SetView, _super);
    function SetView() {
        return _super.call(this) || this;
    }
    SetView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.num1 = this.setView_lianxian.x;
        this.num2 = this.setView_lianxian.x + this.setView_lianxian.width;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
    };
    /**响应Touch*/
    SetView.prototype.touchHandler = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_TAP) {
            switch (evt.target) {
                case this.setView_label4:
                    ViewManager.inst().open(SelectFightView);
                    ViewManager.inst().close(SetView);
                    break;
            }
        }
        else if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
            switch (evt.target) {
                case this.setView_niu:
                    if ((this.num1 <= this.setView_niu.x) && this.setView_niu.x <= this.num2) {
                        this.setView_niu.x = evt.stageX;
                    }
                    else {
                        if (this.num1 >= this.setView_niu.x) {
                            this.setView_niu.x = this.num1;
                        }
                        else if (this.num2 <= this.setView_niu.x) {
                            this.setView_niu.x = this.num2;
                        }
                    }
                    console.log("aaa");
                    break;
            }
        }
    };
    SetView.prototype.close = function () {
    };
    return SetView;
}(BaseEuiView));
__reflect(SetView.prototype, "SetView");
ViewManager.inst().reg(SetView, LayerManager.UI_Main);
//# sourceMappingURL=SetView.js.map