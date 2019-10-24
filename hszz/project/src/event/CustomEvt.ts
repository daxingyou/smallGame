class CustomEvt extends egret.Event{

	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	/**引导点击帮助 */
	public static GUIDE_CLICK_INFO:string = "guide_click_info";

	/**技能item 开始点击 */
	public static ITEM_BEGIN:string = "item_begin";
	/**技能item 结束点击 */
	public static ITEM_END:string = "item_end";
	/**血量减少 */
	public static REDUCE_HP:string = "reduce_hp"
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}