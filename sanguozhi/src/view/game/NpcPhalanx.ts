class NpcPhalanx extends BaseView
{
	public id:number;
	public soldierQian:any[] = [];
	public soldierHou:any[] = [];
	public qian_group:eui.Group;
	public hou_group:eui.Group;
	public role_group:eui.Group;
	private wj:Npc;
	private round:number = 0;
	public haveObj:boolean = true;
	private xy:number = 0; /**眩晕 */
	private zd:number = 0; /**中毒 */
	private bg:eui.Image;
	private cloud_group:eui.Group;
	public constructor(_id:number) 
	{
		super();
		this.id = _id;
		this.skinName = "NpcPhalanxSkin";
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
		MessageManager.inst().addListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
		MessageManager.inst().addListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().addListener(LocalStorageEnum.RELEASE_SKILLS, this.createSkill, this);
		MessageManager.inst().addListener(LocalStorageEnum.GEANGUANHUO, this.guanhuo, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
	}
	private init()
	{
		this.bg.source = "fight_bg" + this.id + "_png";
		
		if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].qian!=0)
		{
			for(let i = 0; i < 10; i++)
			{
				let bing0 = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].qian, false);
				if(bing0.id == 1)
					bing0.scaleX = bing0.scaleY = 0.4;
				else
					bing0.scaleX = bing0.scaleY = 0.5;
				if(i <= 4)
				{	
					if(bing0.id != 1)
					{
						bing0.y = 70 + i * 20;
						bing0.x = -5 * (this.id + 1) + this.qian_group.x + this.qian_group.width / 2 + i * (5 + this.id * 2);
					}else
					{
						bing0.y = 50 + i * 25;
						bing0.x = -35 + this.qian_group.x + this.qian_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
					}
				}
				else
				{	
					if(bing0.id != 1)
					{
						bing0.y = 100 + i * 20;
						bing0.x = -0 * (this.id + 1) + this.qian_group.x + this.qian_group.width / 2 + i * (6 + this.id * 2);
					}else
					{
						bing0.y = 70 + i * 25;
						bing0.x = -30 + this.qian_group.x + this.qian_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
					}
				}
				this.addChild(bing0);
				this.soldierQian.push(bing0);

				let bing1 = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].qian, false);
				if(bing1.id == 1)
					bing1.scaleX = bing1.scaleY = 0.4;
				else
					bing1.scaleX = bing1.scaleY = 0.5;
				if(i <= 4)
				{	
					if(bing1.id != 1)
					{
						bing1.y = 70 + i * 20;
						bing1.x = -60 * (this.id + 1) + this.hou_group.x + this.hou_group.width / 2 + i * (5 + this.id * 2);
					}else
					{
						bing1.y = 50 + i * 25;
						bing1.x = -70 + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
					}
				}
				else
				{	
					if(bing1.id != 1)
					{
						bing1.y = 100 + i * 20;
						bing1.x = -55 + this.hou_group.x + this.hou_group.width / 2 + i * (6 + this.id * 2);
					}else
					{
						bing1.y = 70 + i * 25;
						bing1.x = -65 + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3) - this.id * 10;
					}
				}
				this.addChild(bing1);
				this.soldierQian.push(bing1);
			}
		}
		// if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].hou!=0)
		// {
		// 	for(let i = 0; i < 10; i++)
		// 	{
		// 		let bing = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].bing[this.id].hou, false);
		// 		bing.scaleX = bing.scaleY = 0.5;
		// 		if(i <= 4)
		// 		{	
		// 			bing.y = 20 + i * 30;
		// 			bing.x = -25 * (this.id + 1) + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3);
		// 		}
		// 		else
		// 		{	
		// 			bing.y = 70 + i * 30;
		// 			bing.x = -20 * (this.id + 1) + this.hou_group.x + this.hou_group.width / 2 + i * (8 + this.id * 3);
		// 		}
		// 		this.addChild(bing);
		// 		this.soldierHou.push(bing);
		// 	}
		// }
		if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].qian!=0)
		{
			for(let i = 0; i < 4; i++)
			{
				let ta0 = new BuildNpc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].qian, false);
				if(i <= 1)
				{
					ta0.y = 70 + i * 50;
					ta0.x = this.qian_group.x + this.qian_group.width / 2 + i * (10 + this.id * 10) - (20 + this.id * 5) + 25;
				}
				else
				{	
					ta0.y = 130 + i * 50;
					ta0.x = this.qian_group.x + this.qian_group.width / 2 + i * (10 + this.id * 10) - (20 + this.id * 5) + 35;
				}
				this.addChild(ta0);
				this.soldierQian.push(ta0);

				// let ta1 = new BuildNpc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].qian, false);
				// ta1.scaleX = ta1.scaleY = 0.5;
				// if(i <= 1)
				// {
				// 	ta1.y = 80 + i * 50;
				// 	ta1.x =  -20 +this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
				// }
				// else
				// {	
				// 	ta1.y = 150 + i * 50;
				// 	ta1.x = -20 + this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
				// }
				// this.addChild(ta1);
				// this.soldierQian.push(ta1);
			}
		}
		// if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].hou!=0)
		// {
		// 	for(let i = 0; i < 4; i++)
		// 	{
		// 		let ta = new BuildNpc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].ta[this.id].hou, false);
		// 		ta.scaleX = ta.scaleY = 0.5;
		// 		if(i <= 1)
		// 		{
		// 			ta.y = 80 + i * 50;
		// 			ta.x =  -20 +this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
		// 		}
		// 		else
		// 		{	
		// 			ta.y = 150 + i * 50;
		// 			ta.x = -20 + this.hou_group.x + this.hou_group.width / 2 + i * (20 + this.id * 10) - (10 + this.id * 5);
		// 		}
		// 		this.addChild(ta);
		// 		this.soldierHou.push(ta);
		// 	}
		// }
		if(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].wj[this.id] != 0)
		{
			this.wj = new Npc(GameCfg.checkpoint[GameCfg.chapter - 1][GameCfg.level - 1].wj[this.id], false);
			this.wj.scaleX = this.wj.scaleY = 0.5;
			this.wj.x = this.role_group.x + this.role_group.width / 2;
			this.wj.y = this.role_group.y + this.role_group.height / 2;
			this.addChild(this.wj)
		}
		this.addChildAt(this.cloud_group, 999999);
		this.setlayer();
	}
	private goFihgt()
	{
		let level = (GameCfg.chapter - 1) * 4 + GameCfg.level;
		for(let i = 0; i < this.soldierQian.length; i++)
		{
			let hp = Math.floor(this.soldierQian[i].getData().hp + level * 0.1 * this.soldierQian[i].getData().hp);
			let attack = Math.floor(this.soldierQian[i].getData().attack + level * 0.1 * this.soldierQian[i].getData().attack);
			this.soldierQian[i].setData(hp, attack)
		}

		for(let i = 0; i < this.soldierQian.length; i++)
		{
			GameCfg.npcPH += this.soldierQian[i].getHp();
		}
		for(let i = 0; i < this.soldierHou.length; i++)
		{
			GameCfg.npcPH += this.soldierHou[i].getHp();
		}
		GameCfg.npcPH_max = GameCfg.npcPH;
		if(this.soldierHou.length <= 0 && this.soldierQian.length <= 0)
		{
			this.haveObj = false;
			MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
			MessageManager.inst().removeListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
			MessageManager.inst().removeListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
			egret.Tween.removeTweens(this);
			this.removeMySelf();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}else 
		{
			this.haveObj = true;
		}
		if(this.id == 0)
		{
			egret.Tween.get(this)
			.to({x:StageUtils.inst().getWidth() - (150 + this.width)}, 500);
		}else
		{
			egret.Tween.get(this)
			.to({x:StageUtils.inst().getWidth() + (300 + this.width)}, 500);
		}
		egret.Tween.removeTweens(this.cloud_group);
		egret.Tween.get(this.cloud_group)
		.to({alpha:0}, 300);
		
	}
	private subHp(evt:CustomEvt)
	{
		if(this.id != 0)
			return;
		if(this.soldierQian.length > 0)
		{
			let num;
			let any = this.soldierQian[Math.floor(Math.random()*this.soldierQian.length)];
			num = evt.data + Math.floor(evt.data * (Math.random()*0.4 - 0.2));
			any.setHp(num);
		}else if(this.soldierHou.length > 0)
		{
			let num;
			let any = this.soldierHou[Math.floor(Math.random()*this.soldierHou.length)];
			num = evt.data + Math.floor(evt.data * (Math.random()*0.4 - 0.2));
			any.setHp(num);
		}
	}
	private gamePause()
	{
		egret.Tween.pauseTweens(this);
	}
	private gameStart()
	{
		egret.Tween.resumeTweens(this);
	}
	private update()
	{
		if(!GameCfg.gameStart)
			return;
		if(this.soldierHou.length <= 0 && this.soldierQian.length <= 0)
		{
			this.haveObj = false;
			MessageManager.inst().dispatch(LocalStorageEnum.GAME_PAUSE, this);
			MessageManager.inst().dispatch(LocalStorageEnum.SWITCH_NPC, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
			MessageManager.inst().removeListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
			MessageManager.inst().removeListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
			MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
			egret.Tween.removeTweens(this);
			this.removeMySelf();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}else 
		{
			this.haveObj = true;
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
	}
	/**设置图层 */
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
		/**排序 */
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
	private fighting_n()
	{
		setTimeout(()=>{
			this.fighting();
		}, 500)
	}
	private fighting()
	{
		if(this.id == 0)
		{
			if(this.xy > 0)
			{
				this.xy--;
				if(this.xy <= 0)
				{
					this.removeXy();
				}
				MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, this);
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
					case 1:/**骑兵 */
					case 3:/**步兵 */
						let _x;
						if(GameCfg.pp[0].soldierQian.length > 0)
						{
							let _x0 = GameCfg.pp[0].localToGlobal(GameCfg.pp[0].qian_group.x, GameCfg.pp[0].qian_group.y);
							_x = this.globalToLocal(_x0.x, _x0.y).x;
						}else
						{
							let _x0 = GameCfg.pp[0].localToGlobal(GameCfg.pp[0].hou_group.x, GameCfg.pp[0].hou_group.y);
							_x = this.globalToLocal(_x0.x, _x0.y).x;
						}
						for(let i = 0; i < this["soldier" + str].length; i++)
						{
							egret.Tween.get(this["soldier" + str][i])
							.wait(Math.floor(Math.random()*100))
							.call(()=>{
								if(this["soldier" + str][i])
									this["soldier" + str][i].setRun("left");
							}, this["soldier" + str][i])
							.to({x:_x - i * (4 + this.id * 3) + 100}, 500)
							.call(()=>{
								if(this["soldier" + str][i])
									this["soldier" + str][i].setAttack();
							}, this["soldier" + str][i])
							.wait(250)
							.call(()=>{
								if(this["soldier" + str][i])
									MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, this["soldier" + str][i].getAttack());
							})
							.wait(300)
							.call(()=>{
								if(this["soldier" + str][i])
									this["soldier" + str][i].setRun("right");
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
							MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, this);
						});
						break;
					case 2:/**弓兵 */
						for(let i = 0; i < this["soldier" + str].length; i++)
						{
							if(!this["soldier" + str][i])
								return;
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
									MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, {type:"npc", x:this["soldier"+str][i].x, y:this["soldier" + str][i].y, img:"game_arrow0_png"});
									this["soldier" + str][i].setStand();
								}
							})
							.wait(700)
							.call(()=>{
								if(this["soldier" + str][i])
									MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, this["soldier" + str][i].getAttack());
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
							MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, this);
						});
						break;
					case 10008:/**箭塔 */
						for(let i = 0; i < this["soldier" + str].length; i++)
						{
							if(!this["soldier" + str][i])
								return;
							egret.Tween.get(this["soldier" + str][i])
							.wait(Math.floor(Math.random()*100))
							.call(()=>{})
							.wait(50)
							.call(()=>{
								if(this["soldier" + str][i])
									MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, {type:"npc", x:this["soldier"+str][i].x, y:this["soldier" + str][i].y, img:"game_arrow2_png"});
							})
							.wait(500)
							.call(()=>{
								if(this["soldier" + str][i])
									MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, this["soldier" + str][i].getAttack());
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
							MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, this);
						});
						break;
					case 10009:/**投石车 */
						for(let i = 0; i < this["soldier" + str].length; i++)
						{
							if(!this["soldier" + str][i])
								return;
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
									MessageManager.inst().dispatch(LocalStorageEnum.CREATE_BULLET, {type:"npc", x:this["soldier"+str][i].x, y:this["soldier" + str][i].y, img:"game_arrow1_png"});
									this["soldier" + str][i].setStand();
								}
							})
							.wait(700)
							.call(()=>{
								if(this["soldier" + str][i])
									MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_SUBHP, this["soldier" + str][i].getAttack());
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
							MessageManager.inst().dispatch(LocalStorageEnum.PLAYER_FIGHTING, this);
						});
						break;
				}
			}
		}
	}
	private createSkill(evt:CustomEvt)
	{
		if(evt.data[0].x >= this.x && evt.data[0].x <= this.x + this.width && evt.data[0].y >= this.y && evt.data[0].y <= this.y + this.height)
		{
			
			switch(evt.data[0].id)
			{
				case 100071:
					/**擒贼擒王 */
					if(GameCfg.gameStart)
					{
						this.showEff(100071,()=>{
							let card:CardAttrVo = GlobalFun.getCardDataFromId(evt.data[0].id);
							for(let i = 0; i < 8; i++)
							{
								setTimeout(()=>{
									let ani:MovieClip = new MovieClip();
									ani.x = this.wj.x + Math.random() * 20;
									ani.y = -ani.height + 60;
									this.role_group.addChild(ani);
									ani.playFile(`${EFFECT}wang_effect`, 1, null, true);
									MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, Math.floor(card.atk * 0.5));
									let hurt = new Hurt(card.atk);
										hurt.x = this.wj.x + Math.random() * 20;
										hurt.y = -ani.height + 60;
									this.role_group.addChild(hurt);
								}, i*300);
							}
							card.ownNum -= 1;
							GlobalFun.refreshCardData(evt.data[0].id, {ownNum:card.ownNum});
							MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
						})
						
					}else
					{
						UserTips.inst().showTips("当前不可使用");
					}
					break;
				case 100061:
				case 100062:
				case 100063:
				case 100064:
					/**暗度陈仓 */
					if(GameCfg.gameStart)
					{
						this.showEff(evt.data[0].id,()=>{
							let card:CardAttrVo = GlobalFun.getCardDataFromId(evt.data[0].id);
							// let num = this.soldierQian.length + this.soldierHou.length;
							// for(let i = 0; i < num; i++)
							// {
							// 	MessageManager.inst().dispatch(LocalStorageEnum.NPC_SUBHP, card.atk);
							// }
							for(let i = 0; i < 6; i++)
							{
								setTimeout(()=>{
									let ani:MovieClip = new MovieClip();
									ani.x = Math.random()*this.width;
									ani.y = Math.random()*this.height;
									ani.scaleX = ani.scaleY = 0.5;
									this.addChild(ani);
									ani.playFile(`${EFFECT}adcc_effect`, 1, null, true, "", null, 10);
									for(let i = 0; i < this.soldierQian.length; i++)
									{
										this.soldierQian[i].setHp(Math.floor(card.atk * 0.1));
									}
									for(let i = 0; i < this.soldierHou.length; i++)
									{
										this.soldierHou[i].setHp(Math.floor(card.atk * 0.1));
									}
								}, i * 500);
							}
							
							card.ownNum -= 1;
							GlobalFun.refreshCardData(evt.data[0].id, {ownNum:card.ownNum});
							MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
						})
						
					}else
					{
						UserTips.inst().showTips("当前不可使用");
					}
					break;
				case 100051:
				case 100052:
				case 100053:
				case 100054:
					/**美人计 */
					if(GameCfg.gameStart)
					{
						this.showEff(evt.data[0].id,()=>{
							let card:CardAttrVo = GlobalFun.getCardDataFromId(evt.data[0].id);
							this.xy = card.buffTime;
							let ani:MovieClip = new MovieClip();
							ani.x = this.width/2;
							ani.y = this.height/2;
							this.addChild(ani);
							ani.playFile(`${EFFECT}mrj_effect`, 1, null, true);
							this.xyEffect();
							card.ownNum -= 1;
							GlobalFun.refreshCardData(evt.data[0].id, {ownNum:card.ownNum});
							MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
						});
					}else
					{
						UserTips.inst().showTips("当前不可使用");
					}
					break;
				case 100041:
				case 100042:
				case 100043:
				case 100044:
					/**趁火打劫 */
					if(GameCfg.gameStart)
					{
						this.showEff(evt.data[0].id,()=>{
							let card:CardAttrVo = GlobalFun.getCardDataFromId(evt.data[0].id);
						for(let i = 0; i < this.soldierQian.length; i++)
						{
							this.soldierQian[i].poisoning(card.atk, "chdj_effect");
						}
						for(let i = 0; i < this.soldierHou.length; i++)
						{
							this.soldierHou[i].poisoning(card.atk, "chdj_effect");
						}
						this.zhongdu();
						card.ownNum -= 1;
						GlobalFun.refreshCardData(evt.data[0].id, {ownNum:card.ownNum});
						MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
						})
						
					}else
					{
						UserTips.inst().showTips("当前不可使用");
					}
					break;
				case 10003:
					/**隔岸观火 */
					
					if(!GameCfg.gameStart)
					{
						this.showEff(10003,()=>{
							let card:CardAttrVo = GlobalFun.getCardDataFromId(evt.data[0].id);
						MessageManager.inst().dispatch(LocalStorageEnum.GEANGUANHUO, this);
						card.ownNum -= 1;
						GlobalFun.refreshCardData(evt.data[0].id, {ownNum:card.ownNum});
						MessageManager.inst().dispatch(LocalStorageEnum.UPDATE_GAME_CARD, this);
						})
						
					}else
					{
						UserTips.inst().showTips("当前不可使用");
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
	/**中毒 */
	private zhongdu()
	{
		this.zd = 3;
		egret.Tween.pauseTweens(this.qian_group);
		egret.Tween.removeTweens(this.qian_group);
		egret.Tween.get(this.qian_group, {loop:true})
		.wait(500)
		.call(()=>{
			if(this.zd <= 0)
			{
				egret.Tween.pauseTweens(this.qian_group);
				egret.Tween.removeTweens(this.qian_group);
				return;
			}
			for(let i = 0; i < this.soldierQian.length; i++)
			{
				this.soldierQian[i].poisoning(Math.floor(Math.random()*5 + 10), "buff4");
			}
			for(let i = 0; i < this.soldierHou.length; i++)
			{
				this.soldierHou[i].poisoning(Math.floor(Math.random()*5 + 10), "buff4");
			}
			this.zd--;
		}, this)
	}
	private guanhuo()
	{
		egret.Tween.get(this.cloud_group)
		.to({alpha:0}, 300)
		.wait(1500)
		.to({alpha:1}, 300);
	}
	/**眩晕效果 */
	private xyEffect()
	{
		for(let i = 0; i < this.soldierQian.length; i++)
		{
			this.soldierQian[i].xuanyun();
		}
		for(let i = 0; i < this.soldierHou.length; i++)
		{
			this.soldierHou[i].xuanyun();
		}
	}
	private removeXy()
	{
		for(let i = 0; i < this.soldierQian.length; i++)
		{
			this.soldierQian[i].removeAni();
		}
		for(let i = 0; i < this.soldierHou.length; i++)
		{
			this.soldierHou[i].removeAni();
		}
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
		MessageManager.inst().removeListener(LocalStorageEnum.GO_FIGHTING, this.goFihgt, this);
		MessageManager.inst().removeListener(LocalStorageEnum.NPC_FIGHTING, this.fighting_n, this);
		MessageManager.inst().removeListener(LocalStorageEnum.NPC_SUBHP, this.subHp, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().removeListener(LocalStorageEnum.RELEASE_SKILLS, this.createSkill, this);
		MessageManager.inst().removeListener(LocalStorageEnum.GEANGUANHUO, this.guanhuo, this);
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