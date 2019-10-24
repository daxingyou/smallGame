var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**角色元宝数量 */
    LocalStorageEnum.GOLD_NUM = "goldNum";
    /**角色当前使用的人物信息索引*/
    LocalStorageEnum.ROLE_INDEX = "roleIndex";
    /**是否第一次进入游戏 */
    LocalStorageEnum.ENTER_FIRST = "first";
    /**第一次进入游戏的时间 */
    LocalStorageEnum.FIRST_TIME = "first_time";
    /**当前人物经验值 */
    LocalStorageEnum.ROLE_EXP = "role_exp";
    /**当前人物等级总经验值 */
    LocalStorageEnum.ROLE_MAIN_EXP = "role_main_exp";
    /**人物等级 */
    LocalStorageEnum.ROLE_LEVEL = "role_level";
    /**人物战斗力 */
    LocalStorageEnum.POWER = "power";
    /**人物信息 */
    LocalStorageEnum.ROLE_DATA = "role_data";
    /**背包数据 */
    LocalStorageEnum.ROLE_BAG = "role_bag";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map