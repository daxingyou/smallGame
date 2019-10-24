class BagPopUp extends BaseEuiView{

	private content:eui.Group;
	private returnBtn:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private descLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.content.scaleX = this.content.scaleY = 0;
		this.content.alpha = 0;
		egret.Tween.get(this.content).to({scaleX:0.8,scaleY:0.8,alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)

		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = BagItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;

		let bagDataStr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_BAG);
		let bagDaga:any[] = [];
		if(bagDataStr){
			bagDaga = JSON.parse(bagDataStr);
		}
		let dataArr:any[] = [];
		for(let i:number = 0;i<bagDaga.length;i++){
			let itemCfg:any = ItemCfg.itemCfg[bagDaga[i].id];
			let obj:any = {
				icon:bagDaga[i].id+"_png",
				num:bagDaga[i].num,
				name:itemCfg.name,
				desc:itemCfg.desc
			}
			dataArr.push(obj)
		}
		this.arrayCollect.source = dataArr;
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		this.descLab.text = evt.item.desc;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0,alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(BagPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(BagPopUp,LayerManager.UI_Pop);