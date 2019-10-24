class ShopItem extends eui.ItemRenderer
{
	private tiao:eui.Image;
	private mask_rect:eui.Rect;
	private num_label:eui.Label;
	private card_name:eui.Label;
	private card_num:eui.Label;	
	private gold:eui.Label;
	private card_img:eui.Image;
	private btn_rect:eui.Rect;
	public constructor() 
	{
		super();
		this.skinName = "ShopItemSkin";
		this.btn_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBuy, this);
	}
	protected dataChanged()
	{
		this.card_img.source = "card_" + this.data.id + "_png";
		this.card_name.text = this.data.name;
		this.card_name.textColor = this.data.qualityColor
		this.tiao.mask = this.mask_rect;		
		this.num_label.text = this.data.ownNum + " / " + this.data.level * 100;
		this.mask_rect.width = this.data.ownNum * (this.tiao.width / (this.data.level * 100));
		this.card_num.text = ShopCfg.shopCardAny[this.data.id - 1].num + "";
		this.gold.text = (ShopCfg.shopCardAny[this.data.id - 1].num * this.data.cost) + "";
	}
	private touchBuy()
	{
		if(GameApp.gold >= (ShopCfg.shopCardAny[this.data.id - 1].num * this.data.cost))
		{
			GameApp.gold -= (ShopCfg.shopCardAny[this.data.id - 1].num * this.data.cost);
			let card:CardVo = GlobalFun.getCardDataFromId(this.data.id);
			card.ownNum += ShopCfg.shopCardAny[this.data.id - 1].num;
			GlobalFun.refreshCardData(card);
		}else
		{
			UserTips.inst().showTips("金币不足");
		}
	}
}