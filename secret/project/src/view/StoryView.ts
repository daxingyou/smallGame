class StoryView extends BaseEuiView{

	private storyImg:eui.Image;
	private submitImg:eui.Image;
	private answer:eui.Image;
	private helpBtn:eui.Image;
	private lookAnswerGroup:eui.Group;
	private helpGroup:eui.Group;
	private changeGroup:eui.Group;
	private clickRect:eui.Rect;
	private clickRect2:eui.Rect;
	private promptGroup:eui.Group;
	private promptGroup2:eui.Group;
	private promptTxt:eui.Label;
	private timeouts:any[] = [];
	private contentLab:eui.Label;
	private cnts:{progress:number,box:string,center:string,artical:string,prompt:string,correct:string}[] = []
	private curCnt:{progress:number,box:string,center:string,artical:string,prompt:string,correct:string};
	private curSelectPoint:egret.Point;
	private circleGroup:eui.Group;
	private curChapter:ChapterCfg;
	private curTime:number = 0;
	private interVal;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.curChapter = param[0].data;
		this.storyImg.source =  GameApp.progress == 1?this.curChapter.pic+"_jpg":"w_"+this.curChapter.pic+"_jpg";
		this.cnts = this.curChapter.cnt;
		this.refreshCnt();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		this.addTouchEvent(this.answer,this.onAnswer,true);
		this.addTouchEvent(this.helpBtn,this.onHelp,true);
		this.addTouchEvent(this.submitImg,this.onSubmit,true);
		this.circleGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCircleTouch,this);
		MessageManager.inst().addListener("endOneChapter",this.endOneChapter,this);
		MessageManager.inst().addListener("openAnswer",this.onOpenAnswer,this);
		let self = this;
		this.interVal = setInterval(()=>{
			self.curTime += 1;
		},1000)
	}
	private endOneChapter():void{
		if(!this.cnts.length){
			let passData:any = JSON.parse(egret.localStorage.getItem(LocalStorageEnum.PASS))
			passData[GameApp.progress][GameApp.progress==1?GameApp.level:GameApp.womanLevel] = this.curTime;
			egret.localStorage.setItem(LocalStorageEnum.PASS,JSON.stringify(passData));
			if(GameApp.progress == 1){
				GameApp.level += 1;
			}else{
				GameApp.womanLevel += 1;
			}
			clearInterval(this.interVal);
			ViewManager.inst().open(ResultPop,[{state:"win",end:true,endBoo:this.curChapter.ending,cnt:this.curChapter.endWord}]);
			return;
		}
		this.refreshCnt();
	}
	private onOpenAnswer():void{
		this.lookAnswerGroup.visible = true;
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		for(let i:number = 0;i<this.timeouts.length;i++){
			egret.clearTimeout(this.timeouts[i]);
		}
		this.timeouts = [];
		this.contentLab.text = this.curCnt.artical;
		switch(evt.target){
			case this.clickRect:
			case this.clickRect2:
			case this.promptGroup2:
				this.lookAnswerGroup.visible = this.helpGroup.visible = false;
				break;
			case this.promptGroup:
				if(GameApp.health < 2){
					UserTips.inst().showTips("体力不足");
				}else{
					GameApp.health -= 2;
					this.promptGroup.visible = false;
					this.promptGroup2.visible = true;
				}
				break;
			case this.changeGroup:
				if(GameApp.gem < 1){
					UserTips.inst().showTips('钻石不足');
				}else{
					GameApp.gem -= 1;
					GameApp.health += 2;
					UserTips.inst().showTips("钻石-1，体力+2");
				}
				break;
		}
		
	}
	private onAnswer():void{
		this.lookAnswerGroup.visible = true;
	}
	private onHelp():void{
		this.helpGroup.visible = true;
	}
	private onSubmit():void{
		if(!this.curSelectPoint){
			UserTips.inst().showTips("请先选择线索")
		}else{
			if(GameApp.health <= 0){
				UserTips.inst().showTips("体力不足");
				return;
			}
			//核对是否正确；
			let rectArr:any[] = [];
			rectArr = this.curCnt.box.split(";");
			rectArr.forEach((item,index)=>{
				rectArr[index] = item.split(",");
			})
			let lx:number = parseInt(rectArr[0][0]);
			let rx:number = parseInt(rectArr[1][0]);
			let ty:number = parseInt(rectArr[0][1]);
			let by:number = parseInt(rectArr[2][1]);

			if(this.curSelectPoint.x > lx && this.curSelectPoint.x < rx && this.curSelectPoint.y > ty && this.curSelectPoint.y < by){
				//回答正确
				ViewManager.inst().open(ResultPop,[{state:"win",end:false,endBoo:this.curChapter.ending,cnt:this.curCnt.correct}]);
			}else{
				//回答错误
				GameApp.health -= 1;
				ViewManager.inst().open(ResultPop,[{state:"fail"}]);
			}
		}
	}
	private circle:DrawCircle;
	private onCircleTouch(evt:egret.TouchEvent):void{
		if(this.circle && this.circle.parent){
			this.circle.parent.removeChild(this.circle);
		}
		this.circle = new DrawCircle();
		this.circleGroup.addChild(this.circle);
		this.circle.x = evt.localX;
		this.circle.y = evt.localY;
		this.curSelectPoint = new egret.Point();
		this.curSelectPoint.x = evt.localX;
		this.curSelectPoint.y = evt.localY;
	}
	private refreshCnt():void{
		if(!this.cnts.length){
			//当前无内容
			return;
		}
		this.curSelectPoint = null;
		if(this.circle && this.circle.parent){
			this.circle.parent.removeChild(this.circle);
		}
		this.contentLab.text = "";
		this.curCnt = this.cnts.shift();
		this.promptTxt.text = this.curCnt.prompt;
		this.promptGroup.visible = true;
		this.promptGroup2.visible = false;
		this.typerEffect(this.contentLab,this.curCnt.artical,200)
	}
	  /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */    
    private typerEffect(obj,content:string = "",interval:number = 200,backFun:Function = null,thisArg:any = null):void{
        var strArr:Array<any> = content.split("");
        var len:number = strArr.length;
        for (let i = 0; i < len; i++){
            let timeout;
            timeout = egret.setTimeout(function () { 
                obj.appendText(strArr[i]);
                if ((Number(i) >= len - 1) && (backFun != null)) {
                    backFun.call(thisArg);
                }
            }, this, interval*i);   
			this.timeouts.push(timeout);           
        }
    }
	public close():void{
		clearInterval(this.interVal);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		MessageManager.inst().removeListener("endOneChapter",this.endOneChapter,this);
		MessageManager.inst().removeListener("openAnswer",this.onOpenAnswer,this);
		this.removeTouchEvent(this.answer,this.onAnswer);
		this.removeTouchEvent(this.helpBtn,this.onHelp);
		this.removeTouchEvent(this.submitImg,this.onSubmit);
		this.circleGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCircleTouch,this);
	}
}
ViewManager.inst().reg(StoryView,LayerManager.UI_Main);