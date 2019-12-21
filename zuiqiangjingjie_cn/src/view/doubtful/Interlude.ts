class Interlude extends BaseEuiView
{
	private group:eui.Group;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.group)
		.to({x:-20}, 300, egret.Ease.quintOut)
		.wait(500)
		.call(()=>{
			ViewManager.inst().close(DoubtfulView);
			ViewManager.inst().open(BattleView);
		})
		.to({x:-this.group.width}, 300, egret.Ease.quintIn)
		.call(()=>{
			ViewManager.inst().close(Interlude);
		});
	}
	public close():void{
	}
}
ViewManager.inst().reg(Interlude,LayerManager.TIPS_LAYER);