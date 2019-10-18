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
var ExchangeItem = (function (_super) {
    __extends(ExchangeItem, _super);
    function ExchangeItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ExchangeItemSkin";
        _this.buy_group.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchTap, _this);
        return _this;
    }
    ExchangeItem.prototype.dataChanged = function () {
        this.num_label.text = "" + this.data.num;
        this.frame_img.source = "img_head_frame_noraml_" + this.data.id + "_png";
        if (this.data.state == 0) {
            this.huan_label.visible = false;
            this.num_group.visible = true;
        }
        else if (this.data.state == 1) {
            this.huan_label.visible = true;
            this.num_group.visible = false;
        }
    };
    ExchangeItem.prototype.touchTap = function () {
        if (this.data.state == 0) {
            if (this.data.num <= GameConfig.zhu) {
                GameConfig.zhu -= this.data.num;
                this.data.state = 1;
                this.huan_label.visible = true;
                this.num_group.visible = false;
            }
            else {
                UserTips.inst().showTips("当前灵珠数量不足！");
            }
        }
        else {
            GameConfig.frame = this.data.id;
        }
    };
    return ExchangeItem;
}(eui.ItemRenderer));
__reflect(ExchangeItem.prototype, "ExchangeItem");
//# sourceMappingURL=ExchangeItem.js.map