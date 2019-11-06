class LevelItem extends BaseView
{
	private id:number = 0;
	private level_font:eui.BitmapLabel;
	private hz_num:eui.Label;
	private jiantou:eui.Image;
	public constructor(_id:number) 
	{
		super();
		this.id = _id;
		this.skinName = "LevelItemSkin";
		this.init();
		this.addTouchEvent(this, this.touchTap);
	}
	private init()
	{
		this.level_font.text = "d " + this.id + " t";
		this.hz_num.text = "" + HighLadderCfg.levelAny[this.id-1].hz_num;
		if(GameApp.medal >= HighLadderCfg.levelAny[this.id-1].hz_num)
		{

		}else 
		{
			GlobalFun.filterToGrey(this);
		}
	}
	private touchTap()
	{
		if(GameApp.medal >= HighLadderCfg.levelAny[this.id-1].hz_num)
		{
			GameApp.curChapter = this.id;
			/**进入游戏 */
			GameMainView.fightingOpen = false;
			// ViewManager.inst().open(BattleView);
			ViewManager.inst().close(HighLadderView);
		}else 
		{
			UserTips.inst().showTips("勋章不足，无法挑战");
		}
	}
}