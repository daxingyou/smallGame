class AdventureOverItem extends eui.ItemRenderer
{
	private img:eui.Image;
	private num:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "AdventureOverItemSkin";
	}
	protected dataChanged(): void
	{
		this.img.source = this.data.id + "_png";
		this.num.text = this.data.name + "  x " + this.data.num;
	}
}