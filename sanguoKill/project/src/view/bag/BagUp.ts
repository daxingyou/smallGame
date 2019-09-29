class BagUp extends BaseEuiView
{
	private tip_label:eui.Label;
	private close_btn:eui.Button;
	private btn:eui.Button;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.addTouchEvent(this.close_btn, this.close);
		this.addTouchEvent(this.btn, this.touchBtn);
	}
	public close():void
	{
		ViewManager.inst().close(BagUp);
	}
	private touchBtn()
	{
		if(this.tip_label.text == "升级成功")
		{
			ViewManager.inst().close(BagUp);
			return;
		}
		if(GameApp.inst().gold >= 10000)
		{
			GameApp.inst().gold -= 10000;
			MessageManager.inst().dispatch("SHENG_JI_BAG")
			this.tip_label.text = "升级成功"
			// this.close();
		}else
		{
			this.tip_label.text = "银两不足";
		}
	}
}
ViewManager.inst().reg(BagUp,LayerManager.UI_Pop);