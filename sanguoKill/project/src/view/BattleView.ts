class BattleView extends BaseEuiView{

	private menuBtn:eui.Button;
	private ownList:eui.List;
	private ownData:eui.ArrayCollection;
	private enemyList:eui.List;
	private enemyData:eui.ArrayCollection;
	private levelBg:eui.Image;
	private rectTop:eui.Rect;
	private rectMiddle:eui.Rect;
	private rectBottom:eui.Rect;
	private watcher:eui.Watcher;
	private watcher2:eui.Watcher;
	// private video:egret.Video;
	public constructor() {
		super();
	}
	public open(...param):void{

		GameApp.battleEnd = false;
		// this.video = new egret.Video();
        // this.video.x = 0;                       //设置视频坐标x
        // this.video.y = 0;                       //设置视频坐标y
        // this.video.width = 640;                 //设置视频宽
        // this.video.height = 320;                //设置视频高
        // this.video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
        // this.video.load("resource/res/video/resultWin.mp4");
        // LayerManager.UI_Pop.addChild(this.video);              //将视频添加到舞台
        // //监听视频加载完成
        // this.video.once(egret.Event.COMPLETE,this.onLoad,this);
        // //监听视频加载失败
        // this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);

		GameApp.roleDeadNum = 0;
		GameApp.enemyDeadNum = 0;

		GameApp.ownDeadState = [0,0,0];
		GameApp.levelDeadState = [0,0,0];
		this.menuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenMenu,this);
		MessageManager.inst().addListener(CustomEvt.SETTINGCLICK,this.onSetting,this);
		MessageManager.inst().addListener(CustomEvt.CLICK_KILL,this.onClickKill,this);
		MessageManager.inst().addListener(CustomEvt.PROP_USE,this.onPropUse,this);
		
		this.rectTop.visible = this.rectMiddle.visible = this.rectBottom.visible = false;
		this.rectTop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRectTouch,this);
		this.rectMiddle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRectTouch,this);
		this.rectBottom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRectTouch,this);
		this.ownList.itemRenderer = OwnHeroItem;
		this.ownData = new eui.ArrayCollection();
		this.ownList.dataProvider = this.ownData;
		/**
		 * 设置我方将领加数据
		 */
		this.ownData.source = UpgradeCfg.ins.getRoleInfo()
		//=======
		let self = this;
		let timeout1 = setTimeout(()=>{
			clearTimeout(timeout1)
			self.ownForbid();
		},300)

		this.enemyList.itemRenderer = EnemyHeroItem;
		this.enemyData = new eui.ArrayCollection();
		this.enemyList.dataProvider = this.enemyData;
		/**设置敌方将领假数据 */
		this.enemyData.source = GameApp.charpter_info[GameApp.curLevel-1];
		//=====

		egret.Tween.get(this.ownList).to({left:20},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.ownList);
		},this)
		egret.Tween.get(this.enemyList).to({right:20},600,egret.Ease.circOut).call(()=>{
			egret.Tween.removeTweens(this.enemyList);
			this.atkNumber = this.judagePriority();
			let timeout = setTimeout(function() {
				clearTimeout(timeout);
				self.showAnimate();
			}, 600);
		},this)

		this.ownList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.enemyList.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onEnemtyTap,this);
		
		this.watcher = eui.Binding.bindHandler(GameApp,["roleDeadNum"],this.onRoleDeadNum,this);
		this.watcher2 = eui.Binding.bindHandler(GameApp,["enemyDeadNum"],this.onEnemyDead,this);
	}
	// private onLoad(e: egret.Event) {
	// 	console.log("video加载完成")
    //     this.video.play();
    //     //获取视频长度
    //     console.log(this.video.length);
    // }
    // private onLoadErr(e: egret.Event) {
    //     console.log("video load error happened");
    // }
    // public play(e: egret.TouchEvent) {
        
    // }
	private onRoleDeadNum(value:number):void{
		if(value == 3){
			//人物死亡
			GameApp.battleEnd = true;
			ViewManager.inst().open(ResultView,[{state:0}])
		}
	}
	private onEnemyDead(value:number):void{
		if(value == 3){
			//关卡死亡
			// let video:egret.Video = new egret.Video(`${VIDEO_EFF_ICON}/resultWin.mp4`,true);
			// video.width = StageUtils.inst().getWidth();
			// video.height = StageUtils.inst().getHeight();
			// LayerManager.UI_Pop.addChild(video);
			// video.play();
			// console.log(video.length);
			GameApp.battleEnd = true;
			ViewManager.inst().open(ResultView,[{state:1}])
		}
	}
	/**item点击了杀 */
	private onClickKill(evt:CustomEvt):void{
		this.rectTop.visible = this.rectMiddle.visible = this.rectBottom.visible = true;
	}
	private onRectTouch(evt:egret.TouchEvent):void{
		this.rectTop.visible = this.rectMiddle.visible = this.rectBottom.visible = false;
	}
	/**使用了道具 */
	private onPropUse(evt:CustomEvt):void{
		let attr:any = evt.data.attr;
		GlobalFun.setBagData(attr.instId);
		//作用全部 。直接使用
		if(attr.forTar == Camp.owner){
			//作用在已方身上
			if(attr.range == 3){
				//己方全体生命值恢复
				for(let i:number = 0;i<3;i++){
					let item:OwnHeroItem = this.ownList.getChildAt(i) as OwnHeroItem;
					if(item && !item.isDead){
						item.addHp = attr.hp;
						if(i == 0){
							this.calculDmgShow(0,item)
						}else{
							this.calculDmgShow(0,item,true)
						}
					}
				}
			}else{
				//单体生命值恢复
				let index:number = evt.data.tarIndex;
				let item:OwnHeroItem = this.ownList.getChildAt(index) as OwnHeroItem;
				item.addHp = attr.hp;
				this.calculDmgShow(0,item)
			}
		}else{
			let icon:string = `role_eff_${this.curSelectCard.itemIndex}_png`;
			ViewManager.inst().open(SkillEffShow,[{icon:icon,pic:attr.instId}]);
			let self = this;
			let timeout = setTimeout(function(attr) {
				clearTimeout(timeout);
					//作用在敌方身上
				if(attr.range == 3){
					if(attr.hurt){
						//当前时针对敌方全体的技能牌 //全体播放特效
						for(let i:number = 0;i<3;i++){
							let item:EnemyHeroItem = self.enemyList.getChildAt(i) as EnemyHeroItem;
							if(item && !item.isDead){
								let value:number = ((self.curSelectCard.attr.atk + ((Math.random()*self.curSelectCard.attr.crit)>>0))*attr.hurt)>>0;
								item.reduceHp = value;
								if(i == 0){
									self.calculDmgShow(value,item)
								}else{
									self.calculDmgShow(value,item,true)
								}
							}
						}
					}
					if(attr.oper == 0 && attr.atk){
						//当前是针对敌方全体的属性值变化 只持续一个回合
						for(let j:number = 0;j<3;j++){
							let item:EnemyHeroItem = self.enemyList.getChildAt(j) as EnemyHeroItem;
							if(item && !item.isDead){
								item.buffAtk = -(item.attr.atk*attr.atk);
								if(j == 0){
									self.calculDmgShow(0,item)
								}else{
									self.calculDmgShow(0,item,true)
								}
							}
						}
					}
				}else{
					if(attr.hurt){
						//对敌人进行单体伤害
						let index:number = evt.data.tarIndex;
						let item:EnemyHeroItem = self.enemyList.getChildAt(index) as EnemyHeroItem;
						if(item){
							let value:number = ((self.curSelectCard.attr.atk + ((Math.random()*self.curSelectCard.attr.crit)>>0))*attr.hurt)>>0;
							item.reduceHp = value
							self.calculDmgShow(value,item)
						}
					}
					if(attr.oper == 0 && attr.atk){
						//对敌人进行单体属性变化 只持续一个回合
						let index:number = evt.data.tarIndex;
						let item:EnemyHeroItem = self.enemyList.getChildAt(index) as EnemyHeroItem;
						if(item && !item.isDead){
							item.buffAtk = -(item.attr.atk*attr.atk);
							self.calculDmgShow(0,item)
						}
					}
				}
			}, 2000,attr);
		}
	}
	private calculDmgShow(reduceValue:number,item,onlyFly:boolean = false):void{
		
		if(!onlyFly){
			this.curSelectCard.isAtk = true;
			this.curOwnAtkCount += 1;
			this.curSelectCard.resetPos();
			GlobalFun.filterToGrey(this.curSelectCard)
		}
		if(reduceValue){
			let flyDmgFont:eui.Label = new eui.Label();
			this.addChild(flyDmgFont);
			flyDmgFont.fontFamily = "yt";
			flyDmgFont.textColor = 0xfc3434;
			flyDmgFont.size = 30;
			let stageP:egret.Point = this.enemyList.localToGlobal(item.x,item.y);
			flyDmgFont.x = stageP.x + 60;
			flyDmgFont.y = stageP.y + 60;
			flyDmgFont.alpha = 0;
			flyDmgFont.text = "-"+reduceValue;
			egret.Tween.get(flyDmgFont).to({alpha:1,y:flyDmgFont.y - 50},300).wait(500).to({alpa:1,y:flyDmgFont.y - 70},1000).call(()=>{
				egret.Tween.removeTweens(flyDmgFont);
				if(flyDmgFont && flyDmgFont.parent){
					flyDmgFont.parent.removeChild(flyDmgFont)
				}
			},this)
		}
		if(!onlyFly){
			if(this.curOwnAtkCount >= 3){
				this.curOwnAtkCount = 0;
				this.ownForbid();
				this.changeAtkTar();
			}else{
				this.changeOwnerFocus()
			}
		}
		
	}
	private curOwnAtkCount:number = 0;
	private curSelectCard:OwnHeroItem;
	private onItemTap(evt:eui.ItemTapEvent):void{
		let item:OwnHeroItem = this.ownList.getChildAt(evt.itemIndex) as OwnHeroItem;
		if(item == this.curSelectCard){
			//相当于初始化了
			return;
		}
		this.initOwnlistPos();
		if(item && !item.isDead && !item.isAtk){
			this.curSelectCard = item;
			item.ready();
		}
	}
	
	/**点击地方 */
	private onEnemtyTap(evt:eui.ItemTapEvent):void{
		if(this.atkNumber == 2){return}
		let item:EnemyHeroItem = this.enemyList.getChildAt(evt.itemIndex) as EnemyHeroItem;
		if(item && !item.isDead && this.curSelectCard && !this.curSelectCard.isAtk){
			this.curSelectCard.isAtk = true;
			this.curOwnAtkCount += 1;
			this.curSelectCard.resetPos();
			GlobalFun.filterToGrey(this.curSelectCard)
			let missBoo:boolean = item.judgeMiss();
			this.onRectTouch(null)
			let reduceHp:number = 0;
			let flyDmgFont:eui.Label = new eui.Label();
			this.addChild(flyDmgFont);
			flyDmgFont.fontFamily = "yt";
			flyDmgFont.textColor = 0xfc3434;
			flyDmgFont.size = 30;
			let stageP:egret.Point = this.enemyList.localToGlobal(item.x,item.y);
			flyDmgFont.x = stageP.x + 60;
			flyDmgFont.y = stageP.y + 60;
			flyDmgFont.alpha = 0;
			if(!missBoo){
				item.shake(200);
				reduceHp = this.curSelectCard.attr.atk + ((Math.random()*this.curSelectCard.attr.crit)>>0);
				item.reduceHp = reduceHp;
				flyDmgFont.text = "-"+reduceHp;
			}else{
				flyDmgFont.text = "Miss";
			}
			if(this.curOwnAtkCount >= this.getOwnLive().length){
				this.curOwnAtkCount = 0;
				this.ownForbid();
				this.changeAtkTar();
			}else{
				this.changeOwnerFocus()
			}
			egret.Tween.get(flyDmgFont).to({alpha:1,y:flyDmgFont.y - 50},300).wait(500).to({alpa:1,y:flyDmgFont.y - 70},1000).call(()=>{
				egret.Tween.removeTweens(flyDmgFont);
				if(flyDmgFont && flyDmgFont.parent){
					flyDmgFont.parent.removeChild(flyDmgFont)
				}
			},this)
		}
	}
	/**初始化我方列表卡牌的位置 */
	private initOwnlistPos():void{
		for(let i:number = 0;i<3;i++){
			let item:OwnHeroItem = this.ownList.getChildAt(i) as OwnHeroItem;
			if(item){
				item.resetPos();
			}
		}
	}
	/**我方禁止点击状态 */
	private ownForbid():void{
		let len:number = this.ownList.$children.length;
		this.ownList.touchEnabled = false;
		this.ownList.touchChildren = false;
		this.ownList.touchThrough = false;
		for(let i:number = 0;i<len;i++){
			let item:OwnHeroItem = this.ownList.getChildAt(i) as OwnHeroItem;
			if(item){
				GlobalFun.filterToGrey(item);
			}
		}
	}
	/**解除我放禁止点击状态 */
	private removeForbid():void{
		let len:number = this.ownList.$children.length;
		this.ownList.touchEnabled = true;
		this.ownList.touchChildren = true;
		this.ownList.touchThrough = true;
		for(let i:number = 0;i<len;i++){
			let item:OwnHeroItem = this.ownList.getChildAt(i) as OwnHeroItem;
			if(item){
				GlobalFun.clearFilters(item);
			}
			
		}
	}
	/**显示攻击提示 */
	private showAnimate():void{
		let imgsource:string = this.atkNumber == 1?"own_atk_title_png":"enemy_atk_title_png";
		let img:eui.Image = new eui.Image();
		img.source = imgsource;
		this.addChild(img);
		img.verticalCenter = 0;
		img.x = this.atkNumber == 1?-600:StageUtils.inst().getWidth()+600;
		let tx:number = (StageUtils.inst().getWidth() - 398)>>1;
		let nx:number = this.atkNumber == 1?StageUtils.inst().getWidth()+600:-600;
		egret.Tween.get(img).to({x:tx},1200,egret.Ease.circOut).wait(500).to({x:nx},1200,egret.Ease.circIn).call(()=>{
			egret.Tween.removeTweens(img);
			if(this.atkNumber == 1){this.removeForbid(),this.changeOwnerFocus()}else{this.startLevelHeroAtk()}
		},this)
	}
	/**切换攻击方 */
	private changeAtkTar():void{
		for(let i:number = 0;i<3;i++){
			//chu shi hua初始化攻击状态
			let item:OwnHeroItem = this.ownList.getChildAt(i) as OwnHeroItem;
			if(!item.isDead){
				item.isAtk = false;
			}
		}
		this.atkNumber = this.atkNumber == 1?2:1;
		this.showAnimate();
	}
	/**切换焦点 */
	private changeOwnerFocus():void{
		let orider:number[] = [1,0,2]
		for(let i:number = 0;i<orider.length;i++){
			let item:OwnHeroItem = this.ownList.getChildAt(orider[i]) as OwnHeroItem;
			if(item && !item.isDead && !item.isAtk){
				this.curSelectCard = item;
				this.curSelectCard.ready();
				break;
			}
		}
	}
	private levelAtkOrder:number[] = [0,2,1];
	private curLevelAtkIndex:number = 0;
	/**开启关卡英雄攻击 */
	private startLevelHeroAtk():void{
		if(GameApp.battleEnd){return}
		this.curSelectCard = null;
		this.ownForbid();
		let item:EnemyHeroItem = this.enemyList.getChildAt(this.levelAtkOrder.shift()) as EnemyHeroItem;
		if(item){
			if(item.isDead){
				this.startLevelHeroAtk();
				return;
			}
			let livearr:OwnHeroItem[] = this.getOwnLive();
			let index:number = (Math.random()*livearr.length)>>0;
			let damageHero:OwnHeroItem = livearr[index];
			if(!damageHero){
				return;
			}
			item.execAtkAction(()=>{
				//当前执行攻击动作
				let missBoo:boolean = damageHero.judgeMiss();
				let reduceHp:number = 0;
				let flyDmgFont:eui.Label = new eui.Label();
				this.addChild(flyDmgFont);
				flyDmgFont.fontFamily = "yt";
				flyDmgFont.textColor = 0xfc3434;
				flyDmgFont.size = 30;
				let stageP:egret.Point = this.ownList.localToGlobal(damageHero.x,damageHero.y);
				flyDmgFont.x = stageP.x + 90;
				flyDmgFont.y = stageP.y + 60;
				flyDmgFont.alpha = 0;
				if(!missBoo){
					damageHero.shake(200);
					reduceHp = item.attr.atk + ((Math.random()*item.attr.crit)>>0) + item.buffAtk;
					damageHero.reduceHp = reduceHp;
					item.buffAtk = 0;
					flyDmgFont.text = "-"+reduceHp;
				}else{
					flyDmgFont.text = "Miss";
				}
				egret.Tween.get(flyDmgFont).to({alpha:1,y:flyDmgFont.y - 50},300).wait(500).to({alpa:1,y:flyDmgFont.y - 70},1000).call(()=>{
					egret.Tween.removeTweens(flyDmgFont);
					if(flyDmgFont && flyDmgFont.parent){
						flyDmgFont.parent.removeChild(flyDmgFont)
					}
				},this)
								
			},()=>{
				//攻击完成
				this.curLevelAtkIndex += 1;
				if(this.curLevelAtkIndex >= this.getEnemyAtkCount()){
					this.curLevelAtkIndex = 0;
					this.levelAtkOrder = [0,2,1]
					//敌方战斗回合结束;
					this.removeForbid();
					this.changeAtkTar();
				}else{
					let self = this;
					let timeout = setTimeout(function() {
						clearTimeout(timeout);
						self.startLevelHeroAtk();
					}, 600);
				}
			},this)
		}
	}
	private getEnemyAtkCount():number{
		let num:number = 0;
		for(let i:number = 0;i<3;i++){
			if(GameApp.levelDeadState[i] == 0){
				num +=1;
			}
		}
		return num;
	}
	/**获取敌方当前活着的英雄 */
	/**获取我方当前存活的英雄 */
	private getOwnLive():OwnHeroItem[]{
		let arr:any[] = [];
		for(let i:number = 0;i<3;i++){
			let item:OwnHeroItem = this.ownList.getChildAt(i) as OwnHeroItem;
			if(!item.isDead){
				arr.push(item);
			}
		}
		return arr;
	}
	//记录当前的攻击方
	private atkNumber:number;
	/**根据敏捷值总和 判断谁先手 1 为我先手 。2为敌方先手*/
	private judagePriority():number{
		let value1:number = 0;
		if(this.ownData.source && this.ownData.source.length){
			for(let i:number = 0;i<this.ownData.source.length;i++){
				value1 += this.ownData.source[i].attr.agile;
			}
		}
		
		let value2:number = 0;
		if(this.enemyData.source && this.enemyData.source.length){
			for(let i:number = 0;i<this.enemyData.source.length;i++){
				value2 += this.enemyData.source[i].attr.agile;
			}
		}
		
		return value1 >= value2?1:2
	}
	private onSetting(evt:CustomEvt):void{
		if(evt.data.oper){
			//点击了继续
		}else{
			//点击了退出
			// let\
		}
	}
	
	private onOpenMenu(evt:egret.TouchEvent):void{
		ViewManager.inst().open(SettingPopUp);
	}
	public close():void{
		if(this.watcher){
			this.watcher.unwatch();
		}
		if(this.watcher2){
			this.watcher2.unwatch();
		}
		this.menuBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenMenu,this);
		MessageManager.inst().removeListener(CustomEvt.SETTINGCLICK,this.onSetting,this);
		MessageManager.inst().removeListener(CustomEvt.CLICK_KILL,this.onClickKill,this);
		this.ownList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemTap,this);
		this.enemyList.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onEnemtyTap,this);
		this.rectTop.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRectTouch,this);
		this.rectMiddle.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRectTouch,this);
		this.rectBottom.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRectTouch,this);
		MessageManager.inst().removeListener(CustomEvt.PROP_USE,this.onPropUse,this);
	}
}
ViewManager.inst().reg(BattleView,LayerManager.UI_Main);