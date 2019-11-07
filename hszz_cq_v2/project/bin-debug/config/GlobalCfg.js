var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var hszz;
(function (hszz) {
    var CardConfig = (function () {
        function CardConfig() {
        }
        // 3:0xbf11ff   1:0x76ff39 2:3ecfff   4:0xffd800
        CardConfig.cfgs = {
            0: [
                { name: "生命药水", level: 1, ownNum: 5, ifUnlock: true, atktype: 2, cardType: 0, atkDis: 150, spd: 20, atkSpd: 1500, num: 1, atk: 300, hp: 400,
                    id: 1001, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "1", cost: 5, quality: 1, desc: "一次性恢复300生命值", buffTime: 0, cardId: 1, costMp: 0 },
                { name: "生命药水", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 0, atkDis: 150, spd: 20, atkSpd: 1500, num: 1, atk: 600, hp: 400,
                    id: 1002, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "1", cost: 10, quality: 2, desc: "一次性恢复600生命值", buffTime: 0, cardId: 1, costMp: 0 },
                { name: "生命药水", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 0, atkDis: 150, spd: 20, atkSpd: 1500, num: 1, atk: 900, hp: 400,
                    id: 1003, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "1", cost: 15, quality: 3, desc: "一次性恢复900生命值", buffTime: 0, cardId: 1, costMp: 0 },
                { name: "生命药水", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 0, atkDis: 150, spd: 20, atkSpd: 1500, num: 1, atk: 1200, hp: 400,
                    id: 1004, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "1", cost: 20, quality: 4, desc: "一次性恢复1200生命值", buffTime: 0, cardId: 1, costMp: 0 },
            ],
            1: [
                { name: "惩戒", level: 1, ownNum: 2, ifUnlock: true, atktype: 2, cardType: 1, atkDis: 150, spd: 20, atkSpd: 1500, num: 2, atk: 200, hp: 400,
                    id: 1005, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "2", cost: 5, quality: 1, desc: "法神的终极奥义,毁天灭地,造成大面积伤害", buffTime: 0, cardId: 2, costMp: 100 },
                { name: "惩戒", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 1, atkDis: 150, spd: 20, atkSpd: 1500, num: 3, atk: 300, hp: 400,
                    id: 1006, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "2", cost: 10, quality: 2, desc: "法神的终极奥义,毁天灭地,造成大面积伤害", buffTime: 0, cardId: 2, costMp: 200 },
                { name: "惩戒", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 1, atkDis: 150, spd: 20, atkSpd: 1500, num: 4, atk: 400, hp: 400,
                    id: 1007, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "2", cost: 15, quality: 3, desc: "法神的终极奥义,毁天灭地,造成大面积伤害", buffTime: 0, cardId: 2, costMp: 300 },
                { name: "惩戒", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 1, atkDis: 150, spd: 20, atkSpd: 1500, num: 5, atk: 500, hp: 400,
                    id: 1008, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "2", cost: 20, quality: 4, desc: "法神的终极奥义,毁天灭地,造成大面积伤害", buffTime: 0, cardId: 2, costMp: 400 },
            ],
            2: [
                { name: "魔兽军团", level: 1, ownNum: 1, ifUnlock: true, atktype: 2, cardType: 2, atkDis: 140, spd: 100, atkSpd: 1500, num: 2, atk: 50, hp: 200,
                    id: 1009, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "monster10102", cost: 5, quality: 1, desc: "引域外魔龙，便于消灭大批魔物，持续作战时间20秒", buffTime: 20000, cardId: 3, costMp: 100 },
                { name: "魔兽军团", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 2, atkDis: 140, spd: 100, atkSpd: 1500, num: 3, atk: 50, hp: 300,
                    id: 1010, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "monster10102", cost: 10, quality: 2, desc: "引域外魔龙，便于消灭大批魔物，持续作战时间20秒", buffTime: 20000, cardId: 3, costMp: 200 },
                { name: "魔兽军团", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 2, atkDis: 140, spd: 100, atkSpd: 1500, num: 4, atk: 50, hp: 400,
                    id: 1011, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "monster10102", cost: 15, quality: 3, desc: "引域外魔龙，便于消灭大批魔物，持续作战时间20秒", buffTime: 20000, cardId: 3, costMp: 300 },
                { name: "魔兽军团", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 2, atkDis: 140, spd: 100, atkSpd: 1500, num: 5, atk: 50, hp: 500,
                    id: 1012, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "monster10102", cost: 20, quality: 4, desc: "引域外魔龙，便于消灭大批魔物，持续作战时间20秒", buffTime: 20000, cardId: 3, costMp: 400 },
            ],
            3: [
                { name: "战仆", level: 1, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 3, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 200, hp: 400,
                    id: 1013, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "5108031", cost: 5, quality: 1, desc: "每次使用可召唤一个战仆，作战时间1分钟", buffTime: 60000, cardId: 4, costMp: 100 },
                { name: "战仆", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 3, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 300, hp: 500,
                    id: 1014, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "5108031", cost: 10, quality: 2, desc: "每次使用可召唤一个战仆，作战时间1分钟", buffTime: 60000, cardId: 4, costMp: 200 },
                { name: "战仆", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 3, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 400, hp: 600,
                    id: 1015, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "5108031", cost: 15, quality: 3, desc: "每次使用可召唤一个战仆，作战时间1分钟", buffTime: 60000, cardId: 4, costMp: 300 },
                { name: "战仆", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 3, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 500, hp: 700,
                    id: 1016, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "5108031", cost: 20, quality: 4, desc: "每次使用可召唤一个战仆，作战时间1分钟", buffTime: 60000, cardId: 4, costMp: 400 },
            ],
            4: [
                { name: "召唤圣兽", level: 1, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 4, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 400, hp: 600,
                    id: 1017, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "monster10025", cost: 5, quality: 1, desc: "召唤熔岩巨兽辅助作战，可持续战斗30秒", buffTime: 30000, cardId: 5, costMp: 100 },
                { name: "召唤圣兽", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 4, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 600, hp: 800,
                    id: 1018, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "monster10025", cost: 10, quality: 2, desc: "召唤熔岩巨兽辅助作战，可持续战斗30秒", buffTime: 30000, cardId: 5, costMp: 200 },
                { name: "召唤圣兽", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 4, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 800, hp: 1000,
                    id: 1019, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "monster10025", cost: 15, quality: 3, desc: "召唤熔岩巨兽辅助作战，可持续战斗30秒", buffTime: 30000, cardId: 5, costMp: 300 },
                { name: "召唤圣兽", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 4, atkDis: 140, spd: 100, atkSpd: 1500, num: 1, atk: 1000, hp: 1200,
                    id: 1020, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "monster10025", cost: 20, quality: 4, desc: "召唤熔岩巨兽辅助作战，可持续战斗30秒", buffTime: 30000, cardId: 5, costMp: 400 },
            ],
            5: [
                { name: "圣凯", level: 1, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 5, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 200, hp: 400,
                    id: 1021, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "model_1", cost: 5, quality: 1, desc: "圣凯加身30秒，期间英雄切换为高级形态战斗", buffTime: 30000, cardId: 6, costMp: 100 },
                { name: "圣凯", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 5, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 400, hp: 500,
                    id: 1022, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "model_1", cost: 10, quality: 2, desc: "圣凯加身30秒，期间英雄切换为高级形态战斗", buffTime: 30000, cardId: 6, costMp: 200 },
                { name: "圣凯", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 5, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 600, hp: 600,
                    id: 1023, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "model_1", cost: 15, quality: 3, desc: "圣凯加身30秒，期间英雄切换为高级形态战斗", buffTime: 30000, cardId: 6, costMp: 300 },
                { name: "圣凯", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 5, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 800, hp: 700,
                    id: 1024, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "model_1", cost: 20, quality: 4, desc: "圣凯加身30秒，期间英雄切换为高级形态战斗", buffTime: 30000, cardId: 6, costMp: 400 },
            ],
            6: [
                { name: "法力药水", level: 1, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 6, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 200, hp: 400,
                    id: 1025, skillId: 0, qualityColor: 0x8aef85, energy: 2, model: "model_1", cost: 5, quality: 1, desc: "一次性恢复200法力值", buffTime: 0, cardId: 7, costMp: 0 },
                { name: "法力药水", level: 2, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 6, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 400, hp: 500,
                    id: 1026, skillId: 0, qualityColor: 0x67f0f3, energy: 3, model: "model_1", cost: 10, quality: 2, desc: "一次性恢复400法力值", buffTime: 0, cardId: 7, costMp: 0 },
                { name: "法力药水", level: 3, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 6, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 600, hp: 600,
                    id: 1027, skillId: 0, qualityColor: 0xf367cd, energy: 4, model: "model_1", cost: 15, quality: 3, desc: "一次性恢复600法力值", buffTime: 0, cardId: 7, costMp: 0 },
                { name: "法力药水", level: 4, ownNum: 0, ifUnlock: true, atktype: 2, cardType: 6, atkDis: 140, spd: 20, atkSpd: 1500, num: 1, atk: 800, hp: 700,
                    id: 1028, skillId: 0, qualityColor: 0xfec157, energy: 5, model: "model_1", cost: 20, quality: 4, desc: "一次性恢复800法力值", buffTime: 0, cardId: 7, costMp: 0 },
            ]
        };
        return CardConfig;
    }());
    hszz.CardConfig = CardConfig;
    __reflect(CardConfig.prototype, "hszz.CardConfig");
})(hszz || (hszz = {}));
//# sourceMappingURL=GlobalCfg.js.map