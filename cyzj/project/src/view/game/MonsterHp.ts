class MonsterHp extends BaseView
{
	private tiao:eui.Image;
	private hp_mask:eui.Rect;

	private hp_num:number;
	private hp_max:number;

	public constructor(_hp:number) 
	{
		super();
		this.hp_num = this.hp_max = _hp;
		this.skinName = "MonsterHpSkin";
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
	public getHp()
	{
		return this.hp_num;
	}
}