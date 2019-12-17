class CustomEvt extends egret.Event{
	/**商城界面介绍*/
	public static SHOP_INTRODUCE:string='shop_introduce'; 
	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	/**引导点击帮助 */
	public static GUIDE_CLICK_CITY:string = "GUIDE_CLICK_CITY";
	/**引导进入战斗 */
	public static GUIDE_CLICK_BATTLE:string = "GUIDE_CLICK_BATTLE";
	/**开始征收 */
	public static TAX_START:string = "tax_start";
	/**结束征收 */
	public static TAX_END:string = "tax_end";
	/**开始征兵 */
	public static COLLECT_START:string = "collect_start";
	/**结束征兵 */
	public static COLLECT_END:string = "collect_end";
	/**选择城市*/
	public static SELECT_MAIN_CITY: string = "select_main_city";
	/**内务冷却 */
	public static NEIWU_CD:string = "neiwu_cd";
	/**点击卡牌 */
	public static TOUCH_CARD: string = "touch_card";
	/**卡牌购买通知 */
	public static CARD_REFRESH:string = "card_refresh";
	/** 刷新商城 */
	public static UPDATE_SHOP: string = `update_shop`;
	
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}