class GameMainView extends BaseEuiView{

	private npc_city:eui.Group;
	private npc_answer:eui.Group;
	private npc_general:eui.Group;
	private npc_pub:eui.Group;
	private outBtn:eui.Image;
	private battleBtn:eui.Image;
	private shopBtn:eui.Image;
	// private flagRightGroup:eui.Group;
	// private flagLeftGroup:eui.Group;
	private trainUnlockJob:number = 1;
	// private answerMark:MovieClip;
	// private cityMark:MovieClip;
	// private generalMark:MovieClip;

	private actionGroup:eui.Image;
	private city_add:eui.Image;
	private infoBtn:eui.Image;
	private bagBtn:eui.Image;
	public constructor() {
		super()
	}
	public open(...param):void{
		let w:number = StageUtils.ins<StageUtils>().getWidth();
		let h:number = StageUtils.ins<StageUtils>().getHeight();
		this.actionGroup.anchorOffsetX = w>>1;
		this.actionGroup.anchorOffsetY = h>>1;
		this.actionGroup.width = w
		this.actionGroup.height = h
		this.actionGroup.x = w>>1;
		this.actionGroup.y = h>>1;
		this.actionGroup.scaleX = this.actionGroup.scaleY = 3;
		egret.Tween.get(this.actionGroup).to({scaleX:1,scaleY:1},1000,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.actionGroup);
		},this)
		let firststr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		this.infoBtn.x = StageUtils.ins<StageUtils>().getWidth() - 75 -20;
		this.infoBtn.y = 10;
		if(!firststr){
			//第一次进入强制引导
			egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"1");
			ViewManager.ins<ViewManager>().open(GuideView);
			let guideView = ViewManager.ins<ViewManager>().getView(GuideView) as GuideView;
			guideView.nextStep({id:"1_1",comObj:this.infoBtn,width:75,height:71}) ;
		}
		this.shopBtn.x = StageUtils.ins<StageUtils>().getWidth() - this.shopBtn.width - 28;
		this.shopBtn.y = (StageUtils.ins<StageUtils>().getHeight()>>1) - (this.shopBtn.height>>1);

		let borderMc:MovieClip = new MovieClip();
		this.addChild(borderMc);
		borderMc.alpha = 0.4;
		borderMc.playFile(`${EFFECT}border`,-1);
		borderMc.scaleX = borderMc.scaleY = 1.2;
		borderMc.x = this.shopBtn.x + (this.shopBtn.width>>1);
		borderMc.y = this.shopBtn.y + (this.shopBtn.height>>1);
		// this.alpha = 0;
		/**提前加载 */
		// MapView.ins<MapView>().initMap();
		// EntityManager.ins<EntityManager>().init();
		// MapView.ins<MapView>().refrehMapViewPort();
		//--------------
		let role_job:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		let levelStr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		if(!levelStr){
			egret.localStorage.setItem(LocalStorageEnum.LEVEL,"1");
		}
		StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.GUIDE_CLICK_INFO,this.onInfoOpen,this);
		this.addTouchEvent(this.infoBtn,this.onInfoOpen,true);
		this.addTouchEvent(this.bagBtn,this.onOpenBag,true);
		this.addTouchEvent(this.shopBtn,this.onOpenShop,true);

		this.addMainCom(null,false);
		
		
		if(!role_job){
			ViewManager.ins<ViewManager>().open(SelectWayPopUp,[{cb:this.selectCall,arg:this}])
		}

		
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addTouchEvent(this.battleBtn,this.onBattle,true);
		this.addTouchEvent(this.outBtn,this.onOut,true);

		MapView.ins<MapView>().initMap();
		EntityManager.ins<EntityManager>().init();
		MapView.ins<MapView>().refrehMapViewPort();
	}
	private onInfoOpen():void{
		ViewManager.ins<ViewManager>().open(HelpPopUpView);
	}
	private onOpenBag():void{
		ViewManager.ins<ViewManager>().open(BagPopUp);
	}
	private onOpenShop():void{
		ViewManager.ins<ViewManager>().open(ShopView);
	}
	// private onExpChange(value:number):void{
	// 	// if(!this.cityMark){return};
	// 	let needGold:number = (GameApp.ins<GameApp>().role_job+1)*300;
	// 	if(value >= GameApp.ins<GameApp>().curLevelMaxExp && (GameApp.ins<GameApp>().role_gold >= needGold)){
	// 		//当前经验大于了当前升级所需总经验 && 元宝足够
	// 		// this.cityMark.playFile(`${EFFECT}point`,-1);
	// 		// this.cityMark.visible = true;
	// 	}else{
	// 		// this.cityMark.stop();
	// 		// this.cityMark.visible = false;
	// 	}
	// }
	// private jobChange(value:number):void{
	// 	// if(!this.generalMark){return};
	// 	let trainState:string = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
	// 	if(value >= this.trainUnlockJob && (GameApp.ins<GameApp>().role_gold >= 200) && (!trainState)){
	// 		//职业达到武将解锁 && 拥有练兵需要的金钱 && 没有在练兵状态
	// 		this.generalMark.playFile(`${EFFECT}point`,-1);
	// 		this.generalMark.visible = true;
	// 	}
	// }
	// private onGoldChage(value:number):void{
	// 	if(value >= 200){
	// 		if(this.answerMark){
	// 			this.answerMark.playFile(`${EFFECT}point`,-1);
	// 			this.answerMark.visible = true;
	// 		}
	// 		let trainState:string = egret.localStorage.getItem(LocalStorageEnum.TRAIN_STATE);
	// 		if(this.generalMark && GameApp.ins<GameApp>().role_job >= this.trainUnlockJob && (!trainState)){
	// 			//当前职业达到解锁职业 。&& 没有处于练兵状态
	// 			this.generalMark.playFile(`${EFFECT}point`,-1);
	// 			this.generalMark.visible = true;
	// 		}else{
	// 			if(this.generalMark){
	// 				this.generalMark.stop();
	// 				this.generalMark.visible = false;
	// 			}
	// 		}
	// 	}else{
	// 		if(this.answerMark){
	// 			this.answerMark.stop();
	// 			this.answerMark.visible = false;
	// 		}
	// 		if(this.generalMark){
	// 			this.generalMark.stop();
	// 			this.generalMark.visible = false;
	// 		}
	// 	}
	// 	let needGold:number = (GameApp.ins<GameApp>().role_job+1)*300;
	// 	if(this.cityMark && GameApp.ins<GameApp>().curExp >= GameApp.ins<GameApp>().curLevelMaxExp && (value >= needGold)){
	// 		//当前经验足够 && 元宝也足够了 。可以提升
	// 		this.cityMark.playFile(`${EFFECT}point`,-1);
	// 		this.cityMark.visible = true;
	// 	}else{
	// 		if(this.cityMark){
	// 			this.cityMark.stop();
	// 			this.cityMark.visible = false;
	// 		}
			
	// 	}
	// }
	// private createShowSoldierGroup(attr:any,res:string,offset:number,index:number,scaleX:number = 1):void{
	// 	let soldierRect:TrainingItemRect = new TrainingItemRect(offset,res,5,2,2,scaleX);
	// 	this.addChildAt(soldierRect,4+index);
	// 	soldierRect.top = 420;
	// 	for(let key in attr){
	// 		soldierRect[key] = attr[key];
	// 	}
	// }
	
	private onBattle():void{}
	private onOut():void{}
	public refreshPage():void{
		this.actionGroup.scaleX = this.actionGroup.scaleY = 3;
		egret.Tween.get(this.actionGroup).to({scaleX:1,scaleY:1},1000,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.actionGroup);
		},this)
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.npc_city:
			case this.city_add:
				ViewManager.ins<ViewManager>().open(StudyPopUp);
				// ViewManager.ins<ViewManager>().open(SelectWayPopUp)
				break;
			case this.npc_answer:
				//税务
				ViewManager.ins<ViewManager>().open(TaxPopUp);
				break;
			case this.npc_general:
				//太学
				ViewManager.ins<ViewManager>().open(AnswerPopUp);
				break;
			case this.npc_pub:
				//酒馆
				ViewManager.ins<ViewManager>().open(PubPopUp);
				break;
			case this.outBtn:
				ViewManager.ins<ViewManager>().open(CollectView);
				egret.Tween.get(this).to({alpha:0},1000,egret.Ease.circIn).call(()=>{
					egret.Tween.removeTweens(this);
					ViewManager.ins<ViewManager>().close(GameMainView);
				},this)
				break;
			case this.battleBtn:
				//点击了战役按钮
				ViewManager.ins<ViewManager>().open(LevelSelectView);
				break;
		}
	}
	/**选择方式返回 */
	private selectCall():void{

	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.battleBtn,this.onBattle);
		this.removeTouchEvent(this.outBtn,this.onOut);
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.GUIDE_CLICK_INFO,this.onInfoOpen,this);
		this.removeTouchEvent(this.infoBtn,this.onInfoOpen);
		this.removeTouchEvent(this.bagBtn,this.onOpenBag);
		this.removeTouchEvent(this.shopBtn,this.onOpenShop);
	}
}
ViewManager.ins<ViewManager>().reg(GameMainView,LayerManager.UI_Main);