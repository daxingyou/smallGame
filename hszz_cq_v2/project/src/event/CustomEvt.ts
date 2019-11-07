class CustomEvt extends egret.Event{

	/**游戏loading完成 */
	public static readonly GAMELOADINGEND:string = 'gameLoadingEnd';

	/**引导点击战斗 */
	public static GUIDE_CLICK_BATTLE:string = "guide_click_battle";

	/**技能item 开始点击 */
	public static ITEM_BEGIN:string = "item_begin";
	/**技能item 结束点击 */
	public static ITEM_END:string = "item_end";
	/**血量减少 */
	public static REDUCE_HP:string = "reduce_hp"
	/**继续 */
	public static CONTINUE:string = "continue";
	/**退出 */
	public static EXIT:string = "exit";
	/**	受伤害显示 */
	public static DMGSHOW:string = "dmgshow";
	/** */
	public static DMGHIDE:string = "dmghide";
	/**boss受攻击 */
	public static BOSS_DMG:string = "boss_dmg";
	/**boss死亡 */
	public static BOSS_DEAD:string = "boss_dead";
	/**游戏结束 */
	public static GAMEEND:string = "gameend";
	private _data:any;
	public constructor(type: string,data:any = null, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
		this._data = data;
	}
	public get data():any{
		return this._data;
	}
}