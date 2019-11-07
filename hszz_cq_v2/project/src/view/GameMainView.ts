class GameMainView extends BaseEuiView{
	
	private levelLab:eui.Label;
	// private progressLab:eui.Label;
	private expMask:eui.Rect;
	private expBar:eui.Image;
	private medalLab:eui.Label;
	private goldLab:eui.Label;
	// private addBtn:eui.Image;
	private helpBtn:eui.Image;
	// private scroller:eui.Scroller;
	// private list:eui.List;
	// private arrayCollect:eui.ArrayCollection;

	private navGroup:eui.Group;
	private boxBtn:eui.Image;
	private shopBtn:eui.Image;
	private backBtn:eui.Image;
	private cardBtn:eui.Image;
	private battleBtn:eui.Image;

	private maxExp:number = 0;

	private cardGroup:eui.Group;
	// private cardMask:eui.Image;

	public static shopOpen:boolean = false;
	public static fightingOpen:boolean = false;
	public static treasureOpen:boolean = false;
	private rechargeBtn:eui.Image;
	// private powerLab:eui.BitmapLabel;
	private descLab:eui.Label;
	private cardName:eui.Label;
	private nameLab:eui.Label;
	private bossBtn:eui.Image;
	private headImg:eui.Image;

	private watcher1:eui.Watcher;
	private watcher2:eui.Watcher;
	private watcher3:eui.Watcher;
	private watcher4:eui.Watcher;
	// private postion:eui.Rect;
	private timeLab:eui.Label;
	private timer:egret.Timer;
	private curCdtime:number;

	private hp_group:eui.Group;
	private hp_mask:eui.Image;
	private mp_mask:eui.Image;
	public constructor() {
		super();
	}
	protected childrenCreated():void{
		let body = document.getElementsByTagName('body')[0];
		if(!!body){
			body.style.background = `url(resource/res/view/main/small.jpg) no-repeat`;
			body.style["background-size"] = "cover"
		}
		egret.localStorage.setItem("hszz_first_enter","1");
	}
	public open(...param):void{
		// this.postion["autoSize"]();
		this.maxExp = GameApp.level*500;
		this.expBar.mask = this.expMask;
		this.expMask.width = 0;
		this.addTouchEvent(this.helpBtn,this.onHelp,true);
		// this.addTouchEvent(this.addBtn,this.onOperRecharge,true);
		this.addTouchEvent(this.rechargeBtn,this.onOperRecharge,true);
		this.addTouchEvent(this.boxBtn, this.noOperBox, true);
		this.navGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.headImg.source = `head_${GameApp.sex}_png`
		this.nameLab.text = GameApp.roleName;
		// this.arrayCollect = new eui.ArrayCollection();
		// this.list.itemRenderer = CardItem;
		// this.list.dataProvider = this.arrayCollect;
		// this.scroller.viewport = this.list;
		// this.scroller.horizontalScrollBar.autoVisibility = false;
		// this.scroller.horizontalScrollBar.visible = false;
		// this.refreshUnlockCardList();
		this.watcher1 = eui.Binding.bindProperty(GameApp,["medal"],this.medalLab,"text");
		this.watcher2 = eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		this.watcher3 = eui.Binding.bindHandler(GameApp,["exp"],this.onExpChange,this);
		this.watcher4 = eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);
		this.refreshLockCardList();
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		// this.cardGroup.mask = this.cardMask;
		// this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardItemTap,this);
		MessageManager.inst().addListener("CardDataRefresh",this.refreshLockCardList,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_BATTLE,this.onClickBattle,this);

		let cdstr:string = egret.localStorage.getItem(LocalStorageEnum.CDTIME);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		if(!cdstr){
			GlobalFun.clearFilters(this.bossBtn);
			this.timeLab.text = "";
			this.timeLab.visible = false;
		}else{
			let offValue:number = parseInt(cdstr) - new Date().getTime();
			if(offValue <= 0){
				//当前已经结束冷却;
				GlobalFun.clearFilters(this.bossBtn);
				this.timeLab.text = "";
				this.timeLab.visible = false;
			}else{
				this.curCdtime = parseInt(cdstr);
				GlobalFun.filterToGrey(this.bossBtn);
				this.timeLab.visible = true;
				this.timeLab.text = "冷却中:"+DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
				this.timer.start();
			}
		}
		// let lightMc:MovieClip = new MovieClip();
		// lightMc.playFile(`${EFFECT}light`,-1);
		// this.addChild(lightMc);
		// lightMc.x = this.postion.x;
		// lightMc.y = this.postion.y;
		// this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onUnlockItem,this);
		let hp = new MovieClip();
			hp.playFile(`${EFFECT}hpBall`, -1);
			hp.scaleX = hp.scaleY = 2;
			hp.x = this.hp_mask.x;
			hp.y = this.hp_mask.y-50;
		this.hp_group.addChildAt(hp, 3);
		let mp = new MovieClip();
			mp.playFile(`${EFFECT}mpBall`, -1);
			mp.scaleX = mp.scaleY = 2;
			mp.x = this.mp_mask.x - 100;
			mp.y = this.mp_mask.y - 80;
		this.hp_group.addChildAt(mp, 3);
		hp.mask = this.hp_mask;
		mp.mask = this.mp_mask;
	}
	private onClickBattle():void{
		ViewManager.inst().close(GuideView);
		GameApp.guilding = false;
		this.touchEnabled = true;
		this.touchChildren = true;
		ViewManager.inst().open(OutWildBattle,[{fuben:"fuben"}])
		GameApp.fuben = "fuben";
		this.closeView();
		ViewManager.inst().close(GameMainView);
	}
	private onTimer(evt:egret.TimerEvent):void{
		let offValue:number = this.curCdtime - new Date().getTime();
		if(offValue <= 0){
			//当前已经结束冷却;
			GlobalFun.clearFilters(this.bossBtn);
			this.timeLab.text = "";
			this.timeLab.visible = false;
			this.timer.stop();
			this.curCdtime = null;
		}else{
			this.timeLab.text = "冷却中:"+DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
		}
	}
	// private onUnlockItem():void{
	// 	UserTips.inst().showTips("未解锁")
	// }
	// private onCardItemTap(evt:egret.TouchEvent):void{
	// 	if(evt.target instanceof CardItem && !this.moveBoo){
	// 		let cardVo:CardVo = evt.target.cardVo;
	// 		//打开卡牌详情界面 。cardVo为当前卡牌的数据
	// 		// ViewManager.inst().open()
	// 		ViewManager.inst().open(CultivateView,[{id:cardVo.id}])
	// 	}else{
	// 		this.moveBoo = false;
	// 	}
	// }
	private beginPoint:egret.Point;
	private curClickItem:CardItem;
	private onBegin(evt:egret.TouchEvent):void{
		if(!this.beginPoint && !this.noCard){
			this.beginPoint = new egret.Point();
			this.beginPoint.x = evt.stageX;
			this.beginPoint.y = evt.stageY;
		}
		this.curClickItem = evt.target;
	}
	private moveBoo:boolean;
	private onTouchMove(evt:egret.TouchEvent):void{
		if(this.beginPoint && !this.noCard){
			this.moveBoo = true;
			let offx:number = evt.stageX - this.beginPoint.x;
			let direct:number = 1;
			let scale:number = 1;
			if(offx > 0){
				//鼠标向右移动 
				direct = 5;
				scale = 1;
			}else if(offx < 0){
				//鼠标向左移动
				direct = -5;
				scale = -1;
			}
			if(Math.abs(offx) >= 5){
				 for(let i:number = 0;i<this.cardGroup.numChildren;i++){
					let item:CardItem = this.cardGroup.getChildAt(i) as CardItem;
					
					item.x += direct;
					// if(item.x >= this.cardGroup.width){item.x = this.cardGroup.width;}
					// if(item.x <= 0){item.x = 0}

					if(item.x > (this.cardGroup.width>>1)){
						item.scaleX += -(scale*0.01);
						item.scaleY += -(scale*0.01);
						item.alpha += -(scale*0.02);
					}else{
						item.scaleX += (scale*0.01);
						item.scaleY += (scale*0.01);
						item.alpha += (scale*0.02);
					}
					if(item.scaleX >= 1){
						item.scaleX = item.scaleY = 1;
					}
					if(item.scaleX <= 0.4){
						item.parent.removeChild(item);
						this.setCardIndex();
					}
				}
				if(offx > 0){
					
					if(this.firstCard.scaleX >= 0.9 ){
						let index:number = this.firstCard.index;
						if(index == 0){
							index = GameApp.ownCards.length - 1;
						}else{
							index -= 1;
						}
						this.firstCard = this.createCard(GameApp.ownCards[index],index,0.6,{x:(this.cardGroup.width>>1)-180},0.2)
					}
					this.getLastCard();
				}else if(offx < 0){
					if(this.lastCard.scaleX >= 0.9){
						let index:number = this.lastCard.index;
						if(index == GameApp.ownCards.length - 1){
							index = 0;
						}else{
							index += 1;
						}
						this.lastCard = this.createCard(GameApp.ownCards[index],index,0.6,{x:(this.cardGroup.width>>1)+180},0.2);
					}
					this.getFirstCard();
				}
				this.showDesc();
				this.setCardIndex();
			}
		}
	}
	private showDesc():void{
		if(this.centerCard){
			this.cardName.text = this.centerCard.cardVo.name;
			this.descLab.text = this.centerCard.cardVo.desc;
		}
	}
	private getFirstCard():void{
		let minC:CardItem = this.cardGroup.$children[0] as CardItem;
		for(let i:number = 0;i<this.cardGroup.numChildren;i++){
			let curItem:CardItem = this.cardGroup.getChildAt(i) as CardItem;
			if(curItem.x < minC.x && curItem != minC){
				minC = curItem;
			}
			if(curItem.x <= (this.cardGroup.width>>1) + 50 && curItem.x >= (this.cardGroup.width>>1) -50){
				this.centerCard = curItem;
			}
		}
		this.firstCard = minC;
	}
	private getLastCard():void{
		let maxC:CardItem = this.cardGroup.$children[0] as CardItem;
		for(let i:number = 0;i<this.cardGroup.numChildren;i++){
			let curItem:CardItem = this.cardGroup.getChildAt(i) as CardItem;
			if(curItem.x > maxC.x && curItem != maxC){
				maxC = curItem;
			}
			if(curItem.x <= (this.cardGroup.width>>1) + 50 && curItem.x >= (this.cardGroup.width>>1) -50){
				this.centerCard = curItem;
			}
		}
		this.lastCard = maxC;
	}
	private onEnd(evt:egret.TouchEvent):void{
		if(this.beginPoint){
			this.beginPoint = null;
		}
		if(this.noCard && this.curClickItem && this.curClickItem instanceof CardItem){
			this.curClickItem = null;
			ViewManager.inst().open(ShopView);
		}
	}
	
	private curIndex:number = 0;
	private lastCard:CardItem;
	private firstCard:CardItem;
	private centerCard:CardItem;
	private noCard:boolean = false;
	public refreshLockCardList():void{
		let ownCardlistVo:CardVo[] = GameApp.ownCards;
		this.cardGroup.removeChildren();
		if(!ownCardlistVo.length){
			//当前没有卡牌
			this.cardName.text = "提示";
			this.descLab.textFlow = new egret.HtmlTextParser().parse(`当前未拥有卡牌,可通过<font color=0x00ff00>[商店],[Boss],[历练],[福利]</font>获得`);
			this.noCard = true;
			this.createCard(null,0,1,{x:(this.cardGroup.width>>1)});
		}else{
			let leftIndex:number = this.curIndex - 1;
			if(leftIndex < 0){leftIndex = ownCardlistVo.length - 1};
			let rightIndex:number = this.curIndex + 1;
			if(rightIndex > ownCardlistVo.length - 1){rightIndex = 0}
			this.noCard = false;
			if(GameApp.guilding){
				this.touchEnabled = false;
				this.touchChildren = false;
				this.firstCard = this.createCard(ownCardlistVo[leftIndex],leftIndex,0.7,{x:(this.cardGroup.width>>1)-180},null,()=>{
					this.lastCard = this.createCard(ownCardlistVo[rightIndex],rightIndex,0.7,{x:(this.cardGroup.width>>1)+180},null,()=>{
						this.centerCard = this.createCard(ownCardlistVo[this.curIndex],this.curIndex,1,{x:(this.cardGroup.width>>1)},null,()=>{
							//执行引导
							this.showDesc();
							ViewManager.inst().open(GuideView);
							let guildView:GuideView = ViewManager.inst().getView(GuideView) as GuideView;
							guildView.nextStep({id:"1_1",comObj:this.battleBtn,width:107,height:115})
						},this);
					},this);
				},this);
			}else{
				this.touchEnabled = true;
				this.touchChildren = true;
				this.firstCard = this.createCard(ownCardlistVo[leftIndex],leftIndex,0.7,{x:(this.cardGroup.width>>1)-180});
				this.lastCard = this.createCard(ownCardlistVo[rightIndex],rightIndex,0.7,{x:(this.cardGroup.width>>1)+180});
				this.centerCard = this.createCard(ownCardlistVo[this.curIndex],this.curIndex,1,{x:(this.cardGroup.width>>1)});
			}
			this.showDesc();
		}
		
	}
	private createCard(cardVo:CardVo,index:number,scale:number,attr:any,alpha?:number,cb?:()=>void,thisarg?:any):CardItem{
		let curcard:CardItem = new CardItem();
		this.cardGroup.addChild(curcard);
		curcard.index = index;
		if(!isNaN(alpha)){
			curcard.alpha = alpha;
		}
		// GlobalFun.shadowFilter(curcard);
		curcard.anchorOffsetX = (curcard.width)>>1;
		curcard.anchorOffsetY = (curcard.height)>>1;
		curcard.initData(cardVo,scale);
		curcard.verticalCenter = 0;
		curcard.x = attr.x;
		this.setCardIndex();
		if(!!cardVo){
			let ligntColor:number[] = [0x76ff39,0x3ecfff,0xbf11ff,0xffd800]
			GlobalFun.lighting(curcard,ligntColor[cardVo.quality - 1]);
			if(GameApp.guilding){
				curcard.alpha = 0;
				curcard.scaleX = curcard.scaleY = 0;
				egret.Tween.get(curcard).to({alpha:1,scaleX:scale,scaleY:scale},1000,egret.Ease.bounceOut).call(()=>{
					egret.Tween.removeTweens(curcard);
					if(cb && thisarg){
						cb.call(thisarg);
					}
				},this)
			}
		}
		return curcard;
	}
	private setCardIndex(num?:number):void{
		let childrens:egret.DisplayObject[] = this.cardGroup.$children;
		childrens.sort(this.sortfun);
		for(let i:number = 0;i<childrens.length;i++){
			// if(childrens[i].x <= (this.cardGroup.width>>1)){
				this.cardGroup.setChildIndex(childrens[i],i);
				// if(childrens[i].x >= (this.cardGroup.width>>1)){
				// 	this.cardGroup.setChildIndex(childrens[i],(childrens.length - i-1));
				// }
			// }
		}
	}
	private sortfun(param1:egret.DisplayObject,param2:CardItem):number{
		let x1:number = param1.scaleX;
		let x2:number = param2.scaleY;
		if(x1 > x2){
			return 1;
		}else if(x1 < x2){
			return -1;
		}else{
			return 0;
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.shopBtn:
				console.log("打开了商城界面")
				if(GameMainView.shopOpen)
					return;
				this.closeView();
				ViewManager.inst().open(ShopView);
				GameMainView.shopOpen = true;
				break;
			case this.backBtn:
				console.log("返回了主界面")
				break;
			case this.cardBtn:
				console.log("打开了卡牌界面")
				this.closeView();
				ViewManager.inst().open(ArchiveView)
				break;
			case this.battleBtn:
				// if(GameMainView.fightingOpen)
				// 	return;
				ViewManager.inst().open(OutWildBattle,[{fuben:"fuben"}])
				GameApp.fuben = "fuben";
				this.closeView();
				ViewManager.inst().close(GameMainView);
				
				// ViewManager.inst().open(HighLadderView);
				// console.log("打开了对战界面")
				// if(this.fightingOpen)
				// 	return;
				
				// ViewManager.inst().open(FightingView);
				// GameMainView.fightingOpen = true;
				break;
			case this.bossBtn:
				if(this.curCdtime){
					UserTips.inst().showTips("Boss副本冷却中...")
					return;
				}
				ViewManager.inst().open(OutWildBattle,[{fuben:"boss"}])
				GameApp.fuben = "boss";
				this.closeView();
				ViewManager.inst().close(GameMainView);
				break;
		}
	}
	private closeView()
	{
		GameMainView.fightingOpen = false;
		GameMainView.treasureOpen = false;
		GameMainView.shopOpen = false;
		ViewManager.inst().close(FightingView);
		ViewManager.inst().close(TreasureBox);
		ViewManager.inst().close(HelpView);
		ViewManager.inst().close(HighLadderView);
		ViewManager.inst().close(ShopView);
	}
	private noOperBox()
	{
		console.log("打开了宝箱界面")
		if(GameMainView.treasureOpen)
			return;
		this.closeView();
		ViewManager.inst().open(TreasureBox);
		GameMainView.treasureOpen = true;
	}
	private onOperRecharge():void{
		console.log("打开了内购充值界面")
		ViewManager.inst().open(RechargePop);
	}
	private onHelp():void{
		console.log("打开了帮助界面")
		this.closeView();
		ViewManager.inst().open(HelpView);
	}
	private onExpChange():void{
		if(GameApp.exp >= this.maxExp){
			let remainexp:number = GameApp.exp - this.maxExp;
			GameApp.level += 1;
			GameApp.exp = remainexp;
			this.maxExp = GameApp.level*500;
		}
		// this.progressLab.text = GameApp.exp+"/"+this.maxExp;
		this.expMask.width = GameApp.exp/this.maxExp*671;
	}
	private onLevelChange():void{
		this.levelLab.text = "Lv."+GameApp.level ;
	}
	public close():void{
		// this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onUnlockItem,this);
		if(this.watcher1){this.watcher1.unwatch()}
		if(this.watcher2){this.watcher2.unwatch()}
		if(this.watcher3){this.watcher3.unwatch()}
		if(this.watcher4){this.watcher4.unwatch()}
		this.removeTouchEvent(this.helpBtn,this.onHelp);
		// this.addTouchEvent(this.addBtn,this.onOperRecharge,true);
		this.removeTouchEvent(this.rechargeBtn,this.onOperRecharge);
		this.navGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd,this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_BATTLE,this.onClickBattle,this);
		MessageManager.inst().removeListener("CardDataRefresh",this.refreshLockCardList,this);
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);