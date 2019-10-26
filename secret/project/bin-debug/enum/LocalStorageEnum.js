var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**角色钻石数量 */
    LocalStorageEnum.GEM_NUM = "secret_gemNum";
    /**角色体力值 */
    LocalStorageEnum.HEALTH = "sectrt_strength";
    /**当前男友关卡 */
    LocalStorageEnum.LEVEL = "secret_level";
    /**当前女友关卡 */
    LocalStorageEnum.WOMANLEVEL = "secret_wo_level";
    /**当前通关记录 */
    LocalStorageEnum.PASS = "secret_pass";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map