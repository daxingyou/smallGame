class CustomEvt extends egret.Event{
	/**道具使用 */
	public static readonly PROP_USE:string = "prop_use";
	/**点击杀 */
	public static readonly CLICK_KILL:string = "click_kill";
	/**资源加载完成 */
	public static readonly COMMONRESEND:string = "commonresend";
	/**设置操作 */
	public static readonly SETTINGCLICK:string = "settingclick";
	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	/**引导点击帮助 */
	public static GUIDE_CLICK_INFO:string = "guide_click_info";

	/**引导点击商城 */
	public static GUIDE_CLICK_MENU_SHOP:string = "guide_click_menu_shop";

	/**引导点击商城第一个item */
	public static GUIDE_CLICK_SHOP_ITEM:string = "guide_click_shop_item";

	/**引导购买物品 */
	public static GUIDE_CLICK_SHOP_BUY:string ="guide_click_shop_buy";
	/**引导关闭商城 */
	public static GUIDE_CLICK_SHOP_CLOSE:string = "guide_click_shop_close";
	/**引导升级武将 */
	public static GUIDE_CLICK_UPGRADE:string = "guide_click_upgrade";
	/**引导更换武将装备 */
	public static GUIDE_CLICK_CHANGE:string = "guide_click_change";
	/**引导完成更换装备 */
	public static GUIDE_CLICK_Equip:string = "guide_click_equip";
	/**引导关闭升级 */
	public static GUIDE_CLICK_Equip_CLOSE:string = "guide_click_equip_close";
	/**引导关闭菜单 */
	public static GUIDE_CLICK_CLOSE_MENU:string = "guide_click_close_menu";
	public static RANDOM:string = "11111";

	public static SELECT_EQUIP_UPDATA:string = "select_equip_updata";
	public static SELECT_EQUIP:string = "select_equip";
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}