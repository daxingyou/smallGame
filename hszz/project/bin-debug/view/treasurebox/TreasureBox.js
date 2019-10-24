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
        _this.getBool = true;
        return _this;
    }
    TreasureBox.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.init();
        this.addTouchEvent(this, this.touchTap);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    TreasureBox.prototype.close = function () {
        this.removeTouchEvent(this, this.touchTap);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
    };
    TreasureBox.prototype.init = function () {
        if (egret.localStorage.getItem(LocalStorageEnum.BOX_TIME)) {
            TreasureCfg.getTime = parseInt(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME));
        }
        if (egret.localStorage.getItem("treasure_bool")) {
            this.getBool = false;
        }
        else {
            this.getBool = true;
            this.createItem();
        }
    };
    TreasureBox.prototype.update = function () {
        if (!this.getBool) {
            this.item_group.visible = false;
            this.gold_group.visible = false;
            this.time_label.visible = true;
            var time = new Date();
            if (egret.localStorage.getItem(LocalStorageEnum.BOX_TIME)) {
                var time_1 = parseInt(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME));
                if (time.getTime() - time_1 <= 600000) {
                    this.time_label.text = DateUtils.getFormatBySecond((600000 - (time.getTime() - time_1)) / 1000, DateUtils.TIME_FORMAT_3);
                }
                else {
                    egret.localStorage.removeItem("treasure_bool");
                    this.getBool = true;
                    this.createItem();
                }
            }
        }
        else {
            this.item_group.visible = true;
            this.gold_group.visible = true;
            this.time_label.visible = false;
        }
    };
    /**创建卡牌 */
    TreasureBox.prototype.createItem = function () {
        this.card_id = hszz.CardConfig.cfgs[Math.floor(Math.random() * 6 + 1)].id;
        if (egret.localStorage.getItem("card_id")) {
            this.card_id = parseInt(egret.localStorage.getItem("card_id"));
        }
        this.item1.source = "box_card_" + this.card_id + "_png";
        this.item2.source = "box_card_" + (this.card_id + 1) + "_png";
        this.item3.source = "box_card_" + (this.card_id + 2) + "_png";
        egret.localStorage.setItem("card_id", this.card_id + "");
    };
    TreasureBox.prototype.touchTap = function (evt) {
        switch (evt.target) {
            case this.btn_img:
                if (this.getBool) {
                    var time = new Date();
                    TreasureCfg.getTime = time.getTime();
                    this.time_label.visible = true;
                    egret.localStorage.setItem(LocalStorageEnum.BOX_TIME, TreasureCfg.getTime + "");
                    this.time_label.text = DateUtils.getFormatBySecond(600000 / 1000, DateUtils.TIME_FORMAT_3);
                    egret.localStorage.removeItem("card_id");
                    console.log("领取成功");
                    GameApp.gold += 200;
                    // GlobalFun.
                    this.getBool = false;
                    egret.localStorage.setItem("treasure_bool", "false");
                    this.item_group.visible = false;
                    this.gold_group.visible = false;
                    GlobalFun.refreshCardData(GlobalFun.getCardDataFromId(this.card_id));
                    GlobalFun.refreshCardData(GlobalFun.getCardDataFromId(this.card_id + 1));
                    GlobalFun.refreshCardData(GlobalFun.getCardDataFromId(this.card_id + 2));
                }
                else {
                    console.log("无法领取");
                    UserTips.inst().showTips("条件不足，无法领取");
                }
                break;
        }
    };
    return TreasureBox;
}(BaseEuiView));
__reflect(TreasureBox.prototype, "TreasureBox");
ViewManager.inst().reg(TreasureBox, LayerManager.UI_Pop);
//# sourceMappingURL=TreasureBox.js.map