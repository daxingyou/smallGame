class StartGamePop extends BaseEuiView{
	private descLab:eui.Label;
	private startBtn:eui.Rect;
	private scoreLab:eui.Label;
	private _cb:()=>void;
	private _arg:any;
	private rect:eui.Rect;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.descLab.text = param[0].desc;
		this.scoreLab.text = param[0].score;
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
		this._cb = param[0].cb;
		this._arg = param[0].arg;
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
	}
	private onClose():void{
		ViewManager.inst().close(StartGamePop);
	}
	private onStart():void{
		ViewManager.inst().close(StartGamePop);
		this._cb.call(this._arg);
	}
	public close():void{
		this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClose,this);
	}
}
ViewManager.inst().reg(StartGamePop,LayerManager.UI_Pop);