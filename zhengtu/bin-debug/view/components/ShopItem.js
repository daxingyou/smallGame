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
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        var _this = _super.call(this) || this;
        _this._shop = 0;
        _this._costNum = 0;
        _this._buyNum = -1;
        _this._heroIndex = 0;
        _this.skinName = "ShopItemSkin";
        return _this;
    }
    ShopItem.prototype.childrenCreated = function () {
        this.phurseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    ShopItem.prototype.dataChanged = function () {
        this.icon.source = this.data.icon;
        this.nameLab.text = this.data.name;
        this.descLab.text = this.data.desc;
        this._shop = this.data.shop;
        this._goodid = this.data.goodid;
        if (this.data.shop == 2) {
            //当前是货物商店
            this.moneyCostLab.visible = false;
            this.goldCostLab.text = this.data.cost;
            this._costNum = this.data.cost;
            this._buyNum = this.data.buyNum;
            this._heroIndex = this.data.heroIndex;
            if (this._buyNum == 1) {
                var buystr = egret.localStorage.getItem("shop_" + this.data.goodid);
                if (buystr) {
                    this.phurseBtn.visible = false;
                    this.costGroup.visible = false;
                    this.buyLab.visible = true;
                }
            }
        }
        else {
            this.costGroup.visible = false;
            this.moneyCostLab.text = this.data.cost;
            this._costNum = this.data.costNum;
        }
        this._goodNum = this.data.goodNum;
    };
    ShopItem.prototype.onTouchTap = function () {
        if (this._shop == 2) {
            //当前是货物商店；
            if (GameApp.inst().gold < this._costNum) {
                //当前黄金不足
                UserTips.inst().showTips("黄金不足");
                return;
            }
            GameApp.inst().gold -= this._costNum;
            if (this._goodid == 10000) {
                GameApp.inst().fe += this._goodNum;
                UserTips.inst().showTips("获得生铁x" + this._goodNum);
            }
            else if (this._goodid == 10001) {
                GameApp.inst().good += this._goodNum;
                UserTips.inst().showTips("获得粮草x" + this._goodNum);
            }
            else if (this._goodid == 10002) {
                GameApp.inst().wood += this._goodNum;
                UserTips.inst().showTips("获得木材x" + this._goodNum);
            }
            else {
                var heroAttr = HeroAttrCfg.attrCfg[this._heroIndex];
                var ownGeneralstr = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
                var ownGeneralArr = JSON.parse(ownGeneralstr).attr;
                ownGeneralArr.push(heroAttr);
                egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL, JSON.stringify({ attr: ownGeneralArr }));
                this.phurseBtn.visible = false;
                this.buyLab.visible = true;
                this.costGroup.visible = false;
                egret.localStorage.setItem("shop_" + this.data.goodid, "1");
                UserTips.inst().showTips("获得武将-" + heroAttr.name);
            }
        }
        else {
            console.log({ goodid: 0, goodname: this._goodNum, goodtype: 0, price: this._costNum });
            GlobalFun.sendToNativePhurse({ goodid: 0, goodname: this._goodNum, goodtype: 0, price: this._costNum });
        }
    };
    ShopItem.prototype.dispose = function () {
        this.phurseBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    Object.defineProperty(ShopItem.prototype, "cost", {
        get: function () {
            return this._costNum;
        },
        enumerable: true,
        configurable: true
    });
    return ShopItem;
}(eui.ItemRenderer));
__reflect(ShopItem.prototype, "ShopItem");
//# sourceMappingURL=ShopItem.js.map