// class BattleView extends BaseEuiView{
// 	private enemyBar:eui.Image;
// 	private enemyMask:eui.Rect;
// 	private hpBar:eui.Image;
// 	private hpMask:eui.Rect;
// 	private energyPro:eui.Image;
// 	private energyMask:eui.Rect;
// 	private list:eui.List;
// 	private arrayCollect:eui.ArrayCollection;
// 	private initEnergy:number = 5;
// 	private totalEnergy:number = 10;
// 	private curEnergy:number = 5;
// 	private timer:egret.Timer;
// 	//能量恢复时间
// 	private recoverTimer:number = 2000;
// 	private nextCard:CardItem2;
// 	private nextGroup:eui.Group;
// 	private touchRect:eui.Rect;
// 	private ownArea:eui.Rect;
// 	private skillArea:eui.Rect;
// 	private watcher:eui.Watcher;
// 	private enemyBorder:eui.Rect;
// 	private enemyArea:eui.Rect;
// 	private ownBorder:eui.Rect;
// 	private enemyHp:number;
// 	private ownHp:number;
// 	private curOwnHp:number;
// 	private curEnemyhp:number;
// 	private _entitys:any[] = [];
// 	private _ownEntitys:any[] = [];
// 	private _levelEntitys:any[] = [];
// 	private _singleFrame:number = 33.3;
// 	private _curTime:number = 0;
// 	private actionExecStandTime:number = 2000;
// 	private computerCards:CardVo[];
// 	private nextComputerCard:CardVo;
// 	private promptLevel:number = 0.2;
// 	/**当前游戏时间 */
// 	private curGameTime:number = 0;
// 	/**游戏时间 */
// 	private gameTime:number = 3*60;
// 	/**电脑卡牌生成冷却时间 */
// 	private cardCdTime:number = 2;
// 	/**当前电脑于冷却计时 */
// 	private curCdTime:number = 2;
// 	/**电脑的当前能量 */
// 	private computerEnergy:number = 5;
// 	private remainTime:eui.Label;
// 	private blood:eui.Image;
// 	private pauseBtn:eui.Image;
// 	public constructor() {
// 		super();
// 	}
// 	public open(...param):void{
// 		this.blood.visible = false;
// 		this._entitys = [];
// 		this.computerCards = [];
// 		this._ownEntitys = [];
// 		this._levelEntitys = [];
// 		this.arrayCollect = new eui.ArrayCollection();
// 		this.list.itemRenderer = CardItem2;
// 		this.list.dataProvider = this.arrayCollect;
// 		let dataArr:CardVo[] = this.createRandomCard(3,GameApp.locks);
// 		this.arrayCollect.source = dataArr;
// 		this.nextGroup["autoSize"]();
// 		this.nextCard.cardVo = this.createRandomCard(1,GameApp.locks)[0];
// 		this.energyPro.mask = this.energyMask;
// 		this.energyMask.width = this.curEnergy/this.totalEnergy*483;
// 		this.enemyBar.mask = this.enemyMask;
// 		this.hpBar.mask = this.hpMask;
// 		this.computerCards = this.createRandomCard(3,GameApp.allCards,true);
// 		this.nextComputerCard = this.createRandomCard(1,GameApp.allCards,true)[0];
// 		this.hpMask.width = this.enemyMask.width = 100;
// 		// this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
// 		this.touchRect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
// 		this.touchRect.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
// 		this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
// 		this.curOwnHp = this.ownHp = GameApp.level*20000;
// 		if(GameApp.level <= 3){
// 			this.curEnemyhp = this.enemyHp = GameApp.level*17000;
// 		}else{
// 			this.curEnemyhp = this.enemyHp = GameApp.level*23000;
// 		}
// 		// this.touchRect.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onCancle,this);
// 		// this.touchRect.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onCancle,this);
// 		this.nextCard.closeTouch();
// 		this.addTouchEvent(this.pauseBtn,this.onPause,true);
// 		this.watcher = eui.Binding.bindHandler(this,["curEnergy"],this.onEnergyChange,this);
// 		MessageManager.inst().addListener(CustomEvt.ITEM_BEGIN,this.onItemBegin,this);
// 		MessageManager.inst().addListener(CustomEvt.ITEM_END,this.onEnd,this);
// 		MessageManager.inst().addListener(CustomEvt.REDUCE_HP,this.onReduceHp,this);
// 		MessageManager.inst().addListener(CustomEvt.CONTINUE,this.onPlay,this)
// 		egret.startTick(this.execAction,this);
// 		let self = this;
// 		this.timer = new egret.Timer(this.recoverTimer);
// 		this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
// 		this.timer.start();
// 		// this.onTimer(null);
// 		// let timout = setTimeout(function() {
// 		// 	clearTimeout(timout);
// 		// 	self.createComputerEntity();
// 		// }, 1500);
// 	}
// 	private onPause():void{
// 		this.timer.stop();
// 		egret.stopTick(this.execAction,this);
// 		egret.Tween.removeAllTweens();
// 		ViewManager.inst().open(PausePop)
// 	}
// 	private onPlay():void{
// 		this.timer.start();
// 		egret.startTick(this.execAction,this);
// 	}
// 	private bloodShow:boolean = false;
// 	private execAction(timespan:number):boolean{
// 		this._curTime += this._singleFrame;
// 		if(this._curTime >= this.actionExecStandTime){
// 			this._curTime = 0;
// 			this.action(1);
// 			this.action(-1);
// 		}
// 		if(this.curCdTime >= this.cardCdTime){
// 			//当前计时结束 可以生成新的电脑卡牌
// 			this.createComputerEntity();
// 		}
// 		let boo:boolean = false;
// 		for(let i:number = 0;i<this._levelEntitys.length;i++){
// 			if(this._levelEntitys[i].isInAtk){
// 				boo = true;
// 				break;
// 			}
// 		}
// 		if(boo){
// 			if(!this.bloodShow){
// 				this.bloodShow = true;
// 				this.blood.visible = true;
// 				this.blood.alpha = 0;
// 				egret.Tween.get(this.blood,{loop:true}).to({alpha:1},700).to({alpha:0.5},700);
// 			}
// 		}else{
// 			this.bloodShow = false;
// 			this.blood.visible = false;
// 			this.blood.alpha = 0;
// 			egret.Tween.removeTweens(this.blood);
// 		}
// 		return false;
// 	}
// 	private action(camp:number):void{
// 		let ownEntitys:any[] = camp ==1?this._ownEntitys:this._levelEntitys;
// 		let levelEntitys:any[] = camp == 1?this._levelEntitys:this._ownEntitys;
// 		for(let i:number = 0;i<ownEntitys.length;i++){
// 			let item:any = ownEntitys[i];
// 			if(item.isDead){
// 				for(let j:number = 0;j<this._entitys.length;j++){
// 					if(this._entitys[j] == item){
// 						this._entitys.splice(j,1);
// 						break;
// 					}
// 				}
// 				item.dispose();
// 				ownEntitys.splice(i,1);
// 				i-=1;
// 				continue;
// 			}else{
// 				if(item.soldierAttr.cardType != 1){
// 					let xy:XY = {x:item.x,y:0}
// 					if(item.camp == 1){
// 						xy.y = this.enemyBorder.y + item.soldierAttr.atkDis;
// 					}else{
// 						xy.y = this.ownBorder.y - item.soldierAttr.atkDis;
// 					}
// 					if(item.isInAtk){
// 						//打建筑 
// 						item.unLookAt();
// 						item.execAtkAction();
// 					}else{
// 						item.execMoveAction({x:xy.x,y:xy.y},()=>{
// 							//当前移动到了塔的附近 到达了攻击距离 //执行攻击
// 							item.isInAtk = true;
// 						},this);
// 						for(let key in levelEntitys){
// 							let dis:number = egret.Point.distance(new egret.Point(item.x,item.y),new egret.Point(levelEntitys[key].x,levelEntitys[key].y));
// 							if(dis <= item.soldierAttr.atkDis && (!item.atkState)){
// 								//进入了攻击范围
// 								item.lookAt(levelEntitys[key]);
// 								item.execAtkAction();
// 								break;
// 							}
// 						}
// 					}
// 				}else{
// 					//建筑单位相关处理
// 					let dis:number = item.soldierAttr.atkDis;
// 					let atkItem = this.getNearByEntity(item,levelEntitys);
// 					if(atkItem){
// 						let curDis:number = egret.Point.distance(new egret.Point(atkItem.x,atkItem.y),new egret.Point(item.x,item.y));
// 						if(curDis <= dis && !item.cdstate){
// 							//当前进入了攻击距离;
// 							item.execAtkAction();
// 							let skillMc:MovieClip = new MovieClip();
// 							this.addChild(skillMc);
// 							skillMc.playFile(`${EFFECT}skill/skill_1005`,1,null,true);
// 							skillMc.x = atkItem.x;
// 							skillMc.y = atkItem.y;
// 							if(atkItem instanceof SoldierEntity){
// 								atkItem.reduceHp(item.soldierAttr.atk);
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		this.dealLayerRelation();
// 	}
// 	/**处理层级显示关系 */
// 	private dealLayerRelation():void{
// 		this._entitys.sort(this.sortFun);
// 		for(let i:number = 0;i<this._entitys.length;i++){
// 			this.setChildIndex(this._entitys[i],3+i);
// 		}
// 	}
// 	private sortFun(param1,param2):number{
// 		let s1y:number = param1.y;
// 		let s2y:number = param2.y;
// 		if(s1y > s2y){
// 			return 1;
// 		}else if(s1y < s2y){
// 			return -1;
// 		}else{
// 			return 0;
// 		}
// 	}
// 	/**检测y轴是否有阻挡 */
// 	private checkYBlock(item:any,entitys:any[]):boolean{ 
// 		let obj:{dit:number} = {dit:null};
// 		let y:number = item.y;
// 		for(let i:number = 0;i<entitys.length;i++){
// 			let otherItem:any = entitys[i];
// 			if(item != otherItem){
// 				let oy:number = otherItem.y;
// 				if(y - oy <= 15 && y - oy >= 0){
// 					return true
// 				}
// 			}
// 		}
// 		return false;
// 	}
// 	/**获取最近攻击单位 */
// 	private getNearByEntity(atkEntity:any,soldiers:any[]):any{
// 		let minEntity:any = soldiers[0]; 
// 		if(minEntity){
// 			let dis:number = Math.sqrt(Math.pow(minEntity.x - atkEntity.x,2)+Math.pow(minEntity.y -atkEntity.y,2));
// 			// let len:number = soldiers.length;
// 			// if(len >= 15){
// 			// 	len = 15;
// 			// }
// 			// let index:number = (Math.random()*len)>>0;
// 			// minEntity = soldiers[index];
// 			for(let i:number = 0;i<soldiers.length;i++){
// 				let item1:any = soldiers[i];
// 				let dis2:number = Math.sqrt(Math.pow(item1.x - atkEntity.x,2)+Math.pow(item1.y -atkEntity.y,2));
// 				if(dis2 <= dis){
// 					minEntity = item1;
// 					dis = dis2;
// 				}
// 			}
// 		}
// 		return minEntity;
// 	}
// 	private onEnergyChange():void{
// 		egret.Tween.removeTweens(this.energyMask);
// 		let width:number  = this.curEnergy/this.totalEnergy*483;
// 		egret.Tween.get(this.energyMask).to({width:width},this.recoverTimer - 50)
// 	}
// 	private onBegin(evt:egret.TouchEvent):void{
// 		this.createVirtualCardMode();
// 		this.refershBorder(evt.stageX,evt.stageY);
// 	}
// 	private showArea():void{
// 		let ownSp:egret.Shape = new egret.Shape();
// 		ownSp.touchEnabled = false;
// 		ownSp.name = "layer_o";
// 		ownSp.graphics.beginFill(0x00ff00);
// 		ownSp.graphics.drawRect(0,0,this.ownArea.width,this.ownArea.height);
// 		ownSp.graphics.endFill();
// 		ownSp.alpha = 0.4
// 		this.addChild(ownSp);
// 		ownSp.x = this.ownArea.left;
// 		ownSp.y = this.ownArea.top;
// 		egret.Tween.get(ownSp,{loop:true}).to({alpha:0.2},700).to({alpha:0.4},700);
// 		let enemySp:egret.Shape = new egret.Shape();
// 		enemySp.touchEnabled = false;
// 		enemySp.name = "layer_e";
// 		enemySp.graphics.beginFill(0xfc3434);
// 		enemySp.graphics.drawRect(0,0,this.ownArea.width,this.ownArea.height);
// 		enemySp.graphics.endFill();
// 		enemySp.alpha = 0.4
// 		this.addChild(enemySp);
// 		enemySp.x = this.enemyArea.left;
// 		enemySp.y = this.enemyArea.top;
// 		egret.Tween.get(enemySp,{loop:true}).to({alpha:0.2},700).to({alpha:0.4},700);
// 	}
// 	private hideArea():void{
// 		let ownsp:egret.Shape = this.getChildByName("layer_o") as egret.Shape;
// 		if(!!ownsp){
// 			egret.Tween.removeTweens(ownsp);
// 			ownsp.parent.removeChild(ownsp);
// 		}
// 		let enemysp:egret.Shape = this.getChildByName("layer_e") as egret.Shape;
// 		if(!!enemysp){
// 			egret.Tween.removeTweens(enemysp);
// 			enemysp.parent.removeChild(enemysp);
// 		}
// 	}
// 	private onItemBegin(evt:CustomEvt):void{
// 		this.onItemTap(null,evt.data.itemIndex)
// 		this.createVirtualCardMode();
// 		this.showArea();
// 		this.refershBorder(evt.data.x,evt.data.y);
// 	}
// 	private buildBoo:boolean = false;
// 	private onTouchMove(evt:egret.TouchEvent):void{
// 		this.refershBorder(evt.stageX,evt.stageY);
// 	}
// 	private refershBorder(x,y):void{
// 		let group:eui.Group = this.getChildByName("virtualGroup") as eui.Group;
// 		if(!!group){
// 			group.x = x;
// 			group.y = y;
// 			let circle:egret.Shape = group.getChildByName("circle") as egret.Shape;
// 			let area:eui.Rect = this.curItem.cardVo.cardType == 2?this.skillArea:this.ownArea;
// 			if(group.y <= area.y || group.y >= area.y + area.height || group.x <= area.x || group.x >= area.x + area.width){
// 				//出了边界的范围
// 				if(!!circle){
// 					circle.graphics.clear();
// 					circle.graphics.beginFill(0xff0000,0.3);
// 					circle.graphics.drawCircle(0,0,50);
// 					circle.graphics.endFill();
// 					this.buildBoo = false;
// 				}
// 			}else{
// 				if(!!circle){
// 					let isBuild:boolean = true;
// 					for(let i:number = 0;i<this._entitys.length;i++){
// 						let item:SoldierEntity|BuildEntity = this._entitys[i];
// 						if(item.soldierAttr.cardType == 1){
// 							if(Math.abs(item.x - group.x) <= 70 && Math.abs(item.y - group.y) <= 70){
// 								isBuild = false;
// 							}
// 						}
// 					}
// 					circle.graphics.clear();
// 					if(isBuild){
// 						circle.graphics.beginFill(0xffffff,0.3);
// 						circle.graphics.drawCircle(0,0,50);
// 						circle.graphics.endFill();
// 						this.buildBoo = true;
// 					}else{
// 						circle.graphics.beginFill(0xff0000,0.3);
// 						circle.graphics.drawCircle(0,0,50);
// 						circle.graphics.endFill();
// 						this.buildBoo = false;
// 					}
// 				}
// 			}
// 		}
// 	}
// 	private onEnd():void{
// 		this.hideArea();
// 		if(this.buildBoo && this.curItem){
// 			//当前可以建造
// 			let costEnergy:number = this.curItem.cardVo.energy;
// 			if(this.curEnergy < costEnergy){
// 				this.buildBoo = false;
// 				UserTips.inst().showTips("能量不足");
// 				this.restoreCardMode();
// 				// this.curItem.resetCard();
// 				// this.curItem = null;
// 				return;
// 			}
// 			let group:eui.Group = this.getChildByName("virtualGroup") as eui.Group;
// 			if(this.curItem.cardVo.cardType == 2){
// 				this.useSkill(this.curItem.cardVo,{x:group.x,y:group.y});
// 				this.reduceEnemyHp(this.curItem.cardVo,{x:group.x,y:group.y})
// 			}else if(this.curItem.cardVo.cardType == 0){
// 				//当前是entity
// 				this.createOwnEntity(this.curItem.cardVo,{x:group.x,y:group.y});
// 			}else if(this.curItem.cardVo.cardType == 1){
// 				//当前是建筑;
// 				this.createBuild(this.curItem.cardVo,{x:group.x,y:group.y})
// 			}
// 			this.recoverTimer = 200;
// 			this.curEnergy -= costEnergy;
// 			this.curItem.cardVo = this.nextCard.cardVo;
// 			let nextCardVo:CardVo = this.createRandomCard(1,GameApp.locks)[0];
// 			this.nextCard.cardVo = nextCardVo;
// 			this.curItem.resetCard();
// 			this.curItem = null;
// 			for(let i:number = 0;i<this.list.numChildren;i++){
// 				let item:CardItem2 = this.list.getChildAt(i) as CardItem2;
// 				item.showCd();
// 			}
// 		}else{
// 			//不可以建造
// 		}
// 		this.restoreCardMode();
// 	}
// 	/**使用技能 */
// 	private useSkill(cardVo:CardVo,pos:XY,camp:number = 1):void{
// 		let skillMc:MovieClip = new MovieClip();
// 		this.addChild(skillMc);
// 		skillMc.playFile(`${EFFECT}skill/${cardVo.model}`,1,null,true);
// 		if(cardVo.id == 15 || cardVo.id==16){
// 			let boomc:MovieClip = new MovieClip();
// 			this.addChild(boomc);
// 			this.swapChildren(boomc,skillMc);
// 			let count:number = cardVo.id == 15?2:5;
// 			boomc.playFile(`${EFFECT}skill/boom2`,count,null,true);
// 			boomc.x = pos.x;
// 			boomc.y = pos.y;
// 		}
// 		skillMc.x = pos.x;
// 		skillMc.y = pos.y;
// 	}
// 	/**点击创建对应的单位实体 */
// 	private createOwnEntity(cardVo:CardVo,pos:XY,camp:number = 1):void{
// 		let offestX:number = pos.x;
// 		let offestY:number = pos.y;
// 		for(let i:number = 0;i<cardVo.num;i++){
// 			let soldier:SoldierEntity = new SoldierEntity();
// 			soldier.setSoldierData(camp,cardVo.model,cardVo.id);
// 			this.addChild(soldier);
// 			soldier.x = offestX;
// 			soldier.y = offestY;
// 			if(camp == 1){
// 				this._ownEntitys.push(soldier);
// 			}else{
// 				this._levelEntitys.push(soldier);
// 			}
// 			this._entitys.push(soldier);
// 			offestX = (pos.x + 80)-160*i;
// 			offestY = pos.y + 50*camp;
// 		}
// 	}
// 	/**创建电脑卡牌单位 */
// 	private createComputerEntity():void{
// 		//首先判断电脑禁区单是否有地方单位;
// 		let curItem:SoldierEntity;
// 		for(let key in this._ownEntitys){
// 			let item:any = this._ownEntitys[key];
// 			if(item instanceof SoldierEntity){
// 				let height:number = StageUtils.inst().getHeight() - this.enemyArea.top - this.enemyArea.bottom;
// 				if(item.y <= this.enemyArea.top + height){
// 					curItem = item;
// 				}
// 				break;
// 			}
// 		}
// 		let xy:XY = {x:0,y:0};
// 		// let cardIndex:number = (Math.random()*this.computerCards.length)>>0;
// 		let cardData:{item:CardVo,index:number} = this.getMinComputerCardVo();
// 		let cardVo:CardVo = cardData.item;
// 		let cardIndex:number = cardData.index;
// 		if(curItem){
// 			//如果当前禁区存在单位
// 			let dicIndex:number = (Math.random()*3)>>0;
// 			if(dicIndex == 0){
// 				xy.x = curItem.x - cardVo.atkDis + Math.random()*15;
// 				xy.y = curItem.y + Math.random()*50+50
// 			}else if(dicIndex == 1){
// 				xy.x = curItem.x;
// 				xy.y = curItem.y + cardVo.atkDis + Math.random()*15;
// 			}else{
// 				xy.x = curItem.x + cardVo.atkDis - Math.random()*15;
// 				xy.y = curItem.y + Math.random()*50+50;
// 			}
// 		}else{
// 			let width:number = StageUtils.inst().getWidth() - this.enemyArea.left - this.enemyArea.right - 150;
// 			let height:number = StageUtils.inst().getHeight() - this.enemyArea.top - this.enemyArea.bottom;
// 			let x:number = this.enemyArea.left + 50 + ((Math.random()*width)>>0);
// 			let y:number = this.enemyArea.top + ((Math.random()*height)>>0);
// 			xy.x = x;
// 			xy.y = y;
// 		}
// 		if(cardVo.energy <= this.computerEnergy && (this.curCdTime >= this.cardCdTime)){
// 			//当前电脑能量充足 。并且 不处于cd状态 释放卡牌
// 			this.curCdTime = 0;
// 			let self = this;
// 			let timeInterval = setInterval(function() {
// 				self.curCdTime += 1
// 				if(self.curCdTime >= self.cardCdTime){
// 					clearTimeout(timeInterval);
// 				}
// 			}, 1000);
// 			this.computerEnergy -= cardVo.energy;
// 			if(cardVo.cardType == 0){
// 				//当前是实体
// 				this.createOwnEntity(cardVo,xy,-1);
// 			}else if(cardVo.cardType == 1){
// 				//当前是建筑
// 				this.createBuild(cardVo,xy,-1)
// 			}else if(cardVo.cardType == 2){
// 				//当前释放技能  需要选定目标 和目标范围内的对象 如果没有对象 。直接攻击主基地
// 				if(!this._ownEntitys.length){
// 					//如果没有地方单位 直接攻击主基地
// 					let x = StageUtils.inst().getWidth()>>1;
// 					let y = StageUtils.inst().getHeight()-this.ownBorder.bottom + 50;
// 					this.useSkill(cardVo,{x:x,y:y},-1)
// 					this.reduceEnemyHp(cardVo,{x:x,y:y},-1)
// 				}else{
// 					//
// 					let index:number = (Math.random()*this._ownEntitys.length)>>0;
// 					let entity:SoldierEntity|BuildEntity = this._ownEntitys[index];
// 					//获取到一个目标 。这个目标周围 100米距离单位 都会受到伤害
// 					if(entity){
// 						for(let key in this._ownEntitys){
// 							let item:SoldierEntity|BuildEntity = this._ownEntitys[key];
// 							let dis:number = egret.Point.distance(new egret.Point(item.x,item.y),new egret.Point(entity.x,entity.y));
// 							if(item != entity && dis <= 100){
// 								item.reduceHp(cardVo.atk);
// 							}
// 						}
// 						entity.reduceHp(cardVo.atk);
// 						this.useSkill(cardVo,{x:entity.x,y:entity.y},-1)
// 					}
// 				}
// 			} 
// 			for(let key in this.nextComputerCard){
// 				this.computerCards[cardIndex][key] = this.nextComputerCard[key];
// 			}
// 			this.nextComputerCard = this.createRandomCard(1,GameApp.allCards,true)[0];
// 		}
// 	}
// 	/**获取当前电脑能量最小的卡牌 */
// 	private getMinComputerCardVo():{item:CardVo,index:number}{
// 		let min:number = this.computerCards[0].energy;
// 		let cardvo:CardVo = this.computerCards[0];
// 		let _index:number = 0;
// 		for(let key in this.computerCards){
// 			if(cardvo != this.computerCards[key] && min > this.computerCards[key].energy){
// 				cardvo = this.computerCards[key];
// 				min = this.computerCards[key].energy;
// 				_index = parseInt(key);
// 			}
// 		}
// 		return {item:cardvo,index:_index};
// 	}
// 	/**点击创建建筑单位 */
// 	private createBuild(cardVo:CardVo,pos:XY,camp:number = 1):void{
// 		let buildEntity:BuildEntity = new BuildEntity();
// 		buildEntity.setBuildData(camp,cardVo);
// 		this.addChild(buildEntity);
// 		buildEntity.anchorOffsetX = buildEntity.width>>1;
// 		buildEntity.anchorOffsetY = buildEntity.height>>1;
// 		if(camp == 1){
// 			this._ownEntitys.push(buildEntity);
// 		}else{
// 			this._levelEntitys.push(buildEntity);
// 		}
// 		this._entitys.push(buildEntity);
// 		buildEntity.x = pos.x;
// 		buildEntity.y = pos.y;
// 	}
// 	private reduceEnemyHp(cardVo:CardVo,pos:XY,camp:number = 1):void{
// 		if(camp == 1){
// 			if(pos.y <= this.enemyBorder.y+this.enemyBorder.height){
// 				//当前技能 伤害到了敌方的基地塔
// 				this.curEnemyhp -= cardVo.atk;
// 				if(this.curEnemyhp <= 0){
// 					//游戏结束 胜利
// 					this.gameWin();
// 					this.curEnemyhp = 0;
// 				}
// 				this.enemyMask.width = this.curEnemyhp/this.enemyHp * 100;
// 			}
// 			for(let key in this._levelEntitys){
// 				let enemyItem:SoldierEntity = this._levelEntitys[key];
// 				//当前距离小于100米 。在技能攻击范围
// 				let dis:number = egret.Point.distance(new egret.Point(enemyItem.x,enemyItem.y),new egret.Point(pos.x,pos.y));
// 				if(dis <= 100 && enemyItem){
// 					enemyItem.reduceHp(cardVo.atk);
// 				}
// 			}	
// 		}else{
// 			this.curOwnHp -= cardVo.atk;
// 			if(this.curOwnHp <= 0){
// 				//游戏结束 失败
// 				this.gameFail();
// 				this.curOwnHp = 0;
// 			}
// 			this.hpMask.width = this.curOwnHp/this.ownHp *100;
// 		}
// 	}
// 	private onReduceHp(evt:CustomEvt):void{
// 		let xy:XY = {x:0,y:0}
// 		if(evt.data.camp == 1){
// 			this.curEnemyhp -= evt.data.hp;
// 			xy.x = (StageUtils.inst().getWidth()>>1) - 200 + ((Math.random()*150)>>0);;
// 			xy.y = this.enemyArea.top - 100;
// 			if(this.curEnemyhp <= 0){
// 					//游戏结束
// 				this.gameWin();
// 				this.curEnemyhp = 0;
// 			}
// 			this.enemyMask.width = this.curEnemyhp/this.enemyHp * 100;
// 		}else{
// 			this.curOwnHp -= evt.data.hp;
// 			xy.x = (StageUtils.inst().getWidth()>>1) - 200 + ((Math.random()*150)>>0);;
// 			xy.y = this.ownArea.top + this.ownArea.height + 70;
// 			if(this.curOwnHp <= 0){
// 				//游戏失败
// 				this.gameFail();
// 				this.curOwnHp = 0;
// 			}
// 			this.hpMask.width = this.curOwnHp/this.ownHp*100;
// 		}
// 		let dmg:eui.BitmapLabel = new eui.BitmapLabel();
// 		dmg.font = "dmg_fnt";
// 		this.addChild(dmg)
// 		dmg.y = xy.y
// 		dmg.x = xy.x;
// 		dmg.text = "-"+evt.data.hp;
// 		egret.Tween.get(dmg).to({y:dmg.y - 50 - Math.random()*60,alpha:0},1200,egret.Ease.circOut).call(()=>{
// 			egret.Tween.removeTweens(dmg);
// 			if(dmg && dmg.parent){
// 				dmg.parent.removeChild(dmg);
// 			}
// 		},this)
// 	}
// 	private gameWin():void{
// 		this.timer.stop();
// 		egret.stopTick(this.execAction,this);
// 		console.log("游戏胜利");
// 		ViewManager.inst().open(OverView,[{state:"win",hp:this.ownHp}]);
// 	}
// 	private gameFail():void{
// 		this.timer.stop();
// 		egret.stopTick(this.execAction,this);
// 		console.log("游戏失败")
// 		ViewManager.inst().open(OverView,[{state:"failure",hp:0}]);
// 	}
// 	// private onCancle():void{
// 	// 	this.restoreCardMode();
// 	// }
// 	/**创建虚拟卡组形象 */
// 	private createVirtualCardMode():eui.Group{
// 		if(!!this.curItem){
// 			let group:eui.Group = new eui.Group();
// 			group.touchEnabled = false;
// 			group.touchChildren = false;
// 			group.touchThrough = false;
// 			group.name = "virtualGroup";
// 			this.addChild(group);
// 			let circle:egret.Shape = new egret.Shape();
// 			circle.name = "circle";
// 			group.addChild(circle);
// 			circle.graphics.beginFill(0xffffff,0.3);
// 			circle.graphics.drawCircle(0,0,50);
// 			circle.graphics.endFill();
// 			if(this.curItem.cardVo.cardType == 0){
// 				//实体
// 				let cardMode:MovieClip = new MovieClip();
// 				group.addChild(cardMode);
// 				cardMode.playFile(`${EFFECT}${this.curItem.cardVo.model}_stand`,-1,null,false,"1");
// 				cardMode.alpha = 0.3;
// 				cardMode.scaleX = cardMode.scaleY = 0.5;
// 			}else if(this.curItem.cardVo.cardType == 1){
// 				//建筑
// 			}else if(this.curItem.cardVo.cardType == 2){
// 			}
// 			return group;
// 		}
// 	}
// 	/**还原 */
// 	private restoreCardMode():void{
// 		let group:eui.Group = this.getChildByName("virtualGroup") as eui.Group;
// 		if(!!group){
// 			group.parent.removeChild(group);
// 		}
// 	}
// 	private curItem:CardItem2
// 	private onItemTap(evt:eui.ItemTapEvent,index:number = 0):void{
// 		if(!!this.curItem){
// 			this.curItem.resetCard();	
// 		}
// 		let item:CardItem2 = this.list.getChildAt(evt?evt.itemIndex:index) as CardItem2;
// 		if(item.ifInCd){
// 			UserTips.inst().showTips("冷却中")
// 			return;
// 		}
// 		if(item != this.curItem){
// 			this.curItem = item;
// 			item.upCard();
// 		}
// 	}
// 	private onTimer(evt:egret.Timer):void{
// 		if(this.computerEnergy < this.totalEnergy){
// 			this.computerEnergy += 1;
// 		}
// 		this.curGameTime += 1;
// 		if(this.curGameTime >= this.gameTime){
// 			if(this.ownHp > this.enemyHp){
// 				this.gameWin();
// 			}else{
// 				this.gameFail();
// 			}
// 			return;
// 		}
// 		this.remainTime.text = DateUtils.getFormatBySecond(this.gameTime - this.curGameTime,DateUtils.TIME_FORMAT_1);
// 		if(this.curEnergy >= this.totalEnergy){
// 			return;
// 		}
// 		this.recoverTimer = 2000;
// 		this.curEnergy += 1;
// 	}
// 	/**
// 	 * 随机生成卡牌 
// 	 * @param num 生成的数量
// 	 * */
// 	private createRandomCard(num:number,gathers:CardVo[],isPrompt:boolean = false):CardVo[]{
// 		let cards:CardVo[] = gathers;
// 		let arr:CardVo[] = [];
// 		for(let i:number = 0;i<num;i++){
// 			let index:number = (Math.random()*cards.length)>>0;
// 			if(isPrompt){
// 				if(GameApp.level == 1){
// 					this.promptLevel = -Math.abs(this.promptLevel);
// 				}else{
// 					this.promptLevel = Math.abs(this.promptLevel);
// 				}
// 				cards[index].atk += (cards[index].atk*this.promptLevel*GameApp.level);
// 				cards[index].hp += (cards[index].atk*this.promptLevel*GameApp.level);
// 			}
// 			arr.push(cards[index]);
// 		}
// 		return arr;
// 	}
// 	public close():void{
// 		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
// 		this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
// 		if(this.watcher){this.watcher.unwatch()}
// 		this.removeTouchEvent(this.pauseBtn,this.onPause);
// 		MessageManager.inst().removeListener(CustomEvt.ITEM_BEGIN,this.onItemBegin,this);
// 		MessageManager.inst().removeListener(CustomEvt.ITEM_END,this.onEnd,this);
// 		MessageManager.inst().removeListener(CustomEvt.REDUCE_HP,this.onReduceHp,this);
// 		MessageManager.inst().removeListener(CustomEvt.CONTINUE,this.onPlay,this)
// 	}
// }
// ViewManager.inst().reg(BattleView,LayerManager.UI_Main); 
//# sourceMappingURL=BattleView.js.map