class OutWildBattle extends BaseEuiView{

	private singleFrame:number = 33.3;
	private curXunLuoTime:number = 0;
	private execXunLuoTime:number = 5000;
	private gameframe:number = 1500;
	private curGameFrame:number = 0;
	// private rect:eui.Group
	private bloodGroup:eui.Group;
	private showing:boolean = false;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private returnBtn:eui.Image;
	private rechargeBtn:eui.Image;
	private boxBtn:eui.Image;
	private bossHpCom:BossHpCom;
	private expBar:eui.Image;
	private expMask:eui.Rect;
	private headImg:eui.Image;
	private levelLab:eui.Label;
	private medalLab:eui.Label;
	private goldLab:eui.Label;
	private nameLab:eui.Label;
	private watcher1:eui.Watcher;
	private watcher2:eui.Watcher;
	private watcher3:eui.Watcher;
	private watcher4:eui.Watcher;
	private type_0:eui.Image;
	private type_1:eui.Image;
	private type_2:eui.Image;
	private activeWeaponNum:number = 1;
	private tipBg:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		GameApp.gameEnd = false;
		let index:number = param[0].fuben == "boss"?((Math.random()*2+1)>>0):((Math.random()*3+3)>>0);
		let res:string = "map00"+index;
		GameMap.init(RES.getRes(`${res}_json`));
		this.expBar.mask = this.expMask;
		this.headImg.source = `head_${GameApp.sex}_png`;
		this.nameLab.text = GameApp.roleName;
		this.expMask.width = GameApp.exp/(GameApp.level*500)*640;
		GameApp.curLevelMapId = res;
		this.tipBg["autoSize"]();
		MapView.inst().initMap();
		if(param[0].fuben == "boss"){
			MapView.inst().initBossMon();
			this.bossHpCom.visible = true;
			this.bossHpCom.initData(GameApp.bossId,GameApp.level*10,GameApp.level*10000);
		}else{
			MapView.inst().initLevelMonster();
			this.bossHpCom.visible = false;
		}
		for(let i:number = 0;i<3;i++){
			GlobalFun.filterToGrey(this["type_"+i]);
			if(i == GameApp.weapon){
				this["type_"+i].alpha = 1;
				let mainRole:SoldierEntity = MapView.inst().roles[0]; 
				let unlock:boolean = false;
				if(GameApp.weapon <= this.activeWeaponNum-1){
					//当前点击的是已经激活的buff
					unlock = true;
				}
				mainRole.changeWeaponBuff(i,unlock);
			}else{
				this["type_"+i].alpha = 0.5;
			}
		}
		this.execAtkAi();
		this.bloodGroup.visible = false;
		this.bloodGroup.alpha = 0;
		// GlobalFun.lighting(this,0xff0000);
		MessageManager.inst().addListener(CustomEvt.DMGSHOW,this.onDmgShow,this);
		MessageManager.inst().addListener(CustomEvt.DMGHIDE,this.onDmgHide,this);

		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = CardItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		
		egret.Tween.get(this.tipBg,{loop:true}).to({y:this.tipBg.y - 20},1000).to({y:this.tipBg.y},1000);
		
		MessageManager.inst().addListener("CardDataRefresh",this.onCardRefresh,this);
		MessageManager.inst().addListener(CustomEvt.BOSS_DMG,this.onRefreshBossCom,this);
		MessageManager.inst().addListener(CustomEvt.BOSS_DEAD,this.onBossDead,this);
		MessageManager.inst().addListener(CustomEvt.GAMEEND,this.onGameEnd,this);
		this.watcher1 = eui.Binding.bindProperty(GameApp,["medal"],this.medalLab,"text");
		this.watcher2 = eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		this.watcher3 = eui.Binding.bindHandler(GameApp,["exp"],this.onExpChange,this);
		this.watcher4 = eui.Binding.bindHandler(GameApp,["level"],this.onLevelChange,this);
		// MessageManager.inst().addListener(CustomEvt.ITEM_BEGIN,this.onItemBegin,this);
		// MessageManager.inst().addListener(CustomEvt.ITEM_END,this.onItemEnd,this);
		// this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)
		// this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this)
		GlobalFun.refreshCardData();
		this.addTouchEvent(this.rechargeBtn,this.onRecharge,true);
		this.addTouchEvent(this.boxBtn,this.onOpenBox,true);
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onGameEnd(evt:CustomEvt):void{
		if(evt.data.end == "close"){
			this.onReturn();
		}else{
			this.gameWin();
		}
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(evt.target == this.type_0 || evt.target == this.type_1 || evt.target == this.type_2){
			let typeIndex:number = parseInt(evt.target.name);
			GameApp.weapon = typeIndex;
			for(let i:number = 0;i<3;i++){
				if(i == GameApp.weapon){
					this["type_"+i].alpha = 1;
				}else{
					this["type_"+i].alpha = 0.5;
				}
			}
			let unlock:boolean = false;
			if(GameApp.weapon <= this.activeWeaponNum-1){
				//当前点击的是已经激活的buff
				unlock = true;
			}
			let mainRole:SoldierEntity = MapView.inst().roles[0]; 
			mainRole.changeWeaponBuff(typeIndex,unlock);
		}
	}
	private onBossDead():void{
		this.bossHpCom.reduceHp()
		
	}
	private onExpChange():void{
		if(GameApp.exp >= GameApp.level*500){
			let remainexp:number = GameApp.exp - GameApp.level*500;
			GameApp.level += 1;
			let mainRole:SoldierEntity = MapView.inst().roles[0]; 
			mainRole.refreshAttr();
			if(GameApp.level == 2){
				UserTips.inst().showTips(`恭喜解锁武器<font color=0x00ff00>[破甲箭]</font>可点击右方武器列表切换`);
			}else if(GameApp.level == 3){
				UserTips.inst().showTips(`恭喜解锁武器<font color=0x00ff00>[闪电枪]</font>可点击右方武器列表切换`);
			}
			GameApp.exp = remainexp;
			// this.maxExp = GameApp.level*500;
		}
		// this.progressLab.text = GameApp.exp+"/"+this.maxExp;
		this.expMask.width =  GameApp.exp/(GameApp.level*500)*640;
	}
	private onLevelChange():void{
		this.levelLab.text = "Lv."+GameApp.level;
		if(GameApp.level == 1){
			GlobalFun.clearFilters(this.type_0);
			this.activeWeaponNum = 1;
		}else if(GameApp.level == 2){
			this.activeWeaponNum = 2;
			GlobalFun.clearFilters(this.type_0);
			GlobalFun.clearFilters(this.type_1);
		}else{
			this.activeWeaponNum = 3;
			GlobalFun.clearFilters(this.type_0);
			GlobalFun.clearFilters(this.type_1);
			GlobalFun.clearFilters(this.type_2);
		}
	}
	/**刷新boss血条组件 */
	private onRefreshBossCom(evt:CustomEvt):void{
		this.bossHpCom.reduceHp(evt.data.dmg);
	}
	private onRecharge():void{
		ViewManager.inst().open(RechargePop);
	}
	/**打开在线 */
	private onOpenBox():void{
		ViewManager.inst().open(TreasureBox);
		GameMainView.treasureOpen = true;
	}
	private onReturn():void{
		GameApp.gameEnd = true;
		egret.stopTick(this.execAction,this);
		MapView.inst().clearMapUnit();
		if(GameApp.fuben == "boss"){
			egret.localStorage.setItem(LocalStorageEnum.CDTIME,(new Date().getTime() + 10*60*1000).toString());
		}
		ViewManager.inst().close(OutWildBattle);
		ViewManager.inst().open(GameMainView);
	}
	private curItem:CardItem2
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:CardItem2 = this.list.getChildAt(evt.itemIndex) as CardItem2;
		let mainRole:SoldierEntity = MapView.inst().roles[0];
		if(mainRole.isnoMp && item.cardVo.costMp > 0){
			//当前没有蓝了
			UserTips.inst().showTips("当前蓝量不足");
			return;
		}
		MapView.inst().roles[0].changeRoleMp(item.cardVo.costMp)
		let stageXy:egret.Point = item.parent.localToGlobal(item.x,item.y);
		let item2:CardItem = new CardItem();
		item2.initData(item.cardVo,1);
		this.addChild(item2);
		item2.x = stageXy.x;
		item2.y = stageXy.y;
		item2.scaleX = item2.scaleY = 0.25;
		item2.anchorOffsetX = item2.width>>1;
		item2.anchorOffsetY = item2.height>>1;
		item2.alpha = 0;
		
		let stagep:egret.Point = mainRole.parent.localToGlobal(mainRole.x,mainRole.y);
		egret.Tween.get(item2).to({scaleX:1,scaleY:1,alpha:1,x:StageUtils.inst().getWidth()>>1,y:StageUtils.inst().getHeight()>>1},300).wait(200).
		to({x:stagep.x,y:stagep.y,scaleX:0,scaleY:0,alpha:0},150,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(item2);
			if(item2 && item2.parent){
				item2.parent.removeChild(item2);
			}
		},this)
		
		let cardData:CardVo = GlobalFun.getCardDataFromId(item.cardVo.id);
		let vo:CardVo = cardData?cardData:item.cardVo;
		vo.ownNum -= 1;
		GlobalFun.refreshCardData(vo);

		// for(let i:number = 0;i<this.list.$children.length;i++){
		// 	(this.list.$children[i] as CardItem2).showCd();
		// }
		// this.list.removeChild(item);
		this.curItem = item;
		switch(this.curItem.cardVo.cardType){
			case 0:
				MapView.inst().roles[0].addHp(this.curItem.cardVo.atk);
				break;
			case 1:
				let skillres:string[] = ["boom2","skill_1002","skill_1003","skill_1004","skill_1005"];
				let index:number = (Math.random()*skillres.length)>>0;
				GlobalFun.createSkillEff(1,skillres[index],LayerManager.MAP_LAYER,2,{x:MapView.inst().roles[0].x,y:MapView.inst().roles[0].y});
				let num:number = this.curItem.cardVo.num;
				for(let i:number = 0;i<num;i++){
					let index:number = (Math.random()*MapView.inst().monsters.length)>>0;
					let mon:MonsterEntity = MapView.inst().monsters[index];
					if(mon){
						mon.reduceHp(this.curItem.cardVo.atk);
					}
				}
				break;
			case 2:
			case 3:
			case 4:
				this.skillSummon();
				break;
			case 5:
				MapView.inst().roles[0].refreshEquip(this.curItem.cardVo);
				break;
			case 6:
				MapView.inst().roles[0].changeRoleMp(-this.curItem.cardVo.atk)
				break;
		}
	}
	private onDmgShow():void{
		if(!this.showing){
			this.showing = true;
			this.bloodGroup.visible = true;
			this.bloodGroup.alpha = 0;

			egret.Tween.get(this.bloodGroup,{loop:true}).to({alpha:1},600,egret.Ease.circOut).to({alpha:0},600,egret.Ease.circOut)
		}
	}
	private onDmgHide():void{
		egret.Tween.removeTweens(this.bloodGroup);
		this.showing = false;
		this.bloodGroup.visible = false;
	}
	/**卡牌数据刷新了 */
	private onCardRefresh():void{
		let viewPoint:number = this.scroller.viewport.scrollH;
		this.arrayCollect.source = GameApp.ownCards;
		this.list.dataProviderRefreshed();
		this.scroller.viewport.scrollH = viewPoint;
		this.scroller.validateNow();
		this.list.scrollH = viewPoint;
		this.list.validateNow();
	}

	private skillSummon():void{
		let num:number = this.curItem.cardVo.num;
		let mainRole:SoldierEntity = MapView.inst().roles[0]; 
		let scale:number = 1;
		if(this.curItem.cardVo.cardType == 2){
			// scale = this.curItem.cardVo.quality*0.1 + 0.6;
			scale = 0.5
		}
		for(let i:number = 0;i<num;i++){
			let vo:RoleVo = {level:1,atkDis:this.curItem.cardVo.atkDis,spd:this.curItem.cardVo.spd,atk:this.curItem.cardVo.atk + ((Math.random()*100)>>0),hp:3000}
			let hero:MonsterEntity = new MonsterEntity();
			hero.setSoldierData(1,this.curItem.cardVo.model,vo,this.curItem.cardVo.buffTime,scale);
			
			LayerManager.MAP_LAYER.addChild(hero);

			let xIndex:number = (Math.random()*100)>>0;
			let x:number = mainRole.x + (xIndex>=50?-1:1)*((Math.random()*200)>>0);
			let yIndex:number = (Math.random()*100)>>0;
			let y:number = mainRole.y + (yIndex>=50?-1:1)*((Math.random()*200)>>0);
			hero.x = x;
			hero.y = y;
			hero.alpha = 0;

			hero.scaleX = hero.scaleY = scale;
			let eff:MovieClip = new MovieClip();
			LayerManager.MAP_LAYER.addChild(eff);
			eff.x = x;
			eff.y = y;
			eff.playFile(`${EFFECT}bottomCir`,2,null,true);

			egret.Tween.get(hero).to({alpha:1},600).call(()=>{
				egret.Tween.removeTweens(hero);
				MapView.inst().roles.push(hero);
			},this)
		}
	}
	/**执行攻击怪物ai */
	public execAtkAi():void{
		egret.startTick(this.execAction,this);
	}
	private gameEnd():void{
		egret.stopTick(this.execAction,this);
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			ViewManager.inst().open(OverView,[{state:"failure"}])
		}, 1000);
		
	}
	private gameWin():void{
		egret.stopTick(this.execAction,this);
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			ViewManager.inst().open(OverView,[{state:"win",gold:50}])
		}, 1000);
		
	}
	private execAction():boolean{
		this.curXunLuoTime += this.singleFrame;
		this.curGameFrame += this.singleFrame;
		if(this.curXunLuoTime >= this.execXunLuoTime){
			//怪物自由巡逻
			this.curXunLuoTime = 0;
			for(let key in MapView.inst().monsters){
				let item:MonsterEntity = MapView.inst().monsters[key];
				let moveIndex:number = (Math.random()*GameMap.monsterGrid.length)>>0;
				let birthXY:{row:number,col:number} = GameMap.monsterGrid[moveIndex];
				if(GameMap.walkable(birthXY.col,birthXY.row) && !item.atkState){
					let xy:XY = GameMap.grid2Point(birthXY.col,birthXY.row);
					item.refreshPos(birthXY.col,birthXY.row);
					item.execMoveAction(xy);
				}
			}
		}
		if(this.curGameFrame >= this.gameframe){
			this.curGameFrame = 0;
			let roles:any[] = MapView.inst().roles;
			// let monsters:any[] = MapView.inst().monsters;
			for(let i:number = 0;i<roles.length;i++){
				let roleItem:any = roles[i];
				if(roleItem.isDead){
					if(i == 0){
						//游戏结束;
						this.gameEnd();
					}
					roles.splice(i,1);
					i-=1;
					continue;
				}
				if(MapView.inst().mapClick && roleItem.atkTar && i==0){
					roleItem.atkTar.atkState = false;
					continue;
				}
				if(!roleItem.atkTar || (roleItem.atkTar && roleItem.atkTar.isDead)){
					let nearbyMon:MonsterEntity = this.getNearByEntity(roleItem);
					roleItem.lookAt(nearbyMon);
				}
				let dis:number = egret.Point.distance(new egret.Point(roleItem.x,roleItem.y),new egret.Point(roleItem.atkTar.x,roleItem.atkTar.y));
				if(dis <= roleItem.soldierAttr.atkDis){
					if(i==0){
						egret.Tween.removeTweens(roleItem);
					}else{
						MapView.inst().moveEnd = true;
					}
					roleItem.atkTar.lookAt(roleItem);
					roleItem.atkTar.execAtkAction();
					roleItem.execAtkAction()
				}else{
					// let tg:XY = this.returnGrid(roleItem.atkTar.gx,roleItem.atkTar.gy);
					if(i == 0){
						//第一个角色 。为主人公
						MapView.inst().execMoveAction({x:roleItem.atkTar.x,y:roleItem.atkTar.y});
					}else{
						//召唤出来的伙伴
						let time:number = dis/roleItem.soldierAttr.spd;
						roleItem.execMoveAction({x:roleItem.atkTar.x,y:roleItem.atkTar.y})
					}
					
				}
			}
		}
		this.dealLayerRelation();
		return false;
	}
	/**处理层级显示关系 */
	private dealLayerRelation():void{
		let monsters:any[] = MapView.inst().monsters
		let entitys:any[] = monsters.concat(MapView.inst().roles)
		entitys.sort(this.sortFun);
		for(let i:number = 0;i<entitys.length;i++){
			if(entitys[i] && entitys[i].parent){
				entitys[i].parent.setChildIndex(entitys[i],3+i + MapView.inst().drops.length);
			}
		}
	}
	/**获取最近攻击单位 */
	private getNearByEntity(atkEntity:any):MonsterEntity{
		let mons:MonsterEntity[] = MapView.inst().monsters;
		let minEntity:any = mons[0]; 
		if(minEntity){
			let dis:number = Math.sqrt(Math.pow(minEntity.x - atkEntity.x,2)+Math.pow(minEntity.y -atkEntity.y,2));
			for(let i:number = 0;i<mons.length;i++){
				let item1:any = mons[i];
				let dis2:number = Math.sqrt(Math.pow(item1.x - atkEntity.x,2)+Math.pow(item1.y -atkEntity.y,2));
				if(dis2 <= dis){
					minEntity = item1;
					dis = dis2;
				}
			}
		}
		return minEntity;
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
	public close():void{
		MessageManager.inst().removeListener(CustomEvt.DMGSHOW,this.onDmgShow,this);
		MessageManager.inst().removeListener(CustomEvt.DMGHIDE,this.onDmgHide,this);
		MessageManager.inst().removeListener("CardDataRefresh",this.onCardRefresh,this);
		MessageManager.inst().removeListener(CustomEvt.BOSS_DMG,this.onRefreshBossCom,this);
		MessageManager.inst().removeListener(CustomEvt.BOSS_DEAD,this.onBossDead,this);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this)
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		MessageManager.inst().addListener(CustomEvt.GAMEEND,this.onGameEnd,this);
		this.removeTouchEvent(this.rechargeBtn,this.onRecharge);
		this.removeTouchEvent(this.boxBtn,this.onOpenBox);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		if(this.watcher1){this.watcher1.unwatch()}
		if(this.watcher2){this.watcher2.unwatch()}
		if(this.watcher3){this.watcher3.unwatch()}
		if(this.watcher4){this.watcher4.unwatch()}
		// MessageManager.inst().removeListener(CustomEvt.ITEM_BEGIN,this.onItemBegin,this);
		// MessageManager.inst().removeListener(CustomEvt.ITEM_END,this.onItemEnd,this);
		// this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
		// this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)
	}
}
ViewManager.inst().reg(OutWildBattle,LayerManager.UI_Main);