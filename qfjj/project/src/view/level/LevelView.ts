class LevelView extends BaseEuiView
{
	private close_btn:eui.Button;
	private list:eui.List;
	private scroller:eui.Scroller;
	private rect:eui.Rect;
	private selectGroup:eui.Group;
	public constructor() 
	{
		super();
	}
	public open(...param):void
	{
		this.init();
		this.selectGroup.scaleX = this.selectGroup.scaleY= 0;
		egret.Tween.get(this.selectGroup).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.selectGroup);
		},this)
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		egret.Tween.get(this.selectGroup).to({scaleX:0,scaleY:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.selectGroup);
			ViewManager.inst().close(LevelView);
		},this)
	}
	private init()
	{
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		this.list.itemRenderer = LevelItem;
		this.list.dataProvider = new eui.ArrayCollection(LevelCfg.levelCfgs[LevelCfg.chapter - 1].gq);
	}
	public close():void
	{
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(LevelView,LayerManager.UI_Pop);