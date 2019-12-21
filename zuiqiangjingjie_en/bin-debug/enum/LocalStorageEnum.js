var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LocalStorageEnum = (function () {
    function LocalStorageEnum() {
    }
    /**When shopping for peopleid */
    LocalStorageEnum.GENERALId = "999996";
    /**Character experience */
    LocalStorageEnum.EXP = "999997";
    /**Number of current taxes */
    LocalStorageEnum.TAX_NUM = "999998";
    /**First entry */
    LocalStorageEnum.ENTER_FIRST = "999999";
    /**Character gold */
    LocalStorageEnum.ROLE_GOLD = "1000000";
    /**Medal of honor */
    LocalStorageEnum.ROLE_MEDAL = "1000001";
    /**Character materials */
    LocalStorageEnum.ROLE_GOODS = "1000002";
    /**Troopers */
    LocalStorageEnum.SOLDIER1 = "1000003";
    /**Number of bowmen */
    LocalStorageEnum.SOLDIER2 = "1000004";
    /**Number of shield soldiers */
    LocalStorageEnum.SOLDIER3 = "1000005";
    /**Current age */
    LocalStorageEnum.YEAR = "1000006";
    /**Character information */
    LocalStorageEnum.ROLEINFO = "1000007";
    /**Card information */
    LocalStorageEnum.CARDINFO = "1000008";
    /**Main city tax start time */
    LocalStorageEnum.mainTaxTimespan = "1000009";
    /**Conscription start time */
    LocalStorageEnum.collectTime = "1000010";
    /**conscriptioncdtime */
    LocalStorageEnum.COLLECT_CD_TIME = "1000011";
    /**Conscription type */
    LocalStorageEnum.COLLECT_SOLDIER_TYPE = "1000012";
    /**Conscription distance */
    LocalStorageEnum.COLLECT_SOLDIER_DIS = "1000013";
    /**Winning streak */
    LocalStorageEnum.WIN_COUNT = "wincount";
    /**tax revenuecdtime */
    LocalStorageEnum.TAX_CD_TIME = "1000014";
    /**Number of internal affairs */
    LocalStorageEnum.NEYWU_COUNT = "1000015";
    /**The interiorcdtime */
    LocalStorageEnum.NEIWU_CD_TIME = "1000016";
    /**Remove moving cards */
    LocalStorageEnum.REMOVE_MOVE_CARD = "100000000";
    /**Create a mobile card */
    LocalStorageEnum.CREATE_MOVE_ROLE = "100000001";
    /**Create characters */
    LocalStorageEnum.CREATE_PLAYER = "100000002";
    /**Refresh card list */
    LocalStorageEnum.UPDATE_GAME_CARD = "100000003";
    /**Create a mobile building */
    LocalStorageEnum.CREATE_MOVE_BUILD = "100000004";
    /**Start fighting */
    LocalStorageEnum.GO_FIGHTING = "100000005";
    /**npcBattle */
    LocalStorageEnum.NPC_FIGHTING = "100000006";
    /**playerBattle */
    LocalStorageEnum.PLAYER_FIGHTING = "100000007";
    /**npcReduce blood */
    LocalStorageEnum.NPC_SUBHP = "100000008";
    /**suspend */
    LocalStorageEnum.GAME_PAUSE = "100000009";
    /**start */
    LocalStorageEnum.GAME_START = "100000010";
    /**Switching matrix */
    LocalStorageEnum.SWITCH_NPC = "100000011";
    LocalStorageEnum.SWITCH_PLAPER = "100000012";
    LocalStorageEnum.PLAYER_SUBHP = "100000013";
    LocalStorageEnum.CREATE_BULLET = "100000014";
    LocalStorageEnum.CREATE_MOVE_SKILL = "100000015";
    /**Release skills */
    LocalStorageEnum.RELEASE_SKILLS = "100000016";
    LocalStorageEnum.GEANGUANHUO = "100000017";
    /**chapterid */
    LocalStorageEnum.CHAPTERID = "100000018";
    /** Checkpointid*/
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