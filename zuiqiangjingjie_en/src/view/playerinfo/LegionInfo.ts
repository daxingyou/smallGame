class LegionInfo extends eui.ItemRenderer
{
	private name_lable:eui.Label;
	private num_label:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "LegionInfoSkin";
	}
	protected dataChanged(): void
	{
		this.name_lable.text = this.data.name;
		this.num_label.text = "" + this.data.ownNum;
	}
}