class IconItem extends eui.Component
{
	private mask_tiao:eui.Image;
	private nu_tiao:eui.Image;
	private icon_img:eui.Image;
	private effect:eui.Image;
	private id:number = 1;
	private nu_num:number = 0;
	private nu_max:number = 100;
	public constructor(_id:number) 
	{
		super();
		this.id = _id;
		this.skinName = "IconItemSkin";
		this.init();
		this["autoSize"]();
		MessageManager.inst().addListener("NUQI", this.addNu, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	private init()
	{
		this.mask_tiao.mask = this.nu_tiao;
		this.icon_img.source = "icon_" + this.id + "_png";
	}
	private addNu(evt:CustomEvt)
	{
		if(evt.data == this.id)
		{
			if(this.nu_num < 100)
			{
				this.nu_num += Math.floor(Math.random()*10 + 20);
				if(this.nu_num >= 100)
					this.nu_num = 100;
				this.nu_tiao.x = -this.nu_tiao.width + this.nu_num * this.nu_tiao.width / this.nu_max;
			}else 
			{
				this.nu_num = 100;
				this.nu_tiao.x = -this.nu_tiao.width + this.nu_num * this.nu_tiao.width / this.nu_max;
			}
		}
	}
	private touchTap()
	{
		if(this.effect.visible)
		{
			/**释放技能 */
			this.effect.visible = false;
			this.nu_num = 0;
			this.nu_tiao.x = -this.nu_tiao.width + this.nu_num * this.nu_tiao.width / this.nu_max;
			MessageManager.inst().dispatch("PLAYER_SKILL", this.id);
		}
	}
	private update()
	{
		if(this.nu_num>=100)
		{
			this.effect.visible = true;
			if(GameConfig.auto_bool)
			{
				this.touchTap();
			}
		}
	}
}