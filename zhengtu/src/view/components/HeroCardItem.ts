class HeroCardItem extends eui.Component{

	private curHeroAttr:AttrItem;
	private heroImg:eui.Image;
	private typeIcon:eui.Image;
	private nameLab:eui.Label;
	private focusGroup:eui.Group;
	public constructor(attrData:AttrItem) {
		super();
		this.skinName = "HeroCardItemSkin";
		this.curHeroAttr = attrData;
		this.touchEnabled = true;
		this.touchChildren = false;
	}
	protected childrenCreated():void{
		this.focusGroup.visible = false;
		this.nameLab.text = this.curHeroAttr.name;
		this.heroImg.source = this.curHeroAttr.icon;
		this.typeIcon.source = `type_${this.curHeroAttr.type}_png`;
		this.focusGroup.visible = false;
	}
	public get attr():AttrItem{
		return this.curHeroAttr;
	}
	public set focus(value:boolean){
		this.focusGroup.visible = value;
	}
}