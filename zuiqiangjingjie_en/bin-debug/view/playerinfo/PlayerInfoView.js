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
var PlayerInfoView = (function (_super) {
    __extends(PlayerInfoView, _super);
    function PlayerInfoView() {
        var _this = _super.call(this) || this;
        _this.cityName = [];
        _this.roleName = [];
        _this.bingName = [];
        _this.atkNum = 0;
        return _this;
    }
    PlayerInfoView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.name_label.text = GameApp.roleInfo.name;
        this.gold_label.text = "" + GameApp.gold;
        this.goods_label.text = "" + GameApp.goods;
        this.medal_label.text = "" + GameApp.medal;
        this.soldier_label.text = "" + GameApp.exp;
        this.init();
        this.addTouchEvent(this.close_btn, this.touchClose);
    };
    PlayerInfoView.prototype.close = function () {
        this.removeTouchEvent(this.close_btn, this.touchClose);
    };
    PlayerInfoView.prototype.init = function () {
        var city = GameApp.roleInfo.citys;
        for (var i = 0; i < city.length; i++) {
            if (city[i].isMain == true || city[i].isOnly) {
                this.cityName.push(city[i].name);
            }
        }
        var card = GlobalFun.getCardsFromType(CardType.general);
        for (var i = 0; i < card.length; i++) {
            this.roleName.push(card[i].name);
            this.atkNum += card[i].atk;
        }
        for (var i = 0; i < GameApp.soldier1Num; i++) {
            this.atkNum += GameCfg.bingDate[1].attack;
        }
        for (var i = 0; i < GameApp.soldier2Num; i++) {
            this.atkNum += GameCfg.bingDate[2].attack;
        }
        for (var i = 0; i < GameApp.soldier3Num; i++) {
            this.atkNum += GameCfg.bingDate[3].attack;
        }
        this.fighting_p.text = "" + this.atkNum;
        for (var i = 0; i < this.cityName.length; i++) {
            this.city_name.text += (this.cityName[i] + "  ");
        }
        this.role_list.itemRenderer = RoleName;
        this.role_list.dataProvider = new eui.ArrayCollection(this.roleName);
        var cardBing = GlobalFun.getCardsFromType(CardType.soldier, false);
        this.bingName = cardBing;
        this.legion_list.itemRenderer = LegionInfo;
        this.legion_list.dataProvider = new eui.ArrayCollection(this.bingName);
    };
    PlayerInfoView.prototype.touchClose = function () {
        ViewManager.inst().close(PlayerInfoView);
    };
    return PlayerInfoView;
}(BaseEuiView));
__reflect(PlayerInfoView.prototype, "PlayerInfoView");
ViewManager.inst().reg(PlayerInfoView, LayerManager.UI_Main);
//# sourceMappingURL=PlayerInfoView.js.map