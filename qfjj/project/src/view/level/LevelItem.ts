class LevelItem extends eui.ItemRenderer
{
	private img:eui.Image;
	private level_label:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "LevelItemSkin";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	protected dataChanged(): void
	{
		this.img.source = "level_s_" + this.data.gq_id + "_png";
		if(this.data.state == 1){
			GlobalFun.clearFilters(this);
		}else{
			GlobalFun.filterToGrey(this);
		}
		
		this.level_label.text = "" + LevelCfg.chapter + " - " + this.data.gq_id;
	}
	private touchTap()
	{
		if(this.data.state == 0)
		{
			UserTips.inst().showTips("关卡未开启")
		}else
		{
			// console.log("打开关卡");
			LevelCfg.gq = this.data.gq_id;
			ViewManager.inst().close(ChapterView);
			ViewManager.inst().close(LevelView);
			ViewManager.inst().open(BattleView,[{blevel:LevelCfg.chapter,slevel:LevelCfg.gq}]);
			let str:string = "";
			if(LevelCfg.chapter == 1 && LevelCfg.gq == 1){
				str = "入侵的恐怖分子占领了诺曼工业区,为了解救被困的工人,现在你在进行前线侦查,遇到了敌人的埋伏。为了防止计划泄露,必须在这里消灭它们。"
			}else if(LevelCfg.chapter == 1 && LevelCfg.gq == 2){
				str = "在返回基地途中遇到了敌方的追兵,要把情报完好无损带回去,必须在这里拦截敌人的追击."
			}
			if(str){
				ViewManager.inst().open(MotionBlends, [str]);
			}else{
				MessageManager.inst().dispatch("closeStory")
			}
			
		}
	}
}