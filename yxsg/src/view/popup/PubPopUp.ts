class PubPopUp extends BaseEuiView{

	private content:eui.Group;
	private getBtn:eui.Image;
	private general_1:eui.Rect;
	private general_2:eui.Rect;
	private general_3:eui.Rect;
	private costLab:eui.Label;
	private attrLab:eui.Label;
	private nameLab:eui.Label;
	private returnBtn:eui.Image;
	
	private selectindex:number;
	private skillCfgs:any[];


	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = PubItem;
		this.scroller.viewport = this.list;
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);

		let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
		let skillCfgs:any[] = SkillCfg.skillCfg[parseInt(campstr)];
		//默认选择第一个
		this.selectindex = 0;
		this.skillCfgs = skillCfgs;
		// this.refreshshow();
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		let data:any[] = [];
		for(let i:number =0;i<skillCfgs.length;i++){
			let obj = {
				cost:skillCfgs[i].lockCost,
				skillName:skillCfgs[i].skillName,
				res:skillCfgs[i].roleSkill,
				skillId:skillCfgs[i].skillId,
				attr:skillCfgs[i].attr
			}
			data.push(obj)
		}
		this.list.dataProvider = this.arrayCollect;
		this.arrayCollect.source = data;
	}
	// private onTouchTap(evt:egret.TouchEvent):void{
	// 	switch(evt.target){
	// 		case this.general_1:
	// 			this.selectindex = 0;
	// 			this.refreshshow();
	// 			break;
	// 		case this.general_2:
	// 			this.selectindex = 1;
	// 			this.refreshshow();
	// 			break;
	// 		case this.general_3:
	// 			this.selectindex = 2;
	// 			this.refreshshow();
	// 			break;
	// 		case this.getBtn:
	// 			let cost:number = this.skillCfgs[this.selectindex].lockCost;
	// 			if(GameApp.ins<GameApp>().role_gold < cost){
	// 				UserTips.ins<UserTips>().showTips(`元宝不足,可通过<font color=0x00ff00>【扫荡】【征收】</font>获得`);
	// 				return;
	// 			}
	// 			GameApp.ins<GameApp>().gold -= cost;
	// 			let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
	// 			let skillId:number = this.skillCfgs[this.selectindex].skillId;
	// 			if(generalInfoStr){
	// 				let arr:string[] = generalInfoStr.split("_");
	// 				GameApp.ownGeneralNum = arr.length + 2;
	// 				let str:string = generalInfoStr + "_" + skillId;
	// 				egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET,str)
	// 			}else{
	// 				GameApp.ownGeneralNum = 2;
	// 				egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET,skillId.toString())
	// 			}
	// 			this.refreshshow();
	// 			break;
	// 	}
	// }
	// private refreshshow():void{
	// 	this.attrLab.text = this.skillCfgs[this.selectindex].attr;
	// 	this.costLab.text = this.skillCfgs[this.selectindex].lockCost;
	// 	this.nameLab.text = this.skillCfgs[this.selectindex].roleName;
	// 	let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
	// 	if(generalInfoStr){
	// 		let skillId:string = this.skillCfgs[this.selectindex].skillId.toString();
	// 		let arr:string[] = generalInfoStr.split("_");
	// 		this.getBtn.visible = !(!!~arr.indexOf(skillId))
	// 	}
	// }
	private onReturn():void{
		egret.Tween.get(this.content).to({verticalCenter:-600},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.ins<ViewManager>().close(PubPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		// this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.ins<ViewManager>().reg(PubPopUp,LayerManager.UI_Pop);