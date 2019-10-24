class Hp extends BaseView
{
	private hp_mask:eui.Rect;
	private tiao:eui.Image;

	private hp_num:number;
	private hp_max:number;
	private titleIcon:eui.Image;
	public constructor(_hp:number,_level:number)
	{
		super();
		this.hp_num = this.hp_max = _hp;
		this.skinName = "HpSkin";
		this.titleIcon.source = `title_icon_${_level}_png`;
		this.init();
	}
	private init()
	{
		this.tiao.mask = this.hp_mask;
		this.hp_mask.x = this.tiao.width - this.hp_num * (this.tiao.width / this.hp_max);
	}
	public setHp(_num:number)
	{
		if(this.hp_num >= 0)
		{
			this.hp_num -= _num;
			this.hp_mask.x = -(this.tiao.width - this.hp_num * (this.tiao.width / this.hp_max));
		}
	}
	public addHp(_num:number)
	{
		this.hp_num += _num;
		if(this.hp_num>=this.hp_max)
		{
			this.hp_num = this.hp_max;
		}
		this.hp_mask.x = -(this.tiao.width - this.hp_num * (this.tiao.width / this.hp_max));
	}
	public getHp()
	{
		return this.hp_num;
	}
}