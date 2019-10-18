class GuessPlay extends BaseEuiView{

	private jumpBtn:eui.Image;
	private returnBtn:eui.Image;
	private storyGroup:eui.Group;
	private playGroup:eui.Group;
	private leftRole:eui.Image;
	private rightRole:eui.Image;
	private wordLab:eui.Label;

	private dengmiBtn:eui.Image;
	private duilianBtn:eui.Image;

	
	private storyCfg:any[] = [
		{
			txt:`\t\t好热闹啊，想不到古代的花灯会这么热闹，可惜了，要是带着手机穿越过来就好了，来个大特写，嘿嘿！`,
			right:null,
			left:1
		},
		{
			txt:`你掩嘴微笑，脸上充满笑意！`,
			right:null,
			left:1
		},
		{
			txt:`阿里衮，我们一起出去逛逛吧！`,
			right:null,
			left:1
		},
		{
			txt:`好的，我一定会好好保护你！`,
			right:1,
			left:null
		}
		,
		{
			txt:`走了很久，看到有片区域很热闹，你看了一下，那里正在猜灯谜和猜对联，你也想玩！你慢慢走过去......，脑海中正在想着玩哪种游戏？`,
			right:null,
			left:1
		}
	]
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.jumpBtn,this.onJump,true);
		this.addTouchEvent(this.dengmiBtn,this.onEnterDengmi,true);
		this.addTouchEvent(this.duilianBtn,this.onEnterDuiLian,true);
		let cfg:any = GlobalFun.getClothCfg();
		this.leftRole.source = cfg.half + "_png";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showStory,this);
		this.showStory();
	}
	
	private onEnterDengmi():void{
		ViewManager.inst().open(PlayDengMiPop);
	}
	private onEnterDuiLian():void{
		ViewManager.inst().open(PlayDuiLianPop)
	}
	private showStory():void{
		if(this.storyCfg.length){
			let itemCfg:any = this.storyCfg.shift();
			this.leftRole.visible = itemCfg.left?true:false;
			this.rightRole.visible = itemCfg.right?true:false;
			this.wordLab.text = itemCfg.txt;
		}else{
			this.jumpBtn.visible = false;
			//对话结束
			this.onJump();
		}
	}
	private onJump():void{
		this.jumpBtn.visible = false;
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.showStory,this);
		this.storyGroup.visible = false;
		this.playGroup.visible = true;
	}
	private onReturn():void{
		ViewManager.inst().close(GuessPlay);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.jumpBtn,this.onJump);
		this.removeTouchEvent(this.dengmiBtn,this.onEnterDengmi);
		this.removeTouchEvent(this.duilianBtn,this.onEnterDuiLian);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.showStory,this);
	}
}
ViewManager.inst().reg(GuessPlay,LayerManager.UI_Main);