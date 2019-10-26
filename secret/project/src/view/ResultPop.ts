class ResultPop extends BaseEuiView{

	private img:eui.Image;
	private resultTxt:eui.Label;
	private isEnd:boolean = false;
	private title:eui.Label;

	private continueBtn:eui.Image;
	private nextLevelBtn:eui.Image;
	private gameBtn:eui.Image;
	private oper:number;
	private heartGroup:eui.Group;
	private answerBtn:eui.Image;
	private returnBtn:eui.Image;
	private _endBoo:boolean = false;

	public constructor() {
		super();
	}
	public open(...param):void{
		this.skin.currentState = param[0].state;
		if(param[0].state == "win"){
			if(param[0].end){
				this.isEnd = true;
				//已经结束了
				this.title.text = "[结局]";
				this.continueBtn.visible = false;
				this.gameBtn.visible = true;
				this.nextLevelBtn.visible = true;
				this.heartGroup.visible = true;
				if(GameApp.progress == 1){
					//男
					this._endBoo = param[0].endBoo;
					if(param[0].endBoo){
						//好的结果
						this.img.source = "result_4_1_jpg";
						this.gameBtn.source = "common_btn_png"
						this.oper = 1;
						
					}else{
						this.img.source = "result_3_1_jpg";
						this.gameBtn.source = "btn_teach_1_png"
						this.oper = 0;
					}
				}else{
					this.img.source = "result_3_2_jpg";
					this.gameBtn.source = "btn_teach_2_png";
					this.oper = 0;
				}
				
			}else{
				this.heartGroup.visible = false;
				this.title.text = "[真相]"
				this.isEnd = false;
				if(GameApp.progress == 1){
					let index:number = (Math.random()*2)>>0;
					this.img.source = `result_${index+1}_1_jpg`;
				}else{
					this.img.source = "result_1_2_jpg";
				}
				this.continueBtn.visible = true;
				this.gameBtn.visible = false;
				this.nextLevelBtn.visible = false;
			}
			this.resultTxt.text = param[0].cnt;
		}else{

		}
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.continueBtn:
				ViewManager.inst().close(ResultPop);
				MessageManager.inst().dispatch("endOneChapter");
				break;
			case this.nextLevelBtn:
				ViewManager.inst().close(ResultPop);
				ViewManager.inst().close(StoryView);
				ViewManager.inst().close(GameMainView);
				ViewManager.inst().open(GameMainView);
				GameApp.health += 1;
				break;
			case this.gameBtn:
				ViewManager.inst().open(TeachPop,[{source:this.gameBtn.source,endBoo:this._endBoo}]);
				ViewManager.inst().close(ResultPop);
				ViewManager.inst().close(StoryView);
				ViewManager.inst().close(GameMainView);
				break;
			case this.returnBtn:
				ViewManager.inst().close(ResultPop);
				break;
			case this.answerBtn:
				ViewManager.inst().close(ResultPop);
				MessageManager.inst().dispatch("openAnswer");
				break;
		}
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(ResultPop,LayerManager.UI_Pop)