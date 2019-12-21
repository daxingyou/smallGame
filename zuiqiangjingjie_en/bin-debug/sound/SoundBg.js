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
 * Background music
 */
var SoundBg = (function (_super) {
    __extends(SoundBg, _super);
    /**
     * Constructor
     */
    function SoundBg() {
        var _this = _super.call(this) || this;
        _this._currBg = "";
        return _this;
    }
    /**
     * Stop current music
     */
    SoundBg.prototype.stop = function () {
        if (this._currSoundChannel) {
            this.removeSoundChannel(this._currSoundChannel);
        }
        this._currSoundChannel = null;
        this._currSound = null;
        this._currBg = "";
    };
    /**
     * Play a music
     * @param effectName
     */
    SoundBg.prototype.play = function (effectName) {
        var _this = this;
        if (this._currBg == effectName)
            return;
        this.stop();
        this._currBg = effectName;
        this.getSound(effectName, function (sound) {
            _this.playSound(sound);
        }, this);
    };
    //Mainly to solveiosNon playablebug
    SoundBg.prototype.touchPlay = function () {
        if (this._currSoundChannel && this._currSound) {
            var pos = this._currSoundChannel.position;
            this.removeSoundChannel(this._currSoundChannel);
            this._currSoundChannel = this._currSound.play(pos, 1);
            this.addSoundChannel(this._currSoundChannel);
        }
    };
    /**
     * play
     * @param sound
     */
    SoundBg.prototype.playSound = function (sound) {
        this._currSound = sound;
        this._currSoundChannel = this._currSound.play(0, 1);
        this.addSoundChannel(this._currSoundChannel);
    };
    SoundBg.prototype.onSoundComplete = function () {
        if (this._currSoundChannel)
            this.removeSoundChannel(this._currSoundChannel);
        this.playSound(this._currSound);
    };
    SoundBg.prototype.addSoundChannel = function (channel) {
        channel.volume = this._volume;
        channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    SoundBg.prototype.removeSoundChannel = function (channel) {
        channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        channel.stop();
    };
    /**
     * set volume
     * @param volume
     */
    SoundBg.prototype.setVolume = function (volume) {
        this._volume = volume;
        if (this._currSoundChannel) {
            this._currSoundChannel.volume = this._volume;
        }
    };
    /**
     * Process playback after resource loading
     * @param key
     */
    SoundBg.prototype.loadedPlay = function (key) {
        if (this._currBg == key) {
            var sound = RES.getRes(key);
            //Avoid audio decoding failure error
            if (!sound) {
                return;
            }
            this.playSound(sound);
        }
    };
    /**
     * Detect whether a file needs to be cleared
     * @param key
     * @returns {boolean}
     */
    SoundBg.prototype.checkCanClear = function (key) {
        return this._currBg != key;
    };
    return SoundBg;
}(BaseSound));
__reflect(SoundBg.prototype, "SoundBg");
//# sourceMappingURL=SoundBg.js.map