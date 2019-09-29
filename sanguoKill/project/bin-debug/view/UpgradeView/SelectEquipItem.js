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
var SelectEquipItem = (function (_super) {
    __extends(SelectEquipItem, _super);
    function SelectEquipItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "SelectEquipItemSkin";
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.add_view_handler, _this);
        MessageManager.inst().addListener(CustomEvt.SELECT_EQUIP, _this.selectHandler, _this);
        return _this;
    }
    SelectEquipItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.card.texture = RES.getRes("" + this.data.instId + "_jpg");
        this.state_img.visible = false;
        if (this.data.type == ItemType.weapon || this.data.type == ItemType.weapon_ma) {
            this.bonus_0.text = "攻击:" + this.data.atk;
            if (this.data.type == ItemType.weapon) {
                this.bonus_1.text = "命中:" + this.data.hit;
            }
            else {
                this.bonus_1.text = "暴击:" + this.data.crit;
            }
        }
        else {
            this.bonus_0.text = "防御:" + this.data.protect;
            if (this.data.type == ItemType.protection) {
                this.bonus_1.text = "生命:" + this.data.hp;
            }
            else {
                this.bonus_1.text = "敏捷:" + this.data.agile;
            }
        }
        if (this.itemIndex == 0 && !UpgradeCfg.ins.select_equip) {
            UpgradeCfg.ins.select_equip = this.data;
        }
    };
    SelectEquipItem.prototype.add_view_handler = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
    };
    SelectEquipItem.prototype.selectHandler = function (e) {
        console.log(e.data);
        if (e.data.id != this.itemIndex) {
            this.state_img.visible = false;
        }
    };
    SelectEquipItem.prototype.touchTapHandler = function () {
        UpgradeCfg.ins.select_equip = this.data;
        this.state_img.visible = true;
        MessageManager.inst().dispatch(CustomEvt.SELECT_EQUIP, { id: this.itemIndex });
    };
    return SelectEquipItem;
}(eui.ItemRenderer));
__reflect(SelectEquipItem.prototype, "SelectEquipItem");
//# sourceMappingURL=SelectEquipItem.js.map