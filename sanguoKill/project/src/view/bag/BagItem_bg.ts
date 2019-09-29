class BagItem_bg extends eui.ItemRenderer
{
	private card_img:eui.Image;
	public constructor() 
	{
		super();
		this.skinName = "BagItem_bgSkin";
		this.card_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	protected dataChanged(): void
	{
		if(this.data == null)
		{
			this.card_img.visible = false;
		}else
		{
			this.card_img.visible = true;
			this.card_img.source = this.data.instId + "_jpg";
		}
	}
	private touchTap()
	{
		ViewManager.inst().open(BagTip, [this.data])
	}
}