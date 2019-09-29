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
var UpgradeItem = (function (_super) {
    __extends(UpgradeItem, _super);
    function UpgradeItem(data, id) {
        var _this = _super.call(this) || this;
        _this._id = 0;
        _this._data = data;
        _this._id = id;
        _this.addEvent(egret.Event.ADDED_TO_STAGE, _this, _this.add_view_handler);
        return _this;
    }
    UpgradeItem.prototype.add_view_handler = function () {
        this.init();
        this.addTouchEvent(this.equip_weapon_btn, this.touchHandler, true);
        this.addTouchEvent(this.equip_protected_btn, this.touchHandler, true);
        this.addTouchEvent(this.equip_horseAtk_btn, this.touchHandler, true);
        this.addTouchEvent(this.equip_horseProt_btn, this.touchHandler, true);
        MessageManager.inst().addListener(CustomEvt.SELECT_EQUIP_UPDATA, this.selectEquipUpdate, this);
    };
    UpgradeItem.prototype.onWeaponTouch = function () {
        UpgradeCfg.ins.role_ID = this._id;
        ViewManager.inst().open(SelectEquipView, [0]);
    };
    UpgradeItem.prototype.init = function () {
        this.icon.texture = RES.getRes(this._data.icon);
        this.selectEquipUpdate();
    };
    UpgradeItem.prototype.selectEquipUpdate = function () {
        UpgradeCfg.ins.roleEquip[this._id] = [];
        {
            // if( UpgradeCfg.ins.roleData[this._id].weaponId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].weaponId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].weaponId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }
            // if( UpgradeCfg.ins.roleData[this._id].protectedId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].protectedId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].protectedId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }
            // if( UpgradeCfg.ins.roleData[this._id].horseAtkId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].horseAtkId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].horseAtkId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }
            // if( UpgradeCfg.ins.roleData[this._id].horseProtId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].horseProtId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].weaponId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }   
        }
        var _name = [
            "weaponId", "protectedId", "horseAtkId", "horseProtId"
        ];
        var _texture_name = [
            "equip_weapon", "equip_protected", "equip_horseAtk", "equip_horseProt"
        ];
        for (var i = 0; i < _name.length; i++) {
            if (UpgradeCfg.ins.roleData[this._id][_name[i]]) {
                for (var j = 0; j < ItemCfg.itemCfg.length; j++) {
                    if (UpgradeCfg.ins.roleData[this._id][_name[i]] == ItemCfg.itemCfg[j].instId) {
                        console.log(UpgradeCfg.ins.roleData[this._id][_name[i]], ItemCfg.itemCfg[j].instId);
                        UpgradeCfg.ins.roleEquip[this._id].push(ItemCfg.itemCfg[j]);
                        this[_texture_name[i]].texture = RES.getRes("upgrade_" + UpgradeCfg.ins.roleData[this._id][_name[i]] + "_jpg");
                    }
                }
            }
            else {
                this[_texture_name[i]].texture = null;
            }
        }
        this.updataInfo();
    };
    UpgradeItem.prototype.updataInfo = function () {
        this.level.text = "Lv." + this._data.level.toString();
        this.hp.text = "生命:" + (this.levelBonus("hp", 0) + this.equipBonus("hp", UpgradeCfg.ins.roleEquip[this._id]));
        this.agile.text = "敏捷:" + (this.levelBonus("agile", 1) + this.equipBonus("agile", UpgradeCfg.ins.roleEquip[this._id]));
        this.atk.text = "攻击:" + (this.levelBonus("atk", 2) + this.equipBonus("atk", UpgradeCfg.ins.roleEquip[this._id]));
        this.hit.text = "命中:" + (this.levelBonus("hit", 3) + this.equipBonus("hit", UpgradeCfg.ins.roleEquip[this._id]));
        this.protected.text = "防御:" + (this.levelBonus("protected", 4) + this.equipBonus("protected", UpgradeCfg.ins.roleEquip[this._id]));
        this.crit.text = "暴击:" + (this.levelBonus("crit", 5) + this.equipBonus("crit", UpgradeCfg.ins.roleEquip[this._id]));
    };
    UpgradeItem.prototype.touchHandler = function (e) {
        var num = 0;
        switch (e.target) {
            case this.equip_weapon_btn:
                num = 0;
                break;
            case this.equip_protected_btn:
                num = 1;
                break;
            case this.equip_horseAtk_btn:
                num = 2;
                break;
            case this.equip_horseProt_btn:
                num = 3;
                break;
        }
        UpgradeCfg.ins.role_ID = this._id;
        ViewManager.inst().open(SelectEquipView, [num]);
    };
    UpgradeItem.prototype.levelBonus = function (_name, num) {
        var value = 0;
        value += this._data.attr[_name] + UpgradeCfg.ins.levelBonusData[this._id][num] * (this._data.level - 1);
        return value;
    };
    UpgradeItem.prototype.equipBonus = function (_name, data) {
        var value = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i][_name]) {
                value += data[i][_name];
            }
        }
        console.log(value);
        return value;
    };
    UpgradeItem.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    UpgradeItem.prototype.close = function () {
    };
    return UpgradeItem;
}(BaseEuiView));
__reflect(UpgradeItem.prototype, "UpgradeItem");
//# sourceMappingURL=UpgradeItem.js.map