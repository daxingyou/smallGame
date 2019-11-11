class AnswerPopUp extends BaseEuiView{
	//游戏需要消耗的元宝数
	private singleCost:number = 200;
	
	//答题时间 秒为单位
	private countTime:number = 10;
	//回答正确的经验的奖励值
	private expRewardNum:number = 40;

	private costNumLab:eui.Label;

	private startBtn:eui.Image;
	//答题的数量
	private totalCount:number = 1;
	private curAnswerCount:number = 1;

	//每日答题总次数
	private answerCount:number = 3;

	//answer皮肤状态的变量

	private title:eui.Label;
	private answer:eui.Label;
	private rewardStr:eui.Label;
	private countTimeLab:eui.Label;
	private answer_0:eui.CheckBox;
	private answer_1:eui.CheckBox;
	private answer_2:eui.CheckBox;
	private answer_3:eui.CheckBox;
	private answerLab_0:eui.Label;
	private answerLab_1:eui.Label;
	private answerLab_2:eui.Label;
	private answerLab_3:eui.Label;
	private rect_0:eui.Rect;
	private rect_1:eui.Rect;
	private rect_2:eui.Rect;
	private rect_3:eui.Rect;
	private submitBtn:eui.Image;

	private btnClose:eui.Image;
	private content:eui.Group;
	private answerData:any[] = [];
	private count:number = 10;
	private timer:egret.Timer;
	private selectIndex:number = -1;
	private correctIndex:number;
	private correctNum:number = 0;
	private getExpNum:number = 0;
	private _ifWild:boolean = false;

	private _cb:()=>void;
	private _arg:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		if(param && param.length && param[0].isWild){
			this.singleCost = 0;
			this.totalCount= 1;
			this.expRewardNum = 0;
			this._ifWild = param[0].isWild;
			this._cb = param[0].cb;
			this._arg = param[0].arg;
		}
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
		},this)
		this.title.text = `问题(${this.curAnswerCount}/${this.totalCount})`;
		this.costNumLab.text = this.singleCost.toString();
		this.addTouchEvent(this.startBtn,this.onStart,true);
		this.addTouchEvent(this.submitBtn,this.onSubmit,true);
		this.addTouchEvent(this.btnClose,this.onClose,true);
		
		this.timer = new egret.Timer(1000,this.countTime);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
		let timespan:string = egret.localStorage.getItem(LocalStorageEnum.ANSWER_TIMESPAN);
		if(timespan){
			let nowTime:number = new Date().getTime();
			if(nowTime - parseInt(timespan) >= 24*60*60*1000){
				egret.localStorage.setItem(LocalStorageEnum.ANSWER_COUNT,"");
				egret.localStorage.setItem(LocalStorageEnum.ANSWER_TIMESPAN,"")
			}
		}
		let answerCount:string = egret.localStorage.getItem(LocalStorageEnum.ANSWER_COUNT);
		if(answerCount && parseInt(answerCount) >= this.answerCount){
			this.startBtn.source = "end_answerBtn_png";
		}else{
			this.startBtn.source = "start_answerBtn_png";
		}
		if(this._ifWild){
			this.onStart();
		}
	}	
	private onTap(evt:egret.TouchEvent):void{
		if(this.selectIndex != -1){
			this["answer_"+this.selectIndex].selected = false;
		}
		switch(evt.target){
			case this.rect_0:
				this.selectIndex = 0;
				break;
			case this.rect_1:
				this.selectIndex = 1;
				break;
			case this.rect_2:
				this.selectIndex = 2;
				break;
			case this.rect_3:
				this.selectIndex = 3;
				break;
		}
		if(this.selectIndex != -1){
			this["answer_"+this.selectIndex].selected = true
		}
	}
	private onStart():void{
		let ownGoldNum:number = GameApp.ins<GameApp>().role_gold;
		let answerCount:string = egret.localStorage.getItem(LocalStorageEnum.ANSWER_COUNT);
		let timespan:string = egret.localStorage.getItem(LocalStorageEnum.ANSWER_TIMESPAN);
		if(!this._ifWild){
			if(ownGoldNum < this.singleCost){
				UserTips.ins<UserTips>().showTips("元宝不足");
				return;
			}
			if(answerCount && parseInt(answerCount) >= this.answerCount){
				UserTips.ins<UserTips>().showTips("本日答题完毕");
				return;
			}
			if(timespan){
				let nowTimespan:number = new Date().getTime();
				if(nowTimespan - parseInt(timespan) < 10*60*1000){
					UserTips.ins<UserTips>().showTips(`答题冷却中。。。预计在<font color='0x00ff00'>${DateUtils.getFormatBySecond((parseInt(timespan)+10*60*1000)/1000,DateUtils.TIME_FORMAT_14)}</font>解锁`);
					return;
				}
			}
			egret.localStorage.setItem(LocalStorageEnum.ANSWER_COUNT,(parseInt(answerCount)+1).toString());
			egret.localStorage.setItem(LocalStorageEnum.ANSWER_TIMESPAN,new Date().getTime().toString());
		}
		GameApp.ins<GameApp>().gold -= this.singleCost;
		this.skin.currentState = "answer";
		this.createAnswerData();
		this.refreshQuestion();
		this.timer.start();
		if(this._cb && this._arg){
			this._cb.call(this._arg);
		}
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.count -= 1;
		if(this.count <= 0){
			this.count = 0;
		}
		this.countTimeLab.text = this.count + "s";
	}
	private singleComState:boolean = false;
	private onTimerCom(evt:egret.TimerEvent):void{
		if(this.singleComState){return}
		this.singleComState = true;
		this.curAnswerCount +=1;
		
		this.timer.reset();
		this.timer.stop();
		if(this.curAnswerCount > this.totalCount){
			//本次答题结束
			this.showResult(()=>{
				this.singleComState = false;
				this.onClose();
				if(this._ifWild){
					if(this.wildRewrd.num <= 0){
						UserTips.ins<UserTips>().showTips("很遗憾,未获得奖励")
					}else{
						UserTips.ins<UserTips>().showTips(`获得<font color=0x00ff00>${this.wildRewrd.name}</font>+`+this.wildRewrd.num);
					}
					
				}else{
					UserTips.ins<UserTips>().showTips("本次答题结束,共答对"+this.correctNum+"道题,获得经验x"+this.getExpNum);
				}
			})
		}else{
			this.showResult(()=>{
				this.singleComState = false;
				this.count = this.countTime;
				this.countTimeLab.text = this.count + "s";
				this.refreshQuestion();
				this.timer.start();
			})
			
		}
		if(this.curAnswerCount > this.totalCount){
			this.curAnswerCount = this.totalCount;
		}
		this.title.text = `问题(${this.curAnswerCount}/${this.totalCount})`;
	}
	/**显示结果 */
	private showResult(cb:()=>void):void{
		let self = this;
		if(this.selectIndex == -1 || (this.selectIndex == this.correctIndex)){
			//当前未选择
			if((this.selectIndex == this.correctIndex)){
				if(!this._ifWild){
					UserTips.ins<UserTips>().showTips("恭喜您获得经验x"+this.expRewardNum);
				}
				this.correctDeal();
			}
			this["answerLab_"+this.correctIndex].textColor = "0x00ff00";
			let timeout = setTimeout(()=>{
				clearTimeout(timeout);
				self["answerLab_"+self.correctIndex].textColor = "0x423C3C";
				cb();
			},1000);
		}else if(this.selectIndex != this.correctIndex){
			this["answerLab_"+this.correctIndex].textColor = "0x00ff00";
			this["answerLab_"+this.selectIndex].textColor = "0xff0000";
			let timeout = setTimeout(()=>{
				clearTimeout(timeout);
				self["answerLab_"+self.correctIndex].textColor = "0x423C3C";
				self["answerLab_"+self.selectIndex].textColor = "0x423C3C";
				cb();
			},1000);
		}
	}
	/**刷新题 */
	private refreshQuestion():void{
		this.selectIndex = -1;
		let obj:any = this.answerData.shift();
		this.answer.text = obj.question;
		for(let i:number = 0;i<obj.select.length;i++){
			this["answerLab_"+i].text = obj.select[i];
			this["answerLab_"+i].textColor = 0xA8A3A3;
			this["answer_"+i].selected = false;
		}
		this.expRewardNum = (Math.random()*40 + 40)>>0;
		this.rewardStr.text = this.expRewardNum+"经验";
		this.correctIndex = obj.correct;
	}
	//创建题库数据
	private createAnswerData():void{
		let answerData:QuestionCfg[] = GlobalConfig.QuestionCfg;
		for(let i:number = 0;i<this.totalCount;i++){
			let len:number = Object.keys(answerData).length;
			let index:number = (Math.random()*len + 1)>>0;
			let questionCfg:QuestionCfg = answerData[index];
			let obj:any = {}
			obj["question"] = questionCfg.question;
			obj["select"] = [questionCfg.select_0,questionCfg.select_1,questionCfg.select_2,questionCfg.select_3];
			obj["correct"] = questionCfg.answer;
			this.answerData.push(obj);
		}
	}
	private onSubmit():void{
		if(this.selectIndex == -1){
			UserTips.ins<UserTips>().showTips("请先选择再提交");
			return;
		}
		this.onTimerCom(null);
	}
	private onClose():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
			ViewManager.ins<ViewManager>().close(AnswerPopUp);
		},this)
	}
	private wildRewrd:{name:string,num:number} = {name:"",num:0};
	//回答正确后的判断
	private correctDeal():void{
		// let curExp:number = GameApp.ins<GameApp>().curExp + this.expRewardNum;
		// if(curExp >= GameApp.ins<GameApp>().curLevelMaxExp){
		// 	GameApp.ins<GameApp>().exp = curExp - GameApp.ins<GameApp>().curLevelMaxExp;
		// 	//触发升级 。以下还需要刷新 GameApp.ins<GameApp>().Texp 出发升级相关功能  之后迭代
		// }else{
		if(!this._ifWild){
			GameApp.ins<GameApp>().exp += this.expRewardNum;
			this.getExpNum += this.expRewardNum;
			this.correctNum += 1;
		}else{
			let resObj:{res:string,attr:Object,resArr:string[],attrArr:any[]} = GlobalFun.getResUrl();
			//最后一个为宝箱 所以length -1
			let index:number = (Math.random()*(resObj.resArr.length -1))>>0;
			let itemnum:number = MapView.ins<MapView>().refreshGoods(resObj.resArr[index],resObj.attrArr[index]["name"],10,15);
			this.wildRewrd.name = resObj.attrArr[index]["name"];
			this.wildRewrd.num = itemnum;
		}
			
	}
	public close():void{
		this.removeTouchEvent(this.startBtn,this.onStart);
		this.removeTouchEvent(this.submitBtn,this.onSubmit);
		this.removeTouchEvent(this.btnClose,this.onClose);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerCom,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
	}
}
ViewManager.ins<ViewManager>().reg(AnswerPopUp,LayerManager.UI_Pop);