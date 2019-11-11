/**军需处 */
class TapPopUp extends BaseEuiView{

	private content:eui.Group;
	private returnBtn:eui.Image;
	//物资的运输时间 以及加速消耗 以及生产数量毫秒
	private feTime:number = 20*60*1000;
	private feQuickCost:number = 15;
	private feProductNum:number = 200;
	private woodTime:number = 15*60*1000;
	private woodQuickCost:number = 5;
	private woodProductNum:number = 150;
	private goodTime:number = 30*60*1000;
	private goodQuickCost:number = 30;
	private goodProductNum:number = 300;

	//生铁
	private fe_Pro:eui.Image;
	private fe_mask:eui.Image;
	private feTimeLab:eui.Label;
	private feGetBtn:eui.Image;
	private feQuickGroup:eui.Group;
	private feCostLab:eui.Label;
	private feQuickBtn:eui.Image;
	//木材
	private wood_Pro:eui.Image;
	private wood_mask:eui.Image;
	private woodTimeLab:eui.Label;
	private woodGetBtn:eui.Image;
	private woodQuickGroup:eui.Group;
	private woodCostLab:eui.Label;
	private woodQuickBtn:eui.Image;
	//粮草
	private good_Pro:eui.Image;
	private good_mask:eui.Image;
	private goodTimeLab:eui.Label;
	private goodGetBtn:eui.Image;
	private goodQuickGroup:eui.Group;
	private goodCostLab:eui.Label;
	private timer:egret.Timer;
	private timerStartBoo:boolean;
	private goodQuickBtn:eui.Image;
	//开始收集
	private endFeTime:number = 0;
	private endWoodTime:number = 0;
	private endGoodTime:number = 0;
	private startCollectFe:boolean;
	private startCollectWood:boolean;
	private startCollectGood:boolean;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			if(GameApp.guilding){
				if(GameApp.guildView){
					GameApp.guildView.nextStep({id:GameApp.nextStepId,comObj:this.feGetBtn,width:88,height:31})
				}
			}
		})
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.feCostLab.text = this.feQuickCost.toString();
		this.woodCostLab.text = this.woodQuickCost.toString();
		this.goodCostLab.text = this.goodQuickCost.toString();
		this.addTouchEvent(this.feGetBtn,this.onFeGet,true);
		this.addTouchEvent(this.woodGetBtn,this.onWoodGet,true);
		this.addTouchEvent(this.goodGetBtn,this.onGoodGet,true);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.feQuickBtn.visible = false;
		this.woodQuickBtn.visible = false;
		this.goodQuickBtn.visible = false;
		

		this.fe_Pro.mask = this.fe_mask;
		this.wood_Pro.mask = this.wood_mask;
		this.good_Pro.mask = this.good_mask;

		let feTimestr:string = egret.localStorage.getItem(LocalStorageEnum.FE_TIMESPAN);
		if(feTimestr){this.endFeTime = parseInt(feTimestr);this.feGetBtn.visible = false};
		let woodTimestr:string = egret.localStorage.getItem(LocalStorageEnum.WOOD_TIMESPAN);
		if(woodTimestr){this.endWoodTime = parseInt(woodTimestr);this.woodGetBtn.visible = false}
		let goodTimeStr:string = egret.localStorage.getItem(LocalStorageEnum.GOOD_TIMESPAN);
		if(goodTimeStr){this.endGoodTime = parseInt(goodTimeStr);this.goodGetBtn.visible = false};
		if(feTimestr || woodTimestr || goodTimeStr){
			this.timerStartBoo = true;
			this.timer.start();
		}
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_COLLECT_FE,this.onCollectFe,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_QUICK_FE,this.onQuickFe,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_COLLECT_WOOD,this.onWoodCollect,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_COLLECT_GOOD,this.onGoodCollect,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLOSE_COLLECT,this.onReturn,this);
	}
	//新手引导相关--------------------------
	private onCollectFe():void{
		this.onFeGet();
		GlobalFun.guideToNext(this.feQuickBtn,88,31);
	}
	private onWoodCollect():void{
		this.onWoodGet();
		GlobalFun.guideToNext(this.goodGetBtn,88,31);
	}
	public onGoodCollect():void{
		this.onGoodGet();
		GlobalFun.guideToNext(this.returnBtn,50,50);
	}
	private onQuickFe():void{
		this.feQuickBtn.visible = false;
		GameApp.inst().gold -= this.feQuickCost;
		this.endFeTime = new Date().getTime() - this.feTime;
		this.onTimer();
		GlobalFun.guideToNext(this.woodGetBtn,88,31);
	}
	//------------------------------------
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.feQuickBtn:
				if(this.feQuickCost > GameApp.m_gold){
					UserTips.inst().showTips("黄金不足");
					return;
				}
				this.feQuickBtn.visible = false;
				GameApp.inst().gold -= this.feQuickCost;
				this.endFeTime = new Date().getTime() - this.feTime;
				this.onTimer();
				break;
			case this.woodQuickBtn:
				if(this.woodQuickCost > GameApp.m_gold){
					UserTips.inst().showTips("黄金不足");
					return;
				}
				this.woodQuickBtn.visible = false;
				GameApp.inst().gold -= this.woodQuickCost;
				this.endWoodTime = new Date().getTime() - this.woodTime;
				this.onTimer();
				break;
			case this.goodQuickBtn:
				if(this.goodQuickCost > GameApp.m_gold){
					UserTips.inst().showTips("黄金不足");
					return;
				}
				this.goodQuickBtn.visible = false;
				GameApp.inst().gold -= this.goodQuickCost;
				this.endGoodTime = new Date().getTime() - this.goodTime;
				this.onTimer();
				break;
		}
	}
	private onTimer():void{
		let nowTime:number = new Date().getTime();
		if(this.endFeTime){
			if(this.endFeTime > nowTime){
				this.feGetBtn.visible = false;
				this.feQuickBtn.visible = true;
				this.startCollectFe = true;
				let offsetTime:number = (this.endFeTime - nowTime);
				let timeStr:string = DateUtils.getFormatBySecond(offsetTime/1000,DateUtils.TIME_FORMAT_3);
				this.feTimeLab.text = timeStr;
				this.fe_mask.width = (1-(offsetTime/this.feTime))*146;
			}else{
				//当前运输生铁结束
				this.fe_mask.width = 146;
				this.feTimeLab.text = "00:00";
				this.feGetBtn.visible = true;
				this.feQuickBtn.visible = false;
				this.startCollectFe = false;
				GameApp.inst().fe += this.feProductNum;
				UserTips.inst().showTips("恭喜获得生铁x"+this.feProductNum);
				this.endFeTime = null;
				egret.localStorage.setItem(LocalStorageEnum.FE_TIMESPAN,"");
			}
		}
		
		if(this.endWoodTime){
			if(this.endWoodTime > nowTime){
				this.woodGetBtn.visible = false;
				this.woodQuickBtn.visible = true;
				this.startCollectWood = true;
				let offsetTime:number = (this.endWoodTime - nowTime);
				let timeStr:string = DateUtils.getFormatBySecond(offsetTime/1000,DateUtils.TIME_FORMAT_3);
				this.woodTimeLab.text = timeStr;
				this.wood_mask.width = (1-(offsetTime/this.woodTime))*146;
			}else{
				//当前运输木材结束
				this.wood_mask.width = 146;
				this.woodTimeLab.text = "00:00";
				this.woodGetBtn.visible = true;
				this.woodQuickBtn.visible = false;
				this.startCollectWood = false;
				GameApp.inst().wood += this.woodProductNum;
				UserTips.inst().showTips("恭喜获得木材x"+this.woodProductNum);
				this.endWoodTime = null;
				egret.localStorage.setItem(LocalStorageEnum.WOOD_TIMESPAN,"");
			}
		}
		if(this.endGoodTime){
			if(this.endGoodTime > nowTime){
				this.goodGetBtn.visible = false;
				this.goodQuickBtn.visible = true;
				this.startCollectGood = true;
				let offsetTime:number = (this.endGoodTime - nowTime);
				let timeStr:string = DateUtils.getFormatBySecond(offsetTime/1000,DateUtils.TIME_FORMAT_3);
				this.goodTimeLab.text = timeStr;
				this.good_mask.width = (1-(offsetTime/this.goodTime))*146;
			}else{
				//当前运输粮草结束
				this.good_mask.width = 146;
				this.goodTimeLab.text = "00:00";
				this.goodGetBtn.visible = true;
				this.goodQuickBtn.visible = false;
				this.startCollectGood = false;
				GameApp.inst().good += this.goodProductNum;
				UserTips.inst().showTips("恭喜获得粮草x"+this.goodProductNum);
				this.endGoodTime = null;
				egret.localStorage.setItem(LocalStorageEnum.GOOD_TIMESPAN,"");
			}
		}
		if(!this.startCollectFe || !this.startCollectGood || !this.startCollectWood){
			GameApp.tpxGetState = true;
		}else{
			GameApp.tpxGetState = false;
		}
		if(!this.startCollectFe && !this.startCollectGood && !this.startCollectWood){
			this.timerStartBoo = false;
			this.timer.stop();
		}
	}
	private onFeGet():void{
		this.feGetBtn.visible = false;
		this.feQuickBtn.visible = true;
		this.startCollectFe = true;
		this.endFeTime = new Date().getTime() + this.feTime;
		egret.localStorage.setItem(LocalStorageEnum.FE_TIMESPAN,this.endFeTime.toString());
		if(!this.timerStartBoo){
			this.timerStartBoo = true;
			this.timer.start();
		}
	}
	private onWoodGet():void{
		this.woodGetBtn.visible = false;
		this.woodQuickBtn.visible = true;
		this.startCollectWood = true;
		this.endWoodTime = new Date().getTime() + this.woodTime;
		egret.localStorage.setItem(LocalStorageEnum.WOOD_TIMESPAN,this.endWoodTime.toString());
		if(!this.timerStartBoo){
			this.timerStartBoo = true;
			this.timer.start();
		}
	}
	private onGoodGet():void{
		this.goodGetBtn.visible = false;
		this.goodQuickBtn.visible = true;
		this.startCollectGood = true;
		this.endGoodTime = new Date().getTime() + this.goodTime;
		egret.localStorage.setItem(LocalStorageEnum.GOOD_TIMESPAN,this.endGoodTime.toString());
		if(!this.timerStartBoo){
			this.timerStartBoo = true;
			this.timer.start();
		}
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(TapPopUp);
			GlobalFun.guideToNext();
		})
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.feGetBtn,this.onFeGet);
		this.removeTouchEvent(this.woodGetBtn,this.onWoodGet);
		this.removeTouchEvent(this.goodGetBtn,this.onGoodGet);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_COLLECT_FE,this.onCollectFe,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_QUICK_FE,this.onQuickFe,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_COLLECT_WOOD,this.onWoodCollect,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_COLLECT_GOOD,this.onGoodCollect,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLOSE_COLLECT,this.onReturn,this);
	}
}
ViewManager.inst().reg(TapPopUp,LayerManager.UI_Pop);