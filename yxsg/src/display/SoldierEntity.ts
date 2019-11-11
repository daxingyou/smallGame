class SoldierEntity extends BaseEntity{
	private _atkTar:SoldierEntity;
	public _mc:MovieClip;
	private _res:string;
	private _direc:number;
	//攻击距离
	private _atkDis:number;
	//移动速度 s为单位 。 v*t = d 
	private _speed:number;
	private curState:string = ActionState.STAND;
	private _typeId:number;

	public general:boolean = false;
	private attackCount:number = 0;

	private _barimg:eui.Image;
	private _watcher:eui.Watcher;
	private progressGroup:eui.Group;
	public ObjectPoolKey:string = "SoldierEntity";

	public w:number;
	public h:number;
	public constructor() {
		super();
	}
	protected initialize():void{

	}
	public setSoldierData(camp:number,res:string,_atkDis:number,_speed:number,id:number,resH:number):void{
		this._camp = camp;
		this._direc = this._camp == 1?1:-1;
		this._atkDis = _atkDis;
		this._res = `${SOLDIER}${res}`;
		this._speed = _speed;
		this._mc = new MovieClip();
		this._typeId = id;
		// let scale:number = 0.7
		// if(id == SoldierType.SOLDIER_QI){
		// 	scale = 0.5;
		// }
		let scale = id == SoldierType.SOLDIER_QI?0.5:0.7;
		if(id ==-1){scale =1}
		this.scaleX = this._mc.scaleY = scale;
		if(id != -1){
			this.scaleX *=this._direc;
		}
		this.addChild(this._mc);
		this._mc.playFile(this._res,-1,null,false,ActionState.STAND);

		this.progressGroup = new eui.Group();
		this.progressGroup.scaleX = this.progressGroup.scaleY = 0.6;
		this.addChild(this.progressGroup);

		let hpBg:eui.Image = new eui.Image();
		hpBg.source = "hp_progress_bg_png";
		this.progressGroup.addChild(hpBg);

		
		this.progressGroup.y = -resH + 25;
		this.progressGroup.x = (-141*0.5);

		let barRes:string = camp == 1?"green_bar_png":"red_bar_png";
		let barimg:eui.Image = new eui.Image();
		barimg.source = barRes;
		this._barimg = barimg;
		this.progressGroup.addChild(barimg);

		//测试代码
		if(camp != 1 && this.general){
			this.progressGroup.x = 0;
		}
		//------
		this._watcher = eui.Binding.bindHandler(this,["_hp"],this.onHpChange,this);
	}
	private onHpChange(value:number):void{
		if(!isNaN(value)){
			let percent:number = value/this._thp;
			this._barimg.width = percent*141;
		}
	}
	/**执行攻击动作 */
	public execAtkAction():void{
		if(GameApp.battleState == false){return}
		if(this._atkTar && !this._atkTar._isDead && this.isInAtkDis()){
			if(this.curState != ActionState.ATTACK){
				this.curState = ActionState.ATTACK;
				egret.Tween.removeTweens(this);
				if(this.general){
					this.attackCount += 1;
				}
				if(this.attackCount%5 == 0 && this.attackCount!=0){
					let timeout = setTimeout(function(camp) {
						clearTimeout(timeout);
						StageUtils.ins<StageUtils>().getStage().dispatchEvent(new StartGameEvent(StartGameEvent.USE_BUFF,{camp:camp}));
					}, ((Math.random()*3)>>0)*1000,this._camp);
				}
				this._mc.playFile(this._res,1,null,false,ActionState.ATTACK);
				if(this._typeId == SoldierType.SOLDIER_TOUSHICHE){
					this.createStone();
				}
				//当前实体执行攻击动作 目标实体血量值减少
				let self = this;
				let timeout = setTimeout(function() {
					clearTimeout(timeout);
					if(self && self._mc){
						self.curState = ActionState.STAND;
						self._mc.playFile(self._res,-1,null,false,ActionState.STAND);
					}
					if(self && self._atkTar){
						self._atkTar.reduceHp(self.attack);
					}	
				}, 700);
			}
			
		}
	}
	private createStone():void{
		let dict:number = this.camp == 1?1:-1;
		let atkStone:AttackStoneItem = new AttackStoneItem(this._atkTar.x,this._atkTar.y,this.x - 60*dict,this.y - 30,this.camp);
		this.parent.addChild(atkStone);
		atkStone.anchorOffsetX = atkStone.width>>1;
		atkStone.anchorOffsetY = atkStone.height>>1;
		atkStone.x = this.x - 60*dict;
		atkStone.y = this.y - 30;
		atkStone.scaleX = atkStone.scaleY = 0.6;
	}
	/**等待移动状态 */
	public waitMoveAction():void{
		if(this.curState != ActionState.RUN){
			this.curState = ActionState.RUN;
			this._mc.playFile(this._res,-1,null,false,ActionState.RUN);
		}
		egret.Tween.removeTweens(this);
	}
	/**执行y轴一个身位的移动 */
	public execYmoveAction(dit:number,dis:number):void{
		egret.Tween.removeTweens(this);
		if(this.curState != ActionState.RUN){
			this.curState = ActionState.RUN;
			this._mc.playFile(this._res,-1,null,false,ActionState.RUN);
		}
		egret.Tween.get(this).to({y:dis},600).call(()=>{
			// egret.Tween.removeTweens(this);
		})
	}
	/**执行前往目标附近位置 */
	public execMoveAction():void{
		if(GameApp.battleState == false){
			egret.Tween.removeTweens(this);
			return;
		}
		if(this.curState != ActionState.RUN){
			this.curState = ActionState.RUN;
			this._mc.playFile(this._res,-1,null,false,ActionState.RUN);
		}
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(startP.x-endP.x,2) + Math.pow(startP.y-endP.y,2));
			egret.Tween.removeTweens(this);
			let time:number = distance/this._speed;
			egret.Tween.get(this,{loop:false,onChange:()=>{
				if(this.isInAtkDis() && GameApp.battleState == false){
					egret.Tween.removeTweens(this)
				}
			},onChangeObj:this}).to({x:this._atkTar.x,y:this._atkTar.y},time*1000).call(()=>{
				egret.Tween.removeTweens(this);
			})
		}
	}
	/**执行站立状态 */
	public execStandAction():void{
		this.curState = ActionState.STAND;
		this._mc.playFile(this._res,-1,null,false,ActionState.STAND);
	}
	/**获取到目标位置的距离 是否达到攻击距离 */
	public isInAtkDis():boolean{
		if(this && this._atkTar && !this._atkTar.isDead){
			let startP:egret.Point = new egret.Point(this.x,this.y);
			let endP:egret.Point = new egret.Point(this._atkTar.x,this._atkTar.y);
			let distance:number = Math.sqrt(Math.pow(endP.x - startP.x,2) + Math.pow(endP.y - startP.y,2));
			return Math.abs(distance) <= this._atkDis;
		}
		return false;
		
	}
	/**锁定目标 */
	public lookAt(_atkTar:SoldierEntity,isNew:boolean = false):void{
		if(isNew){
			this._atkTar = _atkTar;
			return;
		}
		if(!this._atkTar ||(this._atkTar && this._atkTar._isDead)){
			//重新锁定目标
			this._atkTar = _atkTar;
		}else{
			return;
		}
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public dispose():void{
		// ObjectPool.push(this);
		this._mc.playFile(this._res,1,null,true,ActionState.DEAD);
		if(this._watcher){
			this._watcher.unwatch();
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
	public set buffDefense(value:number){
		this.buffDef = value;
	}
}