class TreasureBox extends BaseView
{
	private tiao:eui.Image;
	private box_img:eui.Image;
	private mask_rect:eui.Rect;
	private group:eui.Group;
	public id:number = 0;
	public vis:boolean = true;
	public open:boolean = false;
	public skill:boolean = null;
	public any:any[] = [
		{id:0, img:Math.floor(Math.random() * 10 + 10006)}, 
		{id:1, img:Math.floor(Math.random() * 10 + 10006)},
		{id:2, img:Math.floor(Math.random() * 10 + 10006)},
		{id:3, img:Math.floor(Math.random() * 10 + 10006)},
		{id:4, img:Math.floor(Math.random() * 10 + 10006)}
	]
	public constructor() 
	{
		super();
		this.skinName = "TreasureBoxSkin";
		this.init();
		MessageManager.inst().addListener("OPEN_BOX", this.openThis, this);
		MessageManager.inst().addListener("CLOSE_BOX", this.closeThis, this);
		MessageManager.inst().addListener("BOX_PICKUP", this.pickup, this);
		MessageManager.inst().addListener("GAME_PAUSE", this.gamePause, this);
		MessageManager.inst().addListener("GAME_START", this.gameStart, this);
	}
	private init()
	{
		this.tiao.mask = this.mask_rect;
		this.group.visible = false;
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
	}
	private openThis(evt:CustomEvt)
	{
		if(evt.data == this && this.open == false)
		{
			this.group.visible = true;
			this.open = true;
			egret.Tween.get(this.mask_rect)
			.to({width:53}, 1500)
			.call(()=>{
				this.box_img.source = "box_img_open_png";
				var num = Math.random() * 100;
				if(this.skill == true)
				{
					num = 0;
				}else if(this.skill == false)
				{
					num = 79
				}
				
				if(num < 20)
				{
					this.skill = true;
					MessageManager.inst().dispatch("BOX_SKILL", this);
					AdventureConfig.itemAny.splice(AdventureConfig.itemAny.indexOf(this), 1);
					this.removeMySelf();
				}else if(num < 80)
				{
					this.skill = false;
					MessageManager.inst().dispatch("OPEN_BOX_LIST", this.any);
				}else if(num < 100)
				{
					ViewManager.inst().open(GameView);
					AdventureConfig.itemAny.splice(AdventureConfig.itemAny.indexOf(this), 1);
					this.removeMySelf();
					MessageManager.inst().dispatch("GAME_PAUSE");
				}
			}, this);
		}
	}
	private pickup(evt:CustomEvt)
	{
		if(this.open)
		{
			this.any.splice(this.any.indexOf(evt.data), 1);
			MessageManager.inst().dispatch("OPEN_BOX_LIST", this.any);
			if(this.any.length <= 0)
			{
				AdventureConfig.itemAny.splice(AdventureConfig.itemAny.indexOf(this), 1);
				this.removeMySelf();
			}
		}
	}
	private gamePause()
	{
		egret.Tween.pauseTweens(this.mask_rect);
	}
	private gameStart()
	{
		egret.Tween.resumeTweens(this.mask_rect);
	}
	private closeThis()
	{
		this.group.visible = false;
		this.open = false;
		this.box_img.source = "box_img_png";
		egret.Tween.removeTweens(this.mask_rect);
		this.mask_rect.width = 0;
	}
	private removeMySelf()
	{
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}