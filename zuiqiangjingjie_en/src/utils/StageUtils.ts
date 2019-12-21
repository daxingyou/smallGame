class StageUtils extends BaseClass {
	//UIStageSingle case
	private static _uiStage:eui.UILayer;
	private static lastOrientation:string|number;
	/**
	 * Constructor
	 */
	public constructor() {
		super();

		if (StageUtils._uiStage == null) {
			StageUtils._uiStage = new eui.UILayer();
			StageUtils._uiStage.touchEnabled = false;
			StageUtils._uiStage.percentHeight = 100;
			StageUtils._uiStage.percentWidth = 100;
			this.getStage().addChild(StageUtils._uiStage);
		}
	}
	public static inst():StageUtils{
		let _inst:StageUtils = super.single<StageUtils>();
		return _inst
	}
	
	/**
	 * Get the height of the game
	 * @returns {number}
	 */
	public getHeight():number {
		return this.getStage().stageHeight;
	}

	/**
	 * Get game width
	 * @returns {number}
	 */
	public getWidth():number {
		return this.getStage().stageWidth;
	}

	/**
	 * Specifies whether children of this object and children receive the mouse/Touch event
	 * @param value
	 */
	public setTouchChildren(value:boolean):void {
		this.getStage().touchChildren = value;
	}

	/**
	 * Set to trigger several click events at the same time，Default is2
	 * @param value
	 */
	public setMaxTouches(value:number):void {
		this.getStage().maxTouches = value;
	}

	/**
	 * Set frame rate
	 * @param value
	 */
	public setFrameRate(value:number):void {
		this.getStage().frameRate = value;
	}

	/**
	 * Set adaptation mode
	 * @param value
	 */
	public setScaleMode(value:string):void {
		this.getStage().scaleMode = value;
	}

	/**
	 * Get gameStageobject
	 * @returns {egret.MainContext}
	 */
	public getStage():egret.Stage {
		return egret.MainContext.instance.stage;
	}
	
	/**
	 * Get uniqueUIStage
	 * @returns {eui.UILayer}
	 */
	public getUIStage():eui.UILayer {
		return StageUtils._uiStage;
	}
	public static getScaleMode():string{
		if(StageUtils.isIphoneX())return egret.StageScaleMode.FIXED_WIDTH;
		let w: number = window.innerHeight / window.innerWidth;
		let minSizeProb = 1.4;
		let maxSizeProb = 1.8;
		let scaleMode = "";
		if(w <= minSizeProb) {
			scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
		} else if (w > minSizeProb && w < maxSizeProb) {
			scaleMode = egret.StageScaleMode.FIXED_WIDTH;
		}
		return scaleMode;
	}
	private static isIphoneX():boolean{
		return window.innerHeight==812 && window.innerWidth==375;
	}
	public static init():void{
		this.changeStageSize();
		window.addEventListener("resize", this.changeStageSize);
	}
	public static changeStageSize(): void {
		var scaleMode = StageUtils.getScaleMode();
		if(this.lastOrientation != window.orientation) {
			document.body.style.height = "100%";
			this.lastOrientation = window.orientation;
		}
		StageUtils.inst().getStage().scaleMode = scaleMode;
	}
	
	
}
