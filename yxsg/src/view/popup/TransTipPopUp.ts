/**公共的提示 */
class TransTipPopUp extends BaseEuiView{
	private sureBtn:eui.Group;
	private cancleBtn:eui.Group;
	private oper:number;
	private cb:()=>void;
	private arg:any;
	private txtLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		if(param[0].cb){
			this.cb = param[0].cb;
		}
		if(param[0].arg){
			this.arg = param[0].arg;
		}
		if(param[0].txt){
			this.txtLab.text = param[0].txt;
		}
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.addTouchEvent(this.cancleBtn,this.onCancle,true);
	}
	private onSure():void{
		if(this.cb && this.arg){
			this.cb.call(this.arg,1);
		}
		ViewManager.ins<ViewManager>().close(TransTipPopUp);
	}
	private onCancle():void{
		if(this.cb && this.arg){
			this.cb.call(this.arg,0);
		}
		ViewManager.ins<ViewManager>().close(TransTipPopUp);
	}
	public close():void{
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.removeTouchEvent(this.cancleBtn,this.onCancle);
	}
}
ViewManager.ins<ViewManager>().reg(TransTipPopUp,LayerManager.UI_Pop);