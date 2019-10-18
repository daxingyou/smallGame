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
var BagView = (function (_super) {
    __extends(BagView, _super);
    function BagView() {
        var _this = _super.call(this) || this;
        _this.clothes_id = 0;
        _this.addTouchEvent(_this, _this.touchTap);
        _this.addTouchEvent(_this.jiang_group, _this.closeJiang);
        return _this;
    }
    BagView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
    };
    BagView.prototype.close = function () {
    };
    BagView.prototype.init = function () {
        if (BagConfig.bagFig.length > 1) {
            this.left_btn.visible = false;
            this.right_btn.visible = true;
        }
        this.clothes_img.source = BagConfig.bagFig[this.clothes_id].image + "_png";
        this.clothes_name.text = BagConfig.bagFig[this.clothes_id].name;
    };
    BagView.prototype.update = function () {
        if (this.clothes_id <= 0) {
            this.clothes_id = 0;
            this.left_btn.visible = false;
        }
        else {
            this.left_btn.visible = true;
        }
        if (this.clothes_id >= BagConfig.bagFig.length - 1) {
            this.clothes_id = BagConfig.bagFig.length - 1;
            this.right_btn.visible = false;
        }
        else {
            this.right_btn.visible = true;
        }
        this.clothes_img.source = BagConfig.bagFig[this.clothes_id].image + "_png";
        this.clothes_name.text = BagConfig.bagFig[this.clothes_id].name;
    };
    BagView.prototype.closeJiang = function () {
        this.jiang_group.visible = false;
    };
    BagView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.back_img:
                ViewManager.inst().close(BagView);
                break;
            case this.jiang_btn:
                this.jiang_group.visible = true;
                this.jiang_name.text = "名称：" + BagConfig.bagFig[this.clothes_id].name;
                this.jiang_gold.text = "金币 + %" + BagConfig.bagFig[this.clothes_id].encoin;
                this.jiang_exp.text = "经验 + %" + BagConfig.bagFig[this.clothes_id].enjingyan;
                this.jiang_you.text = "游玩 + %" + BagConfig.bagFig[this.clothes_id].enyouwan;
                break;
            case this.left_btn:
                this.clothes_id--;
                this.update();
                break;
            case this.right_btn:
                this.clothes_id++;
                this.update();
                break;
            case this.huan:
                BagConfig.bagID = this.clothes_id;
                ViewManager.inst().close(BagView);
                break;
        }
    };
    return BagView;
}(BaseEuiView));
__reflect(BagView.prototype, "BagView");
ViewManager.inst().reg(BagView, LayerManager.UI_Main);
//# sourceMappingURL=BagView.js.map