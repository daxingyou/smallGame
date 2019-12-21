class ResultView extends BaseEuiView{

	private winGroup:eui.Group;
	private generalGroup:eui.Group;
	private cardGroup:eui.Group;
	private titleImg:eui.Image;
	private group1:eui.Group;
	private group2:eui.Group;
	private group3:eui.Group;
	private goodsLab:eui.Label;
	private medalLab:eui.Label;
	private soldierLab:eui.Label;
	private tipFont:eui.Image;

	private failGroup:eui.Group;
	private sureBtn:eui.Image;
	private groupMask:eui.Rect;

	private card1:ShopItem;
	private card2:ShopItem;
	private card3:ShopItem;
	private battlestate:boolean;
	private _cb:()=>void;
	private _arg:any;
	private _type:number;
	public constructor() {
		super();
	}
	public open(...param):void{
		GameCfg.resultBool = true;
		// this.winGroup["autoSize"]();
		this.failGroup["autoSize"]();
		this.skin.currentState = param[0].state;
		if(param[0].cb){
			this._cb = param[0].cb;
		}
		if(param[0].arg){
			this._arg = param[0].arg;
		}
		if(param[0].type){
			this._type = param[0].type;
		}
		if(param[0].state == "win"){
			let percent:number = StageUtils.inst().getWidth()/1334;
			// this.winGroup.x = (StageUtils.inst().getWidth() - this.winGroup.width*percent)>>1;
			// this.winGroup.y = (StageUtils.inst().getHeight() - this.winGroup.height*percent)>>1;
			
			if(!this._type){
				let marks:string[] = GameApp.battleMark.split("_");
				let cityInfo:CityInfo = GlobalFun.getCityInfo(parseInt(marks[0]));
				if(GameApp.levelid >= 4){
					GameApp.levelid = 1;
					GameApp.chapterid += 1;
				}else{
					GameApp.levelid += 1;
				}
				let timespan:number = parseInt(marks[1]) >= 4?new Date().getTime():0;
				GlobalFun.changeCityInfo(cityInfo.cityId,{passLevel:parseInt(marks[1]),isMain:parseInt(marks[1]) >= 4,isOwn:parseInt(marks[1]) >= 3,timespan:timespan});
				GameApp.battleMark = null;
			}
			
			this.battlestate = true;
			let winCount:string = egret.localStorage.getItem(LocalStorageEnum.WIN_COUNT);
			let count:number = winCount?parseInt(winCount)+1:1;
			egret.localStorage.setItem(LocalStorageEnum.WIN_COUNT,count.toString());
			if(count && count >= 1){
				this.titleImg.source = parseInt(winCount) >= 4?"title_4_png":`title_${count}_png`;
			}else{
				this.titleImg.source = "title_1_png";
			}
			let goodsNum:number = 150 + ((Math.random()*30)>>0);
			let medalNum:number = 1;
			let expNum:number = 150 + ((Math.random()*30)>>0);
			this.goodsLab.text = "物资x"+goodsNum.toString();
			this.medalLab.text = "勋章x"+medalNum.toString();
			this.soldierLab.text = "经验x"+expNum.toString();
			GameApp.goods += goodsNum;
			GameApp.medal += medalNum;
			for(let i:number = 1;i<=3;i++){
				this["card"+i].visible = false;
			}
			GameApp.exp += expNum;
			// let index:number = ((Math.random()*3 + 1)>>0);
			// GameApp[`soldier${index}Num`] += soldierNum;

			let generals:CardAttrVo[] = GameApp.cardInfo;
			let cards:CardAttrVo[] = [];
			for(let i:number = 0;i<generals.length;i++){
				if(generals[i].type == CardType.general){
					
				}else{
					cards.push(this.deepObj(generals[i]));
				}
			}
			let numIndex:number = ((Math.random()*3 + 1)>>0);
			for(let i:number = 0;i<numIndex;i++){
				let cardIndex:number = ( Math.random()*cards.length)>>0;
				let cardAttr:CardAttrVo = cards[cardIndex];
				if(numIndex == 1){
					this.card1.visible = true;
					this.card1.initData(cardAttr,false);
				}else if(numIndex == 2){
					this.card1.visible = this.card2.visible = true;
					!!i?this.card1.initData(cardAttr,false):this.card2.initData(cardAttr,false);
				}else{
					this[`card${i+1}`].visible = true;
					this[`card${i+1}`].initData(cardAttr,false);
				}
				
				if(cardAttr.insId == 10003){
					GameApp.intelligence += 1;
				}else if(cardAttr.type == CardType.soldier){
					if(cardAttr.soldierType == 1 || cardAttr.soldierType == 2)
					{
						let ownNum:number = GlobalFun.getCardDataFromId(cardAttr.insId,["ownNum"]).ownNum;
						GlobalFun.refreshCardData(cardAttr.insId,{ownNum:ownNum+36});
					}else
					{
						let ownNum:number = GlobalFun.getCardDataFromId(cardAttr.insId,["ownNum"]).ownNum;
						GlobalFun.refreshCardData(cardAttr.insId,{ownNum:ownNum+24});
					}
				}
				else{
					let ownNum:number = GlobalFun.getCardDataFromId(cardAttr.insId,["ownNum"]).ownNum;
					GlobalFun.refreshCardData(cardAttr.insId,{ownNum:ownNum+1});
				}
				
			}
			
			// this.generalGroup.mask = this.groupMask;
			// let rotation:number = 0;
			this.tipFont.alpha = 0;
			for(let i:number = 1;i<=3;i++){
				this["group"+i].alpha = 0;
			}
			this.generalGroup.alpha = 0;
			this.titleImg.alpha = 0;
			this.generalGroup.alpha = 0;
			this.titleImg.scaleX = this.titleImg.scaleY = 5;
			this.generalGroup.scaleX = this.generalGroup.scaleY = 5;
			egret.Tween.get(this.generalGroup).to({alpha:1,scaleX:1,scaleY:1},150,egret.Ease.circIn).call(()=>{
				egret.Tween.removeTweens(this.groupMask);
			},this)
			let self = this;
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				egret.Tween.get(self.titleImg).to({scaleX:1,scaleY:1,alpha:1},150,egret.Ease.circIn).call(()=>{
					egret.Tween.removeTweens(self.titleImg);
					let timeout2 = setTimeout(function() {
						clearTimeout(timeout2)
						for(let i:number = 1;i<=3;i++){
							self["group"+i].scaleX = self["group"+i].scaleY = 5;
							egret.Tween.get(self["group"+i]).to({scaleX:1,scaleY:1,alpha:1},150+i,egret.Ease.circIn).call(()=>{
								egret.Tween.removeTweens(self["group"+i]);
								egret.Tween.get(self.tipFont,{loop:true}).to({alpha:1},1200).to({alpha:0},1200)
								self.touchChildren = false;
								self.touchEnabled = true;
								self.addEventListener(egret.TouchEvent.TOUCH_TAP,self.onReturn,self);
							},self)
						}
					}, 300);
					
				},self)
				
			}, 300);
		}else{
			GameApp.battleMark = null;
			this.battlestate = false;
			egret.localStorage.setItem(LocalStorageEnum.WIN_COUNT,"0");
			this.failGroup.alpha = 0;
			egret.Tween.get(this.failGroup).to({alpha:1},600,egret.Ease.circOut).call(()=>{
				egret.Tween.removeTweens(this.failGroup);
				this.addTouchEvent(this.sureBtn,this.onReturn,true)
			},this)
		}
	}
	private  deepObj(param:any):any{
        let obj:any = {};
        for(let key in param){
            obj[key] = param[key];
        }
        return obj;
    }
	private onReturn():void{
		let group:eui.Group = this.battlestate?this.winGroup:this.failGroup;
		egret.Tween.get(group).to({alpha:0},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(group);
			ViewManager.inst().close(ResultView);
			if(this._cb && this._arg){
				this._cb.call(this._arg,this._type);
			}
		},this)
	}
	public close():void{
		GameCfg.resultBool = false;
		egret.Tween.removeTweens(this.tipFont);
		this.removeTouchEvent(this.sureBtn,this.onReturn);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onReturn,this);
	}
}
ViewManager.inst().reg(ResultView,LayerManager.UI_Pop);