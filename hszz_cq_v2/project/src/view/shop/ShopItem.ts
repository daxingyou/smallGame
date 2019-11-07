class ShopItem extends eui.ItemRenderer
{
	// private tiao:eui.Image;
	// private mask_rect:eui.Rect;
	private num_label:eui.Label;
	private card_name:eui.Label;
	private card_num:eui.Label;	
	private gold:eui.Label;
	private card_img:eui.Image;
	private btn_rect:eui.Group;
	public constructor() 
	{
		super();
		this.skinName = "ShopItemSkin";
		this.btn_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchBuy, this);
	}
	protected dataChanged()
	{
		this.card_img.source = "card_" + this.data.cardId + "_" + this.data.level + "_png";
		this.card_name.text = this.data.name;
		this.card_name.textColor = this.data.qualityColor;
		this.card_num.text = "数量:" + ShopCfg.shopCardAny[ShopCfg.cardAny.indexOf(this.data)].num;
		this.gold.text = (ShopCfg.shopCardAny[ShopCfg.cardAny.indexOf(this.data)].num * this.data.cost) + "";
	}
	private touchBuy()
	{
		if(GameApp.gold >= parseInt(this.gold.text))
		{
			GameApp.gold -= parseInt(this.gold.text);

			let card:CardVo = this.data;
			card.ownNum += ShopCfg.shopCardAny[ShopCfg.cardAny.indexOf(this.data)].num;
			GlobalFun.refreshCardData(card);
			UserTips.inst().showTips(`获得<font color=${card.qualityColor}>${card.name}</font>${card.ownNum}`);
			// card.ownNum += ShopCfg.shopCardAny[this.data.id - 1001].num;
			// GlobalFun.refreshCardData(card);
		}else
		{
			UserTips.inst().showTips("元宝不足");
		}
	}
}