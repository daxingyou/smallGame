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
var UpgradeView = (function (_super) {
    __extends(UpgradeView, _super);
    function UpgradeView() {
        return _super.call(this) || this;
    }
    UpgradeView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.content.x = (StageUtils.inst().getWidth() >> 1) - 739 / 2;
        this.content.y = (StageUtils.inst().getHeight() >> 1) - 470 / 2;
        this.close_btn.x = StageUtils.inst().getWidth() - 60;
        this.close_btn.y = 10;
        this.guideRect.x = this.content.width - 100;
        for (var i = 0; i < 3; i++) {
            var data = UpgradeCfg.ins.roleData[i];
            var item = new UpgradeItem(data, i);
            this.role.addChild(item);
            item.y = i * 158;
        }
        this.addTouchEvent(this.close_btn, this.closeBtnHandler, true);
        // MessageManager.inst().addListener(CustomEvt.SELECT_EQUIP_UPDATA,this.onRandom,this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_CHANGE, this.onEquipChange, this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_Equip_CLOSE, this.onCloseEquip, this);
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                GameApp.guideView.nextStep({ id: "1_7", comObj: this.guideRect, width: 100, height: 40 });
            }
        }
    };
    UpgradeView.prototype.onCloseEquip = function () {
        this.closeBtnHandler();
        GameApp.isLast = true;
        ViewManager.inst().open(MenuView, [{ guideId: "1_10" }]);
    };
    UpgradeView.prototype.refreshPage = function () {
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                GameApp.guideView.nextStep({ id: "1_9", comObj: this.close_btn, width: 55, height: 55 }, -90);
            }
        }
    };
    UpgradeView.prototype.onEquipChange = function () {
        var item = this.role.getChildAt(0);
        if (item) {
            item.onWeaponTouch();
        }
    };
    UpgradeView.prototype.closeBtnHandler = function () {
        ViewManager.inst().close(UpgradeView);
    };
    UpgradeView.prototype.close = function () {
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_CHANGE, this.onEquipChange, this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_Equip_CLOSE, this.onCloseEquip, this);
    };
    return UpgradeView;
}(BaseEuiView));
__reflect(UpgradeView.prototype, "UpgradeView");
ViewManager.inst().reg(UpgradeView, LayerManager.UI_Main);
//# sourceMappingURL=UpgradeView.js.map