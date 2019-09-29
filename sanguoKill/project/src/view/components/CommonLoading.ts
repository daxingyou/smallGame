class CommonLoading extends eui.UILayer implements RES.PromiseTaskReporter {

	private static _instance:CommonLoading;

	private tipsTxt:eui.Label;

	private loadingGroup:eui.Group;

	private loadingTxt:eui.Label;
	public constructor() {
		super();
		this.createView();
	}
	public static inst():CommonLoading{
        if(!this._instance){
            this._instance = new CommonLoading();
        }
        return this._instance;
    }
	private createView(): void {
		let rect:eui.Rect = new eui.Rect();
		this.addChild(rect);
		rect.left = rect.bottom = rect.top = rect.right = 0;

		this.tipsTxt = new eui.Label();
		this.addChild(this.tipsTxt);
		this.tipsTxt.size = 30;
		this.tipsTxt.fontFamily = "yt";
		this.tipsTxt.textColor = 0xE0861F;
		this.tipsTxt.horizontalCenter = 0;
		this.tipsTxt.verticalCenter = 0;

		this.loadingGroup = new eui.Group();
		this.addChild(this.loadingGroup);
		this.loadingGroup.horizontalCenter = 0;
		this.loadingGroup.bottom = 100;

		let img:eui.Image = new eui.Image();
		this.loadingGroup.addChild(img);
		img.source = "loading_btm_png";

		this.loadingTxt = new eui.Label();
		this.loadingGroup.addChild(this.loadingTxt);
		this.loadingTxt.size = 30;
		this.loadingTxt.fontFamily = "yt";
		this.loadingTxt.text = "Loading"
		this.loadingTxt.horizontalCenter = 0;
		this.loadingTxt.verticalCenter = 0;

		this.alpha = 0;
	}
	private interval;
	public show(tips?:string,cb?:()=>void,arg?:any):void{
		StageUtils.inst().getStage().addChild(this);

		egret.Tween.get(this).to({alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
			if(cb && arg){
				cb.call(arg);
			}
		},this);
		this.tipsTxt.text = tips?tips:"";
		let index = 0;
		let self = this;
		if(!tips){
			this.loadingGroup.bottom = (StageUtils.inst().getHeight()>>1) - (this.loadingGroup.height>>1);
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				self.hide();
				// MessageManager.inst().dispatch(CustomEvt.COMMONRESEND);
			}, 1000);
		}else{
			this.loadingGroup.bottom = 100;
		}
		this.interval = setInterval(()=>{
			index += 1;
			let str:string = index == 1?".":(index == 2)?"..":"...";
			self.loadingTxt.text = "Loading"+str;
			if(index >= 3){
				index = 0;
			}
		},300)
	}
    public hide():void{
		egret.Tween.get(this).to({alpha:0},600,egret.Ease.circOut).call(()=>{
			if(this.interval){clearInterval(this.interval)}
			if(this.parent){
				this.parent.removeChild(this);
			}
		},this);
    }
	public onProgress(current: number, total: number): void {
        if(current >= total){
			let self = this;
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				self.hide();
				MessageManager.inst().dispatch(CustomEvt.COMMONRESEND);
			}, 3000);
		}
        // this._loadHorse.x = this.progressMask.width;
    }
}