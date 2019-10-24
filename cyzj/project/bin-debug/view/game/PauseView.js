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
        this.any = param[0];
        this.addTouchEvent(this.btn_0, this.touchYes);
        this.addTouchEvent(this.btn_1, this.touchNo);
    };
    PauseView.prototype.close = function () {
        this.removeTouchEvent(this.btn_0, this.touchYes);
        this.removeTouchEvent(this.btn_1, this.touchNo);
    };
    PauseView.prototype.touchYes = function () {
        this.rest();
        ViewManager.inst().close(this.any);
        ViewManager.inst().close(PauseView);
        if (GameConfig.fight_state == "adventure") {
            MessageManager.inst().dispatch("ADVENTURE_OVER");
        }
    };
    PauseView.prototype.touchNo = function () {
        MessageManager.inst().dispatch("GAME_START", this);
        ViewManager.inst().close(PauseView);
    };
    PauseView.prototype.rest = function () {
        GameConfig.monsterFig = [];
        GameConfig.playerFig = [];
        GameConfig.monster_qian = [];
        GameConfig.monster_zhong = [];
        GameConfig.monster_hou = [];
        GameConfig.player_qian = [];
        GameConfig.player_hou = [];
        AdventureConfig.itemAny = [];
    };
    return PauseView;
}(BaseEuiView));
__reflect(PauseView.prototype, "PauseView");
ViewManager.inst().reg(PauseView, LayerManager.UI_Pop);
//# sourceMappingURL=PauseView.js.map