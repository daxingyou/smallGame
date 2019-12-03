class SoldierEntity extends BaseEntity{
	private _atkTar:MonsterEntity|BuildingEntity;
	public _mc:MovieClip;
	// public _weaponMc:MovieClip;
	private _res:string;
	// private _weaponRes:string;
	private _direc:number;
	//移动速度 s为单位 。 v*t = d 
	private curState:string = ActionState.STAND;
	private _barimg:eui.Image;
	private _mpbarimg:eui.Image;
	private _watcher:eui.Watcher;
	private _watcher2:eui.Watcher;
	private progressGroup:eui.Group;
	public ObjectPoolKey:string = "SoldierEntity";

	public soldierAttr:RoleVo;

	public general:boolean = false;

	public w:number;
	public h:number;
	private _typeId:number;

	private soldierCampImg:eui.Image;

	public camp:number = 1;

	public atkState:boolean = false;

	public isInAtk:boolean = false;
	private qualityRes:any[] = [{body:"body002",weapon:"weapon104"},{body:"body102",weapon:"weapon105"},{body:"body307",weapon:"weapon106"},{body:"body308",weapon:"weapon104"}];
	private initRes:any = {body:"body001",weapon:"weapon100"}
	// private buffIcon:eui.Image;
	// private buffEffect:MovieClip;
	public mark:string;

	public route:any[] = [];

	public moveEnd:boolean = true;

	public followValue:number = 0;

	public summonCount:number = 0;

	public towerPoint:XY;

	private nameLab:eui.Label;
	private levelWatcher:eui.Watcher;
	public constructor() {
		super();
	}
	protected initialize():void{
	}
	public setSoldierData(camp:number,res:string):void{

		this._camp = camp;
		this.camp = camp;
		this._direc = this._camp == 1?1:-1;
		this._res = res
		// let bodyres:string = `${BODY}${res}_${this.dic}${this.curState}`
		// this._weaponRes = weaponRes;
		// let weapon:string = `${WEAPON}${weaponRes}_${this.dic}${this.curState}`

		this._mc = new MovieClip();
		this.addChild(this._mc);
		// this._mc.playFile(bodyres,-1);

		this._hp = this._thp = this.soldierAttr.hp;
		// this._mp = this._tmp = this.soldierAttr.mp;

		// this._weaponMc = new MovieClip();
		// this.addChild(this._weaponMc);
		// this._weaponMc.playFile(weapon,-1)
		

		this.progressGroup = new eui.Group();
		this.progressGroup.width = 106;
		this.addChild(this.progressGroup);
		this.progressGroup.anchorOffsetX = 53;
		
		// this.progressGroup.x = -40;
		this.progressGroup.y = -60;
		this.progressGroup.scaleX = this.progressGroup.scaleY = 0.7;

		// let levelLab:eui.Label = new eui.Label();
		// this.progressGroup.addChild(levelLab);
		// levelLab.fontFamily = "yt";
		// levelLab.size = 20;
		// levelLab.text = this.soldierAttr.level .toString()+"级";
		// levelLab.horizontalCenter = 0;
		// levelLab.top = -23;
		let hpbarimg:eui.Image = new eui.Image();
		hpbarimg.source = "own_hp_bg_png";
		this.progressGroup.addChild(hpbarimg);
		hpbarimg.y = -15;

		let hpimg:eui.Image = new eui.Image();
		hpimg.source = "own_hp_bar_png";
		this.progressGroup.addChild(hpimg)
		this._barimg = hpimg;
		hpimg.y = -11;
		hpimg.x = 10;

		// let mpbarimg:eui.Image = new eui.Image();
		// mpbarimg.source = "entity_hp_bg_png";
		// this.progressGroup.addChild(mpbarimg);
		// mpbarimg.y = -7;

		// let mpimg:eui.Image = new eui.Image();
		// mpimg.source = "entity_mp_bar_png";
		// this.progressGroup.addChild(mpimg)
		// this._mpbarimg = mpimg;
		// mpimg.y = -7;
		
		if(this.general){
			let nameLab:eui.Label = new eui.Label;
			nameLab.text = "玩家 Lv."+GameApp.level;
			this.progressGroup.addChild(nameLab);
			nameLab.y = -40;
			this.nameLab = nameLab;
			nameLab.horizontalCenter = 0;
			nameLab.size = 24;
			nameLab.stroke = 1;
			nameLab.strokeColor = 0x000000;
			nameLab.fontFamily = "yt";
		}
		

		// this.buffIcon = new eui.Image();
		// this.progressGroup.addChild(this.buffIcon);
		// this.buffIcon.source = "effect_0_png";
		// this.buffIcon.anchorOffsetX = 73>>1;
		// this.buffIcon.anchorOffsetY = 51>>1;
		// this.buffIcon.y = -70;
		// this.buffIcon.horizontalCenter = 0;

		// this.buffEffect = new MovieClip();
		// this.buffEffect.playFile(`${EFFECT}circle`,-1);
		// this.progressGroup.addChild(this.buffEffect);
		// // this.buffEffect.x = this.buffIcon.x;
		// this.buffEffect.y = this.buffIcon.y;
		// this.buffEffect.x = this.progressGroup.width>>1;

		this.changeRoleAction();
		// let barRes:number = camp == 1?0x00ff00:0xfc3434;
		// let barimg:egret.Shape = new egret.Shape();
		// barimg.graphics.beginFill(barRes,1);
		// barimg.graphics.drawRect(0,0,90,8);
		// barimg.graphics.endFill();
		// this._barimg = barimg;
		// this.progressGroup.addChild(barimg);

		this._watcher = eui.Binding.bindHandler(this,["_hp"],this.onHpChange,this);
		this.levelWatcher = eui.Binding.bindHandler(GameApp,['level'],this.onLevelChange,this);
		
		// this._watcher2 = eui.Binding.bindHandler(this,["_mp"],this.onMpChange,this);
	}
	private onLevelChange():void{
		if(this.nameLab){
			this.nameLab.text = "玩家 Lv."+GameApp.level;
		}
		
	}
	/**人物升级 */
	public upgrade():void{
		this.soldierAttr.atk += ((this.soldierAttr.atk*0.2)>>0);
		this.soldierAttr.level = GameApp.level;
		this.soldierAttr.hp += ((this.soldierAttr.hp*0.2)>>0);
		if(this.general){
			let upmc:MovieClip = new MovieClip();
			this.addChild(upmc);
			upmc.playFile(`${EFFECT}upgrade`,1,null,true);
		}
	}
	// private timeout;
	// public refreshEquip(cardvo:CardVo):void{
	// 	let obj:any = this.qualityRes[cardvo.quality -1];
	// 	this._res = obj.body;
	// 	this._weaponRes = obj.weapon;
	// 	if(this.timeout){
	// 		clearTimeout(this.timeout);
	// 	}
	// 	let buffmc:MovieClip = new MovieClip();
	// 	this.addChild(buffmc);
	// 	// buffmc.x = this.width>>1;
	// 	// buffmc.y = this.height;
	// 	buffmc.playFile(`${EFFECT}equip`,1,null,true);
	// 	let self= this;
	// 	this.timeout = setTimeout(function() {
	// 		clearTimeout(self.timeout);
	// 		self._res = self.initRes.body;
	// 		self._weaponRes = self.initRes.weapon;
	// 		UserTips.inst().showTips("卡牌持续时间结束");
	// 	}, cardvo.buffTime);
	// }
	public addHp(value:number):void{
		let hp = this._hp;
		hp += value;
		if(hp >= this._thp){
			hp = this._thp;
		}
		this._hp = hp;
		let buffmc:MovieClip = new MovieClip();
		this.addChild(buffmc);
		// buffmc.x = this.x;
		// buffmc.y = this.y;
		buffmc.playFile(`${EFFECT}upstate`,3,null,true);
	}
	private onHpChange(value:number):void{
		if(!isNaN(value)){
			let percent:number = value/this._thp;
			// if(percent <= 0.3){
			// 	MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
			// }else{
			// 	MessageManager.inst().dispatch(CustomEvt.DMGHIDE);
			// }
			if(this._barimg){
				this._barimg.width = percent*86
			}
		}
	}
	// private timeInterVal;
	// private onMpChange(value:number):void{
	// 	if(!isNaN(value)){
	// 		if(this._mp < this._tmp){
	// 			if(!this.timeInterVal){
	// 				let self = this
	// 				this.timeInterVal = setInterval(()=>{
	// 					self.changeRoleMp(-10);
	// 				},1000)
	// 			}
	// 		}else{
	// 			clearInterval(this.timeInterVal)
	// 			this.timeInterVal = null;
	// 		}
	// 		let percent:number = value/this._tmp;
	// 		// MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
	// 		if(this._mpbarimg){
	// 			this._mpbarimg.width = percent*90;
	// 		}
	// 	}
	// }
	/**人物等级提升刷新属性 */
	public refreshAttr():void{
		// this.soldierAttr.hp += 1500;
		// this._hp = this._thp = this.soldierAttr.hp;
		// this.soldierAttr.level = GameApp.level;
		// this.soldierAttr.atk = 500*GameApp.level + ((Math.random()*100)>>0)
	}
	public frameRate:number = 0;
	// private isActive:boolean = false;
	// public changeWeaponBuff(type:number,isActive:boolean):void{
	// 	this.isActive = isActive;
	// 	if(type == 0){
	// 		//提高了暴击伤害;
	// 		if(isActive){
	// 			this.buffIcon.visible = true;
	// 			UserTips.inst().showTips(`激活武器暴击刀-<font color=0x00ff00>暴击伤害提高</font>`,null,3000);
	// 		}else{
	// 			this._crit = 0.4;
	// 			UserTips.inst().showTips("当前武器未解锁")
	// 			this.buffIcon.visible = false;
	// 			this.buffEffect.visible = false;
	// 		}
	// 		this.buffAttack = 0;
	// 		this.frameRate = 0;
	// 	}else if(type == 1){
	// 		//攻击伤害提高
	// 		this._crit = 0.4;
	// 		this.frameRate = 0;
	// 		if(isActive){
	// 			this.buffIcon.visible = true;
	// 			UserTips.inst().showTips(`激活武器破甲箭-<font color=0x00ff00>人物攻击力提高</font>`,null,3000);
	// 		}else{
	// 			this.buffAttack = 0;
	// 			UserTips.inst().showTips("当前武器未解锁")
	// 			this.buffIcon.visible = false;
	// 			this.buffEffect.visible = false;
	// 		}
	// 	}else{
	// 		//攻击速度提高
	// 		this._crit = 0.4;
	// 		this.buffAttack = 0;
	// 		if(isActive){
	// 			UserTips.inst().showTips(`激活武器闪电枪-<font color=0x00ff00>人物攻速提高</font>`,null,3000);
	// 			this.buffIcon.visible = true;
	// 		}else{
	// 			this.frameRate = null;
	// 			UserTips.inst().showTips("当前武器未解锁")
	// 			this.buffIcon.visible = false;
	// 			this.buffEffect.visible = false;
	// 		}
	// 	}
	// 	this.buffIcon.source = "effect_"+type+"_png";
	// }
	public changeRoleAction(state:string = "",tarPoint:egret.Point = null):void{
		let dic:number = this.dic;
		if(tarPoint){
			let angle:number = Math.atan2(tarPoint.y - this.y,tarPoint.x-this.x)*180/Math.PI;
			this.calculEntityDic(angle);
		}else{
			if(this.atkTar && !this.atkTar.isDead){
				let angle:number = Math.atan2(this.atkTar.y - this.y,this.atkTar.x-this.x)*180/Math.PI;
				this.calculEntityDic(angle);
			}
		}
		if(this.scaleX == -1){
			this.progressGroup.scaleX = -0.7;
		}else{
			this.progressGroup.scaleX = 0.7;
		}
		// if(this._atkTar && !this._atkTar.isDead){
		// 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
		// 	this.calculEntityDic(angle);
		// }
		if(!!state){
			if(this.curState == state && dic == this.dic){
				return;
			}
			this.curState = state;
		}
		// let bodyres:string = `${BODY}${this._res}_0_${this.dic}${this.curState}`
		// let weapon:string = `${WEAPON}${this._weaponRes}_${GameApp.sex}_${this.dic}${this.curState}`
		if(this._mc){
			let frameRate:number = (this.curState == ActionState.ATTACK?this.frameRate?this.frameRate:null:15)
			this._mc.playSlice(this._res,this._dic.toString(),this.curState,-1,frameRate);
			// this._mc.playFile(bodyres,-1,null,null,"",null,frameRate);
			// this._weaponMc.playFile(weapon,-1,null,null,null,null,frameRate);
		}
		
	}
	private critp:number = 0;
	/**更新装备属性 */
	public updateEquip():void{
		let equips:number[] = GameApp.equipIds;
		for(let i:number = 0;i<equips.length;i++){
			switch(equips[i]){
				case 1001:
					this.buffHp = 1;
					UserTips.inst().showTips(`已激活吸血效果+<font color=0x00ff00>[30%吸血]</font>`);
					let mc1:MovieClip = new MovieClip();
					this.addChild(mc1);
					mc1.scaleX = mc1.scaleY = 0.5;
					mc1.playFile(`${EFFECT}buff_1001`,-1);
					mc1.x = this.progressGroup.x - 60;
					mc1.y = this.progressGroup.y + 50;
					break;
				case 1002:
					this.buffDef = 0.5;
					UserTips.inst().showTips(`防御增加<font color=0x00ff00>[50%]</font>`);
					let mc2:MovieClip = new MovieClip();
					this.addChild(mc2);
					mc2.scaleX = mc2.scaleY = 0.8;
					mc2.playFile(`${EFFECT}buff_1002`,-1);
					// mc2.x = this.progressGroup.x - 60;
					mc2.y = 20;
					break;
				case 1003:
					this.soldierAttr.atk += 100;
					UserTips.inst().showTips(`攻击增加<font color=0x00ff00>[100]</font>`)
					let mc3:MovieClip = new MovieClip();
					this.addChild(mc3);
					// mc3.scaleX = mc3.scaleY = 0.8;
					mc3.playFile(`${EFFECT}buff_1003`,-1);
					mc3.y = 100;
					break;
				case 1004:	
					this.critp = 1;
					let mc4:MovieClip = new MovieClip();
					this.addChild(mc4);
					mc4.scaleX = mc4.scaleY = 0.8;
					mc4.playFile(`${EFFECT}buff_1004`,-1);
					mc4.y = 0;
					UserTips.inst().showTips(`暴击率增加W<font color=0x00ff00>[100%]</font>`)
					this.swapChildren(this._mc,mc4)
					break;
			}	
		}
	}
	//克制攻击力
	private restriceAtk:number = 0;
	//连斩数量
	private slashNum:number = 0;
	//连斩倒计时
	private countTimeDown:any;
	/**执行攻击动作 */
	public execAtkAction():void{
		// if(GameApp.battleState == false){return}
		if((this.isInAtkDis() || this.isInAtk) && !this.atkState){
			this.moveEnd = false;
			if(this.curState != ActionState.ATTACK){
				let time:number = 300;
				if(this.frameRate){
					time = 100;
				}
				this.curState = ActionState.ATTACK;
				egret.Tween.removeTweens(this);
				// if(this._atkTar && !this._atkTar.isDead){
				// 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
				// 	this.calculEntityDic(angle);
				// }
				// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
				// this._mc.playFile(this._res,1,null,false,this._dic.toString());
				this.changeRoleAction();
				this.atkState = true;
				let self = this;
				let bullet:MovieClip = new MovieClip();
				LayerManager.MAP_LAYER.addChild(bullet);
				bullet.bounce = true;
				bullet.scaleX = bullet.scaleY = 0.5;
				bullet.playFile(`${EFFECT}bullet`,-1);
				bullet.x = self.x;
				bullet.y = self.y - 20;

				let rotation:number = Math.atan2(self._atkTar.y - self.y,self._atkTar.x - self.x)*180/Math.PI;
				bullet.rotation = rotation + 90;

				egret.Tween.get(bullet).to({x:self._atkTar.x,y:self._atkTar.y},300).call(()=>{
					egret.Tween.removeTweens(bullet);
					if(bullet && bullet.parent){
						bullet.parent.removeChild(bullet);
					}
				},this)
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					if(self && self._mc){
						self.curState = ActionState.STAND;
						// self._res = `${EFFECT}${self.soldierAttr.model}_${self.curState}`;
						// self._mc.playFile(self._res,-1,null,false,self._dic.toString());
						self.changeRoleAction();
					}
					if(self && self._atkTar){
						

						let index:number = (Math.random()*15 + 5)>>0;
						let direct:number = ((Math.random()*100)>>0) >= 50?-1:1;
						let atk:number = self.soldierAttr.atk -  direct*index;
						// if(GameApp.curBattleLevel == 1 && self.camp == -1){
						// 	atk = 30;
						// }
						// if(self.soldierAttr.atktype == 2){
						// 	let effectmc:MovieClip = new MovieClip();
						// 	self.parent.addChild(effectmc);
						// 	effectmc.playFile(`${EFFECT}skill/boom`,1,null,true);
						// 	effectmc.x = self._atkTar.x;
						// 	effectmc.y = self._atkTar.y;
						// }
						
						let value:number = null;
						if(self.critp){
							value = ((atk*self._crit)>>0);
						}else{
							let critIndex:number = (Math.random()*100)>>0;
							if(critIndex >= 80){
								value = ((atk*self._crit)>>0);
							}
						}
						let damage:number = value?atk + value:atk;
						self._atkTar.reduceHp(atk+self.buffAttack,value);

						if(self.general && self._atkTar.isDead){
							if(self.countTimeDown){
								clearTimeout(self.countTimeDown);
								self.countTimeDown = null;
							}
							self.slashNum += 1;
							MessageManager.inst().dispatch("showSlash",{num:self.slashNum});
							if(!self.countTimeDown){
								self.countTimeDown = setTimeout(function() {
									clearTimeout(self.countTimeDown);
									self.countTimeDown = null;
									self.slashNum = 0;
									MessageManager.inst().dispatch("hideSlash");
								}, 3000);
							}
						}
						if(self.buffHp){
							
							self._hp += ((damage*0.3)>>0);
							if(self._hp >= self._thp){
								self._hp = self._thp;
							}
							let hpfont:eui.BitmapLabel = new eui.BitmapLabel();
							hpfont.font = "num_r0_fnt";
							hpfont.name = "item_"+Math.random();
							if(self.parent){
								self.parent.addChildAt(hpfont,self.parent.numChildren - 1);
							}
							hpfont.text = "+"+((damage*0.3)>>0);
							hpfont.x = self.x;
							hpfont.y = self.y + -100 + ((Math.random()*50)>>0);

							egret.Tween.get(hpfont).to({y:self.y-150},600+((Math.random()*400)>>0),egret.Ease.circIn).call(()=>{
								egret.Tween.removeTweens(hpfont);
								if(hpfont && hpfont.parent){
									hpfont.parent.removeChild(hpfont);
								}
							},self)
						}
						// let skillEff:MovieClip = new MovieClip();
						// self._atkTar.addChild(skillEff);
						// skillEff.x = 0;
						// skillEff.y = -30;
						
						// skillEff.playFile(`${EFFECT}skill404`,1,null,true)
						
						
					}
					let timeout2 = setTimeout(function() {
						//
						clearTimeout(timeout2);
						self.atkState = false;
					}, time);	
				}, 300);
			}
		}
	}
	private buffMc:MovieClip;
	public addSkillEff(skillId,time = -1):void{
		this.buffMc = new MovieClip();
		this.addChild(this.buffMc);
		this.buffMc.playFile(`${EFFECT}eff_${skillId}`,time);
	}
	public hideSkillEff(skillid):void{
		if(!!this.buffMc && this.buffMc.parent){
			this.buffMc.parent.removeChild(this.buffMc);
		}
	}
	public summonTime(time:number,cb?:(num)=>void,arg?:any):void{
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(time);
			if(cb && arg){cb.call(arg,self.summonCount)}
			self._isDead = true;
			self.dispose();
		}, time);
	}
	public changeRoleMp(value:number):void{
		this.changeMp(value);
	}
	private createArrow():void{
		let img:eui.Image = new eui.Image();
		img.source = "arrow_png";
		this.parent.addChild(img);
		img.anchorOffsetX = 20;
		img.scaleX = -this.camp;
		let angle:number = Math.atan2(this.atkTar.y - this.y,this.atkTar.x - this.x)*180/Math.PI;
		img.rotation = angle;
		img.x = this.x;
		img.y = this.y - (this.h>>1);
		egret.Tween.get(img).to({x:this._atkTar.x,y:this._atkTar.y},400).call(()=>{
			egret.Tween.removeTweens(img);
			img.parent.removeChild(img);
		},this)
	}
	/**执行前往目标附近位置 */
	public execMoveAction(xy?:XY,cb?:()=>void,thisarg?:any,isquick:boolean = true,randomXY:XY = {x:0,y:0}):void{
		if(xy){
			if(!this.moveEnd){
				return;
			}
			this.moveEnd = false;
			// let angle:number = Math.atan2(xy.y - this.y,xy.x-this.x)*180/Math.PI;
			// this.calculEntityDic(angle)
			this.curState = ActionState.RUN;
			// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
			// this._mc.playFile(this._res,-1,null,false,this._dic.toString());
			
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(xy.x,xy.y);
			this.changeRoleAction(null,endP);
			let distance:number = egret.Point.distance(startP,endP);
			let time:number = distance/this.soldierAttr.spd;
			// let useTime:number = time*1000;
			// if(!this.general && isquick){
			// 	useTime = time*500;
			// }

			egret.Tween.get(this).to({x:xy.x + randomXY.x,y:xy.y+randomXY.y},400).call(()=>{
				egret.Tween.removeTweens(this);
				this.moveEnd = true;
				if(this._mc){
					// this.curState = ActionState.STAND;
					// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
					// this._mc.playFile(this._res,-1,null,false,this._dic.toString());
					// this.changeRoleAction();
					if(cb && thisarg){cb.call(thisarg);}
				}
			},this)
		}else{
			if(this && this._atkTar && !this._atkTar.isDead){
				// let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
				// this.calculEntityDic(angle);
				this.moveEnd = false;
				if(this.curState != ActionState.RUN){
					this.curState = ActionState.RUN;
					// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
					// this._mc.playFile(this._res,-1,null,false,this._dic.toString());
					this.changeRoleAction();
				}
				let startP:egret.Point = new egret.Point(this.x,this.y);
				let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
				let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
				egret.Tween.removeTweens(this);
				let time:number = distance/this.soldierAttr.spd;
				egret.Tween.get(this,{loop:false,onChange:()=>{
					if(this.isInAtkDis()){
						this.moveEnd = true;
						egret.Tween.removeTweens(this)
					}
				},onChangeObj:this}).to({x:this._atkTar.x,y:this._atkTar.y},time*1000).call(()=>{
					this.moveEnd = true;
					egret.Tween.removeTweens(this);
				})
			}
		}
		
	}
	public findPath(ex,ey,last:boolean = false):void{
		if(!this.route.length){
			// this.moveEnd = true;
			let _path = MapView.inst().findPath(this.x,this.y,ex,ey);
			if(_path){
				_path.shift();
				this.route = _path;
			}
		}
		if(this.route && this.route.length && this.moveEnd){
			//去掉第一个格子 。这个格子与人物在一个格子
			let node:any = this.route.shift();
			let xy:XY = GameMap.grid2Point(node.x,node.y);
			let randomX = 0;
			let randomY = 0;
			if(last){
				randomX = ((Math.random()*60)>>0);
			    randomY = ((Math.random()*60)>>0);
			}
			this.execMoveAction(xy,null,this,null,{x:randomX,y:randomY});
		}
	}
	// /**执行站立状态 */
	public execStandAction():void{
		this.moveEnd = true;
		this.curState = ActionState.STAND;
		this.changeRoleAction();
	}
	
	/**获取到目标位置的距离 是否达到攻击距离 */
	public isInAtkDis():boolean{
		// if(!this._atkTar){
		// 	return this.isInAtk;
		// }
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
			return  Math.abs(distance) <= this.soldierAttr.atkDis;
		}
		
	}
	/**锁定目标 */
	public lookAt(_atkTar:MonsterEntity | BuildingEntity,isNew:boolean = false):void{
		// this.addAttrRestrict();
		if(isNew){
			this._atkTar = _atkTar;
			return;
		}
		if(!this._atkTar ||(this._atkTar && this._atkTar.isDead)){
			//重新锁定目标
			this._atkTar = _atkTar;
		}else{
			return;
		}
	}
	/**解除锁定 */
	public unLookAt():void{
		this._atkTar = null;
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public get isnoMp():boolean{
		return this._isnoMp;
	}
	public dispose():void{
		// ObjectPool.push(this);
		
		// if(this.timeInterVal){
		// 	clearInterval(this.timeInterVal)
		// }
		this.curState = ActionState.DEAD;
		this.changeRoleAction();
		// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
		// this._mc.playFile(this._res,1,null,true,this._dic.toString());
		if(this._watcher){
			this._watcher.unwatch();
		}
		if(this._watcher2){
			this._watcher2.unwatch();
		}
		let self = this;
		egret.Tween.removeTweens(this);
		MapView.inst().refreshRoleItem(this);
		if(this.general){
			MapView.inst().destoryMainRole();
		}
		let timeout = setTimeout(function() {
			clearTimeout(timeout)
			self._atkTar = null;
			if(self && self._mc){
				self.removeChild(self._mc);
				self._mc = null;
			}
			if(self && self.parent){
				self.parent.removeChild(self);
			}
		}, 300);
	}
	// private addAttrRestrict():void{
	// 	if(!this._atkTar){return}
	// 	if(this._typeId == SoldierType.ARROW){
	// 		//当前我是弓箭手 克制盾 被克制骑兵
	// 		if(this._atkTar._typeId == SoldierType.QI){
	// 			this.restriceAtk = 50;
	// 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
	// 			this.restriceAtk = -50;
	// 		}else{
	// 			this.restriceAtk = 0;
	// 		}
	// 	}else if(this._typeId == SoldierType.QI){
	// 		//当前我是骑兵
	// 		if(this._atkTar._typeId == SoldierType.ARROW){
	// 			this.restriceAtk = -50;
	// 		}else if(this._atkTar._typeId == SoldierType.SHIELD){
	// 			this.restriceAtk = 50;
	// 		}else{
	// 			this.restriceAtk = 0;
	// 		}
	// 	}else if(this._typeId == SoldierType.SHIELD){
	// 		if(this._atkTar._typeId == SoldierType.ARROW){
	// 			this.restriceAtk = 50;
	// 		}else if(this._atkTar._typeId == SoldierType.QI){
	// 			this.restriceAtk = -50;
	// 		}else{
	// 			this.restriceAtk = 0;
	// 		}
	// 	}
	// }
	public set hp(value:number){
		this._hp = value;
	}
	public set thp(value:number){
		this._thp = value;
	}
	public get atkTar():MonsterEntity|BuildingEntity{
		return this._atkTar;
	}
	// public set buffDefense(value:number){
	// 	this.buffDef = value;
	// }
}
