class OverView extends BaseEuiView
{
	private over_bg:eui.Image;
	private over_btn:eui.Image;
	private over_btn0:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private state:string;
	private card:CardVo[] = [];
	private gold:eui.Label;
	private gold_num:number;
	private win_group:eui.Group;
	private failure_group:eui.Group;
	private shop_btn:eui.Rect;
	private fuben_btn:eui.Rect;
	private boss_btn:eui.Rect;
	public constructor()
	{
		super();
	}
	public open(...param):void{
		this.state = param[0].state;
		this.gold_num = param[0].gold;
		this.init();
		this.addTouchEvent(this, this.touchTap);
	}
	public close():void{
		this.removeTouchEvent(this.over_btn, this.touchTap);
	}
	private init()
	{
		this.over_bg.source = this.state + "_bg_png";
		switch(this.state)
		{
			case "win":
				this.win_group.visible = true;
				this.failure_group.visible = false;
				// GameApp.medal += 100;
				// let gold:number = 40 + (GameApp.curChapter-1)*20 ;
				// GameApp.gold += gold;.
				this.gold.text = "x " + this.gold_num;
				GameApp.gold += this.gold_num;
				for(let i = 0; i < 3; i++)
				{
					this.card.push(hszz.CardConfig.cfgs[Math.floor(Math.random()*7)][Math.floor(Math.random()*4)]);

					let card_1:CardVo = this.card[i];
					card_1.ownNum += 1;
					GlobalFun.refreshCardData(card_1);
				}
				this.list.itemRenderer = OverItem;
				this.list.dataProvider = new eui.ArrayCollection(this.card);
				break;
			case "failure":
				this.win_group.visible = false;
				this.failure_group.visible = true;
				// GameApp.medal += 50;
				// GameApp.gold += 20;
				break;
		}
	}
	private touchTap(evt:CustomEvt)
	{
		switch(evt.target)
		{
			case this.over_btn:
				// ViewManager.inst().close(BattleView);
				MessageManager.inst().dispatch(CustomEvt.GAMEEND,{end:"close"});
				ViewManager.inst().close(OverView);
				break;
			case this.over_btn0:
				// ViewManager.inst().close(BattleView);
				MessageManager.inst().dispatch(CustomEvt.GAMEEND,{end:"close"});
				ViewManager.inst().close(OverView);
				break;
			case this.shop_btn:
				ViewManager.inst().close(OverView);
				ViewManager.inst().open(ShopView);
				break;
			case this.fuben_btn:
				
				break;
			case this.boss_btn:

				break;
		}
	}
}
ViewManager.inst().reg(OverView,LayerManager.UI_Pop);