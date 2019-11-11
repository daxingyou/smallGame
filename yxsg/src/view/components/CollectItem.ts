class CollectItem extends egret.Sprite{
	private _img:eui.Image;
	private _cfg:{res:string,x:number,y:number,w:number,h:number,itemName:string,resType:number};
	private _area:XY[];
	private _itemName:string;
	private _mc:MovieClip;
	public hitState:boolean = false;
	public constructor() {
		super();
	}
	public init():void{
		// if(this._cfg.resType){
		// 	//mc
		// 	this._mc=  new MovieClip();
		// 	this.addChild(this._mc);
		// 	this.resetPos();
		// 	this._mc.playFile(`${EFFECT}${this._cfg.res}`,-1);
		// }else{

			this._img = new eui.Image();
			this._img.anchorOffsetX = this._cfg.w>>1;
			this._img.anchorOffsetY = this._cfg.h>>1;
			this.addChild(this._img);
			this._img.source = this._cfg.res;
			this.resetPos();
		// }
		
		let rect:egret.Rectangle = new egret.Rectangle(this._cfg.x,this._cfg.y,this._cfg.w,this._cfg.h);
		this._area = GameMap.calculBuildGridArea(rect);
	}
	private createShadow():void{
		let sp:egret.Shape = new egret.Shape();
		sp.graphics.beginFill(0x000000,0.4);
		sp.graphics.drawEllipse(0,0,20,10);
		sp.graphics.endFill();
		this.addChild(sp);
		sp.anchorOffsetX = sp.width>>1;
		sp.anchorOffsetY = sp.height>>1;
	}
	public resetPos():void{
		this.x = this._cfg.x;
		this.y = this._cfg.y;
	}
	public set Cfg(value:{res:string,x:number,y:number,w:number,h:number,itemName:string,resType:number}){
		this._cfg = value;
		this.init();
	}
	public get area():XY[]{
		return this._area;
	}
	public get Cfg():{res:string,x:number,y:number,w:number,h:number,itemName:string,resType:number}{
		return this._cfg;
	}
}