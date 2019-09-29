class BagTip extends BaseEuiView
{
	private card_img:eui.Image;
	private card_sell:eui.Image;
	private liu_img:eui.Image;
	private guan_img:eui.Image;
	private zhang_img:eui.Image;
	private xuan_img:eui.Image;

	private property_0:eui.Label;
	private property_1:eui.Label;
	private tip:eui.Label;
	private sell_num:eui.Label;

	private zhuang_btn:eui.Button;
	private sell_btn:eui.Button;
	private close_btn:eui.Button;
	private confirm_btn:eui.Button;

	private group0:eui.Group;
	private group1:eui.Group;
	private group2:eui.Group;

	private data:any;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.data = param[0];
		this.init();
		this.addTouchEvent(this.zhuang_btn, this.touchZhuang);
		this.addTouchEvent(this.sell_btn, this.touchSell);
		this.addTouchEvent(this.close_btn, this.close);
		this.addTouchEvent(this.confirm_btn, this.confirm);
		this.addTouchEvent(this.liu_img, this.touchLiu);
		this.addTouchEvent(this.guan_img, this.touchGuan);
		this.addTouchEvent(this.zhang_img, this.touchZhang);
	}
	private init()
	{
		this.card_img.source = this.data.instId + "_jpg";
		this.card_sell.source = this.data.instId + "_jpg";
		this.sell_num.text = "出售价 " + Math.floor(this.data.cost / 2) + "两";
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
			this.tip.text = "注释：" + this.data.tip;
			this.zhuang_btn.visible = false;
		}
	}
	private confirm()
	{
		GameApp.inst().gold += Math.floor(this.data.cost / 2);
		if(ItemCfg.bagCfg.indexOf(this.data)>=0)
		{
			ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(this.data)] = null;
			ViewManager.inst().close(BagTip);
			MessageManager.inst().dispatch("BAG_UPDATE");
		}
	}
	private touchLiu()
	{
		this.xuan_img.y = this.liu_img.y;
		ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(this.data)] = GlobalFun.changeEquip(this.data, 0);
		MessageManager.inst().dispatch("BAG_UPDATE");
		// MessageManager.inst().dispatch("HUAN_ZHUANG", this.data);
		// MessageManager.inst().dispatch("ZHUANG_BEI", {data:this.data, roleID:0});
		
		ViewManager.inst().close(BagTip);
	}
	private touchGuan()
	{
		this.xuan_img.y = this.guan_img.y;
		ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(this.data)] = GlobalFun.changeEquip(this.data, 1);
		MessageManager.inst().dispatch("BAG_UPDATE");
		// MessageManager.inst().dispatch("HUAN_ZHUANG", this.data);
		// MessageManager.inst().dispatch("ZHUANG_BEI", {data:this.data, roleID:1} );
		
		ViewManager.inst().close(BagTip);
	}
	private touchZhang()
	{
		this.xuan_img.y = this.zhang_img.y;
		ItemCfg.bagCfg[ItemCfg.bagCfg.indexOf(this.data)] = GlobalFun.changeEquip(this.data, 2);
		MessageManager.inst().dispatch("BAG_UPDATE");
		// MessageManager.inst().dispatch("HUAN_ZHUANG", this.data);
		// MessageManager.inst().dispatch("ZHUANG_BEI", {data:this.data, roleID:2});
		
		ViewManager.inst().close(BagTip);
	}
	public close():void
	{
		if(this.group1.visible)
		{
			this.group1.visible = false;
			this.group0.visible = true;
		}else if(this.group2.visible)
		{
			this.group2.visible = false;
		}else 
		{
			ViewManager.inst().close(BagTip);
		}
	}
	private touchZhuang()
	{
		this.group2.visible = true;
	}
	private touchSell()
	{
		this.group0.visible = false;
		this.group1.visible = true;
	}
}
ViewManager.inst().reg(BagTip,LayerManager.UI_Pop);