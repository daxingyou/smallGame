class ResultView extends BaseEuiView{
	private resultGroup:eui.Group;
	private resultImg:eui.Image;
	private goldLab:eui.Label;
	private level_1:eui.Image;
	private level_2:eui.Image;
	private level_3:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		let goldnum:number = 0;
		if(param[0].state == 1){
			this.resultImg.source = 'win_panel_png';
			goldnum = (Math.random()*100+100)>>0;
		}else{
			this.resultImg.source = "fail_panel_png";
			goldnum = (Math.random()*20+5)>>0;
		}
		this.goldLab.text = goldnum.toString();
		GameApp.gold += goldnum;
		this.resultGroup["autoSize"]();
		this.resultGroup.alpha = 0;
		egret.Tween.get(this.resultGroup).to({alpha:1},500).call(()=>{
			egret.Tween.removeTweens(this.resultGroup);
		},this)
		
		this.addTouchEvent(this.level_1,this.onChallenge,true);
		this.addTouchEvent(this.level_2,this.onChallenge,true);
		this.addTouchEvent(this.level_3,this.onChallenge,true);
	}
	private onChallenge(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.level_1:
				GameApp.chapterLevel = 1;
				MessageManager.inst().dispatch("resetGame");
				this.onReturn();
				break;
			case this.level_2:
				GameApp.chapterLevel = 2;
				MessageManager.inst().dispatch("resetGame");
				this.onReturn();
				break;
			case this.level_3:
				GameApp.chapterLevel = 3;
				MessageManager.inst().dispatch("resetGame");
				this.onReturn();
				break;
		}
	}
	private onReturn():void{
		egret.Tween.get(this.resultGroup).to({alpha:0},500).call(()=>{
			egret.Tween.removeTweens(this.resultGroup);
			ViewManager.inst().close(ResultView);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.level_1,this.onChallenge);
		this.removeTouchEvent(this.level_2,this.onChallenge);
		this.removeTouchEvent(this.level_3,this.onChallenge);
	}
}
ViewManager.inst().reg(ResultView,LayerManager.UI_Pop);