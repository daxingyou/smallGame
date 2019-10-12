class CardItem extends eui.ItemRenderer{
	private icon:eui.Image;
	public constructor() {
		super();
		this.skinName = "CardItemSkin"
	}
	protected dataChanged():void{
		this.icon.source = `number${this.itemIndex+1}`;
	}
}