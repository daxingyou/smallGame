var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.setAdventure = function (_id) {
        for (var i = 0; i < GameConfig.adventure.length; i++) {
            if (GameConfig.adventure[i].id == _id) {
                GameConfig.adventure[i].num++;
            }
        }
    };
    GameConfig.hebing = function () {
        GameConfig.always_any = [];
        for (var i = 0; i < GameConfig.monsterFig.length; i++) {
            GameConfig.always_any.push(GameConfig.monsterFig[i]);
        }
        for (var i = 0; i < GameConfig.playerFig.length; i++) {
            GameConfig.always_any.push(GameConfig.playerFig[i]);
        }
        GameConfig.paixv();
    };
    /**排序 */
    GameConfig.paixv = function () {
        var n = GameConfig.always_any.length;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n - i - 1; j++) {
                if (GameConfig.always_any[j].y > GameConfig.always_any[j + 1].y) {
                    var any = GameConfig.always_any[j];
                    GameConfig.always_any[j] = GameConfig.always_any[j + 1];
                    GameConfig.always_any[j + 1] = any;
                }
            }
        }
    };
    GameConfig.gq = 0;
    GameConfig.auto_bool = false;
    GameConfig.playerFig = [];
    GameConfig.monsterFig = [];
    GameConfig.gqFig = [
        [1, 1, 1, -1],
        [1, 2, 2, -1],
        [2, 2, 3, -1],
        [2, 3, 3, -1]
    ];
    GameConfig.gqFig_monster = [
        [6, 6, 1, 3],
        [2, 2, 7, 5],
        [8, 8, 9, 3],
        [9, 9, 3, 5],
    ];
    GameConfig.monster_qian = [];
    GameConfig.monster_zhong = [];
    GameConfig.monster_hou = [];
    GameConfig.player_qian = [];
    GameConfig.player_hou = [];
    GameConfig.adventure = [
        { id: 10000, name: "火晶", num: 0 },
        { id: 10001, name: "木晶", num: 0 },
        { id: 10002, name: "水晶", num: 0 },
        { id: 10003, name: "中级火晶", num: 0 },
        { id: 10004, name: "中级木晶", num: 0 },
        { id: 10005, name: "中级水晶", num: 0 },
        { id: 10006, name: "高级火晶", num: 0 },
        { id: 10007, name: "高级木晶", num: 0 },
        { id: 10008, name: "高级水晶", num: 0 },
        { id: 10009, name: "初级卷轴", num: 0 },
        { id: 10010, name: "中级卷轴", num: 0 },
        { id: 10011, name: "高级卷轴", num: 0 },
        { id: 10012, name: "英雄碎片", num: 0 },
        { id: 10013, name: "英雄碎片", num: 0 },
        { id: 10014, name: "英雄碎片", num: 0 }
    ];
    GameConfig.fight_state = null;
    /**人物总数组 */
    GameConfig.always_any = [];
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map