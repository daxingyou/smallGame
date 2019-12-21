/**
 * Created by yangsong on 15-1-14.
 * SoundBase class
 */
class BaseSound {
	public _cache:any;
	public _loadingCache:Array<string>;

	/**
	 * Constructor
	 */
	public constructor() {
		this._cache = {};
		this._loadingCache = new Array<string>();

		TimerManager.inst().doTimer(1 * 60 * 1000, 0, this.dealSoundTimer, this);
	}

	/**
	 * Handling music file cleanup
	 */
	private dealSoundTimer():void {
		let currTime:number = egret.getTimer();
		let keys = Object.keys(this._cache);
		for (let i:number = 0, len = keys.length; i < len; i++) {
			let key = keys[i];
			if (!this.checkCanClear(key))
				continue;
			if (currTime - this._cache[key] >= SoundManager.CLEAR_TIME) {
				//debug.log(key + "alreadyclear")
				delete this._cache[key];
				RES.destroyRes(key);
			}
		}
	}

	/**
	 * ObtainSound
	 * @param key
	 * @returns {egret.Sound}
	 */
	public getSound(key:string,callBackFunc:(sound)=>void,thisArg):void{
		
		RES.getResByUrl(key,(data)=>{
			let sound:egret.Sound = data ;
			if (sound) {
				if (this._cache[key]) {
					this._cache[key] = egret.getTimer();
				}
			} else {
				if (this._loadingCache.indexOf(key) != -1) {
					return null;
				}
				this._loadingCache.push(key);
				RES.getResAsync(key, this.onResourceLoadComplete, this);
			}
			if(callBackFunc && thisArg){
				callBackFunc.call(thisArg,sound);
			}
		},this,RES.ResourceItem.TYPE_SOUND);
		
	}

	/**
	 * Resource loading completed
	 * @param event
	 */
	private onResourceLoadComplete(data:any, key:string):void {
		let index:number = this._loadingCache.indexOf(key);
		if (index != -1) {
			this._loadingCache.splice(index, 1);
			this._cache[key] = egret.getTimer();
			this.loadedPlay(key);
		}
	}

	/**
	 * Process playback after resource loading，Subclass rewriting
	 * @param key
	 */
	public loadedPlay(key:string):void {

	}

	/**
	 * Detect whether a file needs to be cleared，Subclass rewriting
	 * @param key
	 * @returns {boolean}
	 */
	public checkCanClear(key:string):boolean {
		return true;
	}
}