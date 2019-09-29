var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UpgradeCfg = (function () {
    function UpgradeCfg() {
        /** 装备上的 */
        this.roleEquip = [
            [], [], []
        ];
        /** 获取的背包 */
        this.bag_equip = [
            [
                {
                    type: ItemType.weapon,
                    cost: 500,
                    icon: "10000.png",
                    name: "诸葛连弩",
                    forTar: Camp.owner,
                    atk: 25,
                    hit: 5,
                    instId: 10000
                },
                {
                    type: ItemType.weapon,
                    cost: 1000,
                    icon: "10001.png",
                    name: "金火罐炮",
                    forTar: Camp.owner,
                    atk: 39,
                    hit: 8,
                    instId: 10001
                }
            ],
            [],
            [],
            []
        ];
        this.select_equip = null;
        this.role_ID = 0;
        /** 角色信息 */
        this.roleData = [
            {
                icon: "upgrade_icon_0_png",
                level: 1,
                attr: {
                    hp: 77,
                    agile: 18,
                    atk: 10,
                    hit: 15,
                    protected: 15,
                    crit: 5 // 暴击
                },
                weaponId: 0,
                protectedId: 0,
                horseAtkId: 0,
                horseProtId: 0
            },
            {
                icon: "upgrade_icon_1_png",
                level: 1,
                attr: {
                    hp: 101,
                    agile: 8,
                    atk: 20,
                    hit: 12,
                    protected: 15,
                    crit: 8 // 暴击
                },
                weaponId: 0,
                protectedId: 0,
                horseAtkId: 0,
                horseProtId: 0
            },
            {
                icon: "upgrade_icon_2_png",
                level: 1,
                attr: {
                    hp: 104,
                    agile: 5,
                    atk: 25,
                    hit: 8,
                    protected: 12,
                    crit: 12 // 暴击
                },
                weaponId: 0,
                protectedId: 0,
                horseAtkId: 0,
                horseProtId: 0
            }
        ];
        this.baseExp = [
            80, 100, 120
        ];
        this.mainExp = [
            0, 0, 0
        ];
        this.levelBonusData = [
            [13, 2, 4, 6, 4, 2],
            [18, 6, 4, 2, 4, 2],
            [17, 20, 4, 2, 5, 4],
        ];
    }
    Object.defineProperty(UpgradeCfg, "ins", {
        get: function () {
            if (this._ins == null) {
                this._ins = new UpgradeCfg();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取角色战斗所需信息 */
    UpgradeCfg.prototype.getRoleInfo = function () {
        var value = [];
        for (var i = 0; i < 3; i++) {
            var role = {
                icon: UpgradeCfg.ins.roleData[i].icon,
                level: UpgradeCfg.ins.roleData[i].level,
                attr: {
                    hp: this.levelBonus("hp", UpgradeCfg.ins.roleData[i], i, 0) + this.equipBonus("hp", this.roleEquip[i]),
                    agile: this.levelBonus("agile", UpgradeCfg.ins.roleData[i], i, 1) + this.equipBonus("agile", this.roleEquip[i]),
                    atk: this.levelBonus("atk", UpgradeCfg.ins.roleData[i], i, 2) + this.equipBonus("atk", this.roleEquip[i]),
                    hit: this.levelBonus("hit", UpgradeCfg.ins.roleData[i], i, 3) + this.equipBonus("hit", this.roleEquip[i]),
                    protected: this.levelBonus("protected", UpgradeCfg.ins.roleData[i], i, 4) + this.equipBonus("protected", this.roleEquip[i]),
                    crit: this.levelBonus("crit", UpgradeCfg.ins.roleData[i], i, 5) + this.equipBonus("crit", this.roleEquip[i]) // 暴击
                },
                weaponId: UpgradeCfg.ins.roleData[i].weaponId,
                protectedId: UpgradeCfg.ins.roleData[i].protectedId,
                horseAtkId: UpgradeCfg.ins.roleData[i].horseAtkId,
                horseProtId: UpgradeCfg.ins.roleData[i].horseProtId
            };
            value.push(role);
        }
        return value;
    };
    /** 添加经验 */
    UpgradeCfg.prototype.addExp = function (exp) {
        for (var i = 0; i < 3; i++) {
            UpgradeCfg.ins.mainExp[i] += exp;
            if (UpgradeCfg.ins.mainExp[i] >= UpgradeCfg.ins.baseExp[i] * UpgradeCfg.ins.roleData[i].level) {
                UpgradeCfg.ins.mainExp[i] -= UpgradeCfg.ins.baseExp[i] * UpgradeCfg.ins.roleData[i].level;
                UpgradeCfg.ins.roleData[i].level++;
                UpgradeCfg.ins.setLocalRoleInfo();
            }
        }
    };
    UpgradeCfg.prototype.levelBonus = function (_name, _data, role, id) {
        var value = 0;
        value += _data.attr[_name] + UpgradeCfg.ins.levelBonusData[role][id] * (_data.level - 1);
        return value;
    };
    UpgradeCfg.prototype.equipBonus = function (_name, data) {
        var value = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i][_name]) {
                value += data[i][_name];
            }
        }
        return value;
    };
    UpgradeCfg.prototype.setLocalRoleInfo = function () {
        egret.localStorage.setItem("role_equip", JSON.stringify(UpgradeCfg.ins.roleEquip));
        egret.localStorage.setItem("role_info", JSON.stringify(UpgradeCfg.ins.roleData));
        egret.localStorage.setItem("have_exp", JSON.stringify(UpgradeCfg.ins.mainExp));
    };
    UpgradeCfg.prototype.getLocalRoleInfo = function () {
        if (!egret.localStorage.getItem("role_equip")) {
        }
        else {
            UpgradeCfg.ins.roleEquip = JSON.parse(egret.localStorage.getItem("role_equip"));
        }
        if (!egret.localStorage.getItem("role_info")) {
        }
        else {
            UpgradeCfg.ins.roleData = JSON.parse(egret.localStorage.getItem("role_info"));
        }
        if (!egret.localStorage.getItem("have_exp")) {
        }
        else {
            UpgradeCfg.ins.mainExp = JSON.parse(egret.localStorage.getItem("have_exp"));
        }
    };
    return UpgradeCfg;
}());
__reflect(UpgradeCfg.prototype, "UpgradeCfg");
//# sourceMappingURL=UpgradeCfg.js.map