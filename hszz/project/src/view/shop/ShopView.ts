class ShopView extends BaseEuiView
{
	private list:eui.List;
	private scroller:eui.Scroller;
	private card_id:number = 0;
	private time_label:eui.Label;
	private minute:number;
	private seconds:number;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	public close():void{
		egret.Tween.removeTweens(this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private init()
	{
		if(ShopCfg.shopFirst)
		{
			this.updateCard();
			ShopCfg.shopFirst = false;
		}
		let time_num = new Date();
		ShopCfg.shopFirst_open = time_num.getTime();
		if(ShopCfg.shopFirst_close == null)
		{
			this.minute = 10;
			this.seconds = 0;
		}else
		{
			let time_cha = ShopCfg.shopFirst_open - ShopCfg.shopFirst_close;
			if(time_cha >= 600000)
			{
				egret.localStorage.removeItem(LocalStorageEnum.SHOP_ROLE);
				egret.localStorage.removeItem(LocalStorageEnum.SHOP_ROLE_NUM);
				egret.localStorage.removeItem("SHOP_TIME");
				ShopCfg.cardAny = [];
				this.updateCard();
				this.minute = 10;
				this.seconds = 0;
			}else
			{
				this.seconds = 60 - Math.floor((time_cha % 60000 ) / 1000);
				this.minute = 9 - Math.floor(time_cha / 60000);
			}
		}
		this.updateTime(this.minute, this.seconds);
		this.list.itemRenderer = ShopItem;
		this.list.dataProvider = new eui.ArrayCollection(ShopCfg.cardAny);
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
	}
	private updateTime(m:number, s:number)
	{
		egret.Tween.get(this, {loop:true})
        .wait(1000)
        .call(()=>{
            if(s != 0)
            {
                s--;
                this.seconds = s;
            }else if(m != 0)
            {
                m--;
                s = 59;
                this.seconds = s;
                this.minute = m;
            }else
            {
                egret.Tween.removeTweens(this);
				this.init();
            }
        });
	}
	private update()
	{
		if(this.minute<10 && this.seconds>=10)
			this.time_label.text = "0" + this.minute + " : " + this.seconds;
		else if(this.minute>=10 && this.seconds<10)
			this.time_label.text = "" + this.minute + " : 0" + this.seconds;
		else if(this.minute<10 && this.seconds<10)
			this.time_label.text = "0" + this.minute + " : 0" + this.seconds;
	}
	private updateCard()
	{
		if(egret.localStorage.getItem("SHOP_TIME"))
		{
			ShopCfg.shopFirst_close = parseInt(egret.localStorage.getItem("SHOP_TIME"));
		}else
		{
			let time_num = new Date();
			ShopCfg.shopFirst_close = time_num.getTime();
			egret.localStorage.setItem("SHOP_TIME", ShopCfg.shopFirst_close + "");
		}
		ShopCfg.cardData = GlobalFun.getCardData();
		this.card_id = ShopCfg.cardData[Math.floor(Math.random() * (ShopCfg.cardData.length - 4))].id;
		if(!egret.localStorage.getItem(LocalStorageEnum.SHOP_ROLE))
		{
			for(let i = 0; i < ShopCfg.cardData.length; i++)
			{
				if(ShopCfg.cardData[i].id == this.card_id || ShopCfg.cardData[i].id == (this.card_id + 1) || 
				ShopCfg.cardData[i].id == (this.card_id + 2) || ShopCfg.cardData[i].id == (this.card_id + 3))
				{
					ShopCfg.cardAny.push(ShopCfg.cardData[i]);
				}
			}
			for(let j = 0; j < ShopCfg.shopCardAny.length; j++)
			{
				ShopCfg.shopCardAny[j].num = Math.floor(Math.random()*5 + 5);
			}
			egret.localStorage.setItem(LocalStorageEnum.SHOP_ROLE_NUM, JSON.stringify(ShopCfg.shopCardAny));
			egret.localStorage.setItem(LocalStorageEnum.SHOP_ROLE, JSON.stringify(ShopCfg.cardAny));
		}else
		{
			ShopCfg.shopCardAny = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.SHOP_ROLE_NUM));
			ShopCfg.cardAny = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.SHOP_ROLE));
		}
		
	}
}
ViewManager.inst().reg(ShopView,LayerManager.UI_Pop);