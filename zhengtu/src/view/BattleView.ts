class BattleView extends BaseEuiView{

	private battleNameLab:eui.Label;
	private skillGroup:eui.Group;
	private returnBtn:eui.Image;

	private _singleFrame:number = 33.3;
	private _curTime:number = 0;
	private actionExecStandTime:number = 1000;

	private _entitys:SoldierEntity[] = [];
	private _ownEntitys:SoldierEntity[] = [];
	private _levelEntitys:SoldierEntity[] = [];
	private _level:number;
	/**当前战斗波数 */
	private _winCount:number = 0;
	/**我拥有的将领数据 */
	private generalAttrs:any[] = [];
	private ownGeneralAttrs:any[] = [];
	/**当前关卡拥有的将领数据 */
	private levelOwnGeneralAttrs:any[] = [];

	//列
	private _col:number = 5;
	//行
	private _row:number = 2;

	private topBg:eui.Image;

	private levelGeneralGroup:eui.Group;

	private guideObj:any;

	private fingerMc:MovieClip;

	private bg:eui.Image;

	private _state:number;
	public constructor() {
		super();
	}
	public open(...param):void{
		this._level = param[0].level;
		GameApp.curBattleLevel = this._level;
		this.battleNameLab.text = LevelCfg.levelCfg[this._level - 1].levelName;
		this._state = param[0].state;
		if(param[0].state == 1){
			this.battleNameLab.text = "剿匪";
		}else if(param[0].state == 2){
			this.battleNameLab.text = "狩猎";
		}
		this.createEntity();
		let bgstr:string = this._level <= 3?"level_map_1_png":this._level <= 6?"level_map_2_png":"level_map_3_png";
		this.bg.source = bgstr;
		// let skill3:eui.Image = this.skillGroup.getChildByName("100002") as eui.Image;
		// this.guideObj = skill3;
		// this.guideObj.name="100002"
		// let p:egret.Point = this.skillGroup.localToGlobal(skill3.x - 20,skill3.y);
		// if(GameApp.guilding){
		// 	GlobalFun.guideToNext();
		// }
		
		// if(GameApp.guilding){
		// 	this.returnBtn.visible = false;
		// 	let mc:MovieClip = new MovieClip();
		// 	mc.playFile(`${EFFECT}fingerClick`,-1);
		// 	this.skillGroup.addChild(mc);
		// 	mc.x = skill3.x + (skill3.width>>1);
		// 	mc.y = skill3.y + (skill3.height>>1);
		// 	this.fingerMc = mc;
		// }

		this.skillGroup.x = (StageUtils.inst().getWidth() - this.skillGroup.width)>>1;
		this.skillGroup.y = StageUtils.inst().getHeight() - this.skillGroup.height;
		this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkillTouch,this);
		for(let i:number = 0;i<this.skillGroup.numChildren;i++){
			let skillId:number = parseInt(this.skillGroup.$children[i].name);
			let isOpen:boolean = GlobalFun.isOpenSkill(skillId);
			if(!isOpen){
				GlobalFun.filterToGrey(this.skillGroup.$children[i]);
			}
		}
		
		this.addTouchEvent(this.returnBtn,this.onReturn,true);

		GameApp.battleEnd = false;

		MessageManager.inst().addListener(CustomEvt.GUIDE_USE_SKILL,this.onUseSkill,this);
		// MessageManager.inst().addListener(CustomEvt.BATTLE_RESET,this.initialize,this);
		// MessageManager.inst().addListener(CustomEvt.BATTLE_END,this.onBattleEnd,this);
	}
	private onUseSkill():void{
		this.onSkillTouch({target:this.guideObj});
		GlobalFun.guideToNext();
	}
	// private onBattleEnd():void{
	// 	for(let key in this.generalAttrs){
	// 		this.generalAttrs[key].curExp += (Math.random()*10)>>0
	// 	}
	// 	egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL,JSON.stringify({attr:this.generalAttrs}));
	// }
	// private initialize():void{
	// 	this.curOwnBatGeneral = null;
	// 	this.curLevelBatGeneral = null;
	// 	this._ownEntitys = [];
	// 	this._levelEntitys = [];
	// 	for(let i:number = 0;i<this._entitys.length;i++){
	// 		if(this._entitys[i] && this._entitys[i].parent){
	// 			this._entitys[i].parent.removeChild(this._entitys[i]);
	// 		}
	// 	}
	// 	this._entitys = []
	// 	this._batCount = 1;
	// 	this.ownGeneralAttrs = [];
	// 	this.levelOwnGeneralAttrs = [];
	// 	this.generalAttrs = [];

	// 	let len:number = this.skillGroup.$children.length;
	// 	for(let j:number = 0;j<len;j++){
	// 		let item:any = this.skillGroup.getChildAt(j);
	// 		if(item && item.name){
	// 			GlobalFun.clearFilters(item);
	// 			item.touchEnabled = true;
	// 		}
	// 	}
	// 	//重置进度的显示

	// 	//、
	// 	this.createEntity();
	// }
	private onReturn():void{
		GameApp.battleEnd = true;
		ViewManager.inst().close(BattleView);
	}
	private onSkillTouch(evt:egret.TouchEvent|any):void{
		if(this.walkedboo){
			UserTips.inst().showTips("未进入战斗场景")
			return
		}
		if(GameApp.guilding){
			if(this.fingerMc && this.fingerMc.parent){
				this.fingerMc.parent.removeChild(this.fingerMc);
			}
		}
		let namestr:string = evt.target.name;
		if(namestr){
			if(!GlobalFun.isOpenSkill(parseInt(namestr))){
				UserTips.inst().showTips("当前技能未开启");
				return;
			}
			let fontImg:eui.Image = new eui.Image();
			fontImg.source = "f_"+namestr+"_png";
			this.addChild(fontImg);
			fontImg.horizontalCenter = 0;
			fontImg.top = 100;
			fontImg.alpha = 0;
			fontImg.scaleX = fontImg.scaleY = 5;
			egret.Tween.get(fontImg).to({alpha:1,scaleX:1,scaleY:1},600,egret.Ease.circOut).wait(300).call(()=>{
				egret.Tween.removeTweens(fontImg);
				if(fontImg && fontImg.parent){
					fontImg.parent.removeChild(fontImg);
				}
			},this)
			GlobalFun.filterToGrey(evt.target)
			evt.target.touchEnabled = false;
			GlobalFun.createSkillEff(1,parseInt(namestr),this,2,null);
			let levelstr:string = egret.localStorage.getItem("skill_"+namestr);
			let skillCfg:any = this.getSkillCfg(parseInt(namestr));
			let damageNum:number = skillCfg.damage;
			let damage:number = skillCfg.dmgHp;
			if(levelstr){
				damageNum = parseInt(levelstr)*damageNum;
				damage = parseInt(levelstr)*damage;
			}
			if(this._levelEntitys){
				let self = this;
				for(let i:number = 0;i<damageNum;i++){
					let timeout = setTimeout(function() {
						clearTimeout(timeout);
						if(GameApp.battleEnd){return}
						let index:number = (Math.random()*self._levelEntitys.length)>>0;
						let item:SoldierEntity = self._levelEntitys[index];
						if(item){
							item.reduceHp(damage);
							if(item.isDead){
								for(let j:number = 0;j<self._entitys.length;j++){
									if(self._entitys[j] == item){
										self._entitys.splice(j,1);
										break;
									}
								}
								item.dispose();
								self._levelEntitys.splice(index,1);
								if(self._levelEntitys.length <= 0){
									egret.Tween.removeAllTweens();
									//当前使用技能使敌方全部死亡
									//创建下一波敌方矩阵
									this.createGeneral(-1);
									//走入场景开始战斗
									this.walkToScene();
								}
							}
						}
					}, 100);
				}
			}
		}
	}
	private getSkillCfg(skillId:number):any{
		for(let key in SkillCfg.skillCfg){
			if(SkillCfg.skillCfg[key].skillId == skillId){
				return SkillCfg.skillCfg[key];
			}
		}
	}
	private curOwnBatGeneral:SoldierEntity;
	private curLevelBatGeneral:SoldierEntity;
	private createEntity():void{
		// let levelstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL)
		// if(!levelstr){
		// 	this._level = 1;
		// 	egret.localStorage.setItem(LocalStorageEnum.LEVEL,"1");
		// }else{
		// 	this._level = parseInt(levelstr);
		// }
		
		let ownGenerals:string = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
		
		this.ownGeneralAttrs = JSON.parse(ownGenerals).attr;
		this.generalAttrs = JSON.parse(ownGenerals).attr;

		this.levelOwnGeneralAttrs = [LevelCfg.levelCfg[this._level - 1]];
		if(this._state == 1){
			this.levelOwnGeneralAttrs[0].name = "大当家";
		}else if(this._state == 2){
			this.levelOwnGeneralAttrs[0].name = "狼王";
			this.levelOwnGeneralAttrs[0].hp = 5000;
			this.levelOwnGeneralAttrs[0].atk = 500;
		}
		let namtstr:string = LevelCfg.levelCfg[this._level - 1].general;
		namtstr = "";
		let nameArr:string[] = namtstr.split("_");
		//生成附属将领数据
		if(namtstr && namtstr != ""){
			for(let i:number = 0;i<nameArr.length;i++){
				let cfg:any = {
					name:nameArr[i],
					hp:this.levelOwnGeneralAttrs[0].hp*0.8,
					atk:this.levelOwnGeneralAttrs[0].hp*0.8,
					capacity:this.levelOwnGeneralAttrs[0].capacity,
					type:(Math.random()*3)>>0,
					level:this.levelOwnGeneralAttrs[0].level
				}
				if(this._state == 1){
					cfg.name = i == 0?"二当家":"三当家";
				}
				this.levelOwnGeneralAttrs.push(cfg);
			}
		}
		//生成关卡进度头像数据
		for(let i:number = 0;i<this.levelOwnGeneralAttrs.length;i++){
			let img:eui.Image = new eui.Image();
			this.levelGeneralGroup.addChild(img);
			
			img.source = `progress_head_${i}_png`;
			if(this._state==1){
				img.source = `shanzei_${i+1}_png`
			}else if(this._state == 2){
				img.source = "boss_png"
			}
			img.width = 50;
			img.height = 58;
			img.x = 20 + i*(img.width + 15);
			img.y = 16;
			img.name = (i+1).toString();

			let nameLab:eui.Label = new eui.Label();
			this.levelGeneralGroup.addChild(nameLab);
			nameLab.fontFamily = "yt";
			nameLab.textColor = 0xfc3434;
			nameLab.size = 12;
			nameLab.text = this.levelOwnGeneralAttrs[i].name;
			nameLab.x = img.x + (img.width>>1) - (nameLab.width>>1);
			nameLab.y = img.y + img.height - nameLab.height - 2;
		}
		this.levelGeneralGroup.width = this.levelOwnGeneralAttrs.length*50 + 30
		this.topBg.width = this.levelGeneralGroup.width + 50;
		//创建己方
		this.createGeneral(1);
		//创建敌方
		this.createGeneral(-1);

		this.walkToScene();

		// egret.startTick(this.actionExec,this);
	}
	/**整齐的走入战斗场景 */
	private walkToScene():void{
		let offestX:number = (StageUtils.inst().getWidth()>>1);
		let index:number = 0;
		let actionBoo:boolean = false;
		for(let i:number = 0;i<this._ownEntitys.length;i++){
			let sitem:SoldierEntity = this._ownEntitys[i];
			let tx:number =  this._ownEntitys[i].x + offestX;
			let ty:number = this._ownEntitys[i].y;
			sitem.execMoveAction({x:tx,y:ty},()=>{
				index+=1;
				if(index >= this._ownEntitys.length){
					if(!actionBoo){
						actionBoo = true;
						egret.startTick(this.actionExec,this);
					}
				}
			},this,false);
		}
		let index2:number = 0;
		let offestX2:number = (StageUtils.inst().getWidth()>>1); 
		for(let j:number = 0;j<this._levelEntitys.length;j++){
			let sitem:SoldierEntity = this._levelEntitys[j];
			let tx:number = this._levelEntitys[j].x - offestX2;
			let ty:number = this._levelEntitys[j].y
			sitem.execMoveAction({x:tx,y:ty},()=>{
				index2+=1;
				if(index2 >= this._levelEntitys.length){
					if(!actionBoo){
						actionBoo = true;
						egret.startTick(this.actionExec,this);
					}
				}
			},this,false);
		}
	}
	/**重新创建单个将领 */
	private createGeneral(camp:number):void{
		this._row = 2;
		if(camp == 1){
			//己方
			let owngen:SoldierEntity = ObjectPool.pop("SoldierEntity");
			owngen.attrCfg = this.ownGeneralAttrs.shift();
			this.curOwnBatGeneral = owngen;
			owngen.general = true;
			owngen.setSoldierData(1,"own_general",SoldierType.QI);
			this.addChild(owngen);
			owngen.x =  - 100;
			owngen.y = (StageUtils.inst().getHeight()>>1); 
			this._ownEntitys.push(owngen);
			this._entitys.push(owngen);
			this.createSoldierGroup(1,owngen.attrCfg.level,owngen.attrCfg.type,{x:owngen.x,y:owngen.y},owngen.attrCfg.curCapacity);
			this.initSolderRect(1);
		}else{
			//创建敌方
			let levelGen:SoldierEntity = ObjectPool.pop("SoldierEntity");
			levelGen.attrCfg = this.levelOwnGeneralAttrs.shift();
			levelGen.general = true;
			let str:string = "general_1";
			if(this._state == 2){	
				str = "boss";
				levelGen.attrCfg.atk = 500;
				levelGen.attrCfg.hp = 1000000;
			}
			levelGen.setSoldierData(-1,str,SoldierType.SHIELD,this._state);
			this.addChild(levelGen);
			levelGen.x = (StageUtils.inst().getWidth()) + 100;
			levelGen.y = (StageUtils.inst().getHeight()>>1); 
			this._levelEntitys.push(levelGen);
			this._entitys.push(levelGen);
			this.createSoldierGroup(-1,levelGen.attrCfg.level - 1,levelGen.attrCfg.type,{x:levelGen.x,y:levelGen.y});
			
		}
		this.dealLayerRelation();
	}
	//创建士兵矩阵
	private createSoldierGroup(camp:number,level:number,type:number,xy:XY,curCapacity?:number):void{
		let restr:string = camp == 1?"soldier_":"enemy_";
		if(camp == 1){
			//已方 。因为兵的数量不确定 。所以不能矩阵排列
			for(let i:number = 0;i<curCapacity;i++){
				let soldier:SoldierEntity = ObjectPool.pop("SoldierEntity");
				soldier.setSoldierData(camp,`${restr}${type}`,type);
				this.addChild(soldier);
				this._ownEntitys.push(soldier);
				this._entitys.push(soldier);
			}
		}else{
			if(this._state == 2){return}
			this._row += level;
			let offsetx:number = 50;
			for(let i:number = 0;i<this._row;i++){
				
				for(let j:number = 0;j<this._col;j++){
					let soldier:SoldierEntity = ObjectPool.pop("SoldierEntity");
					let soldierstr:string = `${restr}${type}`;
					if(this._state == 1){
						soldierstr = "shanzei" ;
						type = SoldierType.SHIELD;
					}
					soldier.setSoldierData(camp,soldierstr,type);
					this.addChild(soldier);
					if(camp == -1){
						soldier.x = xy.x + 20 + i*(soldier.w >>1) + offsetx;
						soldier.y = xy.y - 100  + j*(soldier.h>>1);
						this._levelEntitys.push(soldier);
					}
					// else{
					// 	soldier.x = xy.x -120 - (i+1)*50 - i*(soldier.w >>1) + offsetx;
					// 	soldier.y = xy.y  + j*(soldier.h>>1);
					// 	this._ownEntitys.push(soldier);
					// }
					// offsetx += (soldier.w >>1);
					this._entitys.push(soldier);
				}
			}
		}
		
		// if(camp == -1){
			// this._row -= 1;
		// }
		
		
	}
	/**动作执行 */
	private actionExec(timespan:number):boolean{
		this._curTime += this._singleFrame;
		if(this._curTime >= this.actionExecStandTime){
			this._curTime = 0;
			this.action(1);
			this.action(-1);
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
				// if(camp == 1){
				// 	this._ownEntitys.splice(i,1);
				// }else{
				// 	this._levelEntitys.splice(i,1);
				// }
				ownEntitys.splice(i,1);
				// ownEntitys.splice(i,1);
				i-=1;
				continue;
			}else{
				let index:number = (Math.random()*levelEntitys.length)>>0;
				let atkItem:SoldierEntity;
				atkItem = this.getNearByEntity(item,levelEntitys);
				if(item.general){
					if(levelEntitys[0] && levelEntitys[0].general){
						atkItem = levelEntitys[0];
					}
				}
				item.lookAt(atkItem);
				if(item.isInAtkDis()){
					//在攻击距离
					item.execAtkAction();
				}else{
					if(this.checkFrontBlock(camp,item,ownEntitys)){
						let dicObj:{dit:number} = this.checkYBlock(item,ownEntitys);
						if(dicObj.dit){
							//存在可以移动的身位
							let offradom:number = (Math.random()*50)>>0
							if(item.y + offradom >= StageUtils.inst().getHeight()){
								offradom = StageUtils.inst().getHeight() - 20;
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
			let timeout = egret.setTimeout(function() {
				egret.clearTimeout(timeout);
				if(GameApp.battleEnd){return};
				egret.Tween.removeAllTweens();
				//以下改变将领所带的兵种的数量数据
				for(let key in this.generalAttrs){
					if(this.generalAttrs[key].insId == this.curOwnBatGeneral.attrCfg.insId){
						this.generalAttrs[key].curCapacity = this._ownEntitys.length?this._ownEntitys[0].general?this._ownEntitys.length-1:this._ownEntitys.length:0;
						let remainValue:number = (this.curOwnBatGeneral.attrCfg.capacity - this.generalAttrs[key].curCapacity);
						if(remainValue <= 0){remainValue = 0}
						// GameApp.inst()["soldier_"+this.curOwnBatGeneral.attrCfg.type] -= remainValue;
						break;
					}
				}
				
				if(this._ownEntitys.length){
					//胜利
					this._winCount += 1;
					this.battleWin();
				}else{
					this.battleFail();
				}
			}, this,600);
			
		}
		
	}
	/**当前战斗波次获得胜利 */
	private battleWin():void{
		let headImg:eui.Image = this.levelGeneralGroup.getChildByName(this._winCount.toString()) as eui.Image;
		let failIcon:eui.Image = new eui.Image();
		this.levelGeneralGroup.addChild(failIcon);
		failIcon.source = "battle_fail_icon_png";
		failIcon.x = headImg.x + headImg.width - failIcon.width - 2;
		failIcon.y = 10
		if(!this.levelOwnGeneralAttrs.length){
			//关卡战斗胜利
			this.showResult(1);
		}else{
			
			//我方继续前进 。寻找下一波战斗;
			this.walkedboo = true;
			GlobalFun.filterToGrey(this.skillGroup);
			
			let index:number = 0;
			for(let i:number = 0;i<this._ownEntitys.length;i++){
				let item:SoldierEntity = this._ownEntitys[i];
				let endP:XY = {x:StageUtils.inst().getWidth()+70,y:item.y};
				item.execMoveAction(endP,()=>{
					index += 1;
					if(index >= this._ownEntitys.length){
						this.walkedboo = false;
						GlobalFun.clearFilters(this.skillGroup);
						//当前已经走完
						this.initSolderRect(1);
						//创建下一波敌方矩阵
						this.createGeneral(-1);
						//走入场景开始战斗
						this.walkToScene();
					}
				},this)
			}
			
		}
	}
	private walkedboo:boolean = false;
	/**当前战斗波次获得失败 */
	private battleFail():void{
		if(!this.ownGeneralAttrs.length){
			//关卡战斗失败
			this.showResult(0)
		}else{
			let index:number = 0;
			GlobalFun.filterToGrey(this.skillGroup);
			this.walkedboo = true;
			for(let i:number = 0;i<this._levelEntitys.length;i++){
				let item:SoldierEntity = this._levelEntitys[i];
				let endP:XY = {x:-70,y:item.y};
				item.execMoveAction(endP,()=>{
					index += 1;
					if(index >= this._levelEntitys.length){
						this.walkedboo = false;
						GlobalFun.clearFilters(this.skillGroup);
						//敌方阵营走完
						this.initSolderRect(-1);
						//创建下一波我方矩阵
						this.createGeneral(1);
						//走入场景开始战斗
						this.walkToScene();
					}
				},this)
			}
		}
	}
	/**初始化胜利一方当前的方阵 */
	private initSolderRect(camp:number):void{
		let x:number = -100;
		let y:number = (StageUtils.inst().getHeight()>>1);
		let entitys:SoldierEntity[] = camp == 1?this._ownEntitys :this._levelEntitys;
		if(camp == -1){
			x = StageUtils.inst().getWidth() + 100;
			y = (StageUtils.inst().getHeight()>>1);
		}
		let row:number = Math.ceil(entitys.length/this._col);
		if(entitys[0].general){
			//当前是将领
			row = Math.ceil((entitys.length-1)/this._col);
			entitys[0].x = x;
			entitys[0].y = y;
			// x-=120;
		}
		if(row <= 1){
			let offestx:number = 30;
			for(let k:number = 0;k<entitys.length;k++){
				if(entitys[k].general){continue}
				let soldier:SoldierEntity = entitys[k];
				if(camp == 1){
					soldier.x = x - 100  + offestx;
					soldier.y = y - 100  + k*(soldier.h>>1);
				}else{
					soldier.x = x + 100  + offestx;
					soldier.y = y - 100  + k*(soldier.h>>1);
				}
				// offestx += (soldier.w >>1);
			}
		}else{
			let offestx:number = 30;
			for(let k:number = 0;k<row;k++){
				
				for(let j:number = 0;j<this._col;j++){
					let index:number = k*this._col+j + 1;
					if(!entitys[0].general){index -= 1}
					let soldier:SoldierEntity = entitys[index];
					if(soldier){
						if(camp == 1){
							soldier.x = x - (k+1)*150 + k*(soldier.w >>1) + offestx;
							soldier.y = y - 100  + j*(soldier.h>>1);
						}else{
							soldier.x = x  + (k+1)*150 + k*(soldier.w >>1) + offestx;
							soldier.y = y - 100  + j*(soldier.h>>1);
						}
						// offestx += (soldier.w >>1);
					}
				}
			}
		}
	}
	/**显示结果界面 1成功0失败*/
	private showResult(flag:number):void{
		GameApp.battleEnd = true;
		let exp:number = LevelCfg.levelCfg[this._level -1].exp;
		for(let i:number = 0;i<this.generalAttrs.length;i++){
			if(this.generalAttrs[i].level >= 10){
				continue;
			}
			this.generalAttrs[i].curExp += exp;
			if(this.generalAttrs[i].curExp >= this.generalAttrs[i].exp){
				this.generalAttrs[i].curExp = this.generalAttrs[i].curExp - this.generalAttrs[i].exp;
				this.generalAttrs[i].exp += 20;
				this.generalAttrs[i].level += 1;
				this.generalAttrs[i].capacity += 5;
				if(i == 0){
					MessageManager.inst().dispatch(CustomEvt.UPGRADE,{level:this.generalAttrs[i].level});
				}
			}
		}
		let data:any[] = [];
		let awardRole:boolean = false;
		let icon:string = "";
		let name:string = "";
		if(flag == 1){
			let passChapterStr:string = egret.localStorage.getItem(LocalStorageEnum.PASS_CHAPTER);
			let passChapterArr:string[] = [];
			if(passChapterStr){
				passChapterArr = passChapterStr.split("_");
			}
			if(passChapterArr.indexOf(this._level.toString()) == -1){
				let index:number = (Math.random()*100)>>0;
				let percent:number = this._level == 1?0:96;
				if(index >= percent){
					//获得了武将
					let insId:number = LevelCfg.levelCfg[this._level - 1].insId;
					if(!this.isExistGeneral(insId)){
						awardRole = true
						let generalData:any = this.getOtherGeneralData(insId);
						icon = `progress_head_${generalData.index}_png`;
						// GameApp.inst()["soldier_"+generalData.type] += 10;
						name = generalData.name;
						this.generalAttrs.push(generalData);
					}
				}
				let level:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.LEVEL));
				if(level == this._level){
					let nextLevel:number = (level+1) >= 10 ? level:(level+1);
					egret.localStorage.setItem(LocalStorageEnum.LEVEL,nextLevel.toString());
				}
				passChapterStr = passChapterStr?passChapterStr+"_"+this._level:this._level.toString();
				egret.localStorage.setItem(LocalStorageEnum.PASS_CHAPTER,passChapterStr);
			}
			
		}
		egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL,JSON.stringify({attr:this.generalAttrs}));
		ViewManager.inst().open(ResultPopUp,[{state:flag,awardRole:awardRole,icon:icon,name:name,level:this._level,exp:exp}]);
	}

	/**获取关卡得到的武将数据 */
	private getOtherGeneralData(insId:number):any{
		let otherGeneralstr:string = egret.localStorage.getItem(LocalStorageEnum.OTHER_GENERAL);
		let otherGeneralArr:any[] = JSON.parse(otherGeneralstr);
		for(let key in otherGeneralArr){
			if(otherGeneralArr[key].insId == insId){
				return otherGeneralArr[key];
			}
		}
	}
	/**判断是否已经存在了奖励的武将 */
	private isExistGeneral(insid:number):boolean{
		let ownGeneralstr:string = egret.localStorage.getItem(LocalStorageEnum.OWN_GENERAL);
		let ownGeneralArr:any[] = JSON.parse(ownGeneralstr).attr;
		for(let key in ownGeneralArr){
			if(ownGeneralArr[key].insId == insid){
				return true;
			}
		}
		return false;
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
		// for(let i:number = 0;i<entitys.length;i++){
		// 	let otherItem:SoldierEntity = entitys[i];
		// 	if(item != otherItem){
		// 		let ox:number = otherItem.x ;
		// 		let oy:number = otherItem.y;
		// 		let dis:number = (item.w>>1) + (otherItem.w>>1) - 70;
		// 		let disy:number = (item.h>>1) + (otherItem.h>>1) - 70;
		// 		if(camp == 1){
		// 			if(ox > x && (ox - x)<= dis && (oy > y && (oy- y)<= disy)){
		// 				boo = true;
		// 				break;
		// 			}
		// 		}else{
		// 			if(ox < x && (x-ox) <= dis && (oy > y && (oy- y)<= disy)){
		// 				boo = true;
		// 				break;
		// 			}
		// 		}
				
		// 	}
		// }
		return boo;
	}
	/**获取最近攻击单位 */
	private getNearByEntity(atkEntity:SoldierEntity,soldiers:SoldierEntity[]):SoldierEntity{
		let minEntity:SoldierEntity = soldiers.length > 1?soldiers[1]:soldiers[0]; //避免士兵第一个选择就是武将
		if(minEntity){
			let dis:number = Math.sqrt(Math.pow(minEntity.x - atkEntity.x,2)+Math.pow(minEntity.y -atkEntity.y,2));
			let len:number = soldiers.length;
			if(len >= 15){
				len = 15;
			}
			let index:number = (Math.random()*len)>>0;
			minEntity = soldiers[index];
			// for(let i:number = 0;i<soldiers.length;i++){
			// 	if(atkEntity.general){
			// 		if(soldiers[i].general){
			// 			minEntity = soldiers[i];
			// 			break;
			// 		}
			// 	}
			// 	if(soldiers[i].general){
			// 		continue;
			// 	}
			// 	let item1:SoldierEntity = soldiers[i];
			// 	let dis2:number = Math.sqrt(Math.pow(item1.x - atkEntity.x,2)+Math.pow(item1.y -atkEntity.y,2));
			// 	if(dis2 <= dis){
			// 		minEntity = item1;
			// 		dis = dis2;
			// 	}
				
			// }
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
	
	public close():void{
		this.skillGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSkillTouch,this);
		MessageManager.inst().removeListener(CustomEvt.GUIDE_USE_SKILL,this.onUseSkill,this);
		egret.stopTick(this.actionExec,this);
		// MessageManager.inst().removeListener(CustomEvt.BATTLE_RESET,this.initialize,this);
		// MessageManager.inst().removeListener(CustomEvt.BATTLE_END,this.onBattleEnd,this);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.curOwnBatGeneral = null;
		this.curLevelBatGeneral = null;
		this._ownEntitys = [];
		this._levelEntitys = [];
		for(let i:number = 0;i<this._entitys.length;i++){
			if(this._entitys[i] && this._entitys[i].parent){
				this._entitys[i].parent.removeChild(this._entitys[i]);
			}
		}
		this._entitys = []
		this._winCount = 0;
		this.ownGeneralAttrs = [];
		this.levelOwnGeneralAttrs = [];
	}
}
ViewManager.inst().reg(BattleView,LayerManager.UI_Main);