/**
 * Created by yangsong on 15-1-14.
 * Sound管理类
 */
class SoundManager extends BaseClass {
	/**
	 * 音乐文件清理时间
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
	 * 构造函数
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
	 * 播放音效
	 * @param effectName
	 */
	public playEffect(effectName: string): void {
		return;
		// if (!this.effectOn)
		// 	return;

		// this.effect.play(effectName);
	}
	/**
	 * 播放额外的音效
	 */
	public playOtherEffect(effName:string):void{
		return;
		// if(!this.effectOn2){
		// 	return;
		// }
		// this.otherEffect.play(effName);
	}
	/**
	 * 停止音效
	 */
	public stopEffect():void{
		if (!this.effectOn)
			return;
		this.effect.stop();
	}
	/**
	 * 停止音效
	 */
	public stopOtherEffect():void{
		if (!this.effectOn2)
			return;
		this.otherEffect.stop();
	}

	/**
	 * 播放背景音乐
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
	 * 停止背景音乐
	 */
	public stopBg(): void {
		this.bg.stop();
	}

	//点击播放
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
	 * 设置音效是否开启
	 * @param $isOn
	 */
	public setEffectOn($isOn: boolean): void {
		this.effectOn = $isOn;
	}
	/**
	 * 设置音效是否开启
	 * @param $isOn
	 */
	public setOtherEffectOn($isOn: boolean): void {
		this.effectOn2 = $isOn;
	}

	/**
	 * 设置背景音乐是否开启
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
	 * 设置背景音乐音量
	 * @param volume
	 */
	public setBgVolume(volume: number): void {
		volume = Math.min(volume, 1);
		volume = Math.max(volume, 0);
		this.bgVolume = volume;
		this.bg.setVolume(this.bgVolume);
	}

	/**
	 * 获取背景音乐音量
	 * @returns {number}
	 */
	public getBgVolume(): number {
		return this.bgVolume;
	}

	/**
	 * 设置音效音量
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
	 * 获取音效音量
	 * @returns {number}
	 */
	public getEffectVolume(): number {
		return this.effectVolume;
	}

}