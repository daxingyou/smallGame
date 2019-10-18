class BagView extends BaseEuiView
{
	private jiang_group:eui.Group;

	private jiang_name:eui.Label;
	private jiang_gold:eui.Label;
	private jiang_exp:eui.Label;
	private jiang_you:eui.Label;
	private clothes_name:eui.Label;

	private back_img:eui.Image;
	private clothes_img:eui.Image;
	private left_btn:eui.Image;
	private right_btn:eui.Image;
	private jiang_btn:eui.Image;

	private huan:eui.Button;
	private clothes_id:number = 0;
	public constructor() 
	{
		super();
		this.addTouchEvent(this, this.touchTap);
		this.addTouchEvent(this.jiang_group, this.closeJiang);
	}
	public open(...param):void{
		this.init();
	}
	public close():void{
		
	}
	private init()
	{
		if(BagConfig.bagFig.length > 1)
		{
			this.left_btn.visible = false;
			this.right_btn.visible = true;
		}
		this.clothes_img.source = BagConfig.bagFig[this.clothes_id].image + "_png";
		this.clothes_name.text = BagConfig.bagFig[this.clothes_id].name;
	}
	private update()
	{
		if(this.clothes_id <= 0)
		{
			this.clothes_id = 0;
			this.left_btn.visible = false;
		}else 
		{
			this.left_btn.visible = true;
		}

		if(this.clothes_id >= BagConfig.bagFig.length - 1)
		{
			this.clothes_id = BagConfig.bagFig.length - 1;
			this.right_btn.visible = false;
		}else 
		{
			this.right_btn.visible = true;
		}

		this.clothes_img.source = BagConfig.bagFig[this.clothes_id].image + "_png";
		this.clothes_name.text = BagConfig.bagFig[this.clothes_id].name;
	}
	private closeJiang()
	{
		this.jiang_group.visible = false;
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.back_img:
				ViewManager.inst().close(BagView);
				break;
			case this.jiang_btn:
				this.jiang_group.visible = true;
				this.jiang_name.text = "名称：" + BagConfig.bagFig[this.clothes_id].name;
				this.jiang_gold.text = "金币 + %" + BagConfig.bagFig[this.clothes_id].encoin;
				this.jiang_exp.text = "经验 + %" + BagConfig.bagFig[this.clothes_id].enjingyan;
				this.jiang_you.text = "游玩 + %" + BagConfig.bagFig[this.clothes_id].enyouwan;
				break;
			case this.left_btn:
				this.clothes_id--;
				this.update();
				break;
			case this.right_btn:
				this.clothes_id++;
				this.update();
				break;
			case this.huan:
				BagConfig.bagID = this.clothes_id;
				ViewManager.inst().close(BagView);
				break;
		}
	}
}
ViewManager.inst().reg(BagView,LayerManager.UI_Main);