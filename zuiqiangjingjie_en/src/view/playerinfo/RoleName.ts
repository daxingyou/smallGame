class RoleName extends eui.ItemRenderer
{
	private name_label:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "RoleNameSkin";
	}
	protected dataChanged(): void
	{
		this.name_label.text = this.data;
	}
}