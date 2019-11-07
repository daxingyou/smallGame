class TipsView extends BaseEuiView {
	constructor() {
		super();
		this.initUI();
	}
	public close():void{

	}
	public initUI(): void {

		this.touchChildren = false;
		this.touchEnabled = false;

	}

	private labCount: number = 0;

	private list: TipsItem[] = [];


	public open(...param: any[]): void {

	}
	private timeLabs:TipsItem[] = [];
	public showTimeTips(obj:any):void{
		for(let i:number = 0;i<this.timeLabs.length;i++){
			if(this.timeLabs[i] && this.timeLabs[i].parent){
				this.timeLabs[i].parent.removeChild(this.timeLabs[i]);
			}
		}
		this.timeLabs = [];
		let tips: TipsItem = ObjectPool.pop("TipsItem");
		tips.horizontalCenter = 0;

		let bottomNum:number = (StageUtils.inst().getHeight()>>1) + 100;
		tips.bottom = bottomNum;
		this.addChild(tips);
		tips.label = obj.str;
		this.timeLabs.push(tips);
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			if(tips && tips.parent){
				tips.parent.removeChild(tips);
			}
		}, obj.time);
	}
	/**
	 * 显示tips
	 * @param str
	 */
	public showTips(str: string): void {
		let tips: TipsItem = ObjectPool.pop("TipsItem");
		tips.horizontalCenter = 0;
		let bottomNum:number = (StageUtils.inst().getHeight()>>1);
		tips.bottom = bottomNum;
		this.addChild(tips);
		tips.labelText = str;
		this.list.unshift(tips);
		tips.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
		for (let i: number = this.list.length - 1; i >= 0; i--) {
			egret.Tween.removeTweens(this.list[i]);
			let t: egret.Tween = egret.Tween.get(this.list[i]);
			t.to({"bottom": bottomNum + (i * 30)}, 300);
		}
	}
	private removeTipsItem(e: egret.Event): void {
		let tips = e.currentTarget;
		tips.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeTipsItem, this);
		tips.left = NaN;
		tips.bottom = NaN;
		let index: number = this.list.indexOf(tips);
		this.list.splice(index, 1);
		ObjectPool.push(tips);
	}
}

ViewManager.inst().reg(TipsView, LayerManager.TIPS_LAYER);
