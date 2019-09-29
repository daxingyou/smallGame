class GuideStory extends BaseEuiView{

	private continueBtn:eui.Group;
	private contentLab:eui.Label;
	private nextTip:string = ""
	private cb:()=>void;
	private thisArg:any;
	private combobj:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		egret.Tween.get(this).to({alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
		},this)
		// this.addTouchEvent(this.continueBtn,this.onContinue,true);
		this.addTouchEvent(this,this.onContinue,true);
		if(param[0].tip){
			this.contentLab.text = param[0].tip;
		}
		if(param[0].nextTip){
			this.nextTip = param[0].nextTip;
		}
		if(param[0].cb){
			this.cb = param[0].cb;
		}
		if(param[0].arg){
			this.thisArg = param[0].arg;
		}
		if(param[0].obj){
			this.combobj=param[0].obj;
		}
	}
	private onContinue():void{
		if(this.nextTip){
			this.touchEnabled = false;
			this.touchChildren = false;
			ViewManager.inst().open(GuideView);
			let guideView:GuideView = ViewManager.inst().getView(GuideView) as GuideView;
			GameApp.guideView = guideView;
			guideView.nextStep({id:"1_1",comObj:this.combobj,width:123,height:110});
			egret.Tween.get(this.contentLab).to({alpha:0},300).call(()=>{
				this.contentLab.text = this.nextTip;
			},this).to({alpha:1},300).call(()=>{
				this.touchEnabled = true
				this.touchChildren = true;
				this.nextTip = "";
				egret.Tween.removeTweens(this.contentLab);
			},this)
		}else{
			egret.Tween.get(this).to({alpha:0},600,egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(this);
				ViewManager.inst().close(GuideStory);
				if(this.cb && this.thisArg){
					this.cb.call(this.thisArg);
				}
			},this)
		}
		
	}
	public close():void{
		this.removeTouchEvent(this.continueBtn,this.onContinue);
	}
}
ViewManager.inst().reg(GuideStory,LayerManager.UI_TOP)