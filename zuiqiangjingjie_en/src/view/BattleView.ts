class BattleView extends BaseEuiView{

	private singleFrame:number = 33.3;
	private gameframe:number = 4000;
	private curGameFrame:number = 0;
	private soldierGroup:eui.Group;
	private enemyGroup:eui.Group;
	private skillGroup:eui.Group;
	private ownEntitys:SoldierEntity[];
	private enemyEntitys:SoldierEntity[];
	private battleCount:number = 0;
	private enemyIndex:number[] = [0,1,2];
	private ownIndex:number[] = [0,1,2];
	private scroller:eui.Scroller;
	private list:eui.List;
	private arrayCollect:eui.ArrayCollection;
	private moveCard:CardBattle;
	private time_num:number;
	private arr_obj:PointObj[]=[];
	private topGroup:eui.Group;
	private shop_btn:eui.Image;
	private back_btn:eui.Image;
	private game_icon:eui.Image;
	private _type:number;

	private player_lc:eui.Label;
	private player_exp:eui.Label;
	private player_cc:eui.Label;
	private npc_lc:eui.Label;
	private npc_exp:eui.Label;
	private npc_cc:eui.Label;
	private fighting_p:eui.BitmapLabel;
	private fighting_n:eui.BitmapLabel;

	private ownHp:number = 0;
	private curOwnHp:number = 0;
	private enemtHp:number = 0;
	private curEnemyHp:number = 0;
	private ownHpCom:HpCom;
	private enemyHpCom:HpCom;
	public constructor() {
		super();
	}
	public open(...param):void{
		if(param[0] && param[0].type){
			this._type = param[0].type;
		}
		egret.Tween.get(this.topGroup).to({y:0},600).call(()=>{
			egret.Tween.removeTweens(this.topGroup);
		},this)
		egret.Tween.get(this.shop_btn).to({right:44},600).call(()=>{
			egret.Tween.removeTweens(this.shop_btn);
		},this)

		egret.Tween.get(this.back_btn).to({bottom:0},600).call(()=>{
			egret.Tween.removeTweens(this.back_btn);
		},this)

		egret.Tween.get(this.skillGroup).to({bottom:0},600).call(()=>{
			egret.Tween.removeTweens(this.skillGroup);
		},this)
		this.touchEnabled = false;
		this.touchChildren = false;
		/**test--- */
		// GameApp.ownSolderis[0].soldierType = 3;
		// GameApp.ownSolderis[0].generalId = 100011

		// GameApp.ownSolderis[1].soldierType = 2;
		// GameApp.ownSolderis[1].generalId = 100001
		// GameApp.ownSolderis[2].soldierType = 1;
		// GameApp.ownSolderis[2].generalId = 100011

		this.fighting_p.textAlign = egret.HorizontalAlign.CENTER;
		this.fighting_n.textAlign = egret.HorizontalAlign.CENTER;
		
		this.game_icon.source = "game_icon" + Math.floor(Math.random()*3) + "_png";
		this.player_lc.text = "" + GameApp.goods;
		this.fighting_p.text =   GameCfg.playerAttack.toString();
		this.fighting_n.text =   GameCfg.npcAttack.toString();

		let num = 0;
		for(let i = 0; i < GameApp.roleInfo.citys.length; i++)
		{
			if(GameApp.roleInfo.citys[i].isOwn)
			{
				num++;
			}
		}
		this.player_cc.text = "" + num;
		this.player_exp.text = ""+ GameApp.exp;

		// this.npc_bl.text = "Soldiers：" + Math.floor(Math.random()*5000 + 5000);
		this.npc_cc.text = "" + Math.floor(Math.random()*1 + 4);
		this.npc_lc.text = "" + Math.floor(Math.random()*20000 + 30000);
		this.npc_exp.text = ""+ Math.floor(Math.random()*300 + 500);

		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;

		this.arrayCollect = new eui.ArrayCollection();
		this.list.dataProvider = this.arrayCollect;
		this.list.itemRenderer = SkillItem;
		this.list.validateNow();
       	this.list.scrollH = 0;
		this.scroller.viewport.scrollH=0;
		this.scroller.bounces=false;

		// let skillCards:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.special_skill,false);
		// this.arrayCollect.source = skillCards;
		// MessageManager.inst().addListener(CustomEvt.CARD_REFRESH,this.onrefresh,this);
		MessageManager.inst().addListener("role_dead",this.roleDead,this);

		this.addTouchEvent(this.shop_btn, this.touchShop,true);
		this.addTouchEvent(this.back_btn, this.touchBack,true);
		
		this.ownEntitys = [];
		this.enemyEntitys = [];
		
		this.createOwnSoldier();
		this.createLevelSoldier(GameCfg.chapter-1,GameCfg.level-1);
		let _ownHp:number = 0;
		for(let i:number = 0;i<this.ownEntitys.length;i++){
			_ownHp += this.ownEntitys[i].soldierAttr.hp
		}
		let _enemyHp:number = 0;
		for(let i:number = 0;i<this.enemyEntitys.length;i++){
			_enemyHp += this.enemyEntitys[i].soldierAttr.hp
		}
		this.curOwnHp = this.ownHp = _ownHp;
		this.curEnemyHp = this.enemtHp = _enemyHp;
		this.ownHpCom.setData(this.curOwnHp,this.ownHp);
		this.ownHpCom.initData('flag_4_png',GameApp.roleInfo.name);
		this.enemyHpCom.setData(this.curEnemyHp,this.enemtHp);
		let index:number = (Math.random()*3+1)>>0;
		let cityInfo:CityInfo = GlobalFun.getCityInfo(GameCfg.chapter);
		let cityName:string = `${NameList.inst().city_name[ GameCfg.chapter ]}`
		this.enemyHpCom.initData(`flag_${index}_png`,cityName?cityName+"Commanding":"Mountain thief");
		this.soldierGroup["autoSize"]();
		this.enemyGroup["autoSize"]();
		this.skillGroup["autoSize"]();
		this.topGroup["autoSize"]();
		this.shop_btn["autoSize"]();
		this.back_btn["autoSize"]();
		this.walkToScene();
		this.addList();
		MessageManager.inst().addListener(CustomEvt.CARD_REFRESH,this.onrefresh,this);
		
		MessageManager.inst().addListener(LocalStorageEnum.RELEASE_SKILLS,this.playSkill,this);
		MessageManager.inst().addListener(LocalStorageEnum.BEGIN_MOVE_CARD, this.beginMove, this);
		MessageManager.inst().addListener(LocalStorageEnum.SEND_BATTLE_POS, this.getPos, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.onGameStart,this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		let percentW:number = StageUtils.inst().getHeight()/750; 
		this.ownHpCom.top *=percentW;
		this.enemyHpCom.top *=percentW;
		this.back_btn.top *=percentW;
	}
	private onGameStart():void{
		egret.startTick(this.execTurnBattle,this)
	}
	private getPos(evt:CustomEvt)
	{
		console.log(evt.data);
		switch(evt.data[0]){
			case 100054:
				//Beauty trap
				let point:XY = evt.data[1][0];
				let localXY:egret.Point = this.enemyGroup.globalToLocal(point.x,point.y);
				for(let i:number = 0;i<this.enemyGroup.numChildren;i++){
					let group:eui.Group = this.enemyGroup.$children[i] as eui.Group;
					if(group && group.numChildren){
						for(let j:number = 0;j<group.numChildren;j++){
							let item:SoldierEntity = group.$children[j] as SoldierEntity;
							if(item){
								item.showWaitState();
							}
						}
						break;
					}
					// if(group.x < localXY.x && localXY.x <= group.x + group.width && group.y < localXY.y && localXY.y <= group.y + group.height){
						
					// }
				}
				break;
			case 100044:
				let point2:XY = evt.data[1][0];
				let localXY2:egret.Point = this.enemyGroup.globalToLocal(point2.x,point2.y);
				let atk:number = GlobalFun.getCardDataFromId(100044,["atk"]).atk;
				let curGroup:eui.Group;
				let index:number;
				for(let i:number = 0;i<this.enemyGroup.numChildren;i++){
					let group:eui.Group = this.enemyGroup.$children[i] as eui.Group;
					if(group && group.numChildren){
						if(group.numChildren){
							curGroup = group;
							index = i;
						}
						for(let j:number = 0;j<group.numChildren;j++){
							let item:SoldierEntity = group.$children[j] as SoldierEntity;
							if(item){
								item.showPosion();
							}
						}
						break;
					}
					// if(group.x < localXY2.x && localXY2.x <= group.x + group.width && group.y < localXY2.y && localXY2.y <= group.y + group.height){
						
					// }
				}
				if(curGroup && (!isNaN(index))){
					let self = this;
					let count:number = 5;
					let interval = setInterval(()=>{
						count -= 1;
						self.floatDmgFont(atk + ((Math.random()*20)>>0),curGroup.$children,index)
						if(count <= 0){
							clearInterval(interval);
						}
					},1000)
				}
				break;
			case 100064:
				this.showSkillDmg(100064);
				break;
			case 100074:
				this.showSkillDmg(100074)
				break;
			case 10008:
				//Use arrow tower skill;
				this.createArrowBuild_0();
				break;
			case 10009:
				//Use the skill of stone throwing cart
				this.createArrowBuild_1();
				break;
		}
		
	}
	private release10008:boolean = false;
	private release10009:boolean = false;
	/**Create arrows */
	private createArrowBuild_0():void{
		if(this.release10008){
			return;
		}
		if(!this.release10008){
			this.release10008 = true;
		}
		let offx:number = 15;
		let percentW:number = StageUtils.inst().getWidth()/1334;
		let percenth:number = StageUtils.inst().getHeight()/750;
		let arrowArr:eui.Image[] = [];
		for(let i:number = 0;i<5;i++){
			let img:eui.Image = new eui.Image();
			img.source = "ta_player_png";
			img.anchorOffsetX = img.width>>1;
			img.anchorOffsetY = img.height;
			// img["autoSize"]();
			this.addChild(img);
			img.x = this.soldierGroup.left + this.soldierGroup.width*percentW - offx*i - 130;
			img.y = this.soldierGroup.top*percenth  + i*(img.height*percentW + 20) + 10;
			img.alpha = 0;
			arrowArr.push(img);
			egret.Tween.get(img).to({alpha:1},600).call(()=>{
				egret.Tween.removeTweens(img);
			},this)
		}
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			for(let j:number = 0;j<20;j++){
				let timeout2 = setTimeout(function() {
					clearTimeout(timeout2);
					for(let i:number = 0;i< arrowArr.length;i++){
						let randomX :number = self.enemyGroup.x + 200 + ((Math.random()*200)>>0);
						let bullet:Bullet = new Bullet(arrowArr[i].x, arrowArr[i].y, randomX, arrowArr[i].y, 0, "game_arrow0_png",()=>{
							let mc:MovieClip = new MovieClip();
							mc.playFile(`${EFFECT}arrow`,1,null,true);
							mc.scaleX = mc.scaleY = 0.5;
							self.addChild(mc);
							mc.x = bullet.x;
							mc.y = bullet.y;
						},self);
						GlobalFun.lighting(bullet)
						self.addChild(bullet);
					}
			    }, 200*j);
			}
		}, 600);

		let cardatk:number = GlobalFun.getCardDataFromId(10008,["atk"]).atk;
		let count = 6;
		let interval = setInterval(()=>{
			count -= 1;
			for(let i:number = 0;i<self.enemyGroup.numChildren;i++){
				let group:eui.Group = self.enemyGroup.$children[i] as eui.Group;
				if(group.numChildren){
					self.floatDmgFont(cardatk + ((Math.random()*20)>>0),group.$children,i);
					group.$children.forEach((item:SoldierEntity)=>{
						if(item){
							item.showHurtMc();
						}
					},self)
				}
			}
			if(count <= 0){
				self.release10008 = false;
				clearInterval(interval);
				for(let i:number = 0;i<arrowArr.length;i++){
					let item = arrowArr[i];
					egret.Tween.get(item).to({alpha:0},600).call(()=>{
						egret.Tween.removeTweens(item);
						if(item && item.parent){
							item.parent.removeChild(item);
						}
					},self)
				}
				arrowArr = []
			}
		},1000)
	}
	/**Create a stone cart */
	private createArrowBuild_1():void{
		if(this.release10009){
			return;
		}
		if(!this.release10009){
			this.release10009 = true;
		}
		let offx:number = 15;
		let percentW:number = StageUtils.inst().getWidth()/1334;
		let percenth:number = StageUtils.inst().getHeight()/750;
		let arrowArr:eui.Image[] = [];
		for(let i:number = 0;i<5;i++){
			let img:eui.Image = new eui.Image();
			img.source = "ta_player_png";
			img.anchorOffsetX = img.width>>1;
			img.anchorOffsetY = img.height;
			// img["autoSize"]();
			this.addChild(img);
			img.x = this.soldierGroup.left + this.soldierGroup.width*percentW - offx*i - 130;
			img.y = this.soldierGroup.top*percenth  + i*(img.height*percentW + 20) + 10;
			img.alpha = 0;
			arrowArr.push(img);
			egret.Tween.get(img).to({alpha:0},600).call(()=>{
				egret.Tween.removeTweens(img);
			},this)
		}
		let self = this;
		let timeout = setTimeout(function() {
			clearTimeout(timeout);
			for(let j:number = 0;j<20;j++){
				let timeout2 = setTimeout(function() {
					clearTimeout(timeout2);
					for(let i:number = 0;i< arrowArr.length;i++){
						let randomX :number = self.enemyGroup.x + 200 + ((Math.random()*200)>>0);
						// let bullet:Bullet = new Bullet((arrowArr[i].x - Math.random()*100), -100, randomX, arrowArr[i].y, 0, "game_arrow1_png",()=>{
						// 	// let mc:MovieClip = new MovieClip();
						// 	// mc.playFile(`${EFFECT}arrow`,1,null,true);
						// 	// mc.scaleX = mc.scaleY = 0.5;
						// 	// self.addChild(mc);
						// 	// mc.x = bullet.x;
						// 	// mc.y = bullet.y;
						// },self);
						let bullet:eui.Image = new eui.Image();
						bullet.source = "game_arrow1_png";
						bullet.x = self.enemyGroup.x + 200 + Math.random()*200;
						bullet.y = -80;
						let scale = Math.random()*0.5 + 0.5
						bullet.scaleX = bullet.scaleY = scale;
						// bullet.rotation = Math.random()*360;

						egret.Tween.get(bullet)
						.to({y:arrowArr[i].y + 80}, 800, egret.Ease.circIn)
						.call(()=>{
							let mc:MovieClip = new MovieClip();
							mc.playFile(`${EFFECT}explode`,1,null,true);
							mc.scaleX = mc.scaleY = (scale - 0.49);
							self.addChildAt(mc, 1);
							mc.x = bullet.x;
							mc.y = bullet.y;
							self.removeChild(bullet);
						}, self)
						 
						GlobalFun.lighting(bullet)
						self.addChild(bullet);
					}
			    }, 200*j);
			}
		}, 800);

		let cardatk:number = GlobalFun.getCardDataFromId(10008,["atk"]).atk;
		let count = 6;
		let interval = setInterval(()=>{
			count -= 1;
			for(let i:number = 0;i<self.enemyGroup.numChildren;i++){
				let group:eui.Group = self.enemyGroup.$children[i] as eui.Group;
				if(group.numChildren){
					self.floatDmgFont(cardatk + ((Math.random()*20)>>0),group.$children,i);
					group.$children.forEach((item:SoldierEntity)=>{
						item.showHurtMc();
					},self)
				}
			}
			if(count <= 0){
				self.release10009 = false;
				clearInterval(interval);
				for(let i:number = 0;i<arrowArr.length;i++){
					let item = arrowArr[i];
					egret.Tween.get(item).to({alpha:0},600).call(()=>{
						egret.Tween.removeTweens(item);
						if(item && item){
							item.parent.removeChild(item);
						}
					},self)
				}
				arrowArr = []
			}
		},1000)
	}
	private showSkillDmg(skillid:number):void{
		let atk:number = GlobalFun.getCardDataFromId(skillid,["atk"]).atk;
		let self = this;
		for(let j:number = 0;j<2;j++){
			let timeout2 = setTimeout(function() {
				clearTimeout(timeout2);
				for(let i:number = 0;i<self.enemyGroup.numChildren;i++){
					let group:eui.Group = self.enemyGroup.$children[i] as eui.Group;
					if(group.numChildren){
						let timeout = setTimeout(function() {
							clearTimeout(timeout)
							self.floatDmgFont(atk+((Math.random()*20)>>0),group.$children,i);
							group.$children.forEach((item:SoldierEntity)=>{
								item.showHurtMc();
							},this)
						}, i*300);
					}
				}
			}, j*300);
		}
	}
	/**
	 * Add tolistdata
	 */
	private addList()
	{
		let precentw:number = StageUtils.inst().getWidth()/1334;
		// this.time_num=egret.setTimeout(function(){
			let skillCards:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.special_skill,false);
			this.removeItem(skillCards);
			this.arrayCollect.source = skillCards;
			this.time_num=null;
	// },this,4000*precentw);
	}
	/**
	 * Start moving cards
	 */
	private beginMove(evt:CustomEvt)
	{
		this.moveCard = new CardBattle(evt.data.card.type, evt.data.card.insId,evt.data.card);
		this.moveCard.x = evt.data.x;
		this.moveCard.y = evt.data.y;
		this.moveCard.visible = false;
		this.addChild(this.moveCard);
	}
	private beginPoint:egret.Point
	private touchBegin(evt:egret.TouchEvent)
	{
		if(!this.beginPoint){
			this.beginPoint = new egret.Point();
			this.beginPoint.x = evt.stageX;
			this.beginPoint.y = evt.stageY;
		}
	}
	/**
	 * In the process of moving the card
	 */
	private touchMove(evt:egret.TouchEvent)
	{
		//this.scroller.viewport.scrollH=0;
		if(!this.moveCard)
			return;
		this.moveCard.x = evt.stageX - this.moveCard.width / 2;
		this.moveCard.y = evt.stageY - this.moveCard.height / 2;
		if(evt.stageY <= StageUtils.inst().getHeight() - 180)
		{
			this.moveCard.visible=true;
		}
		
	}
	/**
	 * Display special effects and skill name
	 */
	private showEff(_id:number,cb:()=>void){
		let speakIndex:number = ((Math.random()*3+1)>>0);
		SoundManager.inst().playOtherEffect(`${MUSIC}hero${speakIndex}.mp3`);
		let rect:eui.Rect = new eui.Rect();
				rect.fillColor = 0x000000;
				rect.width = StageUtils.inst().getWidth();
				rect.height = StageUtils.inst().getHeight();
				rect.alpha = 0.2;
				LayerManager.UI_Main.addChild(rect);

				let group:eui.Group = new eui.Group();
				LayerManager.UI_Main.addChild(group);
				group.scaleX = group.scaleY = 0.8;
				group.verticalCenter = 0;
				group.left = 100;

				let skillBg:eui.Image = new eui.Image("skill_eff_bg_png");
				group.addChild(skillBg);

				let mask:eui.Rect = new eui.Rect();
				group.addChild(mask);
				mask.height = skillBg.height;
				mask.width = 0;
				skillBg.mask = mask;

				egret.Tween.get(mask).to({width:skillBg.width},600).call(()=>{egret.Tween.removeTweens(mask)},this);

				let role:eui.Image = new eui.Image("skill_role_png");
				group.addChild(role);
				role.anchorOffsetX = role.width>>1;
				role.anchorOffsetY = role.height;
				role.x = -100;
				role.y = skillBg.y + skillBg.height - 30;
				role.alpha = 0;
				egret.Tween.get(role).to({x:70,alpha:1},400,egret.Ease.circOut).to({x:120},3000)

				let id:number = _id;
				let eff:string = `skill_eff_${id.toString().substr(0,5)}_png`;
				let img:eui.Image = new eui.Image(eff);
				img.alpha = 0;
				group.addChild(img);

				img.anchorOffsetY = img.height>>1;
				img.verticalCenter = 0;
				img.x = skillBg.x + 450;

				egret.Tween.get(img).to({x:skillBg.x + 240,alpha:1},400,egret.Ease.circOut).to({x:skillBg.x + 200},3000)
				let self = this;
				let timeout = setTimeout(function() {
					egret.Tween.removeTweens(img);
					egret.Tween.removeTweens(role)
					group.parent.removeChild(group);
					rect.parent.removeChild(rect);
					cb();
				}, 1000);
	}
	/**
	 * Display skills
	 */
	private playSkill(evt:any)
	{
			switch(evt.data[0].id)
			{
				case 100074:
					/**Catch bandits first catch the ringleader */
					
				this.showEff(100071,()=>{
					this.arr_obj=[];
					for(let i = 0; i < 8; i++)
					{
						setTimeout(()=>{
							let ani:MovieClip = new MovieClip();
							let randomx=Math.floor(Math.random()*this.enemyGroup.width);
							let randomy=Math.floor(Math.random()*this.enemyGroup.height);

							ani.x = this.enemyGroup.x+randomx;
							ani.y = this.enemyGroup.y+randomy;
							this.arr_obj.push({x:ani.x,y:ani.y});
							if(i==7)
							{
								let obj:any[]=[];
								obj.push(evt.data[0].id);
								obj.push(this.arr_obj);
								MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
							}
							ani.anchorOffsetX=ani.width/2;
							ani.anchorOffsetY=ani.height/2;
							this.addChild(ani);
							ani.playFile(`${EFFECT}wang_effect`, 1, null, true);
						}, i*300);
					}
				})
						
					
					break;
				case 100061:
				case 100062:
				case 100063:
				case 100064:
					this.arr_obj=[];
					/**The sucker */
					this.showEff(evt.data[0].id,()=>{
						for(let i = 0; i < 6; i++)
						{
							setTimeout(()=>{
								let ani:MovieClip = new MovieClip();
								let randomx=Math.floor(Math.random()*this.enemyGroup.width);
								let randomy=Math.floor(Math.random()*this.enemyGroup.height);
								ani.x = this.enemyGroup.x + 200;
								ani.y = this.enemyGroup.y+randomy;
								ani.anchorOffsetX=ani.width/2;
								ani.anchorOffsetY=ani.height/2;
								ani.scaleX = ani.scaleY = 0.5;
								this.addChild(ani);
								this.arr_obj.push({x:ani.x,y:ani.y});
								if(i==5)
								{
									let obj:any[]=[];
									obj.push(evt.data[0].id);
									obj.push(this.arr_obj);
									MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
								}
								ani.playFile(`${EFFECT}adcc_effect`, 1, null, true, "", null, 10);
								
							}, i * 500);
						}
					})
						
					break;
				case 100051:
				case 100052:
				case 100053:
				case 100054:
					this.arr_obj=[];
					/**Beauty trap */
						this.showEff(evt.data[0].id,()=>{
							let ani:MovieClip = new MovieClip();
							ani.x = this.enemyGroup.x+this.enemyGroup.width/2;
							ani.y = this.enemyGroup.y+this.enemyGroup.height/2;
							ani.anchorOffsetX=ani.width/2;
							ani.anchorOffsetY=ani.height/2;
							this.addChild(ani);
							let obj:any[]=[];
							obj.push(evt.data[0].id);
							obj.push(this.arr_obj);
							this.arr_obj.push({x:ani.x,y:ani.y});
							MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
							ani.playFile(`${EFFECT}mrj_effect`, 1, null, true);
						});
					break;
				case 100041:
				case 100042:
				case 100043:
				case 100044:
					this.arr_obj=[];
					/**
					 * Rob the owner while his house is on fire
					 */
					this.showEff(evt.data[0].id,()=>{
						let obj:any[]=[];
						this.arr_obj.push({x:this.enemyGroup.x+this.enemyGroup.width/2,y:this.enemyGroup.y+this.enemyGroup.height/2});
						obj.push(evt.data[0].id);
						obj.push(this.arr_obj);
						MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
					})
					break;
				case 100101:
				case 100102:
				case 100103:
				case 100104:
					this.arr_obj=[];
					/**
					 * Water of life
					 */
					this.showEff(evt.data[0].id,()=>{
							let obj:any[]=[];
							obj.push(evt.data[0].id);
							obj.push(this.arr_obj);
							MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
						})
					break;
				case 10008:
				this.arr_obj=[];
					/**
					 * bartizan
					 */
					this.showEff(evt.data[0].id,()=>{
							let obj:any[]=[];
							obj.push(evt.data[0].id);
							obj.push(this.arr_obj);
							MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
						})
					break;
				case 10009:
				this.arr_obj=[];
					/**
					 * bartizan
					 */
					this.showEff(evt.data[0].id,()=>{
							let obj:any[]=[];
							obj.push(evt.data[0].id);
							obj.push(this.arr_obj);
							MessageManager.inst().dispatch(LocalStorageEnum.SEND_BATTLE_POS,obj);
						})
					break;
				
			}
		
	}
	/**
	 * Click Finish
	 */
	private touchEnd(evt:egret.TouchEvent)
	{
		if(!this.moveCard){return;}
		if(!this.beginPoint || (this.beginPoint && Math.abs(evt.stageY - this.beginPoint.y) <= 100)){MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_MOVE_CARD);this.moveCard = null;return}
		if(Math.floor(this.moveCard.id/10)==10010||Math.floor(this.moveCard.id/10)==1000)
		{
			// if(img.GameUtil.hitPoint(this.soldierGroup,evt.stageX,evt.stageY))
			// // if((evt.stageX<this.stage.stageWidth/2-50)&&(evt.stageY<(this.stage.stageHeight-100))&&(evt.stageY>150))
			// {
				let obj={};
				obj["ownNum"]=this.moveCard.cfg.ownNum-1;
				obj["atk"]=this.moveCard.cfg.atk;
				GlobalFun.refreshCardData(this.moveCard.id,obj);
				this.onrefresh();
				MessageManager.inst().dispatch(LocalStorageEnum.RELEASE_SKILLS, [{type:"gameCard", id:this.moveCard.id, x:evt.stageX, y:evt.stageY}]);
			// }else
			// {
				
			// 	if(!this.moveCard.visible)
			// 	{

			// 	}else
			// 	{
			// 		UserTips.inst().showTips("Not in use area");
			// 	}
			// }
		}else
		{
			// if(img.GameUtil.hitPoint(this.enemyGroup,evt.stageX,evt.stageY))
			// // if((evt.stageX>this.stage.stageWidth/2+50)&&(evt.stageY<(this.stage.stageHeight-100))&&(evt.stageY>150))
			// {
				let obj={};
				obj["ownNum"]=this.moveCard.cfg.ownNum-1;
				obj["atk"]=this.moveCard.cfg.atk;
				GlobalFun.refreshCardData(this.moveCard.id,obj);
				this.onrefresh();
				MessageManager.inst().dispatch(LocalStorageEnum.RELEASE_SKILLS, [{type:"gameCard", id:this.moveCard.id, x:evt.stageX, y:evt.stageY}]);
			// }else
			// {
			// 	if(!this.moveCard.visible)
			// 	{

			// 	}else
			// 	{
			// 		UserTips.inst().showTips("Not in use area");
			// 	}
			// }
		}
		MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_MOVE_CARD);
		
		this.moveCard = null;
	}
	/**
	 * Remove useless data
	 */
	private removeItem(card:CardAttrVo[])
	{
		let obj:CardAttrVo[]=[];
		for(let i=0;i<card.length;i++)
		{
			if(card[i]["insId"]<100041)
			{
				if(card[i]["insId"]==10008 || card[i]["insId"]==10009)
				{

				}else
				{
					obj.push(card[i]);
				}
				
			}
		}
		for(let i=0;i<obj.length;i++)
		{
			card.splice(card.indexOf(obj[i]),1);
		}
		obj=null;
	}
	/**
	 * refresh data
	 */
	private touchShop()
	{
		egret.stopTick(this.execTurnBattle,this);
		ViewManager.inst().open(ShopView,[{route:"battle"}]);
	}
	private touchBack()
	{
		egret.stopTick(this.execTurnBattle,this);
		MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
		ViewManager.inst().open(PauseView,[{type:this._type}]);
	}
	/**Death of soldier entity */
	private roleDead(evt:CustomEvt):void{
		let entitys:SoldierEntity[] = evt.data.camp == 1?this.ownEntitys:this.enemyEntitys;
		for(let i:number = 0;i<entitys.length;i++){
			if(entitys[i] == evt.data.tar){
				entitys.splice(i,1);
				break;
			}
		}
	}
	/**Card refresh */
	private onrefresh():void{
		let skillCards:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.special_skill,false);
		this.removeItem(skillCards);
		this.arrayCollect.source = skillCards;
		this.list.dataProviderRefreshed();
	}
	/**Both sides enter the scene */
	private walkToScene():void{
		SoundManager.inst().playEffect(`${MUSIC}run.mp3`);
		this.changeState(ActionState.RUN,1);
		this.changeState(ActionState.RUN,-1);
		let precentw:number = StageUtils.inst().getWidth()/1334;
		egret.Tween.get(this.soldierGroup).to({left:0},2000*precentw).call(()=>{
			egret.Tween.removeTweens(this.soldierGroup);
			this.changeState(ActionState.STAND,1)
		},this)
		egret.Tween.get(this.enemyGroup).to({right:0},2000*precentw).call(()=>{
			SoundManager.inst().playEffect(`${MUSIC}speak.mp3`);
			egret.Tween.removeTweens(this.enemyGroup);
			this.changeState(ActionState.STAND,-1);
			this.touchEnabled = true;
			this.touchChildren = true;
			egret.startTick(this.execTurnBattle,this);
		},this)

		egret.Tween.get(this.ownHpCom).to({left:240},2000*precentw).call(()=>{
			egret.Tween.removeTweens(this.ownHpCom);
		},this)
		egret.Tween.get(this.enemyHpCom).to({right:240},2000*precentw).call(()=>{
			egret.Tween.removeTweens(this.enemyHpCom);
		},this)
	}
	/**The battle logic of executing turn system */
	private execTurnBattle():boolean{
		this.curGameFrame += this.singleFrame;
		if(this.curGameFrame >= this.gameframe){
			this.curGameFrame = 0;
			this.execBattle();
		}
		return false;
	}
	private execBattle():void{
		if(!this.enemyEntitys.length){
			this.gameWin();
			return;
		}
		if(!this.ownEntitys.length){
			this.gameFail();
			return;
		}
		/**Collection of objects currently executing attack logic */
		let execEntitys:SoldierEntity[] = this.battleCount%2?this.enemyEntitys:this.ownEntitys;
		//Attack group
		
		let atkGroupIndex:number = 0;
		let camp:number = 1;
		if(!(this.battleCount%2)){
			//We
			camp = 1;
			atkGroupIndex = (this.battleCount>>1)>2?(this.battleCount>>1)%3:(this.battleCount>>1);
		}else{
			//enemy
			camp = -1;
			atkGroupIndex = ((this.battleCount - 1)>>1) > 2?((this.battleCount - 1)>>1)%3:((this.battleCount - 1)>>1);
		}
		let atkGroup:SoldierEntity[] = [];
		let execAtkedEntitys:SoldierEntity[] = this.battleCount%2?this.ownEntitys:this.enemyEntitys; 
		let atkedGroup:SoldierEntity[] = [];
		
		this.createAtkedGroup(atkGroupIndex,execEntitys,camp,(group,index)=>{
			 atkGroup = group;
			 if(atkGroup[0].buffWait){
				 this.battleCount += 1;
				 //Speed up waiting time
				 this.curGameFrame += 3000;
				 return;
			 }
			 this.createAtkedGroup(index,execAtkedEntitys,camp*-1,(atkedgrop)=>{
				atkedGroup = atkedgrop;
				 //If the currently attacked array exists
				let parentIndex:number = atkedGroup[0].parentGroupIndex;
				//Offset value
				let offx:number = 10;
				let mainGeneral:SoldierEntity;
				let buffBoo:boolean;
				atkGroup.forEach(item=>{
					if(item.general && item.camp == 1){
						mainGeneral = item;
					}
				})
				
				let attrstr:string[] = [];
				let buffPrompt = 0;
				let buffType:number = 0;
				if(mainGeneral){
					let index:number = (Math.random()*100)>>0;
					if(index >= 30){
						//Activate general talent now
						// mainGeneral.execAtkAction(mainGeneral.generalId);
						buffBoo = true;
						let vo:CardAttrVo = GlobalFun.getCardDataFromId(mainGeneral.generalId);
						attrstr = vo.buffAttr.split("_");
						buffPrompt = vo.buffPrompt;
						buffType = vo.buffCondition;
					}
				}
				let attr:{thp:number,atk:number} = this.calculOwnGroupAtk(atkGroup);
				let tolHp:number = attr.thp;
				let dmage:number = attr.atk;
				let atkType:number = atkGroup[0].soldierAttr.type;
				let atkedType:number = atkedGroup[0].soldierAttr.type;
				let restritIndex:number = this.calculSoldierType(atkType,atkedType);
				dmage += (((dmage*0.15)>>0)*restritIndex)
				
				let dmgboo:boolean = false;
				atkGroup.forEach((item,index)=>{
					// if(buffBoo && mainGeneral && buffType == item.soldierAttr.type && (!item.general)){
					if(buffBoo && mainGeneral  && (!item.general)){
						if(!dmgboo){
							//Show only once
							if(attrstr.indexOf('atk')!= -1){
								dmage += ((dmage*buffPrompt)>>0);
							}
							dmgboo = true;
							attrstr.forEach(str=>{
								let txt:eui.Label = new eui.Label();
								txt.size = 22;
								txt.fontFamily = 'fzbwksjw';
								txt.text = str == "atk"?"Attack promotion":"Defense enhancement";
								item.parent.addChild(txt);
								txt.textColor = 0x00ff00;
								txt.x = mainGeneral.x 
								txt.y = mainGeneral.y - 50 - ((Math.random()*50)>>0);
								GlobalFun.lighting(txt);
								egret.Tween.get(txt).to({y:txt.y - 50},1000).to({alpha:0,y:txt.y - 100},600).call(()=>{
									egret.Tween.removeTweens(txt);
									if(txt && txt.parent){
										txt.parent.removeChild(txt);
									}
								},this)
							},this)
						}
						attrstr.forEach(str=>{
							if(str == "atk"){
								item.showAtkBuff();
							}else{
								item.showDefBuff(buffPrompt);
							}
						},this)
					}
					let group:eui.Group;
					if(item.camp == 1){
						group = this.enemyGroup.getChildAt(parentIndex) as eui.Group;
					}else{
						group = this.soldierGroup.getChildAt(parentIndex) as eui.Group;
					}
					if(group){
						let stageXY:XY = group.parent.localToGlobal(group.x,group.y);
						let localXY:XY = item.parent.globalToLocal(stageXY.x,stageXY.y);
						let standIndex:number = (item.y / 30)>>0;
						item.targetDis = localXY.x + standIndex*item.camp*offx;
						// offx += 5;
					}
					let timeout = setTimeout(function() {
						clearTimeout(timeout)
						// if(buffBoo){
						// 	if(!item.general){item.execAtkAction(mainGeneral.generalId);}
						// }else{
							item.execAtkAction();
						// }
					},(Math.random()*100)>>0);
				},this)
				let self = this;
				//The attacked array performs the attacked state
				let timeout = setTimeout(function() {
					let boo:boolean = false;
					atkedGroup.forEach(item=>{
						item.execAtkedAction();
					},self)
					self.floatDmgFont(dmage,atkedGroup,parentIndex,null,null,null,restritIndex)
				}, 700);
				
				this.battleCount += 1;
			 });
		});
	}
	/**Calculate if there is arms restraint */
	private calculSoldierType(atkType:number,atkedType:number):number{
		if(atkType == SoldierType.SOLDIER_BU && atkedType == SoldierType.SOLDIER_GONG || 
				atkType == SoldierType.SOLDIER_GONG && atkedType == SoldierType.SOLDIER_QI ||
				atkType == SoldierType.SOLDIER_QI && atkedType == SoldierType.SOLDIER_BU){
					//Attacker restraint enemy
					return 1;
		}else if(atkedType == SoldierType.SOLDIER_BU && atkType == SoldierType.SOLDIER_GONG || 
				atkedType == SoldierType.SOLDIER_GONG && atkType == SoldierType.SOLDIER_QI ||
				atkedType == SoldierType.SOLDIER_QI && atkType == SoldierType.SOLDIER_BU){
			return -1;
		}
		return 0;
	}
	
	/**Skill word display */
	private showFont(cnt:string,p:egret.DisplayObjectContainer):void{
		let txt:eui.Label = new eui.Label();
		txt.text = cnt;
		txt.size = 25;
		p.parent.addChild(txt);
		txt.scaleX = txt.scaleY = 4;
		txt.alpha = 0;
		txt.anchorOffsetX = txt.width>>1;
		txt.anchorOffsetY = txt.height>>1;
		txt.x = p.x;
		txt.y = p.y;
		egret.Tween.get(txt).to({scaleX:1,scaleY:1,alpha:1},300,egret.Ease.circIn).wait(500).call(()=>{
			egret.Tween.removeTweens(txt);
			txt.parent.removeChild(txt);
		},this)
	}
	/**Floating blood volume */
	private floatDmgFont(dmage:number,soldierGroup:any[],parentIndex,offx:number = 0,offy:number = 0,fnt:string="",restritIndex:number = 0):eui.Group{
		let group:eui.Group;
		if(!soldierGroup || (soldierGroup && soldierGroup.length == 0)){return}
		if( soldierGroup[0].camp == 1){
			group = this.soldierGroup.getChildAt(parentIndex) as eui.Group;
		}else{
			group = this.enemyGroup.getChildAt(parentIndex) as eui.Group;
		}
		//---Blood volume settlement-
		this.reduceHp(soldierGroup,dmage)
		//------------
		let dmgFont:eui.BitmapLabel = new eui.BitmapLabel();
		if(fnt){
			dmgFont.font = fnt
		}else{
			dmgFont.font = "dmg_fnt";
		}
		group.parent.addChild(dmgFont);
		if(offx){
			let x:number = group.globalToLocal(offx,0).x + 150;
			dmgFont.x = x;
		}else{
			dmgFont.x = group.x;
		}
		
		dmgFont.y = group.y + offy;
		// dmgFont.scaleX = dmgFont.scaleY = 0.7;
		// dmgFont.scaleX *= this.camp;
		if(restritIndex == 1){
			dmgFont.text = "c-" + dmage;
		}else{
			dmgFont.text = "-" + dmage;
		}
		
		egret.Tween.get(dmgFont).to({y:dmgFont.y - 100,alpha:0},2000).call(()=>{
			egret.Tween.removeTweens(dmgFont)
			dmgFont.parent.removeChild(dmgFont);
		},this)
		return group;
	}
	private reduceHp(soldierGroup,dmage):void{
		let maingeneral:SoldierEntity = null;
		let soldier:SoldierEntity = null;
		for(let i:number = 0;i<soldierGroup.length;i++){
			if(soldierGroup[i].general){
				maingeneral = soldierGroup[i];
			}else{
				soldier = soldierGroup[i];
			}
		}
		if(!soldier && maingeneral){
			if( soldierGroup[0].camp == 1){
				if(dmage > maingeneral.hp){
					this.curOwnHp -= maingeneral.hp;
				}else{
					this.curOwnHp -= dmage;
				}
				this.ownHpCom.setData(this.curOwnHp,this.ownHp);
			}else{
				if(dmage > maingeneral.hp){
					this.curEnemyHp -= maingeneral.hp;
				}else{
					this.curEnemyHp -= dmage;
				}
				this.enemyHpCom.setData(this.curEnemyHp,this.enemtHp);
			}
			maingeneral.reduceHp(dmage);
		}
		if(!maingeneral && soldier && soldier.soldierAttr && soldier.soldierAttr.hp){
			let num:number = (dmage/soldier.soldierAttr.hp)>>0;
			for(let i:number = 0;i<num;i++){
				let index:number = ((Math.random()*soldierGroup.length)>>0);
				let entity:SoldierEntity = soldierGroup[index];
				if(entity.camp == 1){
					if(dmage > entity.hp){
						this.curOwnHp -= entity.hp
					}else{
						this.curOwnHp -= dmage;
					}
					this.ownHpCom.setData(this.curOwnHp,this.ownHp);
				}else{
					if(dmage > entity.hp){
						this.curEnemyHp -= entity.hp
					}else{
						this.curEnemyHp -= dmage;
					}
					this.enemyHpCom.setData(this.curEnemyHp,this.enemtHp);
				}
				
				entity.reduceHp(soldier.soldierAttr.hp);
			}
		}
		if(maingeneral && soldier && soldier.soldierAttr && soldier.soldierAttr.hp){
			let mainDmg:number = (dmage*0.3)>>0;
			if(maingeneral.camp == 1){
				if(dmage > maingeneral.hp){
					this.curOwnHp -= maingeneral.hp
				}else{
					this.curOwnHp -= dmage;
				}
				this.ownHpCom.setData(this.curOwnHp,this.ownHp);
			}else{
				if(dmage > maingeneral.hp){
					this.curEnemyHp -= maingeneral.hp
				}else{
					this.curEnemyHp -= dmage;
				}
				this.enemyHpCom.setData(this.curEnemyHp,this.enemtHp);
			}
			maingeneral.reduceHp(mainDmg);
			let soldierDmg:number = (dmage*0.7)>>0;
			let num:number = (soldierDmg/soldier.soldierAttr.hp)>>0;
			for(let i:number = 0;i<num;i++){
				let index:number = ((Math.random()*soldierGroup.length)>>0);
				let entity:SoldierEntity = soldierGroup[index];
				if(!entity.general){
					if(entity.camp == 1){
						if(dmage > entity.hp){
							this.curOwnHp -= entity.hp
						}else{
							this.curOwnHp -= dmage;
						}
						this.ownHpCom.setData(this.curOwnHp,this.ownHp);
					}else{
						if(dmage > entity.hp){
							this.curEnemyHp -= entity.hp
						}else{
							this.curEnemyHp -= dmage;
						}
						this.enemyHpCom.setData(this.curEnemyHp,this.enemtHp);
					}
					entity.reduceHp(soldier.soldierAttr.hp);
				}
			}
		}
	}
	/**Calculate the attack power of the corresponding array And the current total blood volume */
	private calculOwnGroupAtk(group):{thp:number,atk:number}{
		let tolHp:number = 0;
		let dmage:number = ((Math.random()*20)>>0);
		let boo:boolean = false;
		group.forEach(item=>{
			tolHp += item.hp;
			dmage += item.soldierAttr.atk;
		},self)
		return {thp:tolHp,atk:dmage}
	}
	private createAtkedGroup(atkGroupindex:number,entitys:SoldierEntity[],camp:number,cb?:(groups,_newIndex)=>void,):SoldierEntity[]{
		let groups:SoldierEntity[] = [];
		entitys.forEach(item=>{if(item.parentGroupIndex == atkGroupindex){groups.push(item)}},this) ;
		let _newIndex:number = atkGroupindex;
		if(!groups.length){
			if(camp == -1){
				//The current enemy
				let index:number = this.enemyIndex.indexOf(atkGroupindex);
				if(index != -1){
					this.enemyIndex.splice(index,1);
				}
				if(this.enemyIndex.length){
					let newIndex:number = this.enemyIndex[0];
					_newIndex = newIndex;
					this.createAtkedGroup(newIndex,entitys,camp,cb);
				}else{
					return [];
				}
			}else{
				//We are now
				let index:number = this.ownIndex.indexOf(atkGroupindex);
				if(index != -1){
					this.ownIndex.splice(index,1);
				}	
				if(this.ownIndex.length){
					let newIndex:number = this.ownIndex[0];
					_newIndex = newIndex;
					this.createAtkedGroup(newIndex,entitys,camp,cb);
				}else{
					return [];
				}
			}
		}else{
			if(cb){cb(groups,_newIndex)}
			return groups;
		}
	}
	/**Game win */
	private gameWin():void{
		egret.stopTick(this.execTurnBattle,this);
		console.log("Game win");
		/**victory */
		ViewManager.inst().close(ShopView);
		ViewManager.inst().close(PauseView);
		let timeout = setTimeout(()=>{
			clearTimeout(timeout);
			SoundManager.inst().playEffect(`${MUSIC}win.mp3`)
			ViewManager.inst().open(ResultView, [{state:"win",type:this._type,cb:(type)=>{
				ViewManager.inst().close(BattleView);
				if(type){
					GlobalFun.changeCityInfo(type,{isEnemy:false})
				}
				ViewManager.inst().open(GameMainView,[{type:this._type}]);
			},arg:this}]);
		}, 1000);
	}
	/**Game failure */
	private gameFail():void{
		egret.stopTick(this.execTurnBattle,this);
		console.log("Game failure");
		ViewManager.inst().close(ShopView);
		ViewManager.inst().close(PauseView);
		let timeout = setTimeout(()=>{
			clearTimeout(timeout);
			ViewManager.inst().open(ResultView, [{state:"fail",type:this._type,cb:(type)=>{
				ViewManager.inst().close(BattleView);
				if(type){
					GlobalFun.changeCityInfo(type,{isEnemy:false})
				}
				ViewManager.inst().open(GameMainView,[{type:this._type}]);
			},arg:this}]);
		}, 1000);
	}
	/**Change the sequence frame state of solid object */
	private changeState(state:string,camp:number):void{
		let entitys:SoldierEntity[] = camp == 1?this.ownEntitys:this.enemyEntitys;
		entitys.forEach(item=>{
			item.changeRoleAction(state);
		},this)
	}
	private createLevelSoldier(biglevel:number,smallLevel:number):void{
		let levelcfg:SoldierRect[] = GameCfg.levelCfg[biglevel][smallLevel];
		let group:eui.Group = GlobalFun.getFormation(levelcfg,1,this.enemyEntitys).group;
		group.right = -370;
		let percentW:number = StageUtils.inst().getHeight()/750; 
		group.top = 190*percentW;
		this.enemyGroup = group;
		this.addChildAt(group,2);

		// for(let i:number = 0;i<levelcfg.length;i++){
		// 	let itemcfg:SoldierRect = GameApp.ownSolderis[i];
		// 	this.createway2(itemcfg,i,-1);
		// }
	}
	/**Create our camp test*/
	private createOwnSoldier():void{
		let group:eui.Group = GlobalFun.getFormation(GameApp.ownSolderis,0,this.ownEntitys).group;
		group.left = -370;
		let percentH:number = StageUtils.inst().getHeight()/750; 
		group.top = 190*percentH;
		this.soldierGroup = group;
		this.addChildAt(group,1);
		// for(let i:number = 0;i<GameApp.ownSolderis.length;i++){
		// 	let itemcfg:SoldierRect = GameApp.ownSolderis[i];
		// 	this.createway2(itemcfg,i,1);
		// }
	}
	public close():void{
		egret.stopTick(this.execTurnBattle,this);
		if(this.time_num)
		{
			egret.clearTimeout(this.time_num);
		}
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.onGameStart,this);
		MessageManager.inst().removeListener(CustomEvt.CARD_REFRESH,this.onrefresh,this);
		MessageManager.inst().removeListener(LocalStorageEnum.BEGIN_MOVE_CARD, this.beginMove, this);
		MessageManager.inst().removeListener(LocalStorageEnum.SEND_BATTLE_POS, this.getPos, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		MessageManager.inst().removeListener(CustomEvt.CARD_REFRESH,this.onrefresh,this);
		MessageManager.inst().removeListener("role_dead",this.roleDead,this);
		this.removeTouchEvent(this.shop_btn, this.touchShop);
		this.removeTouchEvent(this.back_btn, this.touchBack);
	}
}
ViewManager.inst().reg(BattleView,LayerManager.UI_Main);