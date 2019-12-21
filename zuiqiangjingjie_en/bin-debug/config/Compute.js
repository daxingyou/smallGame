var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** Computing class */
var Compute = (function () {
    function Compute() {
    }
    Object.defineProperty(Compute, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new Compute();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /** Calculation_sprite1Be relative to_sprite2Direction */
    Compute.prototype.Direction = function (_sprite1, _sprite2) {
        var _x = _sprite1.x - _sprite2.x;
        var _y = _sprite1.y - _sprite2.y;
        var _r = Math.atan2(_x, -_y) * 180 / Math.PI;
        return _r;
    };
    /** Calculate twospriteStraight line distance between */
    Compute.prototype.Distance = function (_sprite1, _sprite2) {
        var _x = _sprite1.x - _sprite2.x;
        var _y = _sprite1.y - _sprite2.y;
        var _distance = Math.sqrt(_x * _x + _y * _y);
        return _distance;
    };
    /** Get parameters on link */
    Compute.prototype.GetUrlByParamName = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var URL = decodeURI(window.location.search);
        var r = URL.substr(1).match(reg);
        if (r != null) {
            //decodeURI() Function pair encodeURI() Function encoded URI Decode
            return decodeURI(r[2]);
        }
        ;
        return null;
    };
    /** Background screen adaptation , Incoming picture screen size，Vertical screen， 0：Vertical screen 1 ：Horizontal screen */
    Compute.prototype.bgAdapter = function (img, stage, n) {
        switch (n) {
            case 0:
                if (stage.stageHeight > 1334) {
                    var bl = stage.stageHeight / img.height;
                    img.y = 0;
                    img.height = stage.stageHeight;
                    img.width *= bl;
                    img.x = -(img.width / 2 - stage.stageWidth / 2);
                }
                else {
                    img.x = 0;
                    var bl = stage.stageWidth / img.width;
                    img.width = stage.stageWidth;
                    img.y = stage.stageHeight / 2 - img.height / 2;
                    img.height *= bl;
                }
                break;
            case 1:
                if (stage.stageWidth > 1334) {
                    var bl = stage.stageWidth / img.width;
                    img.x = 0;
                    img.width = stage.stageWidth;
                    img.height *= bl;
                    img.y = -(img.height / 2 - stage.stageHeight / 2);
                }
                else {
                    img.y = 0;
                    var bl = stage.stageHeight / img.height;
                    img.height = stage.stageHeight;
                    img.x = stage.stageWidth / 2 - img.width / 2;
                    img.width *= bl;
                }
                break;
        }
    };
    /** Button press effect */
    Compute.prototype.buttonClick = function (_btn, _fun, _this) {
        egret.Tween.get(_btn)
            .to({ scaleX: 0.7, scaleY: 0.7 }, 80)
            .to({ scaleX: 1.2, scaleY: 1.2 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 20);
        egret.Tween.get(_this)
            .wait(250)
            .call(_fun);
    };
    /** Gray tone */
    Compute.prototype.setGray = function () {
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        return colorFlilter;
    };
    /**Create an animation */
    Compute.prototype.createAni = function (_name, _dh) {
        var data = RES.getRes(_name + "_json");
        var txtr = RES.getRes(_name + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc1 = new egret.MovieClip(mcFactory.generateMovieClipData(_dh));
        return mc1;
    };
    /** Store data */
    Compute.prototype.setLocalData = function (_key, _data) {
        egret.localStorage.setItem(_key, _data);
    };
    /** Remove data */
    Compute.prototype.getLocalData = function (_key) {
        var data = "";
        if (!egret.localStorage.getItem(_key)) {
            data = null;
        }
        else {
            data = egret.localStorage.getItem(_key);
        }
        return data;
    };
    /** Delete data */
    Compute.prototype.removeLocalDate = function (_key) {
        if (!egret.localStorage.getItem(_key)) {
        }
        else {
            egret.localStorage.removeItem(_key);
        }
    };
    return Compute;
}());
__reflect(Compute.prototype, "Compute");
//# sourceMappingURL=Compute.js.map