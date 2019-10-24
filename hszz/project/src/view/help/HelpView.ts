class HelpView extends BaseEuiView
{
	private close_btn:eui.Image;
	private help_text:eui.Label;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.close_btn, this.touchClose);
	}
	public close():void{
		this.removeTouchEvent(this.close_btn, this.touchClose);
	}
	private touchClose()
	{
		ViewManager.inst().close(HelpView);
	}
}
ViewManager.inst().reg(HelpView,LayerManager.UI_Pop);