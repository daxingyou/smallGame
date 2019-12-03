class BuildingEntity extends BaseEntity{
	private _atkTar:SoldierEntity | MonsterEntity;
	// private _mc:MovieClip;
	private progressGroup:eui.Group;
	private _watcher:eui.Watcher;
	private buildAttr:RoleVo;
	public soldierAttr:RoleVo;
	private monsterAttr:RoleVo;
	private _res:string;
	public gx:number;
	public gy:number;
	/**攻击状态 */
	public atkState:boolean = false;
	private _barImg:eui.Image;
	private interval;
	public type:number = 0;
	private modelImg:eui.Image;
	public pos:number;
	public constructor() {
		super();
	}
	public setSoldierData(camp:number,res:string = "",attr:RoleVo,time?:number,scale?:number):void{
		this.touchEnabled = true;
		this.touchChildren = false;
		this._camp = camp;
		if(scale){
			this._scale = scale;
			this.scaleX = this.scaleY = scale;
		}
		
		let buildImg:eui.Image = new eui.Image();
		buildImg.source =  res;
		this.addChild(buildImg);
		this.modelImg = buildImg;
		this.type = attr.type;
		// let bodyres:string = `${this._res}_${this.dic}${this.curState}`;
		// this._mc = new MovieClip();
		// this.addChild(this._mc);
		// this._mc.playFile(bodyres,-1);

		this.buildAttr = attr;
		this.monsterAttr = attr;
		this.soldierAttr = attr;

		this._hp = this._thp = this.buildAttr.hp;

		this.progressGroup = new eui.Group();
		this.progressGroup.width = 106;
		this.addChild(this.progressGroup);
		this.progressGroup.anchorOffsetX = 53
		this.progressGroup.scaleX = this.progressGroup.scaleY = 1;
		// this.progressGroup.x = -40;

		// let barRes:number = 0xfc3434;
		// let barimg:egret.Shape = new egret.Shape();
		// barimg.graphics.beginFill(barRes,1);
		// barimg.graphics.drawRect(0,0,90,8);
		// this._barImg = barimg;
		// barimg.graphics.endFill();
		// this.progressGroup.addChild(barimg);
		let hpbarimg:eui.Image = new eui.Image();
		hpbarimg.source = "own_hp_bg_png";
		this.progressGroup.addChild(hpbarimg);
		// hpbarimg.y = - (buildImg.height>>1) - 50;

		let hpimg:eui.Image = new eui.Image();
		hpimg.source = this.camp == 1? "own_hp_bar_png":"enemy_hp_bar_png";
		this.progressGroup.addChild(hpimg)
		this._barImg = hpimg;
		hpimg.y = 4;
		hpimg.x = 10;
		// hpimg.y = hpbarimg.y;
		this.progressGroup.horizontalCenter = 0;
		this.progressGroup.y = -30

		this._watcher = eui.Binding.bindHandler(this,["_hp"],this.onHpChange,this);
	}
	/**获取格子所占的位置 */
	public get area():XY[]{
		if(this.camp == 1 && this.buildAttr.type == 1){
			return GameMap.calculBuildGridArea(new egret.Rectangle(this.x - ((this.width*this._scale)),this.y-((this.height*this._scale)>>1),this.width*this._scale,this.height*this._scale))
		}
		return GameMap.calculBuildGridArea(new egret.Rectangle(this.x - ((this.width*this._scale)>>1),this.y-((this.height*this._scale)>>1),this.width*this._scale,this.height*this._scale))
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
	public upgrade():void{
		this.soldierAttr.atk += ((this.soldierAttr.atk*0.2)>>0);
		this.soldierAttr.level = GameApp.level;
		this.soldierAttr.hp += ((this.soldierAttr.hp*0.2)>>0);
	}
	/**获取到目标位置的距离 是否达到攻击距离 */
	public isInAtkDis():boolean{
		
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
			return  Math.abs(distance) <= this.buildAttr.atkDis;
		}
		
	}
	/**执行攻击动作 */
	public execAtkAction():void{
		if(this.isInAtkDis() && !this.atkState && isNaN(this.pos)){
			this.atkState = true;
			let self = this;
			if(this._atkTar && !this._atkTar.isDead){
				let mc:MovieClip = new MovieClip(true);
				LayerManager.MAP_LAYER.addChild(mc);
				mc.scaleX = mc.scaleY = 0.2;
				mc.playFile(`${EFFECT}fire`,-1);
				mc.x = this.x;
				if(this.camp == -1){
					mc.y = this.y - (this.height>>1)
				}else{
					mc.y = this.y - 150;
				}
				// mc.y = this.y;
				let x:number = this._atkTar.x;
				let y:number = this._atkTar.y;
				egret.Tween.get(mc).to({x:x,y:y},800).call(()=>{
					egret.Tween.removeTweens(mc);
					if(mc.parent){
						mc.parent.removeChild(mc);
					}
					self.atkState = false;
					if(this._atkTar){
						let offX:number = Math.abs(this._atkTar.x - x);
						let offY:number = Math.abs(this._atkTar.y - y);
						if(offX <= 50 && offY <= 50){
							let boommc:MovieClip = new MovieClip();
							this._atkTar.addChild(boommc);
							boommc.playFile(`${EFFECT}eff_101_boom`,1,null,true);
							boommc.y -= 50;
							if(self && self._atkTar){
								let index:number = (Math.random()*15 + 5)>>0;
								let direct:number = ((Math.random()*100)>>0) >= 50?-1:1;
								let atk:number = self.soldierAttr.atk + direct*index;
								let critIndex:number = (Math.random()*100)>>0;
								let value:number = null;
								if(critIndex >= 60){
									value = ((atk*self._crit)>>0);
								}
								self._atkTar.reduceHp(atk+self.buffAttack);
							}
						}
					}
				},this)

				
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
		mc.scaleX = mc.scaleY = 3;
		mc.playFile(`${EFFECT}select`,-1);
		this.addChildAt(mc,0);
		mc.x = this.modelImg.x + (this.modelImg.width/2) - 10;
		mc.y = this.modelImg.y + this.modelImg.height - 65;
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
				this._barImg.width = percent*90
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
		if(this._watcher){
			this._watcher.unwatch();
		}
		let self = this;
		if(this.camp == -1){
			MapView.inst().refreshMonItem(this);
			MapView.inst().changeRoleTower();
		}else{
			MapView.inst().refreshRoleItem(this);
		}
		for(let i:number = 0;i<this.area.length;i++){
			let xy:XY = this.area[i]
			GameMap.AstarNode.setWalkable(xy.x,xy.y,true);
		}
		egret.Tween.get(this).to({alpha:0},600).call(()=>{
			egret.Tween.removeTweens(this);
			this._atkTar = null;
			if(this && this.parent){
				this.parent.removeChild(this);
			}
		},this)
		if(this.interval){
			clearInterval(this.interval);
		}
		
	}
	public set hp(value:number){
		this._hp = value;
	}
	public set thp(value:number){
		this._thp = value;
	}
	public get atkTar():SoldierEntity | MonsterEntity{
		return this._atkTar;
	}
	public set buffAtk(value){
		this.buffAttack = value;
	}
	public set buffHP(value){
		this.buffHp = value;
	}

}