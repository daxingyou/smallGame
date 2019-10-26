class DrawCircle extends eui.Component{

	private shape:egret.Shape;
	public constructor() {
		super();
	}
	protected childrenCreated():void{
		let circle:eui.Image = new eui.Image("circle_png");
		this.addChild(circle);
		
		circle.anchorOffsetX = circle.width>>1;
		circle.anchorOffsetY = circle.height>>1;

		this.shape = new egret.Shape();
		this.addChild(this.shape);

		circle.mask = this.shape;
		egret.startTick(this.timeUp,this);
	}
	private angle:number = -75;
	private timeUp():boolean{
		this.changeGraphics();
		this.angle += 12;
		if (this.angle >= 270) {
			this.angle = this.angle % 270;
			egret.stopTick(this.timeUp,this);
			this.removeChild(this.shape);
			this.shape = null;
			this.angle = -75;
		}
		return false;
	}
	private changeGraphics():void{
		this.shape.graphics.clear();
		this.shape.graphics.beginFill(0xf7f7f7, 1);
		this.shape.graphics.moveTo(0, 0);
		this.shape.graphics.lineTo(65, 0);
		this.shape.graphics.drawArc(0, 0, 65, -75*Math.PI/180, this.angle * Math.PI / 180, false);
		this.shape.graphics.lineTo(0, 0);
		this.shape.graphics.endFill();
	}
}