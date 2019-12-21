class NeiWuStoryItem extends eui.Component{

	private head:eui.Image;
	private storyLab:eui.Label;
	private _skinstate:string;
	private sureBtn:eui.Group;
	private cancleBtn:eui.Group;
	private label:eui.Label;
	private nameLab:eui.Label;
	private nameLab2:eui.Label;
	public constructor() {
		super();
		this.skinName = "NeiWuStoryItemSkin"
	}
	protected childrenCreated():void{
		this.scaleX = this.scaleY = 0.8;
		this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSure,this);
		this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCancle,this);
	}
	private onSure():void{
		MessageManager.inst().dispatch("SELECT_SURE");
	}
	private onCancle():void{
		MessageManager.inst().dispatch("SELECT_CANCLE");
	}
	public initData(data:any):void{
		this._skinstate = data.skinState;
		this.invalidateState();
		this.head.source = data.head;
		if(data.skinState == "center"){
			this.label.text = data.story;
		}else{
			this.storyLab.text = data.story;
			if(data.skinState == "left"){
				this.nameLab.text = data.name;
			}else{
				this.nameLab2.text = data.name;
			}
		}
		
	}
	protected getCurrentState(): string{
		return this._skinstate;
	}
	public dispose():void{
		this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSure,this);
		this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCancle,this);
	}
}