class GameView extends BaseEuiView
{
	private gb:eui.Rect;
	private bb:eui.Rect;
	private qb:eui.Rect;
	private bb_num:eui.Label;
	private gb_num:eui.Label;
	private qb_num:eui.Label;
	private player_lc:eui.Label;
	private player_bl:eui.Label;
	private player_cc:eui.Label;
	private npc_lc:eui.Label;
	private npc_bl:eui.Label;
	private npc_cc:eui.Label;
	private df_label:eui.Label;
	private fighting_p:eui.BitmapLabel;
	private fighting_n:eui.BitmapLabel;
	private fight_btn:eui.Image;

	private scroller:eui.Scroller;
	private list:eui.List;
	private cardAny_qian:CardAttrVo[] = [];
	private cardAny_hou:CardAttrVo[] = [];
	private moveCard:any;
	private pp:PlayerPhalanx[] = [];
	private np:NpcPhalanx[] = [];

	private tip_group:eui.Group;
	private up_group:eui.Group;

	private player_tiao:eui.Rect;
	private player_mask:eui.Rect;
	private npc_tiao:eui.Rect;
	private npc_mask:eui.Rect;
	private card_group:eui.Group;
	private game_icon:eui.Image;
	private shop_btn:eui.Image;
	private back_btn:eui.Image;
	private jiantou:eui.Image;
	private posrect:eui.Rect;
	private _type:number;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		this.init();
		if(param[0] && param[0].type){
			this._type = param[0].type;
		}
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.addTouchEvent(this.fight_btn, this.touchFight);
		this.addTouchEvent(this.shop_btn, this.touchShop);
		this.addTouchEvent(this.back_btn, this.touchBack);
		MessageManager.inst().addListener(LocalStorageEnum.CREATE_MOVE_ROLE, this.createMove, this);
		MessageManager.inst().addListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateCard, this);
		MessageManager.inst().addListener(LocalStorageEnum.CREATE_MOVE_BUILD, this.createBuild, this);
		MessageManager.inst().addListener(LocalStorageEnum.SWITCH_NPC, this.switchNpc, this);
		MessageManager.inst().addListener(LocalStorageEnum.SWITCH_PLAPER, this.switchPlayer, this);
		MessageManager.inst().addListener(LocalStorageEnum.CREATE_BULLET, this.createBullet, this);
		MessageManager.inst().addListener(LocalStorageEnum.CREATE_MOVE_SKILL, this.createSkill, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
		MessageManager.inst().addListener(CustomEvt.CARD_REFRESH, this.updateCard, this);
	}
	public close():void{
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.removeTouchEvent(this.fight_btn, this.touchFight);
		this.removeTouchEvent(this.shop_btn, this.touchShop);
		this.removeTouchEvent(this.back_btn, this.touchBack);
		MessageManager.inst().removeListener(LocalStorageEnum.CREATE_MOVE_ROLE, this.createMove, this);
		MessageManager.inst().removeListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateCard, this);
		MessageManager.inst().removeListener(LocalStorageEnum.CREATE_MOVE_BUILD, this.createBuild, this);
		MessageManager.inst().removeListener(LocalStorageEnum.SWITCH_NPC, this.switchNpc, this);
		MessageManager.inst().removeListener(LocalStorageEnum.SWITCH_PLAPER, this.switchPlayer, this);
		MessageManager.inst().removeListener(LocalStorageEnum.CREATE_BULLET, this.createBullet, this);
		MessageManager.inst().removeListener(LocalStorageEnum.CREATE_MOVE_SKILL, this.createSkill, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);

		egret.Tween.removeAllTweens();
		GameCfg.gameStart = false;
		GameCfg.wjAny = [];
		GameCfg.playerPH = GameCfg.playerPH_max = 0;
		GameCfg.npcPH = GameCfg.npcPH_max = 0;
		if(!GameCfg.gameStart)
		{
			if(GameCfg.level != 4)
			{
				GameApp.goods += (GameCfg.level * 100);
			}else
			{
				GameApp.medal += 1;
			}
			for(let i = 0; i < this.pp.length; i++)
			{
				if(egret.getQualifiedClassName(this.pp[i].soldierQian[0]) == "Player")
				{
					if(this.pp[i].soldierQian[0].id == 1)
						GameApp.soldier1Num += 20;
					else if(this.pp[i].soldierQian[0].id == 2)
						GameApp.soldier2Num += 20;
					else if(this.pp[i].soldierQian[0].id == 3)
						GameApp.soldier3Num += 20;
					
				}else if(egret.getQualifiedClassName(this.pp[i].soldierQian[0]) == "Build")
				{
					let card:CardAttrVo = GlobalFun.getCardDataFromId(this.pp[i].soldierQian[0].id);
					GlobalFun.refreshCardData(card.insId, {ownNum:card.ownNum});
				}
			}
		}
		for(let i = 0; i < this.pp.length; i++)
		{
			this.pp[i].removeMySelf();
			this.pp.splice(i,1);
			i--;
		}
		for(let i = 0; i < this.np.length; i++)
		{
			this.np[i].removeMySelf();
			this.np.splice(i,1);
			i--;
		}
		
	}
	private gameStart()
	{
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		egret.Tween.resumeTweens(this);
		egret.Tween.resumeTweens(this.np[0]);
		egret.Tween.resumeTweens(this.pp[0]);
	}
	private gamePause()
	{
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		egret.Tween.pauseTweens(this);
		egret.Tween.pauseTweens(this.np[0]);
		egret.Tween.pauseTweens(this.pp[0]);
	}
	private touchShop()
	{
		ViewManager.inst().open(ShopView);
	}
	private touchBack()
	{
		MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
		ViewManager.inst().open(PauseView,[{type:this._type}]);
	}
	private init()
	{
		this.card_group["autoSize"]();
		this.up_group["autoSize"]();
		this.tip_group["autoSize"]();
		this.game_icon.source = "game_icon" + Math.floor(Math.random()*3) + "_png";
		this.player_lc.text = "material：" + GameApp.goods;
		this.fighting_p.text = "Combat effectiveness：" + GameCfg.playerAttack;
		this.fighting_n.text = "Combat effectiveness：" + GameCfg.npcAttack;
		let num = 0;
		for(let i = 0; i < GameApp.roleInfo.citys.length; i++)
		{
			if(GameApp.roleInfo.citys[i].isOwn)
			{
				num++;
			}
		}
		this.player_cc.text = "City：" + num;

		this.npc_bl.text = "Soldiers：" + Math.floor(Math.random()*5000 + 5000);
		this.npc_cc.text = "City：" + Math.floor(Math.random()*1 + 4);
		this.npc_lc.text = "material：" + Math.floor(Math.random()*20000 + 30000);
		// this.posrect["autoSize"]();
		/**Create a player's court */
		for(let i = 0; i < 3; i++)
		{
			this.pp[i] = new PlayerPhalanx(i);
			this.pp[i].x = 367 - i * 183;
			this.pp[i].y = this.posrect.top - 20;
			this.pp[i]["phalanxSize"]();
			this.addChild(this.pp[i]);
		}
		/**Create enemy site */
		for(let i = 0; i < 3; i++)
		{
			this.np[i] = new NpcPhalanx(i);
			this.np[i].x = 967 - (150 - i * 183);
			this.np[i].y = this.posrect.top - 20;
			this.np[i]["phalanxSize"]();
			this.addChild(this.np[i]);
		}
		let self = this;
		window.onorientationchange = function(){
			self.card_group["autoSize"]();
			self.up_group["autoSize"]();
			// self.tip_group["autoSize"]();
			// self.posrect["autoSize"]();
			for(let i = 0; i < 3; i++)
			{
				self.pp[i].x = 367 - i * 183;
				self.pp[i].y = self.posrect.top - 20;
				self.pp[i]["phalanxSize"]();

				self.np[i].x = 967 - (150 - i * 183);
				self.np[i].y = self.posrect.top - 20;
				self.np[i]["phalanxSize"]();
			}
			// self.posrect["autoSize"]();
            // for(let i = 0; i < 3; i++)
			// {
			// 	if(window.orientation == 0||window.orientation == 180){
			// 		self.np[i].y = self.posrect.y + 40;
			// 		self.pp[i].y = self.posrect.y + 40;
			// 	}else{
			// 		self.np[i].y = self.posrect.y - 40;
			// 		self.pp[i].y = self.posrect.y - 40;
			// 	}
				
			// }
        }
		this.opening();

		this.bb_num.text = GameApp.soldier3Num + "";
		this.qb_num.text = GameApp.soldier1Num + "";
		this.gb_num.text = GameApp.soldier2Num + "";

		this.list.itemRenderer = GameCardItem;
		this.updateCard();
		this.scroller.scrollPolicyV = "off";

		this.player_tiao.mask = this.player_mask;
		this.npc_tiao.mask = this.npc_mask;

		this.addChild(this.fight_btn);
		this.addChild(this.card_group);
		this.addChild(this.back_btn);
	}
	
	private opening()
	{
		this.up_group.y = -this.up_group.height;
		egret.Tween.get(this.up_group)
		.wait(500)
		.to({y:0}, 500);
		this.card_group.y = StageUtils.inst().getHeight();
		egret.Tween.get(this.card_group)
		.wait(500)
		.to({y:StageUtils.inst().getHeight() - this.card_group.height}, 500);

		egret.Tween.get(this)
		.wait(800)
		.call(()=>{
			this.df_label.visible = true;
		})

		this.fight_btn.scaleX = this.fight_btn.scaleY = 0;
		egret.Tween.get(this.fight_btn)
		.wait(2000)
		.to({scaleX:1, scaleY:1}, 500, egret.Ease.backInOut);


		this.tip_group.x = -600;
		this.addChildAt(this.tip_group, 9999999);
		egret.Tween.get(this.tip_group)
		.wait(1000)
		.to({x:this.pp[0].x + this.pp[0].width / 2, y:this.pp[0].y}, 500)
		.wait(300)
		.call(()=>{
			this.jiantou.visible = true;
			this.addChild(this.df_label);
			egret.Tween.get(this.jiantou, {loop:true})
			.to({y:this.jiantou.y + 5}, 100)
			.to({y:this.jiantou.y}, 100)
			.to({y:this.jiantou.y - 5}, 100)
			.to({y:this.jiantou.y}, 100)
		}, this);
		
	}
	private updateCard()
	{
		this.cardAny_qian = [];
		this.cardAny_hou = [];
		for(let i = 0; i < GameApp.cardInfo.length; i++)
		{
			if(GameApp.cardInfo[i].ownNum >= 1)
			{
				if(GameApp.cardInfo[i].type == CardType.build || GameApp.cardInfo[i].type == CardType.general || GameApp.cardInfo[i].insId == 10003)
				{
					this.cardAny_qian.push(GameApp.cardInfo[i]);
				}else
				{
					this.cardAny_hou.push(GameApp.cardInfo[i]);
				}
			}
		}
		if(GameCfg.gameStart)
			this.list.dataProvider = new eui.ArrayCollection(this.cardAny_hou);
		else 
			this.list.dataProvider = new eui.ArrayCollection(this.cardAny_qian); 
	}
	private update()
	{
		this.bb_num.text = GameApp.soldier3Num + "";
		this.qb_num.text = GameApp.soldier1Num + "";
		this.gb_num.text = GameApp.soldier2Num + "";
		this.fighting_p.text = "Combat effectiveness：" + GameCfg.playerAttack;
		this.fighting_n.text = "Combat effectiveness：" + GameCfg.npcAttack;

		if(GameCfg.gameStart)
		{
			this.player_mask.width = GameCfg.playerPH * (this.player_tiao.width / GameCfg.playerPH_max);
			this.npc_mask.width = GameCfg.npcPH * (this.npc_tiao.width / GameCfg.npcPH_max);
		}
		if(!GameCfg.gameStart)
		{
			let num = 0;
			for(let i = 0; i < this.pp.length; i++)
			{
				num += this.pp[i].soldierQian.length;
			}
			this.player_bl.text = "Soldiers：" + num;
		}

	}
	private switchNpc()
	{
		for(let i = 0; i < this.np.length; i++)
		{
			if(this.np[i].haveObj == false)
			{
				this.np.splice(i, 1);
				i--;
			}
		}
		if(this.np.length <= 0)
		{
			/**victory */
			setTimeout(()=>{
				ViewManager.inst().open(ResultView, [{state:"win",type:this._type,cb:(type)=>{
					ViewManager.inst().close(GameView);
					if(type){
						GlobalFun.changeCityInfo(type,{isEnemy:false})
					}
					ViewManager.inst().open(GameMainView,[{type:this._type}]);
				},arg:this}]);
			}, 1000);
		}else
		{
			egret.Tween.get(this.np[0])
			.to({x:StageUtils.inst().getWidth() - (150 + this.np[0].width)}, 500)
			.call(()=>{
				this.np[0].id = 0;
				MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, this);
			});
		}
	}
	private switchPlayer()
	{
		for(let i = 0; i < this.pp.length; i++)
		{
			if(this.pp[i].haveObj == false)
			{
				this.pp.splice(i, 1);
				i--;
			}
		}
		if(this.pp.length <= 0)
		{
			/**fail */
			setTimeout(()=>{
				ViewManager.inst().open(ResultView, [{state:"fail",type:this._type,cb:(type)=>{
					ViewManager.inst().close(GameView);
					if(type){
						GlobalFun.changeCityInfo(type,{isEnemy:false})
					}
					ViewManager.inst().open(GameMainView,[{type:this._type}]);
				},arg:this}]);
			}, 1000);
		}else
		{
			egret.Tween.get(this.pp[0])
			.to({x:150}, 500)
			.call(()=>{
				this.pp[0].id = 0;
				MessageManager.inst().dispatch(LocalStorageEnum.GAME_START, this);
			});
		}
	}
	private touchFight()
	{
		let num = 0;
		for(let i = 0; i < this.pp.length; i++)
		{
			if(this.pp[i].have)
			{
				num++;
			}
		}
		if(num==0)
		{
			UserTips.inst().showTips("Please deploy your troops");
			return;
		}
		for(let i = 0; i < this.pp.length; i++)
		{
			if(this.pp[i].haveObj == false)
			{
				this.pp[i].id = -1;
				this.removeChild(this.pp[i]);
				this.pp.splice(i, 1);
				i--;
			}
		}
		for(let i = 0; i < this.pp.length; i++)
		{
			this.pp[i].id = i;
		}
		this.list.dataProvider = new eui.ArrayCollection(this.cardAny_hou);
		GlobalFun.filterToGrey(this.bb);
		GlobalFun.filterToGrey(this.gb);
		GlobalFun.filterToGrey(this.qb);
		this.fight_btn.visible = false;
		MessageManager.inst().dispatch(LocalStorageEnum.GO_FIGHTING, this);
		GameCfg.gameStart = true;
		GameCfg.pp = this.pp;
		GameCfg.np = this.np;
		this.tip_group.visible = false;
		this.df_label.visible = false;
		GameApp.year += 1;
	}
	private touchBegin(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.bb:
				if(GameCfg.gameStart)
				{
					UserTips.inst().showTips("Not to be used");
					return;
				}
				if(GameApp.soldier3Num < 20)
				{
					UserTips.inst().showTips("Insufficient infantry");
					return;
				}
				this.moveCard = new PlayerCard(3);
				this.moveCard.x = evt.stageX;
				this.moveCard.y = evt.stageY;
				this.addChild(this.moveCard);
				break;
			case this.gb:
				if(GameCfg.gameStart)
				{
					UserTips.inst().showTips("Not to be used");
					return;
				}
				if(GameApp.soldier2Num < 20)
				{
					UserTips.inst().showTips("Insufficient bowmen");
					return;
				}
				this.moveCard = new PlayerCard(2);
				this.moveCard.x = evt.stageX;
				this.moveCard.y = evt.stageY;
				this.addChild(this.moveCard);
				break;
			case this.qb:
				if(GameCfg.gameStart)
				{
					UserTips.inst().showTips("Not to be used");
					return;
				}
				if(GameApp.soldier1Num < 20)
				{
					UserTips.inst().showTips("Insufficient bowmen");
					return;
				}
				this.moveCard = new PlayerCard(1);
				this.moveCard.x = evt.stageX;
				this.moveCard.y = evt.stageY;
				this.addChild(this.moveCard);
				break;
		}
	}
	private touchMove(evt:egret.TouchEvent)
	{
		if(!this.moveCard)
			return;
		this.moveCard.x = evt.stageX - this.moveCard.width / 2;
		this.moveCard.y = evt.stageY - this.moveCard.height / 2;
		if(evt.stageY <= StageUtils.inst().getHeight() - 180)
		{
			this.moveCard.visible=true;
		}
		for(let i = 0; i < this.pp.length; i++)
		{
			if(evt.stageX >= this.pp[i].x && evt.stageX <= this.pp[i].x + this.pp[i].width && 
			   evt.stageY >= this.pp[i].y && evt.stageY <= this.pp[i].y + this.pp[i].height)
			{
				this.pp[i].setBg(2);
			}else 
			{
				this.pp[i].setBg(1);
			}
		}
		for(let i = 0; i < this.np.length; i++)
		{
			if(evt.stageX >= this.np[i].x && evt.stageX <= this.np[i].x + this.np[i].width && 
			   evt.stageY >= this.np[i].y && evt.stageY <= this.np[i].y + this.np[i].height)
			{
				this.np[i].setBg(2);
			}else 
			{
				this.np[i].setBg(1);
			}
		}
	}
	private touchEnd(evt:egret.TouchEvent)
	{
		switch(egret.getQualifiedClassName(this.moveCard))
		{
			case "PlayerCard":
				MessageManager.inst().dispatch(LocalStorageEnum.CREATE_PLAYER, [{type:"player", id:this.moveCard.id, x:evt.stageX, y:evt.stageY}]);
				break;
			case "BuildCard":
				MessageManager.inst().dispatch(LocalStorageEnum.CREATE_PLAYER, [{type:"build", id:this.moveCard.id, x:evt.stageX, y:evt.stageY}]);
				break;
			case "GameCard":
				MessageManager.inst().dispatch(LocalStorageEnum.RELEASE_SKILLS, [{type:"gameCard", id:this.moveCard.id, x:evt.stageX, y:evt.stageY}]);
				break;
		}
		// egret.getQualifiedClassName(this.moveCard);
		MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_MOVE_CARD);
		for(let i = 0; i < this.pp.length; i++)
		{
			this.pp[i].setBg(1);
		}
		for(let i = 0; i < this.np.length; i++)
		{
			this.np[i].setBg(1);
		}
		this.moveCard = null;
	}
	private createMove(evt:CustomEvt)
	{
		this.moveCard = new PlayerCard(evt.data.card);
		this.moveCard.x = evt.data.x;
		this.moveCard.y = evt.data.y;
		this.moveCard.visible = false;
		this.addChild(this.moveCard);
	}
	private createBuild(evt:CustomEvt)
	{
		this.moveCard = new BuildCard(evt.data.card);
		this.moveCard.x = evt.data.x;
		this.moveCard.y = evt.data.y;
		this.moveCard.visible = false;
		this.addChild(this.moveCard);
	}
	/**Create a bullet */
	private createBullet(evt:CustomEvt)
	{
		let bullet:Bullet;
		let nx:number;
		switch(evt.data.type)
		{
			case "player":
				if(this.np[0].soldierQian.length > 0)
				{
					nx = this.np[0].x + this.np[0].soldierQian[0].x;
				}else
				{
					nx = this.np[0].x + this.np[0].soldierHou[0].x;
				}
				bullet = new Bullet(this.pp[0].x + evt.data.x, this.pp[0].y + evt.data.y, nx + 30, this.pp[0].y + evt.data.y, 0, evt.data.img);
				this.addChild(bullet);
				break;
			case "npc":
				if(this.pp[0].soldierQian.length > 0)
				{
					nx = this.pp[0].soldierQian[0].x;
				}else
				{
					nx = this.pp[0].soldierHou[0].x;
				}
				bullet = new Bullet(this.np[0].x + evt.data.x, this.np[0].y + evt.data.y, nx + 130, this.np[0].y + evt.data.y, 0, evt.data.img);
				this.addChild(bullet);
				break;
		}
	}
	private createSkill(evt:CustomEvt)
	{
		this.moveCard = new GameCard(evt.data.card.type, evt.data.card.insId);
		this.moveCard.x = evt.data.x;
		this.moveCard.y = evt.data.y;
		this.moveCard.visible = false;
		this.addChild(this.moveCard);
	}
}
ViewManager.inst().reg(GameView,LayerManager.UI_Main);