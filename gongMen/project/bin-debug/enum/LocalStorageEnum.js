var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**角色职业 */
    LocalStorageEnum.ROLE_JOB = "role_job";
    /**角色名字 */
    LocalStorageEnum.ROLE_NAME = "roleName";
    /**角色元宝数量 */
    LocalStorageEnum.GOLD_NUM = "goldNum";
    /**角色职称 */
    LocalStorageEnum.LEVEL_NUM = "levelName";
    /**角色头像字段 */
    LocalStorageEnum.HEAD_ICON = "headIcon";
    /**是否第一次进入游戏 */
    LocalStorageEnum.ENTER_FIRST = "first";
    /**当前人物经验值 */
    LocalStorageEnum.ROLE_EXP = "role_exp";
    /**当前人物等级总经验值 */
    LocalStorageEnum.ROLE_MAIN_EXP = "role_main_exp";
    /**物品总数量 */
    LocalStorageEnum.GOODS_NUM = "goodsNum";
    /**所拥有的物品数据 */
    LocalStorageEnum.GOODS = "goods";
    /**当前练兵剩余时间*/
    LocalStorageEnum.TRAINREMINTIME = "trainReminTime";
    /**本次练兵获得经验值 */
    LocalStorageEnum.TRAIN_EXP = "train_exp";
    /**练兵状态 */
    LocalStorageEnum.TRAIN_STATE = "train_state";
    /**当前是否选择阵营 */
    LocalStorageEnum.CAMP = "camp";
    /**当前答题次数 */
    LocalStorageEnum.ANSWER_COUNT = "answer_count";
    /**当前答题时间戳 */
    LocalStorageEnum.ANSWER_TIMESPAN = "answer_timespan";
    /**集市信息 */
    LocalStorageEnum.MARKET_INFO = "market_info";
    /**田野信息 */
    LocalStorageEnum.FIELD_INFO = "field_info";
    /**当前关卡 */
    LocalStorageEnum.LEVEL = "level";
    /**武将酒馆招募信息 */
    LocalStorageEnum.GENERAL_GET = "general_get";
    /**太学技能激活信息 */
    LocalStorageEnum.STUDY_BUFF1_LEVEL = "study_buff1_level";
    LocalStorageEnum.STUDY_BUFF2_LEVEL = "study_buff2_level";
    LocalStorageEnum.STUDY_BUFF3_LEVEL = "study_buff3_level";
    /**人物战斗力 */
    LocalStorageEnum.POWER = "power";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
//# sourceMappingURL=LocalStorageEnum.js.map