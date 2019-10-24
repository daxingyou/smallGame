class TextEffect extends BaseView
{
	private label:eui.Label;
	private state:number;
	public constructor(_name:string, _color:number, _state:number) 
	{
		super();
		this.skinName = "TextEffectSkin";
		this.label.text = _name;
		this.label.textColor = _color;
		this.state = _state;
		this.init();
	}
	private init()
	{
		switch(this.state)
		{
			case 0:
				this.y = -130;
				egret.Tween.get(this)
				.to({y:this.y - 50}, 600)
				.call(this.removeMySelf);
				break;
			case 1:
				this.label.size = 24;
				break;
		}
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