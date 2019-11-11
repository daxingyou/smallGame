class RoleHeadCom extends eui.Component{
	private roleName:eui.Label;
	private goldNum:eui.Label;
	private levelName:eui.Image;
	private headIcon:eui.Image;
	// private hpBar:eui.Image;
	// private hpMask:eui.Image;
	// private hpLab:eui.Label;
	private totalHp:number;
	private curHp:number;
	// private expBar:eui.Image;
	// private expMask:eui.Image;
	// private expLab:eui.Label;
	private power:eui.Label;
	private campImg:eui.Image;
	public constructor() {
		super();
		this.skinName = "RoleHeadComSkin";
	}
	protected childrenCreated():void{
		let goldNum:string = egret.localStorage.getItem(LocalStorageEnum.GOLD_NUM);
		if(goldNum){
			GameApp.ins<GameApp>().role_gold = parseInt(goldNum);
			// this.goldNum.text = goldNum;
		}
		let campstr:string = egret.localStorage.getItem(LocalStorageEnum.CAMP);
		if(campstr){
			let campCfg:any = CampCfg.campCfg[parseInt(campstr)];
			this.roleName.text = campCfg.roleName;
			this.headIcon.source = `head_${campstr}_png`
			this.campImg.source = `camp_title_${campstr}_png`
		}
		// let job:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		// if(job){ 
		// 	this.headIcon.source = parseInt(job)?"headicon_prompt_png":"headicon_noraml_png"
		// }else{
		// 	this.headIcon.source = "headicon_noraml_png"
		// }
		this.curHp = this.totalHp =  GameApp.ins<GameApp>().totalHp;
		// this.hpLab.text = this.curHp+"/"+this.totalHp;
		// this.hpBar.mask = this.hpMask;

		// this.expBar.mask = this.expMask;
		let curExp:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_EXP);
		if(curExp){
			GameApp.ins<GameApp>().curExp = parseInt(curExp);
		}
		let totalExp:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_MAIN_EXP);
		if(totalExp){
			GameApp.ins<GameApp>().curLevelMaxExp = parseInt(totalExp);
		}

		// let leverstr:string = egret.localStorage.getItem(LocalStorageEnum.LEVEL);
		// if(leverstr){
		// 	this.power.text = (parseInt(leverstr) * 1000 * ((Math.random()*100)>>0)).toString();
		// }else{
		// 	this.power.text = GameApp.power.toString();
		// }
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["role_gold"],this.onGoldChage,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["role_job"],this.levelNameChange,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["curExp"],this.onExpChange,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["curLevelMaxExp"],this.onExpChange,this);
		eui.Binding.bindHandler(GameApp.ins<GameApp>(),["rolePower"],this.onPowerChange,this);
		// this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ontouchTap,this);
	}
	private onPowerChange(value:number):void{
		this.power.text = value.toString();
	}
	private onExpChange(value):void{
		// this.expLab.text = `${GameApp.ins<GameApp>().curExp}/${GameApp.ins<GameApp>().curLevelMaxExp}`;
		// this.expMask.width = GameApp.ins<GameApp>().curExp / GameApp.ins<GameApp>().curLevelMaxExp * 175;
	}
	private onGoldChage(value:number):void{
		if(!isNaN(value)){
			this.goldNum.text = value.toString();
			egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,value.toString())
		}
	}
	private ontouchTap(evt:egret.TouchEvent):void{
		ViewManager.ins<ViewManager>().open(SelectWayPopUp)
	}
	/**血量减少 */
	public reduceHp(damage:number):void{
		let realReduce:number = damage*100;
		this.curHp -= realReduce;
		if(this.curHp <= 0){this.curHp = 0}
		// this.hpMask.width = this.curHp/this.totalHp*this.hpBar.width;
		// this.hpLab.text = this.curHp+"/"+this.totalHp;
	}
	/**重置血条 */
	public resetHp():void{
		this.curHp = this.totalHp;
		// this.hpLab.text = this.curHp+"/"+this.totalHp;
		// this.hpMask.width = this.hpBar.width;
	}
	private levelNameChange(value:number):void{
		this.curHp = this.totalHp = GameApp.soldierCfg[GameApp.ins<GameApp>().role_job].length*10*100;
		// this.hpLab.text = this.totalHp+"/"+this.totalHp;
		// this.levelName.source = `title_job_${value}_png`;
	}
	public initialize(obj:{roleName:string,goldNum:string,levelName:string,headIcon:string}):void{
		// this.goldNum.text = obj.goldNum;
		// egret.localStorage.setItem(LocalStorageEnum.GOLD_NUM,obj.goldNum);
	}

}