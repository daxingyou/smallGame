class TaxPopUp extends BaseEuiView{
	private timer:egret.Timer;

	private goodsLab:eui.Label;
	private returnBtn:eui.Image;
	private timeLab:eui.Label;
	private taxGroup:eui.Group;
	private collectBtn:eui.Image;
	private getBtn:eui.Image;
	private maxTime:number = 30*60;
	//Output per second
	private singleCost:number = 5;
	private count:number = 0;
	private goodsNum:number = 0;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.taxGroup["autoSize"]();
		this.taxGroup.verticalCenter = -700;
		egret.Tween.get(this.taxGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.taxGroup);
		},this)
		this.goodsNum = 0;
		this.goodsLab.text = "x0";
		this.addTouchEvent(this.collectBtn,this.onCollect,true);
		this.addTouchEvent(this.getBtn,this.onGet,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);

		let cdTime:string = egret.localStorage.getItem(LocalStorageEnum.TAX_CD_TIME)

		if(cdTime && parseInt(cdTime) > new Date().getTime()){
			//Currently recordedcdTime is greater than now 。staycdin 
			let offValue:number = parseInt(cdTime) - new Date().getTime();
			let timestr:string = DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
			//Show on text
			this.timeLab.text = timestr;
			this.goodsNum = (600 - ((Math.ceil(offValue/60000))*20));
			this.goodsLab.text = "x"+ this.goodsNum;
			this.timer.start();
			this.showTaxCd();
		}else{
			if(cdTime){
				this.goodsNum = 600;
				this.goodsLab.text = "x"+(600).toString();
				this.showGetPage();
			}else{
				this.showNormalPage();
			}
		}
		// let endTime = egret.localStorage.getItem(LocalStorageEnum.mainTaxTimespan);
		// if(endTime && parseInt(endTime) > new Date().getTime()){
		// 	this.timer.start();
		// }
	}
	private onCollect():void{
		this.startTax();
	}
	private onGet():void{
		
		if(!this.goodsNum){
			UserTips.inst().showTips("Materials not currently collected");
			return;
		}
		// this.stopTax();
		egret.localStorage.setItem(LocalStorageEnum.TAX_CD_TIME,"");
		this.showNormalPage();
		UserTips.inst().showTips("Collection to materialsx"+this.goodsNum);
		GameApp.goods += this.goodsNum;
		this.goodsNum = 0;
		this.goodsLab.text = "x0";
	}
	/**Display collection */
	private showTaxCd():void{
		this.collectBtn.visible = false;
		this.getBtn.visible = false;
	}
	/**Display normal status interface */
	private showNormalPage():void{
		this.collectBtn.visible = true;
		this.getBtn.visible = false;
	}
	/**Display receiving status */
	private showGetPage():void{
		this.collectBtn.visible = false;
		this.getBtn.visible = true;
	}
	/**Starting taxes */
	private startTax():void{
		//Click collect 。Start full time
		let endTime:number = new Date().getTime() + this.maxTime*1000;//10Minute;
		egret.localStorage.setItem(LocalStorageEnum.TAX_CD_TIME,endTime.toString());
		this.getBtn.visible = false;
		this.collectBtn.visible = false;
		this.timer.start();
		this.showTaxCd();
		//Need to switch interface button status
		MessageManager.inst().dispatch(CustomEvt.TAX_START);
	}
	/**End collection */
	private stopTax():void{
		this.timer.stop();
		this.timeLab.text = "00:00";
		//Need to switch interface button status;
		// this.showNormalPage();
		MessageManager.inst().dispatch(CustomEvt.TAX_END);
	}
	private onTimer():void{
		let endTime:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.TAX_CD_TIME));
		if(endTime > new Date().getTime()){
			let offValue:number = endTime - new Date().getTime();
			let timestr:string = DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
			//Show on text
			this.timeLab.text = timestr;
			this.goodsNum = (600 - ((Math.ceil(offValue/60000))*20));
			this.goodsLab.text = "x"+this.goodsNum;
		}else{
			this.goodsNum = 600;
			this.goodsLab.text = "x"+(600).toString();
			this.stopTax();
			this.showGetPage();
		}
	}
	private onReturn():void{
		egret.Tween.get(this.taxGroup).to({verticalCenter:-700},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.taxGroup);
			ViewManager.inst().close(TaxPopUp);
		},this);
	}
	public close():void{
		this.removeTouchEvent(this.getBtn,this.onGet);
		this.removeTouchEvent(this.collectBtn,this.onCollect);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
	}
}
ViewManager.inst().reg(TaxPopUp,LayerManager.UI_Pop);