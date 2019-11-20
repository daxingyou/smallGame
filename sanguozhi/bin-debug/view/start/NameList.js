var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NameList = (function () {
    function NameList() {
        this.xing = [
            "刘", "王", "曹", "马", "赵", "孙", "关", "诸葛", "司马", "公孙", "郭", "吕", "吴", "慕容", "张", "刘"
        ];
        this.ming = [
            "飞",
            "镜",
            "润",
            "培",
            "海",
            "澜",
            "丰",
            "二",
            "九",
            "啸",
            "锦",
            "启",
            "天",
            "鑫",
            "世",
            "思",
            "浩",
            "子",
            "守",
            "鹏",
            "同",
            "文",
            "波",
            "亮",
            "慧",
            "广",
            "宽",
            "心",
            "学",
            "雪",
            "智",
            "一",
            "八",
            "铭",
            "阔",
            "韬",
            "洛",
            "凯",
            "白",
            "志",
            "风"
        ];
        this.city_name = [
            "荆州", "兖州", "雍州", "青州", "冀州", "徐州", "豫州", "扬州", "凉州"
        ];
    }
    NameList.inst = function () {
        if (!this._inst) {
            this._inst = new NameList();
        }
        return this._inst;
    };
    NameList.prototype.randomName = function () {
        var _name = this.xing[Math.floor(Math.random() * this.xing.length)] + this.ming[Math.floor(Math.random() * this.ming.length)];
        return _name;
    };
    return NameList;
}());
__reflect(NameList.prototype, "NameList");
//# sourceMappingURL=NameList.js.map