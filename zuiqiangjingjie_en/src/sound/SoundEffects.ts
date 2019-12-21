/**
 * Created by yangsong on 15-1-14.
 * Sound class
 */
class SoundEffects extends BaseSound {
	private _volume:number;
	private _sound:egret.Sound;
	private _loaded = false;
	/**
	 * Constructor
	 */
	public constructor() {
		super();
	}

	/**
	 * Play a sound effect
	 * @param effectName
	 */
	public play(effectName:string):void {
		this._loaded = true;
		this.getSound(effectName,(sound)=>{
			if (sound) {
				this._sound = sound;
				this.playSound(this._sound);
			}
		},this);
	}
	/**
	 * Stop a sound effect
	 * @param effectName
	 */
	public stop():void {
		if (this._soundChannel) {
			this._soundChannel.stop();
		}
	}
	private _soundChannel:egret.SoundChannel
	/**
	 * play
	 * @param sound
	 */
	private playSound(sound:egret.Sound):void {
		if(this._soundChannel){
			this._soundChannel.stop();
		}
		this._soundChannel = sound.play(0, 1);
		this._soundChannel.volume = this._volume;
	}

	/**
	 * set volume
	 * @param volume
	 */
	public setVolume(volume:number):void {
		this._volume = volume;
	}


	/**
	 * Process playback after resource loading
	 * @param key
	 */
	public loadedPlay(key:string):void {
		let sound = RES.getRes(key);
		//Avoid audio decoding failure error
		if (!sound) {
			return;
		}
		this.playSound(sound);
	}
}