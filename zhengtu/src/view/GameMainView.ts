class GameMainView extends BaseEuiView{

	//弓兵营
	private buildSolid_0:eui.Button;
	//骑兵营
	private buildSolid_1:eui.Button;
	//盾兵营
	private buildSolid_2:eui.Button;
	//技能
	private buildSkill:eui.Button;
	//军需处
	private buildGoods:eui.Button;
	//大帐；
	private buildMain:eui.Button;
	//商店
	private buildShop:eui.Button;

	private fuben1:eui.Image;
	private fuben2:eui.Image;
	private fuben3:eui.Image;
	private title_1:eui.Image;
	private title_2:eui.Image;
	private title_3:eui.Image;
	private title_4:eui.Image;
	private title_5:eui.Image;
	private title_6:eui.Image;
	private title_7:eui.Image;


	private woodLab:eui.Label;
	private goodLab:eui.Label;
	private feLab:eui.Label;
	private goldLab:eui.Label;

	private nameLab:eui.Label;
	private jobIcon:eui.Image;
	private levelLab:eui.Label;
	private headIcon:eui.Image;

	private words:string[] = ["平生一顾重,","意气溢三军。","野日分戈影,","天星合剑文。","弓弦抱汉月,","马足践胡尘。","不求生入塞,","唯当死抱军。"];	
	private storyGroup:eui.Group;
	private fields:any[] = [];
	private guideView:GuideView;
	private fightBtn:eui.Image;
	private readyBtn:eui.Image;

	private timer1:egret.Timer;
	private timer2:egret.Timer;
	private timer3:egret.Timer;
	private timer4:egret.Timer;
	private timer1Boo:boolean = false;
	private timer2Boo:boolean = false;
	private timer3Boo:boolean = false;
	private timer4Boo:boolean = false;
	private produce0:boolean = false;
	private produce1:boolean = false;
	private produce2:boolean = false;

	private other_build_1:eui.Image;
	private other_build_2:eui.Image;
	private other_build_3:eui.Image;
	private other_build_4:eui.Image;
	private other_build_5:eui.Image;

	//生产单个兵需要的时间
	private costTime:number = 3;

	private buildGroup:any[];

	//主人物兵种类型
	private mainRoleType:number;

	private firePosimg:eui.Image;
	private flagPosImg2:eui.Image;
	private flagPosImg1:eui.Image;
	private flag2Posimg:eui.Image;
	private flag3Posimg:eui.Image;
	private flag4Posimg:eui.Image;
	private flag5Posimg:eui.Image;
	private flag6Posimg:eui.Image;
	private flag7Posimg:eui.Image;
	private flag8Posimg:eui.Image;
	private flag9Posimg:eui.Image;
	private flagGather:eui.Image[];
	private startP:eui.Image;
	private endP:eui.Image;
	private rectPoint:eui.Image;
	private rectPoint2:eui.Image;

	private point1:eui.Image;
	private point2:eui.Image;
	private point3:eui.Image;
	// private patrolList:MovieClip[];

	private soldierGroup:eui.Group;
	private showSoldiers:MovieClip[];
	private col:number = 5;
	private row:number = 3;
	private talkGroup:eui.Group;
	private contentLab:eui.Label;
	private clickRect:eui.Rect;
	private sureBtn:eui.Image;
	private fuben1_focus:eui.Image;
	private fuben2_focus:eui.Image;
	private fuben3_focus:eui.Image;

	private fuben1Lab:eui.Label;
	private fuben2Lab:eui.Label;
	private fuben3Lab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		// this.patrolList = [];
		this.flagGather = [this.flag2Posimg,this.flag3Posimg,this.flag4Posimg,this.flag5Posimg,this.flag6Posimg,this.flag7Posimg,this.flag8Posimg,
		this.flag9Posimg];
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		let isPassGuide:string = egret.localStorage.getItem(LocalStorageEnum.IS_PASS_GUIDE);
		let levelCfgs:any[] = LevelCfg.levelCfg;
		let heroattrs:string = egret.localStorage.getItem(LocalStorageEnum.OTHER_GENERAL);
		this.clickRect.visible = false;
		this.fuben1_focus.visible = false;
		this.fuben2_focus.visible = false;
		this.fuben3_focus.visible = false;
		this.fuben1Lab.visible = this.fuben2Lab.visible = this.fuben3Lab.visible = false;
		if(heroattrs){
			let attrarr:any[] = JSON.parse(heroattrs);
			for(let i:number = 0;i<attrarr.length;i++){
				if(attrarr[i].insId == 100010 || attrarr[i].insId == 100011){
					continue;
				}
				levelCfgs[i].name = attrarr[i].name;
				levelCfgs[i].type = attrarr[i].type;
				levelCfgs[i].insId = attrarr[i].insId;
				levelCfgs[i].atk = attrarr[i].atk;
				levelCfgs[i].hp = attrarr[i].hp;
				if(i == 0){
					levelCfgs[i].hp = 100;
					levelCfgs[i].atk = 50;
				}
			}
		}
		this.buildGroup = [this.buildMain,this.buildShop,this.buildSkill,this.buildGoods,this.buildSolid_0,this.buildSolid_1,this.buildSolid_2,this.other_build_1,
		this.other_build_2,this.other_build_3,this.other_build_4,this.other_build_5,this.title_1,this.title_2,this.title_3,this.title_4,this.title_5,
		this.title_6,this.title_7]
		//需要显示新手引导 初始化 给黄金
			// GameApp.inst().gold  = 1000;
		//
		//界面一些动态特效
		this.firePosimg["autoSize"]();
		this.flagPosImg1["autoSize"]();
		this.flagPosImg2["autoSize"]();
		// this.flag2Posimg["autoSize"]();
		this.startP["autoSize"]();
		this.endP["autoSize"]();
		this.point1["autoSize"]();
		this.point2["autoSize"]();
		this.point3["autoSize"]();
		this.rectPoint["autoSize"]();
		this.rectPoint2["autoSize"]();
		// this.fightBtn["autoSize"]();
		// this.readyBtn["autoSize"]();

		for(let i:number = 0;i<this.flagGather.length;i++){
			this.flagGather[i]["autoSize"]();
			let flagmc3:MovieClip = new MovieClip();
			this.addChild(flagmc3);
			if(i == 1 || i == 2){
				flagmc3.scaleX = flagmc3.scaleY = 0.6;
			}else if(i == 3 || i==4){
				flagmc3.scaleX = flagmc3.scaleY = 0.4;
			}else if(i == 4 || i==5){
				flagmc3.scaleX = flagmc3.scaleY = 0.2;
			}else if(i == 6 || i==7){
				flagmc3.scaleX = flagmc3.scaleY = 0.4;
			}
			flagmc3.playFile(`${EFFECT}flag2`,-1);
			flagmc3.x = this.flagGather[i].x;
			flagmc3.y = this.flagGather[i].y;
		}

		let firemc:MovieClip = new MovieClip();
		this.addChild(firemc);
		firemc.playFile(`${EFFECT}fire`,-1);
		firemc.x = this.firePosimg.x;
		firemc.y = this.firePosimg.y;

		let generalMc:MovieClip = new MovieClip();
		this.addChild(generalMc);
		generalMc.playFile(`${SOLDIER}soldier_1`,-1,null,false,"attack",null,15);
		generalMc.scaleX = generalMc.scaleY = 0.3;
		generalMc.x = this.startP.x;
		generalMc.y = this.startP.y;

		let generalMc2:MovieClip = new MovieClip();
		this.addChild(generalMc2);
		generalMc2.playFile(`${SOLDIER}soldier_2`,-1,null,false,"attack",null,15);
		generalMc2.scaleX = - 0.3
		generalMc2.scaleY = 0.3;
		generalMc2.x = this.endP.x;
		generalMc2.y = this.endP.y;

		let flagmc1:MovieClip = new MovieClip();
		this.addChild(flagmc1);
		flagmc1.playFile(`${EFFECT}flag`,-1);
		flagmc1.x = this.flagPosImg1.x;
		flagmc1.y = this.flagPosImg1.y;

		let flagmc2:MovieClip = new MovieClip();
		this.addChild(flagmc2);
		flagmc2.playFile(`${EFFECT}flag`,-1);
		flagmc2.x = this.flagPosImg2.x;
		flagmc2.y = this.flagPosImg2.y;

		


		this.soldierGroup = new eui.Group();
		this.soldierGroup.touchEnabled = false;
		this.addChild(this.soldierGroup);
		this.soldierGroup.x = this.rectPoint.x;
		this.soldierGroup.y = this.rectPoint.y;

		this.swapChildren(this.soldierGroup,this.talkGroup);

		
		this.showSoldiers = [];
		for(let i:number = 0;i<3;i++){
			let res:string = `show_soldier_${i}`;
			let group:eui.Group = new eui.Group();
			this.soldierGroup.addChild(group);
			group.name = i.toString();
			group.y = i*55;
			group.x = -i*55;
			for(let j:number = 0;j<this.row;j++){
				for(let k:number = 0;k<this.col;k++){
					let mc:MovieClip = new MovieClip();
					mc.playFile(`${SOLDIER}${res}`,-1,null,false,"stand");
					mc.scaleX = mc.scaleY = 0.25;
					group.addChild(mc);
					mc.x = k * 10 - j*15
					mc.y = j * 15 + k*3;
					mc.visible = false;
					mc.alpha = 0;
					this.showSoldiers.push(mc);
				}
			}
		}
		// for(let i:number = 0;i<3;i++){
		// 	let mc1:MovieClip = new MovieClip();
		// 	this.addChild(mc1);
		// 	mc1.playFile(`${SOLDIER}patrol`,-1,null,false,"1");
		// 	mc1.scaleX = mc1.scaleY = 0.3;
		// 	mc1.alpha = 0.5;
		// 	mc1.x = this.point1.x - 10*i;
		// 	mc1.y = this.point1.y + 10*i;
		// 	this.patrolList.push(mc1);
		// }
		// this.loopTween();
		//======================
		if(!isPassGuide){
			
			egret.localStorage.setItem(LocalStorageEnum.IS_PASS_GUIDE,"1");
			this.storyGroup = new eui.Group();
			this.addChild(this.storyGroup);
			this.storyGroup.touchThrough = true;
			this.storyGroup.touchChildren = true;
			this.storyGroup.touchEnabled = false;
			this.storyGroup.right = this.storyGroup.top = this.storyGroup.left = this.storyGroup.bottom = 0;
			let rect:eui.Rect = new eui.Rect();
			this.storyGroup.addChild(rect);
			rect.alpha = 0.3;
			rect.right = rect.left = rect.top = rect.bottom = 0;
			this.showStory();
		}
		for(let i:number = 0;i<5;i++){
			let cloud:Cloud = new Cloud();
			this.addChild(cloud);
		}
		let mainGeneral:string = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL)
		let mainAttr = JSON.parse(mainGeneral).attr[0];
		this.mainRoleType = mainAttr.type;
		this.nameLab.text = mainAttr.name;
		this.levelLab.text = "Lv:"+(mainAttr.level+1);
		this.jobIcon.source = `type_${mainAttr.type}_png`;
		this.headIcon.source = `head_${mainAttr.index}_png`;

		this.addTouchEvent(this.fightBtn,this.onFight,true);
		this.addTouchEvent(this.readyBtn,this.onReady,true);
		this.fightBtn.visible = false;
		this.timer1 = new egret.Timer(1000);
		this.timer1.addEventListener(egret.TimerEvent.TIMER,this.onTimer1,this);

		this.timer2 = new egret.Timer(1000);
		this.timer2.addEventListener(egret.TimerEvent.TIMER,this.onTimer2,this);

		this.timer3 = new egret.Timer(1000);
		this.timer3.addEventListener(egret.TimerEvent.TIMER,this.onTimer3,this);

		this.timer4 = new egret.Timer(1000);
		this.timer4.addEventListener(egret.TimerEvent.TIMER,this.onTimer4,this);
		this.resetPos();
		eui.Binding.bindHandler(GameApp,["m_product_0"],this.onSoldier0Product,this);
		eui.Binding.bindHandler(GameApp,["m_product_1"],this.onSoldier1Product,this);
		eui.Binding.bindHandler(GameApp,["m_product_2"],this.onSoldier2Product,this);
		eui.Binding.bindProperty(GameApp,["m_good"],this.goodLab,"text");
		eui.Binding.bindProperty(GameApp,["m_gold"],this.goldLab,"text");
		eui.Binding.bindProperty(GameApp,["m_wood"],this.woodLab,"text");
		eui.Binding.bindProperty(GameApp,["m_fe"],this.feLab,"text");
		eui.Binding.bindHandler(GameApp,["tpxGetState"],this.tapGetShow,this);
		MessageManager.inst().addListener(CustomEvt.UPGRADE,this.onUpgrade,this);
		// MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_BUILD_GOODS,this.onClickBuildGoods,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_BATTLE,this.onClickBattle,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_OPEN_GENERAL,this.onOpenGeneral,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_TO_NEXT,this.onGuideNext,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_COLLECT,this.onCollect,this);
		this.refreshFuBen();
		
	}
	
	private onCollect():void{
		this.onReady();
		GlobalFun.guideToNext();
	}
	private tapGetShow(value:boolean):void{
		if(value == true){
			let rotation:number = this.title_4.rotation;
			egret.Tween.get(this.title_4,{loop:true}).to({rotation:rotation+=5},50).to({rotation:rotation-=5},50)
			.to({rotation:rotation+=5},50).to({rotation:rotation-=5},50).wait(600);
		}else{
			this.title_4.rotation = 0;
			egret.Tween.removeTweens(this.title_4);
		}
	}
	// private speedNumber:number[] = [7600,7800,8000];
	// private loopTween():void{
	// 	let index:number = 0;
	// 	for(let i:number = 0;i<this.patrolList.length;i++){
	// 		egret.Tween.removeTweens(this.patrolList[i]);
	// 		egret.Tween.get(this.patrolList[i]).to({x:this.point2.x,y:this.point2.y,alpha:1},this.speedNumber[i]).call(()=>{
	// 			this.patrolList[i].changeActionFrameLab("2");
	// 		},this).to({x:this.point3.x,y:this.point3.y,alpha:0},this.speedNumber[i]).call(()=>{
	// 			this.patrolList[i].changeActionFrameLab("1");
	// 			egret.Tween.removeTweens(this.patrolList[i]);
	// 			index += 1;
	// 			this.patrolList[i].x = this.point1.x - 10*i;
	// 			this.patrolList[i].y = this.point1.y + 10*i;
	// 			if(index >= 3){
	// 				this.loopTween();
	// 			}
	// 		},this)
	// 	}
	// }
	private onGuideNext():void{
		GlobalFun.guideToNext(this.buildGoods,243,95);
	}
	private onOpenGeneral():void{
		ViewManager.inst().open(GeneralPopUp);
		GlobalFun.guideToNext();
	}
	public refreshPage():void{
		// this.loopTween();
		this.refreshFuBen();
		if(GameApp.waitStepId){
			ViewManager.inst().open(GuideView);
			GameApp.guildView = ViewManager.inst().getView(GuideView) as GuideView;
			GameApp.guilding = true;
			GameApp.guildView.nextStep({id:GameApp.waitStepId,comObj:this.buildMain,width:403,height:137});
		}
	}	
	private fuben1Boo:boolean;
	private fuben2Boo:boolean;
	private fuben3Boo:boolean;
	private refreshFuBen():void{
		let level:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.LEVEL));
		let time1:string = egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME1);
		if(!time1){
			this.fuben1_focus.visible = true;
		}else{
			if(parseInt(time1) >= new Date().getTime()){
				//还在冷却中
				this.fuben1_focus.visible = false;
				this.fuben1Lab.visible = true;
				let remain:number = parseInt(time1) - new Date().getTime()
				this.fuben1Lab.text = DateUtils.getFormatBySecond(remain/1000,DateUtils.TIME_FORMAT_3);
				this.fuben1Boo = true;
				if(!this.timer4Boo){
					this.timer4Boo = true;
					this.timer4.start();
				}
			}else{
				this.fuben1Lab.visible = false;
				this.fuben1_focus.visible = true;
				this.fuben1Boo = false;
			}
		}
		if(level >= 3){
			let timer2:string = egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME2);
			if(!timer2){
				this.fuben2.source = "icon_2_down_png";
				this.fuben2_focus.visible = true;
			}else{
				if(parseInt(timer2) >= new Date().getTime()){
					this.fuben2_focus.visible = false;
					this.fuben2Lab.visible = true;
					let remain:number = parseInt(timer2) - new Date().getTime()
					this.fuben2Lab.text = DateUtils.getFormatBySecond(remain/1000,DateUtils.TIME_FORMAT_3);
					this.fuben2Boo = true;
					if(!this.timer4Boo){
						this.timer4Boo = true;
						this.timer4.start();
					}
				}else{
					this.fuben2_focus.visible = true;
					this.fuben2Lab.visible = false;
					this.fuben2Boo = false;
				}
				
			}
		}else{
			this.fuben2.source = "icon_2_up_png";
		}
		if(level >= 5){
			let time3:string = egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME3);
			if(!time3){
				this.fuben3_focus.visible = true;
				this.fuben3.source = "icon_3_down_png";
			}else{
				if(parseInt(time3) >= new Date().getTime()){
					this.fuben3_focus.visible = false;
					this.fuben3Lab.visible = true;
					let remain:number = parseInt(time3) - new Date().getTime()
					this.fuben3Lab.text = DateUtils.getFormatBySecond(remain/1000,DateUtils.TIME_FORMAT_3);
					this.fuben3Boo = true;
					if(!this.timer4Boo){
						this.timer4Boo = true;
						this.timer4.start();
					}
				}else{
					this.fuben3_focus.visible = true;
					this.fuben3Lab.visible = false;
					this.fuben3Boo = false;
				}
			}
		}else{
			this.fuben3.source = "icon_3_up_png";
		}
	}
	private onClickBattle():void{
		this.onFight();
	}
	// private onClickBuildGoods():void{
	// 	ViewManager.inst().open(TapPopUp);
	// }
	private onUpgrade(evt:CustomEvt):void{
		this.levelLab.text = "Lv:"+(evt.data.level+1);
	}
	private onSoldier0Product(value:number):void{
		this.produce0 = !!value;
		if(value){
			if(!this.timer1Boo){
				this.timer1Boo = true;
				this.timer1.start();
			}
		}
	}
	private onSoldier1Product(value:number):void{
		this.produce1 = !!value;
		if(value){
			if(!this.timer2Boo){
				this.timer2Boo = true;
				this.timer2.start();
			}
		}
	}
	private onSoldier2Product(value:number):void{
		this.produce2 = !!value;
		if(value){
			if(!this.timer3Boo){
				this.timer3Boo = true;
				this.timer3.start();
			}
		}
	}
	private timer1Count:number = 0;
	private onTimer1(evt:egret.TimerEvent):void{
		this.refreshSoldierData(SoldierType.ARROW)
	}
	private timer2Count = 0;
	private onTimer2(evt:egret.TimerEvent):void{
		this.refreshSoldierData(SoldierType.QI)
	}
	private timer3Count:number = 0;
	private onTimer3(evt:egret.TimerEvent):void{
		this.refreshSoldierData(SoldierType.SHIELD)
	}
	private onTimer4():void{
		if(this.fuben1Boo){
			//当前处于冷却中
			let time1:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME1));
			let remain: number = time1 - new Date().getTime();
			if(remain <= 0){
				remain == 0;
				this.fuben1Boo = false;
				this.refreshFuBen();
			}
			this.fuben1Lab.text = DateUtils.getFormatBySecond(remain/1000,DateUtils.TIME_FORMAT_3);
		}
		if(this.fuben2Boo){
			let time2:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME2));
			let remain: number = time2 - new Date().getTime();
			if(remain <= 0){
				remain == 0;
				this.fuben2Boo = false;
				this.refreshFuBen();
			}
			this.fuben2Lab.text = DateUtils.getFormatBySecond(remain/1000,DateUtils.TIME_FORMAT_3);
		}

		if(this.fuben3Boo){
			let time3:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME3));
			let remain: number = time3 - new Date().getTime();
			if(remain <= 0){
				remain == 0;
				this.fuben3Boo = false;
				this.refreshFuBen();
			}
			this.fuben3Lab.text = DateUtils.getFormatBySecond(remain/1000,DateUtils.TIME_FORMAT_3);
		}
		if(!this.fuben1Boo && !this.fuben2Boo && !this.fuben3Boo){
			this.timer4.stop();
		}
	}
	private refreshSoldierData(type:number):void{
		type == 0?this.timer1Count += 1:(type == 1?this.timer2Count +=1:this.timer3Count += 1);
		let condition1:boolean = type == 0?this.timer1Count >= this.costTime:(type == 1?this.timer2Count>=this.costTime:this.timer3Count>=this.costTime);
		let condition2:boolean = type == 0?this.produce0:(type == 1?this.produce1:this.produce2);
		if(condition1){
			if(condition2){
				type == 0?(GameApp.inst().product_0 -= 1,GameApp.inst().soldier_0 +=1):
				(type == 1?(GameApp.inst().product_1 -= 1,GameApp.inst().soldier_1 +=1):
				(GameApp.inst().product_2 -= 1,GameApp.inst().soldier_2 +=1));
				let label:eui.Label = new eui.Label();
				this.addChild(label);
				label.fontFamily = "yt";
				label.text = "+1";
				label.size = 16;
				label.stroke = 1;
				label.strokeColor = 0x000000;
				let xx:number = type == 0?this.title_1.x + (this.title_1.width>>1) - (label.width>>1):(type == 1)?
				this.title_2.x + (this.title_2.width>>1) - (label.width>>1):this.title_3.x + (this.title_3.width>>1) - (label.width>>1);

				let yy:number = type == 0?this.title_1.y - label.height - 10:(type == 1?this.title_2.y - label.height - 10:
				this.title_3.y - label.height - 10)

				label.x = xx;
				label.y = yy;

				egret.Tween.get(label).to({y:yy-20,alpha:0},600).call(()=>{
					egret.Tween.removeTweens(label);
					label.parent.removeChild(label);
				},this)
			}else{
				type == 0?(this.timer1Boo = false,this.timer1.stop(),this.timer1Count = 0):
				(type == 1?(this.timer2Boo = false,this.timer2.stop(),this.timer2Count = 0):
				(this.timer3Boo = false,this.timer3.stop(),this.timer3Count = 0))
			}
			type == 0?this.timer1Count = 0:type ==1?this.timer2Count = 0:this.timer3Count = 0;
		}
		if(condition2 ){
			let count:number = type == 0?this.timer1Count:type == 1?this.timer2Count:this.timer3Count;
			let eventstr:string = type == 0?CustomEvt.PROGRESS_0:type == 1?CustomEvt.PROGRESS_1:CustomEvt.PROGRESS_2;
			MessageManager.inst().dispatch(eventstr,{time:count});
		}
	}
	private readyState:boolean = false;
	private onReady():void{
		if(this.readyState){
			return;
		}
		if(GameApp.guilding){
			this.touchEnabled = false;
			this.touchChildren = false;
		}
		this.readyState = true;
		this.showReadyAnimate();
	}
	private showReadyAnimate():void{
		let index:number = -1;
		let speed:number = 0;
		let allTime:number = 0;
		let offest:number = 0;
		for(let j:number = 0;j<this.showSoldiers.length;j++){
			index+=1;
			if(j <= this.showSoldiers.length - this.col){
				speed = index*300 + offest
				
				allTime += speed;
				for(let k:number = 0;k<this.col;k++){
					let mc:MovieClip = this.showSoldiers[j+k];
					let timeout = setTimeout(function() {
						clearTimeout(timeout);
						mc.visible = true;
						mc.alpha = 1;
					}, speed);
					// egret.Tween.get(mc).to({alpha:1},speed).call(()=>{egret.Tween.removeTweens(mc)},this);
				}
				j+=this.col-1;
				if(j == 14 || j == 29 || j> this.showSoldiers.length - this.col){
					offest += 800
					let layerIndex:number = (j==14?0:(j == 29?1:2));
					let group:eui.Group = this.soldierGroup.getChildAt(layerIndex) as eui.Group;
					for(let i:number = 0;i<group.numChildren;i++){
						let mc:MovieClip = group.$children[i] as MovieClip
						let timeout = setTimeout(function(_mc) {
							clearTimeout(timeout);
							_mc.changeActionFrameLab("attack",1);
						}, speed,mc);
					}
					// speed += 500
				}
				// speed += (j*100)
			}
		}
		
		let self=this;
		let timeout = setTimeout(function() {
			self.clickRect.touchEnabled = true;
			self.readyBtn.visible = false;
			self.fightBtn.visible = true;
			self.clickRect.visible = true;
			self.readyState = false;
			self.contentLab.text = "将军，猛虎营，骁骑营，神箭营三营士兵已全部集结完毕！";
			egret.Tween.get(self.talkGroup).to({left:0},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(self.talkGroup);
				if(GameApp.guilding){
					self.touchEnabled = true;
					self.touchChildren = true;
				}
			},self)
		}, 5000);
	}
	/**行走到城门 */
	private showWalkToOutDoor(cb:()=>void,thisArg:any):void{
		for(let i:number = 0;i<this.showSoldiers.length;i++){
			let mc:MovieClip = this.showSoldiers[i];
			mc.changeActionFrameLab("run",-1);
		}
		let angle:number = Math.atan2(this.rectPoint2.y - this.rectPoint.y,this.rectPoint2.x - this.rectPoint.x)
		let x:number = this.soldierGroup.x + Math.cos(angle)*120;
		let y:number = this.soldierGroup.y + Math.sin(angle)*120;
		egret.Tween.get(this.soldierGroup).to({x:x,y:y},600).call(()=>{
			egret.Tween.removeTweens(this.soldierGroup);
			cb.call(thisArg);
			for(let i:number = 0;i<this.showSoldiers.length;i++){
				let mc:MovieClip = this.showSoldiers[i];
				mc.changeActionFrameLab("stand",-1)
				mc.visible = false;
				mc.alpha = 0;
			}
			this.soldierGroup.x = this.rectPoint.x;
			this.soldierGroup.y = this.rectPoint.y;
			
		},this)
	}
	private walkState:boolean = false;
	private onFight():void{
		if(this.walkState == true || this.readyState == true){
			return;
		}
		this.walkState = true;
		if(GameApp.guilding){
			this.touchEnabled = false;
			this.touchChildren = false;
			GlobalFun.guideToNext();
		}
		// ViewManager.inst().close(GameMainView);
		this.showWalkToOutDoor(()=>{
			// this.closeTalk();
			if(GameApp.guilding){
				this.touchEnabled = true;
				this.touchChildren = true;
			}
			this.walkState =false;
			ViewManager.inst().open(SelectLevel);
			this.readyBtn.visible = true;
			this.fightBtn.visible = false;
		},this)
	}
	/**重置位置 */
	private resetPos():void{
		this.buildGroup.forEach(item=>{
			item["autoSize"]();
		},this)
	}
	//当前引导的对象
	private curGuideObj:any;
	private index:number = 0;
	/**显示剧情 */
	public showStory():void{
		if(this.words.length){
			let word:string = this.words.shift();
			let txt:eui.Label = new eui.Label();
			txt.fontFamily = "yt";
			txt.size = 40;
			txt.width = 40;
			txt.lineSpacing = 15;
			txt.text = word;
			this.storyGroup.addChild(txt);
			txt.alpha = 0;
			txt.textColor = 0xe4e4e4;
			GlobalFun.light(txt,0xEF872B);
			txt.right = 100 + this.index*(40+50);
			txt.top = 100;
			if(this.index%2){
				txt.top = 170;
			}
			egret.Tween.get(txt).to({alpha:1,right:txt.right-20},1500).call(()=>{
				this.index += 1;
				this.showStory();
			},this)
		}else{
			this.storyGroup.cacheAsBitmap = true;
			//触发完成
			egret.Tween.get(this.storyGroup).to({alpha:0},2000).call(()=>{
				this.storyGroup.cacheAsBitmap = false;
				egret.Tween.removeTweens(this.storyGroup);
				this.storyGroup.removeChildren();

				ViewManager.inst().open(GuideView);
				GameApp.guildView = ViewManager.inst().getView(GuideView) as GuideView;
				GameApp.guilding = true;
				GameApp.guildView.nextStep({id:"1_1",comObj:this.readyBtn,width:97,height:97});
			},this)
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.buildSkill:
				ViewManager.inst().open(SkillPopUp)
				break;
			case this.buildSolid_0:
				ViewManager.inst().open(SoldierCamp,[{type:0}]);
				break;
			case this.buildSolid_1:
				ViewManager.inst().open(SoldierCamp,[{type:1}]);
				break;
			case this.buildSolid_2:
				ViewManager.inst().open(SoldierCamp,[{type:2}]);
				break;
			case this.buildGoods:
				ViewManager.inst().open(TapPopUp);
				break;
			case this.buildMain:
				ViewManager.inst().open(GeneralPopUp);
				break;
			case this.buildShop:
				ViewManager.inst().open(ShopPopUp)
				break;
			case this.sureBtn:
				this.closeTalk();
				break;
			case this.fuben1:
				let time1:string = egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME1);
				if((time1 && parseInt(time1) > new Date().getTime())){
					UserTips.inst().showTips("暂未开启");
					return;
				}
				egret.localStorage.setItem(LocalStorageEnum.FUBEN_TIME1,(new Date().getTime() + 10*60*1000).toString());
				ViewManager.inst().open(FuBenPopUp);
				break;
			case this.fuben2:
				let level:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.LEVEL));
				let time2:string = egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME2);
				if(level < 3 || !level || (time2 && parseInt(time2) > new Date().getTime() )){
					UserTips.inst().showTips("暂未开启");
					return;
				}
				egret.localStorage.setItem(LocalStorageEnum.FUBEN_TIME2,(new Date().getTime() + 10*60*1000).toString());
				ViewManager.inst().open(BattleView,[{level:3,state:1}])
				break;
			case this.fuben3:
				let level2:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.LEVEL));
				let time3:string = egret.localStorage.getItem(LocalStorageEnum.FUBEN_TIME3);
				if(level2 < 5 || !level || (time3 && parseInt(time3) > new Date().getTime())){
					UserTips.inst().showTips("暂未开启");
					return;
				}
				egret.localStorage.setItem(LocalStorageEnum.FUBEN_TIME3,(new Date().getTime() + 10*60*1000).toString());
				ViewManager.inst().open(BattleView,[{level:5,state:2}])
				break;
		}
		
	}
	private closeTalk():void{
		egret.Tween.get(this.talkGroup).to({left:-700},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.talkGroup);
			this.clickRect.visible = false;
			if(GameApp.guilding){
				if(GameApp.waitStepId){
					ViewManager.inst().open(GuideView);
					GameApp.guildView = ViewManager.inst().getView(GuideView) as GuideView;
					GameApp.guildView.nextStep({id:GameApp.waitStepId,comObj:this.fightBtn,width:97,height:104});
				}
			}
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.fightBtn,this.onFight);
		this.removeTouchEvent(this.readyBtn,this.onReady);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);