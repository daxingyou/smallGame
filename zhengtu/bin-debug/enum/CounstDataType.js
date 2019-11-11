/**
 * 自定义数据类型 以及枚举
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BuildType;
(function (BuildType) {
    /**矿洞 */
    BuildType[BuildType["kuangdong"] = 0] = "kuangdong";
    /**木材厂 */
    BuildType[BuildType["woods"] = 1] = "woods";
    /**粮仓 */
    BuildType[BuildType["goods"] = 2] = "goods";
})(BuildType || (BuildType = {}));
var ActionState = (function () {
    function ActionState() {
    }
    ActionState.RUN = "run";
    ActionState.ATTACK = "attack";
    ActionState.DEAD = 'dead';
    ActionState.STAND = "stand";
    ActionState.HIT = "hit";
    return ActionState;
}());
__reflect(ActionState.prototype, "ActionState");
//# sourceMappingURL=CounstDataType.js.map