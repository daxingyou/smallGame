class CustomEvt extends egret.Event{
	/**Introduction to shopping mall interface*/
	public static SHOP_INTRODUCE:string='shop_introduce'; 
	/**Gameloadingcomplete */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	/**Guide click Help */
	public static GUIDE_CLICK_CITY:string = "GUIDE_CLICK_CITY";
	/**Lead into battle */
	public static GUIDE_CLICK_BATTLE:string = "GUIDE_CLICK_BATTLE";
	/**Start collecting */
	public static TAX_START:string = "tax_start";
	/**End of collection */
	public static TAX_END:string = "tax_end";
	/**Start conscription */
	public static COLLECT_START:string = "collect_start";
	/**Ending conscription */
	public static COLLECT_END:string = "collect_end";
	/**Choice of city*/
	public static SELECT_MAIN_CITY: string = "select_main_city";
	/**Interior cooling */
	public static NEIWU_CD:string = "neiwu_cd";
	/**Click card */
	public static TOUCH_CARD: string = "touch_card";
	/**Card purchase notice */
	public static CARD_REFRESH:string = "card_refresh";
	/** Refresh mall */
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