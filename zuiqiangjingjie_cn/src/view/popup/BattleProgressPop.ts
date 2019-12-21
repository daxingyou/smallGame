/**
 * 战斗进度弹窗
 */
class BattleProgressPop extends BaseEuiView{
	private cityInfo:CityInfo;
	private cost:number[] = [100,200,300];
	private costMedal:number = 5;

	private levelGroup:eui.Group;
	private returnBtn:eui.Image;

	private level_1:eui.Group;
	private level_2:eui.Group;
	private level_3:eui.Group;
	private level_4:eui.Group;

	private xuan_img:eui.Image;

	private enterBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		
		this.levelGroup["autoSize"]();
		// let precentw:number = StageUtils.inst().getWidth()/1334;
		this.levelGroup.x = StageUtils.inst().getWidth()>>1;
		this.levelGroup.y = StageUtils.inst().getHeight()>>1;
		let scaleX:number = this.levelGroup.scaleX;
		let scaleY:number = this.levelGroup.scaleY;
		this.levelGroup.scaleX = this.levelGroup.scaleY = 0;
		this.touchEnabled = false;
		this.touchChildren = false;
		this.levelGroup.alpha = 0;
		egret.Tween.get(this.levelGroup).to({scaleX:scaleX,scaleY:scaleY,alpha:1},600,egret.Ease.backOut).call(()=>{
			egret.Tween.removeTweens(this.levelGroup);
			this.touchEnabled = true;
			this.touchChildren = true;
			if(GameApp.guideView){
				GameApp.guideView.nextStep({id:"1_2",comObj:this.enterBtn,width:this.enterBtn.width,height:this.enterBtn.height})
			}
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.enterBtn,this.onEnter,true);
		let cityId:number = param[0].cityId;
		this.cityInfo = GlobalFun.getCityInfo(cityId);
		this.showProgress();
		
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_BATTLE,this.onClickBat,this);

	}
	private onClickBat():void{
		this.challenge();
	}
	private onReturn():void{
		egret.Tween.get(this.levelGroup).to({scaleX:0,scaleY:0,alpha:0},600,egret.Ease.backIn).call(()=>{
			egret.Tween.removeTweens(this.levelGroup);
			ViewManager.inst().close(BattleProgressPop);
		},this)
	}
	private onEnter():void{
		this.challenge();
	}
	/**显示通关的关卡 */
	private showProgress(){
		let passlevel:number = this.cityInfo.passLevel;
		for(let i:number = 1;i<=4;i++){
			let nextLevel = passlevel + 1;
			if(i == nextLevel)
			{
				this.xuan_img.x = this["level_"+i].x + 7.66;
				this.xuan_img.y = this["level_"+i].y + 9.01;
				continue;
			}
			if(passlevel < i){
				GlobalFun.filterToGrey(this["level_"+i]);
			}else if(passlevel >= i){
				let dialog:eui.Image = this["level_"+i].getChildByName("dialog");
				if(!!dialog){
					dialog.visible = true;
				}
			}
		}
	}
	/**进行挑战 */
	private challenge():void{
		let passlevel:number = this.cityInfo.passLevel;
		let nextLevel:number = passlevel + 1;
		let levelId:string = this.cityInfo.cityId +"_"+nextLevel;
		let str:string = "";
		let num:number = 0;
		if(nextLevel < 4){
			let costGoods:number = this.cost[nextLevel-1];
			if(costGoods > GameApp.goods){
				UserTips.inst().showTips("物资不足");
				return;
			}
			str = "goods";
			num = costGoods;
			// GameApp.goods -= costGoods;
		}else if(nextLevel == 4){
			if(this.costMedal > GameApp.medal){
				UserTips.inst().showTips("勋章不足")
				return;
			}
			str = "medal";
			num = this.costMedal;
			// GameApp.medal -= this.costMedal;
		}
		GameApp.battleMark = levelId;
		// GameApp.year += 1;
		//打开最后的战斗界面
		this.onReturn();
		GameCfg.chapter = GameApp.chapterid;
		GameCfg.level = GameApp.levelid;
		ViewManager.inst().close(GameMainView);
		ViewManager.inst().open(DoubtfulView,[{key:str,num:num}]);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.enterBtn,this.onEnter);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_BATTLE,this.onClickBat,this);
	}
}
ViewManager.inst().reg(BattleProgressPop,LayerManager.UI_Pop);