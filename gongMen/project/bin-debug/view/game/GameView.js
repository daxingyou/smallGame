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
/**游戏 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.touchBool = true;
        return _this;
    }
    GameView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateDialogue();
        this.addTouchEvent(this, this.touchTap);
    };
    GameView.prototype.close = function () {
    };
    GameView.prototype.updateDialogue = function () {
        this.bg_img.source = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][0] + "_jpg";
        if (GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] == "lead") {
            this.img.source = BagConfig.bagFig[BagConfig.bagID].half + "_png";
        }
        else if (GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] != "") {
            this.img.source = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] + "_png";
        }
        else if (GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] == "") {
            this.img.source = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3];
        }
        if (GameConfig[GameConfig.gqConfig][GameConfig.gqMin][2] != 0)
            this.img.x = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][2] + 100;
        this.role_name.text = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][8];
        if (this.role_name.text == "") {
            this.role_name.text = "旁白";
        }
        this.role_dialogue.text = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][9];
        GameConfig.gqMin++;
        if (GameConfig.gqMin > GameConfig.gqMax) {
            egret.Tween.removeTweens(this);
            ViewManager.inst().close(GameView);
            if (StoryLineConfig.storyLinefig[GameConfig.gqNum].first == true)
                ViewManager.inst().open(OverView);
            ViewManager.inst().open(StoryLineView);
        }
    };
    GameView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.back_img:
                ViewManager.inst().close(GameView);
                ViewManager.inst().open(StoryLineView);
                break;
            case this.auto_btn:
                if (this.auto_btn.source == "btn_syn_auto_next_png") {
                    this.auto_btn.source = "btn_syn_auto_close_png";
                    this.touchBool = false;
                    egret.Tween.get(this, { loop: true })
                        .wait(1500)
                        .call(this.updateDialogue, this);
                }
                else if (this.auto_btn.source == "btn_syn_auto_close_png") {
                    egret.Tween.removeTweens(this);
                    this.auto_btn.source = "btn_syn_auto_next_png";
                    this.touchBool = true;
                }
                break;
            case this.jump_img:
                GameConfig.gqMin = GameConfig.gqMax;
                this.updateDialogue();
                break;
            default:
                if (this.touchBool)
                    this.updateDialogue();
                break;
        }
    };
    return GameView;
}(BaseEuiView));
__reflect(GameView.prototype, "GameView");
ViewManager.inst().reg(GameView, LayerManager.UI_Pop);
//# sourceMappingURL=GameView.js.map