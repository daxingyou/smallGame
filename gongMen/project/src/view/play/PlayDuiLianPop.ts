class PlayDuiLianPop extends BaseEuiView{

	private infoBtn:eui.Image;
	private sureBtn:eui.Image;
	private wrongBtn:eui.Image;
	private returnBtn:eui.Image;
	private roleImg:eui.Image;

	private up:eui.Label;
	private down:eui.Label;
	private curDuilianCfg:any;
	private correctAnswer:string = "";
	private wrongCount:number = 0;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.infoBtn,this.onOpenInfo,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		let cfg:any = GlobalFun.getClothCfg();
		this.roleImg.source = cfg.half+"_png";
		this.getCfg();
		
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.wrongBtn,this.onWrong,true);
		MessageManager.inst().addListener("DL_NEXT",this.onNext,this);
		MessageManager.inst().addListener("DL_RESET",this.onReset,this);
		MessageManager.inst().addListener("RETURN",this.onReturn,this);
	}
	private onNext():void{
		this.getCfg();
		this.getRandomAnswer();
	}
	private onReset():void{
		let index:number = (Math.random()*10)>>0;
		if(index >=5 && this.wrongCount >= (Math.random()*5)>>0){
			//显示正确答案
			this.correctAnswer = this.curDuilianCfg.result;
			this.down.text = this.correctAnswer;
		}else{
			this.getRandomAnswer();
		}
	}
	private onSure():void{
		let obj:any = {
			state:"result",
			win:this.correctAnswer == this.curDuilianCfg.result?1:0
		}
		if(!obj.win){
			this.wrongCount += 1;
		}else{
			this.wrongCount = 0;
		}
		ViewManager.inst().open(OverView,[obj]);
	}
	private onWrong():void{
		let obj:any = {
			state:"result",
			win:this.correctAnswer == this.curDuilianCfg.result?0:1
		}
		if(!obj.win){
			this.wrongCount+=1;
		}else{
			this.wrongCount = 0;
		}
		ViewManager.inst().open(OverView,[obj]);
	}
	private getCfg():void{
		let duilianCfg:any[] = DuiLiancfg.cfgs.content;
		let index:number = (Math.random()*duilianCfg.length)>>0;
		this.curDuilianCfg = duilianCfg[index];
		this.up.text = this.curDuilianCfg.display;
		this.getRandomAnswer();
	}
	private getRandomAnswer():void{
		let randomIndex:number = (Math.random()*10)>>0;
		if(randomIndex <= 4){
			let duilianCfg:any[] = DuiLiancfg.cfgs.content;
			let index:number = (Math.random()*duilianCfg.length)>>0;
			this.correctAnswer = duilianCfg[index].result;
			this.down.text = this.correctAnswer;
		}else{
			this.correctAnswer = this.curDuilianCfg.result;
			this.down.text = this.correctAnswer;
		}
		
		
	}
	private onReturn():void{
		ViewManager.inst().close(PlayDuiLianPop);
	}
	private onOpenInfo():void{
		let cnt:string = "猜对联玩法介绍:\n\t\t系统会根据上联随机产生下联,玩家根据上联或者横批猜出当前给出的下联是否与上联对上,\n\t\t如果认为可以对上,则选择绝妙,\n\t\t如果认为对不上,则选择糟糕\n答案正确的话,就可以获取升级经验和金币哦!";
		ViewManager.inst().open(HelpPop,[{cnt:cnt}])
	}
	public close():void{
		this.removeTouchEvent(this.infoBtn,this.onOpenInfo);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.wrongBtn,this.onWrong);
		MessageManager.inst().removeListener("DL_NEXT",this.onNext,this);
		MessageManager.inst().removeListener("DL_RESET",this.onReset,this);
		MessageManager.inst().removeListener("RETURN",this.onReturn,this);
	}
}
ViewManager.inst().reg(PlayDuiLianPop,LayerManager.UI_Pop);