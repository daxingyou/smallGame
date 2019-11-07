class CultivateView extends BaseEuiView
{
	private card:eui.Image;
	private btn:eui.Image;
	// private tiao:eui.Image;
	private gold:eui.Label;
	private card_name:eui.Label;
	private num_label:eui.Label;
	private levelLab:eui.Label;
	private hp_num:eui.Label;
	private attack_num:eui.Label;
	private attack_dis:eui.Label;
	private attack_spd:eui.Label;
	private close_btn:eui.Rect;
	// private mask_rect:eui.Rect;
	private card_id:number;
	
	private cardAny:CardVo[] = [];
	private carditem:CardVo;
	private group:eui.Group;
	private descLab:eui.Label;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.card_id = param[0].id;
		this.init();
		this.addTouchEvent(this.btn, this.touchTap);
		this.addTouchEvent(this.close_btn, this.touchClose);
	}
	public close():void{
		this.removeTouchEvent(this.btn, this.touchTap);
		this.removeTouchEvent(this.close_btn, this.touchClose);
	}
	private init()
	{
		this.cardAny = GlobalFun.getCardData();
		// this.tiao.mask = this.mask_rect;
		for(let i = 0; i < this.cardAny.length; i++)
		{
			if(this.card_id == this.cardAny[i].id)
			{
				this.carditem = this.cardAny[i];
			}
		}
		this.card.source = "card_" + this.carditem.id + "_png";
		this.card_name.text = this.carditem.name;
		this.card_name.textColor = this.carditem.qualityColor;
		this.descLab.text = this.carditem.desc;
		this.updateCard();
	}
	private updateCard()
	{
		this.levelLab.text = "" + this.carditem.level;
		this.num_label.text = this.carditem.ownNum + " / 5" ;
		this.gold.text = "" + this.carditem.level * 200;
		this.hp_num.text = "" + (this.carditem.hp );
		this.attack_num.text = "" + (this.carditem.atk);
		this.attack_dis.text = "" + this.carditem.atkDis;
		this.attack_spd.text = "" + this.carditem.atkSpd;
		// if(this.carditem.ownNum >= 5){
		// 	this.mask_rect.width = 242;
		// }else{
		// 	this.mask_rect.width = this.carditem.ownNum/(5)*242
		// }
	}
	private touchTap()
	{
		if(GameApp.gold >= this.carditem.level * 200)
		{
			if(this.carditem.ownNum >= 5)
			{
				this.carditem.ownNum -= 5;
				GameApp.gold -= this.carditem.level * 200;
				this.carditem.level++;
				this.carditem.hp += GlobalFun.getAttrAddValue(this.carditem.id,"hp");
				this.carditem.atk += GlobalFun.getAttrAddValue(this.carditem.id,"atk");
				UserTips.inst().showTips("升级成功");
				GlobalFun.refreshCardData(this.carditem);
				this.updateCard();
			}else
			{
				UserTips.inst().showTips("卡牌碎片不足");
			}
		}else
		{
			UserTips.inst().showTips("元宝不足");
		}
	}
	private touchClose()
	{
		ViewManager.inst().close(CultivateView);
	}
}
ViewManager.inst().reg(CultivateView,LayerManager.UI_Pop);