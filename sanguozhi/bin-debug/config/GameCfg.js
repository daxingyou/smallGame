var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameCfg = (function () {
    function GameCfg() {
    }
    GameCfg.wjAny = [];
    GameCfg.chapter = 1;
    GameCfg.level = 1;
    GameCfg.gameStart = false;
    GameCfg.playerPH = 0;
    GameCfg.playerPH_max = 0;
    GameCfg.playerAttack = 0;
    GameCfg.npcAttack = 0;
    GameCfg.npcPH = 0;
    GameCfg.npcPH_max = 0;
    GameCfg.pp = [];
    GameCfg.np = [];
    GameCfg.resultBool = false;
    GameCfg.bingDate = {
        1: { hp: 80, attack: 40 },
        2: { hp: 100, attack: 20 },
        3: { hp: 120, attack: 30 }
    };
    GameCfg.levelCfg = [
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ],
        [
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100105, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100113, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 1, soldierID: 100109, generalId: 0 }, { genrealRes: "role_10002", soldierType: 1, soldierID: 100110, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100111, generalId: 0 }],
            [{ genrealRes: "role_10002", soldierType: 3, soldierID: 100112, generalId: 0 }, { genrealRes: "role_10002", soldierType: 3, soldierID: 100106, generalId: 0 }, { genrealRes: "role_10002", soldierType: 2, soldierID: 100107, generalId: 0 }]
        ]
    ];
    GameCfg.checkpoint = [
        [
            { wj: [10000, 0, 0], bing: [{ qian: 3, hou: 1 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 2, hou: 2 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 1, hou: 3 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 10009, hou: 0 }, { qian: 0, hou: 0 }] },
        ],
        [
            { wj: [10001, 0, 0], bing: [{ qian: 2, hou: 2 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100011, 0, 0], bing: [{ qian: 1, hou: 2 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100012, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [10002, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 10008, hou: 0 }, { qian: 0, hou: 0 }] },
        ],
        [
            { wj: [10002, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 2, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100021, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100022, 0, 0], bing: [{ qian: 3, hou: 1 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [10002, 100021, 0], bing: [{ qian: 1, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 10008, hou: 0 }, { qian: 0, hou: 0 }] },
        ],
        [
            { wj: [10000, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 3, hou: 2 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 3, hou: 0 }, { qian: 2, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 10009 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
        ],
        [
            { wj: [10000, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 3, hou: 2 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 3, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 10009 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
        ],
        [
            { wj: [10000, 0, 0], bing: [{ qian: 1, hou: 3 }, { qian: 2, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 1, hou: 0 }, { qian: 2, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 0, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 10009 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
        ],
        [
            { wj: [10000, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 10009 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
        ],
        [
            { wj: [10000, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 10009 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
        ],
        [
            { wj: [10000, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [100001, 0, 0], bing: [{ qian: 1, hou: 1 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10008, hou: 0 }] },
            { wj: [100002, 0, 0], bing: [{ qian: 3, hou: 3 }, { qian: 3, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 0 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
            { wj: [10001, 0, 0], bing: [{ qian: 1, hou: 0 }, { qian: 1, hou: 0 }, { qian: 0, hou: 0 }], ta: [{ qian: 0, hou: 10009 }, { qian: 0, hou: 0 }, { qian: 10009, hou: 0 }] },
        ]
    ];
    return GameCfg;
}());
__reflect(GameCfg.prototype, "GameCfg");
//# sourceMappingURL=GameCfg.js.map