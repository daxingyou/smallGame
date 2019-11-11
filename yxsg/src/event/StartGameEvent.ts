class StartGameEvent extends egret.Event{
	
	public static readonly START:string = "start";
	public static readonly VJ_END:string = "vjEnd";
	public static readonly GAMELOADINGEND:string = "gameloadingend";
	public static readonly REMOVE_ITEM:string = "remove_item";

	public static readonly USE_BUFF:string = "use_buff";

	public static readonly GUIDE_CLICK_INFO:string = "guide_click_info";
	public data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this.data = data;
	}
}