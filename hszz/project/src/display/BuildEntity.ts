class BuildEntity extends BaseEntity{

	private _watcher:eui.Watcher;

	public soldierAttr:CardVo;

	private _res:string;

	private atkTar:SoldierEntity;

	private cdstate:boolean = false;

	private progressGroup:eui.Group;

	private _barimg:egret.Shape;

	private timeInterval;

	public camp:number = 1;
	public constructor() {
		super();
	}
	public setBuildData(camp:number,cardVo:CardVo):void{
		
		this._camp = camp;
		this.camp = camp;
		let img:eui.Image = new eui.Image(cardVo.model);
		this.soldierAttr = cardVo;
		
		this._thp = this._hp = cardVo.hp;
		this.scaleX = this.scaleY = 0.6;
		this.addChild(img);
		

		this.progressGroup = new eui.Group();
		this.progressGroup.width = 100;
		// this.progressGroup.scaleX = this.progressGroup.scaleY = 0.6;
		this.addChild(this.progressGroup);
		this.progressGroup.x = 70;
		this.progressGroup.y = 0;

		let levelLab:eui.Label = new eui.Label();
		this.progressGroup.addChild(levelLab);
		levelLab.fontFamily = "yt";
		levelLab.size = 20;
		levelLab.text = this.soldierAttr.level .toString()+"级";
		levelLab.horizontalCenter = 0;
		levelLab.top = -23;
		// }
		
		let barRes:number = camp == 1?0x00ff00:0xfc3434;
		let barimg:egret.Shape = new egret.Shape();
		barimg.graphics.beginFill(barRes,1);
		barimg.graphics.drawRect(0,0,100,10);
		barimg.graphics.endFill();
		this._barimg = barimg;
		this.progressGroup.addChild(barimg);

		let self = this;
		this.timeInterval = setInterval(()=>{
			self._hp -= 20;
			self.reduceHp(20);
		},1000)
		this._watcher = eui.Binding.bindHandler(this,["_hp"],this.onHpChange,this);
	}
	private onHpChange(value:number):void{
		if(!isNaN(value)){
			let percent:number = value/this._thp;
			if(this._barimg){
				this._barimg.graphics.clear();
				let barRes:number = this.camp == 1?0x00ff00:0xfc3434;
				this._barimg.graphics.beginFill(barRes,1);
				this._barimg.graphics.drawRect(0,0,percent*100,10);
				this._barimg.graphics.endFill();
			}
		}
	}
	private timeout;
	public execAtkAction():void{
		this.cdstate = true;
		let self = this;
		this.timeout = setTimeout(function() {
			clearTimeout(self.timeout)
			self.cdstate = false;
		}, 3000);
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public dispose():void{
		// ObjectPool.push(this);
		if(this._watcher){this._watcher.unwatch()}
		if(this.timeout){clearTimeout(this.timeout)}
		if(this.timeInterval){clearInterval(this.timeInterval)}
		if(this && this.parent){
			this.parent.removeChild(this);
		}
	}
	public lookAt(_atkTar:SoldierEntity,isNew:boolean = false):void{
		// this.addAttrRestrict();
		
	}
	public set hp(value:number){
		this._hp = value;
	}
	public set thp(value:number){
		this._thp = value;
	}
	public set buffAtk(value){
		this.buffAttack = value;
	}
	public set buffHP(value){
		this.buffHp = value;
	}
}