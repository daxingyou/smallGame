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
var DropEntity = (function (_super) {
    __extends(DropEntity, _super);
    function DropEntity(dropData, pos) {
        var _this = _super.call(this) || this;
        _this._vo = dropData;
        _this._pos = pos;
        _this.open(dropData);
        return _this;
    }
    DropEntity.prototype.open = function (vo) {
        this.cardGroup = new eui.Group();
        this.addChild(this.cardGroup);
        var item = new CardItem();
        item.initData(vo, 0.1);
        this.cardGroup.addChild(item);
        var startEff = new MovieClip();
        this.cardGroup.addChild(startEff);
        startEff.playFile(EFFECT + "start", -1);
        startEff.x = (item.width * 0.2) >> 1;
        startEff.y = (item.height * 0.2) >> 1;
        this.cardGroup.visible = false;
        this.cardGroup.x = this._pos.x;
        this.cardGroup.y = this._pos.y;
        if (vo.quality <= 2) {
            this.showWay1();
            UserTips.inst().showTips("\u83B7\u5F97\u5361\u724C<font color=" + vo.qualityColor + ">[" + vo.name + "]<font>");
        }
        else {
            this.showWay2();
            UserTips.inst().showTips("\u606D\u559C\u60A8\uFF0C\u6389\u843D\u9AD8\u7EA7\u5361\u724C<font color=" + vo.qualityColor + ">[" + vo.name + "]</font>");
        }
    };
    DropEntity.prototype.showWay1 = function () {
        var _this = this;
        var dropMc = new MovieClip();
        this.addChild(dropMc);
        dropMc.playFile(EFFECT + "trans", -1);
        dropMc.x = this._pos.x + 20;
        dropMc.y = this._pos.y - 200;
        egret.Tween.get(dropMc).to({ y: this._pos.y + 50 }, 200).call(function () {
            egret.Tween.removeTweens(dropMc);
            dropMc.parent.removeChild(dropMc);
            _this.cardGroup.visible = true;
        }, this);
    };
    DropEntity.prototype.showWay2 = function () {
        var boomMc = new MovieClip();
        this.addChild(boomMc);
        boomMc.x = this._pos.x + 20;
        boomMc.y = this._pos.y + 50;
        boomMc.playFile(EFFECT + "boomeff", 1, null, true);
        var self = this;
        var timeout = setTimeout(function () {
            clearTimeout(timeout);
            self.cardGroup.visible = true;
            var boomfireMc = new MovieClip();
            self.addChild(boomfireMc);
            boomfireMc.x = self._pos.x;
            boomfireMc.y = self._pos.y;
            boomfireMc.playFile(EFFECT + "boomeff2", 2, null, true);
        }, 700);
    };
    Object.defineProperty(DropEntity.prototype, "cardVo", {
        get: function () {
            return this._vo;
        },
        enumerable: true,
        configurable: true
    });
    DropEntity.prototype.close = function () {
    };
    return DropEntity;
}(eui.Component));
__reflect(DropEntity.prototype, "DropEntity");
//# sourceMappingURL=DropEntity.js.map