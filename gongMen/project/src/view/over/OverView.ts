class OverView extends BaseEuiView
{
	private jindu:eui.Label;
	private tiao_mask:eui.Image;
	private tiao:eui.Image;
	private level:eui.Image;
	private gold:eui.Label;
	private close_btn:eui.Button;
	private titleImg:eui.Image;
	private winGroup:eui.Group;
	private returnBtn:eui.Group;
	private nextBtn:eui.Group;

	private failGroup:eui.Group;
	private returnBtn2:eui.Group;
	private resetBtn:eui.Group;

	private rewardgroup:eui.Group;
	private descLab:eui.Label;
	private rewardGold:number = 0;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this.close_btn, this.touchClose);
		if(param[0] && param[0].state == "result"){
			this.close_btn.visible = false;
			this.titleImg.source = param[0].win?"img_tip_top_success_png":"img_tip_top_failure_png";
			this.winGroup.visible = param[0].win?true:false;
			this.failGroup.visible = param[0].win?false:true;
			if(!param[0].win){
				//失败
				this.rewardgroup.visible = false;
				this.descLab.visible = true;
			}
			if(param[0].gold){
				this.rewardGold = param[0].gold
			}
			if(param[0].desc){
				this.descLab.text = param[0].desc;
			}
		}
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.returnBtn2,this.onReturn,true);
		this.addTouchEvent(this.nextBtn,this.onNext,true);
		this.addTouchEvent(this.resetBtn,this.onReset,true);
	}
	private onNext():void{
		this.touchClose();
		MessageManager.inst().dispatch("DL_NEXT");
	}
	private onReset():void{
		this.touchClose();
		MessageManager.inst().dispatch("DL_RESET");
	}
	private onReturn():void{
		this.touchClose();
		MessageManager.inst().dispatch("RETURN")
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.returnBtn2,this.onReturn)
		this.removeTouchEvent(this.nextBtn,this.onNext);
		this.removeTouchEvent(this.resetBtn,this.onReset);
	}
	private touchClose()
	{
		ViewManager.inst().close(OverView);
	}
	private init()
	{
		StoryLineConfig.storyLinefig[GameConfig.gqNum].first = false;
		GameConfig.gqNum++;
		if(GameConfig.gqNum < StoryLineConfig.storyLinefig.length)
			StoryLineConfig.storyLinefig[GameConfig.gqNum].state = "normal";
		this.tiao.mask = this.tiao_mask;
		GameConfig.gqExe+=20;
		if(GameConfig.gqExe>=100)
		{
			GameConfig.level++;
			GameConfig.gqExe -= 100;
		}
		if(GameConfig.level>=11)
		{
			GameConfig.level = 11;
			GameConfig.gqExe = 100;
		}
		this.jindu.text = GameConfig.gqExe + " / 100";
		if(GameConfig.level>=10)
		{
			this.level.source = "img_level_normal_" + GameConfig.level + "_png";
		}else 
		{
			this.level.source = "img_level_normal_0" + GameConfig.level + "_png";
		}
		this.tiao_mask.x = -(this.tiao.width - (GameConfig.gqExe * this.tiao.width / 100));
		this.gold.text = "" + 50;
		GameConfig.gold += 50;
	}
}
ViewManager.inst().reg(OverView,LayerManager.UI_Pop);