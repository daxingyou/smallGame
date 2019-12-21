class CollectSoldierPop extends BaseEuiView{

	/**当前选择的兵种索引 */
	private curSoldierIndex:number = 1;
	//当前选择的距离代表制 100 500 1000 。 1 5 10
	private curDisIndex:number = 1;
	/**100里征兵的单位消耗 */
	private singleCost:number = 100;
	//100里征兵所用单位时间
	private singleTime:number = 60;
	//下次可以刷新的时间
	private nextTime:number = 5*60*1000;
	private timer:egret.Timer;
	private collectState:boolean = false;
	private cdstate:boolean = false;
	/**每次征兵的单位数量 */
	private collectSoldier:number = 120;
	private collectGroup:eui.Group;
	private returnBtn:eui.Image;
	private type_1:eui.CheckBox;
	private type_2:eui.CheckBox;
	private type_3:eui.CheckBox;

	private rect_1:eui.Rect;
	private rect_2:eui.Rect;
	private rect_3:eui.Rect;
	private rect_4:eui.Rect;
	private rect_5:eui.Rect;
	private rect_6:eui.Rect;

	private dis_1:eui.CheckBox;
	private dis_3:eui.CheckBox;
	private dis_8:eui.CheckBox;
	private costLab:eui.Label;

	private getBtn:eui.Image;
	private collectBtn:eui.Image;
	private timeLab:eui.Label;
	private collect_text:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.collectGroup["autoSize"]();
		this.collectGroup.verticalCenter = -700;
		egret.Tween.get(this.collectGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.collectGroup);
		},this)

		let type:string = egret.localStorage.getItem(LocalStorageEnum.COLLECT_SOLDIER_TYPE);
		if(type){
			this.curSoldierIndex = parseInt(type);
			this["type_"+type].selected = true;
		}else{
			this.curSoldierIndex = 1;
			this.type_1.selected = true;
		}
		let distr:string = egret.localStorage.getItem(LocalStorageEnum.COLLECT_SOLDIER_DIS);
		if(distr){
			this.curDisIndex = parseInt(distr);
			this["dis_"+distr].selected = true;
		}else{
			this.dis_1.selected = true;
			this.curDisIndex = 1;
		}
		this.costLab.text = (this.singleCost*this.curDisIndex).toString();
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.collectBtn,this.onCollect,true);
		this.addTouchEvent(this.getBtn,this.onGet,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);

		let cdTime:string = egret.localStorage.getItem(LocalStorageEnum.COLLECT_CD_TIME)
		if(cdTime && parseInt(cdTime) > new Date().getTime()){
			//当前记录的cd时间比现在的时间大 。在cd中
			this.collectState = false;
			this.cdstate = true;
			this.timer.start();
			this.showPageCd();
		}else{
			//不在cd中
			let endTime = egret.localStorage.getItem(LocalStorageEnum.collectTime)
			if(endTime && parseInt(endTime) > new Date().getTime()){
				this.timer.start();
				this.collectState = true;
				this.cdstate = false;
				this.showPageCollect();
			}else{
				this.collectState = false;
				this.cdstate= false;
				if(endTime){
					this.showGetPage();
				}else{
					this.showPageNormal();
				}
			}
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(evt.target == this.rect_1 || evt.target == this.rect_2 || evt.target == this.rect_3){
			let type:string = evt.target.name.split("_")[1];
			this.curSoldierIndex = parseInt(type);
			for(let i:number = 1;i<=3;i++){
				this["type_"+i].selected = false;
			}
			this["type_"+type].selected = true;
		}
		if(evt.target == this.rect_4 || evt.target == this.rect_5 || evt.target == this.rect_6){
			let dis:string = evt.target.name.split("_")[1];
			this.curDisIndex = parseInt(dis);
			this.dis_1.selected = false;
			this.dis_3.selected = false;
			this.dis_8.selected = false;
			this["dis_"+dis].selected = true;
			this.costLab.text = (this.singleCost*this.curDisIndex).toString();
		}
	}
	private onCollect():void{
		this.startCollect();
	}
	private rewards:any = {1:50,3:150,8:400}
	private onGet():void{
		let num:number = this.rewards[this.curDisIndex];
		// GameApp[`soldier${this.curSoldierIndex}Num`] += num;
		// let str:string = this.curSoldierIndex == 1?"弓兵":this.curSoldierIndex == 2?"步兵":"骑兵";
		// UserTips.inst().showTips("获得"+str+"x"+num);
		let card:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.soldier, true);
		let length = Math.floor(Math.random()*card.length);
		let card_id:number = card[length].insId;
		let card_num:number = card[length].ownNum + num;
		GlobalFun.refreshCardData(card_id, {ownNum:card_num});
		UserTips.inst().showTips("获得"+card[length].name+"x"+num);
		this.stopCollect();
	}
	private onReturn():void{
		egret.Tween.get(this.collectGroup).to({verticalCenter:-700},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.collectGroup);
			ViewManager.inst().close(CollectSoldierPop);
		},this)
	}
	private resultCollect():void{
		//结束征兵
		let index:number = parseInt(LocalStorageEnum.COLLECT_SOLDIER_TYPE);
		let dis:number = parseInt(LocalStorageEnum.COLLECT_SOLDIER_DIS);
		let soldierNum:number = dis*(this.collectSoldier + ((Math.random()*15)>>0));
		GameApp[`soldier${index}Num`] += soldierNum;
		UserTips.inst().showTips("获得士兵x"+soldierNum);
		egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_TYPE,"");
		egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_DIS,"");
		egret.localStorage.setItem(LocalStorageEnum.collectTime,"");
	}
	private onTimer():void{
		if(this.collectState){
			//需要显示进度
			let endTime:string = egret.localStorage.getItem(LocalStorageEnum.collectTime);
			if(endTime && parseInt(endTime) > new Date().getTime()){
				let offValue:number = parseInt(endTime) - new Date().getTime();
				let timestr:string = DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
				//显示到文本上
				this.timeLab.text = timestr;
			}else{
				this.timer.stop();
				this.collectBtn.visible = false;
				this.collect_text.visible = false;
				this.getBtn.visible = true;
			}
		}
		if(this.cdstate){
			let endTime:string = egret.localStorage.getItem(LocalStorageEnum.COLLECT_CD_TIME);
			if(endTime && parseInt(endTime) > new Date().getTime()){
				let offValue:number = parseInt(endTime) - new Date().getTime();
				let timestr:string = DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
				//显示到文本上
				this.timeLab.text = "下次征兵:"+timestr;
			}else{
				this.timer.stop();
				this.cdstate = false;
				egret.localStorage.setItem(LocalStorageEnum.COLLECT_CD_TIME,"");
				this.showPageNormal();
			}
		}
	}
	/**显示页面cd状态 */
	private showPageCd():void{
		this.type_1.touchEnabled = false;
		this.type_2.touchEnabled = false;
		this.type_3.touchEnabled = false;
		this.dis_1.touchEnabled = false;
		this.dis_3.touchEnabled = false;
		this.dis_8.touchEnabled = false;
		for(let i:number = 1;i<=6;i++){
			this[`rect_${i}`].touchEnabled = false;
		}
		this.timeLab.visible = true;
		this.collectBtn.visible = true;
		this.collect_text.visible = true;
		this.collect_text.text = "征兵";
		this.getBtn.visible = false;
		this.collectBtn.touchEnabled = false;
		GlobalFun.filterToGrey(this.collectBtn);
	}
	/**显示领取状态 */
	private showGetPage():void{
		this.type_1.touchEnabled = false;
		this.type_2.touchEnabled = false;
		this.type_3.touchEnabled = false;
		this.dis_1.touchEnabled = false;
		this.dis_3.touchEnabled = false;
		this.dis_8.touchEnabled = false;
		for(let i:number = 1;i<=6;i++){
			this[`rect_${i}`].touchEnabled = false;
		}
		this.timeLab.visible = false;
		this.collectBtn.visible = false;
		this.collect_text.visible = false;
		this.getBtn.visible = true;
	}
	/**显示页面正常状态 */
	private showPageNormal():void{
		this.type_1.touchEnabled = true;
		this.type_2.touchEnabled = true;
		this.type_3.touchEnabled = true;
		this.dis_1.touchEnabled = true;
		this.dis_3.touchEnabled = true;
		this.dis_8.touchEnabled = true;
		for(let i:number = 1;i<=6;i++){
			this[`rect_${i}`].touchEnabled = true;
		}
		this.timeLab.visible = false;
		this.collectBtn.visible = true;
		this.collect_text.visible = true;
		this.getBtn.visible = false;
		this.collect_text.text = "征兵";
		this.collectBtn.touchEnabled = true;
		GlobalFun.clearFilters(this.collectBtn);
	}
	/**显示正在征兵状态 */
	private showPageCollect():void{
		this.type_1.touchEnabled = false;
		this.type_2.touchEnabled = false;
		this.type_3.touchEnabled = false;
		this.dis_1.touchEnabled = false;
		this.dis_3.touchEnabled = false;
		this.dis_8.touchEnabled = false;
		for(let i:number = 1;i<=6;i++){
			this[`rect_${i}`].touchEnabled = false;
		}
		this.timeLab.visible = true;
		this.collectBtn.visible = true;
		this.collect_text.visible = true;
		this.getBtn.visible = false;
		this.collect_text.text = "征兵中";
		this.collectBtn.touchEnabled = false;
		GlobalFun.clearFilters(this.collectBtn);
	}
	/**开始征兵 */
	private startCollect():void{
		let cost:number = this.singleCost*this.curDisIndex;
		if(cost > GameApp.goods){
			UserTips.inst().showTips("物资不足");
			return;
		}
		GameApp.goods -= cost;
		MessageManager.inst().dispatch(CustomEvt.COLLECT_START);
		let tolTime:number = new Date().getTime() + this.singleTime * this.curDisIndex*1000;
		egret.localStorage.setItem(LocalStorageEnum.collectTime,tolTime.toString())
		egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_TYPE,this.curSoldierIndex.toString());
		egret.localStorage.setItem(LocalStorageEnum.COLLECT_SOLDIER_DIS,this.curDisIndex.toString());
		this.collectState = true;
		this.timer.start();
		this.showPageCollect();
	}
	/**结束征兵 */
	private stopCollect():void{
		// this.timer.stop();
		this.collectState = false;
		let nextTime:number = new Date().getTime() + this.nextTime;
		//在外面计时的时候也需要存储
		egret.localStorage.setItem(LocalStorageEnum.COLLECT_CD_TIME,nextTime.toString());
		egret.localStorage.setItem(LocalStorageEnum.collectTime,"");
		this.cdstate = true;
		MessageManager.inst().dispatch(CustomEvt.COLLECT_END);
		this.timer.start();
		this.showPageCd();
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.removeTouchEvent(this.collectBtn,this.onCollect);
		this.removeTouchEvent(this.getBtn,this.onGet);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
	}
}
ViewManager.inst().reg(CollectSoldierPop,LayerManager.UI_Pop);