/**
 * 选择路线 -- 从军 从政 从商
 */
class SelectWayPopUp extends BaseEuiView{
	//从军
	private way1:eui.Image;
	private cost1:eui.Label;
	private btnClose:eui.Image;
	private job:eui.Label;
	private light:eui.Image;
	//从政
	// private way2:eui.Group;
	// private cost2:eui.Label;
	//从商
	// private way3:eui.Group;
	// private cost3:eui.Label;
	private job_1:eui.Image;
	private job_2:eui.Image;
	private job_3:eui.Image;
	private job_4:eui.Image;
	private job_5:eui.Image;
	private job_6:eui.Image;
	private content:eui.Group;

	private cb:()=>void;
	private arg:any;
	private _roleJobStr:string = "";
	public constructor() {
		super();
	}
	public open(...param):void{
		if(param && param.length && param[0].cb){
			this.cb = param[0].cb;
		}
		if(param && param.length && param[0].arg){
			this.arg = param[0].arg;
		}
		this._roleJobStr = egret.localStorage.getItem(LocalStorageEnum.ROLE_JOB);
		if(!this._roleJobStr){
			this._roleJobStr = GameApp.ins<GameApp>().role_job.toString();
			egret.localStorage.setItem(LocalStorageEnum.ROLE_JOB,this._roleJobStr);
		}
		if(parseInt(this._roleJobStr) == 0){
			this.light.visible = false;
		}else{
			this.light.visible = true;
			this.light.x = this["job_"+this._roleJobStr].x;
			this.light.y = this["job_"+this._roleJobStr].y;
		}
		this.job.text = GameApp.jobCfg[parseInt(this._roleJobStr)];
		let needGold:number = (parseInt(this._roleJobStr)+1)*300;
		this.cost1.text = needGold.toString();
		egret.Tween.get(this.content).to({verticalCenter:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addTouchEvent(this.way1,this.onway1,true);
		// GlobalFun.filterToGrey(this.way2);
		// GlobalFun.filterToGrey(this.way3);
	}
	private onway1():void{}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			// case this.way2:
			// case this.way3:
			// 	UserTips.ins<UserTips>().showTips("未达到开启条件");
			// 	break;
			case this.btnClose:
			case this.way1:
				if(this.cb && this.arg){
					this.cb.call(this.arg);
				}
				if(evt.target == this.way1){
					//提升军衔
					let curExp:number = GameApp.ins<GameApp>().exp;
					let totalExp:number = GameApp.ins<GameApp>().Texp;
					let curGold:number = GameApp.ins<GameApp>().gold;
					if(curExp < totalExp){
						UserTips.ins<UserTips>().showTips("晋升所需经验不足,可通过<font color=0x00ff00>【答题】【演武】【战役】</font>获得");
						return;
					}
					let needGold:number = (parseInt(this._roleJobStr)+1)*300;
					if(curGold < needGold){
						UserTips.ins<UserTips>().showTips(`晋升所需元宝不足，可通过<font color=0x00ff00>【拾荒】</font>获得`);
						return;
					}
					GameApp.ins<GameApp>().gold -= needGold;
					GameApp.ins<GameApp>().upgradeLevel();
				}
				egret.Tween.get(this.content).to({verticalCenter:-650},600,egret.Ease.circOut).call(()=>{
					egret.Tween.removeTweens(this.content);
					ViewManager.ins<ViewManager>().close(SelectWayPopUp);
				},this)
				break;
		}
	}
	public close():void{
		this.removeTouchEvent(this.way1,this.onway1);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.ins<ViewManager>().reg(SelectWayPopUp,LayerManager.UI_Pop);