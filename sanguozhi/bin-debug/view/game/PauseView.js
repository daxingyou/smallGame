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
var PauseView = (function (_super) {
    __extends(PauseView, _super);
    function PauseView() {
        return _super.call(this) || this;
    }
    PauseView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.touchTap);
        this.init();
    };
    PauseView.prototype.close = function () {
    };
    PauseView.prototype.init = function () {
        if (GameCfg.gameStart) {
            this.tip0_label.text = "正在战斗中，是否停止战斗？";
            this.tip1_label.visible = true;
        }
    };
    PauseView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.cancel:
                MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, this);
                ViewManager.inst().close(PauseView);
                break;
            case this.confirm:
                ViewManager.inst().close(GameView);
                ViewManager.inst().close(PauseView);
                ViewManager.inst().open(GameMainView);
                break;
        }
    };
    return PauseView;
}(BaseEuiView));
__reflect(PauseView.prototype, "PauseView");
ViewManager.inst().reg(PauseView, LayerManager.UI_Pop);
//# sourceMappingURL=PauseView.js.map