class BoxItem extends eui.ItemRenderer
{
	private img:eui.Image;
	public constructor() 
	{
		super();
		this.skinName = "BoxItemSkin";
	}
	protected dataChanged(): void
	{
		this.img.source = this.data.img + "_png";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	private touchTap()
	{
		MessageManager.inst().dispatch("BOX_PICKUP", this.data);
		if(this.data.img == 10012)
		{
			GlobalFun.addSuiPian(0, 1);
		}else if(this.data.img == 10013)
		{
			GlobalFun.addSuiPian(1, 1);
		}else if(this.data.img == 10014)
		{
			GlobalFun.addSuiPian(2, 1);
		}else if(this.data.img == 10015){
			GlobalFun.addSuiPian(3, 1);
		}
		GlobalFun.addItemToBag(this.data.img, 1);
		GameConfig.setAdventure(this.data.img);
	}
}