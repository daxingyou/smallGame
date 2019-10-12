class StartGameView extends BaseEuiView{
	private goldLab:eui.Label;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private lockGold:number = 500;
	private curLevel:number;
	public constructor() {
		super();
	}
	public open(...param):void{
		eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = LevelItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;

		let dataArr:any[] = [];
		for(let i:number = 1;i<=10;i++){
			let obj:any = {};
			dataArr.push(obj);
		}
		this.arrayCollect.source = dataArr;

		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:LevelItem = this.list.getChildAt(evt.itemIndex) as LevelItem;
		this.curLevel = evt.itemIndex;
		if(item.lockState){
			//当前是锁定状态、
			ViewManager.inst().open(LockPopUp,[{cost:StoryCfg.cfg[this.curLevel].lockcoin,cb:()=>{
				item.lock();
			},arg:this}])
		}else{
			//不是锁定状态 可以游戏
			let desc:string = StoryCfg.cfg[this.curLevel].des;
			let score:string = StoryCfg.cfg[this.curLevel].score;
			ViewManager.inst().open(StartGamePop,[{desc:desc,score:score,cb:()=>{
				ViewManager.inst().open(GameMainView,[{level:this.curLevel}]);
			},arg:this}])
		}
	}
	public close():void{
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Main);