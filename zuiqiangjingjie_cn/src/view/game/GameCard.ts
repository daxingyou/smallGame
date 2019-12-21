class GameCard extends BaseView
{
	private id:number;
	private type:number;
	private move:boolean = true;

	private info_group: eui.Group;
    private skill_group: eui.Group;
    private level_group: eui.Group;

    private quality_label: eui.Label;
    private name_label: eui.Label;
    private level_label: eui.Label;
    private city_img: eui.Image;
    private own_label: eui.Label;
    private icon_img: eui.Image;
    private quality_img: eui.Image;
    private hp_label: eui.Label;
    private atk_label: eui.Label;
    private num_label: eui.Label;
	public constructor(_type:number, _id:number) 
	{
		super();
		this.skinName = "GameCardItemSkin";
		this.id = _id;
		this.type = _type;
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, this.removeMove, this);
	}
	private init()
	{
		this.scaleX = this.scaleY = 0.7;
		let cfg:CardAttrVo[] = GlobalFun.getCardsFromType( this.type , false );
		let cfg_0:CardAttrVo;
		for(let i = 0; i < cfg.length; i++)
		{
			if(cfg[i].insId == this.id)
			{
				cfg_0 = cfg[i];
			}
		}
        this.icon_img.source = `${cfg_0.cardModel}`;
		this.quality_img.source = `quality_${cfg_0.quality}_png`;
		switch( this.type ) {
            case CardType.general:
                this.skill_group.visible = false;
				this.info_group.visible = true;
                this.level_label.text = `等级：${cfg_0.level}`;
                this.city_img.source = `city_${cfg_0.city}_png`;
                this.own_label.text = `碎片：${cfg_0.ownNum}/${cfg_0.upgradeNum}`;
                this.hp_label.text = `生命：${cfg_0.hp}`;
                this.atk_label.text = `攻击：${cfg_0.atk}`;
                break;
            case CardType.special_skill:
                this.info_group.visible = false;
				this.skill_group.visible = true;
                this.num_label.text = `数量：${cfg_0.ownNum}`;
                break;
            case CardType.build:
                this.skill_group.visible = false;
				this.info_group.visible = true;
                this.city_img.visible = false;
                this.level_group.horizontalCenter = 0;
                this.level_label.text = `等级：${cfg_0.level}`;
                this.own_label.text = `碎片：${cfg_0.ownNum}/${cfg_0.upgradeNum}`;
                this.hp_label.text = `生命：${cfg_0.hp}`;
                this.atk_label.text = `攻击：${cfg_0.atk}`;
                break;
        }
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