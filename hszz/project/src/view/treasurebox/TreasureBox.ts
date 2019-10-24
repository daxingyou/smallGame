class TreasureBox extends BaseEuiView
{
	private item1:eui.Image;
	private item2:eui.Image;
	private item3:eui.Image;
	private btn_img:eui.Image;

	private time_label:eui.Label;

	private item_group:eui.Group;
	private gold_group:eui.Group;

	private card_id:number;
	private getBool:boolean = true;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this, this.touchTap);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private init()
	{
		if(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME))
		{
			TreasureCfg.getTime = parseInt(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME));
		}
		if(egret.localStorage.getItem("treasure_bool"))
		{
			this.getBool = false;
		}else
		{
			this.getBool = true;
			this.createItem();
		}
	}
	private update()
	{
		if(!this.getBool)
		{	
			this.item_group.visible = false;
			this.gold_group.visible = false;
			this.time_label.visible = true;
			let time = new Date();
			if(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME))
			{
				let time_1 = parseInt(egret.localStorage.getItem(LocalStorageEnum.BOX_TIME));
				if(time.getTime() - time_1 <= 600000)
				{
					this.time_label.text = DateUtils.getFormatBySecond((600000 - (time.getTime() - time_1)) / 1000, DateUtils.TIME_FORMAT_3);
				}else
				{
					egret.localStorage.removeItem("treasure_bool");
					this.getBool = true;
					this.createItem();
				}
			}
		}else
		{
			this.item_group.visible = true;
			this.gold_group.visible = true;
			this.time_label.visible = false;
		}
	}
	/**创建卡牌 */
	private createItem()
	{
		this.card_id = hszz.CardConfig.cfgs[Math.floor(Math.random()*6 + 1)].id;
		if(egret.localStorage.getItem("card_id"))
		{
			this.card_id = parseInt(egret.localStorage.getItem("card_id"));
		}
		this.item1.source = "box_card_" + this.card_id + "_png";
		this.item2.source = "box_card_" + (this.card_id + 1) + "_png";
		this.item3.source = "box_card_" + (this.card_id + 2) + "_png";
		egret.localStorage.setItem("card_id", this.card_id + "");
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.btn_img:
				if(this.getBool)
				{
					let time = new Date();
					TreasureCfg.getTime = time.getTime();
					this.time_label.visible = true;
					egret.localStorage.setItem(LocalStorageEnum.BOX_TIME, TreasureCfg.getTime + "");
					this.time_label.text = DateUtils.getFormatBySecond(600000 / 1000, DateUtils.TIME_FORMAT_3);
					egret.localStorage.removeItem("card_id");
					console.log("领取成功");
					GameApp.gold += 200;
					// GlobalFun.
					this.getBool = false;
					egret.localStorage.setItem("treasure_bool", "false");
					this.item_group.visible = false;
					this.gold_group.visible = false;
					GlobalFun.refreshCardData(GlobalFun.getCardDataFromId(this.card_id));
					GlobalFun.refreshCardData(GlobalFun.getCardDataFromId(this.card_id + 1));
					GlobalFun.refreshCardData(GlobalFun.getCardDataFromId(this.card_id + 2));
				}else
				{
					console.log("无法领取");
					UserTips.inst().showTips("条件不足，无法领取");
				}
				break;
		}
	}
}
ViewManager.inst().reg(TreasureBox,LayerManager.UI_Pop);