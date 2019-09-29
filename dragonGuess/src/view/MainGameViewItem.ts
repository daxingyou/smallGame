class MainGameViewItem extends eui.ItemRenderer{
	private itemImg:eui.Image;
	private _level:number;
	private _title:string;
	public constructor() {
		super();
		this.skinName = "MainGameViewItemSkin"
	}
	protected dataChanged():void{
		if(this.data.img){
			this.itemImg.source = this.data.img;
		}
		this._level = this.data.level;
		this._title = this.data.title;
	}
	public get level():number{
		return this._level;
	}
	public get title():string{
		return this._title;
	}
}