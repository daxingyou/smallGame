var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**是否第一次进入游戏 */
    LocalStorageEnum.IS_FIRST_ENTER = "is_fitst_enter";
    /**当前是否已经通过新手引导 */
    LocalStorageEnum.IS_PASS_GUIDE = "is_pass_guide";
    /**当前拥有的武将以及相关属性 */
    LocalStorageEnum.OWN_GENERAL = "own_general";
    /**人物黄金数量 */
    LocalStorageEnum.ROLE_GOLD = "roleGOLD";
    /**人物生铁数量 */
    LocalStorageEnum.ROLE_FE = "roleFE";
    /**人物粮草数量 */
    LocalStorageEnum.ROLE_GOOD = "roleGood";
    /**人物木材数量 */
    LocalStorageEnum.ROLE_WOOD = "roleWood";
    /**当前关卡*/
    LocalStorageEnum.LEVEL = "level";
    /**当前在关卡可以招募的英雄 */
    LocalStorageEnum.OTHER_GENERAL = "other_general";
    /**商城购买英雄 */
    LocalStorageEnum.SHOP_GENERAL = "shop_general";
    /**物资开始时间戳 */
    LocalStorageEnum.FE_TIMESPAN = "fe_timespan";
    LocalStorageEnum.WOOD_TIMESPAN = "wood_timespan";
    LocalStorageEnum.GOOD_TIMESPAN = "good_timespan";
    /**当前屯的兵种的数量 */
    LocalStorageEnum.OWNSOLDIERS = "ownSoldiers";
    /**当前要生产的兵的数量 */
    LocalStorageEnum.OWNPRODUCTSOLDIERS = "ownProductSoldiers";
    /**通过的关卡记录 */
    LocalStorageEnum.PASS_CHAPTER = "pass_chapter";
    /**副本开启时间1 */
    LocalStorageEnum.FUBEN_TIME1 = "fuben_time1";
    /**副本开启时间2 */
    LocalStorageEnum.FUBEN_TIME2 = "fuben_time2";
    /**副本开启时间2 */
    LocalStorageEnum.FUBEN_TIME3 = "fuben_time3";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map