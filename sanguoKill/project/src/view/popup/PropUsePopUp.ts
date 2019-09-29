class PropUsePopUp extends BaseEuiView{
	private returnBtn:eui.Image;
	private list:eui.List;
	private titleLab:eui.Label;
	private arrayCollect:eui.ArrayCollection;
	private curUseCardAttr:any;
	private selectItem:PropUseItem;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.arrayCollect = new eui.ArrayCollection();

		this.curUseCardAttr = param[0].attr;
		this.list.itemRenderer = PropUseItem;
		this.list.dataProvider = this.arrayCollect;

		let arr:any[] = [];
		let deadstate:number[] = [];
		if(this.curUseCardAttr.forTar == Camp.owner){
			//作用与己方
			this.titleLab.text = "请选择一员大将";
			arr = GlobalFun.getTestRoleData();
			deadstate = deadstate.concat(GameApp.ownDeadState);
		}else{
			this.titleLab.text = "请选择一名敌方";
			arr = GlobalFun.getEnemyTestData();
			deadstate = deadstate.concat(GameApp.levelDeadState);
		}
		let dataArr:any[]= [];
		let first:boolean = false;
		for(let i:number = 0;i<arr.length;i++){
			let obj = {
				icon:arr[i].icon,
				isDead:!!deadstate[i],
				focus:false
			}
			if(this.curUseCardAttr.forTar == Camp.anamy){
				obj.icon = `${LEVEL_ICON}level_${arr[i].level}_${i}.jpg`
			}
			if(!first && !obj.isDead){
				first = true;
				obj.focus = true;
			}
			dataArr.push(obj);
		}
		let newarr:any[] = [dataArr[1],dataArr[0],dataArr[2]];
		this.arrayCollect.source = newarr;
		this.returnBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
		
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);

		let self = this;
		let timeout = setTimeout(function() {
			self.selectItem = self.list.getChildAt(0) as PropUseItem;
		}, 300);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		if(this.selectItem){
			this.selectItem.focus = false;
		}
		let item:PropUseItem = this.list.getChildAt(evt.itemIndex) as PropUseItem;
		if(item){
			item.focus = true;
			this.selectItem = item;
		}
		MessageManager.inst().dispatch(CustomEvt.PROP_USE,{attr:this.curUseCardAttr,tarIndex:evt.itemIndex});
		ViewManager.inst().close(PropPopUp);
		this.onReturn();
	}
	private onReturn():void{
		ViewManager.inst().close(PropUsePopUp);
	}
	public close():void{
		this.returnBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(PropUsePopUp,LayerManager.UI_Pop);

class PropUseItem extends eui.ItemRenderer{

	private roleImg:eui.Image;
	private focusImg:eui.Image;
	private _isDead:boolean = false;
	public constructor(){
		super()
		this.skinName = "PropUseItemSkin";
	}
	protected dataChanged():void{
		this.roleImg.source = this.data.icon;
		this.focus = this.data.focus;
		this._isDead = this.data.isDead;
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public set focus(value:boolean){
		this.focusImg.visible = value;
	}
}