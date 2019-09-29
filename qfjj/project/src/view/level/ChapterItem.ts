class ChapterItem extends BaseView
{
	private img:eui.Image;
	private data:any;
	// private name_label:eui.Label;
	public constructor(_data:any) 
	{
		super();
		this.data = _data;
		this.skinName = "ChapterItemSkin";
		this.init();
		this.addTouchEvent(this, this.touchTap);
		MessageManager.inst().addListener("UPDATE_CHAPTER", this.update, this);
	}
	private init()
	{
		if(this.data.state == 1){
			GlobalFun.clearFilters(this);
		}else{
			GlobalFun.filterToGrey(this);
		}
		this.img.source = "level_" + this.data.chapter_id + "_png";
		
		// this.name_label.text = this.data.chapter_name;
	}
	private touchTap()
	{
		if(this.data.state == 0)
		{
			UserTips.inst().showTips("章节未开启");
		}else
		{
			console.log("打开章节");
			LevelCfg.chapter = this.data.chapter_id;
			ViewManager.inst().open(LevelView);
		}
	}
	private update()
	{
		// GlobalFun.clearFilters(this);
		// this.img.source = "chapter_icon" + this.data.state + "_png";
	}
}