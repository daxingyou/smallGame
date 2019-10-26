class GameMainView extends BaseEuiView{

	private returnBtn:eui.Image;
	private healtNumLab:eui.Label;
	private gemNumLab:eui.Label;
	private levelLab:eui.Label;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private prevBtn:eui.Image;
	private nextBtn:eui.Image;
	private pageLab:eui.Label;
	private healthWatcher:eui.Watcher;
	private gemWatcher:eui.Watcher;
	private timeWatcher:eui.Watcher;
	private scroller:eui.Scroller;
	private countTimeLab:eui.Label;
	private addBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.returnBtn,this.onReturn,true)
		this.arrayCollect = new eui.ArrayCollection();

		this.healthWatcher = eui.Binding.bindHandler(GameApp,["health"],this.healthChange,this);
		this.gemWatcher = eui.Binding.bindProperty(GameApp,["gem"],this.gemNumLab,"text");
		this.timeWatcher = eui.Binding.bindHandler(GameApp,["time"],this.timeChange,this);
		let curChapter:ChapterCfg[] = GlobalConfig.ChapterCfg[GameApp.progress]
		this.list.itemRenderer = StoryItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;
		this.arrayCollect.source = curChapter;
		this.levelLab.text = "等级:"+ (GameApp.progress == 1?GameApp.level:GameApp.womanLevel);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.addTouchEvent(this.addBtn,this.onOpenShop,true);
		let tileLayout:eui.TileLayout = new eui.TileLayout();
		// <e:TileLayout ="contentJustify" rowAlign="justifyUsingGap" columnAlign="left" horizontalGap="0"/>
		tileLayout.horizontalAlign = "contentJustify";
		tileLayout.rowAlign = "justifyUsingGap";
		tileLayout.columnAlign = "justifyUsingGap";
		tileLayout.requestedColumnCount = 3;
		if(document.documentElement.clientWidth <= 414){
			tileLayout.requestedColumnCount = 2;
		}
		this.list.layout = tileLayout;
	}
	private onOpenShop():void{
		ViewManager.inst().open(ShopPop);
	}
	private timeChange():void{
		if(GameApp.time <= 0){
			this.countTimeLab.visible = false;
		}else{
			this.countTimeLab.visible = true;
			this.countTimeLab.text = `(${DateUtils.getFormatBySecond(10*60 - GameApp.time,DateUtils.TIME_FORMAT_3)}后+1)`
		}
	}
	private healthChange():void{
		this.healtNumLab.text = GameApp.health.toString();
		if(GameApp.health >= 25){
			GameApp.inst().stopRecover();
		}else{
			GameApp.inst().startRecover();
		}
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:StoryItem = this.list.getChildAt(evt.itemIndex) as StoryItem;
		if(item.ifLock){
			UserTips.inst().showTips("请先通关上一个关卡");
			return;
		}
		ViewManager.inst().open(StoryView,[{data:evt.item}])
		// ViewManager.inst().close(GameMainView);
	}
	private onReturn():void{
		let view:ShopPop = ViewManager.inst().getView(ShopPop) as ShopPop;
		let storyView:StoryView = ViewManager.inst().getView(StoryView) as StoryView;
		if(view){
			ViewManager.inst().close(ShopPop);
		}else if(storyView){
			ViewManager.inst().close(StoryView);
		}
		else{
			ViewManager.inst().close(GameMainView);
		}
		
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		if(this.healthWatcher){this.healthWatcher.unwatch()}
		if(this.gemWatcher){this.gemWatcher.unwatch()}
		if(this.timeWatcher){this.timeWatcher.unwatch()}
		this.removeTouchEvent(this.addBtn,this.onOpenShop);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);