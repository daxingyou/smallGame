class BagPopUp extends BaseEuiView{

	private sellBtn:eui.Image;
	private totalNum:number = 200;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private btnClose:eui.Image;
	private dataArr:any[] = [];
	//加入卖出的单价是一样的
	private singleCost:number = 1;
	private ownNum:number = 0;
	private content:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = Item;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;

		let ownGoodsNum:string = egret.localStorage.getItem(LocalStorageEnum.GOODS_NUM);
		if(ownGoodsNum){
			this.ownNum = parseInt(ownGoodsNum);
		}
		let dataStr:string = egret.localStorage.getItem(LocalStorageEnum.GOODS);
		if(dataStr){
			let obj = JSON.parse(dataStr);
			for(let key in obj){
				let dataObj = {};
				dataObj["res"] = "item_"+key;
				dataObj["num"] = obj[key];
				this.dataArr.push(dataObj);
			}
		}else{
			this.dataArr = [];
		}
		this.arrayCollect.source = this.dataArr;
		this.addTouchEvent(this.sellBtn,this.onSellAll,true);
		this.addTouchEvent(this.btnClose,this.onClose,true);
	}
	private onSellAll():void{
		if(!this.dataArr.length){return}
		GameApp.ins<GameApp>().role_gold += this.ownNum*this.singleCost;
		egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,GameApp.ins<GameApp>().role_gold.toString());
		egret.localStorage.setItem(LocalStorageEnum.GOODS_NUM,"0");
		egret.localStorage.setItem(LocalStorageEnum.GOODS,"");
		UserTips.ins<UserTips>().showTips("恭喜获得元宝x"+(this.ownNum*this.singleCost));
		this.arrayCollect.source = [];
		this.list.dataProviderRefreshed();
		this.dataArr = [];
	}
	private onClose():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(BagPopUp);
		},this)
		
	}	
	public close():void{
		this.removeTouchEvent(this.btnClose,this.onClose);
		this.removeTouchEvent(this.sellBtn,this.onSellAll);
	}
}
ViewManager.ins<ViewManager>().reg(BagPopUp,LayerManager.UI_Pop);