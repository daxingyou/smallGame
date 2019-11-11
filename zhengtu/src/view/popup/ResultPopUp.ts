class ResultPopUp extends BaseEuiView{

	private awardRoleGroup:eui.Group;
	private woodLab:eui.Label;
	private goldLab:eui.Label;
	private feLab:eui.Label;
	private goodLab:eui.Label;
	private sureBtn:eui.Image;
	private correctBtn:eui.Image;
	private resetBtn:eui.Image;

	private content1:eui.Group;
	private content2:eui.Group;
	private icon:eui.Image;
	private nameLab:eui.Label;

	private _state:number = 0;
	private expLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this._state = param[0].state;
		if(param[0].state == 1){
			this.skin.currentState = "win";
			let level = param[0].level;
			this.expLab.text = param[0].exp + "经验";
			let baseValue:number = 100*level
			let woodNum:number = baseValue + ((Math.random()*50)>>0);
			let goodNum:number = baseValue + ((Math.random()*50)>>0);
			let feNum:number = baseValue + ((Math.random()*50)>>0);
			let goldNum:number = 20 +(level-1)*10;
			this.woodLab.text = woodNum.toString();
			this.goodLab.text = goodNum.toString();
			this.feLab.text = feNum.toString();
			this.goldLab.text = goldNum.toString();

			GameApp.inst().gold += goldNum;
			GameApp.inst().wood += woodNum;
			GameApp.inst().good += goodNum;
			GameApp.inst().fe += feNum;
			if(param[0].awardRole){
				this.awardRoleGroup.visible = true;
				this.nameLab.text = param[0].name;
				this.icon.source = param[0].icon;
			}else{
				this.awardRoleGroup.visible = false;
			}
		}else{
			this.skin.currentState = "fail";
			
		}
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.correctBtn,this.onSure,true);
		this.addTouchEvent(this.resetBtn,this.onReset,true);
	}
	private onReset():void{
		this.onClose();
		MessageManager.inst().dispatch(CustomEvt.BATTLE_RESET);
	}
	private onSure():void{
		this.onClose(CustomEvt.BATTLE_END);
	}
	private onClose(event?:string):void{
		ViewManager.inst().close(ResultPopUp);
		if(event){
			// MessageManager.inst().dispatch(event);
			if(GameApp.guildView){
				 GameApp.guilding = false;
				 ViewManager.inst().close(GuideView);
			}
			ViewManager.inst().close(BattleView);
			ViewManager.inst().open(GameMainView);
		}
		
	}
	public close():void{
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.correctBtn,this.onSure);
		this.removeTouchEvent(this.resetBtn,this.onReset);
	}
}
ViewManager.inst().reg(ResultPopUp,LayerManager.UI_Pop);