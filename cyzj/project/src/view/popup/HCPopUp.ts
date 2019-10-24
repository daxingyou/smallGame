/**合成界面 */
class HCPopUp extends BaseEuiView{

	private returnBtn:eui.Image;
	private content:eui.Group;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private item1:eui.Image;
	private item2:eui.Image;
	private item3:eui.Image;
	private hc_item:eui.Image;
	private hcBtn:eui.Image;
	private pos1Data:any;
	private pos2Data:any;
	private pos3Data:any;
	private hcCondition:any[];
	private hcReward:number[];
	private curHcCondition:number;
	// private noDataLab:eui.Label;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.hcCondition = [[10000,10001,10002],[10003,10004,10005],[10006,10007,10008],[10000,10000,10000],[10001,10001,10001],[10002,10002,10002],
		[10003,10003,10003],[10004,10004,10004],[10005,10005,10005]];
		this.hcReward = [10009,10010,10011,10003,10004,10005,10006,10007,10008]
		this.content.scaleX = this.content.scaleY = 0;
		this.content.alpha = 0;
		egret.Tween.get(this.content).to({scaleX:0.8,scaleY:0.8,alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
		},this)
		this.addTouchEvent(this.returnBtn,this.onReturn,true);
		this.addTouchEvent(this.hcBtn,this.onHc,true);
		this.arrayCollect = new eui.ArrayCollection();
		this.list.itemRenderer = BagItem;
		this.list.dataProvider = this.arrayCollect;
		this.scroller.viewport = this.list;
		this.scroller.verticalScrollBar.autoVisibility = false;
		this.scroller.verticalScrollBar.visible = false;

		let metarisData:any[] = GlobalFun.getMetarisFromBag(0);
		this.item1.source = "";
		this.item2.source = "";
		this.item3.source = "";
		this.hc_item.source = "";
		this.hc_item.alpha = 0.5;
		this.hcBtn.visible = false;
		this.refreshList();
		this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}	
	private refreshList():void{
		let dataArr:any[] = [];
		for(let i:number = 0;i<9;i++){
			let itemCfg:any = ItemCfg.itemCfg[10000+i];
			let obj:any = {
				icon:`${10000+i}_png`,
				id:10000+i,
				name:itemCfg.name,
				num:0,
			}
			dataArr.push(obj);
		}
		let metarisData:any[] = GlobalFun.getMetarisFromBag(0);
		for(let i:number = 0;i<metarisData.length;i++){
			let itemCfg:any = ItemCfg.itemCfg[metarisData[i].id];
			for(let j:number = 0;j<dataArr.length;j++){
				if(dataArr[j].id == metarisData[i].id){
					dataArr[j].num = metarisData[i].num;
					break;
				}
			}
		}
		// this.noDataLab.visible = !dataArr.length;
		this.arrayCollect.source = dataArr;
		this.list.dataProviderRefreshed();
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.item1:
				if(this.pos1Data){
					let itemIndex:number = this.pos1Data.index;
					let bagitem:BagItem = this.list.getChildAt(itemIndex) as BagItem;
					bagitem.refreshNum(bagitem.num + 1);
					this.pos1Data = null;
					this.item1.source = "";
					this.hcBtn.visible = false;
				}
				break;
			case this.item2:
				if(this.pos2Data){
					let itemIndex:number = this.pos2Data.index;
					let bagitem:BagItem = this.list.getChildAt(itemIndex) as BagItem;
					bagitem.refreshNum(bagitem.num + 1);
					this.pos2Data = null;
					this.item2.source = ""
					this.hcBtn.visible = false;
				}
				break;
			case this.item3:
				if(this.pos3Data){
					this.prevItem.refreshNum(this.prevItem.num + 1);
					this.item3.source = "";
					this.prevItem = null;
					this.pos3Data = null;
					this.hcBtn.visible = false;
				}
				break;
		}
	}
	private prevItem:BagItem;
	private onItemTap(evt:eui.ItemTapEvent):void{
		let bagitem:BagItem = this.list.getChildAt(evt.itemIndex) as BagItem;
		if(bagitem.num <= 0 ){
			UserTips.inst().showTips("材料不足");
			return;
		}
		if(this.pos1Data && this.pos2Data && this.pos3Data){
			if(this.prevItem){
				this.prevItem.refreshNum(this.prevItem.num + 1);
			}
		}
		if(!this.pos1Data){
			this.pos1Data = evt.item;
			this.item1.source = this.pos1Data.id+"_png";
			this.pos1Data["index"] = evt.itemIndex;
		}else if(!this.pos2Data){
			this.pos2Data = evt.item;
			this.item2.source = this.pos2Data.id+"_png";
			this.pos2Data["index"] = evt.itemIndex;
		}else{
			this.prevItem = bagitem;
			this.pos3Data = evt.item;
			this.pos3Data["index"] = evt.itemIndex;
			this.item3.source = this.pos3Data.id +"_png";
		}
		bagitem.refreshNum(bagitem.num - 1);
		if(this.pos1Data && this.pos2Data && this.pos3Data){
			for(let key in this.hcCondition){
				let itemCondition:number[] = this.hcCondition[key];
				let arr:number[] = [];
				arr = arr.concat(itemCondition);
				let condition1:boolean = !!~arr.indexOf(this.pos1Data.id);
				if(condition1){arr.splice(arr.indexOf(this.pos1Data.id),1)}
				let condition2:boolean = !!~arr.indexOf(this.pos2Data.id);
				if(condition2){arr.splice(arr.indexOf(this.pos2Data.id),1)}
				let condition3:boolean = !!~arr.indexOf(this.pos3Data.id);
				if(condition1 && condition2 && condition3){
					//满足合成条件
					this.hcBtn.visible = true;
					this.curHcCondition = parseInt(key);
					this.hc_item.source = this.hcReward[key]+"_png";
					return;
				}
			}
			this.hc_item.source = "";
			this.curHcCondition = null;
			this.hcBtn.visible = false;
		}
		
	}
	/**合成 */
	private onHc():void{
		if(!this.pos1Data || !this.pos2Data || !this.pos3Data){
			UserTips.inst().showTips("未满足合成条件")
			return;
		}
		let rewardId:number = this.hcReward[this.curHcCondition];
		GlobalFun.addItemToBag(rewardId,1);
		let itemcfg:any = ItemCfg.itemCfg[rewardId];

		let cost1:number = this.pos1Data.id;
		GlobalFun.removeItemFromBag(cost1,1);
		let cost2:number = this.pos2Data.id;
		GlobalFun.removeItemFromBag(cost2,1);
		let cost3:number = this.pos3Data.id;
		GlobalFun.removeItemFromBag(cost3,1);
		UserTips.inst().showTips(`合成材料成功,获得<font color=0x00ff00>${itemcfg.name}</font>x1`);
		this.refreshList();
		let qianghuaMc:MovieClip = new MovieClip();
		this.content.addChild(qianghuaMc);
		qianghuaMc.playFile(`${EFFECT}qianghua`,2,null,true,"action");
		qianghuaMc.x = this.hc_item.x + 37;
		qianghuaMc.y = this.hc_item.y + 42;
		egret.Tween.get(this.hc_item).to({alpha:1},600).wait(100).call(()=>{
			this.hc_item.source = "";
			egret.Tween.removeTweens(this.hc_item);
			this.hc_item.alpha = 0.5;
		},this)

		this.item1.source = "";
		this.item2.source = "";
		this.item3.source = "";
		
		this.pos1Data = null;
		this.pos2Data = null;
		this.pos3Data = null;
		this.curHcCondition = null;
		this.prevItem = null;
	}
	private onReturn():void{
		egret.Tween.get(this.content).to({scaleX:0,scaleY:0,alpha:0},400,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.content);
			ViewManager.inst().close(HCPopUp);
		},this)
	}
	public close():void{
		this.removeTouchEvent(this.returnBtn,this.onReturn);
		this.removeTouchEvent(this.hcBtn,this.onHc);
		this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(HCPopUp,LayerManager.UI_Pop);