class AttackItem extends eui.Component{
	private img:eui.Image;
	private _res:string;
	private _tarx:number;
	private _tary:number;
	private _highX:number;
	private _highY:number;
	private _camp:number;
	private _angle:number;
	private _curx:number;
	private _cury:number;
	
	private _gy:number = 0.5;
	private vy = 0;
	private _rotationV = 0.8;
	public constructor(res:string,tarx:number,tary:number,curx:number,cury:number,camp:number) {
		super();
		this._res = res;
		this._tarx = tarx;
		this._tary = tary;
		this._camp = camp;
		this._curx = curx;
		this._cury = cury;
		this._angle = -20
		this.initialize();
	}
	public initialize():void{
		this.img = new eui.Image();
		this.img.source = this._res;
		this.addChild(this.img);
		let arrowFire:MovieClip = new MovieClip();
		this.addChild(arrowFire);
		arrowFire.playFile(`${EFFECT}arrow_fire`,-1);
		arrowFire.scaleX = arrowFire.scaleY = 0.3;
		this._highX = ((Math.abs(this._tarx) - Math.abs(this._curx))>>1) + 150;
		this._highY = (StageUtils.ins<StageUtils>().getHeight()>>1) - 300;
		// this.scaleX*=-this._camp;
		this.anchorOffsetX = this.width;
		this.anchorOffsetY = this.height>>1;
		this._tary =( Math.random()*(StageUtils.ins<StageUtils>().getHeight() - 200) + 100)>>0
		this.x = this._curx;
		this.y = this._cury;
		this.rotation = this._angle;
		arrowFire.x = this.img.x + 30;
		arrowFire.y = this.img.y + 5
	}
	//利用egret的缓动动画Tween来实现动画  
    //二次方贝塞尔公式  
    //起点P0  控制点P1  终点P2  
    //(1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2  
    //在1秒内，this的factor属性将会缓慢趋近1这个值，这里的factor就是曲线中的t属性，它是从0到1的闭区间。  
	public doTween(){
		egret.Tween.get(this).to({factor: 1}, 1000).call(()=>{
			let loopFire:MovieClip = new MovieClip();
			this.addChild(loopFire);
			loopFire.playFile(`${SKILL_EFF}loopFire`,-1);
			loopFire.alpha = 0.8;
			loopFire.scaleX = loopFire.scaleY = 0.8;
			loopFire.x = this.img.x + this.img.width;
			loopFire.rotation = -45;
			loopFire.y = this.img.y + (this.img.height>>1);
			egret.Tween.removeTweens(this);
			let self = this;
			this.rotation = 45;
			let timeout = setTimeout(()=>{
				clearTimeout(timeout);
				if(self && self.parent){
					self.parent.removeChild(self);
				}
			},3000)
		},this);
	}
	//添加factor的set,get方法,注意用public  
	public get factor():number {  
		return 0;  
	}  
	//计算方法参考 二次贝塞尔公式  
	public set factor(value:number) {  
		this.x = (1 - value) * (1 - value) * this._curx + 2 * value * (1 - value) * this._highX + value * value * (this._tarx);  
		this.y = (1 - value) * (1 - value) * (this._cury ) + 2 * value * (1 - value) * (this._highY) + value * value * (this._tary); 
		this.vy += this._gy;
		this.y += this.vy;
		this._angle+=this._rotationV
		let angle:number = Math.atan2(this._tary - this.y,this._tarx - this.x)*180/Math.PI;
		this.rotation = this._angle;
	}
}