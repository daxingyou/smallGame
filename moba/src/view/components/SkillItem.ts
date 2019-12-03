class SkillItem extends eui.Component{

	private upBtn:eui.Image;
	private skillImg:eui.Image;
	private skillGroup:eui.Group;
	private skillLevel:eui.Label;
	public _skillId:number;
	private _islock:boolean = true;
	private _cfg:any;
	private _isCd:boolean = false;
	private cdGroup:eui.Group;
	private cdTime:eui.Label;
	private numLab:eui.Label;
	public constructor() {
		super();
		this.skinName = "SkillItemSkin";
	}
	protected childrenCreated():void{
		this.upBtn.visible = false;
		this.skillLevel.visible = false;
		this.numLab.visible = false;
		this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpSkill,this);
		this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
		this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
		this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.onEnd,this);
		// this.skillGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReleaseSkill,this);
		this.cdGroup.visible = false;
	}
	private timeInterval;
	private showInfo:boolean;
	private onBegin(evt:egret.TouchEvent):void{
		if(!this.timeInterval){
			let self = this;
			this.timeInterval = setInterval(()=>{
				clearInterval(self.timeInterval);
				self.timeInterval = null;
				self.showInfo = true;
				MessageManager.inst().dispatch("showSkillInfo",{skillId:self._cfg.skillId});
			},1000)
		}
	}
	private onEnd():void{
		if(this.timeInterval){clearInterval(this.timeInterval)}
		if(!this.showInfo){
			if(this._islock){
				UserTips.inst().showTips("当前技能未开启,请先提升等级");
				return;
			}
			if(this._cfg.skillId == 101 && this.curUseNum > 0){
				this.curUseNum -= 1;
				this.numLab.text = this.curUseNum.toString();
			}
			MessageManager.inst().dispatch("releaseSkill",{skillId:this._cfg.skillId});
		}else{
			
			this.showInfo = false;
			MessageManager.inst().dispatch("hideSkillInfo");
		}
	}
	// private onReleaseSkill():void{
		
	// }
	public initialize(cfg:any):void{
		this._cfg = cfg;
		this.showIcon();
		this.showUp();
	}
	/**设置cd */
	private setCd(time:number,cb?:()=>void,arg?:any):void{
		this._isCd = true;
		let self = this;
		let count:number = 0;
		this.cdGroup.visible = true;
		this.cdTime.text = time.toString();
		let timeout = setInterval(function() {
			count += 1;
			self.cdTime.text = (time - count).toString();
			if(count >= time){
				self.curUseNum = 3;
				self.numLab.text = self.curUseNum.toString();
				clearInterval(timeout);
				self._isCd = false;
				self.cdGroup.visible = false;
				if(cb && arg){cb.call(arg)}
			}
		}, 1000);
	}
	/**是否在cd中 */
	public get isInCd():boolean{
		return this._isCd;
	}
	/**人物等级提升 显示技能提升图标 */
	public showUp():void{
		this.upBtn.y = 0;
		this.upBtn.touchEnabled = true;
		let tolLevel:number = 0;
		for(let key in GameApp.skillLevel){
			tolLevel += GameApp.skillLevel[key];
		}
		if(GameApp.level > tolLevel){
			//当前人物等级大于技能总等级 。
			if(this._cfg.skillId == 104){
				this.upBtn.visible = GameApp.level >= 4;
			}else{
				this.upBtn.visible = true;
			}
		}
		if(this.upBtn.visible){
			egret.Tween.get(this.upBtn,{loop:true}).to({y:this.upBtn.y - 10},1000).to({y:this.upBtn.y},1000)
		}else{
			egret.Tween.removeTweens(this.upBtn);
		}
	}
	/**隐藏提升 */
	public hideUp():void{
		egret.Tween.removeTweens(this.upBtn);
		egret.Tween.get(this.upBtn).to({y:120},400,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.upBtn);
			this.upBtn.visible = false;
		},this)
	}	
	private onUpSkill():void{
		this.upBtn.touchEnabled = false;
		GameApp.skillLevel[this._cfg.skillId] += 1;
		egret.localStorage.setItem(LocalStorageEnum.Skill_Level,JSON.stringify(GameApp.skillLevel));
		this.skillLevel.text = "Lv."+GameApp.skillLevel[this._cfg.skillId];
		this.showIcon();
		MessageManager.inst().dispatch("skillUpgrade")
	}
	private curUseNum:number = 0;
	private showIcon():void{
		let clevel:number = GameApp.skillLevel[this._cfg.skillId];
		if(!clevel){
			this.skillImg.source = `skill_${this._cfg.skillId}_unlock_png`;
			this.skillLevel.visible = false;
			this._islock = true;
		}else{
			this.skillImg.source = `skill_${this._cfg.skillId}_png`;
			this.skillLevel.visible = true;
			if(this._cfg.usenum > 1){
				this.curUseNum = this._cfg.usenum
				this.numLab.visible = true;
				this.numLab.text = this.curUseNum.toString();
			}else{
				this.numLab.visible = false;
			}
			this._islock = false;
			this.skillLevel.text = "Lv."+clevel;
		}
	}

}
