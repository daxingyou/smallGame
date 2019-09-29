class LevelSelectItem extends eui.ItemRenderer{

	private lockGroup:eui.Group;
	private icon:eui.Image;
	public constructor() {
		super();
		this.skinName = "LevelSelectItemSkin";
	}
	protected dataChanged():void{
		if(this.data.img){
			this.icon.source = this.data.img;
		}
		this.lockGroup.visible = !parseInt(this.data.start);
	}
	public get isClick():boolean{
		return !this.lockGroup.visible;
	}
}