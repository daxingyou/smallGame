/**剧情 */
class StoryLineView extends BaseEuiView
{
	private back_img:eui.Image;
	private list:eui.List;
	private scroller:eui.Scroller;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this.back_img, this.touchClose);
	}
	public close():void{
		
	}
	private init()
	{
		this.list.itemRenderer = StoryLineItem;
		this.list.dataProvider = new eui.ArrayCollection(StoryLineConfig.storyLinefig);
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
	}
	private touchClose()
	{
		ViewManager.inst().close(StoryLineView);
		ViewManager.inst().open(HomeView);
	}
}
ViewManager.inst().reg(StoryLineView,LayerManager.UI_Main);