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
/**
 * Created by yangsong on 15-1-14.
 * Sound class
 */
var SoundEffects = (function (_super) {
    __extends(SoundEffects, _super);
    /**
     * Constructor
     */
    function SoundEffects() {
        var _this = _super.call(this) || this;
        _this._loaded = false;
        return _this;
    }
    /**
     * Play a sound effect
     * @param effectName
     */
    SoundEffects.prototype.play = function (effectName) {
        var _this = this;
        this._loaded = true;
        this.getSound(effectName, function (sound) {
            if (sound) {
                _this._sound = sound;
                _this.playSound(_this._sound);
            }
        }, this);
    };
    /**
     * Stop a sound effect
     * @param effectName
     */
    SoundEffects.prototype.stop = function () {
        if (this._soundChannel) {
            this._soundChannel.stop();
        }
    };
    /**
     * play
     * @param sound
     */
    SoundEffects.prototype.playSound = function (sound) {
        if (this._soundChannel) {
            this._soundChannel.stop();
        }
        this._soundChannel = sound.play(0, 1);
        this._soundChannel.volume = this._volume;
    };
    /**
     * set volume
     * @param volume
     */
    SoundEffects.prototype.setVolume = function (volume) {
        this._volume = volume;
    };
    /**
     * Process playback after resource loading
     * @param key
     */
    SoundEffects.prototype.loadedPlay = function (key) {
        var sound = RES.getRes(key);
        //Avoid audio decoding failure error
        if (!sound) {
            return;
        }
        this.playSound(sound);
    };
    return SoundEffects;
}(BaseSound));
__reflect(SoundEffects.prototype, "SoundEffects");
//# sourceMappingURL=SoundEffects.js.map