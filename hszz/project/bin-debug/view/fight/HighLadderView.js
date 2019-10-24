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
var HighLadderView = (function (_super) {
    __extends(HighLadderView, _super);
    function HighLadderView() {
        var _this = _super.call(this) || this;
        _this.num = 1000;
        _this.level = 1;
        _this.jiang0 = 0;
        _this.jiang1 = 1;
        _this.jiang_id = 1;
        _this.dian = 3000;
        _this.jiang_bool0 = false;
        _this.jiang_bool1 = false;
        return _this;
    }
    HighLadderView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
        this.map_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.map_group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.map_group.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    HighLadderView.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
        this.map_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.map_group.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.map_group.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    HighLadderView.prototype.init = function () {
        for (var i = 0; i < HighLadderCfg.levelAny.length; i++) {
            if (HighLadderCfg.levelAny[i].hz_num <= GameApp.medal) {
                HighLadderCfg.openLevel_max = HighLadderCfg.levelAny[i].id;
            }
        }
        for (var j = 0; j < HighLadderCfg.levelAny.length; j++) {
            var item = new LevelItem(HighLadderCfg.levelAny[j].id);
            item.x = HighLadderCfg.levelAny[j].x;
            item.y = HighLadderCfg.levelAny[j].y;
            this.map_group.addChild(item);
        }
        if (egret.localStorage.getItem("jiang0")) {
            this.jiang0 = parseInt(egret.localStorage.getItem("jiang0"));
            this.jiang1 = parseInt(egret.localStorage.getItem("jiang1"));
            this.jiang_id = parseInt(egret.localStorage.getItem("jiang_id"));
        }
        this.map_group.mask = this.map_mask;
        this.updateJiang();
    };
    HighLadderView.prototype.touchBegin = function (evt) {
        this.oy = this.ny = evt.stageY;
    };
    HighLadderView.prototype.touchMove = function (evt) {
        this.ny = evt.stageY;
        this.map_group.y += (this.ny - this.oy);
        if (this.map_group.y >= this.map_mask.y) {
            this.map_group.y = this.map_mask.y;
        }
        else if (this.map_group.y <= this.map_mask.y - (this.map_group.height - this.map_mask.height)) {
            this.map_group.y = this.map_mask.y - (this.map_group.height - this.map_mask.height);
        }
        this.oy = this.ny;
    };
    HighLadderView.prototype.touchEnd = function (evt) {
        this.oy = this.ny = 0;
    };
    HighLadderView.prototype.updateJiang = function () {
        if (GameApp.medal >= HighLadderCfg.cfg[this.jiang0].dian) {
            this.xu_group0.visible = false;
            this.keling0.visible = true;
            this.jiang_bool0 = true;
        }
        if (GameApp.medal >= HighLadderCfg.cfg[this.jiang1].dian) {
            this.xu_group1.visible = false;
            this.keling1.visible = true;
            this.jiang_bool1 = true;
        }
        if (this.keling0.visible == true || this.keling1.visible == true) {
            this.lingqu_btn.visible = true;
        }
        else {
            this.lingqu_btn.visible = false;
        }
        this.xu_label0.text = "需" + HighLadderCfg.cfg[this.jiang0].dian + "点";
        this.gold_label0.text = HighLadderCfg.cfg[this.jiang0].gold;
        this.xu_label1.text = "需" + HighLadderCfg.cfg[this.jiang1].dian + "点";
        this.gold_label1.text = HighLadderCfg.cfg[this.jiang1].gold;
        egret.localStorage.setItem("jiang0", this.jiang0 + "");
        egret.localStorage.setItem("jiang1", this.jiang1 + "");
        egret.localStorage.setItem("jiang_id", this.jiang_id + "");
    };
    HighLadderView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.tiaozhan:
                /**挑战 */
                break;
            case this.lingqu_btn:
                if (this.jiang_bool0) {
                    this.jiang_bool0 = false;
                    GameApp.gold += HighLadderCfg.cfg[this.jiang0].gold;
                    this.jiang0 = this.jiang_id + 1;
                    this.jiang_id++;
                    this.xu_group0.visible = true;
                    this.keling0.visible = false;
                    this.updateJiang();
                }
                if (this.jiang_bool1) {
                    this.jiang_bool1 = false;
                    GameApp.gold += HighLadderCfg.cfg[this.jiang1].gold;
                    this.jiang1 = this.jiang_id + 1;
                    this.jiang_id++;
                    this.xu_group1.visible = true;
                    this.keling1.visible = false;
                    this.updateJiang();
                }
                break;
            case this.close_btn:
                ViewManager.inst().close(HighLadderView);
                break;
        }
    };
    return HighLadderView;
}(BaseEuiView));
__reflect(HighLadderView.prototype, "HighLadderView");
ViewManager.inst().reg(HighLadderView, LayerManager.UI_Pop);
//# sourceMappingURL=HighLadderView.js.map