class PropPopUp extends BaseEuiView{

	private content:eui.Group;
	private rect:eui.Rect;
	private sureBtn:eui.Button;
	private cancleBtn:eui.Button;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private curSelectProp:PropItem;
	private scroller:eui.Scroller;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.content.scaleX = this.content.scaleY = 0;
		egret.Tween.get(this.content).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
		this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSureHandler,this);
		this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);

		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = PropItem;
		this.list.dataProvider = this.arrayCollect;

		let propArr:any[] = GlobalFun.getBagData(2)

		
		this.arrayCollect.source = propArr;
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		let self = this;
		let timeout = setTimeout(function() {
			if(propArr && propArr.length){
				self.curSelectProp = self.list.getChildAt(0) as PropItem;
			}
		}, 300);
	}
	private onItemTap(evt:eui.ItemTapEvent):void{
		let len:number = this.list.$children.length;
		if(!len){return}
		if(!this.curSelectProp){
			this.curSelectProp = this.list.getChildAt(0) as PropItem;
		}
		if(this.curSelectProp){
			this.curSelectProp.focus = false;
		}
		let curProp:PropItem = this.list.getChildAt(evt.itemIndex) as PropItem;
		if(curProp){
			curProp.focus = true;
			this.curSelectProp = curProp;
		}
	}	
	private onSureHandler(evt:egret.TouchEvent):void{
		if(!this.curSelectProp){
			UserTips.inst().showTips("未选择锦囊");
			return;
		}
		if(this.curSelectProp.attr.range == 1){
			//作用范围是1的时候
			ViewManager.inst().open(PropUsePopUp,[{attr:this.curSelectProp.attr}]);
		}else{
			//作用在全体
			MessageManager.inst().dispatch(CustomEvt.PROP_USE,{attr:this.curSelectProp.attr,tarIndex:-1});
			this.onClose();
		}
	}
	private onClose():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(PropPopUp);
		},this)
	}
	public close():void{
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
		this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
		this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSureHandler,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
	}
}
ViewManager.inst().reg(PropPopUp,LayerManager.UI_Pop);