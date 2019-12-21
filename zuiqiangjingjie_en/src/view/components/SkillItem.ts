class SkillItem extends eui.ItemRenderer{

	private item:eui.Image;
	private cfg:CardAttrVo;
	private numLab:eui.Label;
	private canPro:boolean=false;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		// this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchBegin, this);
		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this)
	}
	protected dataChanged():void{
		this.cfg = this.data;
		this.item.source = `skill_${this.cfg.skillIcon}_png`;
		this.numLab.text = this.cfg.ownNum.toString();
	}
	public get vo():CardAttrVo{
		return this.cfg;
	}
	private touchBegin(evt:egret.TouchEvent)
	{
		
		MessageManager.inst().dispatch(LocalStorageEnum.BEGIN_MOVE_CARD, {card:this.data, x:evt.stageX, y:evt.stageY});

	}
}