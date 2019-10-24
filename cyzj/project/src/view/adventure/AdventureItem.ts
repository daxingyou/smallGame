/**材料 */
class AdventureItem extends egret.Sprite
{
	private img:egret.Bitmap;
	public id:number;
	public vis:boolean = true;
	public constructor() 
	{
		super();
		this.init();
	}
	private init()
	{
		var num = Math.random() * 100;
		if(num < 10)
		{
			this.id = 10016;
		}else if(num < 95)
		{
			this.id = Math.floor(Math.random() * 9 + 10000);
		}else if(num < 100)
		{
			this.id = Math.floor(Math.random() * 3 + 10009);
		}
		this.img = new egret.Bitmap(RES.getRes(this.id + "_png"));
		this.addChild(this.img);
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
	}
	public effect()
	{
		egret.Tween.get(this)
		.to({alpha:0}, 100)
		.call(this.removeMySelf);
	}
	private removeMySelf()
	{
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}