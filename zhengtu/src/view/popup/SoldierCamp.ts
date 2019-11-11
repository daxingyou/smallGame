/**
 * 营地
 * 弓兵 。骑兵 。盾甲兵
 */
class SoldierCamp extends BaseEuiView{
	private content:eui.Group;
	private returnBtn:eui.Image;
	
	private productNumLab:eui.Label;
	private reduceBtn:eui.Image;
	private progressBar:eui.Image;
	private progressMask:eui.Image;
	private titleImg:eui.Image;
	private goodCostLab:eui.Label;
	private woodCostLab:eui.Label;
	private kuangCostLab:eui.Label;
	private quickCostLab:eui.Label;
	private hpLab:eui.Label;
	private atkLab:eui.Label;
	private zhiliLab:eui.Label;
	private soldierNum:eui.Label;
	private quickBtn:eui.Image;
	private productBtn:eui.Image;
	private modelImg:eui.Image;
	private soldierImg:eui.Image;
	private showGroup:eui.Group;

	//单兵加速消耗黄金
	private quickCost:number = 2;
	//生产单个兵需要的时间
	private costTime:number = 3;

	private type:number = -1;
	
	private attr:any;

	private watcher:eui.Watcher;

	private totalImg:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			GlobalFun.guideToNext(this.productBtn,115,31);
		})
		this.type = param[0].type;
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.attr = SoldierAttrCfg.attrCfg[param[0].type];
		this.titleImg.source = `camp_bg_${param[0].type}_png`;
		this.modelImg.source = `model_${param[0].type}_png`;
		this.totalImg.source = `desc_${param[0].type}_png`;
		// if(param[0].type == SoldierType.ARROW){
		// 	this.titleBg.source = "弓兵营";
		// }else if(param[0].type == SoldierType.QI){
		// 	this.titleBg.source = "骑兵营";
		// }else{
		// 	this.titleBg.source = "盾甲兵营";
		// }
		this.hpLab.text = this.attr.hp.toString();
		this.atkLab.text = this.attr.atk.toString();
		this.zhiliLab.text = this.attr.brains.toString();
		this.soldierNum.text = GameApp.inst()["soldier_"+param[0].type];
		this.productNumLab.text = GameApp.inst()["product_"+this.type].toString();
		this.quickCostLab.text = (this.quickCost*GameApp.inst()["product_"+this.type]).toString();
		
		this.showGroup.visible = false;
		this.addTouchEvent(this.productBtn,this.onProduct,true);
		this.addTouchEvent(this.reduceBtn,this.onReduce,true);
		this.addTouchEvent(this.quickBtn,this.onQuick,true);

		this.refreshData();
		this.progressBar.mask = this.progressMask;
		this.progressMask.width = 0;
		// this.watcher = eui.Binding.bindHandler(GameApp,[`m_product_${this.type}`],this.onSoldierProduct,this);
		this.watcher = eui.Binding.bindHandler(GameApp,[`m_product_${this.type}`],this.productWatcher,this);
		if(this.type == SoldierType.ARROW){
			MessageManager.inst().addListener(CustomEvt.PROGRESS_0,this.onSoldierProduct,this);
			
		}else if(this.type == SoldierType.QI){
			MessageManager.inst().addListener(CustomEvt.PROGRESS_1,this.onSoldierProduct,this);
		}else{
			MessageManager.inst().addListener(CustomEvt.PROGRESS_2,this.onSoldierProduct,this);
		}
		MessageManager.inst().addListener(CustomEvt.GUIDE_TRAIN_SOLDIER,this.onTrainSoldier,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLOSE_SOLDIER,this.onCloseSolder,this);
	}
	
	private onCloseSolder():void{
		this.onReturn();
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			MessageManager.inst().dispatch(CustomEvt.GUIDE_TO_NEXT);
		}, 600);
	}
	private onTrainSoldier():void{
		this.onProduct();
		GlobalFun.guideToNext(this.returnBtn,50,50);
	}
	private productWatcher(value:number):void{
		if(value){
			this.showGroup.visible = true;
			this.soldierImg.source = `soldier_${this.type}_png`;
		}else{
			this.showGroup.visible = false;
			this.soldierImg.source = "no_soldier_png"
		}
	}
	private onSoldierProduct(evt:CustomEvt):void{
		let time:number = evt.data.time;
		// egret.Tween.removeTweens(this.progressMask);
		this.progressMask.width = (time/this.costTime)*200;
		// let tarW:number = this.progressMask.width + (1/this.costTime)*182;
		
		if(this.progressMask.width >= 200){
			this.progressMask.width = 0;
		}
		this.refreshData();
	}
	//生产
	private onProduct():void{
		let goodNum:number = (GameApp.inst()["product_"+this.type])
		let goodCost:number = ((goodNum?goodNum:1)*this.attr.goodCost);
		let woodNum:number = GameApp.inst()["product_"+this.type];
		let woodCost:number = ((woodNum?woodNum:1)*this.attr.woodCost);
		let feNum:number = GameApp.inst()["product_"+this.type];
		let kuangCost:number = ((feNum?feNum:1)*this.attr.feCost);
		if(GameApp.m_good < goodCost){
			UserTips.inst().showTips("粮草不足");
			return;
		}
		if(GameApp.m_wood < woodCost){
			UserTips.inst().showTips("木材不足");
			return;
		}
		if(GameApp.m_fe < kuangCost){
			UserTips.inst().showTips("矿产不足");
			return;
		}
		GameApp.inst().good -= goodCost;
		GameApp.inst().wood -= woodCost;
		GameApp.inst().fe -= kuangCost;
		GameApp.inst()["product_"+this.type] += 1;
		this.refreshData();
	}
	//减少
	private onReduce():void{
		if(GameApp.inst()["product_"+this.type] <= 0){
			UserTips.inst().showTips("当前未有士兵在生产");
			return;
		}
		GameApp.inst()["product_"+this.type] -= 1;
		this.refreshData();
	}
	/**加速 */
	private onQuick():void{
		egret.Tween.removeTweens(this.progressMask);
		this.progressMask.width = 0;
		if(!GameApp.inst()["product_"+this.type]){
			UserTips.inst().showTips("当前未有士兵在生产")
			return;
		}
		let cost:number = GameApp.inst()["product_"+this.type]*this.quickCost;
		if(cost > GameApp.inst().gold){
			UserTips.inst().showTips("黄金不足");
			return;
		}
		GameApp.inst().gold -= cost;
		GameApp.inst()["soldier_"+this.type] += GameApp.inst()["product_"+this.type];
		UserTips.inst().showTips("生产完成,获得士兵x"+GameApp.inst()["product_"+this.type]);
		GameApp.inst()["product_"+this.type] = 0;
		this.refreshData();
	}
	/**刷新界面数据 */
	private refreshData():void{
		this.productNumLab.text = GameApp.inst()["product_"+this.type].toString();
		this.quickCostLab.text = (this.quickCost*GameApp.inst()["product_"+this.type]).toString();
		this.goodCostLab.text = (GameApp.inst()["product_"+this.type]*this.attr.goodCost).toString();
		this.woodCostLab.text = (GameApp.inst()["product_"+this.type]*this.attr.woodCost).toString();
		this.kuangCostLab.text = (GameApp.inst()["product_"+this.type]*this.attr.feCost).toString();
		this.soldierNum.text = GameApp.inst()["soldier_"+this.type].toString();
	}	
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(SoldierCamp);
		})
	}
	public close():void{
		if(this.watcher){this.watcher.unwatch()}
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.productBtn,this.onProduct);
		this.removeTouchEvent(this.reduceBtn,this.onReduce);
		this.removeTouchEvent(this.quickBtn,this.onQuick);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_TRAIN_SOLDIER,this.onTrainSoldier,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLOSE_SOLDIER,this.onCloseSolder,this);
		if(this.type == SoldierType.ARROW){
			MessageManager.inst().removeListener(CustomEvt.PROGRESS_0,this.onSoldierProduct,this);
		}else if(this.type == SoldierType.QI){
			MessageManager.inst().removeListener(CustomEvt.PROGRESS_1,this.onSoldierProduct,this);
		}else{
			MessageManager.inst().removeListener(CustomEvt.PROGRESS_2,this.onSoldierProduct,this);
		}
	}
}
ViewManager.inst().reg(SoldierCamp,LayerManager.UI_Pop);