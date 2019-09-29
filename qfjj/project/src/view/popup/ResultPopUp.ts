class ResultPopUp extends BaseEuiView{

	private img:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.img.scaleX = this.img.scaleY = 0;
		egret.Tween.get(this.img).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.img);
		},this)
		if(param[0].state == 1){
			this.img.source = "win_png";
		}else{
			this.img.source = "fail_png";
		}
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap():void{
		egret.Tween.get(this.img).to({scaleX:0,scaleY:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.img);
			ViewManager.inst().close(ResultPopUp);
			ViewManager.inst().close(BattleView);
			ViewManager.inst().open(ChapterView);
		},this)
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(ResultPopUp,LayerManager.UI_Pop);