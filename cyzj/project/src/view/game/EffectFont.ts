class EffectFont extends eui.Component
{
	private hurt:eui.BitmapLabel;
	private hurtNum:number;
	public constructor(_hurtNum:number, _x:number, _y:number)
	{
		super();
		this.hurtNum = Math.abs(_hurtNum);
		this.x = _x - 50;
		this.y = _y - 80 - Math.random() * 30;
		this.scaleX = this.scaleY = 0.7;
		this.skinName = "EffectFontSkin";
		this.init();
	}
	private init()
	{
		this.hurt.text = "-" + this.hurtNum;

		egret.Tween.get(this)
		.to({y:this.y - 50}, 300);

		egret.Tween.get(this)
		.wait(200)
		.to({alpha:0}, 100)
		.call(()=>{
			this.removeMySelf();
		});
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