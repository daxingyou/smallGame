var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 15-1-14.
 * SoundBase class
 */
var BaseSound = (function () {
    /**
     * Constructor
     */
    function BaseSound() {
        this._cache = {};
        this._loadingCache = new Array();
        TimerManager.inst().doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
    }
    /**
     * Handling music file cleanup
     */
    BaseSound.prototype.dealSoundTimer = function () {
        var currTime = egret.getTimer();
        var keys = Object.keys(this._cache);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            if (!this.checkCanClear(key))
                continue;
            if (currTime - this._cache[key] >= SoundManager.CLEAR_TIME) {
                //debug.log(key + "alreadyclear")
                delete this._cache[key];
                RES.destroyRes(key);
            }
        }
    };
    /**
     * ObtainSound
     * @param key
     * @returns {egret.Sound}
     */
    BaseSound.prototype.getSound = function (key, callBackFunc, thisArg) {
        var _this = this;
        RES.getResByUrl(key, function (data) {
            var sound = data;
            if (sound) {
                if (_this._cache[key]) {
                    _this._cache[key] = egret.getTimer();
                }
            }
            else {
                if (_this._loadingCache.indexOf(key) != -1) {
                    return null;
                }
                _this._loadingCache.push(key);
                RES.getResAsync(key, _this.onResourceLoadComplete, _this);
            }
            if (callBackFunc && thisArg) {
                callBackFunc.call(thisArg, sound);
            }
        }, this, RES.ResourceItem.TYPE_SOUND);
    };
    /**
     * Resource loading completed
     * @param event
     */
    BaseSound.prototype.onResourceLoadComplete = function (data, key) {
        var index = this._loadingCache.indexOf(key);
        if (index != -1) {
            this._loadingCache.splice(index, 1);
            this._cache[key] = egret.getTimer();
            this.loadedPlay(key);
        }
    };
    /**
     * Process playback after resource loading，Subclass rewriting
     * @param key
     */
    BaseSound.prototype.loadedPlay = function (key) {
    };
    /**
     * Detect whether a file needs to be cleared，Subclass rewriting
     * @param key
     * @returns {boolean}
     */
    BaseSound.prototype.checkCanClear = function (key) {
        return true;
    };
    return BaseSound;
}());
__reflect(BaseSound.prototype, "BaseSound");
//# sourceMappingURL=BaseSound.js.map