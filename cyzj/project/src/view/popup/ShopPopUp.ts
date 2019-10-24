class ShopPopUp extends BaseEuiView{

	public returnBtn:eui.Image;
	private content:eui.Group;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.content.scaleX = this.content.scaleY = 0;
		this.content.alpha = 0;
		egret.Tween.get(this.content).to({scaleX:0.8,scaleY:0.8,alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = ShopItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;

		let dataArr:any[] = [];
		let costs:number[] = [100,150,260,375,470,580,635,765,900];
		for(let i:number = 0;i<9;i++){
			let id:number = 10000 + i;
			let itemCfg:any = ItemCfg.itemCfg[id];
			let obj:any = {
				icon:id+"_png",
				name:itemCfg.name,
				id:id,
				cost:costs[i],
				num:5
			}
			dataArr.push(obj);
		}
		this.arrayCollect.source = dataArr;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0,alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(ShopPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		for(let i:number = 0;i<this.list.$children.length;i++){
			let item:ShopItem = this.list.$children[i] as ShopItem;
			if(item){
				item.dispose();
			}
		}
	}
}
ViewManager.inst().reg(ShopPopUp,LayerManager.UI_Pop);