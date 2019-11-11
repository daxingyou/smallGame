/**
 * 关卡选择界面
 */
class LevelSelectView extends BaseEuiView{

	private content:eui.Group;
	private returnBtn:eui.Image;
	//测试组件
	private level_1:eui.Image;
	private level_2:eui.Image;
	private level_3:eui.Image;
	private level_4:eui.Image;
	private level_5:eui.Image;
	private level_6:eui.Image;
	private level_7:eui.Image;
	private level_8:eui.Image;
	private level_9:eui.Image;

	private level_1_txt:eui.Label;
	private level_2_txt:eui.Label;
	private level_3_txt:eui.Label;
	private level_4_txt:eui.Label;
	private level_5_txt:eui.Label;
	private level_6_txt:eui.Label;
	private level_7_txt:eui.Label;
	private level_8_txt:eui.Label;
	private level_9_txt:eui.Label;
	private unlockCondition:any = {1:2,2:3,3:4};
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.refreshLevelIconShow();
	}	
	private refreshLevelIconShow():void{
		let levestr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		for(let i:number = 1;i<=9;i++){
			if(i < parseInt(levestr)){
				this["level_"+[i]].source = "level_pass_png";
				this[`level_${i}_txt`].textColor = 0xEFC009;
			}else if(i == parseInt(levestr)){
				this["level_"+[i]].source = "level_lock_png";
				this[`level_${i}_txt`].textColor = 0x2D9BEF;
			}else if(i > parseInt(levestr)){
				this["level_"+[i]].source = "level_unlock_png";
				this[`level_${i}_txt`].textColor = 0xCBCEC8;
			}
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		let namestr:string = evt.target.name;
		if(namestr){
			let level:number = parseInt(namestr.split("_")[1]);
			let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
			if(level > parseInt(levelstr)){
				UserTips.ins<UserTips>().showTips("当前关卡未开启，请先通关上一关卡");
				return;
			}
			// let limitJob:number = this.unlockCondition[level];
			// let curJob:number = GameApp.ins<GameApp>().role_job;
			// if(curJob<limitJob){
			// 	UserTips.ins<UserTips>().showTips("参战所需军衔不足,需要达到-"+`<font color=0xfc3434>${GameApp.jobCfg[limitJob]}</font>`);
			// 	return;
			// }else{
				// 进入战斗
				ViewManager.ins<ViewManager>().open(BattleView,[{level:level}]);
				this.onReturn()
				// ViewManager.ins<ViewManager>().open(GameLoadingUI);
				// ViewManager.ins<ViewManager>().open(GameLoadingUI,[{cls:BattleView,param:{level:level}}])
			// }
		}
	}
	private onReturn():void{
		let width:number = StageUtils.ins<StageUtils>().getWidth() + 20;
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(LevelSelectView);
		},this)
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}
}
ViewManager.ins<ViewManager>().reg(LevelSelectView,LayerManager.UI_Main);