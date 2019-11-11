class Item extends eui.ItemRenderer{
	private img:eui.Image;
	private numLab:eui.Label;
	private itemName:eui.Label;
	public constructor() {
		super();
		this.skinName = "ItemSkin"
	}
	protected dataChanged():void{
		if(this.data.res){
			this.img.source = this.data.res;
		}
		this.numLab.text = this.data.num.toString();
		if(this.data.itemName){
			this.itemName.text = this.data.itemName;
		}
	}
}