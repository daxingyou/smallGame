class HelpPopUpView extends BaseEuiView{

	private returnBtn:eui.Image;
	private content:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(HelpPopUpView);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.ins<ViewManager>().reg(HelpPopUpView,LayerManager.UI_Pop);