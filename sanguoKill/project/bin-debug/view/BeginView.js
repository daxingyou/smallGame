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
var BeginView = (function (_super) {
    __extends(BeginView, _super);
    function BeginView() {
        return _super.call(this) || this;
    }
    BeginView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!egret.Capabilities.isMobile) {
            //分别监听外层容器的 MouseEvent
            this.beginView_btn1.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
            this.beginView_btn1.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
            this.beginView_btn1.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
            this.beginView_btn1.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        }
        else {
            this.beginView_btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseOver, this);
            this.beginView_btn1.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseOut, this);
        }
        this.beginView_name.visible = false;
        this.beginView_btn1.visible = false;
        this.beginView_login.visible = false;
        egret.setTimeout(this.onMove, this, 1000);
        this.beginView_btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    BeginView.prototype.onMove = function () {
        this.beginView_name.visible = true;
        this.beginView_name.scaleX = 1.5;
        this.beginView_name.scaleY = 1.5;
        egret.Tween.get(this.beginView_name).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
            this.beginView_btn1.visible = true;
            this.beginView_login.visible = true;
        }, this);
    };
    BeginView.prototype.onRollOver = function (e) {
        // console.log("roll over " + e.target.name + "  " + e.bubbles);
    };
    BeginView.prototype.onRollOut = function (e) {
        // console.log("roll out " + e.target.name + "  " + e.bubbles);
    };
    BeginView.prototype.onMouseOver = function (e) {
        // console.log("mouse over " + e.target.name + "  " + e.bubbles);
        this.beginView_btn1.source = RES.getRes("beginView_btn2_png");
    };
    BeginView.prototype.onMouseOut = function (e) {
        // console.log("mouse out " + e.target.name + "  " + e.bubbles);
        this.beginView_btn1.source = RES.getRes("beginView_btn1_png");
    };
    /**响应Touch*/
    BeginView.prototype.touchHandler = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_TAP) {
            switch (evt.target) {
                case this.beginView_btn1:
                    CommonLoading.inst().show(null, function () {
                        ViewManager.inst().open(SelectFightView);
                        if (egret.Capabilities.isMobile) {
                            if (!GameApp.show_video) {
                                GameApp.show_video = true;
                                //Main.play();
                            }
                        }
                        ViewManager.inst().close(BeginView);
                    }, this);
                    break;
            }
        }
    };
    BeginView.prototype.close = function () {
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollOver, this);
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollOut, this);
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
        this.beginView_btn1.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        this.beginView_btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
    };
    return BeginView;
}(BaseEuiView));
__reflect(BeginView.prototype, "BeginView");
ViewManager.inst().reg(BeginView, LayerManager.UI_Main);
//# sourceMappingURL=BeginView.js.map