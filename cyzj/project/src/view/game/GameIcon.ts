class GameIcon extends eui.Component
{
	private icon_group:eui.Group;
	public constructor() 
	{
		super();
		this.skinName = "GameIconSkin";
		this.init();
		this["autoSize"]();
	}
	private init()
	{
		for(let i = 0; i < 5; i++)
		{
			if(GameConfig.roleData[i].isUnlock == true)
			{
				var icon = new IconItem( i + 1);
					icon.x = 10 + i * 127;
					icon.y = 5;
				this.icon_group.addChild(icon);
			}
		}
	}
}