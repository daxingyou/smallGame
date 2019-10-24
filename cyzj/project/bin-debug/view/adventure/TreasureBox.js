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
var TreasureBox = (function (_super) {
    __extends(TreasureBox, _super);
    function TreasureBox() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.vis = true;
        _this.open = false;
        _this.skill = null;
        _this.any = [
            { id: 0, img: Math.floor(Math.random() * 10 + 10006) },
            { id: 1, img: Math.floor(Math.random() * 10 + 10006) },
            { id: 2, img: Math.floor(Math.random() * 10 + 10006) },
            { id: 3, img: Math.floor(Math.random() * 10 + 10006) },
            { id: 4, img: Math.floor(Math.random() * 10 + 10006) }
        ];
        _this.skinName = "TreasureBoxSkin";
        _this.init();
        MessageManager.inst().addListener("OPEN_BOX", _this.openThis, _this);
        MessageManager.inst().addListener("CLOSE_BOX", _this.closeThis, _this);
        MessageManager.inst().addListener("BOX_PICKUP", _this.pickup, _this);
        MessageManager.inst().addListener("GAME_PAUSE", _this.gamePause, _this);
        MessageManager.inst().addListener("GAME_START", _this.gameStart, _this);
        return _this;
    }
    TreasureBox.prototype.init = function () {
        this.tiao.mask = this.mask_rect;
        this.group.visible = false;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
    };
    TreasureBox.prototype.openThis = function (evt) {
        var _this = this;
        if (evt.data == this && this.open == false) {
            this.group.visible = true;
            this.open = true;
            egret.Tween.get(this.mask_rect)
                .to({ width: 53 }, 1500)
                .call(function () {
                _this.box_img.source = "box_img_open_png";
                var num = Math.random() * 100;
                if (_this.skill == true) {
                    num = 0;
                }
                else if (_this.skill == false) {
                    num = 79;
                }
                if (num < 20) {
                    _this.skill = true;
                    MessageManager.inst().dispatch("BOX_SKILL", _this);
                    AdventureConfig.itemAny.splice(AdventureConfig.itemAny.indexOf(_this), 1);
                    _this.removeMySelf();
                }
                else if (num < 80) {
                    _this.skill = false;
                    MessageManager.inst().dispatch("OPEN_BOX_LIST", _this.any);
                }
                else if (num < 100) {
                    ViewManager.inst().open(GameView);
                    AdventureConfig.itemAny.splice(AdventureConfig.itemAny.indexOf(_this), 1);
                    _this.removeMySelf();
                    MessageManager.inst().dispatch("GAME_PAUSE");
                }
            }, this);
        }
    };
    TreasureBox.prototype.pickup = function (evt) {
        if (this.open) {
            this.any.splice(this.any.indexOf(evt.data), 1);
            MessageManager.inst().dispatch("OPEN_BOX_LIST", this.any);
            if (this.any.length <= 0) {
                AdventureConfig.itemAny.splice(AdventureConfig.itemAny.indexOf(this), 1);
                this.removeMySelf();
            }
        }
    };
    TreasureBox.prototype.gamePause = function () {
        egret.Tween.pauseTweens(this.mask_rect);
    };
    TreasureBox.prototype.gameStart = function () {
        egret.Tween.resumeTweens(this.mask_rect);
    };
    TreasureBox.prototype.closeThis = function () {
        this.group.visible = false;
        this.open = false;
        this.box_img.source = "box_img_png";
        egret.Tween.removeTweens(this.mask_rect);
        this.mask_rect.width = 0;
    };
    TreasureBox.prototype.removeMySelf = function () {
        if (this.parent) {
            if (this.parent.contains(this)) {
                this.parent.removeChild(this);
            }
        }
    };
    return TreasureBox;
}(BaseView));
__reflect(TreasureBox.prototype, "TreasureBox");
//# sourceMappingURL=TreasureBox.js.map