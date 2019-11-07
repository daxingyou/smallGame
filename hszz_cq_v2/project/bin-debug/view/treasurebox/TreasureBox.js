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
        eui.Binding.bindProperty(GameApp, ["medal"], this.medalLab, "text");
        eui.Binding.bindProperty(GameApp, ["gold"], this.goldLab, "text");
        this.addTouchEvent(this, this.touchTap);
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.addTouchEvent(this.returnBtn, this.onReturn, true);
    };
    TreasureBox.prototype.onReturn = function () {
        GameMainView.treasureOpen = false;
        ViewManager.inst().close(TreasureBox);
    };
    TreasureBox.prototype.close = function () {
        this.removeTouchEvent(this.returnBtn, this.onReturn);
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
            // this.item_group.visible = false;
            // this.gold_group.visible = false;
            this.time_label.visible = true;
            var time = new Date();
            if (egret.localStorage.getItem(LocalStorageEnum.BOX_TIME)) {
                var time_1 = parseInt(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME));
                if (time.getTime() - time_1 <= 600000) {
                    this.time_label.text = DateUtils.getFormatBySecond((600000 - (time.getTime() - time_1)) / 1000, DateUtils.TIME_FORMAT_3);
                }
                else {
                    egret.localStorage.removeItem("treasure_bool");
                    egret.localStorage.removeItem("card_id");
                    this.getBool = true;
                }
            }
        }
        else {
            // this.item_group.visible = true;
            // this.gold_group.visible = true;
            this.time_label.visible = false;
        }
    };
    /**创建卡牌 */
    TreasureBox.prototype.createItem = function () {
        this.card_id = Math.floor(Math.random() * 7 + 1);
        if (egret.localStorage.getItem("card_id")) {
            this.card_id = parseInt(egret.localStorage.getItem("card_id"));
        }
        this.item1.source = "card_" + this.card_id + "_" + 1 + "_png";
        this.card_name1.text = hszz.CardConfig.cfgs[this.card_id - 1][0].name;
        this.item2.source = "card_" + this.card_id + "_" + 2 + "_png";
        this.card_name2.text = hszz.CardConfig.cfgs[this.card_id - 1][1].name;
        this.item3.source = "card_" + this.card_id + "_" + 3 + "_png";
        this.card_name3.text = hszz.CardConfig.cfgs[this.card_id - 1][2].name;
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
                    GameApp.gold += 20;
                    UserTips.inst().showTips("获得元宝x" + 20);
                    // GlobalFun.
                    this.getBool = false;
                    egret.localStorage.setItem("treasure_bool", "false");
                    // this.item_group.visible = false;
                    // this.gold_group.visible = false;
                    var card1vo = hszz.CardConfig.cfgs[this.card_id - 1][0];
                    card1vo.ownNum += 1;
                    GlobalFun.refreshCardData(card1vo);
                    UserTips.inst().showTips("\u83B7\u5F97<font color=" + card1vo.qualityColor + ">" + card1vo.name + "</font>x1");
                    var card2vo = hszz.CardConfig.cfgs[this.card_id - 1][1];
                    ;
                    card2vo.ownNum += 1;
                    GlobalFun.refreshCardData(card2vo);
                    UserTips.inst().showTips("\u83B7\u5F97<font color=" + card2vo.qualityColor + ">" + card2vo.name + "</font>x1");
                    var card3vo = hszz.CardConfig.cfgs[this.card_id - 1][2];
                    card3vo.ownNum += 1;
                    GlobalFun.refreshCardData(card3vo);
                    UserTips.inst().showTips("\u83B7\u5F97<font color=" + card3vo.qualityColor + ">" + card3vo.name + "</font>x1");
                    this.createItem();
                }
                else {
                    console.log("无法领取");
                    UserTips.inst().showTips("十分钟后可再次领取");
                }
                break;
        }
    };
    return TreasureBox;
}(BaseEuiView));
__reflect(TreasureBox.prototype, "TreasureBox");
ViewManager.inst().reg(TreasureBox, LayerManager.UI_Pop);
//# sourceMappingURL=TreasureBox.js.map