class GameMainView extends BaseEuiView{
	
	private levelLab:eui.Label;
	private progressLab:eui.Label;
	private expMask:eui.Rect;
	private expBar:eui.Image;
	private medalLab:eui.Label;
	private goldLab:eui.Label;
	private addBtn:eui.Image;
	private helpBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;

	private navGroup:eui.Group;
	private boxBtn:eui.Image;
	private shopBtn:eui.Image;
	private backBtn:eui.Image;
	private cardBtn:eui.Image;
	private battleBtn:eui.Image;

	private maxExp:number = 0;

	private cardGroup:eui.Group;
	private cardMask:eui.Rect;

	private shopOpen:boolean = false;
	private fightingOpen:boolean = false;
	private treasureOpen:boolean = false;
	public constructor() {
		super();
	}
	public open(...param):void{
		
		this.maxExp = GameApp.level*500;
		this.expBar.mask = this.expMask;
		this.expMask.width = 0;
		this.addTouchEvent(this.helpBtn,this.onHelp,true);
		this.addTouchEvent(this.addBtn,this.onOperRecharge,true);
		this.navGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = CardItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		this.refreshUnlockCardList();
		eui.Binding.bindProperty(GameApp,["medal"],this.medalLab,"text");
		eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		eui.Binding.bindHandler(GameApp,["exp"],this.onExpChange,this);
		eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);
		this.refreshLockCardList();
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onEnd,this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.cardGroup.mask = this.cardMask;
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardItemTap,this);
		MessageManager.inst().addListener("CardDataRefresh",this.onCardDataRefresh,this);
		let lightMc:MovieClip = new MovieClip();
		lightMc.playFile(`${EFFECT}light`,-1);
		this.addChild(lightMc);
		lightMc.x = StageUtils.inst().getWidth()>>1;
		lightMc.y = this.cardGroup.y + this.cardGroup.height + 200;
	}
	private onCardDataRefresh():void{
		this.refreshLockCardList();
		this.refreshUnlockCardList();
	}
	private onCardItemTap(evt:egret.TouchEvent):void{
		if(evt.target instanceof CardItem){
			let cardVo:CardVo = evt.target.cardVo;
			//打开卡牌详情界面 。cardVo为当前卡牌的数据
			// ViewManager.inst().open()
			ViewManager.inst().open(CultivateView,[{id:cardVo.id}])
		}
	}
	private beginPoint:egret.Point;
	private onBegin(evt:egret.TouchEvent):void{
		if(!this.beginPoint){
			this.beginPoint = new egret.Point();
			this.beginPoint.x = evt.stageX;
			this.beginPoint.y = evt.stageY;
		}
	}
	private onTouchMove(evt:egret.TouchEvent):void{
		if(this.beginPoint){
			let offx:number = evt.stageX - this.beginPoint.x;
			// this.beginPoint.x = evt.stageX;
			// this.beginPoint.y = evt.stageY;
			let direct:number = 0;
			if(Math.abs(offx) >= 5){
				direct = offx > 0?1:-1
				let firstItem:CardItem = this.cardGroup.$children[0] as CardItem;
				let lastItem:CardItem = this.cardGroup.$children[this.cardGroup.numChildren-1] as CardItem;
				if(direct > 0 && firstItem.x>=0 && firstItem.y<=50){
					return;
				}else if(direct < 0 && lastItem.x <= this.cardGroup.width*0.8 && lastItem.y <= 50){
					return
				}
				for(let i:number = 0;i<this.cardGroup.numChildren;i++){
					let item:CardItem = this.cardGroup.getChildAt(i) as CardItem;
					let angle:number = item.m_angle;
					angle += direct*1;
					item.m_angle = angle;
					item.rotation += direct*0.4
					item.x = 450 + Math.cos(angle*Math.PI/180)*900
					item.y = 300 + Math.sin(angle*Math.PI/180)*300
				}
			}
			
		}
	}
	private onEnd():void{
		if(this.beginPoint){
			this.beginPoint = null;
		}
	}
	/**刷新未解锁卡牌列表 */
	public refreshUnlockCardList():void{
		this.arrayCollect.source = GameApp.unlocks;
		this.list.dataProviderRefreshed();
	}
	/**刷新解锁列表 */
	public refreshLockCardList():void{
		let ownCardlistVo:CardVo[] = GameApp.locks;
		this.cardGroup.removeChildren();
		let num:number = -35;
		let angle:number = 235
		for(let key in ownCardlistVo){
			let carditem:CardItem = new CardItem();
			carditem.initData(ownCardlistVo[key],1);
			
			this.cardGroup.addChild(carditem);

			// carditem.anchorOffsetY = carditem.height;
			carditem.m_angle = angle;
			carditem.x = 450 + Math.cos(angle*Math.PI/180)*900;
			carditem.y = 300 + Math.sin(angle*Math.PI/180)*300;
			angle += 14
			carditem.rotation = -12;
			carditem.rotation += parseInt(key)*6;
			// let x:number = -10 + parseInt(key)*155; 
			// if(carditem.rotation >= 0){
			// 	num += 8;
			// }
			
			// let y:number = 77+ parseInt(key)*(num);
			// carditem.x = x;
			// carditem.y = y;
			
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.shopBtn:
				console.log("打开了商城界面")
				if(this.shopOpen)
					return;
				this.closeView();
				ViewManager.inst().open(ShopView);
				this.shopOpen = true;
				break;
			case this.boxBtn:
				console.log("打开了宝箱界面")
				if(this.treasureOpen)
					return;
				this.closeView();
				ViewManager.inst().open(TreasureBox);
				this.treasureOpen = true;
				break;
			case this.backBtn:
				console.log("返回了主界面")
				break;
			case this.cardBtn:
				console.log("打开了卡牌界面")
				this.closeView();
				break;
			case this.battleBtn:
				this.closeView();
				ViewManager.inst().open(HighLadderView);
				// console.log("打开了对战界面")
				// if(this.fightingOpen)
				// 	return;
				
				// ViewManager.inst().open(FightingView);
				// this.fightingOpen = true;
				break;
		}
	}
	private closeView()
	{
		this.fightingOpen = false;
		this.treasureOpen = false;
		this.shopOpen = false;
		ViewManager.inst().close(FightingView);
		ViewManager.inst().close(TreasureBox);
		ViewManager.inst().close(HelpView);
		ViewManager.inst().close(HighLadderView);
		ViewManager.inst().close(ShopView);
	}
	private onOperRecharge():void{
		console.log("打开了内购充值界面")
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
		this.progressLab.text = GameApp.exp+"/"+this.maxExp;
		this.expMask.width = GameApp.exp/this.maxExp*232;
	}
	private onLevelChange():void{
		this.levelLab.text = GameApp.level + "级";
	}
	public close():void{

	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);