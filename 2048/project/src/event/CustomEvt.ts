class CustomEvt extends egret.Event{

	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	/**引导点击帮助 */
	public static GUIDE_CLICK_INFO:string = "guide_click_info";
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}