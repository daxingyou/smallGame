class SignPopUp extends BaseEuiView{
	private content:eui.Group;
	private returnBtn:eui.Image;

	private numLab1:eui.Label;
	private numLab2:eui.Label;
	private numLab3:eui.Label;
	private numLab4:eui.Label;
	private numLab5:eui.Label;
	private numLab6:eui.Label;
	private numLab7:eui.Label;

	private getBtn1:eui.Image;
	private getBtn2:eui.Image;
	private getBtn3:eui.Image;
	private getBtn4:eui.Image;
	private getBtn5:eui.Image;
	private getBtn6:eui.Image;
	private getBtn7:eui.Image;
	private dalVal:number;

	private getLab1:eui.Label;
	private getLab2:eui.Label;
	private getLab3:eui.Label;
	private getLab4:eui.Label;
	private getLab5:eui.Label;
	private getLab6:eui.Label;
	private getLab7:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.content.scaleX = this.content.scaleY = 0;
		this.content.alpha = 0;
		egret.Tween.get(this.content).to({scaleX:0.8,scaleY:0.8,alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		for(let i:number = 1 ;i<=7;i++){
			let dayGet:string = egret.localStorage.getItem("sign_"+i);
			if(dayGet){
				this["getBtn"+i].visible = false;
				this["getLab"+i].visible = true;
				continue;
			}
			GlobalFun.filterToGrey(this["getBtn"+i]);
		}
		let firstTime:number = parseInt(egret.localStorage.getItem(LocalStorageEnum.FIRST_TIME));
		let nowDate:number = new Date().getTime();
		this.dalVal = (((nowDate - firstTime)/(24*60*60*1000))>>0)+1;
		let dayGet:string = egret.localStorage.getItem("sign_"+this.dalVal);
		if(!dayGet){
			//当前没有领取
			GlobalFun.clearFilters(this["getBtn"+this.dalVal]);
			this["getBtn"+this.dalVal].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		}
	}
	private onTouchTap():void{
		let signRewardObj:{reward:number,num:number} = SignCfg.signCfgs[this.dalVal - 1];
		//需要添加到背包里面 --- //
		if(signRewardObj.reward == 10016){
			GameApp.roleGold += signRewardObj.num;
		}else{
			GlobalFun.addItemToBag(signRewardObj.reward,signRewardObj.num);
		}
		
		//
		let itemCfg:any = ItemCfg.itemCfg[signRewardObj.reward];
		UserTips.inst().showTips("恭喜获得"+`<font color=0x00ff00>${itemCfg.name}</font>`+"x"+signRewardObj.num);
		this["getBtn"+this.dalVal].visible = false;
		this["getLab"+this.dalVal].visible = true;
		egret.localStorage.setItem("sign_"+this.dalVal,"1");
	}
	public onReturn():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0,alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(SignPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		if(this["getBtn"+this.dalVal]){
			this["getBtn"+this.dalVal].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		}
	}
}
ViewManager.inst().reg(SignPopUp,LayerManager.UI_Pop);