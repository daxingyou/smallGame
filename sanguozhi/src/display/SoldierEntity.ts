class SoldierEntity extends BaseEntity{
	private _atkTar:SoldierEntity;
	public _mc:MovieClip;
	public _weaponMc:MovieClip;
	private _res:string;
	private _weaponRes:string;
	private _direc:number;
	//移动速度 s为单位 。 v*t = d 
	private curState:string = ActionState.STAND;
	private _barimg:eui.Image;
	private _mpbarimg:eui.Image;
	private _watcher:eui.Watcher;
	private _watcher2:eui.Watcher;
	// private progressGroup:eui.Group;
	public ObjectPoolKey:string = "SoldierEntity";

	public soldierAttr:RoleVo;
	/**根据index获取对应的攻击组 */
	public parentGroupIndex:number;
	public general:boolean = false;
	public generalId:number;
	public w:number;
	public h:number;
	private _typeId:number;

	private soldierCampImg:eui.Image;

	public camp:number = 1;

	public atkState:boolean = false;

	// public isInAtk:boolean = false;
	// private qualityRes:any[] = [{body:"body002",weapon:"weapon104"},{body:"body102",weapon:"weapon105"},{body:"body307",weapon:"weapon106"},{body:"body308",weapon:"weapon104"}];
	// private initRes:any = {body:"body001",weapon:"weapon100"}
	// private buffIcon:eui.Image;
	// private buffEffect:MovieClip;
	public targetDis:number;

	public buffState:boolean = false;
	public constructor() {
		super();
	}
	protected initialize():void{

	}
	public setSoldierData(camp:number,res:string,scale:number = 1):void{
		this._camp = camp;
		this.camp = camp;
		this._direc = this._camp == 1?1:-1;
		this._res = res

		this._scale = scale;
		this.scaleX = this.scaleY = scale;
		this.scaleX = this.scaleX*camp;
		// let bodyres:string = `${BODY}${res}_${this.dic}${this.curState}`
		// this._weaponRes = weaponRes;
		// let weapon:string = `${WEAPON}${weaponRes}_${this.dic}${this.curState}`

		this._mc = new MovieClip();
		this.addChild(this._mc);
		// this._mc.playFile(bodyres,-1);

		this._hp = this._thp = this.soldierAttr.hp;
		// this._mp = this._tmp = this.soldierAttr.mp;

		this._weaponMc = new MovieClip();
		this.addChild(this._weaponMc);
		// this._weaponMc.playFile(weapon,-1)
		

		// this.progressGroup = new eui.Group();
		// this.progressGroup.width = 80;
		// this.addChild(this.progressGroup);
		// this.progressGroup.anchorOffsetX = 40;
		// // this.progressGroup.x = -40;
		// this.progressGroup.y = -110;

		// let levelLab:eui.Label = new eui.Label();
		// this.progressGroup.addChild(levelLab);
		// levelLab.fontFamily = "yt";
		// levelLab.size = 20;
		// levelLab.text = this.soldierAttr.level .toString()+"级";
		// levelLab.horizontalCenter = 0;
		// levelLab.top = -23;
		// let hpbarimg:eui.Image = new eui.Image();
		// hpbarimg.source = "entity_hp_bg_png";
		// this.progressGroup.addChild(hpbarimg);
		// hpbarimg.y = -15;

		// let hpimg:eui.Image = new eui.Image();
		// hpimg.source = "entity_hp_bar_png";
		// this.progressGroup.addChild(hpimg)
		// this._barimg = hpimg;
		// hpimg.y = -15;

		// let mpbarimg:eui.Image = new eui.Image();
		// mpbarimg.source = "entity_hp_bg_png";
		// this.progressGroup.addChild(mpbarimg);
		// mpbarimg.y = -7;

		// let mpimg:eui.Image = new eui.Image();
		// mpimg.source = "entity_mp_bar_png";
		// this.progressGroup.addChild(mpimg)
		// this._mpbarimg = mpimg;
		// mpimg.y = -7;

		// let nameLab:eui.Label = new eui.Label;
		// nameLab.text = GameApp.roleName;
		// this.progressGroup.addChild(nameLab);
		// nameLab.y = -40;
		// nameLab.horizontalCenter = 0;
		// nameLab.size = 20;
		// nameLab.stroke = 1;
		// nameLab.strokeColor = 0x000000;
		// nameLab.fontFamily = "ht";

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
		// this._watcher2 = eui.Binding.bindHandler(this,["_mp"],this.onMpChange,this);
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
		// let buffmc:MovieClip = new MovieClip();
		// this.addChild(buffmc);
		// // buffmc.x = this.x;
		// // buffmc.y = this.y;
		// buffmc.playFile(`${EFFECT}upstate`,3,null,true);
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
				this._barimg.width = percent*90
			}
		}
	}
	public showAtkBuff():void{
		let atkEff:MovieClip = new MovieClip();
		this.addChild(atkEff);
		if(this.soldierAttr.type == SoldierType.SOLDIER_GONG){
			atkEff.playFile(`${EFFECT}buff_gong`,-1);
		}else{
			atkEff.playFile(`${EFFECT}buff_atk`,-1);
		}
		
		atkEff.x += 10;
		atkEff.y -= (this.height>>1);
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			if(atkEff && atkEff.parent){
				atkEff.parent.removeChild(atkEff);
			}
		}, 800);
	}
	public showDefBuff(num:number):void{
		let img:eui.Image = new eui.Image();
		img.source = "buff_def_png";
		this.addChild(img);
		img.anchorOffsetX = img.width>>1;
		img.anchorOffsetY = img.height;

		this.buffDef = num;

		let rect:eui.Rect = new eui.Rect();
		rect.fillColor = 0x000000;
		rect.anchorOffsetX = img.width>>1;
		rect.anchorOffsetY = img.height;
		rect.width = 0;
		rect.height = 90;
		this.addChild(rect);
		img.mask = rect;
		img.scaleX = img.scaleY = 0.5;
		rect.scaleX = rect.scaleY = 0.5;

		egret.Tween.get(rect).to({width:80},200).wait(500).call(()=>{
			egret.Tween.removeTweens(rect);
			if(rect && rect.parent){
				rect.parent.removeChild(rect);
			}
			if(img && img.parent){
				img.parent.removeChild(img);
			}
		},this)
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
		this.soldierAttr.hp += 1500;
		this._hp = this._thp = this.soldierAttr.hp;
		// this.soldierAttr.level = GameApp.level;
		// this.soldierAttr.atk = 500*GameApp.level + ((Math.random()*100)>>0)
	}
	// private frameRate:number = 0;
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
	public changeRoleAction(state:string = "",playCount:number = -1):void{
		// let dic:number = this.dic;
		// if(tarPoint){
		// 	let angle:number = Math.atan2(tarPoint.y - this.y,tarPoint.x-this.x)*180/Math.PI;
		// 	this.calculEntityDic(angle);
		// }else{
		// 	if(this.atkTar && !this.atkTar.isDead){
		// 		let angle:number = Math.atan2(this.atkTar.y - this.y,this.atkTar.x-this.x)*180/Math.PI;
		// 		this.calculEntityDic(angle);
		// 	}
		// }
		// if(this.scaleX == -1){
		// 	this.progressGroup.scaleX = -1;
		// }else{
		// 	this.progressGroup.scaleX = 1;
		// }
		// if(this._atkTar && !this._atkTar.isDead){
		// 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
		// 	this.calculEntityDic(angle);
		// }
		if(!!state){
			if(this.curState == state){
				return;
			}
			this.curState = state;
		}
		// let bodyres:string = `${BODY}${this._res}_${GameApp.sex}_${this.dic}${this.curState}`
		// let weapon:string = `${WEAPON}${this._weaponRes}_${GameApp.sex}_${this.dic}${this.curState}`
		if(this._mc){
			// let frameRate:number = (this.curState == ActionState.ATTACK?this.frameRate?this.frameRate:null:15)
			this._mc.playFile(this._res+"_"+this.curState,-1,null,null);
			if(this.curState == ActionState.RUN){
				this.addCloud();
			}else{
				this.hideCloud();
			}
			// this._weaponMc.playFile(weapon,-1,null,null,null,null,frameRate);
		}
		
	}
	/**显示烟雾 */
	private yanMc:MovieClip;
	public addCloud():void{
		if(this.yanMc){return}
		this.yanMc = new MovieClip();
		this.yanMc.scaleX = this.yanMc.scaleY = 0.04;
		if(this.scaleX < 0){this.yanMc.scaleX = 0.04*this.camp}else{this.yanMc.scaleX = -0.04*this.camp}
		this.yanMc.playFile(`${EFFECT}yan`,-1);
		this.addChild(this.yanMc);
		if(this._mc){
			this.swapChildren(this.yanMc,this._mc)
		}
		// if(this.camp == 1){
		// 	this.yanMc.y += 10;
		// }
	}
	/**隐藏烟雾 */
	private hideCloud():void{
		if(this.yanMc && this.yanMc.parent){
			this.yanMc.parent.removeChild(this.yanMc);
			this.yanMc = null;
		}
	}
	/**反戈一击buff */
	private buff_100011:boolean = false;
	/**激活buff */
	private activeBuff(buffId):void{
		let cardVo:CardAttrVo = GlobalFun.getCardDataFromId(buffId);
		let mc:MovieClip = new MovieClip();
		this.addChild(mc);
		let self = this;
		switch(buffId){
			case 100011:
				this.buff_100011 = true;
				this.buffState = true;
				mc.playFile(`${EFFECT}${cardVo.buffSkillRes}`,1,null,true);
				let timeout = setTimeout(function() {
					clearTimeout(timeout)
					if(self){
						self.buffState = false;
						self.buff_100011 = false;
					}
				}, 10000);
				break;
			default:
				this.buff_100011 = true;
				this.buffState = true;
				mc.playFile(`${EFFECT}${cardVo.buffSkillRes}`,1,null,true);
				let self = this;
				let timeout2 = setTimeout(function() {
					clearTimeout(timeout2);
					if(self){
						self.buffState = false;
						self.buff_100011 = false;
					}
				}, 10000);
				break;
		}
	}
	//克制攻击力
	private restriceAtk:number = 0;
	/**执行攻击动作 */
	public execAtkAction(generalId?:number,cb?:()=>void,arg?:any):void{
		if(this.yunMc){
			if(cb && arg){cb.call(arg);}
			return;
		}
		let self = this;
		if(generalId){
			this.activeBuff(generalId);
			if(this.general){
				this.execOnceAtkAction();
				return;
			}
		}
		if(this.soldierAttr.type != SoldierType.SOLDIER_GONG){
			//当前不是弓兵
			this.execMoveAction(null,()=>{
				SoundManager.inst().playEffect(`${MUSIC}atk.mp3`)
				if(self.curState != ActionState.ATTACK){
					self.curState = ActionState.ATTACK;
					self.changeRoleAction();
				}
				if(self.general){
					let mc:MovieClip = new MovieClip();
					self.addChild(mc);
					mc.playFile(`${EFFECT}general_atk`,1,null,true);
				}
				
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					//当前攻击执行完毕
					self.execMoveAction({x:self.x,y:self.y},()=>{
						if(self.generalId == 100011){
							self.buffState = false;
						}
						self.scaleX = self.scaleX*-1;
						self.curState = ActionState.STAND;
						self.changeRoleAction();
					},self)
				}, 300);
			},this);
		}else{
			if(this.curState != ActionState.ATTACK){
				this.curState = ActionState.ATTACK;
				this.changeRoleAction();
			}
			//需要远程攻击
			this.createArrow();
			let self = this;
			let timeout2 = setTimeout(function() {
				clearTimeout(timeout2);
				self.createArrow();
			}, 150);
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				//当前攻击执行完毕
				self.curState = ActionState.STAND;
				self.changeRoleAction();
			}, 300);
		}
	}
	private yunMc:MovieClip;
	private yunTime;
	public buffWait:boolean = false;
	public showWaitState():void{
		let self = this;
		if(this.yunMc){
			if(this.yunTime){
				clearTimeout(this.yunTime);
				this.buffWait = true;
				this.yunTime = setTimeout(function() {
					clearTimeout(self.yunTime);
					self.hideWaitState();
					self.buffWait = false;
				}, 6000);
			}
			return;
		}
		this.yunMc = new MovieClip();
		this.addChild(this.yunMc);
		this.yunMc.playFile(`${EFFECT}buff3`,-1);
		this.buffWait = true;
		this.yunTime = setTimeout(function() {
			clearTimeout(self.yunTime);
			self.hideWaitState();
			self.buffWait = false;
		}, 6000);
	}
	public hideWaitState():void{
		if(this.yunMc && this.yunMc.parent){
			this.yunMc.parent.removeChild(this.yunMc);
			this.yunMc = null;
		}
	}
	private posionMc:MovieClip;
	private posionTime
	/**显示中毒buff */
	public showPosion():void{
		let self = this;
		if(this.posionMc){
			if(this.posionTime){
				clearTimeout(this.posionTime);
				this.posionTime = setTimeout(function() {
					clearTimeout(self.posionTime);
					self.hidePostion();
				}, 5000);
			}
			return;
		}
		this.posionMc = new MovieClip();
		this.addChild(this.posionMc);
		this.posionMc.scaleX = this.posionMc.scaleY = 0.5;
		this.posionMc.playFile(`${EFFECT}buff4`,-1);
		this.posionTime = setTimeout(function() {
			clearTimeout(self.posionTime);
			self.posionTime = null;
			self.hidePostion();
		}, 5000);
	}
	private hidePostion():void{
		if(this.posionMc && this.posionMc.parent){
			this.posionMc.parent.removeChild(this.posionMc);
			this.posionMc = null;
		}
	}
	/**执行受击动作 */
	public execAtkedAction(cb?:()=>void,arg?:any):void{
		if(this.buff_100011){
			this.execOnceAtkAction();
			if(cb && arg){
				cb.call(arg);
			}
		}
		egret.Tween.get(this).to({x:this.x - 20*this.camp},200).to({x:this.x},200).call(()=>{
			egret.Tween.removeTweens(this);
		},this)
		let hurtMc:MovieClip = new MovieClip();
		hurtMc.playFile(`${EFFECT}hurt`,1,null,true);
		this.addChild(hurtMc);
		
	}
	public showHurtMc():void{
		let hurtMc:MovieClip = new MovieClip();
		hurtMc.playFile(`${EFFECT}hurt`,1,null,true);
		this.addChild(hurtMc);
	}
	/**执行一次攻击动作 */
	private execOnceAtkAction():void{
		let self = this;
		if(this.curState != ActionState.ATTACK){
			this.curState = ActionState.ATTACK;
			this.changeRoleAction();
		}
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			self.curState = ActionState.STAND;
			self.changeRoleAction();
		}, 300);
	}
	public changeRoleMp(value:number):void{
		this.changeMp(value);
	}
	/**创建弓箭 */
	private createArrow():void{
		let img:MovieClip = new MovieClip();
		img.playFile(`${EFFECT}bullet`,-1);
		img.scaleX = img.scaleY = 0.5;
		this.parent.addChild(img);
		img.anchorOffsetX = 20;
		img.scaleX = this.camp*img.scaleX;
		// let angle:number = Math.atan2(this.y,this.atkTar.x + this.targetDis*this.camp)*180/Math.PI;
		// img.rotation = angle;
		img.x = this.x;
		img.y = this.y - (this.h>>1);
		egret.Tween.get(img).to({x:this.targetDis,y:this.y},300).call(()=>{
			egret.Tween.removeTweens(img);
			img.parent.removeChild(img);
		},this)
	}
	private preventX:number = 0;
	/**执行前往目标附近位置 */
	public execMoveAction(xy?:XY,cb?:()=>void,thisarg?:any):void{
		if(xy){
			this.scaleX = this.scaleX*-1;
			if(this.curState != ActionState.RUN){
				this.curState = ActionState.RUN;
				// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
				// this._mc.playFile(this._res,-1,null,false,this._dic.toString());
				this.changeRoleAction();
				this.addCloud();
				if(this.yanMc){
					this.yanMc.scaleX *=-1;
				}
			}
			egret.Tween.get(this).to({x:this.preventX},500).call(()=>{
				this.preventX = null;
				if(this.yanMc){
					this.yanMc.scaleX *=-1;
				}
				egret.Tween.removeTweens(this);
				this.hideCloud();
				if(cb && thisarg){cb.call(thisarg)}
			},this)
		}else{
			if(this && this.targetDis){
				// let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
				// this.calculEntityDic(angle);
				if(this.curState != ActionState.RUN){
					this.curState = ActionState.RUN;
					// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
					// this._mc.playFile(this._res,-1,null,false,this._dic.toString());
					this.changeRoleAction();
					this.addCloud();
				}
				this.preventX = this.x;
				egret.Tween.get(this).to({x:this.targetDis},500).call(()=>{
					egret.Tween.removeTweens(this);
					this.hideCloud();
					if(cb && thisarg){cb.call(thisarg)}
				})
			}
		}
		
		
	}
	// /**执行站立状态 */
	// public execStandAction():void{
	// 	this.atkState = false;
	// 	this.curState = ActionState.STAND;
	// 	this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
	// 	this._mc.playFile(this._res,-1,null,false,this._dic.toString());
	// }
	
	/**获取到目标位置的距离 是否达到攻击距离 */
	// public isInAtkDis():boolean{
	// 	// if(!this._atkTar){
	// 	// 	return this.isInAtk;
	// 	// }
	// 	if(this && this._atkTar && !this._atkTar.isDead){
	// 		let startP:egret.Point = new egret.Point(this.x,this.y);
	// 		let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
	// 		let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
	// 		return  Math.abs(distance) <= this.soldierAttr.atkDis;
	// 	}
		
	// }
	// /**锁定目标 */
	// public lookAt(_atkTar:MonsterEntity,isNew:boolean = false):void{
	// 	// this.addAttrRestrict();
	// 	if(isNew){
	// 		this._atkTar = _atkTar;
	// 		return;
	// 	}
	// 	if(!this._atkTar ||(this._atkTar && this._atkTar.isDead)){
	// 		//重新锁定目标
	// 		this._atkTar = _atkTar;
	// 		if(this.isActive){
	// 			if(this._atkTar && this._atkTar.type == GameApp.weapon){
	// 				if(GameApp.weapon == 0){
	// 					this._crit = 1;
	// 				}else if(GameApp.weapon == 1){
	// 					this.buffAttack = this.soldierAttr.atk;
	// 				}else{
	// 					this.frameRate = 24;
	// 				}
	// 				this.buffEffect.visible = true;
	// 			}else{
	// 				this._crit = 0.4;
	// 				this.buffAttack =0;
	// 				this.frameRate = null;
	// 				this.buffEffect.visible = false;
	// 			}
	// 		}
			
	// 	}else{
	// 		return;
	// 	}
	// }
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
		// if(this.timeout){
		// 	clearTimeout(this.timeout)
		// }
		SoundManager.inst().playEffect(`${MUSIC}dead.mp3`)
		this.curState = ActionState.DEAD;
		this.changeRoleAction();
		// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
		// this._mc.playFile(this._res,1,null,true,this._dic.toString());
		MessageManager.inst().dispatch("role_dead",{camp:this.camp,tar:this});
		if(this._watcher){
			this._watcher.unwatch();
		}
		if(this._watcher2){
			this._watcher2.unwatch();
		}
		let self = this;
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
		}, 600);
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
	public get hp():number{
		return  this._hp;
	}
	public set thp(value:number){
		this._thp = value;
	}
	public get thp():number{
		return this._thp
	}
	public get atkTar():SoldierEntity{
		return this._atkTar;
	}
	public set buffAtk(value){
		this.buffAttack = value;
	}
	public set buffHP(value){
		this.buffHp = value;
	}
	// public set buffDefense(value:number){
	// 	this.buffDef = value;
	// }
}
