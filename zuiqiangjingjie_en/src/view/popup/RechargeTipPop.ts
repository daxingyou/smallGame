class RechargeTipPop extends BaseEuiView{

	private close_img:eui.Image;
	private rechargeBtn:eui.Image;
	private cancleBtn:eui.Image;
	private tipGroup:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.tipGroup.alpha = 0;
		this.tipGroup.scaleX = this.tipGroup.scaleY = 0;
		egret.Tween.get(this.tipGroup).to({alpha:1,scaleX:1,scaleY:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.tipGroup);
		},this)

		this.addTouchEvent(this.close_img,this.onReturn,true);
		this.addTouchEvent(this.cancleBtn,this.onReturn,true);
		this.addTouchEvent(this.rechargeBtn,this.onRecharge,true);

	}
	private onRecharge():void{
		this.onReturn(null,true);
	}
	private onReturn(evt,boo?:boolean):void
	{
		egret.Tween.get(this.tipGroup).to({alpha:0,scaleX:0,scaleY:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.tipGroup);
			ViewManager.inst().close(RechargeTipPop);
			if(boo){
				ViewManager.inst().open(RechargePopUp);
			}
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.close_img,this.onReturn);
		this.removeTouchEvent(this.cancleBtn,this.onReturn);
		this.removeTouchEvent(this.rechargeBtn,this.onRecharge);
	}
}
ViewManager.inst().reg(RechargeTipPop,LayerManager.UI_Pop);