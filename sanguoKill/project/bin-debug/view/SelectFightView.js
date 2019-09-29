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
var SelectFightView = (function (_super) {
    __extends(SelectFightView, _super);
    function SelectFightView() {
        var _this = _super.call(this) || this;
        _this.map_Pos = {};
        return _this;
    }
    SelectFightView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.group_left.x = StageUtils.inst().getWidth() - this.group_left.width;
        this.group_left.y = StageUtils.inst().getHeight() / 2 - this.group_left.height / 2;
        var guidestr = egret.localStorage.getItem(LocalStorageEnum.GUIDED);
        if (!guidestr) {
            egret.localStorage.setItem(LocalStorageEnum.GUIDED, "1");
            GameApp.guilding = true;
            ViewManager.inst().open(GuideStory, [{ tip: "主公，我叫馨羽，我将带你如何快速进入游戏。", nextTip: "在出战前，需要购买点装备。跟着上面的箭头点击相应的按钮。", obj: this.selectFightView_BB }]);
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_INFO, this.onOpenMenu, this);
        SelectFightView.charpter = GameApp.battleLevel;
        this.select_on = GameApp.battleLevel;
        this.selectFightView_1.visible = false;
        this.selectFightView_2.visible = false;
        this.selectFightView_A.visible = false;
        this.selectFightView_B.visible = false;
        this.map_Pos["x"] = this.map.x;
        this.map_Pos["y"] = this.map.y;
        if (!egret.Capabilities.isMobile) {
            //分别监听外层容器的 MouseEvent
            this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
            this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        }
        else {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseOver, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseOut, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove2, this);
        }
        // let image=<eui.Image>this.map.getChildByName("zhan"+1);
        // image.source=RES.getRes("selectFightView_A_png");
        if (GameApp.battleLevel) {
            for (var a = 0; a < 12; a++) {
                if (a >= GameApp.battleLevel) {
                    var label = this.map.getChildByName("label_" + (a + 1));
                    label.visible = false;
                    var image = this.map.getChildByName("zhan" + (a + 1));
                    image.visible = false;
                }
                else if (a == (GameApp.battleLevel - 1)) {
                    var image = this.map.getChildByName("zhan" + (a + 1));
                    image.source = RES.getRes("selectFightView_quan_png");
                    this.selectFightView_yuan.x = image.x + 9;
                    this.selectFightView_yuan.y = image.y + 9;
                }
            }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        this.canvas = document.getElementsByTagName("CANVAS")[0];
        this.canvas.addEventListener('mousemove', this.onMove);
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onFrame, this);
        this.timer.start();
        MessageManager.inst().addListener(CustomEvt.COMMONRESEND, this.onEnd, this);
    };
    SelectFightView.prototype.onOpenMenu = function () {
        ViewManager.inst().open(MenuView);
    };
    SelectFightView.prototype.onEnd = function () {
        MessageManager.inst().removeListener(CustomEvt.COMMONRESEND, this.onEnd, this);
        ViewManager.inst().open(BattleView);
        ViewManager.inst().close(SelectFightView);
    };
    SelectFightView.prototype.onFrame = function () {
        this.selectFightView_yuan.scaleX = 0.4;
        this.selectFightView_yuan.scaleY = 0.4;
        this.selectFightView_yuan.alpha = 0.5;
        egret.Tween.get(this.selectFightView_yuan).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500).to({ alpha: 0 }, 400);
        if (this.moveNow_X) {
            if (SelectFightView.move_X > this.moveNow_X) {
                if (this.map.x >= this.map_Pos.x + 2) {
                }
                else {
                    egret.Tween.get(this.map).to({ x: this.map_Pos.x + 2 }, 500);
                }
            }
            else if (SelectFightView.move_X < this.moveNow_X) {
                if (this.map.x <= this.map_Pos.x - 2) {
                }
                else {
                    egret.Tween.get(this.map).to({ x: this.map_Pos.x - 2 }, 500);
                }
            }
            this.moveNow_X = SelectFightView.move_X;
        }
        else {
            this.moveNow_X = SelectFightView.move_X;
        }
        if (this.moveNow_Y) {
            if (SelectFightView.move_Y > this.moveNow_Y) {
                if (this.map.y >= this.map_Pos.y + 2) {
                }
                else {
                    egret.Tween.get(this.map).to({ y: this.map_Pos.y + 2 }, 500);
                }
            }
            else {
                if (this.map.y <= this.map_Pos.y - 2) {
                }
                else {
                    egret.Tween.get(this.map).to({ y: this.map_Pos.y - 2 }, 500);
                }
            }
            this.moveNow_Y = SelectFightView.move_Y;
        }
        else {
            this.moveNow_Y = SelectFightView.move_Y;
        }
    };
    SelectFightView.prototype.onMove = function (evt) {
        SelectFightView.move_X = evt.x;
        SelectFightView.move_Y = evt.y;
    };
    SelectFightView.prototype.onMove2 = function (evt) {
        SelectFightView.move_X = evt.stageX;
        SelectFightView.move_Y = evt.stageY;
    };
    SelectFightView.prototype.onRollOver = function (e) {
        // console.log("roll over " + e.target.name + "  " + e.bubbles);
    };
    SelectFightView.prototype.onRollOut = function (e) {
        // console.log("roll out " + e.target.name + "  " + e.bubbles);
    };
    SelectFightView.prototype.onMouseOver = function (e) {
        // console.log("mouse over " + e.target.name + "  " + e.bubbles);
        switch (e.target) {
            case this.selectFightView_11:
                if (!this.selectFightView_1.visible) {
                    this.selectFightView_1.visible = true;
                }
                break;
            case this.selectFightView_22:
                if (!this.selectFightView_2.visible) {
                    this.selectFightView_2.visible = true;
                }
                break;
            case this.selectFightView_AA:
                if (!this.selectFightView_A.visible) {
                    this.selectFightView_A.visible = true;
                }
                break;
            case this.selectFightView_BB:
                if (!this.selectFightView_B.visible) {
                    this.selectFightView_B.visible = true;
                }
                break;
        }
    };
    SelectFightView.prototype.onMouseOut = function (e) {
        // console.log("mouse out " + e.target.name + "  " + e.bubbles);
        switch (e.target) {
            case this.selectFightView_11:
                this.selectFightView_1.visible = false;
                break;
            case this.selectFightView_22:
                this.selectFightView_2.visible = false;
                break;
            case this.selectFightView_AA:
                this.selectFightView_A.visible = false;
                break;
            case this.selectFightView_BB:
                this.selectFightView_B.visible = false;
                break;
        }
    };
    /**响应Touch*/
    SelectFightView.prototype.touchHandler = function (evt) {
        if (evt.type == egret.TouchEvent.TOUCH_TAP) {
            switch (evt.target) {
                case this.selectFightView_11:
                    console.log("this.selectFightView_1");
                    // ViewManager.inst().open(SetView);
                    ViewManager.inst().open(AboutView);
                    // ViewManager.inst().close(SelectFightView);
                    break;
                case this.selectFightView_22:
                    ViewManager.inst().open(BeginView);
                    ViewManager.inst().close(SelectFightView);
                    break;
                case this.selectFightView_AA:
                    GameApp.curLevel = this.select_on;
                    CommonLoading.inst().show("\u7B2C" + this.select_on + "\u7AE0");
                    RES.loadGroup("battleView", 0, CommonLoading.inst());
                    // console.log("this.selectFightView_A");
                    // console.log(this.select_on);
                    // console.log(GameApp.charpter_info[this.select_on]);
                    break;
                case this.selectFightView_BB:
                    // console.log("this.selectFightView_B");
                    ViewManager.inst().open(MenuView);
                    // ViewManager.inst().close(SelectFightView);
                    break;
                default:
                    if (SelectFightView.charpter) {
                        var touch_ok = 0;
                        for (var a = 0; a < 12; a++) {
                            if (a < SelectFightView.charpter) {
                                var image = this.map.getChildByName("zhan" + (a + 1));
                                if (evt.target.name == image.name) {
                                    touch_ok = 1;
                                }
                                else {
                                }
                            }
                        }
                        if (touch_ok == 1) {
                            for (var a = 0; a < 12; a++) {
                                if (a < SelectFightView.charpter) {
                                    var image = this.map.getChildByName("zhan" + (a + 1));
                                    if (evt.target.name == image.name) {
                                        image.source = RES.getRes("selectFightView_quan_png");
                                        this.selectFightView_yuan.x = image.x + 9;
                                        this.selectFightView_yuan.y = image.y + 9;
                                        this.select_on = a + 1;
                                    }
                                    else {
                                        image.source = RES.getRes("selectFightView_zhan_png");
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        }
    };
    SelectFightView.prototype.close = function () {
        if (!egret.Capabilities.isMobile) {
            //分别监听外层容器的 MouseEvent
            this.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
            this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        }
        else {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseOver, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseOut, this);
        }
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_INFO, this.onOpenMenu, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandler, this);
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onFrame, this);
    };
    return SelectFightView;
}(BaseEuiView));
__reflect(SelectFightView.prototype, "SelectFightView");
ViewManager.inst().reg(SelectFightView, LayerManager.UI_Main);
//# sourceMappingURL=SelectFightView.js.map