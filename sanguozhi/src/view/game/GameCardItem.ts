class GameCardItem extends eui.ItemRenderer
{
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
	public constructor() 
	{
		super();
		this.skinName = "GameCardItemSkin";
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
	}
	protected dataChanged(): void
	{
		this.icon_img.source = `${this.data.cardModel}`;
		this.quality_img.source = `quality_${this.data.quality}_png`;
		switch( this.data.type ) {
            case CardType.general:
                this.skill_group.visible = false;
				this.info_group.visible = true;
                this.level_label.text = `等级：${this.data.level}`;
                this.city_img.source = `city_${this.data.city}_png`;
                this.own_label.text = `碎片：${this.data.ownNum}/${this.data.upgradeNum}`;
                this.hp_label.text = `生命：${this.data.hp}`;
                this.atk_label.text = `攻击：${this.data.atk}`;
                break;
            case CardType.special_skill:
				this.skill_group.visible = true;
                this.info_group.visible = false;
                this.num_label.text = `数量：${this.data.ownNum}`;
                break;
            case CardType.build:
                this.skill_group.visible = false;
				this.info_group.visible = true;
                this.city_img.visible = false;
                this.level_group.horizontalCenter = 0;
                this.level_label.text = `等级：${this.data.level}`;
                this.own_label.text = `碎片：${this.data.ownNum}/${this.data.upgradeNum}`;
                this.hp_label.text = `生命：${this.data.hp}`;
                this.atk_label.text = `攻击：${this.data.atk}`;
                break;
        }
		this.scaleX = this.scaleY = 0.7;
	}
	private touchBegin(evt:egret.TouchEvent)
	{
		if(this.data.type == CardType.general)
		{	
			if(GameCfg.gameStart)
			{
				UserTips.inst().showTips("对战进行中无法选择武将");
				return;
			}
			MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, {card:this.data.insId, x:evt.stageX, y:evt.stageY});
		}
		else if(this.data.type == CardType.build)
		{
			if(GameCfg.gameStart)
			{
				UserTips.inst().showTips("对战进行中无法选择");
				return;
			}
			MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_BUILD, {card:this.data.insId, x:evt.stageX, y:evt.stageY});
		}else
		{
			MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_SKILL, {card:this.data, x:evt.stageX, y:evt.stageY});
		}
	}
}