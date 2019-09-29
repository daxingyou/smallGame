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
var SelectEquipView = (function (_super) {
    __extends(SelectEquipView, _super);
    function SelectEquipView() {
        return _super.call(this) || this;
    }
    SelectEquipView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var id = param[0];
        if (id >= 2) {
            id++;
        }
        this.content.x = (StageUtils.inst().getWidth() >> 1) - 850 / 2;
        this.content.y = (StageUtils.inst().getHeight() >> 1) - 421 / 2;
        this.list.itemRenderer = SelectEquipItem;
        this.list.dataProvider = new eui.ArrayCollection(GlobalFun.getBagData(id)); // 此处获取设置装备时，所需要获取的装备
        this.addTouchEvent(this.confirm, this.touchHandler, true);
        this.addTouchEvent(this.cancel, this.touchHandler, true);
        if (GameApp.guilding) {
            if (GameApp.guideView) {
                GameApp.guideView.nextStep({ id: "1_8", comObj: this.confirm, width: 146, height: 54 });
            }
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_Equip, this.onEquip, this);
    };
    SelectEquipView.prototype.onEquip = function () {
        this.confirmHandler();
        ViewManager.inst().open(UpgradeView);
    };
    SelectEquipView.prototype.touchHandler = function (e) {
        switch (e.target) {
            case this.confirm:
                this.confirmHandler();
                break;
            case this.cancel:
                ViewManager.inst().close(SelectEquipView);
                break;
        }
    };
    SelectEquipView.prototype.confirmHandler = function () {
        if (UpgradeCfg.ins.select_equip == null) {
            UserTips.inst().showTips("请先选择装备！");
        }
        else {
            var id = 0;
            switch (UpgradeCfg.ins.select_equip.type) {
                case ItemType.weapon:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].weaponId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].weaponId = UpgradeCfg.ins.select_equip.instId;
                    break;
                case ItemType.protection:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].protectedId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].protectedId = UpgradeCfg.ins.select_equip.instId;
                    break;
                case ItemType.weapon_ma:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseAtkId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseAtkId = UpgradeCfg.ins.select_equip.instId;
                    break;
                case ItemType.protection_ma:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseProtId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseProtId = UpgradeCfg.ins.select_equip.instId;
                    break;
            }
            MessageManager.inst().dispatch(CustomEvt.SELECT_EQUIP_UPDATA);
            // 设置穿上卸下装备方法
            if (id == 0) {
                GlobalFun.setBagData(UpgradeCfg.ins.select_equip.instId);
            }
            else {
                var equip = void 0;
                for (var i = 0; i < ItemCfg.itemCfg.length; i++) {
                    if (ItemCfg.itemCfg[i].instId == id) {
                        equip = ItemCfg.itemCfg[i];
                    }
                }
                GlobalFun.change(UpgradeCfg.ins.select_equip, equip);
            }
            UpgradeCfg.ins.setLocalRoleInfo();
            /**  ****************  */
            ViewManager.inst().close(SelectEquipView);
        }
    };
    SelectEquipView.prototype.close = function () {
        this.removeTouchEvent(this.confirm, this.touchHandler);
        this.removeTouchEvent(this.cancel, this.touchHandler);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_Equip, this.onEquip, this);
    };
    return SelectEquipView;
}(BaseEuiView));
__reflect(SelectEquipView.prototype, "SelectEquipView");
ViewManager.inst().reg(SelectEquipView, LayerManager.UI_Main);
//# sourceMappingURL=SelectEquipView.js.map