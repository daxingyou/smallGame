class HomeView extends BaseEuiView
{
	private juqing:eui.Image;
	private nishang:eui.Image;
	private level_name:eui.Image;
	private gold:eui.Label;
	private miaoshu:eui.Label;
	private zhu:eui.Label;
	private denghui:eui.Image;
	private cloth:eui.Image;
	private xiang:eui.Image;
	private head_img:eui.Image;
	private youwan:eui.Image;
	private roleMc:MovieClip;
	private roleGroup:eui.Group;
	private add_zhu:eui.Image;
	private head_frame:eui.Image;
	private duihuan:eui.Image;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this, this.touchTap);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.roleMc = new MovieClip();
		this.roleMc.x = this.roleGroup.width>>1;
		this.roleMc.y = this.roleGroup.height>>1;
		this.roleGroup.addChild(this.roleMc);
		this.roleMc.playFile(`${EFFECT}role`,-1);
		this.roleGroup.visible = false;
		MessageManager.inst().addListener("RETURN_OUTHOME",this.onBack,this);
		MessageManager.inst().addListener("CLICK_END",this.onClickEnd,this);
	}
	private onClickEnd():void{
		this.roleGroup.visible = false;
	}
	private interVal;
	private onBack():void{
		//从面回来
		let self = this;
		if(GameApp.outTime > 0){
			this.roleGroup.visible = true;
			this.interVal = setInterval(()=>{
				GameApp.outTime += 1;
				if(GameApp.outTime%30 == 0){
					//30s换一个地方游玩
					GameApp.buildIndex += 1;
				}
				if(GameApp.outTime >= 5*60){
					self.roleGroup.visible = false;
					GameApp.outTime = 0;
					GameApp.buildIndex = 0;
					clearInterval(self.interVal);
					UserTips.inst().showTips("游玩结束");
					let gold:number = 0;
					for(let key in GameApp.wayGather){
						gold += GameApp.wayGather[key].gold;
					}
					GameConfig.gold += gold;
					if(gold != 0){
						UserTips.inst().showTips("游玩获得"+gold+"金币");
					}
					GameApp.wayGather = [];
					GameApp.routeIndex = [];
				}
			},1000)
		}
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		MessageManager.inst().removeListener("RETURN_OUTHOME",this.onBack,this);
	}
	private init()
	{

	}
	private update()
	{
		if(GameConfig.level>=10)
		{
			this.level_name.source = "img_level_normal_" + GameConfig.level + "_png";
		}else 
		{
			this.level_name.source = "img_level_normal_0" + GameConfig.level + "_png";
		}
		this.gold.text = "" + GameConfig.gold;
		this.zhu.text = "" + GameConfig.zhu;
		this.miaoshu.text = BagConfig.bagFig[BagConfig.bagID].wellSay;
		this.cloth.source = BagConfig.bagFig[BagConfig.bagID].image + "_png";
		GameApp.clothId = BagConfig.bagFig[BagConfig.bagID].id;
		this.head_img.source = BagConfig.bagFig[BagConfig.bagID].header + "_png";
		this.head_frame.source = "img_head_frame_noraml_" + GameConfig.frame + "_png";
	}
	private onClothChange():void{
		let clothCfg:any = GlobalFun.getClothCfg();

		this.miaoshu.text = clothCfg.wellSay;
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.juqing:
				ViewManager.inst().open(StoryLineView);
				ViewManager.inst().close(HomeView);
				break;
			case this.nishang:
				ViewManager.inst().open(ClothesShopView);
				ViewManager.inst().close(HomeView);
				break;
			case this.denghui:
				if(GameApp.outTime > 0){
					UserTips.inst().showTips("正在游玩中")
					return;
				}
				ViewManager.inst().open(GuessPlay);
				break;
			case this.xiang:
				ViewManager.inst().open(BagView);
				break;
			case this.youwan:
				clearInterval(this.interVal);
				ViewManager.inst().open(OutHomeView);
				break;
			case this.add_zhu:
				ViewManager.inst().open(BuyZhuView);
				break;
			case this.duihuan:
				ViewManager.inst().open(ExchangeView);
				break;
		}
	}
}
ViewManager.inst().reg(HomeView,LayerManager.UI_Main);