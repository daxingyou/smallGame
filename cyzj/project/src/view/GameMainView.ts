class GameMainView extends BaseEuiView{
	
	private roleHead:eui.Image;
	private expBar:eui.Image;
	private  expMask:eui.Rect;
	private nameLab:eui.Label;
	// private levelLab:eui.Label;
	private levelIcon:eui.Image;
	private roleMode:eui.Image;
	private goldLab:eui.Label;

	private signBtn:eui.Image;
	private bagBtn:eui.Image;
	private syntheBtn:eui.Image;
	private soulBtn:eui.Image;
	private shopBtn:eui.Image;
	private levelBtn:eui.Image;
	private addBtn:eui.Image;

	private bossTitle:eui.Image;
	private scroller:eui.Scroller;
	private list:eui.List;
	private arraycollect:eui.ArrayCollection;

	private roleInfoData:RoleInfoVo[];

	private goldWather:eui.Watcher;
	private roleDataWatcher:eui.Watcher;
	private levelWatcher:eui.Watcher;
	private expWatcher:eui.Watcher;
	private progressLab:eui.Label;
	private maxExp:number = 0;

	private time_label:eui.Label;
	private time_num:number = 300;
	private level_group:eui.Group;
	private time_group:eui.Group;
	public constructor() {
		super();
	}
	public open(...param):void{
		this.alpha = 0;
		this.roleInfoData = [];
		this.expBar.mask = this.expMask;
		this.expMask.width = 0;
		this.roleMode["autoSize"]();
		this.level_group["autoSize"]();
		this.time_label["autoSize"]();
		this.bossTitle["autoSize"]();
		this.scroller["autoSize"]();
		egret.Tween.get(this).to({alpha:1},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this);
		},this)

		this.arraycollect = new eui.ArrayCollection();
		this.list.itemRenderer = CardItem;
		this.list.dataProvider = this.arraycollect;
		this.scroller.viewport = this.list;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;

		let datastr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA) ;
		if(datastr){
			this.roleInfoData = JSON.parse(datastr);
		}else{
			this.roleInfoData = PartnerCfg.parenerCfg;
			egret.localStorage.setItem(LocalStorageEnum.ROLE_DATA,JSON.stringify(this.roleInfoData));
		}
		let dataArr:any[] = [];
		for(let key in this.roleInfoData){
			if(key == "0"){
				continue;
			}
			let obj:any = {};
			obj.ownNum = this.roleInfoData[key].o_suipian;
			obj.totalNum = this.roleInfoData[key].t_suipian;
			obj.role = this.roleInfoData[key].cardModel;
			obj.nameStr = this.roleInfoData[key].name;
			obj.lockLevel = this.roleInfoData[key].unlock;
			dataArr.push(obj);
		}
		this.arraycollect.source = dataArr;	
		this.maxExp = GameApp.roleData[GameApp.roleDataIndex].level * 500;
		this.goldWather = eui.Binding.bindProperty(GameApp,["roleGold"],this.goldLab,"text");
		this.roleDataWatcher = eui.Binding.bindHandler(GameApp,["roleDataIndex"],this.roleDataChange,this);	
		this.levelWatcher = eui.Binding.bindHandler(GameApp,["roleLevel"],this.levelChange,this);
		// this.expWatcher = eui.Binding.bindHandler(GameApp,["roleExp"],this.expChange,this);
		MessageManager.inst().addListener(CustomEvt.ADD_SHIELD,this.onaddShield,this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
		MessageManager.inst().addListener("ADVENTURE_OVER", this.closeLevelBtn, this);
		MessageManager.inst().addListener("mainRoleUp",this.onMainRoleUp,this);

		this.btnEffect();
	}
	private onMainRoleUp():void{
		this.roleInfoData = GameApp.roleData;
		let roleinfovo:RoleInfoVo = this.roleInfoData[GameApp.roleDataIndex];
		this.maxExp = roleinfovo.level*500;
		this.progressLab.text = roleinfovo.exp + "/" + this.maxExp;
		this.expMask.width = roleinfovo.exp/this.maxExp*215;
		this.roleDataChange(GameApp.roleDataIndex);
	}
	private btnEffect()
	{
		this.levelBtn.source = "levelBtn_png"
		egret.Tween.get(this.levelBtn, {loop:true})
		.to({scaleX:1.1, scaleY:1.1}, 600)
		.call(this.createBtnEffect, this)
		.to({scaleX:1, scaleY:1}, 600)
		.wait(500);
	}
	private createBtnEffect()
	{
		var btn = new egret.Bitmap(RES.getRes("levelBtn_png"))
			btn.scaleX = 1.1;
			btn.scaleY = 1.1;
			btn.anchorOffsetX = btn.width / 2;
			btn.anchorOffsetY = btn.height / 2;
			btn.x = this.levelBtn.x;
			btn.y = this.levelBtn.y;
			btn.touchEnabled = false;
		this.level_group.addChild(btn);

		egret.Tween.get(btn)
		.to({scaleX:1.3, scaleY:1.3, alpha:0}, 600)
		.call(()=>{
			this.level_group.removeChild(btn);
		}, this)
	}
	private onTouchTap(evt:egret.TouchEvent):void{
		switch(evt.target){
			case this.roleHead:
				ViewManager.inst().open(RoleInfoPopUp);
				break;
			case this.addBtn:
				ViewManager.inst().open(RechargePopUp);
				break;
			case this.signBtn:
				ViewManager.inst().open(SignPopUp);
				break;
			case this.shopBtn:
				ViewManager.inst().open(ShopPopUp)
				break;
			case this.bagBtn:
				ViewManager.inst().open(BagPopUp);
				break;
			case this.syntheBtn:
				ViewManager.inst().open(HCPopUp);
				break;
			case this.soulBtn:
				ViewManager.inst().open(SoulPopUp);
				break;
			case this.levelBtn:
				if(this.time_group.visible)
				{
					if(GameApp.roleGold >= 500)
					{
						GameApp.roleGold -= 500;
						this.time_group.visible = false;
						this.time_num--;
						this.time_label.text = this.time_num + " s";
						clearInterval(this.timeinterval);
						this.btnEffect();
						return;
					}else
					{
						UserTips.inst().showTips("金币不足！");
						return;
					}
				}
				if(!this.time_group.visible)
				{
					egret.Tween.removeTweens(this.levelBtn);
					this.time_num = 300;
					GameConfig.fight_state = "adventure";
					ViewManager.inst().open(AdventureView);
				}
				break;
		}
	}
	private timeinterval;
	private closeLevelBtn()
	{
		this.time_group.visible = true;
		this.levelBtn.source = "levelBtn_lock_png";
		let self = this;
		this.timeinterval = setInterval(()=>{
			self.time_num--;
			self.time_label.text = this.time_num + " s";
			if(self.time_num <= 0)
			{
				self.time_group.visible = false;
				self.levelBtn.source = "levelBtn_png";
			}
		},1000)
	}
	// private expChange(value:number):void{
		
	// }
	/**添加碎片 */
	private onaddShield(evt:CustomEvt):void{
		let datastr:string = egret.localStorage.getItem(LocalStorageEnum.ROLE_DATA) ;
		this.roleInfoData = JSON.parse(datastr);
		let itemVo:RoleInfoVo = this.roleInfoData[evt.data.index+1];
		let obj:any = {};
		obj.ownNum = itemVo.o_suipian;
		obj.totalNum = itemVo.t_suipian;
		obj.role = itemVo.cardModel;
		obj.nameStr = itemVo.name;
		obj.lockLevel = itemVo.unlock;
		// this.arraycollect.source[evt.data.index-1] = obj
		let cardItem:CardItem = this.list.getChildAt(evt.data.index) as CardItem;
		cardItem.refreshItemData(obj);
		// this.list.dataProviderRefreshed();
	}
	private levelChange(value:number):void{
		
		this.maxExp = value*500;
		for(let i:number = 0;i<this.list.$children.length;i++){
			(<CardItem>this.list.$children[i]).refreshLock();
		}
	}
	private roleDataChange(index:number):void{
		let roleData:RoleInfoVo = this.roleInfoData[index];

		// this.levelLab.text = "Lv."+roleData.level;
		let value = roleData.level;
		// let levelIndex:number = 1;
		// if(roleData.level >= 1 && value <= 10){levelIndex = 1}
		// if(value >= 11 && value <= 20){levelIndex = 2}
		// if(value >= 21 && value <= 30){levelIndex = 3}
		// if(value >= 31 && value <= 40){levelIndex = 4}
		// if(value >= 41 && value <= 50){levelIndex = 5}
		// if(value >= 51 && value <= 60){levelIndex = 6}
		// if(value >= 61 && value <= 70){levelIndex = 7}
		// if(value >= 71 && value <= 80){levelIndex = 8}
		// if(value >= 81 && value <= 90){levelIndex = 9}
		this.levelIcon.source = `levelicon_${value}_png`;
		this.nameLab.text = roleData.name;
		this.roleHead.source = roleData.icon;
		this.roleMode.source = roleData.roleModel;
	}
	public close():void{
		if(this.goldWather){this.goldWather.unwatch()}
		if(this.roleDataWatcher){this.roleDataWatcher.unwatch()}
		if(this.expWatcher){this.expWatcher.unwatch()}
		if(this.levelWatcher){this.levelWatcher.unwatch()}
		MessageManager.inst().removeListener(CustomEvt.ADD_SHIELD,this.onaddShield,this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
	}
}
ViewManager.inst().reg(GameMainView,LayerManager.UI_Main);