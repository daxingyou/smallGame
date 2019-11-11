/**
 * 征收界面
 */
class TaxPopUp extends BaseEuiView{

	private content:eui.Group;
	private returnBtn:eui.Image;
	private market_collect:eui.Image;
	private field_collect:eui.Image;
	private field_mask:eui.Rect;
	private field_pro:eui.Image;
	private market_mask:eui.Rect;
	private market_pro:eui.Image;

	private singleMarket:number = 1;

	private singleField:number = 1;

	private maxTime:number = 30*60*1000;
	private singleTime:number = 60*1000;

	private marketNumLab:eui.Label;
	private fieldNumLab:eui.Label;
	private marketStartTime:number ;
	private fieldStartTime:number ;

	private timer:egret.Timer;

	private fieldTimeLab:eui.Label;
	private marketTimeLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.market_collect,this.onMarketCollect,true);
		this.addTouchEvent(this.field_collect,this.onFieldCollect,true);
		
		let marketInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.MARKET_INFO);
		if(marketInfoStr){
			this.marketStartTime = parseInt(marketInfoStr);
		}
		let fieldInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.FIELD_INFO); 
		if(fieldInfoStr){
			this.fieldStartTime = parseInt(fieldInfoStr);
		}
		this.market_pro.mask = this.market_mask;
		this.field_pro.mask =  this.field_mask;
		this.refreshview();
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.start();
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.refreshview();
	}
	/**界面刷新 */
	private refreshview():void{
		this.fieldNumLab.text = this.refreshItem(this.fieldStartTime,this.field_mask,LocalStorageEnum.FIELD_INFO,this.fieldTimeLab,1).toString();
		this.marketNumLab.text = this.refreshItem(this.marketStartTime,this.market_mask,LocalStorageEnum.MARKET_INFO,this.marketTimeLab,2).toString();
	}
	private refreshItem(param1,mask,localStr,label,id):number{
		let num:number = 0;
		if(param1){
			let startTimespan:number = param1;
			let newtime:number = new Date().getTime();
			let offvalue:number = newtime - startTimespan;
			if(offvalue >= this.maxTime){
				offvalue = this.maxTime;
			}
			let percent:number = offvalue/this.maxTime;
			mask.width = percent*273;
			num = ((offvalue/this.singleTime)>>0)*this.singleField;
			let timeSpan:number = this.maxTime - offvalue;
			label.text = DateUtils.getFormatBySecond(timeSpan/1000,DateUtils.TIME_FORMAT_3);
		}else{
			mask.width = 0;
			if(id == 1){
				this.fieldStartTime = new Date().getTime();
				egret.localStorage.setItem(localStr,this.fieldStartTime.toString());
			}else{
				this.marketStartTime = new Date().getTime();
				egret.localStorage.setItem(localStr,this.marketStartTime.toString());
			}
			label.text = DateUtils.getFormatBySecond(this.maxTime/1000,DateUtils.TIME_FORMAT_3);
		}
		return num;
	}
	/**集市征收 */
	private onMarketCollect():void{
		if(parseInt(this.marketNumLab.text) <= 0){
			UserTips.ins<UserTips>().showTips("未有物品可以征收")
			return;
		}
		this.marketStartTime = new Date().getTime();
		this.addItemToBag("gold_icon_png","五铢钱",parseInt(this.marketNumLab.text),LocalStorageEnum.MARKET_INFO,this.marketStartTime);
	}
	/**田野征收 */
	private onFieldCollect():void{
		if(parseInt(this.fieldNumLab.text) <= 0){
			UserTips.ins<UserTips>().showTips("未有物品可以征收")
			return;
		}
		this.fieldStartTime = new Date().getTime();
		this.addItemToBag("gem_icon_png","粮草",parseInt(this.fieldNumLab.text),LocalStorageEnum.FIELD_INFO,this.fieldStartTime);
	}
	/**添加物品到背包 */
	private addItemToBag(res:string,name:string,num:number,localstr:string,localval:number):void{
		MapView.ins<MapView>().refreshGoods(res,name,20,20,num);
		egret.localStorage.setItem(localstr,localval.toString());
		this.refreshview();
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(TaxPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.market_collect,this.onMarketCollect);
		this.removeTouchEvent(this.field_collect,this.onFieldCollect);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.marketStartTime= null;
		this.fieldStartTime = null;
	}
}
ViewManager.ins<ViewManager>().reg(TaxPopUp,LayerManager.UI_Pop);