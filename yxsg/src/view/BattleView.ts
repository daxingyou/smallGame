class BattleView extends BaseEuiView{

	private _levelCfg:LevelItemCfg;
	private _centerX:number;
	private _centerY:number;
	private _ownEntitys:SoldierEntity[];
	private _levelEntitys:SoldierEntity[];
	private _entitys:SoldierEntity[];
	
	// private levelNameLab:eui.Image;
	// private roleName:eui.Label;
	// private jobName:eui.Image;
	// private headIcon:eui.Image;

	// private hpBar:eui.Image;
	// private barMask:eui.Image;
	// private hpNumLab:eui.Label;

	// private curhp:number;
	// private totalHp:number;
	//我方将领
	// private ownGeneralGroup:eui.Group;
	// private _ownMc:MovieClip;
	//敌方将领
	// private levelGeneralGroup:eui.Group;
	// private _levelMc:MovieClip;
	private bg:eui.Image;

	private row:number = 7;
	private col:number = 5;
	private _singleFrame:number = 33.3;
	private _curTime:number = 0;
	private actionExecStandTime:number = 1000;

	private _levelCamp:number;
	private campIndex:number[] = [0,1,2];
	private skillGroup:eui.Group;

	private myPower:eui.Label;
	private enemyPower:eui.Label;

	private shopBtn:eui.Image;
	private bagBtn:eui.Image;
	private powerTitle:eui.Image;
	private returnBtn:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		// this.alpha = 0;
		let w:number = StageUtils.ins<StageUtils>().getWidth();
		let h:number = StageUtils.ins<StageUtils>().getHeight();
		this.bg.anchorOffsetX = w>>1;
		this.bg.anchorOffsetY = h>>1;
		this.bg.width = w
		this.bg.height = h
		this.bg.x = w>>1;
		this.bg.y = h>>1;
		this.bg.scaleX = this.bg.scaleY = 3;
		egret.Tween.get(this.bg).to({scaleX:1,scaleY:1},1000,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.bg);
		},this)
		let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
		let index:number = this.campIndex.indexOf(parseInt(campstr));
		this.campIndex.splice(index,1);
		this._levelCamp = this.campIndex[((Math.random()*2)>>0)];
		
		// this.addMainCom(null,false);
		this._centerX = StageUtils.ins<StageUtils>().getWidth()>>1;
		this._centerY = StageUtils.ins<StageUtils>().getHeight()>>1;
		this._ownEntitys = [];
		this._levelEntitys = [];
		this._entitys = [];
		if(param && param.length && param[0].level){
			this._levelCfg = LevelCfg.levelCfg[param[0].level - 1]
		}
		let bgid:number = this._levelCfg.level >= 3?3:this._levelCfg.level;
		this.bg.source = `battle_bg_${bgid}_png`;
		// this.levelNameLab.source = this._levelCfg.campaigName;
		// this.roleName.text = this._levelCfg.name;
		// this.jobName.source = `title_job_${this._levelCfg.job}_png`;
		// this.headIcon.source = this._levelCfg.headIcon;
		// this.curhp = this.totalHp = this._levelCfg.soldierEnum.length*10*100;
		// this.hpNumLab.text = this.curhp + "/" + this.totalHp;
		// this.hpBar.mask = this.barMask;

		this.enemyPower.text = (this._levelCfg.level * 1500).toString();

		this.myPower.text = GameApp.ins<GameApp>().rolePower.toString();


		// StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.GAMELOADINGEND,this.onLoadingEnd,this);
		StageUtils.ins<StageUtils>().getStage().addEventListener(StartGameEvent.USE_BUFF,this.onUseBuff,this);

		this.onLoadingEnd();

		this.addMainCom(null,true,null,true,100);
		this.addTouchEvent(this.bagBtn,this.onOpenBg,true);
		this.addTouchEvent(this.shopBtn,this.onOpenShop,true);
		this.addTouchEvent(this.returnBtn,this.returnHome,true);
	}
	private onOpenBg():void{
		ViewManager.ins<ViewManager>().open(BagPopUp);
	}
	private onOpenShop():void{
		ViewManager.ins<ViewManager>().open(ShopView);
	}
	private onUseBuff(evt:StartGameEvent):void{
		let camp:number = evt.data.camp;
		if(camp == 1){
			let leve1str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF1_LEVEL);
			let leve2str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF2_LEVEL);
			let leve3str:string = egret.localStorage.getItem(LocalStorageEnum.STUDY_BUFF3_LEVEL);
			if(parseInt(leve1str) >= 1 && parseInt(leve2str) >= 1 && parseInt(leve3str) >= 1){
				this.addOwnBuff(camp);
			}
		}else{
			this.addOwnBuff(camp);
		}
		
		
	}
	private onLoadingEnd():void{
		// let img:eui.Image = new eui.Image();
		// this.addChild(img);
		// img.horizontalCenter = 0;
		// img.verticalCenter = 0;
		// img.source = "start_lab_png";
		// img.scaleX = img.scaleY = 2.2;
		// this.alpha = 1;
		this.createEntity();
		// this.touchEnabled = true;
		// egret.Tween.get(img).to({scaleX:1,scaleY:1},600,egret.Ease.circIn).to({alpha:0},600).call(()=>{
			// egret.Tween.removeTweens(img);
			// img.parent.removeChild(img);
			this.initialize();
		// },this)
	}
	private _levelgeneral:SoldierEntity;
	private _ownGeneral:SoldierEntity;
	private createEntity():void{
		this.createLevelGroup(1);
		this.createLevelGroup(0);
		// if(!this.levelGeneralGroup){
		// 	this.levelGeneralGroup = new eui.Group();
		// 	this.addChild(this.levelGeneralGroup);
		// }
		let levelGeneral:SoldierEntity = ObjectPool.pop("SoldierEntity");
		levelGeneral.general = true;
		// levelGeneral.scaleX = levelGeneral.scaleY = 1.5;
		levelGeneral.hp = levelGeneral.thp = 150;
		levelGeneral.setSoldierData(0,"general_1",50,130,-1,120);
		// levelGeneral.scaleX = levelGeneral.scaleY = 1.2;
		this._levelgeneral = levelGeneral;
		
		
		this.addChild(levelGeneral);
		this._entitys.push(levelGeneral);
		this._levelEntitys.push(levelGeneral);
		// let levelMc:MovieClip = new MovieClip();
		// this.levelGeneralGroup.addChild(levelMc);
		// let res2:string = GlobalFun.getMainEntityRes(ActionEnum.stand)
		// levelMc.playFile(`${EFFECT}level/level_${this._levelCfg.level}_idle`,-1);
		// this._levelMc = levelMc;  
		levelGeneral.x = StageUtils.ins<StageUtils>().getWidth()+50;
		levelGeneral.y = this._centerY + 30;
		// this.levelGeneralGroup.scaleX = this.levelGeneralGroup.scaleY = 0.6;
		// this.levelGeneralGroup.scaleX = -0.6;  
		// if(!this.ownGeneralGroup){
		// 	this.ownGeneralGroup = new eui.Group();
		// 	this.addChild(this.ownGeneralGroup);
		// }
		// this.ownGeneralGroup.scaleX = this.ownGeneralGroup.scaleY = 0.6;
		// let ownMc:MovieClip = new MovieClip();
		// this.ownGeneralGroup.addChild(ownMc);
		// this._ownMc = ownMc;
		// let res:string = GlobalFun.getMainEntityRes(ActionEnum.stand)
		// ownMc.playFile(`${EFFECT}${res}`,-1,null,null,DirectionEnum.RIGHT.toString());
		let poolEntity = new SoldierEntity();
		poolEntity.ObjectPoolKey = "SoldierEntity";
		ObjectPool.push(poolEntity);
		let ownGeneral:SoldierEntity = ObjectPool.pop("SoldierEntity");
		// ownGeneral.scaleX = ownGeneral.scaleY = 0.4;
		ownGeneral.general = true;
		ownGeneral.hp = ownGeneral.thp = 150;
		ownGeneral.setSoldierData(1,"own_general",50,130,-1,120);
		// ownGeneral.scaleX = ownGeneral.scaleY = 1.2;
		
		this._ownGeneral = ownGeneral;
		
		this.addChild(ownGeneral);
		this._ownEntitys.push(ownGeneral);
		this._entitys.push(ownGeneral);
		ownGeneral.x = -50;
		ownGeneral.y = this._centerY + 30;

		this.dealLayerRelation();

		//技能组
		let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
		let skillCfg:any = SkillCfg.skillCfg[parseInt(campstr)];
		let generalInfostr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
		let arr:string[] = generalInfostr?generalInfostr.split("_"):[];
		for(let i:number = 0;i<skillCfg.length;i++){
			let img:eui.Image = new eui.Image();
			img.source = skillCfg[i].roleHead;
			this.skillGroup.addChild(img);
			img.left = i*(img.width + 20);
			img.bottom = 0
			img.name = skillCfg[i].skillId 
			if(arr.indexOf(skillCfg[i].skillId.toString()) == -1){
				img.name = skillCfg[i].skillId + "_unlock";
				GlobalFun.filterToGrey(img);
			}else{
				img.name += "_lock";
			}
		}
		// if(generalInfostr){
		// 	for(let i:number = 0;i<arr.length;i++){
		// 		let img:eui.Image = new eui.Image();
		// 		let curSkillCfg:any = {};
		// 		for(let j:number = 0;j<skillCfg.length;j++){
		// 			if(skillCfg[j].skillId == parseInt(arr[i])){
		// 				//当前技能id相等
		// 				curSkillCfg = skillCfg[j];
		// 				break;
		// 			}
		// 		}
		// 		img.source = curSkillCfg.roleHead;
		// 		this.skillGroup.addChild(img);
		// 		img.left = i*(img.width + 10);
		// 		img.name = curSkillCfg.skillId;
		// 	}
		// }
		// this.skillGroup.right = 20;
		// this.skillGroup.bottom = 20;
		this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkillTap,this);
	}
	private onSkillTap(evt:egret.TouchEvent):void{
		let name:string = evt.target.name;
		if(name){
			let namearr:string[] = name.split("_");
			if(namearr[1] == "unlock"){
				UserTips.ins<UserTips>().showTips(`未解锁该技能,通过<font color=0x00ff00>[天坛]</font>解锁`)
				return;
			}
			let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
			let xy:XY = {x:0,y:0};
			if(this._levelgeneral.isDead){
				let index:number = (Math.random()*this._levelEntitys.length)>>0;
				let soldier:SoldierEntity = this._levelEntitys[index];
				xy.x = soldier.x;
				xy.y = soldier.y;
			}else{
				xy.x= this._levelgeneral.x;
				xy.y = this._levelgeneral.y;
			}
			if(evt.target && evt.target.parent){
				evt.target.parent.removeChild(evt.target);
			}
			let skillcfgs:any = SkillCfg.skillCfg[parseInt(campstr)];
			let curskillCfg:any;
			for(let key in skillcfgs){
				if(skillcfgs[key].skillId == parseInt(namearr[0])){
					curskillCfg = skillcfgs[key];
					break;
				}
			}
			let damgeNum:number = curskillCfg.damageNum;
			let dmgValue:number = curskillCfg.damageValue;
			for(let i:number = 0;i<damgeNum;i++){
				let index:number = (Math.random()*this._levelEntitys.length)>>0;
				let entity:SoldierEntity = this._levelEntitys[index];
				entity.reduceHp(dmgValue);
			}
			GlobalFun.createSkillEff(parseInt(campstr),parseInt(namearr[0]),this,1,xy);
		}
	}
	/**初始化 */
	public initialize():void{
		GameApp.battleState = true;
		this._curTime = 0
		// let self = this;
		// let timeout = setTimeout(()=>{
		// 	clearTimeout(timeout);
		// 	let index:number = (Math.random()*100)>>0;
		// 	let atkTar:SoldierRect;
		// 	let damageTar:SoldierRect;
		// 	let camp:number = 1;
		// 	if(index <= 50){//己方先手camp = 1;
		// 	}else{//敌方先手
		// 		camp = -1;
		// 	}
		// 	self.loopAtk(camp)
		// },1500)
		egret.startTick(this.actionExec,this);
	}
	/**动作执行 */
	private actionExec(timespan:number):boolean{
		this._curTime += this._singleFrame;
		if(this._curTime >= this.actionExecStandTime){
			this._curTime = 0;
			this.action(1);
			this.action(0);
		}
		return false;
	}
	private action(camp:number):void{
		let ownEntitys:SoldierEntity[] = camp ==1?this._ownEntitys:this._levelEntitys;
		let levelEntitys:SoldierEntity[] = camp == 1?this._levelEntitys:this._ownEntitys;
		for(let i:number = 0;i<ownEntitys.length;i++){
			let item:SoldierEntity = ownEntitys[i];
			if(item.isDead){
				for(let j:number = 0;j<this._entitys.length;j++){
					if(this._entitys[j] == item){
						this._entitys.splice(j,1);
						break;
					}
				}
				item.dispose();
				ownEntitys.splice(i,1);
				i-=1;
				continue;
			}else{
				let index:number = (Math.random()*levelEntitys.length)>>0;
				let atkItem:SoldierEntity;
				atkItem = this.getNearByEntity(item,levelEntitys);
				item.lookAt(atkItem);
				if(item.isInAtkDis()){
					//在攻击距离
					item.execAtkAction();
				}else{
					if(this.checkFrontBlock(camp,item,ownEntitys)){
						let dicObj:{dit:number} = this.checkYBlock(item,ownEntitys);
						if(dicObj.dit){
							//存在可以移动的身位
							let offradom:number = (Math.random()*100)>>0
							if(item.y + offradom >= StageUtils.ins<StageUtils>().getHeight()){
								offradom = StageUtils.ins<StageUtils>().getHeight() - 20;
							}
							if(item.y - offradom <= 50){
								offradom = 50;
							}
							let offest:number = dicObj.dit == 1?item.y + offradom:item.y - offradom
							item.execYmoveAction(dicObj.dit,offest);
						}else{
							//y轴不可以移动 等待状态
							item.waitMoveAction();
						}
					}else{
						item.execMoveAction();
					}
				}
			}
		}
		this.dealLayerRelation();
		if(!ownEntitys.length || !levelEntitys.length){
			
			egret.stopTick(this.actionExec,this);
			for(let i:number = 0;i<this._entitys.length;i++){
				this._entitys[i].execStandAction();
			}
			if(this._ownEntitys.length){
				//胜利
				this.battleWin();
			}else{
				this.battleFail();
			}
		}
		
	}
	/**检测y轴是否有阻挡 */
	private checkYBlock(item:SoldierEntity,entitys:SoldierEntity[]):{dit:number}{
		let obj:{dit:number} = {dit:null};
		let y:number = item.y;
		for(let i:number = 0;i<entitys.length;i++){
			let otherItem:SoldierEntity = entitys[i];
			if(item != otherItem){
				let oy:number = otherItem.y;
				
				if(Math.abs(oy - y) >= 15){
					obj.dit = oy > y ? 1:-1;
					break;
				}
			}
		}
		return obj;
	}
	/**检测当前单位前方是否有阻挡 */
	private checkFrontBlock(camp:number,item:SoldierEntity,entitys:SoldierEntity[]):boolean{
		let boo = false;
		let x:number = item.x; 
		let y:number = item.y;
		for(let i:number = 0;i<entitys.length;i++){
			let otherItem:SoldierEntity = entitys[i];
			if(item != otherItem){
				let ox:number = otherItem.x ;
				let oy:number = otherItem.y;
				let dis:number = (item.w>>1) + (otherItem.w>>1) - 50;
				if(camp == 1){
					if(ox > x && (ox - x)<= dis && Math.abs(oy-y) <=10){
						boo = true;
						break;
					}
				}else{
					if(ox < x && (x-ox) <= dis && Math.abs(oy-y) <=10){
						boo = true;
						break;
					}
				}
				
			}
		}
		return boo;
	}
	/**获取最近攻击单位 */
	private getNearByEntity(atkEntity:SoldierEntity,soldiers:SoldierEntity[],filterEntity?:SoldierEntity):SoldierEntity{
		let minEntity:SoldierEntity = soldiers[0];
		if(minEntity){
			let dis:number = Math.sqrt(Math.pow(minEntity.x - atkEntity.x,2)+Math.pow(minEntity.y -atkEntity.y,2));
			for(let i:number = 1;i<soldiers.length;i++){
				if(soldiers[i].general || (filterEntity && filterEntity == soldiers[i])){continue;}
				let item1:SoldierEntity = soldiers[i];
				let dis2:number = Math.sqrt(Math.pow(item1.x - atkEntity.x,2)+Math.pow(item1.y -atkEntity.y,2));
				if(dis2 <= dis){
					minEntity = item1;
					dis = dis2;
				}
			}
		}
		return minEntity;
	}
	/**处理层级显示关系 */
	private dealLayerRelation():void{
		this._entitys.sort(this.sortFun);
		for(let i:number = 0;i<this._entitys.length;i++){
			this.setChildIndex(this._entitys[i],3+i);
		}
	}
	private sortFun(param1,param2):number{
		let s1y:number = param1.y;
		let s2y:number = param2.y;
		if(s1y > s2y){
			return 1;
		}else if(s1y < s2y){
			return -1;
		}else{
			return 0;
		}
	}
	//战斗失败处理
	private battleFail():void{
		GameApp.battleState = false;
		this.touchEnabled = false;
		ViewManager.ins<ViewManager>().open(ResultPopUp,[{state:0,cb:this.onReset,arg:this}])
	}
	//战斗成功处理
	private battleWin():void{
		GameApp.battleState = false;
		this.touchEnabled = false;
		egret.localStorage.setItem(LocalStorageEnum.LEVEL,(this._levelCfg.level+1).toString())
		ViewManager.ins<ViewManager>().open(ResultPopUp,[{state:1,cb:this.onClose,arg:this}])
	}
	private onReset(num:number):void{
		if(num){
			// this.roleHeadCom.resetHp();
			this.clear();
			this.onLoadingEnd();
		}else{
			this.onClose();
		}
	}
	private onClose():void{
		StageUtils.ins<StageUtils>().getStage().removeEventListener(StartGameEvent.GAMELOADINGEND,this.onLoadingEnd,this);
		ViewManager.ins<ViewManager>().close(BattleView);
		ViewManager.ins<ViewManager>().open(GameMainView);
		// ViewManager.ins<ViewManager>().open(GameLoadingUI,[{closeCls:BattleView}])
	}
	// //生成陨石天降
	// private createStone():void{
	// 	let curX:number = (Math.random()*200 + (this._centerX + 150))>>0;
	// 	let curY:number = -100;
	// 	let tarX:number = (Math.random()*300 + (this._centerX - 400))>>0;
	// 	let tarY:number = ( Math.random()*(StageUtils.ins<StageUtils>().getHeight() - 200) + 200)>>0;
	// 	let stoneItem:SkillStone = new SkillStone("stone_png",tarX,tarY,curX,curY)
	// 	this.addChild(stoneItem);
	// }
	// //生成火焰箭矢
	// private createFireArrow(camp:number):void{
	// 	let curx :number = - ((Math.random()*150)>>0);
	// 	let tarx:number = (Math.random()*300 + (curx + this._centerX + 130))>>0;
	// 	let tary:number = ( Math.random()*(StageUtils.ins<StageUtils>().getHeight() - 300) + 100)>>0;
	// 	let curY:number = this._centerY
	// 	let attackitem:AttackItem = new AttackItem("arrow_png",tarx,tary,curx,curY,camp);
	// 	this.addChild(attackitem);
	// 	attackitem.doTween();
	// }
	/**创建战役关卡组数据 */
	private createLevelGroup(camp:number):void{
		let soldierResObj:{res:string,id:number,wh:{w:number,h:number},speed:number,dist:number} = GlobalFun.getSoldierRes(camp);
		let col:number = this.col;
		let row:number = this.row;
		let index:number = 1;
		
		if(soldierResObj.id == SoldierType.SOLDIER_TOUSHICHE){
			col = 3
		}else{
			if(camp == 1){
				//创建我自己的阵容 。需要根据拥有的将领
				col *= GameApp.ownGeneralNum;
			}else{
				col *= ((this._levelCfg.level/3)>>0)+1;
			}
		}
		for(let j:number = 0;j<col;j++){
			if(j%this.col == 0 && j!=0){
				soldierResObj = GlobalFun.getSoldierRes(camp);
			}
			for(let i:number = 0;i<row;i++){
				let soldier:SoldierEntity = ObjectPool.pop("SoldierEntity");
				soldier.w = soldierResObj.wh.w;
				soldier.h = soldierResObj.wh.h;
				soldier.setSoldierData(camp,soldierResObj.res,soldierResObj.dist,soldierResObj.speed,soldierResObj.id,soldierResObj.wh.h);
				index += 1;
				this.addChildAt(soldier,index);
				let scale = soldierResObj.id == SoldierType.SOLDIER_QI?0.5:0.7
				let direct:number = camp==1?1:-1;
				let startX:number = camp == 1?0:StageUtils.ins<StageUtils>().getWidth();
				soldier.x = startX- 150*direct - (j*(soldierResObj.wh.w*scale + 50))*direct + ((Math.random()*100)>>0)*direct;
				soldier.y =  150 + (i*(soldierResObj.wh.h*scale + 10))+((Math.random()*50)>>0)*direct;
				camp == 1?this._ownEntitys.push(soldier):this._levelEntitys.push(soldier);
				this._entitys.push(soldier);
			}
		}
	}
	private ownBuffState:boolean = false;
	private levelBuffState:boolean = false;
	/**添加buff */
	private addOwnBuff(camp:number):void{
		if(camp == 1 && this.ownBuffState){return}
		if(camp !=1 && this.levelBuffState){return}
		let entitys:SoldierEntity[] = camp ==1?this._ownEntitys:this._levelEntitys;
		let buffid = 0;
		let time = 0;
		let self = this;
		let campInfo:any = {};
		if(camp == 1){
			let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
			campInfo = CampCfg.campCfg[parseInt(campstr)];
			buffid = campInfo.buffSkill;
			time = campInfo.time;
			let cdTime = time + campInfo.cdTime;
			this.ownBuffState = true;
			let buff_timeout1 = setTimeout(function() {
				clearTimeout(buff_timeout1);
				self.ownBuffState = false;
		    }, cdTime*1000);
		}else{
			campInfo = CampCfg.campCfg[this._levelCamp];
			buffid = campInfo.buffSkill;
			time = campInfo.time;
			this.levelBuffState = true;
			let cdTime = time + campInfo.cdTime;
			let buff_timeout2 = setTimeout(function() {
				clearTimeout(buff_timeout2);
				self.levelBuffState = false;
		    }, cdTime*1000);
		}
		 
		for(let i:number = 0;i<entitys.length;i++){
			let soldier:SoldierEntity = entitys[i];
			GlobalFun.skillBuffFilter(buffid,soldier._mc);
			this.addBuffState(buffid,soldier,campInfo.addBuffValue,camp);
		}
		let textInfo:eui.Label =new eui.Label();
		if(camp == 1){
			textInfo.x = this._ownGeneral.x - 70;
			textInfo.y = this._ownGeneral.y - 150;
		}else{
			textInfo.x = this._levelgeneral.x + 70;
			textInfo.y = this._levelgeneral.y - 150;
		}
		textInfo.size = 20;
		textInfo.scaleX = textInfo.scaleY = 1.5;
		textInfo.textColor = 0xffffff
		this.addChild(textInfo);
		if(buffid == 10000){textInfo.text = "战争鼓舞-士气提升"}else if(buffid == 10001){textInfo.text = "如沐清风-生命提升";}else{textInfo.text = "金刚不坏-防御提升";};
		egret.Tween.get(textInfo).to({scaleX:1,scaleY:1},600,egret.Ease.circOut).wait(500).call(()=>{
			egret.Tween.removeTweens(textInfo);
			if(textInfo && textInfo.parent){
				textInfo.parent.removeChild(textInfo);
			}
			textInfo = null;
		},this)
		
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			for(let i:number = 0;i<entitys.length;i++){
				let soldier:SoldierEntity = entitys[i];
				GlobalFun.clearFilters(soldier._mc);
				self.addBuffState(buffid,soldier,0,camp);
			}
	    }, time*1000);
	}
	public addBuffState(buffId:number,entity:SoldierEntity,addValue:number,camp:number):void{
		switch(buffId){
			case 10000:
				//攻击增加
				entity.buffAtk = addValue;
				break;
			case 10001:
				//生命值增加
				entity.buffHP = addValue;
				break;
			case 10002:
				//防御力增加
				entity.buffDefense = addValue;
				break;
		}
	}
	public clear():void{
		this._levelEntitys = [];
		this._ownEntitys = [];
		for(let i:number = 0;i<this._entitys.length;i++){
			if(this._entitys[i] && this._entitys[i].parent){
				this._entitys[i].parent.removeChild(this._entitys[i]);
			}
		}
		if(this.skillGroup){
			this.skillGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkillTap,this);
			this.skillGroup.removeChildren();
		}
		for(let j:number = 0;j<this.$children.length;j++){
			let display = this.getChildAt(j);
			if(display && display.parent&& display instanceof AttackStoneItem){
				display.parent.removeChild(display);
				j-=1;
			}
		}
		this._entitys = [];
	}
	private returnHome():void{
		egret.stopTick(this.actionExec,this);
		GameApp.battleState = false;
		this.touchEnabled = false;
		this.onClose();
	}
	public close():void{
		this.clear();
		this.removeTouchEvent(this.bagBtn,this.onOpenBg);
		this.removeTouchEvent(this.shopBtn,this.onOpenShop);
		this.removeTouchEvent(this.returnBtn,this.returnHome);
	}
		
}
ViewManager.ins<ViewManager>().reg(BattleView,LayerManager.UI_Main);