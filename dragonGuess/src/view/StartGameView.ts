class StartGameView extends BaseEuiView{
	private startBtn:eui.Image;
	private help:eui.Image;
	private bg:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.localStorage.clear();
		this.addTouchEvent(this.startBtn,this.onStartClick,true);
		this.addTouchEvent(this.help,this.onHelp,true);
		this.alpha = 0;
		egret.Tween.get(this).to({alpha:1},1000).call(()=>{

			egret.Tween.removeTweens(this);
		},this)
	}
	private onHelp():void{
		ViewManager.ins<ViewManager>().open(HelpView,null,true);
	}
	private onStartClick():void{
		ViewManager.ins<ViewManager>().open(MainGameView,null,true);
	}
	public close():void{
		this.removeTouchEvent(this.startBtn,this.onStartClick);
		this.removeTouchEvent(this.help,this.onHelp);
	}
}
ViewManager.ins<ViewManager>().reg(StartGameView,LayerManager.UI_Main);