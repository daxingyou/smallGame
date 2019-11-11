class SkillStone extends eui.Component{

	private img:eui.Image;

	private _res:string;
	private _tarx:number;
	private _tary:number;
	private _highX:number;
	private _highY:number;
	private _angle:number;
	private _curx:number;
	private _cury:number;
	
	private _gy:number = 0.5;
	private vy = 0;
	private _rotationV = 0.8;
	public constructor(res:string,tarx:number,tary:number,curx:number,cury:number) {
		super();
		this._res = res;
		this._tarx = tarx;
		this._tary = tary;
		this._curx = curx;
		this._cury = cury;
		this.initialize();
	}
	public initialize():void{
		this.img = new eui.Image();
		this.img.source = this._res;
		this.addChild(this.img);
		this.anchorOffsetX = this.width;
		this.anchorOffsetY = this.height>>1;
		this.x = this._curx;
		this.y = this._cury;
		let self = this;
		egret.Tween.get(this,{loop:false,onChange:()=>{
			this.img.alpha -= 0.05;
		},onChangeObj:this}).to({x:this._tarx,y:this._tary},800,egret.Ease.circIn).call(()=>{
			let mc:MovieClip = new MovieClip();
			this.addChild(mc);
			mc.x = this.img.x + (this.img.width>>1);
			mc.y = this.img.y = (this.img.height>>1);
			egret.Tween.removeTweens(this);
			mc.playFile(`${SKILL_EFF}stoneBoom`,1,null,true);
			
			let timeout = setTimeout(()=>{
				clearTimeout(timeout);
				if(self && self.parent){
					self.parent.removeChild(self);
				}
			},600)
		})
	}
}