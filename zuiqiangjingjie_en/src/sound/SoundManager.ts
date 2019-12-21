/**
 * Created by yangsong on 15-1-14.
 * SoundManagement category
 */
class SoundManager extends BaseClass {
	/**
	 * Music file cleanup time
	 * @type {number}
	 */
	public static CLEAR_TIME: number = 3 * 60 * 1000;

	private effect: SoundEffects;
	private otherEffect:SoundEffects;
	private bg: SoundBg;
	private effectOn: boolean;
	private effectOn2:boolean;
	private bgOn: boolean;
	private currBg: string;
	private bgVolume: number;
	private effectVolume: number;

	/**
	 * Constructor
	 */
	public constructor() {
		super();

		this.bgOn = true;
		this.effectOn = true;
		this.effectOn2 = true;

		this.bgVolume = 0.7;
		this.effectVolume = 0.7;

		this.bg = new SoundBg();
		this.bg.setVolume(this.bgVolume);

		this.effect = new SoundEffects();
		this.effect.setVolume(this.effectVolume);

		this.otherEffect = new SoundEffects();
		this.otherEffect.setVolume(this.effectVolume);
	}
	public static inst():SoundManager{
		let _inst:SoundManager = super.single<SoundManager>();
		return _inst
	}
	

	/**
	 * Play sound effects
	 * @param effectName
	 */
	public playEffect(effectName: string): void {
		return;
		// if (!this.effectOn)
		// 	return;

		// this.effect.play(effectName);
	}
	/**
	 * Play extra sound
	 */
	public playOtherEffect(effName:string):void{
		return;
		// if(!this.effectOn2){
		// 	return;
		// }
		// this.otherEffect.play(effName);
	}
	/**
	 * Stop sound effects
	 */
	public stopEffect():void{
		if (!this.effectOn)
			return;
		this.effect.stop();
	}
	/**
	 * Stop sound effects
	 */
	public stopOtherEffect():void{
		if (!this.effectOn2)
			return;
		this.otherEffect.stop();
	}

	/**
	 * Play background music
	 * @param key
	 */
	public playBg(bgName: string): void {
		return;
		// this.currBg = bgName;
		// if (!this.bgOn)
		// 	return;
		// if(this.bg){
		// 	if(Main.DUBUGGER){
		// 		Main.txt.text += "\n bgname "+bgName
		// 	}
		// 	this.bg.play(bgName);
		// }
		
	}

	/**
	 * Stop background music
	 */
	public stopBg(): void {
		this.bg.stop();
	}

	//Click play
	public touchBg():void{
		return;
		// if(egret && egret.Capabilities && egret.Capabilities.isMobile && egret.Capabilities.os == 'iOS'){
		// 	if(this.bg){
		// 		if(Main.DUBUGGER){
		// 			Main.txt.text += "\n touch play "
		// 		}
		// 		this.bg.touchPlay();
		// 	}
		// }
	}

	/**
	 * Set whether the sound effect is on
	 * @param $isOn
	 */
	public setEffectOn($isOn: boolean): void {
		this.effectOn = $isOn;
	}
	/**
	 * Set whether the sound effect is on
	 * @param $isOn
	 */
	public setOtherEffectOn($isOn: boolean): void {
		this.effectOn2 = $isOn;
	}

	/**
	 * Set whether background music is on
	 * @param $isOn
	 */
	public setBgOn($isOn: boolean): void {
		this.bgOn = $isOn;
		if (!this.bgOn) {
			this.stopBg();
		} else {
			if (this.currBg) {
				this.playBg(this.currBg);
			}
		}
	}

	/**
	 * Set background music volume
	 * @param volume
	 */
	public setBgVolume(volume: number): void {
		volume = Math.min(volume, 1);
		volume = Math.max(volume, 0);
		this.bgVolume = volume;
		this.bg.setVolume(this.bgVolume);
	}

	/**
	 * Get background music volume
	 * @returns {number}
	 */
	public getBgVolume(): number {
		return this.bgVolume;
	}

	/**
	 * Set sound volume
	 * @param volume
	 */
	public setEffectVolume(volume: number): void {
		volume = Math.min(volume, 1);
		volume = Math.max(volume, 0);
		this.effectVolume = volume;
		this.effect.setVolume(this.effectVolume);
		this.otherEffect.setVolume(this.effectVolume)
	}

	/**
	 * Get sound volume
	 * @returns {number}
	 */
	public getEffectVolume(): number {
		return this.effectVolume;
	}

}