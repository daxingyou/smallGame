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
var IconItem = (function (_super) {
    __extends(IconItem, _super);
    function IconItem(_id) {
        var _this = _super.call(this) || this;
        _this.id = 1;
        _this.nu_num = 0;
        _this.nu_max = 100;
        _this.id = _id;
        _this.skinName = "IconItemSkin";
        _this.init();
        _this["autoSize"]();
        MessageManager.inst().addListener("NUQI", _this.addNu, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        return _this;
    }
    IconItem.prototype.init = function () {
        this.mask_tiao.mask = this.nu_tiao;
        this.icon_img.source = "icon_" + this.id + "_png";
    };
    IconItem.prototype.addNu = function (evt) {
        if (evt.data == this.id) {
            if (this.nu_num < 100) {
                this.nu_num += Math.floor(Math.random() * 10 + 20);
                if (this.nu_num >= 100)
                    this.nu_num = 100;
                this.nu_tiao.x = -this.nu_tiao.width + this.nu_num * this.nu_tiao.width / this.nu_max;
            }
            else {
                this.nu_num = 100;
                this.nu_tiao.x = -this.nu_tiao.width + this.nu_num * this.nu_tiao.width / this.nu_max;
            }
        }
    };
    IconItem.prototype.touchTap = function () {
        if (this.effect.visible) {
            /**释放技能 */
            this.effect.visible = false;
            this.nu_num = 0;
            this.nu_tiao.x = -this.nu_tiao.width + this.nu_num * this.nu_tiao.width / this.nu_max;
            MessageManager.inst().dispatch("PLAYER_SKILL", this.id);
        }
    };
    IconItem.prototype.update = function () {
        if (this.nu_num >= 100) {
            this.effect.visible = true;
            if (GameConfig.auto_bool) {
                this.touchTap();
            }
        }
    };
    return IconItem;
}(eui.Component));
__reflect(IconItem.prototype, "IconItem");
//# sourceMappingURL=IconItem.js.map