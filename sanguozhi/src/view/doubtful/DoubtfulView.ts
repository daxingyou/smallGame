class DoubtfulView extends BaseEuiView
{
	private scroller:eui.Scroller;
	private list:eui.List;
	private wjAny:CardAttrVo[];
	private mjAny:CardAttrVo[];
	private btAny:CardAttrVo[];
	private allAny:CardAttrVo[];
	private bt_group:eui.Group;
	private wj_btn:eui.Button;
	private bt_btn:eui.Button;
	private mj_btn:eui.Button;
	private all_btn:eui.Button;

	private bing_0_0:eui.Image;
	private bing_0_1:eui.Image;
	private bing_0_2:eui.Image;
	private bing_1_0:eui.Image;
	private bing_1_1:eui.Image;
	private bing_1_2:eui.Image;
	private bing_2_0:eui.Image;
	private bing_2_1:eui.Image;
	private bing_2_2:eui.Image;

	private bb_num:eui.Label;
	private gb_num:eui.Label;
	private qb_num:eui.Label;
	private fighting_p:eui.Label;
	private fighting_n:eui.Label;
	private soldiers:eui.Label;
	private qingbao:eui.Label;
	private font_effect:eui.BitmapLabel;

	private bb:eui.Image;
	private gb:eui.Image;
	private qb:eui.Image;

	private bg0:eui.Image;
	private bg1:eui.Image;
	private bg2:eui.Image;
	private start_game:eui.Image;
	private back_btn:eui.Image;
	private shop_img:eui.Image;

	private bg_rect0:eui.Rect;
	private bg_rect1:eui.Rect;
	private bg_rect2:eui.Rect;
	private bg_rect00:eui.Rect;
	private bg_rect11:eui.Rect;
	private bg_rect22:eui.Rect;
	private touch_wj0:eui.Rect;
	private touch_wj1:eui.Rect;
	private touch_wj2:eui.Rect;

	private role_group0:eui.Group;
	private role_group1:eui.Group;
	private role_group2:eui.Group;
	private wj_group0:eui.Group;
	private wj_group1:eui.Group;
	private wj_group2:eui.Group;
	private move_group:eui.Group;
	private role_group:eui.Group;
	private card_group:eui.Group;
	private right_group:eui.Group;
	private left_group:eui.Group;
	private flag_group0:eui.Group;
	private flag_group1:eui.Group;
	private flag_group2:eui.Group;
	private flag_group3:eui.Group;
	private flag_group4:eui.Group;

	private check:eui.Image;
	private checkBool:boolean = false;

	private state:string = "bt";
	private moveRole:MovieClip[] = [];
	private roleAny0:MovieClip[] = [];
	private roleAny1:MovieClip[] = [];
	private roleAny2:MovieClip[] = [];
	private moveWj:MovieClip;
	private wj0:MovieClip;
	private wj1:MovieClip;
	private wj2:MovieClip;
	private pos:any[] = [{x1:-3, x2:10},{x1:0, x2:12},{x1:7, x2:14}]
	private pos_id:number = 1;
	private formation:number = 3; /**方阵数量 */
	private role_id:number = 0;
	private role_inid:number;
	private targetAtk:number = -1;
	private ox:number = 0;
	private oy:number = 0;
	private nx:number = 0;
	private ny:number = 0;
	private _key:string;
	private _num:number;
	private _type:string;
	public constructor() 
	{
		super();
	}
	public open(...param):void{
		GameCfg.playerAttack = 0;
		GameCfg.npcAttack = 0;
		GameApp.soldiersNum = 0;
		GameApp.ownSolderis = [{genrealRes:"",soldierType:0, soldierID:0, generalId:0},{genrealRes:"",soldierType:0, soldierID:0, generalId:0},{genrealRes:"",soldierType:0, soldierID:0, generalId:0}];
		if(param[0]){
			if(param[0].key){
				this._key = param[0].key;
			}
			if(param[0].num){
				this._num = param[0].num;
			}
			if(param[0].type){
				this._type = param[0].type;
			}
		}
		this.init();
		this.addTouchEvent(this, this.touchTap);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeRole, this);
		this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.removeRole, this);
		MessageManager.inst().addListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateList, this);
		MessageManager.inst().addListener(LocalStorageEnum.DOUBTFUL_MOVE_ROLE, this.createMoveWj, this);
		MessageManager.inst().addListener(LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER, this.createMoveSoldier, this);
		MessageManager.inst().addListener(CustomEvt.CARD_REFRESH, this.updateList, this);
	}
	public close():void{
		this.removeTouchEvent(this, this.touchTap);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.removeRole, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.removeRole, this);
		MessageManager.inst().removeListener(LocalStorageEnum.UPDATE_GAME_CARD, this.updateList, this);
		MessageManager.inst().removeListener(LocalStorageEnum.DOUBTFUL_MOVE_ROLE, this.createMoveWj, this);
		MessageManager.inst().removeListener(LocalStorageEnum.DOUBTFUL_MOVE_SOLDIER, this.createMoveSoldier, this);
		MessageManager.inst().removeListener(CustomEvt.CARD_REFRESH, this.updateList, this);
		egret.Tween.removeTweens(this.role_group);
		egret.Tween.removeTweens(this.card_group);
		egret.Tween.removeTweens(this.right_group);
		egret.Tween.removeTweens(this.left_group);
		egret.Tween.removeTweens(this);
		for(let i = 0; i < 5; i++)
		{
			this["flag_group" + i].removeChildren();
		}
	}
	private init()
	{
		for(let i = 0; i < 5; i++)
		{
			let ani = new MovieClip();
			ani.playFile(`${EFFECT}flag1`, -1, null, false, "", null, Math.floor(Math.random() * 3 + 7));
			ani.scaleX = -1;
			this["flag_group" + i].addChild(ani);
		}
		this.updateList();
		this.list.itemRenderer = GameCardItem;
		this.list.dataProvider = new eui.ArrayCollection(this.allAny);
		this.scroller.scrollPolicyV = "off";
		this.scroller.bounces = false;
		this.state = "all";
		this.switchBtn(this.all_btn);

		let any:SoldierRect[] = GameCfg.levelCfg[GameCfg.chapter - 1][GameCfg.level - 1];
		let num = 0;
		for(let i = 0; i < 3; i++)
		{
			let num1 = 0;
			let card:CardAttrVo = GlobalFun.getCardDataFromId(any[i].soldierID);
			if(any[i].soldierType != 0)
			{
				num1 = card.atk;
			}
			if((any[i].soldierType == 3 && i == 0)||(any[i].soldierType == 1 && i == 2)||(any[i].soldierType == 2 && i == 1))
			{
				num1 = num1 + Math.floor(num1*0.1);
			}
			if(any[i].generalId!=0)
			{
				let card:CardAttrVo = GlobalFun.getCardDataFromId(any[i].generalId);
				num1 += card.atk;
			}
			num+=num1
		}
		GameCfg.npcAttack = num;
		this.role_group["autoSize"]();
		this.card_group["autoSize"]();
		this.right_group["autoSize"]();
		this.left_group["autoSize"]();
		this.move_group["autoSize"]();

		this.card_group.bottom = -180;
		this.right_group.right = -280;
		this.left_group.left = -200;
		egret.Tween.get(this.card_group)
		.to({bottom:0}, 500);
		egret.Tween.get(this.right_group)
		.to({right:0}, 500);
		egret.Tween.get(this.left_group)
		.to({left:0}, 500);
	}
	private touchTap(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.wj_btn:
				this.state = "wj";
				this.updateList();
				this.switchBtn(this.wj_btn);
				break;
			case this.bt_btn:
				this.state = "bt";
				this.updateList();
				this.switchBtn(this.bt_btn);
				break;
			case this.mj_btn:
				this.state = "mj";
				this.updateList();
				this.switchBtn(this.mj_btn);
				break;
			case this.all_btn:
				this.state = "all";
				this.updateList();
				this.switchBtn(this.all_btn);
				break;
			case this.check: /**查看敌方阵容 */
				if(this.checkBool)
				{
					UserTips.inst().showTips("不可重复查看！");
					return;
				}
				if(GameApp.intelligence>=1)
				{	
					this.checkBool = true;
					GameApp.intelligence -= 1;
					this.checkNpc();
				}else
				{
					UserTips.inst().showTips("情报值不足");
				}
				break;
			case this.start_game: /**开始按钮 */
				SoundManager.inst().playEffect(`${MUSIC}collect.mp3`);
				if(GameApp.ownSolderis[0].generalId == 0 && 
				   GameApp.ownSolderis[1].generalId == 0 &&
				   GameApp.ownSolderis[2].generalId == 0 &&
				   GameApp.ownSolderis[0].soldierType == 0 &&
				   GameApp.ownSolderis[1].soldierType == 0 &&
				   GameApp.ownSolderis[2].soldierType == 0 )
				{
					UserTips.inst().showTips("轻配置上阵兵力！")
				}else
				{
					GameApp.year += 1;
					SoundManager.inst().playEffect(`${MUSIC}ready.mp3`);
					SoundManager.inst().playBg(`${MUSIC}fight.mp3`);
					if(this._key && this._num){
						GameApp[this._key] -= this._num;
					}
					SoundManager.inst().touchBg();
					/**开始游戏 */
					egret.Tween.get(this.card_group)
					.to({bottom:-180}, 500);
					egret.Tween.get(this.right_group)
					.to({right:-280}, 500);
					egret.Tween.get(this.left_group)
					.to({left:-200}, 500);

					GlobalFun.showCloudAni(2,()=>{
						ViewManager.inst().close(DoubtfulView);
						ViewManager.inst().open(BattleView,[{type:this._type}]);
					},this)
					egret.Tween.get(this.role_group)
					.to({x:StageUtils.inst().getWidth() }, 1500, egret.Ease.quintIn);
					this.goFight();
					egret.Tween.get(this)
					.wait(600)
					.call(()=>{
						
						// ViewManager.inst().open(Interlude);
					})
				}
				break;
			case this.back_btn:
				for(let i = 0; i < 3; i++)
				{
					if(GameApp.ownSolderis[i].soldierType!=0)
					{
						let card:CardAttrVo = GlobalFun.getCardDataFromId(GameApp.ownSolderis[i].soldierID);
						if(GameApp.ownSolderis[i].soldierType == 1 || GameApp.ownSolderis[i].soldierType == 2)
						{
							card.ownNum += 36;
						}else
						{
							card.ownNum += 24;
						}
						GlobalFun.refreshCardData(GameApp.ownSolderis[i].soldierID, {ownNum:card.ownNum});
					}
				}
				GameApp.ownSolderis = [{genrealRes:"",soldierType:0, soldierID:0, generalId:0},{genrealRes:"",soldierType:0, soldierID:0, generalId:0},{genrealRes:"",soldierType:0, soldierID:0, generalId:0}];
				ViewManager.inst().close(DoubtfulView);
				ViewManager.inst().open(GameMainView);
				break;
			case this.shop_img:
				ViewManager.inst().open(ShopView);
				break;
		}
	}
	/**切换战斗 */
	private goFight()
	{
		this.bg0.visible = false;
		this.bg1.visible = false;
		this.bg2.visible = false;
		if(this.roleAny0.length > 0)
		{
			for(let i = 0; i < this.roleAny0.length; i++)
			{
				this.roleAny0[i].playFile(`${EFFECT}role_${GameApp.ownSolderis[0].soldierID}_run`, -1);
			}
		}
		if(this.roleAny1.length > 0)
		{
			for(let i = 0; i < this.roleAny1.length; i++)
			{
				this.roleAny1[i].playFile(`${EFFECT}role_${GameApp.ownSolderis[1].soldierID}_run`, -1);
			}
		}
		if(this.roleAny2.length > 0)
		{
			for(let i = 0; i < this.roleAny2.length; i++)
			{
				this.roleAny2[i].playFile(`${EFFECT}role_${GameApp.ownSolderis[2].soldierID}_run`, -1);
			}
		}

		if(this.wj0)
		{
			this.wj0.playFile(`${EFFECT}role_${GameApp.ownSolderis[0].generalId}_run`, -1)
		}
		if(this.wj1)
		{
			this.wj1.playFile(`${EFFECT}role_${GameApp.ownSolderis[1].generalId}_run`, -1)
		}
		if(this.wj2)
		{
			this.wj2.playFile(`${EFFECT}role_${GameApp.ownSolderis[2].generalId}_run`, -1)
		}
	}
	/**切换按钮状态 */
	private switchBtn(btn:eui.Button)
	{
		this.mj_btn.currentState = "up";
		this.bt_btn.currentState = "up";
		this.wj_btn.currentState = "up";
		this.all_btn.currentState = "up";
		btn.currentState = "down";
	}
	/**创建拖动武将 */
	private createMoveWj(evt:CustomEvt)
	{
		if(this.moveWj)
		{
			return;
		}
		this.role_inid = evt.data.card;
		this.createMoveWj0(evt.data.card);
	}
	private createMoveWj0(_id:number)
	{
		this.moveWj = new MovieClip();
		this.moveWj.visible = false;
		this.moveWj.playFile(`${EFFECT}role_${_id}_stand`, -1);
		this.addChild(this.moveWj);
	}
	/**创建武将 */
	private createWj(id:number, group:eui.Group, group_id:number)
	{
		for(let i = 0; i < GameApp.ownSolderis.length; i++)
		{
			if(GameApp.ownSolderis[i].generalId == this.role_inid)
			{
				UserTips.inst().showTips("武将不可重复使用!");
				return;
			}
		}
		GameApp.soldiersNum++;
		this["wj" + id] = new MovieClip();
		this["wj" + id].playFile(`${EFFECT}role_${this.role_inid}_stand`, -1);
		group.addChild(this["wj" + id]);
		let card:CardAttrVo = GlobalFun.getCardDataFromId(this.role_inid);
		this.updateAtk(card.atk, 0, group_id);
		if(group_id != null)
		{
			GameApp.ownSolderis[group_id].generalId = this.role_inid;
		}
		this.updateList();
	}
	/**创建士兵 _formation方阵数量 _id兵种id _group创建的容器 _any人物集合*/
	private createMoveBing(_formation:number, _id:number, _group:eui.Group, group_id:number, _any:MovieClip[], move:boolean)
	{
		this.formation = _formation;
		this.role_id = _id;
		_group.removeChildren();
		_any.splice(0, _any.length);
		let _y = 0;
		if(group_id != null)
		{
			GameApp.ownSolderis[group_id].soldierID = _id;
			let card:CardAttrVo = GlobalFun.getCardDataFromId(_id);
			GameApp.ownSolderis[group_id].soldierType = card.soldierType;
		}else
		{
			group_id = this.pos_id;
		}
		switch(_id)
		{
			case 100105:
			case 100107:
			case 100109:
			case 100110:
			case 100113:
				switch(_formation)
				{
					case 3:
						for(let i = 0; i < 3; i++)
						{
							for(let j = 0; j < 12; j++)
							{
								let ani:MovieClip = new MovieClip();
								ani.playFile(`${EFFECT}role_${_id}_stand`, -1);
								_any.push(ani);
								_group.addChild(ani);
								if(move)
									ani.alpha = 0.7;
								ani.x = 6 + i * 30 - Math.floor(j/4) * this.pos[group_id].x1 * ani.scaleX- j * this.pos[group_id].x2;
								ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
							}
						}
						break;
					case 2:
						for(let i = 0; i < 3; i++)
						{
							for(let j = 0; j < 12; j++)
							{
								let ani:MovieClip = new MovieClip();
								ani.playFile(`${EFFECT}role_${_id}_stand`, -1);
								_any.push(ani);
								_group.addChild(ani);
								if(move)
									ani.alpha = 0.7;
								ani.x = 6 + i * 30 - Math.floor(j/6) * (this.pos[group_id].x1 + 20 + group_id * 2) * ani.scaleX - j * (this.pos[group_id].x2 - 2);
								ani.y = 10 + j * 27 + Math.floor(j/6) * 70;
							}
						}
						break;
				}
				break;
			case 100106:
			case 100111:
			case 100112:
				switch(_formation)
				{
					case 3:
						for(let i = 0; i < 2; i++)
						{
							for(let j = 0; j < 12; j++)
							{
								let ani:MovieClip = new MovieClip();
								ani.playFile(`${EFFECT}role_${_id}_stand`, -1);
								_any.push(ani);
								_group.addChild(ani);
								ani.scaleX = ani.scaleY = 0.7;
								if(move)
									ani.alpha = 0.7;
								ani.x = 8 + i * 52 - Math.floor(j/4) * this.pos[group_id].x1 * ani.scaleX - j * (this.pos[group_id].x2 - 0.5);
								ani.y = 18 + j * 28 + Math.floor(j/4) * 28;
								
							}
						}
						break;
					case 2:
						for(let i = 0; i < 2; i++)
						{
							for(let j = 0; j < 12; j++)
							{
								let ani:MovieClip = new MovieClip();
								ani.playFile(`${EFFECT}role_${_id}_stand`, -1);
								_any.push(ani);
								_group.addChild(ani);
								ani.scaleX = ani.scaleY = 0.7;
								if(move)
									ani.alpha = 0.7;
								ani.x = 8 + i * 52 - Math.floor(j/6) * (this.pos[group_id].x1 + 20 + group_id * 8) * ani.scaleX - j * (this.pos[group_id].x2 - 2);
								ani.y = 8 + j * 27 + Math.floor(j/6) * 76;
							}
						}
						break;
				}
				break;
		}
		let num = 0;
		if(!move)
		{
			GameApp.soldiersNum += _any.length;
			let card:CardAttrVo = GlobalFun.getCardDataFromId(_id);
			card.ownNum -= _any.length;
			GlobalFun.refreshCardData(_id, {ownNum:card.ownNum});
			this.updateList();
			if(_any.length > 0)
			{
				num += card.atk;
			}
			if((card.soldierType == 1 && group_id == 2) || (card.soldierType == 2 && group_id == 1) || (card.soldierType == 3 && group_id == 0))
			{
				num = num + Math.floor(num * 0.1);
			}
			this.updateAtk(num, 0, group_id);
		}
	}
		
	/**移除士兵 */
	private removeBing(_group:eui.Group, group_id:number, _any:MovieClip[], _id:number)
	{
		let num = 0;
		if(_any != this.moveRole)
		{
			GameApp.soldiersNum -= _any.length;
			let card:CardAttrVo = GlobalFun.getCardDataFromId(_id);
			card.ownNum += _any.length;
			GlobalFun.refreshCardData(_id, {ownNum:card.ownNum});
			this.updateList();
			if(_any.length > 0)
			{
				num += card.atk;
			}
			if((card.soldierType == 1 && group_id == 2) || (card.soldierType == 2 && group_id == 1) || (card.soldierType == 3 && group_id == 0))
			{
				num = num + Math.floor(num * 0.1);
			}
			this.updateAtk(num, 1, group_id);
		}
		_group.removeChildren();
		_any.splice(0, _any.length);
	}
	/**更改位置 */
	private setRolePos(_role:MovieClip[], move:boolean, group_id:number)
	{
		if(_role.length <= 0)
			return;
		let h_num;/**列 */
		let _formationNum;
		let id:number = 0;
		if(this["wj" + group_id] != null)
		{
			_formationNum = 6;
			this.formation = 2;
		}else
		{
			_formationNum = 4;
			this.formation = 3;
		}
		if(_role.length <= 24)
		{
			h_num = 2;
			
			for(let i = 0; i < h_num; i++)
			{
				for(let j = 0; j < 12; j++)
				{
					if(move)
						_role[id].alpha = 0.7;
					if(_formationNum == 4)
					{
						_role[id].x = 8 + i * 52 - Math.floor(j/_formationNum) * this.pos[group_id].x1 * _role[id].scaleX - j * this.pos[group_id].x2;
						_role[id].y = 18 + j * 28 + Math.floor(j/_formationNum) * 28;
					}else
					{
						_role[id].x = 8 + i * 52 - Math.floor(j/_formationNum) * (this.pos[group_id].x1 + 20 + group_id * 8) * _role[id].scaleX - j * (this.pos[group_id].x2 - 2);
						_role[id].y = 8 + j * 27 + Math.floor(j/_formationNum) * 76;
					}
					id++;
				}
			}
		}else
		{
			h_num = 3;
			for(let i = 0; i < h_num; i++)
			{
				for(let j = 0; j < 12; j++)
				{
					if(move)
						_role[id].alpha = 0.7;
					if(_formationNum == 4)
					{
						_role[id].x = 6 + i * 30 - Math.floor(j/_formationNum) * this.pos[group_id].x1 * _role[id].scaleX - j * this.pos[group_id].x2;
						_role[id].y = 18 + j * 28 + Math.floor(j/_formationNum) * 28;
					}else
					{
						_role[id].x = 6 + i * 30 - Math.floor(j/_formationNum) * (this.pos[group_id].x1 + 20 + group_id * 2) * _role[id].scaleX - j * (this.pos[group_id].x2 - 2);
						_role[id].y = 10 + j * 27 + Math.floor(j/_formationNum) * 70;
					}
					id++;
				}
			}
		}
	}
	/** */
	private createMoveSoldier(evt:CustomEvt)
	{
		let card:CardAttrVo = evt.data.data;
		if(card.soldierType == 1 || card.soldierType == 2)
		{
			if(card.ownNum < 36)
			{
				UserTips.inst().showTips("兵团数量不足！");
				return;
			}
		}else if(card.soldierType == 3)
		{
			if(card.ownNum < 24)
			{
				UserTips.inst().showTips("兵团数量不足！");
				return;
			}
		}
		let evt1:egret.TouchEvent = evt.data.evt;
		this.move_group.visible = false;
		this.move_group.x = evt1.stageX + 20;
		this.move_group.y = evt1.stageY - 200;
		this.ox = this.nx = evt1.stageX;
		this.oy = this.ny = evt1.stageY;
		this.createMoveBing(2, card.insId, this.move_group, null, this.moveRole, true);
	}
	private touchBegin(evt:egret.TouchEvent)
	{
		switch(evt.target)
		{
			case this.touch_wj0:
				this.switchWj(0);
				break;
			case this.touch_wj1:
				this.switchWj(1);
				break;
			case this.touch_wj2:
				this.switchWj(2);
				break;
			case this.bg_rect00:
				this.switchBing(0, evt.stageX, evt.stageY);
				break;
			case this.bg_rect11:
				this.switchBing(1, evt.stageX, evt.stageY);
				break;
			case this.bg_rect22:
				this.switchBing(2, evt.stageX, evt.stageY);
				break;
			
		}
	}
	/**切换小兵 */
	private switchBing(_id:number, _x:number, _y:number)
	{
		if(this["bg_rect" + _id].hitTestPoint(_x, _y) && this["roleAny" + _id].length > 0)
		{
			this.removeBing(this["role_group" + _id], _id, this["roleAny" + _id], GameApp.ownSolderis[_id].soldierID);
			let point = this.role_group.localToGlobal(this["role_group" + _id].x, this["role_group" + _id].y)
			this.move_group.x = point.x;
			this.move_group.y = point.y;
			this.ox = this.nx = _x;
			this.oy = this.ny = _y;
			if(this["wj" + _id])
				this.createMoveBing(2, GameApp.ownSolderis[_id].soldierID, this.move_group, _id, this.moveRole, true);
			else
				this.createMoveBing(3, GameApp.ownSolderis[_id].soldierID, this.move_group, _id, this.moveRole, true);
			GameApp.ownSolderis[_id].soldierType = 0;
			GameApp.ownSolderis[_id].soldierID = 0;
		}
	}
	/**切换武将 */
	private switchWj(_id:number)
	{
		if(this["wj" + _id])
		{
			let card:CardAttrVo = GlobalFun.getCardDataFromId(GameApp.ownSolderis[_id].generalId);
			this.updateAtk(card.atk, 1, _id);
			GameApp.soldiersNum--;
			this["wj_group" + _id].removeChildren();
			this["wj" + _id] = null;
			this.createMoveWj0(GameApp.ownSolderis[_id].generalId);
			this.updateList();
			this.setRolePos(this["roleAny" + _id], false, _id);
			GameApp.ownSolderis[_id].generalId = 0;
		}
	}
	private touchMove(evt:egret.TouchEvent)
	{
		this.touchMove1(0, evt.stageX, evt.stageY);
		this.touchMove1(1, evt.stageX, evt.stageY);
		this.touchMove1(2, evt.stageX, evt.stageY);
		this.nx = evt.stageX;
		this.ny = evt.stageY;

		let cx = this.nx - this.ox;
		let cy = this.ny - this.oy;
		this.ox = this.nx;
		this.oy = this.ny;

		if(this.moveWj)
		{
			if(evt.stageY <= StageUtils.inst().getHeight() - 120)
			{
				this.moveWj.visible = true;
			}
			this.moveWj.x = evt.stageX;
			this.moveWj.y = evt.stageY + 10;
		}
		if(evt.stageY <= StageUtils.inst().getHeight() - 120)
		{
			this.move_group.visible = true;
		}
		this.move_group.x += cx;
		this.move_group.y += cy;
	}
	private touchEnd(evt:egret.TouchEvent)
	{
		// MessageManager.inst().dispatch(LocalStorageEnum.REMOVE_SOLDIERS);
		this.bg0.source = "fight_bg0_png";
		this.bg1.source = "fight_bg1_png";
		this.bg2.source = "fight_bg2_png";
		this.placeRole(0, evt.stageX, evt.stageY);
		this.placeRole(1, evt.stageX, evt.stageY);
		this.placeRole(2, evt.stageX, evt.stageY);
		
		if(this.moveRole)
			this.removeBing(this.move_group, null, this.moveRole, null);
		if(this.moveWj)
		{
			this.removeChild(this.moveWj);
			this.moveWj = null;
		}
	}
	private removeRole()
	{
		if(this.moveWj)
		{
			this.removeChild(this.moveWj);
			this.moveWj = null;
		}
	}
	/**移动判定 */
	private touchMove1(_id:number, _x:number, _y:number)
	{
		if(this["bg_rect" + _id].hitTestPoint(_x, _y))
		{
			this["bg" + _id].source = "fight_bg" + _id + "_lv_png";
			this.pos_id = _id;
			this.setRolePos(this.moveRole, true, _id);
		}else
		{
			this["bg" + _id].source = "fight_bg" + _id + "_png";
		}
	}
	/**放置 */
	private placeRole(_id:number, _x:number, _y:number)
	{
		if(this["bg_rect" + _id].hitTestPoint(_x, _y))
		{
			if(this.moveRole.length > 0)
			{
				if(this["roleAny" + _id].length > 0)
				{
					this.removeBing(this["role_group" + _id], _id, this["roleAny" + _id], GameApp.ownSolderis[_id].soldierID);
				}
				this.createMoveBing(this.formation, this.role_id, this["role_group" + _id], _id, this["roleAny" + _id], false);
			}
			if(this.moveWj)
			{
				if(this["wj" + _id])
				{
					this["wj_group" + _id].removeChild(this["wj" + _id]);
					this["wj" + _id]=null;
					let card:CardAttrVo = GlobalFun.getCardDataFromId(GameApp.ownSolderis[_id].generalId);
					this.updateAtk(card.atk, 1, _id);
					GameApp.ownSolderis[_id].generalId = 0;
				}
				this.createWj(_id, this["wj_group" + _id], _id);
				if(this["roleAny" + _id].length > 0)
				{
					this.setRolePos(this["roleAny" + _id], false, _id);
				}
			}
		}
	}
	public updateList()
	{
		this.wjAny = [];
		this.mjAny = [];
		this.btAny = [];
		this.allAny = [];
		let card:CardAttrVo[] = GlobalFun.getOwnCards();
		for(let i = 0; i < card.length; i++)
		{
			if(card[i].type == CardType.general)
			{
				this.wjAny.push(card[i]);
			}else if(card[i].type == CardType.soldier)
			{
				this.btAny.push(card[i]);
			}else
			{
				this.mjAny.push(card[i]);
			}
			this.allAny.push(card[i]);
		}
		if(this.state == "wj")
		{
			this.list.dataProvider = new eui.ArrayCollection(this.wjAny);
		}else if(this.state == "mj")
		{
			this.list.dataProvider = new eui.ArrayCollection(this.mjAny);
		}else if(this.state == "all")
		{
			this.list.dataProvider = new eui.ArrayCollection(this.allAny);
		}else if(this.state == "bt")
		{
			this.list.dataProvider = new eui.ArrayCollection(this.btAny);
		}
	}
	private update()
	{
		this.bb_num.text = GameApp.soldier2Num + "";
		this.qb_num.text = GameApp.soldier3Num + "";
		this.gb_num.text = GameApp.soldier1Num + "";
		this.qingbao.text = "情报:" + GameApp.intelligence;

		this.fighting_p.text = "" + GameCfg.playerAttack;
		this.fighting_n.text = "" + GameCfg.npcAttack;
		this.soldiers.text = "已上阵:" + GameApp.soldiersNum;
		if(this.wj0 == null)
		{
			this.touch_wj0.visible = false;
		}else 
		{
			this.touch_wj0.visible = true;
		}
		if(this.wj1 == null)
		{
			this.touch_wj1.visible = false;
		}else 
		{
			this.touch_wj1.visible = true;
		}
		if(this.wj2 == null)
		{
			this.touch_wj2.visible = false;
		}else 
		{
			this.touch_wj2.visible = true;
		}

	}
	/**更新战力 state*/
	private updateAtk(num:number, state:number, group_id:number)
	{
		this.font_effect.alpha = 2;
		egret.Tween.removeTweens(this);
		egret.Tween.removeTweens(this.font_effect);
		this.font_effect.visible = false;
		this.font_effect.alpha = 1;
		this.font_effect.x = this["role_group" + group_id].x;
		this.font_effect.y = this["role_group" + group_id].y- 50;

		if(this.targetAtk >= 0)
			GameCfg.playerAttack = this.targetAtk;
		if(state == 0) /**增加 */
		{
			let num1 = GameCfg.playerAttack + num;
			this.targetAtk = num1;
			this.font_effect.visible = true;
			this.font_effect.text = "+" + num;
			this.font_effect.x = this["role_group" + group_id].x;
			this.font_effect.y = this["role_group" + group_id].y- 50;
			egret.Tween.get(this, {loop:true})
			.wait(10)
			.call(()=>{
				GameCfg.playerAttack += 100;
				if(GameCfg.playerAttack >= num1)
				{
					GameCfg.playerAttack = num1;
					egret.Tween.removeTweens(this);
				}
			});
		}else if(state == 1) /**减 */
		{
			let num1 = GameCfg.playerAttack - num;
			this.targetAtk = num1;
			this.font_effect.visible = true;
			this.font_effect.text = "-" + num;
			this.font_effect.x = this["role_group" + group_id].x;
			this.font_effect.y = this["role_group" + group_id].y - 50;
			egret.Tween.get(this, {loop:true})
			.wait(10)
			.call(()=>{
				GameCfg.playerAttack -= 100;
				if(GameCfg.playerAttack <= num1)
				{
					GameCfg.playerAttack = num1;
					egret.Tween.removeTweens(this);
				}
			});
		}

		egret.Tween.get(this.font_effect).to({y:this.font_effect.y - 15},1100)
		.to({y:this.font_effect.y - 30, alpha:0}, 400)
		.call(()=>{
			this.font_effect.visible = false;
			this.font_effect.alpha = 1;
		})
		.to({y:this.font_effect.y}, 0)
		.call(()=>{
			egret.Tween.removeTweens(this.font_effect);
		});
	}
	/**查看 */
	private checkNpc()
	{
		let any:SoldierRect[] = GameCfg.levelCfg[GameCfg.chapter - 1][GameCfg.level - 1];
		for(let i = 0; i < 3; i++)
		{
			this["bing_" + i + "_0"].source = "icon_" + any[i].soldierType + "_png";
			if(any[i].generalId!=0)
				this["bing_" + i + "_1"].source = "icon_4_png";
			else
				this["bing_" + i + "_1"].source = "icon_0_png";
			this["bing_" + i + "_2"].source = "icon_" + any[i].soldierType + "_png";
		}
		// egret.Tween.get(this.check)
		// .wait(2500)
		// .call(()=>{
		// 	for(let i = 0; i < 3; i++)
		// 	{
		// 		this["bing_" + i + "_0"].source = "icon_0_png";
		// 		this["bing_" + i + "_1"].source = "icon_0_png";
		// 		this["bing_" + i + "_2"].source = "icon_0_png";
		// 	}
		// 	egret.Tween.removeTweens(this.check);
		// }, this);
	}
}
ViewManager.inst().reg(DoubtfulView,LayerManager.UI_Main);