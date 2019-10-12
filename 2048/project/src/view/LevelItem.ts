class LevelItem extends eui.ItemRenderer{
	private icon:eui.Image;
	private lockImg:eui.Image;
	private lockBoo:boolean;
	public constructor() {
		super();
		this.skinName = "LevelItemSkin";
	}
	protected dataChanged():void{
		this.icon.source = `level_${this.itemIndex+1}_png`;
		if(this.itemIndex > 0 && this.itemIndex != 9){
			let lockStr:string = egret.localStorage.getItem(`lock_${this.itemIndex}`);
			if(!lockStr){
				this.lockImg.visible = true;
				this.lockBoo = true;
			}else{
				this.lockImg.visible = false;
				this.lockBoo = false;
			}
		}else{
			this.lockImg.visible =false;
			this.lockBoo = false;
		}
		
	}
	public lock():void{
		egret.localStorage.setItem(`lock_${this.itemIndex}`,"1");
		this.lockImg.visible = false;
		this.lockBoo = false;
	}
	public get lockState():boolean{
		return this.lockBoo;
	}
}