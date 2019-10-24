class AdventureEffect extends BaseView
{
	private img:eui.Image;
	private num_label:eui.Label;
	public constructor(param:any) 
	{
		super();
		this.skinName = "AdventureEffectSkin";

		this.x = param[0].x;
		this.y = param[0].y - 180;
		this.img.source = param[0].img + "_png";
		this.num_label.text = "+ " + param[0].num;
		this.alpha = 0;

		egret.Tween.get(this)
		.to({alpha:1}, 200);

		egret.Tween.get(this)
		.to({y:this.y - 60}, 500)
		.call(()=>{
			this.close();
		});
	}
	public close():void{
		egret.Tween.removeTweens(this);
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}