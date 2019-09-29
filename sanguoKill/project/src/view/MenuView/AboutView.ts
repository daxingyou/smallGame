class AboutView extends BaseEuiView
{
	private back_btn:eui.Button;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.addTouchEvent(this.back_btn, this.close)
	}
	public close():void
	{
		ViewManager.inst().close(AboutView);
	}
}
ViewManager.inst().reg(AboutView,LayerManager.UI_Main);