class GameMain extends BaseEuiView{

	private singleFrame:number = 33.3;
	private gameframe:number = 400;
	private monsterFrames:number = 1000
	private curGameFrame:number = 0;
	private curMonsterTime:number = 0;
	private skillNum:number = 3;
	private goldLab:eui.Label;

	private goldWather:eui.Watcher;
	private addBtn:eui.Image;
	private mapBtn:eui.Image;
	private mapGroup:eui.Group;
	private roleHead:eui.Image;
	private gridGroup:eui.Group;
	private skillGroup:eui.Group;
	private expWatcher:eui.Watcher;

	private slashGroup:eui.Group;
	private slashTxt:eui.BitmapLabel;

	private descGroup:eui.Group;
	private skillName:eui.Label;
	private skillCd:eui.Label;
	private skillDesc:eui.Label;
	private atkLab:eui.Label;
	private defLab:eui.Label;
	private hpLab:eui.Label;
	private critLab:eui.Label;
	private bloodGroup:eui.Group;
	private showing:boolean = false;
	private countDownLab:eui.Label;
	private countDownInterval;
	private gameTime:number = 5*60;
	private curTime:number = 0;
	private levelLab:eui.Label;
	private expLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		this.bloodGroup.visible = false;
		this.bloodGroup.alpha = 0;
		egret.Tween.get(this).to({alpha:1},2000).call(()=>{
			egret.Tween.removeTweens(this);
			
			let self = this;
			self.countDownLab.text = "战场倒计时:"+DateUtils.getFormatBySecond(this.gameTime,DateUtils.TIME_FORMAT_3);

			let firststr:string = egret.localStorage.getItem(LocalStorageEnum.Enter_first);
			if(!firststr){
				//当前需要引导
				egret.localStorage.setItem(LocalStorageEnum.Enter_first,"1");
				ViewManager.inst().open(GuideView);
				GameApp.guideView = ViewManager.inst().getView(GuideView) as GuideView;
				this.guideNext({x:10,y:7},{x:100,y:150},"1_2",200,230,"这是防御塔,他会主动攻击前来的侵犯的敌军,请保护好它");
				// let birthGrids:{row:number,col:number} = GameMap.roleBirthGrid[0];
				// let birthXY:{row:number,col:number} = birthGrids;
				// let xy:XY = GameMap.grid2Point(birthXY.col,birthXY.row);
				// let stageP:XY = LayerManager.MAP_LAYER.localToGlobal(xy.x,xy.y);
				// let localXY:XY = this.globalToLocal(stageP.x,stageP.y);
				// localXY.x -= 50;
				// localXY.y -= 70;
				// GameApp.guideView.nextStep({id:"1_1",comObj:localXY,width:100,height:100,cnt:"主公,此训练营可以全面提升您的个人能力,准备开始接受挑战吧"});
			}else{
				self.gameStart();
			}
			
		},this)
		this.skillGroup["autoSize"]();
		MessageManager.inst().addListener("syncRolepos",this.syncRolePos,this);
		MessageManager.inst().addListener("syncMonpos",this.syncMonPos,this);
		GameApp.gameEnd = false;
		GameMap.init(RES.getRes("map_json"));
		MapView.inst().initMap(false);
		
		MessageManager.inst().addListener("releaseSkill",this.onRelease,this);
		MessageManager.inst().addListener("skillUpgrade",this.onSkillUpgrade,this);
		MessageManager.inst().addListener("buyEquip",this.buyEquip,this);
		MessageManager.inst().addListener("showSlash",this.showSlash,this);
		MessageManager.inst().addListener("hideSlash",this.hideSlash,this);
		MessageManager.inst().addListener("resetGame",this.onReset,this);
		MessageManager.inst().addListener("showSkillInfo",this.showSkillInfo,this);
		MessageManager.inst().addListener("hideSkillInfo",this.hideSkillInfo,this);
		MessageManager.inst().addListener("hurtShow",this.hurtShow,this);
		this.goldWather = eui.Binding.bindProperty(GameApp,["gold"],this.goldLab,"text");
		
		let mainrole:SoldierEntity = MapView.inst().roles[0];
		if(mainrole && mainrole.general){
			this.atkLab.textFlow = new egret.HtmlTextParser().parse(`攻击：${mainrole.soldierAttr.atk} <font color=0x00ff00>+0%</font>`);
			this.defLab.textFlow = new egret.HtmlTextParser().parse(`防御：${100*GameApp.level} <font color=0x00ff00>+0%</font>`);
			this.hpLab.textFlow = new egret.HtmlTextParser().parse(`生命：${mainrole.soldierAttr.hp} <font color=0x00ff00>+0%</font>`);
			this.critLab.textFlow = new egret.HtmlTextParser().parse(`暴击率：20% <font color=0x00ff00>+0%</font>`);
		}
		this.addEquipAttr(mainrole);
		this.addTouchEvent(this.addBtn,this.onOpenShop,true);
		this.addTouchEvent(this.mapBtn,this.onSpreadMap,true);
		let skillCfg:SkillVo[] = SkillCfg.cfg
		for(let i:number = 101;i<=104;i++){
			(this[`skill${i}`] as SkillItem ).initialize(skillCfg[i]);
		}

		this.expWatcher = eui.Binding.bindHandler(GameApp,["exp"],this.roleExpChange,this);
		this.levelLab.text = "等级:Lv."+GameApp.level;
		
		//新手引导事件

		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_INFO,this.onGuideClick,this);
		MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_END,this.onGuideEnd,this);
		
	}
	private onGuideEnd():void{
		ViewManager.inst().close(GuideView);
		GameApp.guideView = null;
		this.gameStart();
	}
	private onGuideClick(evt:CustomEvt):void{
		switch(evt.data.id){
			case "1_1":
				// 
				this.guideNext({x:6,y:11},{x:350,y:100},"1_2",400,300,"此处是我们的主城,如若被摧毁,则守护失败,游戏结束");
				break;
			case "1_2":
				this.guideNext({x:24,y:4},{x:100,y:100},"1_3",200,230,"这里是敌方防御塔,进入其攻击范围,会受到攻击(悄悄告诉你:<font color=0x00ff00>可通过走位躲避防御塔的攻击</font>)")
				break;
			case "1_3":
				this.guideNext({x:35,y:8},{x:100,y:100},"1_4",315,225,"<font color=0x00ff00>(只有摧毁敌方所有建筑,才能取得胜利)</font>");
				break;
			case  "1_4":
				MapView.inst().refreshMapPos();
				GameApp.guideView.nextStep({id:"1_5",comObj:this.skillGroup,width:this.skillGroup.width,height:this.skillGroup.height,cnt:"强力的技能,可相助主公更容易的击溃敌军<font color=0x00ff00>(温馨提示:长按技能图标可查看技能详情)</font>"});
				break;
			case "1_5":
				let birthGrids:{row:number,col:number} = GameMap.roleBirthGrid[0];
				let birthXY:{row:number,col:number} = birthGrids;
				this.guideNext({x:birthXY.col,y:birthXY.row},{x:50,y:70},"1_6",100,100,"点击开始战斗")
				break;
		}
	}
	private guideNext(_xy:XY,offset:XY,id:string,w:number,h:number,cnt:string):void{
		let xy:XY = GameMap.grid2Point(_xy.x,_xy.y);
		MapView.inst().refreshMapPos(xy)
		let stageP:XY = LayerManager.MAP_LAYER.localToGlobal(xy.x,xy.y);
		let localXY:XY = this.globalToLocal(stageP.x,stageP.y);
		localXY.x -= offset.x;
		localXY.y -= offset.y;
		GameApp.guideView.nextStep({id:id,comObj:localXY,width:w,height:h,cnt:cnt});
	}
	private gameStart():void{
		MapView.inst().loopInitLevelMonster();
		MapView.inst().loopInitOwnSoldier();
		egret.startTick(this.execAction,this);
		let self = this;
		this.countDownInterval = setInterval(function() {
			self.curTime += 1;
			let time:number = self.gameTime - self.curTime;
			self.countDownLab.text = "战场倒计时:"+DateUtils.getFormatBySecond(time,DateUtils.TIME_FORMAT_3);
			if(self.curTime >= self.gameTime){
				clearInterval(self.countDownInterval);
				self.gameEnd()
			}
		}, 1000);
	}
	/**显示闪红 */
	private hurtShow():void{
		if(!this.showing){
			this.showing = true;
			this.bloodGroup.visible = true;
			this.bloodGroup.alpha = 0;
			egret.Tween.get(this.bloodGroup).to({alpha:1},600,egret.Ease.circOut).to({alpha:0},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.bloodGroup);
				this.bloodGroup.visible = false;
				this.bloodGroup.alpha = 0;
				this.showing = false;
			},this)
		}
	}
	/**显示技能详细信息 */
	private showSkillInfo(evt:CustomEvt):void{
		this.descGroup.visible = true;
		let skillCfg:SkillVo = SkillCfg.cfg[evt.data.skillId];
		this.skillDesc.text = skillCfg.skillDesc;
		this.skillName.text = skillCfg.skillName;
		this.skillCd.text = "CD："+skillCfg.skillCd+"秒";
	}
	private hideSkillInfo():void{
		this.descGroup.visible = false;
	}
	/**重置游戏 */
	private onReset():void{
		// this.clearUnit()
		MapView.inst().initMap(false);
		this.gameStart();
		// let self = this;
		// self.countDownLab.text = "战场倒计时:"+DateUtils.getFormatBySecond(this.gameTime,DateUtils.TIME_FORMAT_3);
		// this.countDownInterval = setInterval(function() {
		// 	self.curTime += 1;
		// 	let time:number = self.gameTime - self.curTime;
		// 	self.countDownLab.text = "战场倒计时:"+DateUtils.getFormatBySecond(time,DateUtils.TIME_FORMAT_3);
		// 	if(self.curTime >= self.gameTime){
		// 		clearInterval(self.countDownInterval);
		// 		self.gameEnd()
		// 	}
		// }, 1000);
		// egret.startTick(this.execAction,this);
	}
	/**连斩字段 */
	private showSlash(evt:CustomEvt):void{
		this.slashTxt.text = evt.data.num.toString();
		if(!this.slashGroup.visible){
			this.slashGroup.right = -300;
			this.slashGroup.visible = true;
			this.slashGroup.alpha = 0;
			egret.Tween.get(this.slashGroup).to({alpha:1,right:0},400,egret.Ease.backOut).call(()=>{
				egret.Tween.removeTweens(this.slashGroup);
			},this)
		}else{
			this.slashGroup.scaleX = this.slashGroup.scaleY = 1;
			egret.Tween.removeTweens(this.slashGroup);
			egret.Tween.get(this.slashGroup).to({scaleX:1.1,scaleY:1.1},100).to({scaleX:1,scaleY:1},100).call(()=>{
				egret.Tween.removeTweens(this.slashGroup);
			},this)
		}
	}
	private hideSlash():void{
		this.slashGroup.visible = false;
		this.slashGroup.alpha = 0;
		this.slashGroup.right = 0;
		this.slashTxt.text = "0";
	}
	/**打开商店 */
	private onOpenShop():void{
		this.pauseGame();
		ViewManager.inst().open(ShopView,[{cb:this.continueGame,arg:this}])
	}
	private syncRolePos(evt:CustomEvt):void{
		// let localXy:egret.Point = this.gridGroup.globalToLocal(evt.data.x,evt.data.y);
		this.roleHead.x = evt.data.x*(this.gridGroup.width/GameMap.MAX_WIDTH);
		this.roleHead.y = evt.data.y*(this.gridGroup.height/GameMap.MAX_HEIGHT);
	}
	private roleExpChange():void{
		let exp:number = GameApp.exp;
		if(exp >= GameApp.level * 500){
			exp -= GameApp.level*500;
			GameApp.exp = exp;
			GameApp.level += 1;
			this.levelLab.text = "等级:Lv."+GameApp.level;
			for(let i:number = 101;i<=104;i++){
				(this[`skill${i}`] as SkillItem ).showUp();
			}
			//显示人物升级特效;并且加成属性
			for(let i:number = 0;i<MapView.inst().roles.length;i++){
				let item = MapView.inst().roles[i];
				if(item instanceof SoldierEntity){
					item.upgrade();
					if(item.general){
						this.atkLab.textFlow = new egret.HtmlTextParser().parse(`攻击：${item.soldierAttr.atk} <font color=0x00ff00>+0%</font>`);
						this.defLab.textFlow = new egret.HtmlTextParser().parse(`防御：${100*GameApp.level} <font color=0x00ff00>+0%</font>`);
						this.hpLab.textFlow = new egret.HtmlTextParser().parse(`生命：${item.soldierAttr.hp} <font color=0x00ff00>+0%</font>`);
						this.critLab.textFlow = new egret.HtmlTextParser().parse(`暴击率：20% <font color=0x00ff00>+0%</font>`);
					}
				}
				
			}
		}
		this.expLab.text = "经验:"+GameApp.exp+"/"+GameApp.level*500;
	}
	private onSkillUpgrade():void{
		for(let i:number = 101;i<=104;i++){
			(this[`skill${i}`] as SkillItem ).hideUp();
		}
	}
	private buyEquip(evt:CustomEvt):void{
		let equipId:number = evt.data.id;
		GameApp.equipIds.push(equipId);
		egret.localStorage.setItem(LocalStorageEnum.Role_equip,JSON.stringify(GameApp.equipIds));
		let mainRole = MapView.inst().roles[0];
		if(mainRole && mainRole instanceof SoldierEntity && mainRole.general){
			mainRole.updateEquip();
			this.addEquipAttr(mainRole);
		}
	}
	/**添加装备属性显示 */
	private addEquipAttr(item):void{
		for(let i:number = 0;i<GameApp.equipIds.length;i++){
			switch(GameApp.equipIds[i]){
				case 1001:
					this.hpLab.textFlow = new egret.HtmlTextParser().parse(`生命：${item.soldierAttr.hp} <font color=0x00ff00>+30%</font>`);
					break;
				case 1002:
					this.defLab.textFlow = new egret.HtmlTextParser().parse(`防御：${100*GameApp.level} <font color=0x00ff00>+50%</font>`);
					break;
				case 1003:
					this.atkLab.textFlow = new egret.HtmlTextParser().parse(`攻击：${item.soldierAttr.atk} <font color=0x00ff00>+100</font>`);
					break;
				case 1004:
					this.critLab.textFlow = new egret.HtmlTextParser().parse(`暴击率：20% <font color=0x00ff00>+100%</font>`);
					break;
			}
		}
	}
	private monPoints:any = {}
	private syncMonPos(evt:CustomEvt):void{
		let monItemP:egret.Shape = this.monPoints[evt.data.inst];
		if(monItemP){
			if(evt.data.oper == 0){
				//移除
				if(monItemP && monItemP.parent){
					monItemP.parent.removeChild(monItemP);
				}
				delete this.monPoints[evt.data.inst];
			}else{
				//移动
				monItemP.x = evt.data.x*(this.gridGroup.width/GameMap.MAX_WIDTH);
				monItemP.y = evt.data.y*(this.gridGroup.height/GameMap.MAX_HEIGHT);
			}
		}else{
			if(evt.data.oper==2){
				let sp:egret.Shape = new egret.Shape();
				if(evt.data.camp == -1){
					sp.graphics.beginFill(0xfc3434,0.8);
				}else{
					sp.graphics.beginFill(0x00ff00,0.8);
				}
				sp.name = "circle";
				sp.graphics.drawCircle(0,0,5);
				sp.graphics.endFill();
				this.gridGroup.addChild(sp);
				this.monPoints[evt.data.inst] = sp;
				sp.x = evt.data.x*(this.gridGroup.width/GameMap.MAX_WIDTH);
				sp.y = evt.data.y*(this.gridGroup.height/GameMap.MAX_HEIGHT);
			}
			
		}
	}
	private onSpreadMap():void{
		this.mapBtn.scaleY = -this.mapBtn.scaleY;
		this.mapGroup.visible = this.mapBtn.scaleY == -1?true:false;
	}
	private pauseGame():void{
		for(let i:number = 0;i<LayerManager.MAP_LAYER.numChildren;i++){
			let item = LayerManager.MAP_LAYER.$children[i];
			if(item.name && (item.name.indexOf("item_") != -1)){
				item.parent.removeChild(item);
			}
			if(item instanceof MovieClip && item.bounce){
				item.parent.removeChild(item);
			}
			if(item instanceof MonsterEntity){
				item.moveEnd = true;
				item.execStandAction();
			}
			if(item instanceof BuildingEntity){
				item.atkState = false;
			}
			if(item instanceof SoldierEntity){
				item.atkState = false;
				item.execStandAction();
			}
		}
		this.hideSlash();
		MapView.inst().moveEnd = true;
		egret.stopTick(this.execAction,this);
		egret.Tween.removeAllTweens();
	}
	private continueGame():void{
		egret.startTick(this.execAction,this);
	}
	private onRelease(evt:CustomEvt):void{
		this.useSkill(evt.data.skillId);
	}
	private execAction():boolean{
		this.curGameFrame += this.singleFrame;
		this.curMonsterTime += this.singleFrame;
		// if(!MapView.inst().roles.length){
		// 	this.gameEnd();
		// }
		
		// if(!MapView.inst().monsters.length){
		// 	this.gameWin();
		// }
		if(this.curGameFrame >= this.gameframe){
			this.curGameFrame = 0;
			this.execRoleAi();
		}
		if(this.curMonsterTime >= this.monsterFrames){
			this.curMonsterTime = 0;
			this.execMonsterAi();
		}
		this.dealLayerRelation();
		return false;
	}
	private execMonsterAi():void{
		let roles:any[] = MapView.inst().roles;
		let mons:any[] = MapView.inst().monsters;
		let boomEntitys:MonsterEntity|BuildingEntity[] = [];
		let releaseBooms:MovieClip[] = [];
		let buildCount:number = 0;
		for(let j:number = 0;j<mons.length;j++){
			let item:MonsterEntity|BuildingEntity = mons[j];
			if(item instanceof BuildingEntity){
				buildCount += 1;
			}
			for(let k:number = 0;k<this.boomMcs.length;k++){
				let boomItem:MovieClip = this.boomMcs[k];
				if(item.x >= boomItem.x - 80 && item.x <= boomItem.x + 80 && item.y >= boomItem.y - 80 && item.y <= boomItem.y + 80){
					//需要爆炸了
					boomEntitys.push(mons[j]);
					let index:number = releaseBooms.indexOf(this.boomMcs[k]);
					if(index == -1){
						releaseBooms.push(this.boomMcs[k])
					}
				}
			}
		}
		if(buildCount <= 0){
			this.gameWin();
		}
		let mainCity:BuildingEntity;
		for(let i:number = 0;i<roles.length;i++){
			let item = roles[i];
			if(item instanceof BuildingEntity && item.type == 1){
				mainCity = item;
				break;
			}
		}
		if(!mainCity){this.gameEnd();return}
		for(let i:number = 0;i<releaseBooms.length;i++){
			let item:MovieClip = releaseBooms[i];
			let boommc:MovieClip = new MovieClip();
			LayerManager.MAP_LAYER.addChildAt(boommc,1);
			boommc.playFile(`${EFFECT}eff_101_boom`,1,null,true);
			boommc.x = item.x;
			boommc.y = item.y;
			let index:number = this.boomMcs.indexOf(item);
			if(index != -1){
				item.parent.removeChild(item);
				this.boomMcs.splice(index,1);
			}
		}
		if(boomEntitys.length){
			boomEntitys.forEach((item:MonsterEntity|BuildingEntity)=>{
				let skillCfg:SkillVo = SkillCfg.cfg[101];
				item.reduceHp(skillCfg.atk + ((Math.random()*20)>>0))
			},this)
		}
		for(let i:number = 0;i<roles.length;i++){
			let roleItem:any = roles[i];
			for(let j:number = 0;j<mons.length;j++){
				let item:any = mons[j];
				let dis:number = egret.Point.distance(new egret.Point(roleItem.x,roleItem.y),new egret.Point(item.x,item.y));
				if(dis <= item.soldierAttr.viewdis){item.lookAt(roleItem)}
				if(item.atkTar && !item.atkTar.isDead){
					if(item.atkTar == roleItem){
						//当前人物是怪物的绑定对象的话
						if(dis < item.soldierAttr.viewdis && dis > item.soldierAttr.atkDis){
							// this._path = [];
							if(item instanceof MonsterEntity ){
								egret.Tween.removeTweens(item);
								// item.route = [];
								// let gxy:XY = GameMap.point2Grid(roleItem.x,roleItem.y);
								// item.findPath(gxy);
								item.execMoveAction();
							}
						}
						else if(dis <= item.soldierAttr.atkDis){
							//当前人物进入了怪物的攻击距离
							if(item instanceof MonsterEntity){
								item.route = [];
								egret.Tween.removeTweens(item);
								item.moveEnd = true;
							}
							item.execAtkAction();
							
						}else if(dis > item.soldierAttr.viewdis){
							//当前绑定对象的距离 大于怪物的视野距离 接触绑定
							if(item instanceof MonsterEntity){
								item.route = [];
								egret.Tween.removeTweens(item);
								item.moveEnd = true;
							}
							item.unLookAt();
						}
					}
				}else{
					//当前怪物没有攻击对象 或者是已经死亡 (!主角色) 需要寻路到主人公水晶地
					item.unLookAt();
					if(item instanceof MonsterEntity){
						item.findPath();
					}
				}
				
			}
		}
	}
	private execRoleAi():void{
		let roles:any[] = MapView.inst().roles;
		let mons:any[] = MapView.inst().monsters;

		for(let i:number = 0;i<roles.length;i++){
			let roleItem:any = roles[i];
			if(i == 0 && (!(roleItem instanceof SoldierEntity) || (roleItem instanceof SoldierEntity && !roleItem.general))){
				this.roleRecover();
			}
			// if(roleItem.isDead){
			// 	//主人物死亡 需要执行复活逻辑;
			// 	if(i == 0 && roleItem.general){this.roleRecover();break;}
			// 	roles.splice(i,1);i-=1;continue;
			// }
			for(let j:number = 0;j<mons.length;j++){
				let item:MonsterEntity = mons[j];
				let point:egret.Point = new egret.Point(item.x,item.y)
				if(item instanceof BuildingEntity && item.camp == -1 && (item.pos == 0 || item.pos == 1)){
					point.x -= 120;
				}
				let dis:number = egret.Point.distance(new egret.Point(roleItem.x,roleItem.y),point);
				if(MapView.inst().mapClick &&  i==0){
					continue;
				}
				if(i!=0 && roleItem.mark == "role"){
					//当前是别的友方召唤单位;
					let mainRole:SoldierEntity = roles[0];
					if(mainRole && mainRole.general){
						let roleDis:number = egret.Point.distance(new egret.Point(mainRole.x,mainRole.y),new egret.Point(roleItem.x,roleItem.y));
						if(roleDis >= roleItem.followValue){
							//当前召唤单位与伙伴离开的超过了200;
							roleItem.route = [];
							let gxy:XY = GameMap.point2Grid(mainRole.x,mainRole.y);
							roleItem.findPath(gxy.x,gxy.y);
							continue;
						}else{
							egret.Tween.removeTweens(roleItem);
							roleItem.moveEnd = true;
							roleItem.route = [];
						}
					}
				}
				
				if(roleItem.atkTar && !roleItem.atkTar.isDead){
					if(item == roleItem.atkTar){
						//当前是绑定的目标 存在 
						if(dis <= roleItem.soldierAttr.atkDis){
							//小于攻击距离 。开始攻击
							MapView.inst().moveEnd = true;
							roleItem.execAtkAction();
						}else{
							//大于攻击距离 。解除绑定
							roleItem.unLookAt();
							if(MapView.inst().moveEnd && roleItem instanceof SoldierEntity){
								roleItem.execStandAction();
							}
						}
					}
				}else{
					roleItem.unLookAt();
					//不存在绑定对象
					if(dis <= roleItem.soldierAttr.viewdis){
						//在攻击距离 。绑定对象
						roleItem.lookAt(item);
					}else{
						if(roleItem instanceof SoldierEntity){
							if((MapView.inst().moveEnd && i==0) || (i!=0 && roleItem.moveEnd)){
								roleItem.execStandAction();
							}
						}else if(roleItem instanceof MonsterEntity){
							roleItem.findPath(roleItem.towerPoint);
						}
					}
				}
			}
		}
	}
	private recoverInterval;
	private recoverTime:number = 10;
	/**人物复活 */
	private roleRecover():void{
		MapView.inst().initMainRole();
		// if(!this.recoverInterval){
		// 	let self = this;
		// 	this.recoverTime = 10;
		// 	this.recoverInterval = setInterval(()=>{
		// 		self.recoverTime -= 1;
		// 		if(self.recoverTime <= 0){
		// 			clearInterval(self.recoverInterval);
		// 			console.log("---已经复活---");
		// 			//已经复活
		// 			MapView.inst().initMainRole();
		// 		}
		// 	},1000)
		// }
	}
	private gameEnd():void{
		console.log("游戏结束")
		this.clearUnit();
		this.touchEnabled = false;
		this.touchChildren = false;
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout)
			ViewManager.inst().open(ResultView,[{state:0}]);
			self.touchEnabled = true;
			self.touchChildren = true;
		}, 1500);
	}
	private gameWin():void{
		this.clearUnit()
		
		this.touchEnabled = false;
		this.touchChildren = false;
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout)
			ViewManager.inst().open(ResultView,[{state:1}])
			self.touchEnabled = true;
			self.touchChildren = true;
		}, 1500);
	}
	private clearUnit():void{
		egret.stopTick(this.execAction,this);
		MapView.inst().clearMapUnit();
		// egret.Tween.removeAllTweens();
		if(this.countDownInterval){clearInterval(this.countDownInterval)}
		this.curTime = 0;
		this.singleFrame= 33.3;
	    this.gameframe = 400;
		this.monsterFrames = 1000
		this.curGameFrame = 0;
		this.curMonsterTime = 0;
		this.skillNum = 3;
		this.summonCount = 0;
		
		console.log("------清除单位-----")
		for(let i:number = 0;i<LayerManager.MAP_LAYER.numChildren;i++){
			let item = LayerManager.MAP_LAYER.$children[i];
			if(item.name && (item.name.indexOf("item_") != -1)){
				item.parent.removeChild(item);
			}
			if(item instanceof MovieClip && item.bounce){
				item.parent.removeChild(item);
			}
		}
		if(this.recoverInterval){
			clearInterval(this.recoverInterval);
		}
		MapView.inst().moveEnd = true;
		for(let j:number = 0;j<this.gridGroup.numChildren;j++){
			let children = this.gridGroup.getChildAt(j);
			if(children.name != "head"){
				children.parent.removeChild(children);
			}
		}
		for(let key in this.monPoints){
			if(this.monPoints[key] && this.monPoints[key].parent){
				this.monPoints[key].parent.removeChild(this.monPoints[key])
			}
		}
		this.monPoints = {};
		this.hideSlash();
		if(this.releaseSkill104 && this.releaseSkill104.parent){
			this.releaseSkill104.parent.removeChild(this.releaseSkill104);
			this.releaseSkill104 = null;
		}
		for(let k:number = 0;k<this.boomMcs.length;k++){
			if(this.boomMcs[k] && this.boomMcs[k].parent){
				this.boomMcs[k].parent.removeChild(this.boomMcs[k]);
			}
		}
		this.boomMcs = [];
	}
	private releaseSkill104:MovieClip;
	/**处理层级显示关系 */
	private dealLayerRelation():void{
		let monsters:any[] = MapView.inst().monsters
		let entitys:any[] = monsters.concat(MapView.inst().roles)
		entitys.sort(this.sortFun);
		for(let i:number = 0;i<entitys.length;i++){
			if(entitys[i] && entitys[i].parent){
				entitys[i].parent.setChildIndex(entitys[i],3+i + this.boomMcs.length);
			}
		}
	}
	private boomMcs:MovieClip[] = [];
	private summonCount:number = 0;
	/**使用技能 */
	private useSkill(skillId:number):void{
		let skillCfg:SkillVo = SkillCfg.cfg[skillId];
		let mainRole:SoldierEntity = MapView.inst().roles[0];
		if(mainRole && mainRole.general){
			//当前是主人物;
			if(skillId == 102){
				if(this[`skill${skillId}`].isInCd){
					UserTips.inst().showTips("技能冷却中");
					return;
				}
				this[`skill${skillId}`].setCd(skillCfg.skillCd);
				mainRole.frameRate = 24;
				mainRole.addSkillEff(102);
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					mainRole.hideSkillEff(102);
					mainRole.frameRate = null;
			    }, skillCfg.buffTime*1000);
			}else if(skillId == 103){
				
				let gxy:XY = GameMap.point2Grid(mainRole.x,mainRole.y);
				let curxy:XY = null;
				if(GameMap.walkable(gxy.y,gxy.x + 1)){
					curxy = {x:gxy.x,y:gxy.y+1}
				}
				if(GameMap.walkable(gxy.y-1,gxy.x)){
					curxy = {x:gxy.x-1,y:gxy.y}
				}
				if(GameMap.walkable(gxy.y+1,gxy.x)){
					curxy = {x:gxy.x+1,y:gxy.y}
				}
				if(GameMap.walkable(gxy.y,gxy.x - 1)){
					curxy = {x:gxy.x,y:gxy.y - 1};
				}
				if(this[`skill${skillId}`].isInCd){
					UserTips.inst().showTips("技能冷却中");
					return;
				}
				if(curxy){
					this[`skill${skillId}`].setCd(skillCfg.skillCd);
					let xy:XY = GameMap.grid2Point(curxy.x,curxy.y);
					let hero:SoldierEntity = new SoldierEntity();
					hero.addSkillEff(103,2);
					let vo:RoleVo = {level:mainRole.soldierAttr.level,atkDis:500,viewdis:500,spd:260,atk:mainRole.soldierAttr.atk*0.5,hp:mainRole.soldierAttr.hp*0.5,mp:1000}
					hero.soldierAttr = vo;
					hero.alpha = 0;
					hero.mark = "role"
					hero.summonCount = this.summonCount;
					hero.followValue = ((Math.random()*50 + 100)>>0) + 128*this.summonCount;
					this.summonCount += 1;
					hero.setSoldierData(1,"general");
					LayerManager.MAP_LAYER.addChild(hero);
					hero.x = xy.x;
					hero.y = xy.y;
					egret.Tween.get(hero).to({alpha:1},600).call(()=>{
						egret.Tween.removeTweens(hero);
						MapView.inst().roles.push(hero);
					},this)
					hero.summonTime(skillCfg.buffTime*1000,(count)=>{
						let boo = false;
						for(let i:number = 0;i<MapView.inst().roles.length;i++){
							let item = MapView.inst().roles[i];
							if(item instanceof SoldierEntity && item.mark == "role"){
								boo = true;
							}
						}
						this.summonCount = boo?count:0;
					},this);
				}else{
					console.log("错误的点-----");
				}
			}else if(skillId == 104){
				//终极技能
				let mainRole:SoldierEntity = MapView.inst().roles[0];
				if(this[`skill${skillId}`].isInCd){
					UserTips.inst().showTips("技能冷却中");
					return;
				}
				if(mainRole && mainRole.atkTar && !mainRole.atkTar.isDead){
					this[`skill${skillId}`].setCd(skillCfg.skillCd);
					this.releaseSkill104 = new MovieClip();
					LayerManager.MAP_LAYER.addChild(this.releaseSkill104);
					this.releaseSkill104.playFile(`${EFFECT}eff_104`,-1);
					let angle:number = Math.atan2(mainRole.atkTar.y - mainRole.y,mainRole.atkTar.x - mainRole.x)*180/Math.PI;
					this.releaseSkill104.rotation = angle;
					this.releaseSkill104.scaleX = this.releaseSkill104.scaleY = 2;
					this.releaseSkill104.x = mainRole.x;
					this.releaseSkill104.y = mainRole.y - 50;
					let x:number =this.releaseSkill104.x + Math.sin(angle*Math.PI/180)*StageUtils.inst().getWidth() + 100;
					let y:number =this.releaseSkill104.y + Math.cos(angle*Math.PI/180)*StageUtils.inst().getHeight() + 100;
					let self = this;
					let timecout:number = 0;
					let interval = setInterval(()=>{
						timecout += 33.3;
						self.releaseSkill104.x += Math.cos(angle*Math.PI/180)*20;
						self.releaseSkill104.y += Math.sin(angle*Math.PI/180)*20;
						let stageP:egret.Point = self.releaseSkill104.parent.localToGlobal(self.releaseSkill104.x,self.releaseSkill104.y);
						if(stageP.x <= - 200 || stageP.x >= StageUtils.inst().getWidth()+200 || stageP.y <= -200 || stageP.y >= StageUtils.inst().getHeight()+200){
							self.releaseSkill104.parent.removeChild(self.releaseSkill104);
							self.releaseSkill104 = null;
							console.log("skill release 104")
						}else{
							if(timecout >= 500){
								timecout = 0;
								let rect1:egret.Rectangle = this.releaseSkill104.getBounds();
								let mons:MonsterEntity[] = MapView.inst().monsters;
								for(let i:number = 0;i<mons.length;i++){
									let rect2:egret.Rectangle = mons[i].getBounds();
									if(rect1.intersects(rect2)){
										mons[i].reduceHp((Math.random()*70+20)>>0)
									}
								}
							}
							
						}
					},33.3)
				}else{
					UserTips.inst().showTips("请先选择攻击目标");
				}
				
			}else if(skillId == 101){
				if(this.skillNum <= 0 || this[`skill${skillId}`].isInCd){
					UserTips.inst().showTips("技能冷却中")
					return;
				}
				this.skillNum -= 1;
				if(this.skillNum <= 0){
					this[`skill${skillId}`].setCd(skillCfg.skillCd,()=>{
						this.skillNum = 3;
					},this)
				}
				let mainRole:SoldierEntity = MapView.inst().roles[0];
				let skillMc:MovieClip = new MovieClip();
				LayerManager.MAP_LAYER.addChildAt(skillMc,1);
				skillMc.playFile(`${EFFECT}eff_101`,-1);
				skillMc.x = mainRole.x + ((Math.random()*20)>>0);
				skillMc.y = mainRole.y + ((Math.random()*20)>>0);
				this.boomMcs.push(skillMc);
				let self = this;
				let timeout = setTimeout(function(_mc) {
					clearTimeout(timeout);
					if(_mc && _mc.parent){
						let index:number = self.boomMcs.indexOf(_mc);
						if(index != -1){
							self.boomMcs.splice(index,1);
						}
						let boommc:MovieClip = new MovieClip();
						LayerManager.MAP_LAYER.addChildAt(boommc,1);
						boommc.playFile(`${EFFECT}eff_101_boom`,1,null,true);
						boommc.x = _mc.x;
						boommc.y = _mc.y;
						_mc.parent.removeChild(_mc)
					}
			    }, skillCfg.buffTime*1000,skillMc);
			}
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
	public close():void{
		MessageManager.inst().removeListener("releaseSkill",this.onRelease,this);
		if(this.goldWather){this.goldWather.unwatch()}
		this.removeTouchEvent(this.addBtn,this.onOpenShop);
		this.removeTouchEvent(this.mapBtn,this.onSpreadMap);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_INFO,this.onGuideClick,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_END,this.onGuideEnd,this);
		MessageManager.inst().removeListener("hurtShow",this.hurtShow,this);
		MessageManager.inst().removeListener("syncRolepos",this.syncRolePos,this);
		MessageManager.inst().removeListener("syncMonpos",this.syncMonPos,this);
		MessageManager.inst().removeListener("skillUpgrade",this.onSkillUpgrade,this);
		MessageManager.inst().removeListener("buyEquip",this.buyEquip,this);
		MessageManager.inst().removeListener("showSlash",this.showSlash,this);
		MessageManager.inst().removeListener("hideSlash",this.hideSlash,this);
		MessageManager.inst().removeListener("resetGame",this.onReset,this);
		if(this.expWatcher){this.expWatcher.unwatch()}
	}
}
ViewManager.inst().reg(GameMain,LayerManager.UI_Main);