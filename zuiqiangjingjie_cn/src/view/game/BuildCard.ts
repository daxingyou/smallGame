class BuildCard extends BaseView
{
	private icon_img:eui.Image;
	private quality_img:eui.Image;
	private id:number;
	public constructor(_id:number) 
	{
		super();
		this.skinName = "BuildCardSkin";
		this.id = _id;
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, this.removeMySelf, this);
	}
	private init()
	{
		let card:CardAttrVo = GlobalFun.getCardDataFromId(this.id);
		this.icon_img.source = card.cardModel;
		this.quality_img.source = "quality_" + card.quality + "_png";
		this.scaleX = this.scaleY = 0.7;
	}
	private removeMySelf()
	{
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}