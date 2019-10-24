class OverView extends BaseEuiView
{
	private img:eui.Image;
	private over_btn:eui.Image;
	private item0:eui.Image;
	private item1:eui.Image;
	private item2:eui.Image;
	private money:eui.Label;
	
	private item_group:eui.Group;

	private state:string;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.state = param[0];
		this.init();
		this.addTouchEvent(this.over_btn, this.touchTap);
	}
	public close():void{
		
	}
	private init()
	{
		this.over_btn["autoSize"]();
		ViewManager.inst().close(PauseView);
		
		this.img.source = this.state + "_png";
		if(this.state == "win")
		{
			this.item_group.visible = true;
			this.money.text = "x 100"
			GameApp.roleGold += 100;
			this.item0.source = this.chooseItem() + "_png";
			this.item1.source = this.chooseItem() + "_png";
			this.item2.source = this.chooseItem() + "_png";
		}else if(this.state == "failure")
		{
			this.item_group.visible = false;
		}
	}
	private chooseItem():number
	{
		var num = Math.floor(Math.random()*100);
		var item:number = 0;
		if(num < 5)
		{
			item = Math.floor(GameConfig.gq + 10012);
			GlobalFun.addSuiPian(GameConfig.gq, 1);
			GlobalFun.addItemToBag(item, 1);
			return item;
		}else if(num < 15)
		{
			item = Math.floor(Math.random()*3 + 10009);
			GlobalFun.addItemToBag(item, 1);
			return item; 
		}else 
		{
			item = Math.floor(Math.random()*9 + 10000)
			GlobalFun.addItemToBag(item, 1);
			return item;
		}
	}
	private touchTap()
	{
		
		if(GameConfig.fight_state == "adventure")
		{
			 MessageManager.inst().dispatch("GAME_START");
		}else 
		{
			// ViewManager.inst().open(GameMainView);
		}
		ViewManager.inst().close(OverView);
		ViewManager.inst().close(GameView);
	}
}
ViewManager.inst().reg(OverView,LayerManager.UI_Pop);