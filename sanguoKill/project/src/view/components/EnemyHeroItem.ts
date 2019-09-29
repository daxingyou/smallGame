class EnemyHeroItem extends eui.ItemRenderer{

	private heroImg:eui.Image;
	private hpLab:eui.Label;
	private _heroAttr:HeroAttr;
	private _totalHp:number;
	private _curHp:number;
	private _isDead:boolean = false;
	private content:eui.Group;
	private _buffAtk:number = 0;

	private atkMark:eui.Image;
	private protectedMark:eui.Image;
	public constructor() {
		super();
		this.skinName = "EnemyHeroItemSkin";
	}
	protected dataChanged():void{
		this.content.left =  (this.itemIndex*this.width);
		egret.Tween.get(this.content).to({left:0},this.itemIndex*600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		})
		this.atkMark.visible = false;
		this.protectedMark.visible = false;
		let data:HeroAttr = this.data as HeroAttr;
		this._heroAttr = data;
		this.heroImg.source = `${LEVEL_ICON}level_${data.level}_${this.itemIndex}.jpg`;
		this.hpLab.text = data.attr.hp+"/"+data.attr.hp;
		this._curHp = this._totalHp = data.attr.hp;
	}
	public execAtkAction(atkcb:()=>void,cb:()=>void,thisArg:any):void{
		egret.Tween.get(this.content).to({left:- 50},300,egret.Ease.circOut).call(()=>{
			atkcb.call(thisArg)
		},this).wait(300).to({left:0},100).call(()=>{
			egret.Tween.removeTweens(this.content);
			cb.call(thisArg);
		},this)
	}
	/**是否miss 敏捷 。命中*/
	public judgeMiss():boolean{
		let index:number = (Math.random()*100)>>0;
		if(index <= 96){
			return false;
		}else{
			return true;
		}
	}
	public shake(time):void{
		let topx:number = this.content.top - 5;
		let ntopx:number = this.content.top + 5;
		let top:number = this.content.top;
		egret.Tween.get(this.content,{loop:true}).to({top:topx},50).to({top:ntopx},50);
		let self = this;
		let timeout = setTimeout(function() {
			self.content.top = top;
			clearTimeout(timeout);
			egret.Tween.removeTweens(self.content);
		}, time);
	}
	public set reduceHp(value:number){
		this._curHp -= value;
		if(this._curHp <= 0){this._curHp = 0,this._isDead = true,this.visible = false,GameApp.levelDeadState[this.itemIndex] = 1,GameApp.enemyDeadNum+=1};
		this.hpLab.text = this._curHp +"/"+this._totalHp;
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public get attr():{hp:number,agile:number,atk:number,hit:number,protected:number,crit:number}{
		return this._heroAttr.attr;
	}
	public set buffAtk(value:number){
		this._buffAtk = value;
		if(value){
			this.atkMark.visible = true;
		}else{
			this.atkMark.visible = false;
		}
	}
	public get buffAtk():number{
		return this._buffAtk = 0;
	}
}