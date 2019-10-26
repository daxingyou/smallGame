class StoryItem extends eui.ItemRenderer{

	private img:eui.Image;
	private levelLab:eui.Label;
	private timeLab:eui.Label;
	private passGroup:eui.Group;
	private curHand:eui.Image;
	private unLockGroup:eui.Group;
	private _islock:boolean = false;
	public constructor() {
		super();
		this.skinName = "StoryItemSkin"
	}
	protected dataChanged():void{
		let data:ChapterCfg = this.data;
		this.img.source = GameApp.progress == 1?data.pic+"_jpg":"w_"+data.pic+"_jpg";
		this.levelLab.text = `Lv${data.chapter}.${data.name}`;
		let passData:any = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.PASS))[GameApp.progress];
		if(passData[this.itemIndex+1]){
			//当前关存在数值 。说明是已经通关的
			this.passGroup.visible = true;
			this.timeLab.text = DateUtils.getFormatBySecond(passData[this.itemIndex+1],DateUtils.TIME_FORMAT_10);
		}else if(this.itemIndex + 1 == (GameApp.progress == 1?GameApp.level:GameApp.womanLevel)){
			//当前的关卡
			this.curHand.visible = true;
			egret.Tween.get(this.curHand,{loop:true}).to({scaleX:0.8,scaleY:0.8},400).to({scaleX:1,scaleY:1},400)
		}else{
			this._islock = true;
			//未通关的关卡；
			this.unLockGroup.visible = true;
		}
	}
	public get ifLock():boolean{
		return this._islock
	}
}