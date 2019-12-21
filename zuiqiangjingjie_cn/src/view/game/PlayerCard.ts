class PlayerCard extends BaseView
{
	private icon_img:eui.Image;
	private quality_img:eui.Image;
	private id:number;
	public constructor(_id:number) 
	{
		super();
		this.skinName = "PlayerCardSkin";
		this.id = _id;
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, this.removeMySelf, this);
	}
	private init()
	{
		switch(this.id)
		{
			case 1:
				this.icon_img.source = "qb_png";
				break;
			case 2:
				this.icon_img.source = "gb_png";
				break;
			case 3:
				this.icon_img.source = "bb_png";
				break;
			default:
				let card:CardAttrVo = GlobalFun.getCardDataFromId(this.id);
				this.icon_img.source = card.cardModel;
				this.quality_img.source = "quality_" + card.quality + "_png";
				break;
		}
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