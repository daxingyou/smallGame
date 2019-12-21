var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NameList = (function () {
    function NameList() {
        this.xing = [
            "Ma Nan", "Faraday", "Cao", "Irving", "Terry", "Beck", "hunter", "Carter", "Smith", "Turner", "Holzer", "Brook", "Green", "Wood", "Fawkes", "Hawke"
        ];
        this.ming = [
            "Frank",
            "Barthes",
            "Kelvin",
            "Julie",
            "Emma",
            "LAN Sha Sha",
            "Eades",
            "Stella",
            "Plum blossom",
            "Amanda",
            "Marianne",
            "Lorrain",
            "Kate",
            "Kelly",
            "Diego",
            "Halle",
            "Nick",
            "Aileen",
            "Eve",
            "Solomon",
            "Paul",
            "Colin",
            "Alva",
            "Elvis",
            "Edwin",
            "Abel"
        ];
        this.city_name = [
            "Vick", "Doville", "Ma Zan", "Mccann", "Lucknow", "Arthedain", "Du gong xi", "Supreme", "Noon", "Carcassonne", "Mithrim", "Boya Les", "Suo Cora"
        ];
    }
    NameList.inst = function () {
        if (!this._inst) {
            this._inst = new NameList();
        }
        return this._inst;
    };
    NameList.prototype.randomName = function () {
        var _name = this.ming[Math.floor(Math.random() * this.ming.length)] + " " + this.xing[Math.floor(Math.random() * this.xing.length)];
        return _name;
    };
    return NameList;
}());
__reflect(NameList.prototype, "NameList");
//# sourceMappingURL=NameList.js.map