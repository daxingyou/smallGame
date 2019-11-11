class CustomEvt extends egret.Event{

	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';
	/**引导集结队伍 */
	public static readonly GUIDE_CLICK_COLLECT:string = "guide_click_collect";
	/**引导点击确定按钮 */
	public static readonly GUIDE_CLICL_SURE:string = "guide_click_sure";
	/**引导第一场战斗 */
	public static GUIDE_CLICK_BATTLE:string = "guide_click_battle";
	/**引导选择关卡 */
	public static GUIDE_SELECT_LEVEL:string = "guide_select_level";
	/**引导技能释放 */
	public static GUIDE_USE_SKILL:string = "guide_use_skill";
	/**打开武将面板 */
	public static GUIDE_OPEN_GENERAL:string = "guide_open_general";
	/**补充兵力 */
	public static GUIDE_ADD_SOLDIER:string = "guide_add_soldier";
	/**训练 */
	public static GUIDE_TRAIN_SOLDIER:string = "guide_train_soldier";
	/**关闭兵营 */
	public static GUIDE_CLOSE_SOLDIER:string = "guide_close_soldier";
	/**下一步引导 */
	public static GUIDE_TO_NEXT:string = "guide_to_next";

	/**引导点击军需处 */
	public static GUIDE_CLICK_BUILD_GOODS:string = "guide_click_build_goods";
	/**引导收集生铁 */
	public static GUIDE_COLLECT_FE:string = "guide_collect_fe";
	/**引导加速生铁的生产 */
	public static GUIDE_QUICK_FE:string = "guide_quick_fe";
	/**引导收集木材 */
	public static GUIDE_COLLECT_WOOD:string = "guide_collect_wood";
	/**引导收集粮草 */
	public static GUIDE_COLLECT_GOOD:string = "guide_collect_good";
	/**引导关闭军需处 */
	public static GUIDE_CLOSE_COLLECT:string = "guide_close_collect";
	/**士兵进度刷新1 */
	public static PROGRESS_0:string = "progress_0";
	/**士兵进度刷新2 */
	public static PROGRESS_1:string = "progress_1";
	/**士兵进度刷新3 */
	public static PROGRESS_2:string = "progress_2";

	/**战斗结算界面退出 */
	public static BATTLE_END:string = "battle_end";
	/**重置战斗 */
	public static BATTLE_RESET:string = "battle_reset";

	/**点击确定 */
	public static CLICK_SURE:string = "clicl_sure";

	/**人物升级 */
	public static UPGRADE:string = "upgrade";
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}