class StartView extends BaseEuiView
{
	private btn:eui.Button;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.addTouchEvent(this.btn, ()=>{
			ViewManager.inst().close(StartView);
			ViewManager.inst().open(ChapterView);
		},true)
	}
	public close():void
	{

	}
}
ViewManager.inst().reg(StartView,LayerManager.UI_Main);