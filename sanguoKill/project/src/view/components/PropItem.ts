class PropItem extends eui.ItemRenderer{

	private propImg:eui.Image;
	private focusImg:eui.Image;
	private cardAttr:any;
	private descLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "PropItemSkin";
	}
	protected dataChanged():void{
		this.cardAttr = this.data;
		this.propImg.source = this.cardAttr.instId+"_jpg";
		this.descLab.text = this.cardAttr.tip;
		this.focus = false;
		if(this.itemIndex == 0){
			this.focus = true;
		}
	}
	public get attr():any{
		return this.cardAttr;
	}
	public set focus(value:boolean){
		this.focusImg.visible = value
	}
}