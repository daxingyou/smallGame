class ShopItem extends BaseView
{
	private card_img:eui.Image;
	private money:eui.Label;
	private property_0:eui.Label;
	private property_1:eui.Label;
	private data:any;
	public constructor() 
	{
		super();
		this.skinName = "ShopItemSkin";
		this.addTouchEvent(this, this.touchTap);
	}
	public setData(_data:any)
	{
		this.data = _data;
		this.card_img.source = this.data.instId + "_jpg";
		this.money.text = "售价 " + this.data.cost + "两";
		this.property_0.visible = true;
		this.property_1.visible = true;
		if(this.data.type == ItemType.weapon)
		{
			this.property_0.text = "攻击 +" + this.data.atk;
			this.property_1.text = "命中 +" + this.data.hit;
		}else if(this.data.type == ItemType.weapon_ma)
		{
			this.property_0.text = "攻击 +" + this.data.atk;
			this.property_1.text = "暴击 +" + this.data.crit;
		}else if(this.data.type == ItemType.protection)
		{
			this.property_0.text = "防御 +" + this.data.protect;
			this.property_1.text = "生命 +" + this.data.hp;
		}else if(this.data.type == ItemType.protection_ma)
		{
			this.property_0.text = "防御 +" + this.data.protect;
			this.property_1.text = "敏捷 +" + this.data.agile;
		}else if(this.data.type == ItemType.prop)
		{
			this.property_0.visible = false;
			this.property_1.visible = false;
		}
	}
	public touchTap()
	{
		ViewManager.inst().open(ShopBuy, [this.data]);
	}
}