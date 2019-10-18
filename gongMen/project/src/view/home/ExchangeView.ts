class ExchangeView extends BaseEuiView
{
	private back_img:eui.Image;
	private head_img:eui.Image;
	private head_frame:eui.Image;
	private level_name:eui.Image;

	private head_group:eui.Image;
	private zhu:eui.Label;
	private scroller:eui.Scroller;
	private list:eui.List;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this.back_img, this.touchBack);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	public close():void{
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private init()
	{
		if(GameConfig.level>=10)
		{
			this.level_name.source = "img_level_normal_" + GameConfig.level + "_png";
		}else 
		{
			this.level_name.source = "img_level_normal_0" + GameConfig.level + "_png";
		}
		this.head_img.source = BagConfig.bagFig[BagConfig.bagID].header + "_png";
		
		this.list.itemRenderer = ExchangeItem;
		this.list.dataProvider = new eui.ArrayCollection(ExchangeConfig.exchangeFig);
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
	}
	private update()
	{
		this.zhu.text = "" + GameConfig.zhu;
		this.head_frame.source = "img_head_frame_noraml_" + GameConfig.frame + "_png";
	}
	private touchBack()
	{
		ViewManager.inst().close(ExchangeView);
	}
	
}
ViewManager.inst().reg(ExchangeView,LayerManager.UI_Pop);