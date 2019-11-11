class SkillItem extends eui.ItemRenderer{

	private skillIcon:eui.Image;
	private skillNameLab:eui.Label;
	private skillLevelLab:eui.Label;
	private skillDescLab:eui.Label;
	private studyBtn:eui.Image;
	private skillId:number;
	private cost:number;
	private skillCostLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
	}
	protected childrenCreated():void{
		
	}
	private onStudy(evt:egret.TouchEvent):void{
		let level:number = parseInt(egret.localStorage.getItem("skill_"+this.skillId));
		if(GameApp.inst().gold < (level*this.cost)){
			UserTips.inst().showTips("黄金不足");
			return;
		}
		level += 1;
		egret.localStorage.setItem("skill_"+this.skillId,level.toString());
		this.skillLevelLab.text = "Lv."+level;
		this.skillCostLab.text = (level*this.cost).toString();
		if(level == 2){
			this.studyBtn.visible = false;
		}else{
			this.studyBtn.visible = true;
			this.studyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStudy,this);
		}
	}
	protected dataChanged():void{
		this.skillIcon.source = this.data.icon;
		this.skillNameLab.text = this.data.sname;
		this.skillDescLab.text = this.data.desc;
		this.skillId = this.data.skillId;
		this.cost = this.data.cost;
		let levelstr:string = egret.localStorage.getItem("skill_"+this.skillId);
		let level:number = 1;
		if(!levelstr){
			egret.localStorage.setItem("skill_"+this.skillId,"1");
		}else{
			level = parseInt(levelstr);
		}
		this.skillCostLab.text = (this.cost*level).toString();
		this.skillLevelLab.text = "Lv."+level;
		// let level:number = parseInt(egret.localStorage.getItem("skill_"+this.skillId));
		if(level == 2){
			this.studyBtn.visible = false;
		}else{
			this.studyBtn.visible = true;
			this.studyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStudy,this);
		}
	}
	public dispose():void{
		this.studyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStudy,this);
	}
}