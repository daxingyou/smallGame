class PubItem extends eui.ItemRenderer{
	private skillGroup:eui.Group;

	private skillName:eui.Label;
	private costLab:eui.Label;
	private getBtn:eui.Image;
	private _res:string;
	private _skillId:number;
	private _cost:number;
	private attrLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "PubItemsSkin";
	}
	protected childrenCreated():void{
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGet,this);
	}
	private onGet():void{
		if(GameApp.ins<GameApp>().role_gold < this._cost){
			UserTips.ins<UserTips>().showTips(`元宝不足,可通过<font color=0x00ff00>【扫荡】【征收】</font>获得`);
			return;
		}
		let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
		let skillCfgs:any[] = SkillCfg.skillCfg[parseInt(campstr)];
		let power:number = 0;
		let skillName:string = '';
		for(let i:number = 0;i<skillCfgs.length;i++){
			if(this._skillId == skillCfgs[i].skillId){
				power = skillCfgs[i].power;
				skillName = skillCfgs[i].skillName;
				break;
			}
		}
		UserTips.ins<UserTips>().showTips(`恭喜获得上天的赏赐--获得技能<font color=0x00ff00>[${skillName}]</font>`);
		GameApp.ins<GameApp>().rolePower += power;
		this.getBtn.visible = false;
		GameApp.ins<GameApp>().gold -= this._cost;
		let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
		if(generalInfoStr){
			let arr:string[] = generalInfoStr.split("_");
			GameApp.ownGeneralNum = arr.length + 2;
			let str:string = generalInfoStr + "_" + this._skillId;
			egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET,str);
		}else{
			GameApp.ownGeneralNum = 2;
			egret.localStorage.setItem(LocalStorageEnum.GENERAL_GET,this._skillId.toString());
		}
	}
	protected dataChanged():void{
		if(this.data.cost){
			this._cost = this.data.cost;
			this.costLab.text = this.data.cost.toString();
		}
		if(this.data.skillName){
			this.skillName.text = this.data.skillName;
		}
		if(this.data.res){
			let mc:MovieClip = new MovieClip();
			this.skillGroup.addChild(mc);
			mc.playFile(`${SKILL_EFF}${this.data.res}`,-1,null,false,"",null,12);
			mc.x = this.skillGroup.width>>1;
			mc.y = this.skillGroup.height>>1;
		}
		if(this.data.skillId){
			this._skillId = this.data.skillId;
			let generalInfoStr:string = egret.localStorage.getItem(LocalStorageEnum.GENERAL_GET);
			if(generalInfoStr){
				let arr:string[] = generalInfoStr.split("_");
				if(arr.indexOf(this._skillId.toString()) == -1){
					this.getBtn.visible = true;
				}else{
					this.getBtn.visible = false;
				}
			}
		}
		if(this.data.attr){
			this.attrLab.text = this.data.attr;
		}
	}
	public dispose():void{
		this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGet,this);
	}
}