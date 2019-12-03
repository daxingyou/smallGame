class StartGameView extends BaseEuiView{

	private group:eui.Group;
	private contentGroup:eui.Group;
	private contentMask:eui.Rect;
	private levelGroup:eui.Group;
	private leftImg:eui.Image;
	private rightImg:eui.Image;

	private level_1:eui.Image;
	private level_2:eui.Image;
	private level_3:eui.Image;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.group["autoSize"]();
		// this.levelGroup.visible = false;
		this.levelGroup.alpha = 0;
		this.contentGroup.mask = this.contentMask;
		this.contentMask.width = 0;
		egret.Tween.get(this.contentMask).to({width:609},2000).call(()=>{
			egret.Tween.removeTweens(this.contentMask);
		},this)
		egret.Tween.get(this.leftImg).to({x:0},2000).call(()=>{
			egret.Tween.removeTweens(this.leftImg)
		},this)
		egret.Tween.get(this.rightImg).to({x:630},2000).call(()=>{
			egret.Tween.removeTweens(this.rightImg)
		},this)

		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			egret.Tween.get(self.levelGroup).to({alpha:1},600).call(()=>{
				egret.Tween.removeTweens(self.levelGroup);
			},this)
		}, 2500);

		this.addTouchEvent(this.level_1,this.onChallenge,true);
		this.addTouchEvent(this.level_2,this.onChallenge,true);
		this.addTouchEvent(this.level_3,this.onChallenge,true);
	}
	private onChallenge(evt:egret.TouchEvent):void{
		let level:string = evt.target.name;
		if(level){
			GameApp.chapterLevel = parseInt(level);
			egret.Tween.get(this.levelGroup).to({alpha:0},600).call(()=>{
				egret.Tween.removeTweens(this.levelGroup);
				egret.Tween.get(this.contentMask).to({width:0},2000).call(()=>{
					egret.Tween.removeTweens(this.contentMask);
				},this)
				egret.Tween.get(this.leftImg).to({x:295},2000).call(()=>{
					egret.Tween.removeTweens(this.leftImg)
				},this)
				egret.Tween.get(this.rightImg).to({x:295},2000).call(()=>{
					egret.Tween.removeTweens(this.rightImg)
				},this)
				egret.Tween.get(this).to({alpha:0},2000).call(()=>{
					egret.Tween.removeTweens(this);
					ViewManager.inst().close(StartGameView);
				},this)
				ViewManager.inst().open(GameMain);
			},this)
			
		}
	}
	public close():void{
		this.removeTouchEvent(this.level_1,this.onChallenge);
		this.removeTouchEvent(this.level_2,this.onChallenge);
		this.removeTouchEvent(this.level_3,this.onChallenge);
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Main);