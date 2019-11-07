class StartGameView extends BaseEuiView
{
	private game_btn:eui.Image;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.game_btn, this.gameStart);
	}
	public close():void{
		this.removeTouchEvent(this.game_btn, this.gameStart);
	}
	private gameStart()
	{
		
		ViewManager.inst().close(StartGameView);
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Pop);