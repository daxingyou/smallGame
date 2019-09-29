class OwnHeroItem extends eui.ItemRenderer{

	private weaponImg:eui.Image;
	private protectedImg:eui.Image;
	private horseAtkImg:eui.Image;
	private horseProtImg:eui.Image;
	private heroImg:eui.Image;
	private hpLab:eui.Label;
	private _heroAttr:HeroAttr;
	private _totalHp:number;
	private _curHp:number;
	private _isDead:boolean = false;
	private content:eui.Group;

	private borderMc:MovieClip;
	/**本次回合是否已经攻击过 */
	private _isAtk:boolean = false;

	private operGroup:eui.Group;
	private killBtn:eui.Image;
	private propBtn:eui.Image;

	private restoreEff:MovieClip;
	private effpoint:eui.Rect;
	public constructor() {
		super();
		this.skinName = "OwnHeroItemSkin";
	}
	protected childrenCreated():void{
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		if(evt.target == this.killBtn){
			MessageManager.inst().dispatch(CustomEvt.CLICK_KILL);
		}else if(evt.target == this.propBtn){
			ViewManager.inst().open(PropPopUp);
		}
	}
	protected dataChanged():void{
		this.content.left =  - (this.itemIndex*this.width);
		this.operGroup.visible = false;
		egret.Tween.get(this.content).to({left:0},this.itemIndex*600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		})
		let data:HeroAttr = this.data as HeroAttr;
		this._heroAttr = data;
		if(data.weaponId){
			this.weaponImg.source = `${EQUIP_ICON}${data.weaponId}.jpg`
		}
		if(data.protectedId){
			this.protectedImg.source = `${EQUIP_ICON}${data.protectedId}.jpg`;
		}
		if(data.horseAtkId){
			this.horseAtkImg.source = `${EQUIP_ICON}${data.horseAtkId}.jpg`;
		}
		if(data.horseProtId){
			this.horseProtImg.source = `${EQUIP_ICON}${data.horseProtId}.jpg`;
		}
		this.heroImg.source = data.icon;
		this.hpLab.text = data.attr.hp+"/"+data.attr.hp;
		this._curHp = this._totalHp = data.attr.hp;
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
	public ready():void{
		this.borderMc = new MovieClip();
		this.borderMc.playFile(`${EFFECT}border`,-1);
		this.content.addChild(this.borderMc);
		this.borderMc.x = this.heroImg.x;
		this.borderMc.y = this.heroImg.y;
		this.borderMc.scaleX = this.borderMc.scaleY = 1.5;
		egret.Tween.get(this.content).to({left:50},200).call(()=>{
			egret.Tween.removeTweens(this.content);
			this.operGroup.visible = true;
		},this)

		//出现杀 还有锦囊
		
		// this.content.left = 90;
	}
	public resetPos():void{
		if(this.content.left != 0){
			egret.Tween.removeTweens(this.content)
			egret.Tween.get(this.content).to({left:0},200).call(()=>{
				egret.Tween.removeTweens(this.content);
			},this)
		}
		this.operGroup.visible = false;
		if(this.borderMc && this.borderMc.parent){
			this.borderMc.parent.removeChild(this.borderMc);
		}
		this.content.left = 0;
		this.content.top = 0;
	}
	/**晃动 */
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
	/**血量减少 */
	public set reduceHp(value:number){
		this._curHp -= value;
		if(this._curHp <= 0){this._curHp = 0,this._isDead = true,this.visible = false,this.touchEnabled = false,GameApp.ownDeadState[this.itemIndex] = 1,this.dispose(),GameApp.roleDeadNum+=1};
		this.hpLab.text = this._curHp +"/"+this._totalHp;
	}
	/**血量恢复 */
	public set addHp(value:number){
		this._curHp += value;
		if(this._curHp >= this._totalHp){
			this._curHp = this._totalHp;
		}
		this.hpLab.text = this._curHp+"/"+this._totalHp;

		this.restoreEff = new MovieClip();
		this.restoreEff.playFile(`${EFFECT}hpReset`,1,null,true);
		this.content.addChild(this.restoreEff);
		this.restoreEff.x = this.effpoint.x;
		this.restoreEff.y = this.effpoint.y;
	}
	public get isDead():boolean{
		return this._isDead;
	}
	public get attr():{hp:number,agile:number,atk:number,hit:number,protected:number,crit:number}{
		return this._heroAttr.attr;
	}
	public get isAtk():boolean{
		return this._isAtk;
	}
	public set isAtk(value:boolean){
		this._isAtk = value;
		if(value){
			if(this.borderMc && this.borderMc.parent){
				this.borderMc.parent.removeChild(this.borderMc);
			}
		}
	}
	public dispose():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}