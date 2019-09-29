var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ChapterCfg = (function () {
    function ChapterCfg() {
    }
    ChapterCfg.leveCfg = {
        1: [
            {
                ecards: "6_6",
                ocards: "6_5",
                epos: "1_1|3_1",
                opos: "2_4|2_5"
            },
            {
                ecards: "5_4_5_6",
                ocards: "5_4_5_6",
                epos: "1_1|2_1|3_1|2_2",
                opos: "1_5|2_5|3_5|2_4",
            },
            {
                ecards: "5_4_3_5_6",
                ocards: "5_4_3_5_6",
                epos: "1_1|2_1|3_1|1_2|3_2",
                opos: "1_5|2_5|3_5|1_4|3_4",
            },
            {
                ecards: "5_3_4_5_2_6",
                ocards: "5_3_4_5_2_6",
                epos: "1_1|2_1|3_1|1_2|3_2|2_2",
                opos: "1_5|2_5|3_5|1_4|3_4|2_4",
            },
            {
                ecards: "5_3_4_1_6_2_5",
                ocards: "5_3_4_1_6_2_5",
                epos: "1_0|2_0|3_0|1_1|2_1|3_1|2_2",
                opos: "1_6|2_6|3_6|1_5|2_5|3_5|2_4",
            },
            {
                ecards: "5_3_1_4_0_6_2_5",
                ocards: "5_3_1_4_0_6_2_5",
                epos: "1_0|2_0|3_0|1_1|2_1|3_1|1_2|3_2",
                opos: "1_6|2_6|3_6|1_5|2_5|3_5|1_4|3_4",
            }
        ],
        2: [{
                ecards: "5_3_1_4_0_6_2_5",
                ocards: "5_3_1_4_0_6_2_5",
                epos: "1_0|2_0|3_0|1_1|2_1|3_1|1_2|3_2",
                opos: "1_6|2_6|3_6|1_5|2_5|3_5|1_4|3_4",
            }]
    };
    return ChapterCfg;
}());
__reflect(ChapterCfg.prototype, "ChapterCfg");
//# sourceMappingURL=ChapterCfg.js.map