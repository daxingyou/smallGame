class GameMainView extends BaseEuiView{
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private tarScoreLab:eui.Label;
	private curScoreLab:eui.Label;
	private returnBtn:eui.Image;
	private levelCfg:any;
	private playgroup:eui.Group;

	private guideGroup:eui.Group;
	private ownIcon:eui.Image;
	private nameLab:eui.Label;
	private wordLab:eui.Label;
	private chap:any[] = [];
	private succChap:any[] = [];
	private curMark:number = 0;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = CardItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;

		var sheet:egret.SpriteSheet = RES.getRes("res");

        var bg:game.BackgroundView = new game.BackgroundView(this.playgroup, sheet);
        this.playgroup.addChild(bg);

        var tile:game.TileView = new game.TileView(this.playgroup, sheet);
        this.playgroup.addChild(tile);

        var result:game.ResultView = new game.ResultView(this.playgroup, sheet);
        this.playgroup.addChild(result);

        game.GameData.getInstance().newGame();

		let level:number = param[0].level;
		GameApp.level = level;
		this.levelCfg = StoryCfg.cfg[level];
		this.tarScoreLab.text = this.levelCfg.score;
		this.curScoreLab.text = "0";
		let dataArr:any[] = [];
		for(let i:number = 0;i<12;i++){
			let obj:any = {};
			dataArr.push(obj);
			
		}
		this.guideGroup.visible = false;
		let storystr:string = egret.localStorage.getItem("story_"+level);
		if(!storystr){
			egret.localStorage.setItem("story_"+level,"1");
			this.guideGroup.visible = true;
			this.chap = this.levelCfg.chap;
			this.succChap = this.levelCfg.succhap;
			this.showChap();
		}
		this.arrayCollect.source = dataArr;
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.guideGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showChap,this);
		MessageManager.inst().addListener("reset",this.onReset,this);
		MessageManager.inst().addListener("refresh",this.onRefresh,this);
		MessageManager.inst().addListener("gameEndReset",this.onGameEndReset,this);
		MessageManager.inst().addListener("gameEndExit",this.onGameEndExit,this);
	}
	private onGameEndReset():void{
		game.GameData.getInstance().newGame();
	}
	private onGameEndExit():void{
		GameApp.level = null;
		ViewManager.inst().close(GameMainView);
	}
	private onReset():void{
		this.curScoreLab.text = "0";
	}
	private onRefresh(evt:CustomEvt):void{
		this.curScoreLab.text = evt.data.score;
		if(parseInt(evt.data.score) >= parseInt(this.tarScoreLab.text)){
			//游戏胜利
			let passLevelstr:string = egret.localStorage.getItem("pass_"+GameApp.level);
			if(!passLevelstr){
				egret.localStorage.setItem("pass_"+GameApp.level,"1");
				GameApp.gold += parseInt(this.levelCfg.reward);
				UserTips.inst().showTips("获得金币x"+this.levelCfg.reward);
				this.guideGroup.visible = true;
				this.curMark = 1;
				this.showChap();
			}
		}
		   
	}
	private showChap():void{
		if(this.curMark == 0){
			//战斗前的对话
			if(!this.chap.length){
				this.guideGroup.visible = false;
				return;
			}
			let itemWordobj:any = this.chap.shift();
			this.ownIcon.visible = (itemWordobj.person == "我");
			this.nameLab.text = itemWordobj.person?itemWordobj.person+":":"";
			this.wordLab.text = itemWordobj.content
		}else{
			//胜利后的对话
			if(!this.succChap.length){
				ViewManager.inst().close(GameMainView);
				return;
			}else{
				let itemWordobj:any = this.succChap.shift();
				this.ownIcon.visible = (itemWordobj.person == "我");
				this.nameLab.text = itemWordobj.person?itemWordobj.person+":":"";
				this.wordLab.text = itemWordobj.content
			}
		}
	}
	private onReturn():void{
		ViewManager.inst().close(GameMainView);
	}
	public close():void{
		MessageManager.inst().removeListener("reset",this.onReset,this);
		MessageManager.inst().removeListener("refresh",this.onRefresh,this);
		MessageManager.inst().removeListener("gameEndReset",this.onGameEndReset,this);
		MessageManager.inst().removeListener("gameEndExit",this.onGameEndExit,this);
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.guideGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.showChap,this);
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);