class MotionBlends extends BaseEuiView
{
	private tip_label:eui.Label;
	private group:eui.Group;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.tip_label.text = param[0];
		this.group.scaleX = this.group.scaleY = 0;
		egret.Tween.get(this.group).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.group);
		},this)
		this.addTouchEvent(this, ()=>{
			egret.Tween.get(this.group).to({scaleX:0,scaleY:0},600,egret.Ease.circOut).call(()=>{
				ViewManager.inst().close(MotionBlends);
				MessageManager.inst().dispatch("closeStory");
			},this)
		})
	}
	public close():void
	{
		
	}
}
ViewManager.inst().reg(MotionBlends, LayerManager.OPEN_SHOW);