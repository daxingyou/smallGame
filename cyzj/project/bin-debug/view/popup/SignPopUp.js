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
var SignPopUp = (function (_super) {
    __extends(SignPopUp, _super);
    function SignPopUp() {
        return _super.call(this) || this;
    }
    SignPopUp.prototype.open = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.content.scaleX = this.content.scaleY = 0;
        this.content.alpha = 0;
        egret.Tween.get(this.content).to({ scaleX: 0.8, scaleY: 0.8, alpha: 1 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
        }, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
        for (var i = 1; i <= 7; i++) {
            var dayGet_1 = egret.localStorage.getItem("sign_" + i);
            if (dayGet_1) {
                this["getBtn" + i].visible = false;
                this["getLab" + i].visible = true;
                continue;
            }
            GlobalFun.filterToGrey(this["getBtn" + i]);
        }
        var firstTime = parseInt(egret.localStorage.getItem(LocalStorageEnum.FIRST_TIME));
        var nowDate = new Date().getTime();
        this.dalVal = (((nowDate - firstTime) / (24 * 60 * 60 * 1000)) >> 0) + 1;
        var dayGet = egret.localStorage.getItem("sign_" + this.dalVal);
        if (!dayGet) {
            //当前没有领取
            GlobalFun.clearFilters(this["getBtn" + this.dalVal]);
            this["getBtn" + this.dalVal].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
    };
    SignPopUp.prototype.onTouchTap = function () {
        var signRewardObj = SignCfg.signCfgs[this.dalVal - 1];
        //需要添加到背包里面 --- //
        if (signRewardObj.reward == 10016) {
            GameApp.roleGold += signRewardObj.num;
        }
        else {
            GlobalFun.addItemToBag(signRewardObj.reward, signRewardObj.num);
        }
        //
        var itemCfg = ItemCfg.itemCfg[signRewardObj.reward];
        UserTips.inst().showTips("恭喜获得" + ("<font color=0x00ff00>" + itemCfg.name + "</font>") + "x" + signRewardObj.num);
        this["getBtn" + this.dalVal].visible = false;
        this["getLab" + this.dalVal].visible = true;
        egret.localStorage.setItem("sign_" + this.dalVal, "1");
    };
    SignPopUp.prototype.onReturn = function () {
        var _this = this;
        egret.Tween.get(this.content).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 600, egret.Ease.circOut).call(function () {
            egret.Tween.removeTweens(_this.content);
            ViewManager.inst().close(SignPopUp);
        }, this);
    };
    SignPopUp.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
        if (this["getBtn" + this.dalVal]) {
            this["getBtn" + this.dalVal].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
    };
    return SignPopUp;
}(BaseEuiView));
__reflect(SignPopUp.prototype, "SignPopUp");
ViewManager.inst().reg(SignPopUp, LayerManager.UI_Pop);
//# sourceMappingURL=SignPopUp.js.map