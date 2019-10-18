class ClothesShopView extends BaseEuiView
{
	private gold:eui.Label;
	private clothes_name:eui.Label;
	private buy_glod:eui.Label;
	private jiang_name:eui.Label;
	private jiang_gold:eui.Label;
	private jiang_exp:eui.Label;
	private jiang_you:eui.Label;

	private back_img:eui.Image;
	private clothes_img:eui.Image;
	private left_btn:eui.Image;
	private right_btn:eui.Image;
	private buy_btn:eui.Image;
	private jiang_btn:eui.Image;
	
	private yongyou:eui.Button;
	private jiang_group:eui.Group;
	private clothes_id:number = 0;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this, this.touchTap)
		this.addTouchEvent(this.jiang_group, this.closeJiang);
	}
	public close():void{
		
	}
	private init()
	{
		this.gold.text = GameConfig.gold + "";
		this.update();
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

		if(this.clothes_id >= 8)
		{
			this.clothes_id = 8;
			this.right_btn.visible = false;
		}else 
		{
			this.right_btn.visible = true;
		}
		if(ClothesConfig.clothesFig[this.clothes_id].state == 1)
		{
			this.yongyou.visible = true;
		}else
		{
			this.yongyou.visible = false;
		}

		this.clothes_img.source = ClothesConfig.clothesFig[this.clothes_id].image + "_png";
		this.buy_glod.text = ClothesConfig.clothesFig[this.clothes_id].bycoin;
		this.clothes_name.text = ClothesConfig.clothesFig[this.clothes_id].name;
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
				ViewManager.inst().close(ClothesShopView);
				ViewManager.inst().open(HomeView);
				break;
			case this.left_btn:
				this.clothes_id--;
				this.update();
				break;
			case this.right_btn:
				this.clothes_id++;
				this.update();
				break;
			case this.buy_btn:
				if(ClothesConfig.clothesFig[this.clothes_id].bycoin <= GameConfig.gold)
				{
					/**购买成功 */
					GameConfig.gold -= ClothesConfig.clothesFig[this.clothes_id].bycoin;
					this.yongyou.visible = true;
					ClothesConfig.clothesFig[this.clothes_id].state = 1;
					BagConfig.bagFig.push(ClothesConfig.clothesFig[this.clothes_id]);
					this.gold.text = "" + GameConfig.gold;
				}else 
				{
					/**金币不足 */
					UserTips.inst().showTips("金币不足");
				}
				break;
			case this.jiang_btn:
				this.jiang_group.visible = true;
				this.jiang_name.text = "名称：" + ClothesConfig.clothesFig[this.clothes_id].name;
				this.jiang_gold.text = "金币 + %" + ClothesConfig.clothesFig[this.clothes_id].encoin;
				this.jiang_exp.text = "经验 + %" + ClothesConfig.clothesFig[this.clothes_id].enjingyan;
				this.jiang_you.text = "游玩 + %" + ClothesConfig.clothesFig[this.clothes_id].enyouwan;
				break;
		}
	}
}
ViewManager.inst().reg(ClothesShopView,LayerManager.UI_Main);