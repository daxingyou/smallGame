/**游戏 */
class GameView extends BaseEuiView
{
	private bg_img:eui.Image;
	private img:eui.Image;
	private back_img:eui.Image;
	private auto_btn:eui.Image;
	private jump_img:eui.Image;
	private role_name:eui.Label;
	private role_dialogue:eui.Label;
	private touchBool:boolean = true;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.updateDialogue();
		this.addTouchEvent(this, this.touchTap);
	}
	public close():void{
		
	}
	public updateDialogue()
	{
		this.bg_img.source = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][0] + "_jpg";
		if(GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] == "lead")
		{
			this.img.source = BagConfig.bagFig[BagConfig.bagID].half + "_png";
		}else if(GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] != "")
		{
			this.img.source = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] + "_png";
		}else if(GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3] == "")
		{
			this.img.source = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][3];
		}
		if(GameConfig[GameConfig.gqConfig][GameConfig.gqMin][2] != 0)
			this.img.x = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][2] + 100;
		this.role_name.text = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][8];
		if(this.role_name.text == "")
		{
			this.role_name.text = "旁白"
		}
		this.role_dialogue.text = GameConfig[GameConfig.gqConfig][GameConfig.gqMin][9];

		GameConfig.gqMin++;
		if(GameConfig.gqMin > GameConfig.gqMax)
		{
			egret.Tween.removeTweens(this);
			ViewManager.inst().close(GameView);
			if(StoryLineConfig.storyLinefig[GameConfig.gqNum].first == true)
				ViewManager.inst().open(OverView);
			ViewManager.inst().open(StoryLineView);
		}
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.back_img:
				ViewManager.inst().close(GameView);
				ViewManager.inst().open(StoryLineView);
				break;
			case this.auto_btn:
				if(this.auto_btn.source == "btn_syn_auto_next_png")
				{
					this.auto_btn.source = "btn_syn_auto_close_png";
					this.touchBool = false;
					egret.Tween.get(this, {loop:true})
					.wait(1500)
					.call(this.updateDialogue, this);
				}else if(this.auto_btn.source == "btn_syn_auto_close_png")
				{
					egret.Tween.removeTweens(this);
					this.auto_btn.source = "btn_syn_auto_next_png";
					this.touchBool = true;
				}
				break;
			case this.jump_img:
				GameConfig.gqMin = GameConfig.gqMax;
				this.updateDialogue();
				break;
			default:
				if(this.touchBool)
					this.updateDialogue();
				break;
		}
	}
}
ViewManager.inst().reg(GameView,LayerManager.UI_Pop);