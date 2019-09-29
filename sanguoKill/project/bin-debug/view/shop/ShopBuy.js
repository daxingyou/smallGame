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
var ShopBuy = (function (_super) {
    __extends(ShopBuy, _super);
    function ShopBuy() {
        var _this = _super.call(this) || this;
        _this.item_num = 1;
        return _this;
    }
    ShopBuy.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        this.init();
        // this.alpha=0;
        // this.scaleX = this.scaleY = 0;
        // egret.Tween.get(this).to({scaleX:1,scaleY:1,alpha:1},300).call(()=>{
        // 	egret.Tween.removeTweens(this);
        // },this)
        this.addTouchEvent(this.down_btn, this.touchDown);
        this.addTouchEvent(this.up_btn, this.touchUp);
        this.addTouchEvent(this.buy_btn, this.touchBuy);
        this.addTouchEvent(this.close_btn, this.onClose);
        this.addTouchEvent(this.close_btn0, this.onClose);
        this.addTouchEvent(this.confirm_btn, this.touchConfirm);
        this.content.x = (StageUtils.inst().getWidth() >> 1) - 266 / 2;
        this.content.y = (StageUtils.inst().getHeight() >> 1) - 378 / 2;
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                if (this.parent) {
                    this.parent.swapChildren(GameApp.guideView, this);
                }
                GameApp.guideView.nextStep({ id: "1_4", comObj: this.buy_btn, width: 104, height: 38 });
            }
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_SHOP_BUY, this.onShopBuy, this);
    };
    ShopBuy.prototype.onShopBuy = function () {
        this.touchBuy();
        ViewManager.inst().open(ShopView);
    };
    ShopBuy.prototype.onClose = function () {
        // egret.Tween.get(this).to({scaleX:0,scaleY:0,alpha:0},300).call(()=>{
        // 	egret.Tween.removeTweens(this);
        ViewManager.inst().close(ShopBuy);
        // this.close();
        // },this)
    };
    ShopBuy.prototype.close = function () {
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_SHOP_BUY, this.onShopBuy, this);
        this.removeTouchEvent(this.down_btn, this.touchDown);
        this.removeTouchEvent(this.up_btn, this.touchUp);
        this.removeTouchEvent(this.buy_btn, this.touchBuy);
        this.removeTouchEvent(this.close_btn, this.onClose);
        this.removeTouchEvent(this.close_btn0, this.onClose);
        this.removeTouchEvent(this.confirm_btn, this.touchConfirm);
    };
    ShopBuy.prototype.init = function () {
        this.bag_num();
        this.remain_bag.text = "包裹剩余空间：" + GameApp.inst().remainBag;
        this.remain_money.text = "剩余银两：" + GameApp.inst().gold;
        this.card_img.source = this.data.instId + "_jpg";
        this.money.text = "售价 " + this.data.cost + "两";
        this.tip.visible = false;
        this.buy_num.text = "" + this.item_num;
        if (this.data.type == ItemType.weapon) {
            this.property_0.text = "攻击 +" + this.data.atk;
            this.property_1.text = "命中 +" + this.data.hit;
        }
        else if (this.data.type == ItemType.weapon_ma) {
            this.property_0.text = "攻击 +" + this.data.atk;
            this.property_1.text = "暴击 +" + this.data.crit;
        }
        else if (this.data.type == ItemType.protection) {
            this.property_0.text = "防御 +" + this.data.protect;
            this.property_1.text = "生命 +" + this.data.hp;
        }
        else if (this.data.type == ItemType.protection_ma) {
            this.property_0.text = "防御 +" + this.data.protect;
            this.property_1.text = "敏捷 +" + this.data.agile;
        }
        else if (this.data.type == ItemType.prop) {
            this.property_0.visible = false;
            this.property_1.visible = false;
            this.tip.visible = true;
            this.tip.text = this.data.tip;
        }
    };
    ShopBuy.prototype.touchDown = function () {
        if (this.item_num > 1)
            this.item_num--;
        this.buy_num.text = "" + this.item_num;
        this.money.text = "售价 " + (this.data.cost * this.item_num) + "两";
    };
    ShopBuy.prototype.touchUp = function () {
        this.item_num++;
        this.buy_num.text = "" + this.item_num;
        this.money.text = "售价 " + (this.data.cost * this.item_num) + "两";
    };
    ShopBuy.prototype.touchBuy = function () {
        var _this = this;
        if (GameApp.inst().remainBag < this.item_num) {
            this.tip_group.visible = true;
            this.no_tip.text = "对不起，背包空间不足";
            return;
        }
        if (GameApp.inst().gold < (this.data.cost * this.item_num)) {
            this.tip_group.visible = true;
            this.no_tip.text = "对不起，剩余银两不足";
        }
        else if (GameApp.inst().gold >= (this.data.cost * this.item_num)) {
            GameApp.inst().gold -= (this.data.cost * this.item_num);
            /**购买成功 */
            for (var i = 0; i < this.item_num; i++) {
                for (var i_1 = 0; i_1 < ItemCfg.bagCfg.length; i_1++) {
                    if (ItemCfg.bagCfg[i_1] == null) {
                        ItemCfg.bagCfg[i_1] = this.data;
                        GlobalFun.setBagList();
                        break;
                    }
                }
            }
            // this.onClose();
            this.tip_group.visible = true;
            this.confirm_btn.visible = false;
            this.no_tip.text = "购买成功";
            this.bag_num();
            this.remain_bag.text = "包裹剩余空间：" + GameApp.inst().remainBag;
            this.remain_money.text = "剩余银两：" + GameApp.inst().gold;
            egret.Tween.get(this)
                .wait(200)
                .call(function () {
                _this.onClose();
            });
        }
    };
    ShopBuy.prototype.bag_num = function () {
        GameApp.inst().remainBag = 0;
        for (var i = 0; i < ItemCfg.bagCfg.length; i++) {
            if (ItemCfg.bagCfg[i] == null) {
                GameApp.inst().remainBag++;
            }
        }
    };
    ShopBuy.prototype.touchConfirm = function () {
        this.tip_group.visible = false;
    };
    return ShopBuy;
}(BaseEuiView));
__reflect(ShopBuy.prototype, "ShopBuy");
ViewManager.inst().reg(ShopBuy, LayerManager.UI_Pop);
//# sourceMappingURL=ShopBuy.js.map