class CommonPopUp extends BaseEuiView{

	private content:eui.Group;
	private contentLab:eui.Label;
	private sureBtn:eui.Image;
	private returnBtn:eui.Image;
	private _type:number;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		if(param[0] && param[0].tip){
			this.contentLab.text = param[0].tip;
		}
		this._type = param[0].type;
	}
	private onSure():void{
		this.onReturn(null,CustomEvt.CLICK_SURE);
	}
	private onReturn(event,evt):void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			if(evt){
				ViewManager.inst().close(GeneralPopUp);
				ViewManager.inst().open(SoldierCamp,[{type:this._type}]);
			}
			ViewManager.inst().close(CommonPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.inst().reg(CommonPopUp,LayerManager.UI_Pop);