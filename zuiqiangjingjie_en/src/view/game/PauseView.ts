class PauseView extends BaseEuiView
{
	private cancel:eui.Image;
	private confirm:eui.Image;
	private tip0_label:eui.Label;
	private tip1_label:eui.Label;
	private _type:number;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		if(param[0] && param[0].type){
			this._type = param[0].type
		}
		this.addTouchEvent(this, this.touchTap);
		this.init();
	}
	public close():void{
		
	}
	private init()
	{
		if(GameCfg.gameStart)
		{
			this.tip0_label.text = "Fighting，Stop fighting or not？";
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
				ViewManager.inst().close(BattleView);
				ViewManager.inst().close(PauseView);
				ViewManager.inst().open(GameMainView,[{type:this._type}]);
				break;
		}
	}
}
ViewManager.inst().reg(PauseView,LayerManager.UI_Pop);