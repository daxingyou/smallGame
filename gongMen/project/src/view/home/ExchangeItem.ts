class ExchangeItem extends eui.ItemRenderer
{
	private buy_group:eui.Group;
	private num_group:eui.Group;
	private huan_label:eui.Label;
	private num_label:eui.Label;
	private frame_img:eui.Image;
	public constructor() 
	{
		super();
		this.skinName = "ExchangeItemSkin";
		this.buy_group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	protected dataChanged(): void
	{
		this.num_label.text = "" + this.data.num;
		this.frame_img.source = "img_head_frame_noraml_" + this.data.id + "_png";
		if(this.data.state == 0)
		{
			this.huan_label.visible = false;
			this.num_group.visible = true;
		}else if(this.data.state == 1)
		{
			this.huan_label.visible = true;
			this.num_group.visible = false;
		}
	}
	private touchTap()
	{
		if(this.data.state == 0)
		{
			if(this.data.num <= GameConfig.zhu)
			{
				GameConfig.zhu -= this.data.num;
				this.data.state = 1;
				this.huan_label.visible = true;
				this.num_group.visible = false;
			}else
			{
				UserTips.inst().showTips("当前灵珠数量不足！");
			}
		}else 
		{
			GameConfig.frame = this.data.id;
		}
	}
}