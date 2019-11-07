class TreasureBox extends BaseEuiView
{
	private item1:eui.Image;
	private item2:eui.Image;
	private item3:eui.Image;
	private btn_img:eui.Image;

	private time_label:eui.Label;
	private card_name1:eui.Label;
	private card_name2:eui.Label;
	private card_name3:eui.Label;
	private medalLab:eui.Label;
	private goldLab:eui.Label;

	private item_group:eui.Group;
	private gold_group:eui.Group;

	private card_id:number;
	private getBool:boolean = true;
	private returnBtn:eui.Image;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		eui.Binding.bindProperty(GameApp,["medal"],this.medalLab,"text");
		eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		this.addTouchEvent(this, this.touchTap);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onReturn():void{
		GameMainView.treasureOpen = false;
		ViewManager.inst().close(TreasureBox);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
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
			// this.item_group.visible = false;
			// this.gold_group.visible = false;
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
					egret.localStorage.removeItem("card_id")
					this.getBool = true;
				}
			}
		}else
		{
			// this.item_group.visible = true;
			// this.gold_group.visible = true;
			this.time_label.visible = false;
		}
	}
	/**创建卡牌 */
	private createItem()
	{
		this.card_id = Math.floor(Math.random()*7 + 1);
		if(egret.localStorage.getItem("card_id"))
		{
			this.card_id = parseInt(egret.localStorage.getItem("card_id"));
		}
		this.item1.source = "card_" + this.card_id + "_" + 1 + "_png";
		this.card_name1.text = hszz.CardConfig.cfgs[this.card_id-1][0].name;
		this.item2.source = "card_" + this.card_id + "_" + 2 + "_png";
		this.card_name2.text = hszz.CardConfig.cfgs[this.card_id-1][1].name;
		this.item3.source = "card_" + this.card_id + "_" + 3 + "_png";
		this.card_name3.text = hszz.CardConfig.cfgs[this.card_id-1][2].name;
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
					GameApp.gold += 20;
					UserTips.inst().showTips("获得元宝x"+20);
					// GlobalFun.
					this.getBool = false;
					egret.localStorage.setItem("treasure_bool", "false");
					// this.item_group.visible = false;
					// this.gold_group.visible = false;
					let card1vo:CardVo = hszz.CardConfig.cfgs[this.card_id - 1][0];
					card1vo.ownNum += 1;
					GlobalFun.refreshCardData(card1vo);
					UserTips.inst().showTips(`获得<font color=${card1vo.qualityColor}>${card1vo.name}</font>x1`);
					let card2vo:CardVo = hszz.CardConfig.cfgs[this.card_id - 1][1];;
					card2vo.ownNum += 1;
					GlobalFun.refreshCardData(card2vo);
					UserTips.inst().showTips(`获得<font color=${card2vo.qualityColor}>${card2vo.name}</font>x1`);

					let card3vo:CardVo = hszz.CardConfig.cfgs[this.card_id - 1][2];
					card3vo.ownNum += 1;
					GlobalFun.refreshCardData(card3vo);
					UserTips.inst().showTips(`获得<font color=${card3vo.qualityColor}>${card3vo.name}</font>x1`);
					
					this.createItem();
				}else
				{
					console.log("无法领取");
					UserTips.inst().showTips("十分钟后可再次领取");
				}
				break;
		}
	}
}
ViewManager.inst().reg(TreasureBox,LayerManager.UI_Pop);