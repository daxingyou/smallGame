class PlayerInfoView extends BaseEuiView
{
	private name_label:eui.Label;
	private gold_label: eui.Label;
	private goods_label: eui.Label;
	private medal_label: eui.Label;
	private soldier_label: eui.Label;
	private city_name:eui.Label;
	private fighting_p:eui.BitmapLabel;
	private close_btn:eui.Image;
	private cityName:string[] = [];
	private roleName:string[] = [];
	private bingName:CardAttrVo[] = [];
	private role_list:eui.List;
	private legion_list:eui.List;
	private atkNum:number = 0;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.name_label.text = GameApp.roleInfo.name;
		this.gold_label.text = "元宝:" + GameApp.gold;
		this.goods_label.text = "粮草:" + GameApp.goods;
		this.medal_label.text = "功勋:" + GameApp.medal;
		this.soldier_label.text = "经验:" + GameApp.exp;
		this.init();
		this.addTouchEvent(this.close_btn, this.touchClose);
  	}
	public close():void{
		this.removeTouchEvent(this.close_btn, this.touchClose);
	}
	private init()
	{
		let city:CityInfo[] = GameApp.roleInfo.citys;
		for(let i = 0; i < city.length; i++)
		{
			if(city[i].isMain == true || city[i].isOnly)
			{
				this.cityName.push(city[i].name);
			}
		}
		let card:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.general);
		for(let i = 0; i < card.length; i++)
		{
			this.roleName.push(card[i].name);
			this.atkNum += card[i].atk;
		}

		for(let i = 0; i < GameApp.soldier1Num;i++)
		{
			this.atkNum += GameCfg.bingDate[1].attack;
		}
		for(let i = 0; i < GameApp.soldier2Num;i++)
		{
			this.atkNum += GameCfg.bingDate[2].attack;
		}
		for(let i = 0; i < GameApp.soldier3Num;i++)
		{
			this.atkNum += GameCfg.bingDate[3].attack;
		}
		this.fighting_p.text = "" + this.atkNum;

		for(let i = 0; i < this.cityName.length; i++)
		{
			this.city_name.text += (this.cityName[i] + "  ");
		}
		this.role_list.itemRenderer = RoleName;
		this.role_list.dataProvider = new eui.ArrayCollection(this.roleName);

		let cardBing:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.soldier, false);
		this.bingName = cardBing;
		this.legion_list.itemRenderer = LegionInfo;
		this.legion_list.dataProvider = new eui.ArrayCollection(this.bingName);
	}
	private touchClose()
	{
		ViewManager.inst().close(PlayerInfoView);
	}
}
ViewManager.inst().reg(PlayerInfoView,LayerManager.UI_Main);