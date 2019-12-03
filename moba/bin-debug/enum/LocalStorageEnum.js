var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**人物等级 */
    LocalStorageEnum.Role_level = "moba_10000";
    /**人物当前经验 */
    LocalStorageEnum.Role_exp = "moba_10001";
    /**人物当前元宝 */
    LocalStorageEnum.Role_gold = "moba_10002";
    /**当前技能等级 */
    LocalStorageEnum.Skill_Level = "moba_10003";
    /**当前人物装备id集合 */
    LocalStorageEnum.Role_equip = "moba_10004";
    /**当前是否是第一次进入游戏 */
    LocalStorageEnum.Enter_first = "moba_10005";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map