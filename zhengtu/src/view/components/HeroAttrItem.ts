class HeroAttrItem extends eui.ItemRenderer{
	private nameLab:eui.Label;
	private levelLab:eui.Label;
	private _attr:any;
	private lockGroup:eui.Group;
	private headImg:eui.Image;
	public constructor() {
		super();
		this.skinName = "HeroAttrItemSkin"
	}
	protected dataChanged():void{
		this.nameLab.text = this.data.name;
		this.levelLab.text = "Lv."+(this.data.level+1);
		this.lockGroup.visible = false;
		this.headImg.source = `general_head_${this.data.index}_png`;
		if(!this.data.lock){
			this.lockGroup.visible = true;
		}
		this._attr = this.data;
	}
	public get attr():any{
		return this._attr;
	}
}