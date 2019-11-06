class ArchiveItem extends eui.ItemRenderer
{
	private card_img:eui.Image;
	private card_name:eui.Label;
	private card_num:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "ArchiveItemSkin";
	}
	protected dataChanged(): void
	{
		this.card_img.source = "card_" + this.data.cardId + "_" + this.data.level + "_png";
		this.card_name.text = this.data.name;
		this.card_name.textColor = this.data.qualityColor;
		this.card_num.text = "数量:" + this.data.ownNum;
	}
}