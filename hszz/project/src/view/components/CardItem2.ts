class CardItem2 extends eui.ItemRenderer{
	
	private levelLab:eui.Label;
	private img:eui.Image;
	private _cardVo:CardVo;
	private cardGroup:eui.Group;
	private _ifInCd:boolean = false;
	private shape:egret.Shape;
	public constructor() {
		super();
		this.skinName = "CardItem2Skin";
	}
	protected childrenCreated():void{
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.cardGroup.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
	}
	private onBegin(evt:egret.TouchEvent):void{
		MessageManager.inst().dispatch(CustomEvt.ITEM_BEGIN,{x:evt.stageX,y:evt.stageY,itemIndex:this.itemIndex});
	}
	private onEnd():void{
		MessageManager.inst().dispatch(CustomEvt.ITEM_END);
	}
	protected dataChanged():void{
		let data:CardVo = this.data;
		this.setData(data)
	}
	private setData(data:CardVo):void{
		this.levelLab.text = data.energy.toString();
		this.img.source = `box_card_${data.id}_png`;
		this._cardVo = data;
	}
	public showCd():void{
		this._ifInCd = true;
		if(!this.shape){
			this.shape = new egret.Shape();
			this.addChild(this.shape);

			let rect:eui.Rect = new eui.Rect(this.cardGroup.width,this.cardGroup.height,0x000000);
			this.addChild(rect);
			this.shape.mask = rect;
			this.shape.x = this.cardGroup.width>>1;
			this.shape.y = this.cardGroup.height>>1;
		}
        egret.startTick(this.timeUp,this);
		
	}
	private angle:number = -90;
	private timeUp():boolean{
		this.changeGraphics();
		this.angle += 3;
		if (this.angle >= 270) {
			this.angle = this.angle % 270;
			this._ifInCd = false;
			egret.stopTick(this.timeUp,this);
			this.removeChild(this.shape);
			this.shape = null;
			this.angle = -90;
		}
		return false;
	}
	private changeGraphics():void{
		this.shape.graphics.clear();
		this.shape.graphics.beginFill(0xf7f7f7, 0.6);
		this.shape.graphics.moveTo(0, 0);
		this.shape.graphics.lineTo(120, 0);
		this.shape.graphics.drawArc(0, 0, 120, -90*Math.PI/180, this.angle * Math.PI / 180, false);
		this.shape.graphics.lineTo(0, 0);
		this.shape.graphics.endFill();
	}
	public upCard():void{
		this.cardGroup.top = -50;
	}
	public resetCard():void{
		this.cardGroup.top = 0;
	}
	public set cardVo(vo:CardVo){
		this._cardVo = vo;
		this.setData(vo);
	}
	public get cardVo():CardVo{
		return this._cardVo;
	}
	public get ifInCd():boolean{
		return this._ifInCd;
	}
	public dispose():void{
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.cardGroup.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
	}
}