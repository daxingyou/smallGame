class Role extends egret.Sprite
{
	private mc:MovieClip;
	private mc_skill:MovieClip;
	private mc_buff:MovieClip;
	private mc_hurt:MovieClip;
	private id:number = 1;
	private nx:number;
	private ny:number;
	public priority:number;
	public dead:boolean = false;
	public monster:any = null;
	private speedX:number = Math.floor(Math.random()*10 + 5);
	private speedY:number = Math.floor(Math.random()*5 + 5);
	private distance:number; /**攻击距离 */
	private moveBool:Boolean = false;
	private hp:Hp;
	private roleName:TextEffect;
	public constructor(_id:number, _x:number, _y:number, _nx?:number, _ny?:number) 
	{
		super();
		this.id = _id;
		this.nx = _nx;
		this.ny = _ny;
		this.x = _x;
		this.y = _y;
		this.init();
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		MessageManager.inst().addListener("PLAYER_PLACE", this.place, this);
		MessageManager.inst().addListener("PLAYER_HURT", this.playerHurt, this);
		MessageManager.inst().addListener("PLAYER_SKILL", this.playerSkill, this);
		MessageManager.inst().addListener("ROLE_ADDHP", this.addHp, this);
		MessageManager.inst().addListener("HU_DUN", this.shield, this);
		MessageManager.inst().addListener("GAME_OVER", this.gameOver, this);
		MessageManager.inst().addListener("ROLE_SKILL_NAME", this.skillName, this);
	}
	private init()
	{
		if(this.id == 1 || this.id == 2 || this.id == 5)
		{
			this.priority = 0;
			this.distance = 150;
		}else 
		{
			this.priority = 1;
			this.distance = 300;
		}
		this.mc = new MovieClip();
		this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
		this.addChild(this.mc);
		this.mc_skill = new MovieClip();
		this.addChild(this.mc_skill);
		this.mc_buff = new MovieClip();
		this.addChild(this.mc_buff);
		this.mc_hurt = new MovieClip();
		this.mc_hurt.scaleX = this.mc_hurt.scaleY = 0.7;
		this.mc_hurt.x = -10;
		this.mc_hurt.y = -50;
		this.addChild(this.mc_hurt);

		egret.Tween.get(this)
		.to({x:this.nx - 100, y:this.ny}, 1000)
		.call(()=>{
			this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "idle", null, 13);
			setTimeout(this.setPos(), 500);
		});

		this.hp = new Hp(GameConfig.roleData[this.id].hp,GameConfig.roleData[this.id].level);
		this.hp.x = -this.hp.width / 2;
		this.hp.y = -130;
		this.addChild(this.hp);

		this.roleName = new TextEffect(GameApp.roleData[this.id - 1].name, 0xF2A909, 1);
		this.roleName.x = -this.roleName.width / 2;
		this.roleName.y = -170;
		this.addChild(this.roleName);
	}
	/**伤害 */
	private playerHurt(evt:CustomEvt)
	{
		if(evt.data[0] == this)
		{
			/**伤害字体 */
			MessageManager.inst().dispatch("HURT_FONT", {any:this, hurt:evt.data[1]});
			this.mc_hurt.visible = true;
			this.mc_hurt.playFile("resource/res/view/game/player_hurt_effect", 1, null, false, "", null, 15);
			setTimeout(()=>{this.mc_hurt.visible = false}, 800);
			this.hp.setHp(evt.data[1]);
			if(this.hp.getHp() <= 0)
			{
				this.dead = true;
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.removeMySelf()}, false, "dead", null, 10);
			}
		}
	}
	private gameOver()
	{
		egret.Tween.removeTweens(this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		MessageManager.inst().removeListener("PLAYER_PLACE", this.place, this);
		MessageManager.inst().removeListener("PLAYER_HURT", this.playerHurt, this);
		MessageManager.inst().removeListener("PLAYER_SKILL", this.playerSkill, this);
		MessageManager.inst().removeListener("ROLE_ADDHP", this.addHp, this);
		MessageManager.inst().removeListener("HU_DUN", this.shield, this);
		MessageManager.inst().removeListener("GAME_OVER", this.gameOver, this);
		MessageManager.inst().removeListener("ROLE_SKILL_NAME", this.skillName, this);
	}
	
	private update()
	{
		if(this.monster == null)
		{
			this.chooseTarget();
		}
		else if(this.monster != null && this.monster.dead == true && GameConfig.monsterFig.length > 0)
		{
			this.chooseTarget();
			setTimeout(()=>{
				this.setPos();
			}, 400)
		}
		/**移动 */
		if(this.moveBool)
		{
			// this.y += this.speedY;
			// if(Math.abs(this.y - this.monster.y) <= 15)
			// {
			// 	this.speedY = 0;
			// }
			if(!this.monster){
				return;
			}
			if(this.x < this.monster.x - this.distance)
			{
				this.x += this.speedX;
			}
			
			if(this.x >= this.monster.x - this.distance) 
			{
				this.moveBool = false;
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 3, ()=>{this.attack()}, false, "idle", null, 13);
			}
		}
	}
	/**选择目标 */
	private chooseTarget()
	{
		if(GameConfig.monster_qian.length > 0)
		{
			this.monster = GameConfig.monster_qian[Math.floor(Math.random()*GameConfig.monster_qian.length)];
		}else if(GameConfig.monster_zhong.length > 0)
		{
			this.monster = GameConfig.monster_zhong[Math.floor(Math.random()*GameConfig.monster_zhong.length)];
		}else if(GameConfig.monster_hou.length > 0)
		{
			this.monster = GameConfig.monster_hou[Math.floor(Math.random()*GameConfig.monster_hou.length)];
		}
	}
	/**靠近目标 */
	private setPos()
	{
		this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
		this.moveBool = true;
	}
	/**攻击 */
	private attack()
	{
		this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.idle()}, false, "attack", null, 13);
		setTimeout(()=>{
			MessageManager.inst().dispatch("MONSTER_HURT", [this.monster, GameConfig.roleData[this.id].atk + Math.floor(Math.random()*40 - 20)]);
			MessageManager.inst().dispatch("NUQI", this.id);
		}, 200);
	}
	/**站立 */
	private idle()
	{
		this.mc.playFile("resource/res/view/game/role/role_" + this.id, 2, ()=>{this.attack()}, false, "idle", null, 13);
	}
	/**归位 */
	private place()
	{
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.scaleX = -1;
		this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
		this.moveBool = false;
		egret.Tween.get(this)
		.to({x:this.nx - 100, y:this.ny}, 500)
		.call(()=>{
			this.scaleX = 1;
			MessageManager.inst().dispatch("NEXT_ROUND", this);
			this.monster = null;
			this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "run", null, 13);
			egret.Tween.get(this)
			.wait(1500)
			.call(()=>{
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, -1, null, false, "idle", null, 13);
			})
			.wait(500)
			.call(()=>{
				this.chooseTarget();
				this.setPos();
				this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
			});
		});
	}
	/**技能名字 */
	private skillName(evt:CustomEvt)
	{
		if(evt.data.id == this.id)
		{
			var skill = new TextEffect(evt.data.name, evt.data.color, 0);
				skill.x = -skill.width / 2;
			this.addChild(skill);
		}
	}

	/**释放技能 */
	private playerSkill(evt:CustomEvt)
	{
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		if(this.id == evt.data)
		{
			if(this.id == 1)
			{
				setTimeout(()=>{
					MessageManager.inst().dispatch("MONSTER_HURT", [this.monster, GameConfig.roleData[this.id].atk + 50]);
				}, 500);
				MessageManager.inst().dispatch("ROLE_SKILL_NAME", {name:GameApp.roleData[this.id - 1].skillName, color:0xff0000, id:this.id});
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.idle(); this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);}, false, "skill", null, 10);
			}else if(this.id == 2)
			{
				/**护盾 */
				MessageManager.inst().dispatch("HU_DUN", this);
				this.mc_skill.visible = true;
				MessageManager.inst().dispatch("ROLE_SKILL_NAME", {name:GameApp.roleData[this.id - 1].skillName, color:0xE5AD16, id:this.id});
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.idle(); this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);}, false, "skill", null, 10);
				this.mc_skill.playFile("resource/res/view/game/role/role_effect_" + this.id, 1, null, false, "", null, 10);
				setTimeout(()=>{
					this.mc_skill.visible = false;
				}, 800)
				this.mc_skill.y = -50;
				this.mc_skill.x = 50;
			}else if(this.id == 3)
			{
				/**法师技能 */
				MessageManager.inst().dispatch("FASHI_EFFECT", this);
				MessageManager.inst().dispatch("ROLE_SKILL_NAME", {name:GameApp.roleData[this.id - 1].skillName, color:0x0843A5, id:this.id});
				this.mc.y = -50;
				this.mc.x = -50;
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.idle(); this.mc.x = 0; this.mc.y = 0; this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);}, false, "skill", null, 8);
			}else if(this.id == 4)
			{
				/**加血 */
				MessageManager.inst().dispatch("ROLE_ADDHP", this);
				MessageManager.inst().dispatch("ROLE_SKILL_NAME", {name:GameApp.roleData[this.id - 1].skillName, color:0x00ff00, id:this.id});
				this.mc_skill.visible = true;
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.idle(); this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);}, false, "skill", null, 13);
				this.mc_skill.playFile("resource/res/view/game/role/role_effect_" + this.id, 1, null, false, "", null, 8);
				this.mc_skill.y = -80;
				setTimeout(()=>{
					this.mc_skill.visible = false;
				}, 800)
			}else if(this.id == 5)
			{
				MessageManager.inst().dispatch("MONSTER_HURT", [this.monster, GameConfig.roleData[this.id].atk + 50]);
				MessageManager.inst().dispatch("ROLE_SKILL_NAME", {name:GameApp.roleData[this.id - 1].skillName, color:0xCE0808, id:this.id});
				this.mc.y = 200;
				this.mc.playFile("resource/res/view/game/role/role_" + this.id, 1, ()=>{this.idle(); this.mc.y = 0; this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);}, false, "skill", null, 10);
			}
		}
	}
	/**增加护盾 */
	private shield()
	{
		this.mc_buff.visible = true;
		this.mc_buff.playFile("resource/res/view/game/huDun", 1, null, false, "", null, 10);
		this.mc_buff.x = -135;
		this.mc_buff.y = -100;
		setTimeout(()=>{
			this.mc_buff.visible = false;
		}, 800);
	}
	/**加血 */
	private addHp()
	{
		this.mc_buff.visible = true;
		this.mc_buff.playFile("resource/res/view/game/add_xue", 1, null, false, "", null, 10);
		this.mc_buff.x = -15;
		this.mc_buff.y = 30;
		this.hp.addHp(50);
		setTimeout(()=>{
			this.mc_buff.visible = false;
		}, 800);
	}
	private setSkill()
	{
		this.mc_skill.visible = false;
		this.mc.visible = true;
	}
	private removeMySelf()
	{
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		MessageManager.inst().removeListener("PLAYER_PLACE", this.place, this);
		MessageManager.inst().removeListener("PLAYER_HURT", this.playerHurt, this);
		MessageManager.inst().removeListener("PLAYER_SKILL", this.playerSkill, this);
		MessageManager.inst().removeListener("ROLE_ADDHP", this.addHp, this);
		this.mc.destroy();
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}