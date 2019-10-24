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
var CardItem2 = (function (_super) {
    __extends(CardItem2, _super);
    function CardItem2() {
        var _this = _super.call(this) || this;
        _this._ifInCd = false;
        _this.angle = -90;
        _this.skinName = "CardItem2Skin";
        return _this;
    }
    CardItem2.prototype.childrenCreated = function () {
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    };
    CardItem2.prototype.onBegin = function (evt) {
        MessageManager.inst().dispatch(CustomEvt.ITEM_BEGIN, { x: evt.stageX, y: evt.stageY, itemIndex: this.itemIndex });
    };
    CardItem2.prototype.onEnd = function () {
        MessageManager.inst().dispatch(CustomEvt.ITEM_END);
    };
    CardItem2.prototype.dataChanged = function () {
        var data = this.data;
        this.setData(data);
    };
    CardItem2.prototype.setData = function (data) {
        this.levelLab.text = data.energy.toString();
        this.img.source = "box_card_" + data.id + "_png";
        this._cardVo = data;
    };
    CardItem2.prototype.showCd = function () {
        this._ifInCd = true;
        if (!this.shape) {
            this.shape = new egret.Shape();
            this.addChild(this.shape);
            var rect = new eui.Rect(this.cardGroup.width, this.cardGroup.height, 0x000000);
            this.addChild(rect);
            this.shape.mask = rect;
            this.shape.x = this.cardGroup.width >> 1;
            this.shape.y = this.cardGroup.height >> 1;
        }
        egret.startTick(this.timeUp, this);
    };
    CardItem2.prototype.timeUp = function () {
        this.changeGraphics();
        this.angle += 3;
        if (this.angle >= 270) {
            this.angle = this.angle % 270;
            this._ifInCd = false;
            egret.stopTick(this.timeUp, this);
            this.removeChild(this.shape);
            this.shape = null;
            this.angle = -90;
        }
        return false;
    };
    CardItem2.prototype.changeGraphics = function () {
        this.shape.graphics.clear();
        this.shape.graphics.beginFill(0xf7f7f7, 0.6);
        this.shape.graphics.moveTo(0, 0);
        this.shape.graphics.lineTo(120, 0);
        this.shape.graphics.drawArc(0, 0, 120, -90 * Math.PI / 180, this.angle * Math.PI / 180, false);
        this.shape.graphics.lineTo(0, 0);
        this.shape.graphics.endFill();
    };
    CardItem2.prototype.upCard = function () {
        this.cardGroup.top = -50;
    };
    CardItem2.prototype.resetCard = function () {
        this.cardGroup.top = 0;
    };
    Object.defineProperty(CardItem2.prototype, "cardVo", {
        get: function () {
            return this._cardVo;
        },
        set: function (vo) {
            this._cardVo = vo;
            this.setData(vo);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardItem2.prototype, "ifInCd", {
        get: function () {
            return this._ifInCd;
        },
        enumerable: true,
        configurable: true
    });
    CardItem2.prototype.dispose = function () {
        this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
        this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
    };
    return CardItem2;
}(eui.ItemRenderer));
__reflect(CardItem2.prototype, "CardItem2");
//# sourceMappingURL=CardItem2.js.map