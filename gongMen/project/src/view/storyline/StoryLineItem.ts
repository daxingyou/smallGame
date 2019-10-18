class StoryLineItem extends eui.ItemRenderer
{
	private bg:eui.Image;
	private label:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "StoryLineItemSkin";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	protected dataChanged(): void
	{
		this.bg.source = "img_juqing_cell_" + this.data.state + "_png";
		this.label.text = this.data.juqTitle;
	}
	private touchTap()
	{
		if(this.data.state != "gray")
		{
			GameConfig.gqConfig = this.data.juqopsisPath;
			GameConfig.gqMin = this.data.juqopsisList.split("~")[0];
			GameConfig.gqMax = this.data.juqopsisList.split("~")[1];
			GameConfig.gqNum = this.data.id;
			ViewManager.inst().close(StoryLineView);
			ViewManager.inst().open(GameView);
		}
	}
}