class ResultView extends BaseEuiView{

	public exitBtn:eui.Group;
	public exitBtn2:eui.Group;
	private expLap:eui.Label;
	private goldLab:eui.Label;
	private level_0:eui.Label;
	private level_1:eui.Label;
	private level_2:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		if(param[0].state == 0){
			this.skin.currentState = "fail";
		}else{
			if(GameApp.curLevel >= GameApp.battleLevel){
				GameApp.battleLevel +=1;
			}
			this.skin.currentState = "win";
			let gold:number = (GameApp.battleLevel - 1)*300 + 500;
			let exp:number = (GameApp.battleLevel - 1)*20 + 100;
			GameApp.inst().gold += gold;
			this.goldLab.text = "获得"+gold+"两银子";
			this.expLap.text = "获得"+exp+"经验";
			//给人物发送过去
			UpgradeCfg.ins.addExp(exp);
		}
		this.level_0.text = "Lv " + UpgradeCfg.ins.roleData[0].level;
		this.level_1.text = "Lv " + UpgradeCfg.ins.roleData[1].level;
		this.level_2.text = "Lv " + UpgradeCfg.ins.roleData[2].level;
		this.exitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExit,this);
		this.exitBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExit,this);
	}
	private onExit(evt:egret.TouchEvent):void{
		CommonLoading.inst().show(null,()=>{
			ViewManager.inst().close(ResultView);
			ViewManager.inst().close(BattleView);
			//进入主界面;
			ViewManager.inst().open(SelectFightView);
		},this);
	}
	public close():void{
		this.exitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onExit,this);
		this.exitBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onExit,this);
	}
}
ViewManager.inst().reg(ResultView,LayerManager.UI_Pop);