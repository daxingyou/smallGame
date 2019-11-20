class PauseView extends BaseEuiView
{
	private cancel:eui.Image;
	private confirm:eui.Image;
	private tip0_label:eui.Label;
	private tip1_label:eui.Label;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this, this.touchTap);
		this.init();
	}
	public close():void{
		
	}
	private init()
	{
		if(GameCfg.gameStart)
		{
			this.tip0_label.text = "正在战斗中，是否停止战斗？";
			this.tip1_label.visible = true;
		}
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.cancel:
				MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, this);
				ViewManager.inst().close(PauseView);
				break;
			case this.confirm:
				ViewManager.inst().close(GameView);
				ViewManager.inst().close(PauseView);
				ViewManager.inst().open(GameMainView);
				break;
		}
	}
}
ViewManager.inst().reg(PauseView,LayerManager.UI_Pop);