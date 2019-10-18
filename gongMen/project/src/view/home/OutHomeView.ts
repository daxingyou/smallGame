class OutHomeView extends BaseEuiView{

	private gold:eui.Label;
	private watcher:eui.Watcher;
	private returnBtn:eui.Image;
	private infoBtn:eui.Image;
	private timeLab:eui.Label;
	private startBtn:eui.Button;

	private rewardBtn:eui.Image;
	private wayLineBtn:eui.Image;
	private timespan:number = 5*60;
	private startBoo:boolean = false;
	private timer:egret.Timer;
	private countTime:number = 0;
	private roleMc:MovieClip;
	private routeIndex:number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13];
	private curPos:string;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.watcher = eui.Binding.bindProperty(GameConfig,["gold"],this.gold,"text");
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.infoBtn,this.onOpenInfo,true);
		for(let i:number =1;i<=13;i++){
			this["img"+i]["autoSize"]();
		}
		this.roleMc = new MovieClip();
		this.addChild(this.roleMc);
		this.roleMc.playFile(`${EFFECT}role`,-1);
		this.roleMc.visible = false;
		if(GameApp.routeIndex.length){
			this.routeIndex = GameApp.routeIndex;
			let curimg:eui.Image;
			for(let i:number = 0;i<this.routeIndex.length;i++){
				let index:number = this.routeIndex[i];
				let img:eui.Image = this["img"+index];
				let issame:boolean = false;
				for(let key in GameApp.wayGather){
					if(GameApp.wayGather[key].id == index){
						//当前存在相同的;
						issame = true;
						break;
					}
				}
				if(!issame && i<=GameApp.buildIndex){
					let gold:number = (Math.random()*5+5)>>0
					let rewardStr:string = `您在${img.name}获得${gold}金币`
					let desc:string = `您在${img.name}游玩`;
					this.curStr = `\n您当前正在${img.name}游玩`
					this.curPos = img.name;
					curimg = img;
					this.prevObj = {
						gold:gold,
						pos:img.name,
						reawrdStr:rewardStr,
						desc:desc,
						id:index,
					}
					GameApp.wayGather.push(this.prevObj);
				}
			}
		}else{
			this.routeIndex.sort(function(){ return 0.5 - Math.random() })
			GameApp.routeIndex = this.routeIndex;
		}
		this.addTouchEvent(this.startBtn,this.onStart,true);
		this.timer = new egret.Timer(1000);
		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		
		if(GameApp.outTime > this.timespan || GameApp.outTime == 0){
			this.outEnd();
			this.routeIndex.sort(function(){ return 0.5 - Math.random() })
			GameApp.routeIndex = this.routeIndex;
		}else{
			this.startBoo = true;
			this.startBtn.currentState = "down";
			//开始计时
			this.timer.start();
			this.roleMc.visible = true;
			this.randomRoleMcPos();
			this.countTime = GameApp.outTime;
		}
		this.addTouchEvent(this.wayLineBtn,this.onWayLine,true);
		this.addTouchEvent(this.rewardBtn,this.onReward,true);
	}
	private onWayLine():void{
		if(!this.countTime){
			UserTips.inst().showTips("尚未开始游玩,暂未获得您的足迹");
			return;
		}
		let wayStr:string = '';
		for(let key in GameApp.wayGather){
			if(GameApp.wayGather[key].pos == this.curPos){
				continue;
			}
			wayStr += GameApp.wayGather[key].desc + "\n";
		}
		wayStr += this.curStr;
		ViewManager.inst().open(RewardPop,[{title:"足迹",cnt:wayStr}])
	}
	private onReward():void{
		if(!this.countTime){
			UserTips.inst().showTips("尚未开始游玩,暂未获得您的奖励");
			return;
		}
		let goldstr:string = ""
		for(let key in GameApp.wayGather){
			if(GameApp.wayGather[key].pos == this.curPos){
				continue;
			}
			goldstr += GameApp.wayGather[key].reawrdStr + "\n";
		}
		goldstr += this.curStr;
		ViewManager.inst().open(RewardPop,[{title:"奖励",cnt:goldstr}])
	}
	private prevObj:any = {}
	private curStr:string = "";
	public randomRoleMcPos():void{
		let index:number = this.routeIndex[GameApp.buildIndex];
		let img:eui.Image = this["img"+index];
		this.roleMc.x = img.x;
		this.roleMc.y = img.y + img.height + 50;
		let gold:number = (Math.random()*5+5)>>0
		let rewardStr:string = `您在${img.name}获得${gold}金币`
		let desc:string = `您在${img.name}游玩`;
		this.curStr = `\n您当前正在${img.name}游玩`
		this.curPos = img.name;
		this.prevObj = {
			gold:gold,
			pos:img.name,
			reawrdStr:rewardStr,
			desc:desc,
			id:index,
		}
		let issame:boolean = false;
		for(let key in GameApp.wayGather){
			if(GameApp.wayGather[key].id == index){
				//当前存在相同的;
				issame = true;
				break;
			}
		}
		if(!issame){
			GameApp.wayGather.push(this.prevObj);
		}
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.countTime += 1;
		GameApp.outTime = this.countTime;
		if(this.countTime%30 == 0){
			//30s换一个地方游玩
			GameApp.buildIndex += 1;
			this.randomRoleMcPos();
		}
		let timestr:string = DateUtils.getFormatBySecond(this.countTime,DateUtils.TIME_FORMAT_1);
		this.timeLab.text = timestr;
		if(this.countTime > this.timespan){
			//游玩结束
			let gold:number = 0;
			for(let key in GameApp.wayGather){
				gold += GameApp.wayGather[key].gold;
			}
			GameConfig.gold += gold;
			if(gold != 0){
				UserTips.inst().showTips("游玩获得"+gold+"金币");
			}
			this.outEnd();
		}
	}
	private onStart():void{
		if(this.startBoo){
			this.startBoo = false;
			MessageManager.inst().dispatch("CLICK_END");
			this.outEnd();
		}else{
			this.startBoo = true;
			this.startBtn.currentState = "down";
			//开始计时
			this.timer.start();
			this.roleMc.visible = true;
			this.randomRoleMcPos();
		}
	}
	private outEnd():void{
		
		GameApp.buildIndex = 0;
		GameApp.wayGather = [];
		GameApp.routeIndex = [];
		this.roleMc.visible = false;
		this.timer.stop();
		this.countTime = 0;
		GameApp.outTime = 0;
		this.startBtn.currentState = "up";
		this.timeLab.text = "00:00:00";
	}
	private onOpenInfo():void{
		let cnt:string = "\t\t在游戏系统中可以获得大量的金币!来吧,尽情的携君同游吧,不过，也要了解一下规则哦\n\t\t 规则如下:游戏时间以分钟为单位,5分钟清算一次奖励,未到5分钟结算时间,此阶段奖励清零,所以要注意游玩时间哦"
		ViewManager.inst().open(HelpPop,[{cnt:cnt}]);
	}
	private onReturn():void{
		ViewManager.inst().close(OutHomeView);
		MessageManager.inst().dispatch("RETURN_OUTHOME");
	}
	public close():void{
		if(this.watcher){this.watcher.unwatch()}
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.infoBtn,this.onOpenInfo);
		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.removeTouchEvent(this.wayLineBtn,this.onWayLine);
		this.removeTouchEvent(this.rewardBtn,this.onReward);
	}
}
ViewManager.inst().reg(OutHomeView,LayerManager.UI_Pop);