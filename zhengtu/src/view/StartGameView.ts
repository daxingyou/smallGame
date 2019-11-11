class StartGameView extends BaseEuiView{

	private startGameBtn:eui.Image;
	private heroGroup:eui.Group;
	private curSelectCard:HeroCardItem;
	private scroller:eui.Scroller;
	public constructor() {
		super();
	}
	public open(...param):void{
		// 吕布赵云 放商城 。id 100010 100011
		this.addTouchEvent(this.startGameBtn,this.onEnterGame,true);
		let heroAttrs:AttrItem[] = HeroAttrCfg.attrCfg;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		for(let i:number = 0;i<heroAttrs.length;i++){
			let item:AttrItem = heroAttrs[i];
			if(item.insId == 100010 || item.insId == 100011){continue};
			let attrItem:HeroCardItem = new HeroCardItem(item);
			this.heroGroup.addChild(attrItem);
			// attrItem.anchorOffsetX = attrItem.width>>1;
			// attrItem.anchorOffsetY = attrItem.height>>1;
			attrItem.x = (attrItem.width + 10)*i;
			// this.setScale(attrItem,attrItem.x);
		}
		this.tweenMove();
		this.heroGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onCardSelectBegin,this);
		this.heroGroup.addEventListener(egret.TouchEvent.TOUCH_END,this.onCardSelectEnd,this);
		this.heroGroup.touchEnabled = true;
	}
	private touchItem:HeroCardItem;
	/**卡牌选择 */
	private onCardSelectBegin(evt:egret.TouchEvent):void{
		let item:HeroCardItem = evt.target;
		if(item && item instanceof HeroCardItem){
			this.touchItem = item;
			egret.Tween.removeAllTweens();
		}
	}
	private onCardSelectEnd(evt:egret.TouchEvent):void{
		let item:HeroCardItem = evt.target;
		if(this.curSelectCard){
			this.curSelectCard.focus = false;
		}
		if(item && item instanceof HeroCardItem && this.touchItem == item){
			for(let i:number = 0;i<this.heroGroup.numChildren;i++){
				this.heroGroup.$children[i].x = (this.heroGroup.$children[i].width + 10)*i;
			}
			this.curSelectCard = item;
			item.focus = true;
			console.log("改变选择状态")
		}
	}
	/**卡牌移动 */
	private tweenMove(offestX?:number):void{
		let len:number = this.heroGroup.numChildren;
		for(let i:number = 0;i<len;i++){
			let item:HeroCardItem = this.heroGroup.getChildAt(i) as HeroCardItem;
			item.touchEnabled = true;
			this.tweenItem(item,offestX);
		}
	}
	private tweenItem(item:HeroCardItem,offestX?:number):void{
		let tx:number = -item.width - 10;
		if(offestX){
			tx = item.x + offestX;
		}
		let time:number = Math.abs(tx - item.x)/50;
		let len:number = this.heroGroup.numChildren;
		egret.Tween.get(item,{loop:true}).to({x:tx},time*1000).call(()=>{
			egret.Tween.removeTweens(item);
			if(!offestX){
				let lastItem:HeroCardItem = this.heroGroup.getChildAt(len -1) as HeroCardItem;
				item.x = lastItem.x + lastItem.width + 10;
				this.heroGroup.setChildIndex(item,len);
				this.tweenItem(item);
			}
		},this)
	}
	// /**设置缩放值 */
	// private setScale(attrItem:HeroCardItem,posx:number):void{
	// 	let distance:number = posx - (this.heroGroup.width>>1);
	// 	if(Math.abs(distance) <= (attrItem.width>>1)){
	// 		attrItem.scaleX = attrItem.scaleY = 1;
	// 	}
	// 	let percent:number = (Math.abs(distance)/attrItem.width);
	// 	attrItem.scaleX = attrItem.scaleY = 1-percent*0.15;
	// }
	private onEnterGame(evt:egret.TouchEvent):void{
		if(!this.curSelectCard){
			UserTips.inst().showTips("请先选择武将");
			return;
		}
		egret.localStorage.setItem(LocalStorageEnum.OWN_GENERAL,JSON.stringify({"attr":[this.curSelectCard.attr]}));
		// GameApp.inst()["soldier_"+this.curSelectCard.attr.type] = 10;
		let heroCfg:any[] = HeroAttrCfg.attrCfg;
		let len :number = heroCfg.length;
		let heroattrs:any[] = [];
		let shopattrs:any[] = [];
		for(let i:number = 0;i<len;i++){
			// let item:HeroCardItem = this.heroGroup.getChildAt(i) as HeroCardItem;
			let itemCfg:any = heroCfg[i];
			if(itemCfg.insId == 100010 || itemCfg.insId == 100011){
				shopattrs.push(itemCfg);
			}else if(this.curSelectCard.attr.insId != itemCfg.insId){
				heroattrs.push(itemCfg);
			}
			// if(item. != this.curSelectCard){
			// 	heroattrs.push(item.attr);
			// }
		}
		egret.localStorage.setItem(LocalStorageEnum.SHOP_GENERAL,JSON.stringify(shopattrs));
		egret.localStorage.setItem(LocalStorageEnum.OTHER_GENERAL,JSON.stringify(heroattrs));
		ViewManager.inst().open(GameMainView);
		ViewManager.inst().close(StartGameView);
		//进入游戏--主城
		egret.localStorage.setItem(LocalStorageEnum.IS_FIRST_ENTER,"1");
	}
	public close():void{
		this.heroGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardSelectBegin,this);
		this.heroGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCardSelectEnd,this);
		this.removeTouchEvent(this.startGameBtn,this.onEnterGame);
	}
}
ViewManager.inst().reg(StartGameView,LayerManager.UI_Main);