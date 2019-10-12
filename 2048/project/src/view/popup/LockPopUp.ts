class LockPopUp extends BaseEuiView{
	private rect:eui.Rect;
	private lockStr:eui.Label;
	private lockBtn:eui.Group;
	private cost:number;
	private btnLab:eui.Label;
	private _cb:()=>void;
	private _arg:any;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.lockStr.text = "解锁此关卡需要金币x"+param[0].cost;
		this.cost = param[0].cost;
		this.addTouchEvent(this.lockBtn,this.onLock,true);
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
		if(param[0].cb && param[0].arg){
			this._cb = param[0].cb;
			this._arg = param[0].arg;
		}
	}
	private onReturn():void{
		ViewManager.inst().close(LockPopUp);
	}
	private onLock():void{
		if(this.btnLab.text == "关闭"){
			ViewManager.inst().close(LockPopUp);
			return;
		}else{
			if(this.cost > GameApp.gold){
				this.lockStr.text = "解锁失败,还差金币x"+(this.cost - GameApp.gold);
				this.btnLab.text = "关闭";
			}else{
				GameApp.gold -= this.cost;
				ViewManager.inst().close(LockPopUp);
				if(this._cb){
					this._cb.call(this._arg);
				}
			}
		}
		
	}
	public close():void{
		this.removeTouchEvent(this.lockBtn,this.onLock);
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
	}
}
ViewManager.inst().reg(LockPopUp,LayerManager.UI_Pop);