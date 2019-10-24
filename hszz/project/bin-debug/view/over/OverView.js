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
var OverView = (function (_super) {
    __extends(OverView, _super);
    function OverView() {
        var _this = _super.call(this) || this;
        _this.hp_max = 1000;
        return _this;
    }
    OverView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.state = param[0].state;
        this.hp = param[0].hp;
        this.init();
        this.addTouchEvent(this.over_btn, this.touchTap);
    };
    OverView.prototype.close = function () {
        this.removeTouchEvent(this.over_btn, this.touchTap);
    };
    OverView.prototype.init = function () {
        var stars_num;
        if (this.hp > this.hp_max * (1 / 3))
            stars_num = 1;
        else if (this.hp > this.hp_max * (2 / 3))
            stars_num = 2;
        else if (this.hp > this.hp_max * (3 / 4))
            stars_num = 3;
        for (var i = 0; i < stars_num; i++) {
            this["star_" + i].visible = true;
        }
        this.over_bg.source = this.state + "_bg_png";
        switch (this.state) {
            case "win":
                for (var i = 0; i < 3; i++) {
                    this["star_bg" + i].source = "win_stars_0_png";
                }
                this.huizhang_num.text = "徽章x" + 100;
                GameApp.medal += 100;
                break;
            case "failure":
                for (var i = 0; i < 3; i++) {
                    this["star_bg" + i].source = "failure_stars_png";
                }
                this.huizhang_num.text = "徽章x" + 500;
                GameApp.medal += 500;
                break;
        }
    };
    OverView.prototype.touchTap = function () {
        ViewManager.inst().close(BattleView);
        ViewManager.inst().close(OverView);
    };
    return OverView;
}(BaseEuiView));
__reflect(OverView.prototype, "OverView");
ViewManager.inst().reg(OverView, LayerManager.UI_Pop);
//# sourceMappingURL=OverView.js.map