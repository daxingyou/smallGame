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
/** 序列帧动画 */
var BaseAni = (function (_super) {
    __extends(BaseAni, _super);
    function BaseAni(_name, _dh) {
        var _this = _super.call(this) || this;
        var data = RES.getRes(_name + "_json");
        var txtr = RES.getRes(_name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        _this.mc1 = new egret.MovieClip(mcFactory.generateMovieClipData(_dh));
        _this.addChild(_this.mc1);
        return _this;
    }
    /** 播放动画 */
    BaseAni.prototype.playAni = function (_name, _cs) {
        this.mc1.gotoAndPlay(_name, _cs);
    };
    /** 停止播放动画 */
    BaseAni.prototype.stopAni = function (_name) {
        this.mc1.gotoAndStop(_name);
    };
    /** 暂停播放动画 */
    BaseAni.prototype.pauseAni = function () {
        this.mc1.stop(this);
    };
    /** 暂停播放动画 */
    BaseAni.prototype.continueAni = function () {
        this.mc1.play(this);
    };
    Object.defineProperty(BaseAni.prototype, "mc", {
        /**获取动画 */
        get: function () {
            return this.mc1;
        },
        enumerable: true,
        configurable: true
    });
    return BaseAni;
}(egret.Sprite));
__reflect(BaseAni.prototype, "BaseAni");
//# sourceMappingURL=BaseAni.js.map