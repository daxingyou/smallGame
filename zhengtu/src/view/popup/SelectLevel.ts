class SelectLevel extends BaseEuiView{

	private content:eui.Group;
	private levelGroup1:eui.Group;
	private levelGroup2:eui.Group;
	private levelGroup3:eui.Group;
	private levelGroup4:eui.Group;
	private levelGroup5:eui.Group;
	private levelGroup6:eui.Group;
	private levelGroup7:eui.Group;
	private levelGroup8:eui.Group;
	private levelGroup9:eui.Group;
	private returnBtn:eui.Image;
	private _level:number  = 1;
	private otherGeneralArr:any[];
	private leftArrow:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			if(GameApp.guilding){
				if(GameApp.waitStepId){
					ViewManager.inst().open(GuideView);
					GameApp.guildView = ViewManager.inst().getView(GuideView) as GuideView;
					GameApp.guildView.nextStep({id:GameApp.waitStepId,comObj:this.levelGroup1,width:62,height:92});
				}
			}
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		if(levelstr){
			this._level = parseInt(levelstr);
		}else{
			egret.localStorage.setItem(LocalStorageEnum.LEVEL,"1");
		}
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		let otherGeneralstr:string = egret.localStorage.getItem(LocalStorageEnum.OTHER_GENERAL);
		this.otherGeneralArr = JSON.parse(otherGeneralstr);
		this.refreshLevelPage();
		MessageManager.inst().addListener(CustomEvt.GUIDE_SELECT_LEVEL,this.onSelectLevel,this);
		this.addTouchEvent(this.leftArrow,this.onLeftArrow,true);
	}
	private onLeftArrow():void{
		UserTips.inst().showTips("暂未开启");
		return;
	}
	private onSelectLevel():void{
		this.onReturn();
		ViewManager.inst().open(BattleView,[{level:1,state:-1}]);
		if(GameApp.guilding){
			GlobalFun.guideToNext();
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		let target:any = evt.target;
		let namestr:string = evt.target.name;
		if(namestr && namestr.indexOf("levelGroup")!=-1){
			//当前点击的是关卡
			let level:number = parseInt(namestr.split("levelGroup")[1]);
			if(level > this._level){
				UserTips.inst().showTips("请先通关上一关卡");
				return;
			}
			this.onReturn();
			ViewManager.inst().open(BattleView,[{level:level}]);
		}
	}
	private refreshLevelPage():void{
		for(let i:number = 0;i<9;i++){
			let levelLab:eui.Label = this["levelGroup"+(i+1)].getChildByName("levelName");;
			if(levelLab){levelLab.textColor = 0xF2D72B}
			let icon:eui.Image = this["levelGroup"+(i+1)].getChildByName("icon");
			let curHeroAttr:any = this.otherGeneralArr[i];
			if(icon){icon.source = `level_icon_${curHeroAttr.index}_png`}
			if((i+1) > this._level){
				//未解锁关卡
				GlobalFun.filterToGrey(this["levelGroup"+(i+1)]);
			}else if((i+1) < this._level){
				//已通关关卡
				// let icon:eui.Image = this["levelGroup"+(i+1)].getChildByName("icon");
				// if(icon){icon.visible = false;}
			}else{
				//当前所在的关卡
				let mc:MovieClip = new MovieClip();
				mc.playFile(`${EFFECT}battle`,-1);
				this.content.addChild(mc);
				mc.x = this["levelGroup"+(i+1)].x + (this["levelGroup"+(i+1)].width >> 1);
				mc.y = this["levelGroup"+(i+1)].y;
			}
		}
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(SelectLevel);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.leftArrow,this.onLeftArrow);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(SelectLevel,LayerManager.UI_Pop);