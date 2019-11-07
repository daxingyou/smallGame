class FightingView extends BaseEuiView
{
	private tianti:eui.Image;
	private duoqi:eui.Image;
	private fengkuang:eui.Image;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this, this.touchTap);
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
	}
	private init()
	{
		GlobalFun.filterToGrey(this.duoqi);
		GlobalFun.filterToGrey(this.fengkuang);
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.tianti:
				console.log("打开天梯模式");
				ViewManager.inst().open(HighLadderView);
				break;
			case this.duoqi:
				console.log("打开夺旗模式");
				break;
			case this.fengkuang:
				console.log("打开疯狂模式");
				break;

		}
	}
}
ViewManager.inst().reg(FightingView,LayerManager.UI_Pop);