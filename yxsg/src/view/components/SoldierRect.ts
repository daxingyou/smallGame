/**
 * 士兵方阵
 */
class SoldierRect extends eui.Component{
	//士兵类型
	private _type:number;
	private soliderGroup:eui.Group;
	private _col:number = 2;
	private _row:number = 5;
	private _res:string;
	private _mcEntitys:MovieClip[] = [];
	private _camp:number;
	private _resPath:string
	public constructor(resid:string,type:number,camp:number) {
		super();
		this._res = resid;
		this._type = type;
		this._camp = camp
		this._resPath = camp == 1?"soldier":"enemy";
		//因没资源所以需要修改一下
		if(this._type == SoldierType.SOLDIER_TOUSHICHE){
			this._type = SoldierType.SOLDIER_GONG;
		}

		this.soliderGroup = new eui.Group();
		this.addChild(this.soliderGroup)
	}
	protected childrenCreated():void{
		this.initialize();
	}
	public initialize():void{
		this._mcEntitys = [];
		for(let i:number = 0;i<this._row;i++){

			for(let j:number = 0;j<this._col;j++){
				let mc:MovieClip = new MovieClip();
				this.soliderGroup.addChild(mc);
				mc.scaleX = mc.scaleY = 0.7;
				if(this._type == SoldierType.SOLDIER_QI){
					mc.scaleX = mc.scaleY = 0.5;
				}
				mc.playFile(`${EFFECT}soldier/${this._res}`,-1,null,null,"",()=>{
					mc.x = j*mc.width*mc.scaleX;
					mc.y = i*(mc.height>>1)*mc.scaleY ;
					this.anchorOffsetX = (mc.width*mc.scaleX)
					this.anchorOffsetY = (mc.height*mc.scaleY*this._row)>>1;
				})
				this._mcEntitys.push(mc);
			}
		}
	}
	/**播放动作 */
	public playAction(action:string,count:number = -1,cb:()=>void = null,arg:any = null):void{
		let res:string = `${this._resPath}_${action}_${this._type}`;
		for(let i:number = 0;i<this._mcEntitys.length;i++){
			let mc:MovieClip = this._mcEntitys[i];
			mc.playFile(`${EFFECT}soldier/${res}`,count,()=>{
				if(cb && arg){cb.call(arg);}
			});
		}
	}
	/**获取方阵伤害值 */
	public get damage():number{
		let index:number = (Math.random()*100)>>0;
		let rate:number = index/100;
		let dmg:number = 1;
		if(index <= 50){dmg = 2;}
		else{dmg = 3}
		return dmg;
	}
	/**减少士兵个数 每一点伤害为1个士兵 */
	public reduceSoldier(dmg:number,cb:()=>void,arg:any):number{
		let realHp:number = 0;
		for(let i:number = 0;i<dmg;i++){
			let index:number = (Math.random()*this._mcEntitys.length)>>0;
			let mc:MovieClip = this._mcEntitys[index];
			if(!mc){continue};
			realHp += 1;
			mc.playFile(`${EFFECT}soldier/${this._resPath}_dead_${this._type}`,1,null,true);
			this._mcEntitys.splice(index,1);
		}
		let self = this;
		if(this._mcEntitys.length <= 0 && cb && arg){
			cb.call(arg)
			let timeout = setTimeout(()=>{
				clearTimeout(timeout);
				if(self && self.parent){
					self.parent.removeChild(self);
				}
			},800)
		}
		return realHp;
	}
	public get type():number{
		return this._type;
	}
}