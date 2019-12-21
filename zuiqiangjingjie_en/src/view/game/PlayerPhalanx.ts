class PlayerPhalanx extends BaseView
{
	public id:number;
	public soldierQian:any[] = [];
	public soldierHou:any[] = [];
	public qian_group:eui.Group;
	public hou_group:eui.Group;
	public role_group:eui.Group;
	private wj:Player;
	public haveObj:boolean = false;
	private round:number = 0;
	private bg:eui.Image;
	private hou_rect:eui.Rect;
	private qian_rect:eui.Rect;
	public have:boolean = false;
	private yan:MovieClip;
	public constructor(_id:number) 
	{
		super();
		this.id = _id;
		this.skinName = "PlayerPhalanxSkin";
		MessageManager.inst().addListener(LocalStorageEnum.CREATE_PLAYER, this.createRole, this);
		MessageManager.inst().addListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
		MessageManager.inst().addListener(LocalStorageEnum.PLAYER_SUBHP, this.subHp, this);
		MessageManager.inst().addListener(LocalStorageEnum.PLAYER_FIGHTING, this.fighting_p, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().addListener(LocalStorageEnum.RELEASE_SKILLS, this.createSkill, this);
		this.qian_rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchQian, this);
		this.hou_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHou, this);
		this.role_group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchWJ, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.bg.source = "fight_bg" + this.id + "_png";
	}
	private createRole(evt:CustomEvt)
	{
		switch(evt.data[0].type)
		{
			case "player":
				switch(evt.data[0].id)
				{
					case 1:
						this.create(1, evt.data[0].x, evt.data[0].y);
						break;
					case 2:
						this.create(2, evt.data[0].x, evt.data[0].y);
						break;
					case 3:
						this.create(3, evt.data[0].x, evt.data[0].y);
						break;
					default:
						this.createWJ(evt.data[0].id, evt.data[0].x, evt.data[0].y)
						break;
				}
				break;
			case "build":
				this.createBuild(evt.data[0].id, evt.data[0].x, evt.data[0].y);
				break;
		}
	}
	/**Create a little soldier */
	private create(_id:number, _x:number, _y:number)
	{
		let hit_qian:boolean = this.qian_rect.hitTestPoint(_x, _y);
		let hit_hou:boolean = this.hou_rect.hitTestPoint(_x, _y);
		if(hit_qian)
		{
			GameApp["soldier" + _id + "Num"] -= 20;
			if(this.soldierQian.length != 0)
			{
				if(egret.getQualifiedClassName(this.soldierQian[0]) == "Player")
				{
					if(this.soldierQian[0].id == 1)
						GameApp.soldier1Num += 20;
					else if(this.soldierQian[0].id == 2)
						GameApp.soldier2Num += 20;
					else if(this.soldierQian[0].id == 3)
						GameApp.soldier3Num += 20;
					
				}else if(egret.getQualifiedClassName(this.soldierQian[0]) == "Build")
				{
					let card:CardAttrVo = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
					GlobalFun.refreshCardData(card.insId, {ownNum:card.ownNum});
					MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
				}

				for(let i = 0; i < this.soldierQian.length; i++)
				{
					let attack = this.soldierQian[i].attack;
					GameCfg.playerAttack -= attack;
				}
			}
			for(let i = 0; i < this.soldierQian.length; i++)
			{
				this.removeChild(this.soldierQian[i]);
			}
			this.soldierQian = [];
			for(let i = 0; i < 10; i++)
			{
				let role0 = new Player(_id, false);
				if(_id == 1)
					role0.scaleX = role0.scaleY = 0.4;
				else
					role0.scaleX = role0.scaleY = 0.5;

				if(i <= 4)
				{	
					if(_id != 1)
					{
						role0.y = 70 + i * 20;
						role0.x = 5 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (5 + this.id * 2);
					}else
					{
						role0.y = 50 + i * 25;
						role0.x = 20 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (6 + this.id * 3);
					}
				}
				else
				{	
					if(_id != 1)
					{
						role0.y = 100 + i * 20;
						role0.x = 0 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (6 + this.id * 2);
					}else
					{
						role0.y = 70 + i * 25;
						role0.x = 15 + (this.id * 10) + this.qian_group.x + this.qian_group.width / 2 - i * (6 + this.id * 3);
					}
				}
				this.addChild(role0);
				this.soldierQian.push(role0);

				let role1 = new Player(_id, false);
				if(_id == 1)
					role1.scaleX = role1.scaleY = 0.4;
				else
					role1.scaleX = role1.scaleY = 0.5;
				if(i <= 4)
				{	
					if(_id != 1)
					{
						role1.y = 70 + i * 20;
						role1.x = 55 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (5 + this.id * 2);
					}else
					{
						role1.y = 50 + i * 25;
						role1.x = 60 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (6 + this.id * 3);
					}
				}
				else
				{	
					if(_id != 1)
					{
						role1.y = 100 + i * 20;
						role1.x = 50 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (6 + this.id * 2);
					}else
					{
						role1.y = 70 + i * 25;
						role1.x = 50 + (this.id * 10) + this.hou_group.x + this.hou_group.width / 2 - i * (6 + this.id * 3);
					}
				}
				this.addChild(role1);
				this.soldierQian.push(role1);
			}
			if(this.soldierQian[0].id == 1 && this.id == 0)
			{
				for(let i = 0; i < this.soldierQian.length; i++)
				{
					let attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
					this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
					GameCfg.playerAttack += attack;
				}
			}else if(this.soldierQian[0].id == 3 && this.id == 1)
			{
				for(let i = 0; i < this.soldierQian.length; i++)
				{
					let attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
					this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
					GameCfg.playerAttack += attack;
				}
			}else if(this.soldierQian[0].id == 2 && this.id == 2)
			{
				for(let i = 0; i < this.soldierQian.length; i++)
				{
					let attack = Math.floor(this.soldierQian[i].attack + this.soldierQian[i].attack * 0.5);
					this.soldierQian[i].setData(this.soldierQian[i].hp, attack);
					GameCfg.playerAttack += attack;
				}
			}else 
			{
				for(let i = 0; i < this.soldierQian.length; i++)
				{
					let attack = this.soldierQian[i].attack;
					GameCfg.playerAttack += attack;
				}
			}
			this.setlayer();
		}
	}
	/**Create general */
	private createWJ(_id:number, _x:number, _y:number)
	{
		if(_y > this.y + this.height / 2 - 60 && _y < this.y + this.height / 2 + 60 && _x > this.x && _x < this.x + this.width)
		{
			for(let i = 0; i < GameCfg.wjAny.length; i++)
			{
				if(_id == GameCfg.wjAny[i])
				{
					UserTips.inst().showTips("Non reusable");
					return;
				}
			}
			if(this.wj)
			{
				let card:CardAttrVo = GlobalFun.getCardDataFromId(this.wj.id);
				GlobalFun.refreshCardData(this.wj.id, {ownNum:card.ownNum});
				this.removeChild(this.wj);
				this.wj = null;
			}
			this.wj = new Player(_id, false);
			this.wj.scaleX = this.wj.scaleY = 0.5;
			this.wj.x = this.role_group.x + this.role_group.width / 2;
			this.wj.y = this.role_group.y + this.role_group.height / 2 + 30;
			this.addChild(this.wj);
			let card:CardAttrVo = GlobalFun.getCardDataFromId(_id);
			GlobalFun.refreshCardData(_id, {ownNum:card.ownNum});
			this.wj.touchEnabled = false;
			MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
			GameCfg.wjAny.push(this.wj.id);
			this.setlayer();
		}
	}
	
	private touchQian(evt:egret.TouchEvent)
	{
		if(GameCfg.gameStart)
		{
			return;
		}
		if(this.soldierQian.length > 0)
		{
			if(egret.getQualifiedClassName(this.soldierQian[0]) == "Player")
			{
				MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, {card:this.soldierQian[0].id, x:evt.stageX, y:evt.stageY});
				GameApp["soldier" + this.soldierQian[0].id + "Num"] += 100;
			}else if(egret.getQualifiedClassName(this.soldierQian[0]) == "Build")
			{
				MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_BUILD, {card:this.soldierQian[0].id, x:evt.stageX, y:evt.stageY});
				let card:CardAttrVo = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
				GlobalFun.refreshCardData(card.insId, {ownNum:card.ownNum});
			}
			MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
			for(let i = 0; i < this.soldierQian.length; i++)
			{
				let attack = this.soldierQian[i].attack;
				GameCfg.playerAttack -= attack;
			}
			for(let i = 0; i < this.soldierQian.length; i++)
			{
				this.removeChild(this.soldierQian[i]);
			}
			this.soldierQian = [];
			this.setlayer();
		}
	}
	private touchHou(evt:egret.TouchEvent)
	{
		if(GameCfg.gameStart)
		{
			return;
		}
		if(this.soldierHou.length > 0)
		{
			if(egret.getQualifiedClassName(this.soldierHou[0]) == "Player")
			{
				MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, {card:this.soldierHou[0].id, x:evt.stageX, y:evt.stageY});
				GameApp["soldier" + this.soldierHou[0].id + "Num"] += 100;
			}else if(egret.getQualifiedClassName(this.soldierHou[0]) == "Build")
			{
				MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_BUILD, {card:this.soldierHou[0].id, x:evt.stageX, y:evt.stageY});
				let card:CardAttrVo = GlobalFun.getCardDataFromId(this.soldierHou[0].id);
				GlobalFun.refreshCardData(card.insId, {ownNum:card.ownNum});
			}
			MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
			for(let i = 0; i < this.soldierHou.length; i++)
			{
				this.removeChild(this.soldierHou[i]);
			}
			this.soldierHou = [];
			this.setlayer();
		}
	}
	private touchWJ(evt:egret.TouchEvent)
	{
		if(GameCfg.gameStart)
		{
			return;
		}
		if(this.wj)
		{
			MessageManager.inst().dispatch(LocalStorageEnum.CREATE_MOVE_ROLE, {card:this.wj.id, x:evt.stageX, y:evt.stageY});
			let card:CardAttrVo = GlobalFun.getCardDataFromId(this.wj.id);
			GlobalFun.refreshCardData(this.wj.id, {ownNum:card.ownNum});
			for(let i = 0; i < GameCfg.wjAny.length; i++)
			{
				if(this.wj.id == GameCfg.wjAny[i])
				{
					GameCfg.wjAny.splice(i, 1);
					i--;
				}
			}
			this.removeChild(this.wj);
			this.wj = null;
			MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
			this.setlayer();
		}
	}
	/**Create a building */
	private createBuild(_id:number, _x:number, _y:number)
	{
		let hit_qian:boolean = this.qian_rect.hitTestPoint(_x, _y);
		let hit_hou:boolean = this.hou_rect.hitTestPoint(_x, _y);
		if(hit_qian)
		{
			if(this.soldierQian.length != 0)
			{
				if(egret.getQualifiedClassName(this.soldierQian[0]) == "Player")
				{
					if(this.soldierQian[0].id == 1)
						GameApp.soldier1Num += 20;
					else if(this.soldierQian[0].id == 2)
						GameApp.soldier2Num += 20;
					else if(this.soldierQian[0].id == 3)
						GameApp.soldier3Num += 20;
					
				}else if(egret.getQualifiedClassName(this.soldierQian[0]) == "Build")
				{
					let card:CardAttrVo = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
					GlobalFun.refreshCardData(card.insId, {ownNum:card.ownNum});
				}
			}
			for(let i = 0; i < this.soldierQian.length; i++)
			{
				this.removeChild(this.soldierQian[i]);
			}
			this.soldierQian = [];
			for(let i = 0; i < 4; i++)
			{
				let build = new Build(_id, false);
				if(i <= 1)
				{
					build.y = 70 + i * 50;
					build.x = this.qian_group.x + this.qian_group.width / 2 - 20 - i * 15 + (this.id * 5) ;
				}
				else
				{	
					build.y = 130 + i * 50;
					build.x = this.qian_group.x + this.qian_group.width / 2 - 30 - i * 15 + (this.id * 1) ;
				}
				this.addChild(build);
				this.soldierQian.push(build);
				// let build0 = new Build(_id, false);
				// if(i <= 1)
				// {
				// 	build0.y = 70 + i * 50;
				// 	build0.x = 50 + this.hou_group.x + this.hou_group.width / 2 - i * (20 + this.id * 10) - (10 + this.id * 5);
				// }
				// else
				// {	
				// 	build0.y = 120 + i * 50;
				// 	build0.x = 50 + this.hou_group.x + this.hou_group.width / 2 - i * (20 + this.id * 10) - (10 + this.id * 5);
				// }
				// this.addChild(build0);
				// this.soldierQian.push(build0);
			}
			this.setlayer();
			let card:CardAttrVo = GlobalFun.getCardDataFromId(this.soldierQian[0].id);
				GlobalFun.refreshCardData(card.insId, {ownNum:card.ownNum});
			MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
		}
	}
	private goFihgt()
	{
		if(this.wj)
		{
			let card:CardAttrVo = GlobalFun.getCardDataFromId(this.wj.id);
			let level = card.level;
			switch(this.wj.id)
			{
				/**Senior general */
				case 10000:
				case 10001:
				case 10002:
					for(let i = 0; i < this.soldierQian.length; i++)
					{
						let hp = Math.floor(this.soldierQian[i].getData().hp + (0.3 + level * 0.05) * this.soldierQian[i].getData().hp);
						let attack = Math.floor(this.soldierQian[i].getData().attack + (0.3 + level * 0.05) * this.soldierQian[i].getData().attack);
						this.soldierQian[i].setData(hp, attack)
					}
					break;
				/**Junior general */
				default:
					for(let i = 0; i < this.soldierQian.length; i++)
					{
						let hp = Math.floor(this.soldierQian[i].getData().hp + (0.2 + level * 0.05) * this.soldierQian[i].getData().hp);
						let attack = Math.floor(this.soldierQian[i].getData().attack + (0.2 + level * 0.05) * this.soldierQian[i].getData().attack);
						this.soldierQian[i].setData(hp, attack)
					}
					break;
			}
		}
		for(let i = 0; i < this.soldierQian.length; i++)
		{
			GameCfg.playerPH += this.soldierQian[i].getHp();
		}
		for(let i = 0; i < this.soldierHou.length; i++)
		{
			GameCfg.playerPH += this.soldierHou[i].getHp();
		}
		GameCfg.playerPH_max = GameCfg.playerPH;
		console.log(GameCfg.playerPH_max);
		
		if(this.id == 0)
		{
			egret.Tween.get(this)
			.to({x:150}, 500)
			.wait(300)
			.call(()=>{
				this.fighting();
			});
		}else
		{
			egret.Tween.get(this)
			.to({x:-300}, 500);
		}
	}
	private fighting_p()
	{
		setTimeout(()=>{
			this.fighting();
		}, 500)
	}
	private fighting()
	{	
		if(this.id != 0)
		{
			return;
		}
		var str:string = "";
		str = "Qian";
		
		if(this["soldier" + str].length <= 0)
		{
			this.fighting();
		}else
		{
			switch(this["soldier" + str][0].id)
			{
				case 1:/**cavalry */
				case 3:/**Infantry */
					let _x;
					if(GameCfg.np[0].soldierQian.length > 0)
					{
						let _x0 = GameCfg.np[0].localToGlobal(GameCfg.np[0].qian_group.x, GameCfg.np[0].qian_group.y);
						_x = this.globalToLocal(_x0.x, _x0.y).x;
					}else
					{
						let _x0 = GameCfg.np[0].localToGlobal(GameCfg.np[0].hou_group.x, GameCfg.np[0].hou_group.y);
						_x = this.globalToLocal(_x0.x, _x0.y).x;
					}
					for(let i = 0; i < this["soldier" + str].length; i++)
					{
						egret.Tween.get(this["soldier" + str][i])
						.wait(Math.floor(Math.random()*100))
						.call(()=>{
							if(this["soldier" + str][i])
								this["soldier" + str][i].setRun("right");
						}, this["soldier" + str][i])
						.to({x:_x + i * (5 + this.id * 3) - 30}, 500)
						.call(()=>{
							if(this["soldier" + str][i])
								this["soldier" + str][i].setAttack();
						}, this["soldier" + str][i])
						.wait(250)
						.call(()=>{
							if(this["soldier" + str][i])
								MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, this["soldier" + str][i].getAttack());
						})
						.wait(300)
						.call(()=>{
							if(this["soldier" + str][i])
								this["soldier" + str][i].setRun("left");
						}, this["soldier" + str][i])
						.to({x:this["soldier" + str][i].x}, 500)
						.call(()=>{
							if(this["soldier" + str][i])
							{
								this["soldier" + str][i].setStand();
								egret.Tween.removeTweens(this["soldier" + str][i]);
							}
						}, this["soldier" + str][i]);
					}
					egret.Tween.get(this)
					.wait(1700)
					.call(()=>{
						egret.Tween.removeTweens(this);
						MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, this);
					});
					break;
				case 2:/**Bowmen */
					for(let i = 0; i < this["soldier" + str].length; i++)
					{
						egret.Tween.get(this["soldier" + str][i])
						.wait(Math.floor(Math.random()*100))
						.call(()=>{
							if(this["soldier" + str][i])	
								this["soldier" + str][i].setAttack();
						}, this["soldier" + str][i])
						.wait(150)
						.call(()=>{
							if(this["soldier" + str][i])
							{
								MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, {type:"player", x:this["soldier"+str][i].x, y:this["soldier" + str][i].y, img:"game_arrow0_png"});
								this["soldier" + str][i].setStand();
							}
						})
						.wait(700)
						.call(()=>{
							if(this["soldier" + str][i])
								MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, this["soldier" + str][i].getAttack());
						})
						.to({x:this["soldier" + str][i].x}, 500)
						.call(()=>{
							if(this["soldier" + str][i])
								egret.Tween.removeTweens(this["soldier" + str][i]);
						}, this["soldier" + str][i]);
					}
					egret.Tween.get(this)
					.wait(1500)
					.call(()=>{
						egret.Tween.removeTweens(this);
						MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, this);
					});
					break;
				case 10008:/**bartizan */
					for(let i = 0; i < this["soldier" + str].length; i++)
					{
						egret.Tween.get(this["soldier" + str][i])
						.wait(Math.floor(Math.random()*100))
						.call(()=>{})
						.wait(50)
						.call(()=>{
							if(this["soldier" + str][i])
								MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, {type:"player", x:this["soldier"+str][i].x, y:this["soldier" + str][i].y, img:"game_arrow2_png"});
						})
						.wait(500)
						.call(()=>{
							if(this["soldier" + str][i])
								MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, this["soldier" + str][i].getAttack());
						})
						.wait(500)
						.call(()=>{
							if(this["soldier" + str][i])
								egret.Tween.removeTweens(this["soldier" + str][i]);
						}, this["soldier" + str][i]);
					}
					egret.Tween.get(this)
					.wait(1200)
					.call(()=>{
						egret.Tween.removeTweens(this);
						MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, this);
					});
					break;
				case 10009:/**Catapult */
					for(let i = 0; i < this["soldier" + str].length; i++)
					{
						egret.Tween.get(this["soldier" + str][i])
						.wait(Math.floor(Math.random()*100))
						.call(()=>{
							if(this["soldier" + str][i])
								this["soldier" + str][i].setAttack();
						}, this["soldier" + str][i])
						.wait(150)
						.call(()=>{
							if(this["soldier" + str][i])
							{
								MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, {type:"player", x:this["soldier"+str][i].x, y:this["soldier" + str][i].y, img:"game_arrow1_png"});
								this["soldier" + str][i].setStand();
							}
						})
						.wait(700)
						.call(()=>{
							if(this["soldier" + str][i])
								MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, this["soldier" + str][i].getAttack());
						})
						.wait(500)
						.call(()=>{
							if(this["soldier" + str][i])
								egret.Tween.removeTweens(this["soldier" + str][i]);
						}, this["soldier" + str][i]);
					}
					egret.Tween.get(this)
					.wait(1500)
					.call(()=>{
						egret.Tween.removeTweens(this);
						MessageManager.inst().dispatch(LocalStorageEnum.NPC_FIGHTING, this);
					});
					break;
			}
		}
	}
	private gamePause()
	{
		egret.Tween.pauseTweens(this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private gameStart()
	{
		egret.Tween.resumeTweens(this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private update()
	{
		if(this.soldierQian.length <= 0 && this.soldierHou.length <= 0)
		{
			this.haveObj = false;
			this.have = false;
		}else
		{
			this.haveObj = true;
			this.have = true;
		}
		
	}
	/**Set up layers */
	private setlayer()
	{
		let layerAny:any[] = [];
		if(this.soldierQian.length > 0)
		{
			for(let i = 0; i < this.soldierQian.length; i++)
			{
				layerAny.push(this.soldierQian[i]);
			}
		}
		if(this.soldierHou.length > 0)
		{
			for(let i = 0; i < this.soldierHou.length; i++)
			{
				layerAny.push(this.soldierHou[i]);
			}
		}
		if(this.wj)
		{
			layerAny.push(this.wj);
		}
		/**sort */
		let n = layerAny.length;
		for (let i = 0; i < n; i++) 
		{
            for (let j = 0; j < n - i - 1; j++) 
			{
                if (layerAny[j].y > layerAny[j + 1].y) 
				{
                    let any = layerAny[j];
					layerAny[j] = layerAny[j + 1];
					layerAny[j + 1] = any;
                }
            }
		}
		this.setChildIndex(this.bg, 0);
		for(let i = 0; i < layerAny.length; i++)
		{
			this.setChildIndex(layerAny[i], i+1);
		}
	}
	private subHp(evt:CustomEvt)
	{
		if(this.id != 0)
			return;

		if(this.soldierQian.length > 0)
		{
			let num;
			let any = this.soldierQian[Math.floor(Math.random()*this.soldierQian.length)];
			num = evt.data + Math.floor(evt.data * (Math.random()*0.4 - 0.2));;
			any.setHp(num);
			let hurt = new Hurt(num);
				hurt.x = any.x;
				hurt.y = any.y;
			this.addChildAt(hurt, 99999999);
		}else if(this.soldierHou.length > 0)
		{
			let num;
			let any = this.soldierHou[Math.floor(Math.random()*this.soldierHou.length)];
			num = evt.data + Math.floor(evt.data * (Math.random()*0.4 - 0.2));;
			any.setHp(num);
			let hurt = new Hurt(num);
				hurt.x = any.x;
				hurt.y = any.y;
			this.addChildAt(hurt, 99999999);
		}
		for(let i = 0; i < this.soldierQian.length; i++)
		{
			if(this.soldierQian[i].vis == false)
			{
				this.soldierQian[i].die();
				this.soldierQian.splice(i, 1);
				i--;
			}
		}
		for(let i = 0; i < this.soldierHou.length; i++)
		{
			if(this.soldierHou[i].vis == false)
			{
				this.soldierHou[i].die();
				this.soldierHou.splice(i, 1);
				i--;
			}
		}
		if(this.soldierQian.length <= 0 && this.soldierHou.length <= 0)
		{
			this.haveObj = false;
			MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
			MessageManager.inst().dispatch(LocalStorageEnum.SWITCH_PLAPER, this);
			MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_FIGHTING, this.fighting_p, this);
			MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_SUBHP, this.subHp, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
			egret.Tween.removeTweens(this);
			this.removeMySelf();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}
	}
	private createSkill(evt:CustomEvt)
	{
		if(evt.data[0].x >= this.x && evt.data[0].x <= this.x + this.width && evt.data[0].y >= this.y && evt.data[0].y <= this.y + this.height)
		{
			switch(evt.data[0].id)
			{
				/**Add blood */
				case 100101:
				case 100102:
				case 100103:
				case 100104:
					if(GameCfg.gameStart)
					{
						this.showEff(evt.data[0].id,()=>{
							this.addHp("Qian", evt.data[0].id);
						})
					}else
					{
						UserTips.inst().showTips("Currently unavailable");
					}
					break;
			}
		}
	}
	private showEff(_id:number,cb:()=>void){
		let rect:eui.Rect = new eui.Rect();
				rect.fillColor = 0x000000;
				rect.width = StageUtils.inst().getWidth();
				rect.height = StageUtils.inst().getHeight();
				rect.alpha = 0.3;
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
				role.x = -50;
				role.y = skillBg.y + skillBg.height - 30;
				role.alpha = 0;
				egret.Tween.get(role).to({x:100,alpha:1},400,egret.Ease.circOut).to({x:140},3000)

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
	private addHp(str:string, id:number)
	{
		let card:CardAttrVo = GlobalFun.getCardDataFromId(id);
		for(let i = 0; i < this["soldier" + str].length; i++)
		{
			this["soldier" + str][i].addHp(card.upgradeNum);
		}
		card.ownNum -= 1;
		GlobalFun.refreshCardData(id, {ownNum:card.ownNum});
		MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
	}
	public setBg(_num:number)
	{
		switch(_num)
		{
			case 1:
				this.bg.source = "fight_bg" + this.id + "_png";
				break;
			case 2:
				this.bg.source = "fight_bg" + this.id + "_lv_png";
				break;
		}
	}
	public removeMySelf()
	{
		for(let i = 0; i < this.soldierQian.length; i++)
		{
			this.removeChild(this.soldierQian[i]);
			this.soldierQian.splice(i, 1);
			i--;
		}
		this.soldierQian = [];
		if(this.wj)
		{
			this.removeChild(this.wj);
			this.wj = null;
		}
		MessageManager.inst().removeListener(LocalStorageEnum.CREATE_PLAYER, this.createRole, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
		MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_SUBHP, this.subHp, this);
		MessageManager.inst().removeListener(LocalStorageEnum.PLAYER_FIGHTING, this.fighting_p, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().removeListener(LocalStorageEnum.RELEASE_SKILLS, this.createSkill, this);
		this.qian_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchQian, this);
		this.hou_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHou, this);
		this.role_group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchWJ, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}