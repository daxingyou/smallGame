class ChapterView extends BaseEuiView
{
	// private btn:eui.Button;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.init();
		// this.addTouchEvent(this.btn, ()=>{
		// 	GlobalFun.setLevelDate();
		// })
	}
	private init()
	{
		LevelCfg.getLeveldata();
		// egret.localStorage.clear();
		for(let i = 0; i < LevelCfg.levelCfgs.length; i++)
		{
			var chapter = new ChapterItem(LevelCfg.levelCfgs[i]);
			chapter.x = LevelCfg.levelCfgs[i].x;
			chapter.y = LevelCfg.levelCfgs[i].y;
			chapter["autoSize"]();
			this.addChild(chapter);
		}
	}
	public close():void
	{

	}
	private update()
	{
		
	}
}
ViewManager.inst().reg(ChapterView,LayerManager.UI_Main);