class AdventureOver extends BaseEuiView
{
	private btn:eui.Image;
	private list:eui.List;
	private scroller:eui.Scroller;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this.btn, this.touchTap);
	}
	public close():void{
		
	}
	private init()
	{
		this.list.itemRenderer = AdventureOverItem;
		this.list.dataProvider = new eui.ArrayCollection(GameConfig.adventure);
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
	}
	private touchTap()
	{
		MessageManager.inst().dispatch("ADVENTURE_OVER");
		for(let i = 0; i < GameConfig.adventure.length; i++)
		{
			GameConfig.adventure[i].num = 0;
		}
		ViewManager.inst().close(AdventureOver);
		ViewManager.inst().close(AdventureView);
		ViewManager.inst().open(GameMainView);
	}
}
ViewManager.inst().reg(AdventureOver,LayerManager.UI_Pop);