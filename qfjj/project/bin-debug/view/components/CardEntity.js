var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CardEntity = (function (_super) {
    __extends(CardEntity, _super);
    function CardEntity() {
        return _super.call(this) || this;
    }
    CardEntity.prototype.initialize = function () {
        this.touchEnabled = true;
        this.touchChildren = false;
        var circle = new eui.Image();
        if (this.attr.camp == 1) {
            circle.source = "own_circle_png";
            circle.x = 5;
        }
        else {
            circle.source = "enemy_circle_png";
            circle.x = 10;
        }
        this.addChild(circle);
        circle.y = 15;
        var card = new eui.Image();
        this.addChild(card);
        if (this.attr.camp == 1) {
            card.source = "player_" + this.attr.type + "_png";
        }
        else {
            card.source = "enemy_" + this.attr.type + "_png";
        }
        card.anchorOffsetX = card.anchorOffsetY = 50;
        card.x = card.y = 50;
        card.scaleX = card.scaleY = 0.8;
        // card.x  = 18;
        // card.y = 10;
        var typeImg = new eui.Image();
        if (this.attr.camp == 1) {
            typeImg.source = "o_" + this.attr.type + "_png";
        }
        else {
            typeImg.source = "e_" + this.attr.type + "_png";
        }
        this.addChild(typeImg);
        typeImg.x = 100 - 24;
        typeImg.y = 100 - 24;
    };
    /**刷新属性 */
    CardEntity.prototype.refreshAttr = function (key, value) {
        if (this._attr[key]) {
            this._attr[key] = value;
        }
    };
    Object.defineProperty(CardEntity.prototype, "attr", {
        /**获取属性值 */
        get: function () {
            return this._attr;
        },
        /**设置属性值 */
        set: function (value) {
            this._attr = value;
            this.initialize();
        },
        enumerable: true,
        configurable: true
    });
    return CardEntity;
}(egret.Sprite));
__reflect(CardEntity.prototype, "CardEntity");
var AttrEnum;
(function (AttrEnum) {
    AttrEnum[AttrEnum["S"] = 0] = "S";
    AttrEnum[AttrEnum["A"] = 1] = "A";
    AttrEnum[AttrEnum["B"] = 2] = "B";
    AttrEnum[AttrEnum["C"] = 3] = "C";
    AttrEnum[AttrEnum["D"] = 4] = "D";
    AttrEnum[AttrEnum["E"] = 5] = "E";
    AttrEnum[AttrEnum["F"] = 6] = "F";
})(AttrEnum || (AttrEnum = {}));
//# sourceMappingURL=CardEntity.js.map