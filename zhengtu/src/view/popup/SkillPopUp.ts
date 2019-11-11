class SkillPopUp extends BaseEuiView{
	private content:eui.Group;
	private returnBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = SkillItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.horizontalScrollBar.visible = false;
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		let skillCfg:any[] = SkillCfg.skillCfg;
		this.arrayCollect.source = skillCfg;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(SkillPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
	}	
}
ViewManager.inst().reg(SkillPopUp,LayerManager.UI_Pop);