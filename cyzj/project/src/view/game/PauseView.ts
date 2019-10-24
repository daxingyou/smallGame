class PauseView extends BaseEuiView
{
	private btn_0:eui.Image;
	private btn_1:eui.Image;
	private any:any;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.any = param[0];
		this.addTouchEvent(this.btn_0, this.touchYes);
		this.addTouchEvent(this.btn_1, this.touchNo);
	}
	public close():void{
		this.removeTouchEvent(this.btn_0, this.touchYes);
		this.removeTouchEvent(this.btn_1, this.touchNo);
	}
	private touchYes()
	{
		this.rest();
		ViewManager.inst().close(this.any);
		ViewManager.inst().close(PauseView);

		if(GameConfig.fight_state == "adventure")
		{
			MessageManager.inst().dispatch("ADVENTURE_OVER");
		}
	}
	private touchNo()
	{
		MessageManager.inst().dispatch("GAME_START", this);
		ViewManager.inst().close(PauseView);
	}
	private rest()
	{
		GameConfig.monsterFig = [];
		GameConfig.playerFig = [];
		GameConfig.monster_qian = [];
		GameConfig.monster_zhong = [];
		GameConfig.monster_hou = [];
		GameConfig.player_qian = [];
		GameConfig.player_hou = [];
		AdventureConfig.itemAny = [];
	}
}
ViewManager.inst().reg(PauseView,LayerManager.UI_Pop);