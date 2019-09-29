class ShopBuy extends BaseEuiView
{
	private property_0:eui.Label;
	private property_1:eui.Label;
	private remain_bag:eui.Label;
	private remain_money:eui.Label;
	private money:eui.Label;
	private tip:eui.Label;
	private buy_num:eui.Label;
	private no_tip:eui.Label;

	private card_img:eui.Image;

	private close_btn:eui.Button;
	private close_btn0:eui.Button;
	private down_btn:eui.Button;
	private up_btn:eui.Button;
	private buy_btn:eui.Button;
	private confirm_btn:eui.Button;

	private item_num:number = 1;

	private tip_group:eui.Group;

	private data:any;

	private content:eui.Group;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.data = param[0];
		this.init();
		// this.alpha=0;
		// this.scaleX = this.scaleY = 0;
		// egret.Tween.get(this).to({scaleX:1,scaleY:1,alpha:1},300).call(()=>{
		// 	egret.Tween.removeTweens(this);
		
		// },this)
		this.addTouchEvent(this.down_btn, this.touchDown);
		this.addTouchEvent(this.up_btn, this.touchUp);
		this.addTouchEvent(this.buy_btn, this.touchBuy);
		this.addTouchEvent(this.close_btn, this.onClose);
		this.addTouchEvent(this.close_btn0, this.onClose);
		this.addTouchEvent(this.confirm_btn, this.touchConfirm);
		this.content.x = (StageUtils.inst().getWidth()>>1) - 266/2;
		this.content.y = (StageUtils.inst().getHeight()>>1) - 378/2;

		if(GameApp.guilding){
			if(GameApp.guideView){
				if(this.parent){
					this.parent.swapChildren(GameApp.guideView,this);
				}
				GameApp.guideView.nextStep({id:"1_4",comObj:this.buy_btn,width:104,height:38})
			}
		}
		
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_SHOP_BUY,this.onShopBuy,this);
	}
	private onShopBuy():void{
		this.touchBuy();
		ViewManager.inst().open(ShopView);
	}
	private onClose():void{
		// egret.Tween.get(this).to({scaleX:0,scaleY:0,alpha:0},300).call(()=>{
		// 	egret.Tween.removeTweens(this);
			ViewManager.inst().close(ShopBuy);
			// this.close();
		// },this)
	}
	public close():void{
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_SHOP_BUY,this.onShopBuy,this);
		this.removeTouchEvent(this.down_btn, this.touchDown);
		this.removeTouchEvent(this.up_btn, this.touchUp);
		this.removeTouchEvent(this.buy_btn, this.touchBuy);
		this.removeTouchEvent(this.close_btn, this.onClose);
		this.removeTouchEvent(this.close_btn0, this.onClose);
		this.removeTouchEvent(this.confirm_btn, this.touchConfirm)
	}
	private init()
	{
		this.bag_num();
		this.remain_bag.text = "包裹剩余空间：" + GameApp.inst().remainBag;
		this.remain_money.text = "剩余银两：" + GameApp.inst().gold;
		this.card_img.source = this.data.instId + "_jpg";
		this.money.text = "售价 " + this.data.cost + "两";
		this.tip.visible = false;
		this.buy_num.text = "" + this.item_num;
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
			this.tip.visible = true;
			this.tip.text = this.data.tip;
		}
	}
	private touchDown()
	{
		if(this.item_num > 1)
			this.item_num--;
		this.buy_num.text = "" + this.item_num;
		this.money.text = "售价 " + (this.data.cost * this.item_num) + "两";
	}
	private touchUp()
	{
		this.item_num++;
		this.buy_num.text = "" + this.item_num;
		this.money.text = "售价 " + (this.data.cost * this.item_num) + "两";
	}
	private touchBuy()
	{
		if(GameApp.inst().remainBag < this.item_num)
		{
			this.tip_group.visible = true;
			this.no_tip.text = "对不起，背包空间不足";
			return;
		}
		if(GameApp.inst().gold < (this.data.cost * this.item_num))
		{
			this.tip_group.visible = true;
			this.no_tip.text = "对不起，剩余银两不足"
		}else if(GameApp.inst().gold >= (this.data.cost * this.item_num))
		{
			GameApp.inst().gold -= (this.data.cost * this.item_num);
			/**购买成功 */
			for(let i = 0; i < this.item_num; i++)
			{
				for(let i = 0; i < ItemCfg.bagCfg.length; i++)
				{
					if(ItemCfg.bagCfg[i] == null)
					{
						ItemCfg.bagCfg[i] = this.data;
						GlobalFun.setBagList();
						break;
					}
				}
			}
			// this.onClose();
			this.tip_group.visible = true;
			this.confirm_btn.visible = false;
			this.no_tip.text = "购买成功";
			this.bag_num();
			this.remain_bag.text = "包裹剩余空间：" + GameApp.inst().remainBag;
			this.remain_money.text = "剩余银两：" + GameApp.inst().gold;
			egret.Tween.get(this)
			.wait(200)
			.call(()=>{
				this.onClose();
			})
		}
	}
	private bag_num()
	{
		GameApp.inst().remainBag = 0;
		for(let i = 0; i < ItemCfg.bagCfg.length; i++)
		{
			if(ItemCfg.bagCfg[i] == null)
			{
				GameApp.inst().remainBag++;
			}
		}
	}
	private touchConfirm()
	{
		this.tip_group.visible = false;
	}
}
ViewManager.inst().reg(ShopBuy,LayerManager.UI_Pop);