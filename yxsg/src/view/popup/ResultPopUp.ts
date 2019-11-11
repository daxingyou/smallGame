class ResultPopUp extends BaseEuiView{
	private sureBtn:eui.Image;
	private _cb:()=>void;
	private _arg:any;
	private againBtn:eui.Image;
	private content:eui.Group;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private expNum:eui.Label;
	private goldNum:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		
		this.list.itemRenderer = Item;
		this.arrayCollect = new eui.ArrayCollection();
		this.list.dataProvider = this.arrayCollect;
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeAllTweens();
			egret.Tween.removeTweens(this.content);
		},this)
		if(param[0].state == 1){
			this.skin.currentState = "win";
			let expNum:number = (Math.random()*200 + 100)>>0;
			this.expNum.text = "+"+expNum
			UserTips.ins<UserTips>().showTips("获得经验x"+expNum);
			GameApp.ins<GameApp>().exp += expNum;
			let goldNum:number = (Math.random()*200 + 100)>>0;
			// let timeout = setTimeout(()=>{
				// clearTimeout(timeout);
				UserTips.ins<UserTips>().showTips("获得元宝x"+goldNum);
				this.goldNum.text = "+"+goldNum;
			// },500)
			GameApp.ins<GameApp>().gold += goldNum;
			let data:any[] = [];
			let resObj:{res:string,attr:Object,resArr:string[],attrArr:any[]} = GlobalFun.getResUrl();
			for(let i:number = 0;i<resObj.resArr.length - 1;i++){
				//刷新背包物品
				let itemnum:number = MapView.ins<MapView>().refreshGoods(resObj.resArr[i],resObj.attrArr[i]["name"],20,20);
				let obj = {
					res:resObj.resArr[i],num:itemnum,itemName:resObj.attrArr[i]["name"]
				}
				data.push(obj);
			}
			this.arrayCollect.source = data;
			this.list.dataProviderRefreshed();

		}else{
			this.skin.currentState = "fail"
		}
		if(param[0].cb){
			this._cb = param[0].cb;
		}
		if(param[0].arg){
			this._arg = param[0].arg;
		}
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.againBtn,this.onAgain,true);
	}
	private onAgain():void{
		
		this.onClose(1);
	}
	private onSure():void{

		this.onClose(0);
	}
	public onClose(num):void{
		this.touchEnabled = false;
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(ResultPopUp);
			if(this._cb && this._arg){
				this._cb.call(this._arg,num);
			}
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.againBtn,this.onAgain);
	}
}
ViewManager.ins<ViewManager>().reg(ResultPopUp,LayerManager.UI_Pop);