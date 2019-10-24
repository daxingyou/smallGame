var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**人物金币 */
    LocalStorageEnum.ROLE_GOLD = "hszz_10000";
    /**人物勋章 */
    LocalStorageEnum.ROLE_MEDAL = "hszz_10001";
    /**人物经验 */
    LocalStorageEnum.ROLE_EXP = "hszz_10002";
    /**人物等级 */
    LocalStorageEnum.ROLE_LEVEL = "hszz_10003";
    /**人物卡牌列表数据 */
    LocalStorageEnum.ROLE_OWNER_CARDIDS = "hszz_10004";
    /**商店碎片 */
    LocalStorageEnum.SHOP_ROLE = "hszz_10005";
    /**商店碎片数量 */
    LocalStorageEnum.SHOP_ROLE_NUM = "hszz_10006";
    /**宝箱时间 */
    LocalStorageEnum.BOX_TIME = "hszz_10007";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map