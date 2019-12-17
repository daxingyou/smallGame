var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**商城购买人物时的id */
    LocalStorageEnum.GENERALId = "999996";
    /**人物经验 */
    LocalStorageEnum.EXP = "999997";
    /**当前税收的数量 */
    LocalStorageEnum.TAX_NUM = "999998";
    /**第一次进入 */
    LocalStorageEnum.ENTER_FIRST = "999999";
    /**人物元宝 */
    LocalStorageEnum.ROLE_GOLD = "1000000";
    /**人物功勋 */
    LocalStorageEnum.ROLE_MEDAL = "1000001";
    /**人物粮草 */
    LocalStorageEnum.ROLE_GOODS = "1000002";
    /**骑兵数量 */
    LocalStorageEnum.SOLDIER1 = "1000003";
    /**弓兵数量 */
    LocalStorageEnum.SOLDIER2 = "1000004";
    /**盾甲兵数量 */
    LocalStorageEnum.SOLDIER3 = "1000005";
    /**当前年限 */
    LocalStorageEnum.YEAR = "1000006";
    /**人物信息 */
    LocalStorageEnum.ROLEINFO = "1000007";
    /**卡牌信息 */
    LocalStorageEnum.CARDINFO = "1000008";
    /**主城税收开始时间 */
    LocalStorageEnum.mainTaxTimespan = "1000009";
    /**征兵开始时间 */
    LocalStorageEnum.collectTime = "1000010";
    /**征兵cd时间 */
    LocalStorageEnum.COLLECT_CD_TIME = "1000011";
    /**征兵类型 */
    LocalStorageEnum.COLLECT_SOLDIER_TYPE = "1000012";
    /**征兵距离 */
    LocalStorageEnum.COLLECT_SOLDIER_DIS = "1000013";
    /**连胜次数 */
    LocalStorageEnum.WIN_COUNT = "wincount";
    /**税收cd时间 */
    LocalStorageEnum.TAX_CD_TIME = "1000014";
    /**内务数量 */
    LocalStorageEnum.NEYWU_COUNT = "1000015";
    /**内务cd时间 */
    LocalStorageEnum.NEIWU_CD_TIME = "1000016";
    /**移除移动的卡牌 */
    LocalStorageEnum.REMOVE_MOVE_CARD = "100000000";
    /**创建移动卡牌 */
    LocalStorageEnum.CREATE_MOVE_ROLE = "100000001";
    /**创建上场人物 */
    LocalStorageEnum.CREATE_PLAYER = "100000002";
    /**刷新卡牌列表 */
    LocalStorageEnum.UPDATE_GAME_CARD = "100000003";
    /**创建移动建筑 */
    LocalStorageEnum.CREATE_MOVE_BUILD = "100000004";
    /**开始战斗 */
    LocalStorageEnum.GO_FIGHTING = "100000005";
    /**npc战斗 */
    LocalStorageEnum.NPC_FIGHTING = "100000006";
    /**player战斗 */
    LocalStorageEnum.PLAYER_FIGHTING = "100000007";
    /**npc减血 */
    LocalStorageEnum.NPC_SUBHP = "100000008";
    /**暂停 */
    LocalStorageEnum.GAME_PAUSE = "100000009";
    /**开始 */
    LocalStorageEnum.GAME_START = "100000010";
    /**切换方阵 */
    LocalStorageEnum.SWITCH_NPC = "100000011";
    LocalStorageEnum.SWITCH_PLAPER = "100000012";
    LocalStorageEnum.PLAYER_SUBHP = "100000013";
    LocalStorageEnum.CREATE_BULLET = "100000014";
    LocalStorageEnum.CREATE_MOVE_SKILL = "100000015";
    /**释放技能 */
    LocalStorageEnum.RELEASE_SKILLS = "100000016";
    LocalStorageEnum.GEANGUANHUO = "100000017";
    /**章节id */
    LocalStorageEnum.CHAPTERID = "100000018";
    /** 关卡id*/
    LocalStorageEnum.LEVELID = "100000019";
    LocalStorageEnum.CREATE_SOLDIERS = "CREATE_SOLDIERS";
    LocalStorageEnum.DOUBTFUL_MOVE_ROLE = "DOUBTFUL_MOVE_ROLE";
    LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER = "DOUBTFUL_MOVE_SOLDIER";
    LocalStorageEnum.BEGIN_MOVE_CARD = "100000020";
    LocalStorageEnum.SEND_BATTLE_POS = "100000021";
    LocalStorageEnum.QINGBAO = "QINGBAO";
    LocalStorageEnum.CLOSE_CARDINFO = "CLOSE_CARDINFO";
    return LocalStorageEnum;
}());
__reflect(LocalStorageEnum.prototype, "LocalStorageEnum");
var PointObj = (function () {
    function PointObj() {
    }
    return PointObj;
}());
__reflect(PointObj.prototype, "PointObj");
//# sourceMappingURL=LocalStorageEnum.js.map