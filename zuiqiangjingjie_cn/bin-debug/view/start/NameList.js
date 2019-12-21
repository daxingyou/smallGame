var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NameList = (function () {
    function NameList() {
        this.xing = [
            "马南", "法拉第", "曹", "欧文", "特里", "贝克", "享特", "卡特", "史密斯", "特纳", "霍尔", "布鲁克", "格林", "伍德", "福克斯", "霍克"
        ];
        this.ming = [
            "弗兰克",
            "巴特",
            "开尔文",
            "朱莉",
            "艾玛",
            "兰瑞莎",
            "伊迪斯",
            "斯特拉",
            "梅",
            "阿曼达",
            "玛丽安",
            "洛兰",
            "凯特",
            "凯利",
            "迪亚高",
            "哈丽",
            "尼克",
            "艾琳",
            "伊夫",
            "所罗门",
            "保罗",
            "科林",
            "阿尔瓦",
            "埃尔维斯",
            "埃德温",
            "艾贝尔"
        ];
        this.city_name = [
            "维克", "多维尔", "马赞", "麦肯", "勒克瑙", "雅西顿", "杜根西", "至高", "诺恩", "卡尔卡松", "米斯林", "博亚莱斯", "索科特拉"
        ];
    }
    NameList.inst = function () {
        if (!this._inst) {
            this._inst = new NameList();
        }
        return this._inst;
    };
    NameList.prototype.randomName = function () {
        var _name = this.ming[Math.floor(Math.random() * this.ming.length)] + "·" + this.xing[Math.floor(Math.random() * this.xing.length)];
        return _name;
    };
    return NameList;
}());
__reflect(NameList.prototype, "NameList");
//# sourceMappingURL=NameList.js.map