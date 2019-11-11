class AttackStoneItem extends eui.Component{
	private _gy:number = 0.5;
	private vy = 0;
	private _rotationV = 0.8;
	private _angle:number;
	private curx:number;
	private cury:number;
	private highx:number;
	private highy:number;
	private tarx:number;
	private tary:number;
	private camp:number;
	private img:eui.Image;
	public constructor(tarx:number,tary:number,curx:number,cury:number,camp:number) {
		super();
		this.tarx = tarx;
		this.tary = tary;
		this.curx = curx;
		this.cury = cury;
		this.camp = camp;
		this.highy = this.cury - 500;
		this.highx = camp == 1?this.curx + (Math.abs(this.curx - this.tarx)>>1):this.tarx + (Math.abs(this.curx - this.tarx)>>1);
		this.initialize();
	}
	public initialize():void{
		this.img = new eui.Image();
		this.img.source = "stone_png";
		this.addChild(this.img);
		this.anchorOffsetX = this.width;
		this.anchorOffsetY = this.height>>1;
		egret.Tween.get(this).to({factor:1},2000).call(()=>{
			let img:eui.Image= new eui.Image();
			img.anchorOffsetX = img.anchorOffsetY = 128;
			img.scaleX = img.scaleY = 0.7;
			img.source = "floor_divide_png";
			
			this.parent.addChildAt(img,1);
			img.x = this.tarx;
			img.y = this.tary;
			let timeout = setTimeout(function() {
				clearTimeout(timeout)
				if(img && img.parent){
					img.parent.removeChild(img);
				}
			}, 600);
			
			// let eff:MovieClip =  new MovieClip();
			// this.parent.addChildAt(eff,3);
			// eff.x = this.tarx;
			// eff.y = this.tary - 50;
			// eff.playFile(`${EFFECT}dropeff`,2,null,true);
			egret.Tween.removeTweens(this);
			this.parent.removeChild(this);
		},this)
	}
	//添加factor的set,get方法,注意用public  
	public get factor():number {  
		return 0;  
	} 
	//计算方法参考 二次贝塞尔公式  
	public set factor(value:number) {  
		this.x = (1 - value) * (1 - value) * this.curx + 2 * value * (1 - value) * this.highx + value * value * (this.tarx);  
		this.y = (1 - value) * (1 - value) * (this.cury ) + 2 * value * (1 - value) * (this.highy) + value * value * (this.tary); 
		this.vy += this._gy;
		this.y += this.vy;
		// this._angle+=this._rotationV
		// let angle:number = Math.atan2(this.tary - this.y,this.tarx - this.x)*180/Math.PI;
		// this.rotation = this._angle;
	}
}