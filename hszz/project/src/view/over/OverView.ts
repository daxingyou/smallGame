class OverView extends BaseEuiView
{
	private huizhang_num:eui.Label;
	private over_bg:eui.Image;
	private over_btn:eui.Image;
	private star_bg0:eui.Image;
	private star_bg1:eui.Image;
	private star_bg2:eui.Image;
	private star_0:eui.Image;
	private star_1:eui.Image;
	private star_2:eui.Image;

	private state:string;
	private hp:number;
	private hp_max:number = 1000;
	public constructor()
	{
		super();
	}
	public open(...param):void{
		this.state = param[0].state;
		this.hp = param[0].hp;
		this.init();
		this.addTouchEvent(this.over_btn, this.touchTap);
	}
	public close():void{
		this.removeTouchEvent(this.over_btn, this.touchTap);
	}
	private init()
	{
		let stars_num:number;
		if(this.hp > this.hp_max * (1/3))
			stars_num = 1;
		else if(this.hp > this.hp_max * (2/3))
			stars_num = 2;
		else if(this.hp > this.hp_max * (3/4))
			stars_num = 3;

		for(let i = 0; i < stars_num; i++)
		{
			this["star_" + i].visible = true;
		}
		
		this.over_bg.source = this.state + "_bg_png";
		switch(this.state)
		{
			case "win":
				for(let i = 0; i < 3; i++)
				{
					this["star_bg" + i].source = "win_stars_0_png";
				}
				this.huizhang_num.text = "徽章x" + 100;
				GameApp.medal += 100;
				break;
			case "failure":
				for(let i = 0; i < 3; i++)
				{
					this["star_bg" + i].source = "failure_stars_png";
				}
				this.huizhang_num.text = "徽章x" + 500;
				GameApp.medal += 500;
				break;
		}
	}
	private touchTap()
	{
		ViewManager.inst().close(BattleView);
		ViewManager.inst().close(OverView);
	}
}
ViewManager.inst().reg(OverView,LayerManager.UI_Pop);