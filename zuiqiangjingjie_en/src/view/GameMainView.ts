class GameMainView extends BaseEuiView{
	private btn_group: eui.Group;
	private info_group: eui.Group;
	private map_group: eui.Group;

	private gold_label: eui.Label;
	private goods_label: eui.Label;
	private medal_label: eui.Label;
	private exp_label: eui.Label;
	private main_city_label: eui.Label;
	private name_label: eui.Label;

	private recharge_img: eui.Image;
	private role_img: eui.Image;
	private watcher1:eui.Watcher;
	private watcher2:eui.Watcher;
	private watcher3:eui.Watcher;
	private watcher4:eui.Watcher;
	private watcher5:eui.Watcher;
	private watcher6:eui.Watcher;
	private watcher7:eui.Watcher;
	private role_img2:eui.Image;
	private icon_img:eui.Image;
	private yearLab:eui.Label;
	private firepos:eui.Rect;
	private firstRect:eui.Rect;
	private rechargeRect:eui.Rect;
	private touch_map:eui.Group;
	private btn_name: string[]=[
		"shuishou" , "zhengbing" , "neiwu" , "kazu" , "jiuguan" , "shangcheng"
	]
	private kazu_btn:eui.Button;
	private city_pos = [
		{ x:1608 , y:1007 },
		{ x:1064.15 , y:1070 },
		{ x:913 , y:758 },
		{ x:1150 , y:480 },
		{ x:1534 , y:566 },
		{ x:1443 , y:235 },
		{ x:1065 , y:33 },
		{ x:740 , y:60 },
		{ x:637 , y:339 },
		{ x:532 , y:679 },
		{ x:486 , y:930 },
		{ x:190 , y:494 },
		{ x:46 , y:39 }
	];

	//////////////////////////////
	private collectInterVal;
	private taxInterVal;
	private collectCdInterVal;
	private neiwuInterval;
	private yearMask:eui.Rect;
	private rewardGroup:eui.Group;
	private rewardCards:ShopItem[];
	private type:number;
	private _param:any;
	private _initialize:boolean = false;
	private ox:number = 0;
	private oy:number = 0;
	private nx:number = 0;
	private ny:number = 0;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onChildrenCreated,this);
	}
	public open(...param):void{
		let citys:CityInfo[] = GameApp.roleInfo.citys;
		let mapX:number;
		let mapY:number;
		let precentw:number = StageUtils.inst().getWidth()/1334;
		for(let i = 0; i < citys.length; i++)
		{
			if(citys[i].isOnly == true)
			{
				let _i:number = 0;
				if(i==0)
				{
					_i = i + 1;
				}else
				{
					_i = i - 1;
				}
				let pos:egret.Point = this.map_group.localToGlobal(this.city_pos[_i].x, this.city_pos[_i].y);
				let cx:number;
				let cy:number;
				cx = StageUtils.inst().getWidth() / 2 - pos.x;
				cy = StageUtils.inst().getHeight() / 2 - pos.y;
				this.map_group.x += cx;
				this.map_group.y += cy;
				if(this.map_group.x >= 0)
				{
					this.map_group.x = 0;
				}else if(this.map_group.x <= StageUtils.inst().getWidth() - this.map_group.width * precentw)
				{
					this.map_group.x = StageUtils.inst().getWidth() - this.map_group.width * precentw;
				}

				if(this.map_group.y >= 57*precentw)
				{
					this.map_group.y = 57*precentw;
				}else if(this.map_group.y <= StageUtils.inst().getHeight() - this.map_group.height*precentw)
				{
					this.map_group.y = StageUtils.inst().getHeight() - this.map_group.height*precentw;
				}
			}
		}
		this.touch_map.touchEnabled =  true;
		this.touch_map.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mapMove, this);
		this.touch_map.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mapBegin, this);
		this.touch_map.addEventListener(egret.TouchEvent.TOUCH_END, this.mapEnd, this);
	}
	private mapMove(evt:egret.TouchEvent)
	{
		if(this.ox == 0 || this.oy == 0)
		{
			return;
		}
		let precentw:number = StageUtils.inst().getWidth()/1334;
        let precenth:number = StageUtils.inst().getHeight()/750;
		let cx:number;
		let cy:number;
		this.nx = evt.stageX;
		this.ny = evt.stageY;
		cx = this.nx - this.ox;
		cy = this.ny - this.oy;
		this.map_group.x += cx;
		this.map_group.y += cy;
		if(this.map_group.x >= 0)
		{
			this.map_group.x = 0;
		}else if(this.map_group.x <= StageUtils.inst().getWidth() - this.map_group.width * precentw)
		{
			this.map_group.x = StageUtils.inst().getWidth() - this.map_group.width * precentw;
		}

		if(this.map_group.y >= 57*precentw)
		{
			this.map_group.y = 57*precentw;
		}else if(this.map_group.y <= StageUtils.inst().getHeight() - this.map_group.height*precentw)
		{
			this.map_group.y = StageUtils.inst().getHeight() - this.map_group.height*precentw;
		}

		this.ox = this.nx;
		this.oy = this.ny;
	}
	private mapBegin(evt:egret.TouchEvent)
	{
		this.ox = this.nx = evt.stageX;
		this.oy = this.ny = evt.stageY;
	}
	private mapEnd(evt:egret.TouchEvent)
	{
		this.ox = this.nx = 0;
		this.oy = this.ny = 0;
	}
	private onChildrenCreated():void{
		if(Main.DUBUGGER){
			Main.txt.text += "initialize";
		}
		this._initialize = true;
		this.adapter();
		MessageManager.inst().addListener(CustomEvt.COLLECT_START,this.onCollectStart,this);
		if(Main.DUBUGGER){
			Main.txt.text += "\n messagemanager"+MessageManager.inst()?"messagemanager":0;
		}
		if(Main.DUBUGGER){
			Main.txt.text += "\n messagemanager"+CustomEvt.COLLECT_START?"CustomEvt.COLLECT_START":0;
		}
		MessageManager.inst().addListener(CustomEvt.COLLECT_END,this.onCollectCD,this);
		MessageManager.inst().addListener(CustomEvt.TAX_START,this.onTaxStart,this);
		MessageManager.inst().addListener(CustomEvt.NEIWU_CD,this.onNeiwuCd,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_CITY,this.onGuideClickCity,this);
		this.addTouchEvent(this.icon_img, this.touchIcon);
		
		this.onTaxStart();
		if(Main.DUBUGGER){
			Main.txt.text += "\n ready tax"
		}
		this.onCollectStart();
		if(Main.DUBUGGER){
			Main.txt.text += "\n ready collect"
		}
		this.onCollectCD();
		if(Main.DUBUGGER){
			Main.txt.text += "\n ready collect cd"
		}
		// if(Main.DUBUGGER){
		// 	Main.txt.text += "\n ready sound"
		// }
		// SoundManager.inst().playBg(`${MUSIC}home.mp3`);
		// if(Main.DUBUGGER){
		// 	Main.txt.text += "\n bg sound ok"
		// }
		// SoundManager.inst().touchBg();
		// if(Main.DUBUGGER){
		// 	Main.txt.text += "\n soundfinish"
		// }
		
		// let firemc:MovieClip = new MovieClip();
		// this.map_group.addChild(firemc);
		// firemc.playFile(`${EFFECT}fire`,-1);
		// firemc.x = this.firepos.x;
		// firemc.y = this.firepos.y;
		// if(Main.DUBUGGER){
		// 	Main.txt.text += "\n firemc finish"
		// }
		for( let i = 0 ; i < this.btn_name.length ; i ++ ) {
			this.addTouchEvent( this[ `${this.btn_name[i]}_btn` ] , this.touchTapHandler , true );
		}
		this.addTouchEvent( this.recharge_img , this.touchTapHandler , true );
		this.rechargeRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.recharge,this);
		// this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
		this.onNeiwuCd();
		if(Main.DUBUGGER){
			Main.txt.text += "\n neuwu finish"
		}

		
		this.watcher1 = eui.Binding.bindProperty(GameApp,["gold"],this.gold_label,"text");
		this.watcher2 = eui.Binding.bindProperty(GameApp,["goods"],this.goods_label,"text");
		this.watcher3 = eui.Binding.bindProperty(GameApp,["medal"],this.medal_label,"text");
		this.watcher4 = eui.Binding.bindHandler(GameApp,["soldier1Num"],this.onSolderChange,this)
		this.watcher5 = eui.Binding.bindHandler(GameApp,["soldier2Num"],this.onSolderChange,this)
		this.watcher6 = eui.Binding.bindHandler(GameApp,["soldier3Num"],this.onSolderChange,this)
		this.watcher7 = eui.Binding.bindProperty(GameApp,["exp"],this.exp_label,"text");
		if(Main.DUBUGGER){
			Main.txt.text += "\n watcher finish"
		}
		
		TimerManager.inst().doTimer(1000,0,this.onGlobalTimer,this);
		this.yearLab.text = GlobalFun.getYearShow();
		this.yearLab.mask = this.yearMask;
		

		let firststr:string = egret.localStorage.getItem(LocalStorageEnum.ENTER_FIRST);
		if(!firststr){
			if(Main.DUBUGGER){
				Main.txt.text += "\n start guide"
			}
			this.rewardCards = [];
			this.rewardGroup["autoSize"]();
			this.firstRect.visible = true;
			this.touchEnabled =  false;
			this.touchChildren = false;
			
			this.rewardGroup.visible = true;
			egret.localStorage.setItem(LocalStorageEnum.ENTER_FIRST,"1");
			let self = this;
			let cards:CardAttrVo[] = GlobalFun.getOwnCards();
			if(!cards){
				self.onStartGuide()
				GlobalFun.showAnimateleaf();
				self.firstRect.visible = false;
				self.rewardGroup.visible = false;
			}
			let timeout2 = setTimeout(function() {
				clearTimeout(timeout2);
				for(let i:number = 1;i<=cards.length;i++){
					let item:ShopItem = new ShopItem();
					item.alpha = 0;
					item.anchorOffsetX = item.width>>1;
					item.anchorOffsetY = item.height>>1;
					self.rewardGroup.addChild(item);
					item.initData(cards[i-1],false,"reward");
					let qualityIndex:number = cards[i-1].type == CardType.general?4:cards[i-1].quality;
					GlobalFun.lighting(item,GameApp.qualityColor[qualityIndex]);
					if(i<=5){
						item.x = (i-1)*(item.width + 10) + 125;
						item.y = item.height>>1;
					}else{
						item.x = (i-1-5)*(item.width + 10);
						item.y = (item.height>>1)+item.height + 10;
					}
					item.scaleX = item.scaleY = 0;
					self.rewardCards.push(item);
					let timeout = setTimeout(function(_item) {
						clearTimeout(timeout)
						SoundManager.inst().playEffect(`${MUSIC}reward.mp3`)
						egret.Tween.get(_item).to({alpha:1,scaleX:1,scaleY:1},600,egret.Ease.backOut).call(()=>{
							egret.Tween.removeTweens(_item);
							if(i >= cards.length){
								self.touchEnabled =  true;
								self.touchChildren = true;
								let font:eui.Label = new eui.Label();
								font.text = "Click to receive the login reward";
								self.rewardGroup.addChild(font);
								font.horizontalCenter = 0;
								font.verticalCenter = 220;
								font.alpha = 0;
								egret.Tween.get(font,{loop:true}).to({alpha:1},1000).to({alpha:0},1000);
								self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.onTouchClickReward,self);
							}
						},self)
					}, 150*(i-1),item);
				}
			}, 700);
			
			
		}else{
			if(Main.DUBUGGER){
				Main.txt.text += "\n init bth"
			}
			this.init();
			GlobalFun.showAnimateleaf();
		}
	}
	private touchIcon()
	{
		ViewManager.inst().open(PlayerInfoView);
	}
	private recharge():void{
		ViewManager.inst().open(RechargePopUp);
	}
	private onGuideClickCity():void{
		
		ViewManager.inst().open(BattleProgressPop,[{cityId:this.guideCity.cityId}]);
	}
	private onTouchClickReward():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchClickReward,this);
		for(let i:number = 0;i<this.rewardCards.length;i++){
			let item:ShopItem = this.rewardCards[i];
			let cardBtnStagePos:egret.Point = this.btn_group.localToGlobal(this.kazu_btn.x,this.kazu_btn.y);
			let localXy:egret.Point = this.rewardGroup.globalToLocal(cardBtnStagePos.x,cardBtnStagePos.y);
			let self = this
			let timeout = setTimeout(function(_item) {
				clearTimeout(timeout)
				SoundManager.inst().playEffect(`${MUSIC}collect.mp3`)
				egret.Tween.get(_item).to({scaleX:0,scaleY:0,alpha:0,x:localXy.x,y:localXy.y},600,egret.Ease.circIn).call(()=>{
					egret.Tween.removeTweens(_item);
					if(i >= self.rewardCards.length-1){
						self.rewardCards = [];
						self.rewardGroup.removeChildren();
						self.firstRect.visible = false;
						self.rewardGroup.visible = false;
						self.touchEnabled = false;
						self.touchChildren = false;
						self.init();
						let guideTime = setTimeout(function() {
							clearTimeout(guideTime);
							self.onStartGuide()
							GlobalFun.showAnimateleaf();
						}, 1000);
					}
				},self)
			}, 150*(i-1),item);
		}
	}
	/**Start guidance */
	private onStartGuide():void{
		ViewManager.inst().open(GuideView);
		GameApp.guideView = ViewManager.inst().getView(GuideView) as GuideView;
		if(GameApp.guideView){
			if(this.guideCity){
				this.touchEnabled = true;
				this.touchChildren = true;
				GuideCfg.guidecfg["1_1"].cnt = `commander，Want to consolidate the foundation，Must be taken first.${NameList.inst().city_name[ this.guideCity.cityId-1 ]}！`;
				GameApp.guideView.nextStep({id:"1_1",comObj:this.guideCity,width:this.guideCity.width,height:this.guideCity.height,offsetX:-this.guideCity.width/2,offsetY:-this.guideCity.height/2});
			}
		}
	}
	private guideCity:MainCityItem;
	/**Display level */
	private showLevel():void{
		let allCitys:CityInfo[] = GameApp.roleInfo.citys;
		let unlockCitys:CityInfo[] = [];
		for(let i:number = 0;i<allCitys.length;i++){
			let itemCity:CityInfo = allCitys[i];
			let city:MainCityItem = this.map_group.getChildByName(itemCity.cityId.toString()) as MainCityItem;
			city.hideBattleIcon();
			if(!itemCity.isOwn){
				// GlobalFun.changeCityInfo(itemCity.cityId,{isOpen:false})
				GlobalFun.filterToGrey(city);
			}else{
				if(!itemCity.isMain){
					city.showBattleIcon();
				}
				unlockCitys.push(itemCity);
				GlobalFun.clearFilters(city);
			}
		}
		let minCityInfo:CityInfo = this.getMinOrMaxCity(unlockCitys,"min");
		let maxCityInfo:CityInfo = this.getMinOrMaxCity(unlockCitys,"max");
		if(minCityInfo && minCityInfo.cityId - 1 >= 1){
			GlobalFun.changeCityInfo((minCityInfo.cityId-1),{isOpen:true})
			let minCity:MainCityItem = this.map_group.getChildByName((minCityInfo.cityId-1).toString()) as MainCityItem;
			this.guideCity = minCity;
			GlobalFun.clearFilters(minCity);
			minCity.showBattleIcon();
		}
		if(maxCityInfo && maxCityInfo.cityId + 1 <= 9){
			GlobalFun.changeCityInfo((maxCityInfo.cityId+1),{isOpen:true})
			let maxCity:MainCityItem = this.map_group.getChildByName((maxCityInfo.cityId+1).toString()) as MainCityItem;
			if(!this.guideCity){
				this.guideCity = maxCity;
			}
			GlobalFun.clearFilters(maxCity);
			maxCity.showBattleIcon();
		}
	}
	private getMinOrMaxCity(cityinfo:CityInfo[],oper:string):CityInfo{
		let city:CityInfo = cityinfo[0];
		for(let i:number = 0;i<cityinfo.length;i++){
			let condition:boolean = oper == "max"?city.cityId < cityinfo[i].cityId:city.cityId > cityinfo[i].cityId;
			if(city != cityinfo[i] && condition){
				city = cityinfo[i];
			}
		}
		return city
	}
	private onSolderChange():void{
		// let soldier_num = GameApp.soldier1Num + GameApp.soldier2Num + GameApp.soldier3Num;
		this.exp_label.text = `${GameApp.exp}`;
	}
	/**Tax revenue after occupying the city */
	private onGlobalTimer():void{
		let allCitys:CityInfo[] = GameApp.roleInfo.citys;
		for(let i:number = 0;i<allCitys.length;i++){
			let itemCity:CityInfo = allCitys[i];
			if(itemCity.isMain && !itemCity.isOnly){
				//Currently occupied And not the main city;
				let nowTime:number = new Date().getTime();
				let city:MainCityItem = this.map_group.getChildByName(itemCity.cityId.toString()) as MainCityItem;
				if(itemCity.isEnemy){
					if(!city.ifHasEnemy){
						GlobalFun.changeCityInfo(itemCity.cityId,{isEnemy:true})
						city.showEnemyGroup();
					}
				}else{
					city.hideEnemyGroup();
				}
				if(nowTime - itemCity.timespan >= 5*60*1000){
					//present time - Time recorded by the current city greater than5Minute 。It can show that the collection
					this.showCityCollect(itemCity.cityId);
					if(city){
						if(!city.ifHasEnemy){
							GlobalFun.changeCityInfo(itemCity.cityId,{isEnemy:true})
							city.showEnemyGroup();
						}
					}
				}else{
					this.hideCityCollect(itemCity.cityId);
				}
			}
		}
	}
	/**Display the status that the city can collect */
	private showCityCollect(cityid:number):void{
		let group:eui.Group = this.map_group.getChildByName("tax_"+cityid) as eui.Group;
		if(group){return}
		group = new eui.Group();
		group.touchChildren = false;
		group.touchThrough = false;
		group.touchEnabled = true;
		group.name = "tax_"+cityid;
		this.map_group.addChild(group)
		let iconImg:eui.Image = new eui.Image("tax_goods_png");
		iconImg.width = 54;
		iconImg.height = 26;
		group.addChild(iconImg);
		let numTxt:eui.Label = new eui.Label();
		group.addChild(numTxt);
		numTxt.text = GlobalFun.getCityInfo(cityid).goodProduce.toString()
		numTxt.anchorOffsetX = numTxt.width>>1;
		numTxt.anchorOffsetY = numTxt.height;
		numTxt.x = iconImg.x + (iconImg.width>>1);
		numTxt.y = 5;
		numTxt.size = 20;
		let city:MainCityItem =  this.map_group.getChildByName(cityid.toString()) as MainCityItem;
		
		group.anchorOffsetX = group.width>>1;
		if(city){
			group.x = city.x ;
			group.y = city.y - 80;
		}else{
			console.log("Current city does not exist-----id:"+cityid)
		}
		egret.Tween.get(group,{loop:true}).to({rotation:group.rotation - 5},50).to({rotation:group.rotation + 5},50).to({rotation:group.rotation - 5},50).to({rotation:group.rotation + 5},50).wait(1000);
	}
	/**Hidden city can be collected */
	private hideCityCollect(cityid:number):void{
		let group:eui.Group = this.map_group.getChildByName("tax_"+cityid) as eui.Group;
		if(group && group.parent){
			egret.Tween.removeTweens(group);
			group.parent.removeChild(group);
		}
	}
	/**Click collection */
	private clickCollect(cityId:number):void{
		let product:number = GlobalFun.getCityInfo(cityId).goodProduce;
		UserTips.inst().showTips("Acquisition of materialsx"+product);
		GameApp.goods += product;
		GlobalFun.changeCityInfo(cityId,{timespan:new Date().getTime()});
		this.hideCityCollect(cityId);
	}
	public close():void{
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onChildrenCreated,this);
		this.rechargeRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.recharge,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_CITY,this.onGuideClickCity,this);
		this.map_group.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCityTouch,this);
		TimerManager.inst().remove(this.onGlobalTimer,this);
		if(this.collectInterVal){clearInterval(this.collectInterVal)};
		if(this.collectCdInterVal){clearInterval(this.collectCdInterVal)};
		if(this.taxInterVal){clearInterval(this.taxInterVal)}
		if(this.neiwuInterval){clearInterval(this.neiwuInterval)}
		MessageManager.inst().removeListener(CustomEvt.COLLECT_START,this.onCollectStart,this);
		MessageManager.inst().removeListener(CustomEvt.COLLECT_END,this.onCollectCD,this);
		MessageManager.inst().removeListener(CustomEvt.TAX_START,this.onTaxStart,this);
		for( let i = 0 ; i < this.btn_name.length ; i ++ ) {
			this.removeTouchEvent( this[ `${this.btn_name[i]}_btn` ] , this.touchTapHandler );
		}
		this.removeTouchEvent( this.recharge_img , this.touchTapHandler );
		MessageManager.inst().removeListener(CustomEvt.NEIWU_CD,this.onNeiwuCd,this);
		if(this.watcher1){this.watcher1.unwatch()}
		if(this.watcher2){this.watcher1.unwatch()}
		if(this.watcher3){this.watcher1.unwatch()}
		if(this.watcher4){this.watcher1.unwatch()}
		if(this.watcher5){this.watcher1.unwatch()}
		if(this.watcher6){this.watcher1.unwatch()}
		if(this.watcher7){this.watcher1.unwatch()}

		this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mapMove, this);
		this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mapBegin, this);
		this.touch_map.removeEventListener(egret.TouchEvent.TOUCH_END, this.mapEnd, this);
	}

	private init():void {
		
		this.btnInit();
		this.setInfoUI();
		this.cityItemInit();
		this.showLevel();
		
		this.map_group.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCityTouch,this);
	}
	private onCityTouch(evt:egret.TouchEvent):void{
		let cityName:string = evt.target.name;
		if(!!~cityName.indexOf("tax")){
			//Click tax
			this.clickCollect(parseInt(cityName.split("_")[1]))
		}else{
			//Click the gate city
			let city:MainCityItem = this.map_group.getChildByName(cityName) as MainCityItem;
			if(city && city.ifHasEnemy){
				let levelIndex:number = (Math.random()*4+1)>>0
				GameCfg.chapter = 1;
				GameCfg.level = levelIndex;
				ViewManager.inst().close(GameMainView);
				ViewManager.inst().open(DoubtfulView,[{type:cityName}]);
				return;
			}
			if(!!cityName){
				let cityInfo:CityInfo = GlobalFun.getCityInfo(parseInt(cityName));
				if(cityInfo.cityId>9)
				{
					UserTips.inst().showTips("Unlock");
					return;
				}
				if(cityInfo.isMain){
					UserTips.inst().showTips("The current city has been occupied");
					return;
				}
				if(!cityInfo.isOpen){
					UserTips.inst().showTips("Please occupy the last city first");
					return;
				}
				ViewManager.inst().open(BattleProgressPop,[{cityId:cityInfo.cityId}]);
			}	
			
		}
		
	}
	private touchTapHandler( e:egret.TouchEvent ):void {
		// console.log( e.stageX - 52 , e.stageY - 68 );
		for( let i = 0 ; i < this.btn_name.length ; i ++ ) {
			if( e.target == this[ `${this.btn_name[i]}_btn` ] ) {
				this.btnTouch( this.btn_name[i] );
			}
		}
		switch( e.target ) {
			case this.recharge_img:
				ViewManager.inst().open(RechargePopUp)
				break;
		}
	}

	private btnInit():void {
		egret.Tween.get(this.yearMask).to({width:248},1000).call(()=>{
			egret.Tween.removeTweens(this.yearMask);
		},this)
		let self = this;
		egret.Tween.get(this.btn_group).to({alpha:1},600).call(()=>{egret.Tween.removeTweens(this.btn_group)},this)
		for( let i = 0 ; i < self.btn_name.length ; i ++ ) {
			let btn = self[ `${self.btn_name[i]}_btn` ];
			btn.alpha = 0;
		}
		let timeout = setTimeout(function() {
			for( let i = 0 ; i < self.btn_name.length ; i ++ ) {
				let btn = self[ `${self.btn_name[i]}_btn` ];
				let btn_y = btn.y;
				btn.y = self.btn_group.height;
				btn.alpha = 1;
				egret.Tween.get( btn )
				.wait( 150 * i )
				.to( { y:btn_y } , 800 , egret.Ease.backOut );
			}
		}, 300);

		let scale = this.stage.stageWidth / 1334;
		let timeout2 = setTimeout(function() {
			clearTimeout(timeout2)
			let cardBtnStagePos:egret.Point = self.btn_group.localToGlobal(self.kazu_btn.x,self.kazu_btn.y);
			GameApp.cardStaticX = cardBtnStagePos.x;
			GameApp.cardStaticY = cardBtnStagePos.y;
			egret.Tween.get(self.role_img).to({alpha:1},600).call(()=>{
				egret.Tween.removeTweens(self.role_img);
				self.role_img2.alpha = 1;
				egret.Tween.get(self.role_img2,{loop:true}).to({scaleX:scale+0.01,scaleY:scale + 0.01,alpha:0.8},500).to({scaleX:scale,scaleY:scale,alpha:0},500).wait(1500);
			},self)
		}, 600);
		
	}

	private setInfoUI():void {
		this.gold_label.text = `${GameApp.gold}`;
		this.goods_label.text = `${GameApp.goods}`;
		this.medal_label.text = `${GameApp.medal}`;
		// let soldier_num = GameApp.soldier1Num + GameApp.soldier2Num + GameApp.soldier3Num;
		this.exp_label.text = `${GameApp.exp}`;
		let main_id: number = 0;
		for( let i = 0 ; i < 9 ; i ++ ) {
			let isMain = GlobalFun.getCityInfo( i + 1 ).isMain;
			if ( isMain == true ) {
				main_id = i;
			}
		}
		this.main_city_label.text = `${NameList.inst().city_name[main_id]}`;
		this.name_label.text = `${GameApp.roleInfo.name}`;
	}

	private cityItemInit():void {
		for( let i = 0 ; i < 13 ; i ++ ) {
			let item = new MainCityItem( i );
			item.x = this.city_pos[i].x + 80;
			item.y = this.city_pos[i].y;
			item.name = (i+1).toString();
			this.map_group.addChild( item );
			item.alpha = 0;
			egret.Tween.get(item).to({alpha:1,y:this.city_pos[i].y + 80,scaleX:1,scaleY:1},100*(i+1),egret.Ease.backOut).call(()=>{
				egret.Tween.removeTweens(item);
			},this)
		}
	}

	private btnTouch( name: string ):void {
		switch( name ) {
			case `shuishou`:
				ViewManager.inst().open(TaxPopUp);
				break;
			case `zhengbing`:
				ViewManager.inst().open(CollectSoldierPop);
				break;
			case `neiwu`:
				ViewManager.inst().open(NeiWuPopUp);
				break;
			case `kazu`:
				ViewManager.inst().open( CardView );
				break;
			case `jiuguan`:
				ViewManager.inst().open(PubView);
				break;
			case `shangcheng`:
				ViewManager.inst().open(ShopView);
				break;
		}
	}

	/**Tax cooling time */
	private onTaxStart():void{
		let self = this;
		this.taxInterVal = setInterval(()=>{
			let endTime:string = egret.localStorage.getItem(LocalStorageEnum.TAX_CD_TIME);
			if(endTime && parseInt(endTime) <= new Date().getTime()){
				//Tax revenue is full
				clearInterval(self.taxInterVal);
				// egret.localStorage.setItem(LocalStorageEnum.TAX_CD_TIME,"");
				//Main interface prompt Receiving status
			}else{
				clearInterval(self.taxInterVal);
			}
		},1000)
	}
	/**Start conscription */
	private onCollectStart():void{
		let self = this;
		this.collectInterVal = setInterval(()=>{
			let endTime:string = egret.localStorage.getItem(LocalStorageEnum.collectTime);
			if(endTime && parseInt(endTime) <= new Date().getTime()){
				clearInterval(self.collectInterVal);
				//Current status can be collected 。The conscription is over 。Need to click to collect 。Main interface prompt
			}else{
				clearInterval(self.collectInterVal);
			}
		},1000)
	}
	/**conscriptioncdEnd */
	private onCollectCD():void{
		let self = this;
		this.collectCdInterVal = setInterval(()=>{
			let endTime:string = egret.localStorage.getItem(LocalStorageEnum.COLLECT_CD_TIME);
			if(endTime && parseInt(endTime) <= new Date().getTime()){
				egret.localStorage.setItem(LocalStorageEnum.COLLECT_CD_TIME,"");
			}else{
				clearInterval(self.collectCdInterVal);
			}
		},this)
	}

	private adapter():void {
		if(Main.DUBUGGER){
			Main.txt.text += "\n ready adapter";
		}
		let scale = this.stage.stageWidth / 1334;
		if(Main.DUBUGGER){
			Main.txt.text += "\n adapter scale "+scale;
		}
		this.btn_group.scaleX = this.btn_group.scaleY = scale;
		if(Main.DUBUGGER){
			Main.txt.text += "\n "+this.btn_group?"btngroup":0;
		}
		this.info_group.scaleX = this.info_group.scaleY = scale;
		if(Main.DUBUGGER){
			Main.txt.text += "\n "+this.info_group?"info_group":0;
		}
		this.map_group.scaleX = this.map_group.scaleY = scale;
		if(Main.DUBUGGER){
			Main.txt.text += "\n "+this.map_group?"map_group":0;
		}
		this.role_img.scaleX = this.role_img.scaleY = scale;
		if(Main.DUBUGGER){
			Main.txt.text += "\n "+this.role_img?"role_img":0;
		}
		this.role_img2.scaleX = this.role_img2.scaleY = scale;
		if(Main.DUBUGGER){
			Main.txt.text += "\n "+this.role_img2?"role_img2":0;
		}
		this.role_img2.alpha = 0;
		this.role_img.alpha = 0;
		if(Main.DUBUGGER){
			Main.txt.text += "\n adapter finsish";
		}
	}
	/**The interiorcd */
	private onNeiwuCd():void{
		let self = this;
		this.neiwuInterval = setInterval(()=>{
			let endTime:string = egret.localStorage.getItem(LocalStorageEnum.NEIWU_CD_TIME);
			if(endTime && parseInt(endTime) <= new Date().getTime()){
				egret.localStorage.setItem(LocalStorageEnum.NEIWU_CD_TIME,"");
			}else{
				clearInterval(self.neiwuInterval);
			}
		},this)
	}

}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);