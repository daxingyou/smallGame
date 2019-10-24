class HighLadderView extends BaseEuiView
{
	private gold_group0:eui.Group;
	private gold_label0:eui.Label;
	private keling0:eui.Label;
	private xu_group0:eui.Group;
	private xu_label0:eui.Label;

	private gold_group1:eui.Group;
	private gold_label1:eui.Label;
	private keling1:eui.Label;
	private xu_group1:eui.Group;
	private xu_label1:eui.Label;

	private lingqu_btn:eui.Image;
	private tiaozhan:eui.Image;

	private close_btn:eui.Rect;
	private map_mask:eui.Rect;
	private map_group:eui.Group;

	private num:number = 1000;
	private level:number = 1;
	private jiang0:number = 0;
	private jiang1:number = 1;
	private jiang_id:number = 1;
	private dian:number = 3000;
	private jiang_bool0:boolean = false;
	private jiang_bool1:boolean = false;
	private oy:number;
	private ny:number;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		this.addTouchEvent(this, this.touchTap);
		this.map_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.map_group.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.map_group.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
		this.map_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.map_group.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.map_group.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
	}
	private init()
	{
		for(let i = 0; i < HighLadderCfg.levelAny.length; i++)
		{
			if(HighLadderCfg.levelAny[i].hz_num <= GameApp.medal)
			{
				HighLadderCfg.openLevel_max = HighLadderCfg.levelAny[i].id;
			}
		}
		for(let j = 0; j < HighLadderCfg.levelAny.length; j++)
		{
			var item = new LevelItem(HighLadderCfg.levelAny[j].id);
				item.x = HighLadderCfg.levelAny[j].x;
				item.y = HighLadderCfg.levelAny[j].y;
			this.map_group.addChild(item);
		}
		if(egret.localStorage.getItem("jiang0"))
		{
			this.jiang0 = parseInt(egret.localStorage.getItem("jiang0"));
			this.jiang1 = parseInt(egret.localStorage.getItem("jiang1"));
			this.jiang_id = parseInt(egret.localStorage.getItem("jiang_id"));
		}
		this.map_group.mask = this.map_mask;
		this.updateJiang();
	}
	private touchBegin(evt:egret.TouchEvent)
	{
		this.oy = this.ny = evt.stageY;
	}
	private touchMove(evt:egret.TouchEvent)
	{
		this.ny = evt.stageY;
		this.map_group.y += (this.ny - this.oy);
		if(this.map_group.y >= this.map_mask.y)
		{
			this.map_group.y = this.map_mask.y;
		}else if(this.map_group.y <= this.map_mask.y - (this.map_group.height - this.map_mask.height))
		{
			this.map_group.y = this.map_mask.y - (this.map_group.height - this.map_mask.height);
		}
		this.oy = this.ny;
	}
	private touchEnd(evt:egret.TouchEvent)
	{
		this.oy = this.ny = 0;
	}
	private updateJiang()
	{
		if(GameApp.medal >= HighLadderCfg.cfg[this.jiang0].dian)
		{
			this.xu_group0.visible = false;
			this.keling0.visible = true;
			this.jiang_bool0 = true;
		}

		if(GameApp.medal >= HighLadderCfg.cfg[this.jiang1].dian)
		{
			this.xu_group1.visible = false;
			this.keling1.visible = true;
			this.jiang_bool1 = true;
		}

		if(this.keling0.visible == true || this.keling1.visible == true)
		{
			this.lingqu_btn.visible = true;
		}else
		{
			this.lingqu_btn.visible = false;
		}

		this.xu_label0.text = "需" + HighLadderCfg.cfg[this.jiang0].dian + "点";
		this.gold_label0.text = HighLadderCfg.cfg[this.jiang0].gold;

		this.xu_label1.text = "需" + HighLadderCfg.cfg[this.jiang1].dian + "点";
		this.gold_label1.text = HighLadderCfg.cfg[this.jiang1].gold;

		egret.localStorage.setItem("jiang0", this.jiang0 + "");
		egret.localStorage.setItem("jiang1", this.jiang1 + "");
		egret.localStorage.setItem("jiang_id", this.jiang_id + "");
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.tiaozhan:
				/**挑战 */
				
				break;
			case this.lingqu_btn:
				if(this.jiang_bool0)
				{
					this.jiang_bool0 = false;
					GameApp.gold += HighLadderCfg.cfg[this.jiang0].gold;
					this.jiang0 = this.jiang_id + 1;
					this.jiang_id++;
					this.xu_group0.visible = true;
					this.keling0.visible = false;
					this.updateJiang();
				}
				if(this.jiang_bool1)
				{
					this.jiang_bool1 = false;
					GameApp.gold += HighLadderCfg.cfg[this.jiang1].gold;
					this.jiang1 = this.jiang_id + 1;
					this.jiang_id++;
					this.xu_group1.visible = true;
					this.keling1.visible = false;
					this.updateJiang();
				}
				break;
			case this.close_btn:
				ViewManager.inst().close(HighLadderView);
				break;
		}
	}
}
ViewManager.inst().reg(HighLadderView,LayerManager.UI_Pop);