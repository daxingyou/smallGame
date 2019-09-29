class HelpView extends BaseEuiView{
	public constructor() {
		super();
		this.removed = true;
	}
	public open(...param):void{
		this.showClose(HelpView);
	}
	public close():void{
		
	}
}
ViewManager.ins<ViewManager>().reg(HelpView,LayerManager.UI_Main);