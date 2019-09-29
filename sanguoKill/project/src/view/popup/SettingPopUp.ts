class SettingPopUp extends BaseEuiView{
	private content:eui.Group;
	private continueBtn:eui.Group;
	private exitBtn:eui.Group;
	private _oper:number = 0;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		this.content.scaleY = 0;
		egret.Tween.get(this).to({alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
			egret.Tween.get(this.content).to({scaleY:1},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.content);
			},this)
		})
		this.addTouchEvent(this.continueBtn,this.onContinue,true);
		this.addTouchEvent(this.exitBtn,this.onExit,true);
	}
	private onContinue():void{
		this._oper = 1;
		this.onClose();
	}
	private onExit():void{
		egret.Tween.removeAllTweens();
		GameApp.battleEnd = true;
		this._oper = 0;
		this.onClose();
	}
	private onClose():void{
		egret.Tween.get(this.content).to({scaleY:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			if(this._oper == 0){
				CommonLoading.inst().show(null,()=>{
					egret.Tween.get(this).to({alpha:0},600,egret.Ease.circOut).call(()=>{
						egret.Tween.removeTweens(this);
					},this)
					ViewManager.inst().close(SettingPopUp)
					ViewManager.inst().close(BattleView);
					ViewManager.inst().open(SelectFightView);
					// MessageManager.inst().dispatch(CustomEvt.SETTINGCLICK,{oper:this._oper})
				},this);
			}else{
				ViewManager.inst().close(SettingPopUp)
			}
			
			
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.continueBtn,this.onContinue);
		this.removeTouchEvent(this.exitBtn,this.onExit);
	}
}
ViewManager.inst().reg(SettingPopUp,LayerManager.UI_Pop);