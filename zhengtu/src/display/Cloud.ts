class Cloud extends egret.Sprite
{
	private img:egret.Bitmap;
	private speedX:number;
	public constructor() 
	{
		super();
		this.init();
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	// protected childrenCreated():void{
		
	// }
	private update()
	{
		this.x += this.speedX;
		if(this.x >= StageUtils.inst().getWidth() + this.width + 20)
		{
			this.x = -this.width - 20;
			this.reset();
		}
	}
	private init()
	{
		this.touchEnabled = false;
		this.img = new egret.Bitmap(RES.getRes("cloud_png"));
		this.addChild(this.img);
		this.x = Math.random() * StageUtils.inst().getWidth() + this.width / 2;
		this.reset();
	}
	private reset()
	{
		this.y = Math.random() * StageUtils.inst().getHeight();
		this.scaleX = this.scaleY = Math.random()*0.5 + 0.6;
		// this.alpha = Math.random()*0.6 + 0.5;
		this.speedX = Math.random() * 1 + 1;
	}
	
}