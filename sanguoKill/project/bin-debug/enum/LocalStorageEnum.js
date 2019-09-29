var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**角色金币 */
    LocalStorageEnum.ROLE_GOLD = "role_gold";
    /**背包剩余容量 */
    LocalStorageEnum.BAG_REMAIN = "bag_remain";
    /**第一次加入 */
    LocalStorageEnum.FIRST_ENTER = "first_enter";
    /**是否执行过引导 */
    LocalStorageEnum.GUIDED = "guided";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map