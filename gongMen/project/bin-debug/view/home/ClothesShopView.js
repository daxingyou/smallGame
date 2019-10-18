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
var ClothesShopView = (function (_super) {
    __extends(ClothesShopView, _super);
    function ClothesShopView() {
        var _this = _super.call(this) || this;
        _this.clothes_id = 0;
        return _this;
    }
    ClothesShopView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
        this.addTouchEvent(this.jiang_group, this.closeJiang);
    };
    ClothesShopView.prototype.close = function () {
    };
    ClothesShopView.prototype.init = function () {
        this.gold.text = GameConfig.gold + "";
        this.update();
    };
    ClothesShopView.prototype.update = function () {
        if (this.clothes_id <= 0) {
            this.clothes_id = 0;
            this.left_btn.visible = false;
        }
        else {
            this.left_btn.visible = true;
        }
        if (this.clothes_id >= 8) {
            this.clothes_id = 8;
            this.right_btn.visible = false;
        }
        else {
            this.right_btn.visible = true;
        }
        if (ClothesConfig.clothesFig[this.clothes_id].state == 1) {
            this.yongyou.visible = true;
        }
        else {
            this.yongyou.visible = false;
        }
        this.clothes_img.source = ClothesConfig.clothesFig[this.clothes_id].image + "_png";
        this.buy_glod.text = ClothesConfig.clothesFig[this.clothes_id].bycoin;
        this.clothes_name.text = ClothesConfig.clothesFig[this.clothes_id].name;
    };
    ClothesShopView.prototype.closeJiang = function () {
        this.jiang_group.visible = false;
    };
    ClothesShopView.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.back_img:
                ViewManager.inst().close(ClothesShopView);
                ViewManager.inst().open(HomeView);
                break;
            case this.left_btn:
                this.clothes_id--;
                this.update();
                break;
            case this.right_btn:
                this.clothes_id++;
                this.update();
                break;
            case this.buy_btn:
                if (ClothesConfig.clothesFig[this.clothes_id].bycoin <= GameConfig.gold) {
                    /**购买成功 */
                    GameConfig.gold -= ClothesConfig.clothesFig[this.clothes_id].bycoin;
                    this.yongyou.visible = true;
                    ClothesConfig.clothesFig[this.clothes_id].state = 1;
                    BagConfig.bagFig.push(ClothesConfig.clothesFig[this.clothes_id]);
                    this.gold.text = "" + GameConfig.gold;
                }
                else {
                    /**金币不足 */
                    UserTips.inst().showTips("金币不足");
                }
                break;
            case this.jiang_btn:
                this.jiang_group.visible = true;
                this.jiang_name.text = "名称：" + ClothesConfig.clothesFig[this.clothes_id].name;
                this.jiang_gold.text = "金币 + %" + ClothesConfig.clothesFig[this.clothes_id].encoin;
                this.jiang_exp.text = "经验 + %" + ClothesConfig.clothesFig[this.clothes_id].enjingyan;
                this.jiang_you.text = "游玩 + %" + ClothesConfig.clothesFig[this.clothes_id].enyouwan;
                break;
        }
    };
    return ClothesShopView;
}(BaseEuiView));
__reflect(ClothesShopView.prototype, "ClothesShopView");
ViewManager.inst().reg(ClothesShopView, LayerManager.UI_Main);
//# sourceMappingURL=ClothesShopView.js.map