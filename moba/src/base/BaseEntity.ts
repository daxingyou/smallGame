class BaseEntity extends eui.Component{
	//阵营
	protected _camp:number;
	//entityid值
	protected _id:number;
	//方向
	protected _dic:number = 4;

	protected _hp:number = 40;
	protected _thp:number = 40;
	protected _mp:number = 40;
	protected _tmp:number = 40;
	protected _attack:number = 20;
	protected _changeValue:number = 0.1;
	protected _isDead:boolean = false;

	protected buffAttack:number = 0;
	protected buffHp:number = 0;
	protected buffDef:number = 0;
	protected _scale:number = 1;
	protected _crit:number = 0.4;
	protected _isnoMp:boolean = false;
	public constructor() {
		super();
		this.initialize();
	}
	protected initialize():void{}

	public get camp():number{
		return this._camp;
	}
	public get instId():number{
		return this._id;
	}
	public set dic(value:number){
		this._dic = value;
	}
	public get dic():number{
		return this._dic;
	}
	public get attack():number{
		let index:number = (Math.random()*100)>>0;
		let dic:number = index >= 50?1:-1;
		return (this._attack+this.buffAttack) + dic*((this._attack+this.buffAttack)*this._changeValue);
	}
	public set attack(value:number){
		this._attack = value;
	}
	public reduceHp(dmg:number,critValue?:number):void{
		if(this.buffHp > 0){
			this.buffHp -= dmg;
		}else{
			// let cirt:boolean = false;
			// if(this._camp == -1){
			// 	let index:number = (Math.random()*100)>>0;
			// 	if(index >= 60){
			// 		cirt = true;
			// 		dmg += ((dmg*this._crit)>>0);
			// 	}
			// }
			if(this instanceof SoldierEntity || this instanceof MonsterEntity){
				let mc:MovieClip = new MovieClip();
				this.addChild(mc);
				mc.scaleX = mc.scaleY = 0.5;
				mc.playFile(`${EFFECT}hurt`,1);
				mc.y = 50
			}
			if(this instanceof BuildingEntity && this.camp == 1){
				//当前我的防御塔被攻击 。需要闪红
				MessageManager.inst().dispatch("hurtShow");
			}

			let damageNum:number = critValue?dmg+critValue:dmg;

			if(this.buffDef){
				damageNum -= ((damageNum*this.buffDef)>>0);
			}
			this._hp-= damageNum;
			let dmgfont:eui.BitmapLabel = new eui.BitmapLabel();
			dmgfont.scaleX = dmgfont.scaleY = 0.7;
			dmgfont.font = "dmg_fnt";
			dmgfont.name = "item_"+Math.random();
			if(this.parent){
				this.parent.addChildAt(dmgfont,this.parent.numChildren - 1);
			}
			dmgfont.text = critValue?"c-"+damageNum:"-"+damageNum;
			dmgfont.x = this.x;
			dmgfont.y = this.y + -100 + ((Math.random()*50)>>0);
			// if(this.scaleX < 0){
			// 	dmgfont.scaleX = -0.7;
			// }else{
			// 	dmgfont.scaleX = 0.7;
			// }
			egret.Tween.get(dmgfont).to({y:this.y-150},600+((Math.random()*400)>>0),egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(dmgfont);
				if(dmgfont && dmgfont.parent){
					dmgfont.parent.removeChild(dmgfont);
				}
			},this)
			if(this._hp<=0){
				this._hp = 0;
				this._isDead = true;
				if(this._camp == -1){
					let exp:number =  15 + ((Math.random()*10)>>0);
					GameApp.exp += exp;
					UserTips.inst().showTips("经验+"+exp);
				}
				this.dispose();
			}
		}
	}
	public changeMp(dmg:number):void{
		if(dmg){
			this._mp -= dmg;
		}
		if(this._mp >= this._tmp){
			this._mp = this._tmp;
		}
		if(this._mp <= 0){
			this._mp = 0;
			this._isnoMp = true;
		}else{
			this._isnoMp = false;
		}
	}
	//计算方向
	public calculEntityDic(angle:number):void{
		
		if(angle >= -20 && angle <= 20){
			this._dic = DirectionEnum.RIGHT;
			this.scaleX = this._scale;
		}else if(angle < -20 && angle >= -70){
			this._dic = DirectionEnum.TR;
			this.scaleX = this._scale;
		}else if(angle < -70 && angle > -110){
			this._dic = DirectionEnum.TOP;
			this.scaleX = this._scale;
		}else if(angle >20 && angle <= 70){
			this._dic = DirectionEnum.RB
			this.scaleX = this._scale;
		}else if(angle >70&& angle<=110){
			this._dic = DirectionEnum.BOTTOM;
			this.scaleX = this._scale;
		}else if(angle > 110 && angle <= 160){
			this._dic = DirectionEnum.RB;
			this.scaleX = -this._scale;
		}else if((angle > 160 && angle <= 180) || (angle >= -180 && angle <= -160)){
			this._dic = DirectionEnum.RIGHT;
			this.scaleX = -this._scale;
		}else if(angle >-160 && angle <= -110){
			this._dic = DirectionEnum.TR;
			this.scaleX = -this._scale;
		}
	}
	protected dispose():void{
		
	}
}