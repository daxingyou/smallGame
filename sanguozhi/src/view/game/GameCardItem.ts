class GameCardItem extends eui.ItemRenderer
{
	private icon_img:eui.Image;
	private quality_img:eui.Image;
	private shang:eui.Image;
	private num_label:eui.Label;
	public constructor() 
	{
		super();
		this.skinName = "GameCardItemSkin";
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTap, this);
	}
	protected dataChanged(): void
	{
		this.icon_img.source = "doubtful_" + this.data.insId + "_png";
		this.quality_img.source = "quality_" + this.data.quality + "_png"
		if(this.data.type == CardType.soldier)
		{
			this.num_label.text = this.data.ownNum;
			this.num_label.visible = true;
		}
		for(let i = 0; i < 3; i++)
		{
			if(GameApp.ownSolderis[i].generalId == this.data.insId)
			{
				this.shang.visible = true;
			}
		}
	}
	private touchBegin(evt:egret.TouchEvent)
	{
		for(let i = 0; i < 3; i++)
		{
			if(GameApp.ownSolderis[i].generalId == this.data.insId)
			{
				UserTips.inst().showTips("不可重复上阵");
				return;
			}
		}
		if(this.data.type == CardType.general)
		{	
			if(GameCfg.gameStart)
			{
				UserTips.inst().showTips("对战进行中无法选择武将！");
				return;
			}
			MessageManager.inst().dispatch(LocalStorageEnum.DOUBTFUL_MOVE_ROLE, {card:this.data.insId, x:evt.stageX, y:evt.stageY});
		}else if(this.data.type == CardType.soldier)
		{
			// MessageManager.inst().dispatch(CustomEvt.SHOP_INTRODUCE,this.data);
			// UserTips.inst().showTips("无法使用！");
			MessageManager.inst().dispatch(LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER, {data:this.data, evt:evt});
		}
	}
	private touchTap()
	{
		if(this.data.type == CardType.build || this.data.type == CardType.prop || this.data.type == CardType.skill || this.data.type == CardType.special_skill)
		{
			console.log(this.data);
			let obj:any[]=[];
			obj.push(this.data);
			ViewManager.inst().open(IntroduceView,obj);
		}
	}
}