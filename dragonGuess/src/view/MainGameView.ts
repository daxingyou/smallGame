class MainGameView extends BaseEuiView{

	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open():void{
		this.showClose(MainGameView);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = MainGameViewItem;
		let dataPro:any[] = [{img:"select_type_1_png",level:1,title:"사막의 유적"},
		{img:"select_type_2_png",level:2,title:"제국 입구"},{img:"select_type_3_png",level:3,title:"거북궁"}];
		this.arrayCollect.source = dataPro;
		this.list.dataProvider = this.arrayCollect;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:MainGameViewItem = this.list.getChildAt(evt.itemIndex) as MainGameViewItem;
		GameData.level = item.level;
		ViewManager.ins<ViewManager>().open(LevelSelectView,[{level:item.level,title:item.title}],true);
	}
	public close():void{
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.ins<ViewManager>().reg(MainGameView,LayerManager.UI_Main);