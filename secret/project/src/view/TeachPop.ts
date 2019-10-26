class TeachPop extends BaseEuiView{

	private circle:eui.Image;
	private timeLab:eui.Label;
	private gameImg:eui.Image;
	private gameBtn:eui.Image;
	private progressBar:eui.Image;
	private proMask:eui.Rect;
	private countDownGroup:eui.Group;
	private countDownLab:eui.Label;
	private count:number = 3;
	private gamecount:number = 5;
	private gameInterval;
	private tolClickCount:number;
	private curClickCount:number = 0;
	private upsource:string;
	private downsource:string;

	private resultGroup:eui.Group;
	private resultLab:eui.Label;
	private resultImg:eui.Image;
	private addLab:eui.Label;
	private _endboo:boolean = false;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.gameBtn.source = param[0].source;
		if(GameApp.progress == 1){
			this._endboo = param[0].endBoo;
			if(param[0].endBoo){
				//好的结果;
				this.upsource = "game_1_0_jpg";
				this.downsource = "game_1_1_jpg";
			}else{
				this.upsource = "game_2_0_jpg";
				this.downsource = "game_2_1_jpg";
			}
		}else{
			//女
			this.upsource = "game_3_0_png";
			this.downsource = "game_3_1_png";
		}
		this.gameImg.source = this.upsource;
		this.gamecount = GameApp.progress == 1?(GameApp.level - 1)*5:(GameApp.womanLevel-1)*5
		this.tolClickCount = GameApp.progress == 1?(GameApp.level - 1)*25:(GameApp.womanLevel - 1)*25;
		this.progressBar.mask = this.proMask;
		let self = this;
		let interval = setInterval(()=>{
			self.count -= 1;
			self.countDownLab.text = self.count.toString();
			if(self.count<= 0){
				clearInterval(interval);
				self.countDownGroup.visible = false;
				this.gameInterval = setInterval(()=>{
					self.circle.rotation += 5;
					self.gamecount -= 1;
					self.timeLab.text = self.gamecount.toString();
					if(self.gamecount <=0){
						//游戏结束；失败
						self.gameFail();
					}
				},1000)
			}
		},1000)
		this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
		this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
		this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancle,this);
		this.gameBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCancle,this);
		this.resultGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
	}
	private onReturn():void{
		this.resultGroup.visible = false;
		ViewManager.inst().close(TeachPop);
		ViewManager.inst().open(GameMainView);
	}
	private onTouchBegin():void{
		this.gameImg.source = this.downsource;
	}
	private onCancle():void{
		this.gameImg.source = this.upsource;
	}
	private onTouchEnd():void{
		this.gameImg.source = this.upsource;

		this.curClickCount += 1;
		let remainCount:number = this.tolClickCount - this.curClickCount;
		if(remainCount <= 0){
			remainCount = 0;
			//游戏结束:成功
			this.gameWin();
		}
		let width:number = remainCount/this.tolClickCount*581;
		this.proMask.width = width;
	}
	private gameWin():void{
		this.gameBtn.touchEnabled = false;
		egret.Tween.removeTweens(this.circle);
		clearInterval(this.gameInterval);
		this.resultGroup.visible = true;
		this.addLab.text = "+3";
		GameApp.health += 3;
		this.resultLab.text = "闯关成功";
		if(GameApp.progress == 1){
			if(this._endboo){
				//好结果
				this.resultImg.source = "result_4_1_jpg";
			}else{
				this.resultImg.source = "result_3_1_jpg";
			}
		}else{
			this.resultImg.source = "result_3_2_jpg";
		}
	}
	private gameFail():void{
		this.gameBtn.touchEnabled = false;
		egret.Tween.removeTweens(this.circle);
		clearInterval(this.gameInterval);
		this.resultGroup.visible = true;
		this.resultLab.text = "闯关失败";
		this.addLab.text = "+0";
		if(GameApp.progress == 1){
			this.resultImg.source = "result_2_1_jpg"
		}else{
			this.resultImg.source = "result_3_2_jpg";
		}
	}
	public close():void{
		this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
		this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
		this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancle,this);
		this.gameBtn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCancle,this);
	}
}
ViewManager.inst().reg(TeachPop,LayerManager.UI_Pop);