class StartGameView extends BaseEuiView{

	private levelPage:eui.Image;
	private unlockLab:eui.Label;
	private manBtn:eui.Image;
	private womanGroup:eui.Group;
	private openLab:eui.Image;
	private watcher:eui.Watcher;
	private levels:number[] = [2,4,6,8,10,12]
	public constructor() {
		super();
	}
	public open(...param):void{
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.watcher = eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);
	}
	private onLevelChange():void{
		this.openLab.visible = (GameApp.level < 10);
		let level:number = (GameApp.level/2)>>0;
		let nextOpenLevel:number;
		let index:number = 0;
		for(let i:number = 0;i<this.levels.length;i++){
			if(GameApp.level <  this.levels[i] ){
				nextOpenLevel = this.levels[i];
				index = i+1;
				break;
			}
		}
		if(nextOpenLevel){
			this.unlockLab.text = `还差${nextOpenLevel-GameApp.level}关,解锁${index+1}级渣男`
		}else{
			this.unlockLab.visible = false;
		}
		this.levelPage.source = `page_show_${level+1}_jpg`;

	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.womanGroup:
				GameApp.progress = 2;
				if(GameApp.level < 10){
					UserTips.inst().showTips("请先玩男友版升到10级,才开放哦");
					return;
				}
				ViewManager.inst().open(GameMainView,[{state:2}])
				break;
			case this.manBtn:
				GameApp.progress = 1;
				ViewManager.inst().open(GameMainView,[{state:1}])
				break;
		}
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		if(this.watcher){this.watcher.unwatch()}
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Main);