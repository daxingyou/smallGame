class PlayDengMiPop extends BaseEuiView{

	private returnBtn:eui.Image;
	private sureBtn:eui.Group;
	private guessLab:eui.Label;
	private guessGroup:eui.Group;
	private typeLab:eui.Label;
	private curQuestionCfg:any;
	private wordGroup:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.sureBtn,this.onSure,true);
		this.showQuestion();
		this.wordGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.guessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuessBackTouch,this);
		MessageManager.inst().addListener("RETURN",this.onReturn,this)
		MessageManager.inst().addListener("DL_NEXT",this.onNext,this);
		MessageManager.inst().addListener("DL_RESET",this.onReset,this);
	}	
	private onNext():void{
		this.showQuestion();
	}
	private onReset():void{
		this.showQuestion(this.curQuestionCfg.result)
	}
	private answer:string = "";
	private onTouchTap(evt:egret.TouchEvent):void{
		if(evt.target instanceof eui.Group){
			let label:eui.Label = evt.target.getChildByName("lab") as eui.Label;
			if(!!label && label.text){
				this.answer += label.text;
				if(this.guessGroup.numChildren >= 4){
					UserTips.inst().showTips("已达上限");
					return;
				}
				let group:eui.Group = this.createBlock(label.text);
				group.left = this.guessGroup.numChildren*30+ (this.guessGroup.numChildren)*10 - 10;
				group.y = 5;
				this.guessGroup.width = this.guessGroup.numChildren*(30) + (this.guessGroup.numChildren)*10
				this.guessGroup.addChild(group);
			}
		}
	}
	private onGuessBackTouch(evt:egret.TouchEvent):void{
		if(evt.target instanceof eui.Group){
			let label:eui.Label = evt.target.getChildByName("lab") as eui.Label;
			if(!!label){
				this.guessGroup.removeChild(evt.target)
				for(let i:number = 0;i<this.guessGroup.numChildren;i++){
					(<eui.Group>this.guessGroup.$children[i]).left = i*30+ (i)*10 - 10;
					this.guessGroup.$children[i].y = 5;
				}
				this.guessGroup.width -= 40;
				let index:number = this.answer.indexOf(label.text);
				if(index != -1){
					this.answer.slice(index,1);
				}
			}
		}
	}
	private createBlock(cnt:string):eui.Group{
		let group:eui.Group = new eui.Group();
		group.width = group.height = 30;
		group.touchEnabled = true;
		group.touchChildren = false;
		group.touchThrough = false;
		let block:eui.Image = new eui.Image("img_dengmi_cell_bg_png");
		group.addChild(block);
		block.right = block.top = block.left = block.bottom = 0;

		let txt:eui.Label = new eui.Label();
		group.addChild(txt);
		txt.size = 20;
		txt.horizontalCenter = 0;
		txt.verticalCenter = 0;
		txt.name = "lab";
		txt.text = cnt;
		return group;		
	}
	private showQuestion(word?:string):void{
		this.guessGroup.removeChildren();
		// for(let i:number = 0;i<this.guessGroup.numChildren;i++){
		// 	let item = this.guessGroup.getChildAt(i);
		// 	if(item && item.parent){
		// 		item.parent.removeChild(item);
		// 	}
		// }
		let wordstr:string = "";
		for(let i:number = 0;i<=5;i++){
			wordstr += this.randomfont();
			
		}
		let cfgs:any[] = DengMiCfg.cfgs.content;
		let index:number = (Math.random()*cfgs.length)>>0;
		let cfg:any = cfgs[index];

		if(!word){
			this.guessLab.text = cfg.display
			this.typeLab.text = cfg.msg;
			this.curQuestionCfg = cfg;
			wordstr += cfg.result;
		}else{
			wordstr += word;
		}
		let wordArr:string[] = wordstr.split("");
		for(let i:number = 0;i<10;i++){
			let label:eui.Label = this["word"+(i+1)].getChildByName("lab");
			if(label){
				let index:number = (Math.random()*wordArr.length)>>0;
				let font:string = wordArr[index];
				wordArr.splice(index,1);
				label.text = font;
			}
		}
	}
	private onSure():void{
		if(!this.guessGroup.numChildren){
			UserTips.inst().showTips("请输入有效答案")
			return;
		}
		if(this.answer && this.answer == this.curQuestionCfg.result){
			//回答正确
			ViewManager.inst().open(OverView,[{state:"result",win:1}])
		}else{
			//回答错误
			ViewManager.inst().open(OverView,[{state:"result",win:0,desc:"您给出的答案不正确,是否重新开始"}])
		}
	}
	private randomfont():string{
		var _len = 1;
		var i=0;
		var _str = "";
		var _base = 20000;
		var _range = 700;
		while(i < _len){
			i++;
			var _lower = (Math.random() * _range)>>0;
			_str += String.fromCharCode(_base + _lower);
		}
		return _str;
	}
	private onReturn():void{
		ViewManager.inst().close(PlayDengMiPop);
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.sureBtn,this.onSure);
		this.wordGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.guessGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuessBackTouch,this);
		MessageManager.inst().removeListener("RETURN",this.onReturn,this)
		MessageManager.inst().removeListener("DL_NEXT",this.onNext,this);
		MessageManager.inst().removeListener("DL_RESET",this.onReset,this);
	}
}
ViewManager.inst().reg(PlayDengMiPop,LayerManager.UI_Pop);