class ArchiveView extends BaseEuiView
{
	private medalLab:eui.Label;
	private goldLab:eui.Label;
	private have_btn:eui.Button;
	private not_btn:eui.Button;
	private list:eui.List;
	private scroller:eui.Scroller;
	private haveCard:CardVo[] = [];
	private notCard:CardVo[] = [];
	private returnBtn:eui.Image;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.have_btn["autoSize"]();
		this.not_btn["autoSize"]();
		eui.Binding.bindProperty(GameApp,["medal"],this.medalLab,"text");
		eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		this.addTouchEvent(this, this.touchTap);
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
	}
	private init()
	{
		this.haveCard = GlobalFun.getCardData();
		for(let i = 0; i < 7; i++)
		{
			for(let j = 0; j < 4; j++)
			{
				let card:CardVo = hszz.CardConfig.cfgs[i][j];
				let cardVis = false;
				for(let k = 0; k < this.haveCard.length; k++)
				{
					if(this.haveCard[k].id == card.id)
					{
						cardVis = true;
					}
				}
				if(cardVis == false)
				{
					card.ownNum = 0;
					this.notCard.push(card);
				}
			}
		}
		this.have_btn.currentState = "down";
		this.not_btn.currentState = "up";
		this.list.itemRenderer = ArchiveItem;
		this.list.dataProvider = new eui.ArrayCollection(this.haveCard);
	}
	private touchTap(evt:CustomEvt)
	{
		switch(evt.target)
		{
			case this.have_btn:
				this.have_btn.currentState = "down";
				this.not_btn.currentState = "up";
				this.list.dataProvider = new eui.ArrayCollection(this.haveCard);
				break;
			case this.not_btn:
				this.have_btn.currentState = "up";
				this.not_btn.currentState = "down";
				this.list.dataProvider = new eui.ArrayCollection(this.notCard);
				break;
			case this.returnBtn:
				ViewManager.inst().close(ArchiveView);
				break;
		}
	}
}
ViewManager.inst().reg(ArchiveView,LayerManager.UI_Main);