class NeiWuPopUp extends BaseEuiView{

	private option:any;
	private tip:string;
	private items:NeiWuStoryItem[] = [];
	private timer:egret.Timer;
	private storyGroup:eui.Group;
	private returnBtn:eui.Image;
	private neiwuGroup:eui.Group;
	private noneGroup:eui.Group;
	private timeLab:eui.Label;
	public constructor() {
		super();
	}

	public open(...param):void{
		this.neiwuGroup["autoSize"]();
		this.neiwuGroup.verticalCenter = -700;
		egret.Tween.get(this.neiwuGroup).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.neiwuGroup);
		},this)
		MessageManager.inst().addListener("SELECT_SURE",this.onSelectSure,this);
		MessageManager.inst().addListener("SELECT_CANCLE",this.onSeleceCancle,this);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		let cdTimestring:string = egret.localStorage.getItem(LocalStorageEnum.NEIWU_CD_TIME);
		if(!cdTimestring || (cdTimestring && parseInt(cdTimestring) <= new Date().getTime())){
			//当前不存在内务 或者内务冷区已经结束
			egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME,"");
			this.showPageNormal();
			this.showStory();
		}else{
			this.timer.start();
			this.showPageCd();
		}
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap():void{
		if(this.storyStep == 5){
			return;
		}
		this.showItem();
	}
	private onReturn():void{
		egret.Tween.get(this.neiwuGroup).to({verticalCenter:-700},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.neiwuGroup);
			ViewManager.inst().close(NeiWuPopUp);
		},this)
	}
	private showPageCd():void{
		this.storyStep = 5;
		this.noneGroup.visible = true;
	}
	private showPageNormal():void{
		this.storyStep = 1;
		this.noneGroup.visible = false;
	}
	private onTimer():void{
		let endTime:string = egret.localStorage.getItem(LocalStorageEnum.NEIWU_CD_TIME);
		if(endTime && parseInt(endTime) > new Date().getTime()){
			let offValue:number = parseInt(endTime) - new Date().getTime();
			let timestr:string = DateUtils.getFormatBySecond(offValue/1000,DateUtils.TIME_FORMAT_3);
			//显示到文本上
			this.timeLab.text = timestr;
		}else{
			this.timer.stop();
			egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME,"");
			this.showPageNormal();
			this.showStory();
		}
	}
	private onSelectSure():void{
		this.judageReward(this.option[1]);
	}
	private onSeleceCancle():void{
		this.judageReward(this.option[2]);
	}
	private judageReward(option):void{
		let countstr = egret.localStorage.getItem(LocalStorageEnum.NEYWU_COUNT);
		if(!countstr){
			egret.localStorage.setItem(LocalStorageEnum.NEYWU_COUNT,"1");
		}else{
			egret.localStorage.setItem(LocalStorageEnum.NEYWU_COUNT,(parseInt(countstr)+ 1).toString());
		}
		if(option){
			//当前选项有值
			for(let key in option){
				if(key == "goods"){
					GameApp.goods += option.goods;
					UserTips.inst().showTips("获得粮草x"+option.goods);
				}else if(key == "medal"){
					GameApp.medal += option.medal;
					UserTips.inst().showTips("获得功勋x"+option.medal);
				}else if(key == "general"){
					let generalCards:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.general,true);
					for(let i:number = 0;i<generalCards.length;i++){
						if(generalCards[i].insId == 10000 || generalCards[i].insId == 10001 || generalCards[i].insId == 10002){
							//排除3个优质武将
							generalCards.splice(i,1);
							i-=1;
						}
					}
					let rewardGeneral:CardAttrVo = generalCards[((Math.random()*generalCards.length)>>0)];
					let ownNumInfo:any = GlobalFun.getCardDataFromId(rewardGeneral.insId,["ownNum"]);
					GlobalFun.refreshCardData(rewardGeneral.insId,{ownNum:ownNumInfo.ownNum+1});
					UserTips.inst().showTips(`获得武将${rewardGeneral.name}x1`);
				}
			}
		}
		for(let i:number = 0;i<this.items.length;i++){
			let curItem:NeiWuStoryItem = this.items[i];
			if(curItem){
				egret.Tween.get(curItem).to({alpha:0},600).call(()=>{
					egret.Tween.removeTweens(curItem);
					// curItem.parent.removeChild(curItem);
					if(i >= this.items.length - 1){
						this.items = [];
						let self = this;
						let timeout = setTimeout(function() {
							clearTimeout(timeout)
							let countstr:string = egret.localStorage.getItem(LocalStorageEnum.NEYWU_COUNT);
							if(!countstr || (countstr && parseInt(countstr) < 3)){
								//当前次数还可以处理内务
								this.storyStep = 1
								self.showStory();
							}else{
								//当前处理的内务已经大于等于3次
								let cdTime:number = new Date().getTime() + 10*60*1000;
								egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME,cdTime.toString());
								self.showPageCd();
								self.timer.start();
								MessageManager.inst().dispatch(CustomEvt.NEIWU_CD);
							}
						}, 300);
					}
				},this)
			}
		}
		
	}
	
	/**显示故事 */
	public showStory():void{
		
		this.anwserState = false;
		this.singleDis = 0;
		this.storyStep = 1;
		for(let i:number = 0;i<this.items.length;i++){
			if(this.items[i] && this.items[i].parent){
				this.items[i].dispose();
				this.items[i].parent.removeChild(this.items[i]);
			}
		}
		this.items = [];
		this.word1 = [];
		this.word2 = [];
		let storycfgs:any[] = NeiwuCfg.cfgs;
		let cfg:any = storycfgs[((Math.random()*storycfgs.length)>>0)];
		// let word1:string[] = [];
		this.word1 = this.word1.concat(cfg.word1);
		// let word2:string[] = [];
		this.word2 = this.word2.concat(cfg.word2);
		this.head1 = cfg.head1;
		this.head2 = cfg.head2;
		this.name1 = cfg.name1;
		this.name2 = cfg.name2;
		this.tip = cfg.tip;
		this.option = cfg.option;
		this.showItem()
	}
	private word1:string[] = [];
	private word2:string[] = [];
	private head1:string;
	private head2:string;
	private name1:string;
	private name2:string;
	private storyStep:number = 1;
	private singleDis:number = 0;
	private anwserState:boolean = false;
	private showItem():void{
		if(this.anwserState){return}
		if(this.storyStep == 1 || this.storyStep == 3){
			let firstWord:string = this.word1.shift();
			if(firstWord){
				if(this.storyStep == 3){
					this.singleDis += 100;
				}
				this.storyStep += 1;
				let firstItem:NeiWuStoryItem = new NeiWuStoryItem();
				this.storyGroup.addChild(firstItem);
				firstItem.alpha = 0;
				firstItem.initData({skinState:"left",head:this.head1,story:firstWord,name:this.name1});
				firstItem.left = 20;
				this.items.push(firstItem);
				// this.singleDis += 100;
				firstItem.top = this.singleDis;
				if(!this.word1.length && !this.word2.length){this.storyStep = -1}
				egret.Tween.get(firstItem).to({alpha:1},800).call(()=>{
					egret.Tween.removeTweens(this);
				},this)
			}else{
				//-1显示操作
				this.storyStep = -1;
			}
		}else if(this.storyStep == 2){
			let secordWord:string = this.word2.shift();
			if(secordWord){
				this.storyStep += 1;
				this.singleDis += 100;
				let secondItem:NeiWuStoryItem = new NeiWuStoryItem();
				this.storyGroup.addChild(secondItem);
				secondItem.alpha = 0;
				this.items.push(secondItem);
				secondItem.initData({skinState:"right",head:this.head2,story:secordWord,name:this.name2});
				secondItem.right = 20;
				secondItem.top = this.singleDis;
				if(!this.word1.length && !this.word2.length){this.storyStep = -1}
				egret.Tween.get(secondItem).to({alpha:1},800).call(()=>{
					egret.Tween.removeTweens(secondItem);
				},this)
			}else{
				//-1显示操作
				this.storyStep = -1;
				// this.showItem(word1,word2,head1,head2);
			}
		}else if(this.storyStep == -1){
			this.showOption();
		}
		
	}
	/**显示选择操作 */
	private showOption():void{
		this.storyStep = -2;
		this.anwserState = true;
		let item:NeiWuStoryItem = new NeiWuStoryItem();
		item.name = "judge"
		this.storyGroup.addChild(item);
		item.initData({skinState:"center",head:"neiwu_head_2_png",story:this.tip})
		this.items.push(item);
		item.horizontalCenter = 0;
		item.alpha = 0;
		this.singleDis += 140;
		item.top = this.singleDis;
		egret.Tween.get(item).to({alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(item);
		},this);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		MessageManager.inst().removeListener("SELECT_SURE",this.onSelectSure,this);
		MessageManager.inst().removeListener("SELECT_CANCLE",this.onSeleceCancle,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(NeiWuPopUp,LayerManager.UI_Pop);