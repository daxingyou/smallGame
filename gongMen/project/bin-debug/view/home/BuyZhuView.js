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
var BuyZhuView = (function (_super) {
    __extends(BuyZhuView, _super);
    function BuyZhuView() {
        var _this = _super.call(this) || this;
        _this.gold_num = 100;
        _this.num_num = 1;
        return _this;
    }
    BuyZhuView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.gold_label.text = "" + this.gold_num;
        this.num_label.text = "" + this.num_num;
        this.addTouchEvent(this, this.touchTap);
    };
    BuyZhuView.prototype.close = function () {
    };
    BuyZhuView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.back_img:
                ViewManager.inst().close(BuyZhuView);
                break;
            case this.sub_btn:
                this.num_num--;
                if (this.num_num <= 1) {
                    this.num_num = 1;
                }
                this.gold_label.text = "" + (this.gold_num * this.num_num);
                this.num_label.text = "" + this.num_num;
                break;
            case this.add_btn:
                this.num_num++;
                this.gold_label.text = "" + (this.gold_num * this.num_num);
                this.num_label.text = "" + this.num_num;
                break;
            case this.confirm_img:
                if (GameConfig.gold >= (this.gold_num * this.num_num)) {
                    GameConfig.gold -= (this.gold_num * this.num_num);
                    GameConfig.zhu += this.num_num;
                }
                else {
                    UserTips.inst().showTips("金币不足");
                }
                break;
        }
    };
    return BuyZhuView;
}(BaseEuiView));
__reflect(BuyZhuView.prototype, "BuyZhuView");
ViewManager.inst().reg(BuyZhuView, LayerManager.UI_Pop);
//# sourceMappingURL=BuyZhuView.js.map