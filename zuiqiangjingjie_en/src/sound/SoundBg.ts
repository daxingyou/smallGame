/**
 * Created by yangsong on 15-1-14.
 * Background music
 */
class SoundBg extends BaseSound {
	private _currBg:string;
	private _currSound:egret.Sound;
	private _currSoundChannel:egret.SoundChannel;
	private _volume:number;

	/**
	 * Constructor
	 */
	public constructor() {
		super();
		this._currBg = "";
	}

	/**
	 * Stop current music
	 */
	public stop():void {
		if (this._currSoundChannel) {
			this.removeSoundChannel(this._currSoundChannel);
		}
		this._currSoundChannel = null;
		this._currSound = null;
		this._currBg = "";
	}

	/**
	 * Play a music
	 * @param effectName
	 */
	public play(effectName:string):void {
		if (this._currBg == effectName)
			return;
		this.stop();
		this._currBg = effectName;
		this.getSound(effectName,(sound)=>{
			this.playSound(sound);
		},this);
	}
	//Mainly to solveiosNon playablebug
	public touchPlay() {
		if (this._currSoundChannel && this._currSound) {
			let pos = this._currSoundChannel.position;
			this.removeSoundChannel(this._currSoundChannel);
			this._currSoundChannel = this._currSound.play(pos, 1);
			this.addSoundChannel(this._currSoundChannel);
		}
	}

	/**
	 * play
	 * @param sound
	 */
	private playSound(sound:egret.Sound):void {
		this._currSound = sound;
		this._currSoundChannel = this._currSound.play(0, 1);
		this.addSoundChannel(this._currSoundChannel);
	}

	private onSoundComplete(){
		if(this._currSoundChannel) this.removeSoundChannel(this._currSoundChannel);
		this.playSound(this._currSound);
	}

	private addSoundChannel(channel:egret.SoundChannel){
		channel.volume = this._volume;
		channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
	}

	private removeSoundChannel(channel:egret.SoundChannel){
		channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
		channel.stop();
	}

	/**
	 * set volume
	 * @param volume
	 */
	public setVolume(volume:number):void {
		this._volume = volume;
		if (this._currSoundChannel) {
			this._currSoundChannel.volume = this._volume;
		}
	}

	/**
	 * Process playback after resource loading
	 * @param key
	 */
	public loadedPlay(key:string):void {
		if (this._currBg == key) {
			let sound = RES.getRes(key);
			//Avoid audio decoding failure error
			if (!sound) {
				return;
			}
			this.playSound(sound);
		}
	}

	/**
	 * Detect whether a file needs to be cleared
	 * @param key
	 * @returns {boolean}
	 */
	public checkCanClear(key:string):boolean {
		return this._currBg != key;
	}
}