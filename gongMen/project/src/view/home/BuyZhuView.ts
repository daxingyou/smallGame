class BuyZhuView extends BaseEuiView
{
	private confirm_img:eui.Image;
	private back_img:eui.Image;
	private sub_btn:eui.Image;
	private add_btn:eui.Image;
	private gold_label:eui.Label;
	private num_label:eui.Label;
	private gold_num:number = 100;
	private num_num:number = 1;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.gold_label.text = "" + this.gold_num;
		this.num_label.text = "" + this.num_num;
		this.addTouchEvent(this, this.touchTap);
	}
	public close():void{
		
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.back_img:
				ViewManager.inst().close(BuyZhuView);
				break;
			case this.sub_btn:
				this.num_num--;
				if(this.num_num <= 1)
				{
					this.num_num = 1;
				}
				this.gold_label.text = "" + (this.gold_num * this.num_num);
				this.num_label.text = "" + this.num_num;
				break;
			case this.add_btn:
				this.num_num++;
				this.gold_label.text = "" + (this.gold_num * this.num_num);
				this.num_label.text = "" + this.num_num;
				break;
			case this.confirm_img:
				if(GameConfig.gold >= (this.gold_num * this.num_num))
				{
					GameConfig.gold -= (this.gold_num * this.num_num);
					GameConfig.zhu += this.num_num;
				}else
				{
					UserTips.inst().showTips("金币不足");
				}
				break;
		}
	}
}
ViewManager.inst().reg(BuyZhuView,LayerManager.UI_Pop);