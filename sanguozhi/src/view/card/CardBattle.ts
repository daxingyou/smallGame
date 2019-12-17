class CardBattle extends BaseView
{
	public id:number;
	private type:number;
    private item:eui.Image;
	private move:boolean = true;
    public cfg:CardAttrVo;
	public constructor(_type:number, _id:number,data:any) 
	{
		super();
		this.skinName = "SkillItemSkin";
		this.id = _id;
		this.type = _type;
        this.cfg=data;
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, this.removeMove, this);
	}
	private init()
	{
		this.item.source = `skill_${this.cfg.skillIcon}_png`;
	}
	private removeMove()
	{
		if(this.move)
		{
			this.removeMySelf();
		}
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