class MonsterEntity extends BaseEntity{
	private _atkTar:SoldierEntity;
	private _mc:MovieClip;
	private progressGroup:eui.Group;
	private _watcher:eui.Watcher;
	private curState:string = ActionState.STAND;
	private bossIds:number[] = [84012,84010,84009,10026,10054,84004,10115,84001];
	private monsterAttr:RoleVo;
	private _res:string;
	public gx:number;
	public gy:number;
	/**攻击状态 */
	public atkState:boolean = false;
	private _barImg:eui.Image;
	public soldierAttr:RoleVo;
	private energyBar:egret.Shape;
	private interval;
	public type:number = 0;
	public moveEnd:boolean = true;
	public route:any[] = [];
	public towerPoint:XY;
	public constructor() {
		super();
	}
	public setSoldierData(camp:number,monsterRes:string = "",attr:RoleVo,time?:number,scale?:number):void{
		this._camp = camp;
		if(scale){
			this._scale = scale;
			this.scaleX = this.scaleY = scale;
		}
		
		// if(monsterRes){
		// 	this._res = `${MONSTER}${monsterRes}`
		// }else{
		// 	//不传的话 进入的就是boss 。随机显示模型
		// 	let index:number = (Math.random()*this.bossIds.length)>>0;
		// 	// GameApp.bossId = this.bossIds[index];
			
		// 	this._res = `${MONSTER}monster${this.bossIds[index]}`
		// }
		this._res = monsterRes;
		// let bodyres:string = `${this._res}_${this.dic}${this.curState}`;
		this._mc = new MovieClip();
		this.addChild(this._mc);
		// this._mc.playFile(bodyres,-1);
		

		this.monsterAttr = attr;
		this.soldierAttr = attr;
		this.monsterAttr.atkDis = this.soldierAttr.atkDis = (attr.atkDis += ((Math.random()*20)>>0));


		this._hp = this._thp = this.monsterAttr.hp;

		this.progressGroup = new eui.Group();
		this.progressGroup.width = 106;
		this.addChild(this.progressGroup);
		this.progressGroup.anchorOffsetX = 53
		// this.progressGroup.x = -40;
		this.progressGroup.y = -70;

		// let barRes:number = 0xfc3434;
		// let barimg:egret.Shape = new egret.Shape();
		// barimg.graphics.beginFill(barRes,1);
		// barimg.graphics.drawRect(0,0,90,8);
		// this._barImg = barimg;
		// barimg.graphics.endFill();
		// this.progressGroup.addChild(barimg);
		if(monsterRes){
			let hpbarimg:eui.Image = new eui.Image();
			hpbarimg.source = "own_hp_bg_png";
			this.progressGroup.addChild(hpbarimg);
			hpbarimg.y = -15;

			let hpimg:eui.Image = new eui.Image();
			hpimg.source = camp == -1?"enemy_hp_bar_png":"own_hp_bar_png";
			this.progressGroup.addChild(hpimg)
			this._barImg = hpimg;
			hpimg.y = -11;
			hpimg.x = 10;
		}
		this.changeMonsterAction();
		if(time){
			this.energyBar = new egret.Shape();
			this.energyBar.graphics.beginFill(0xE5AB2B);
			this.energyBar.graphics.drawRect(0,0,90,5);
			this.energyBar.graphics.endFill();
			this.progressGroup.addChild(this.energyBar);
			this.energyBar.y = this._barImg.y + 10;
			let count:number = 0;
			let self = this;
			this.interval = setInterval(()=>{
				count += 1;
				let percent:number = (time - (count*1000))/time;
				self.energyBar.graphics.clear();
				self.energyBar.graphics.beginFill(0xE5AB2B,1);
				self.energyBar.graphics.drawRect(0,0,percent*90,5);
				self.energyBar.graphics.endFill();
				if(count *1000 >= time){
					clearInterval(self.interval);
					self.reduceHp(self._hp);
				}
			},1000)
		}
		this._watcher = eui.Binding.bindHandler(this,["_hp"],this.onHpChange,this);
	}
	/**更新怪物坐标各自占有值 */
	public refreshPos(gx:number,gy:number):void{
		if(gx != this.gx || gy != this.gy){
			// GameMap.AstarNode.setWalkable(this.gx,this.gy,true);
			this.gx = gx;
			this.gy = gy;
			// GameMap.AstarNode.setWalkable(gx,gy,false);
		}
	}
	// /**执行站立状态 */
	public execStandAction():void{
		this.moveEnd = true;
		this.curState = ActionState.STAND;
		this.changeMonsterAction();
	}
	/**执行前往目标附近位置 */
	public execMoveAction(xy?:XY,cb?:()=>void,thisarg?:any,isquick:boolean = true):void{
		if(xy){
			this.moveEnd = false;
			this.curState = ActionState.RUN;
			this.changeMonsterAction("",new egret.Point(xy.x,xy.y));
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(xy.x,xy.y);
			let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
			let time:number = distance/this.monsterAttr.spd;
			egret.Tween.get(this).to({x:xy.x,y:xy.y},1000).call(()=>{
				egret.Tween.removeTweens(this);
				this.moveEnd = true;
				MessageManager.inst().dispatch("syncMonpos",{x:xy.x,y:xy.y,inst:this.hashCode,oper:1});
				// if(this._mc){
				// 	this.curState = ActionState.STAND;
				// 	this.changeMonsterAction();
				// 	if(cb && thisarg){cb.call(thisarg);}
				// }
			},this)
		}else{
			if(this && this._atkTar && !this._atkTar.isDead){
				this.moveEnd = false;
				if(this.curState != ActionState.RUN){
					this.curState = ActionState.RUN;
					this.changeMonsterAction();
				}
				let startP:egret.Point = new egret.Point(this.x,this.y);
				let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
				let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
				egret.Tween.removeTweens(this);
				let time:number = distance/this.monsterAttr.spd;
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
	/**隐藏选中 */
	public hideSelect():void{
		
		if(!!this.selctMc && this.selctMc.parent){
			this.selctMc.parent.removeChild(this.selctMc);
			this.selctMc = null;
		}
	}
	private selctMc:MovieClip
	/**显示选中状态 */
	public showSelect():void{
		if(this.selctMc){return}
		let mc:MovieClip = new MovieClip();
		this.selctMc = mc;
		mc.scaleX = mc.scaleY = 1.5;
		mc.playFile(`${EFFECT}select`,-1);
		this.addChild(mc);
		this.swapChildren(this._mc,mc);
		this.swapChildren(this._mc,this.progressGroup)
	}
	private grids:{row:number,col:number}[] = [{col:7,row:10},{col:7,row:11},{col:7,row:12},{col:7,row:13},{col:5,row:14}]
	/**找寻路径 */
	public findPath(gxy?:XY):void{
		let rolebirts:{row:number,col:number} = this.grids[((Math.random()*this.grids.length)>>0)];
		let pos:{row:number,col:number} = null;
		if(!gxy){pos = rolebirts;}else{pos = {row:gxy.y,col:gxy.x}};
		if(!this.route.length){
			let _path = MapView.inst().findPath(this.x,this.y,pos.col,pos.row);
			if(_path){
				_path.shift();
				this.route = _path;
			}
		}
		if(this.route && this.route.length && this.moveEnd){
			//去掉第一个格子 。这个格子与人物在一个格子
			let node:any = this.route.shift();
			let xy:XY = GameMap.grid2Point(node.x,node.y);
			this.execMoveAction(xy)
		}
	}
	/**获取到目标位置的距离 是否达到攻击距离 */
	public isInAtkDis():boolean{
		
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
			return  Math.abs(distance) <= this.monsterAttr.atkDis;
		}
		
	}
	/**执行攻击动作 */
	public execAtkAction():void{
		// if(GameApp.battleState == false){return}
		// if( (!this.atkState) ){
			if(this.curState != ActionState.ATTACK && !this.atkState){
				this.moveEnd = true;
				this.curState = ActionState.ATTACK;
				egret.Tween.removeTweens(this);
				// if(this._atkTar && !this._atkTar.isDead){
				// 	let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
				// 	this.calculEntityDic(angle);
				// }
				// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
				// this._mc.playFile(this._res,1,null,false,this._dic.toString());
				this.changeMonsterAction();
				this.atkState = true;
				let self = this;
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					
					if(self && self._atkTar){
						if(self && self._mc){
							self.curState = ActionState.STAND;
							// self._res = `${EFFECT}${self.soldierAttr.model}_${self.curState}`;
							// self._mc.playFile(self._res,-1,null,false,self._dic.toString());
							self.changeMonsterAction();
						}
						let index:number = (Math.random()*15 + 5)>>0;
						let direct:number = ((Math.random()*100)>>0) >= 10?-1:1;
						let atk:number = self.monsterAttr.atk  + direct*index;
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
						self._atkTar.reduceHp(atk);
						// let dmg:eui.BitmapLabel = new eui.BitmapLabel();
						// dmg.scaleX = dmg.scaleY = 0.7;
						// dmg.font = "dmg_fnt";
						// if(self._atkTar.scaleX == -1){
						// 	dmg.scaleX = -0.7;
						// }
						// self._atkTar.addChild(dmg);
						// dmg.text = "-"+atk;
						// dmg.x = 0;
						// dmg.y = -100 + ((Math.random()*20)>>0);

						let skillEff:MovieClip = new MovieClip();
						self._atkTar.addChild(skillEff);
						skillEff.x = 0;
						skillEff.y = 50;
						// if(self._atkTar.scaleX == -1){
						// 	dmg.scaleX = -1;
						// }
						// skillEff.playFile(`${EFFECT}skill5020`,1,null,true)
						// MessageManager.inst().dispatch(CustomEvt.DMGSHOW);
						// egret.Tween.get(dmg).to({y:-150},600,egret.Ease.circIn).call(()=>{
						// 	egret.Tween.removeTweens(dmg);
						// 	if(dmg && dmg.parent){
						// 		dmg.parent.removeChild(dmg);
						// 	}
						// },this)
					}
					let timeout2 = setTimeout(function() {
						//
						clearTimeout(timeout2);
						self.atkState = false;
					}, 500);	
				}, 600);
			}
		// }
	}
	public changeMonsterAction(state:string = "",tarPoint:egret.Point = null):void{
		let dic:number = this.dic;
		if(tarPoint){
			let angle:number = Math.atan2(tarPoint.y - this.y,tarPoint.x-this.x)*180/Math.PI;
			this.calculEntityDic(angle);
		}else{
			if(this._atkTar && !this._atkTar.isDead){
				let angle:number = Math.atan2(this._atkTar.y - this.y,this._atkTar.x-this.x)*180/Math.PI;
				this.calculEntityDic(angle);
			}
		}
		if(this.scaleX == -1){
			this.progressGroup.scaleX = -1;
		}else{
			this.progressGroup.scaleX = 1;
		}
		if(!!state){
			if(this.curState == state && dic == this.dic){
				return;
			}
			this.curState = state;
		}
		// let bodyres:string = `${this._res}_${this.dic}${this.curState}`
		if(this._mc){
			this._mc.playSlice(this._res,this._dic.toString(),this.curState,-1);
		}
	}
	/**锁定目标 */
	public lookAt(_atkTar:SoldierEntity,isNew:boolean = false):void{
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
	private timeout;
	private onHpChange(value:number):void{
		if(!isNaN(value)){
			let percent:number = value/this._thp;
			if(this._barImg){
				this._barImg.width = percent*86
			}
		}
		// if(!this.timeout){
		// 	let self = this;
		// 	this.timeout = setTimeout(function() {
		// 		self.atkState = false;
		// 		clearTimeout(self.timeout);
		// 		self.timeout = null;
		// 	}, 3000);
		// }
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public dispose():void{
		// ObjectPool.push(this);
		this.curState = ActionState.DEAD;
		this.changeMonsterAction();
		// this._res = `${EFFECT}${this.soldierAttr.model}_${this.curState}`;
		// this._mc.playFile(this._res,1,null,true,this._dic.toString());
		if(this._watcher){
			this._watcher.unwatch();
		}
		let self = this;
		MessageManager.inst().dispatch("syncMonpos",{inst:this.hashCode,oper:0});
		if(this.camp == -1){
			MapView.inst().refreshMonItem(this);
		}else{
			MapView.inst().refreshRoleItem(this);
		}
		
		egret.Tween.removeTweens(this);
		if(this.interval){
			clearInterval(this.interval);
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
	public set hp(value:number){
		this._hp = value;
	}
	public set thp(value:number){
		this._thp = value;
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

}