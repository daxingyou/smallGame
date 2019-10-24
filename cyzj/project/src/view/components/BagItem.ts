class BagItem extends eui.ItemRenderer{

	public icon:eui.Image;
	public numLab:eui.Label;
	public nameLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "BagItemSkin";
	}
	protected dataChanged():void{
		this.icon.source = this.data.icon;
		this.numLab.text = this.data.num;
		this.nameLab.text = this.data.name;
	}
	public refreshNum(num):void{
		if(num <= 0){num = 0}
		this.numLab.text = num;
	}
	public get num():number{
		return parseInt(this.numLab.text);
	}
	
}