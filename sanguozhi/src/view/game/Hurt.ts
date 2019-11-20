class Hurt extends BaseView
{
	private num:eui.BitmapLabel;
	public constructor(_num:number) 
	{
		super();
		this.skinName = "HurtSkin";
		this.num.text = "-" + _num;
		this.init();
	}
	private init()
	{	
		egret.Tween.get(this.num)
		.to({y:this.num.y - 50}, 150)
		.call(()=>{
			this.removeMySelf();
		}, this);
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