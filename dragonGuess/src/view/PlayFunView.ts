class PlayFunView extends BaseEuiView{
	private rect:eui.Rect;
	private goBtn:eui.Image;

	private count:number = 30;
	private time:egret.Timer;
	private timeLab:eui.Label;
	private fbName:eui.Label;
	private answerCount:eui.Label;
	private levelIconCfg:any = {};
	private resetBtn:eui.Image;
	private rightGrop:eui.Group;
	private rightImg:eui.Image;
	private guessGroup:eui.Group;
	private guessImg:eui.Image;
	private correctRect:egret.Rectangle;
	private selectCir:eui.Image;
	private selectCir0:eui.Image;
	private winboo:boolean = false;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.showClose(PlayFunView,true,this.onExitCall,this);
		this.addTouchEvent(this.goBtn,this.onStart,true);
		this.time = new egret.Timer(1000,this.count);
		this.time.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
		this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onComplete,this);
		this.addTouchEvent(this.resetBtn,this.onReset,true);
		this.guessGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuessClick,this);
		this.rightGrop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuessClick,this);
		this.rect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
		this.refreshPage(param[0]);
	}
	private onGuessClick(evt:egret.TouchEvent):void{
		this.guessGroup.globalToLocal(evt.stageX,evt.stageY)
		if(this.hitArea(evt.localX,evt.localY)){
			this.selectCir0.x = this.selectCir.x = this.correctRect.x - 15;
			this.selectCir0.y = this.selectCir.y = this.correctRect.y - 15;
			this.selectCir0.visible = this.selectCir.visible = true;
			
			let key:string = 'levelCfg'+this._level;
			let levelCfgObj = JSON.parse(egret.localStorage.getItem(key)).levelCfg;

			this.winboo = true;
			this.resetBtn.touchEnabled = false;

			levelCfgObj.forEach((item,index)=>{
				let arr = item.split("_");
				if(arr[0] == this._level && arr[1] == (this._index+1)){
					let num:number = this.levelIconCfg[this._level];
					if(arr[1] >= num){
						//当前达到本大关的最后一小关 开启下一个大关的第一关
						if(this._level <= 2){
							let nextLevelcfgStr = egret.localStorage.getItem('levelCfg'+(this._level+1))
							if(nextLevelcfgStr){
								let nextArr = JSON.parse(nextLevelcfgStr).levelCfg;
								let str:string = (this._level +1)+"_"+1+"_"+1;
								nextArr[0] = str;
								egret.localStorage.setItem('levelCfg'+(this._level+1),JSON.stringify({levelCfg:nextArr}))
							}else{
								let num2:number = this.levelIconCfg[this._level +1];
								let levelCfgs = [];
								for(let i:number = 0;i<num2;i++){
									let str:string = (this._level+1)+"_"+(i+1)+"_"+(i==0?1:0)
									levelCfgs.push(str);
								}
								egret.localStorage.setItem('levelCfg'+(this._level+1),JSON.stringify({levelCfg:levelCfgs}))
							}
						}
						
					}else{
						let str:string = this._level + "_" + (this._index+2) +"_" + 1;
						levelCfgObj[index+1] = str;
						egret.localStorage.setItem(key,JSON.stringify({levelCfg:levelCfgObj}))
					}
				}
			},this)
			
			let tieout = egret.setTimeout(()=>{
				this.onComplete(null);
				ViewManager.ins<ViewManager>().open(ResultPopUpView,[{state:1,cb:this.popCall,ta:this}]);
			},this,1000);
		}
	}
	/* */
	private popCall(str):void{
		this.winboo = false;
		this.resetBtn.touchEnabled = true;
		this.selectCir0.visible = this.selectCir.visible = false;
		if(str == "return"){
			ViewManager.ins<ViewManager>().closeReturnEffect(PlayFunView);
		}else{
			let num:number = this.levelIconCfg[this._level];
			if(this._index +1 >= num){
				ViewManager.ins<ViewManager>().closeReturnEffect(PlayFunView);
			}else{
				this._index += 1;
				this.answerCount.text = (this._index+1)+"/"+num;
				this.correctRect = this.getLevelImgShow(this._level,(this._index+1));
				this.onReset();
			}
		}
	}
	/**判断点击区域 */
	private hitArea(lx:number,ly:number):boolean{
		let condition1:boolean = ((lx >= this.correctRect.x) && (lx <= (this.correctRect.x + this.correctRect.width)));
		let condition2:boolean = ((ly >= this.correctRect.y) && (ly <= (this.correctRect.y + this.correctRect.height)));

		return condition1 && condition2;
		
	}
	/**点击时间重置 */
	private onReset():void{
		this.time.reset();
		this.time.stop();
		this.count = 30;
		this.timeLab.text = "00:"+this.count;
		this.time.start();
	}
	private onComplete(evt:egret.TimerEvent):void{
		this.count = 30;
		this.time.stop();
		this.time.reset();
		if(!this.winboo){
			ViewManager.ins<ViewManager>().open(ResultPopUpView,[{state:0,cb:this.popCall,ta:this}]);
		}
	}
	private onTimer(evt:egret.TimerEvent):void{
		this.count -= 1
		let str = "00:"+(this.count < 10?"0"+this.count:this.count);
		if(this.count <=0){
			str = "00:00";
		}
		this.timeLab.text = str;
	}
	private popUpResult():void{

	}
	//点击退出回调
	private onExitCall():void{
		this.count = 30;
		this.time.stop();
		this.time.reset();
	}	
	private onStart():void{
		this.rect.visible = false;
		this.goBtn.visible = false;
		this.time.start();
	}
	private _level:number;
	private _index:number;
	private _curParam;
	/**路由刷新界面 */
	public refreshPage(...param):void{
		this._curParam = param
		this.rect.visible = true;
		this.goBtn.visible = true;
		this.selectCir.visible = false;
		this.selectCir0.visible = false;
		let level:number = param[0].level;
		this._level = level;
		let index:number = param[0].index;
		this._index = index;
		this.fbName.text = param[0].fbName;
		this.levelIconCfg = {1:3,2:5,3:7};
		let num:number = this.levelIconCfg[level];
		this.answerCount.text = (index+1)+"/"+num;
		this.correctRect = this.getLevelImgShow(level,(index+1));
	}
	/**获取当前 图片显示 并且返回正确区域*/
	public getLevelImgShow(big_level:number,smallLevel:number):egret.Rectangle{
		let showImgUrl:string = `resource/res/view/level/type${big_level}Level${smallLevel}R.png`;
		let guessImgUrl:string = `resource/res/view/level/type${big_level}Level${smallLevel}G.png`;
		this.rightImg.source = showImgUrl;
		this.guessImg.source = guessImgUrl;
		let str:string = big_level+"_"+smallLevel;
		let rect:egret.Rectangle = new egret.Rectangle();
		let arr = this.createRightRectCfg[str];
		rect.x = arr[0];
		rect.y = arr[1];
		rect.width = arr[2];
		rect.height = arr[3]
		return rect;
	}
	public close():void{
		this.removeTouchEvent(this.goBtn,this.onStart);
		this.rightGrop.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuessClick,this);
		this.guessGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onGuessClick,this);
		this.removeTouchEvent(this.resetBtn,this.onReset);
		this.rect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStart,this);
	}
	private createRightRectCfg = {
		"3_7":[173,60,61,45],
		"3_6":[136,93,51,44],
		"1_3":[355,316,50,41],
		"2_1":[300,117,46,42],
		"2_2":[303,226,37,31],
		"2_3":[188,151,38,43],
		"2_4":[368,149,40,35],
		"2_5":[324,117,34,27],
		"3_1":[305,145,53,47],
		"3_2":[146,198,35,27],
		"3_3":[130,97,37,33],
		"3_4":[115,172,32,32],
		"3_5":[207,125,38,34],
		"1_2":[243,277,50,53],
		"1_1":[355,119,38,38]
	}
}
ViewManager.ins<ViewManager>().reg(PlayFunView,LayerManager.UI_Main);
