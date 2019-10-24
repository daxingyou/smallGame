class Monster extends egret.Sprite
{
	private mc:MovieClip;
	private mc_hurt:MovieClip;
	private id:number = 1;
	private nx:number;
	private ny:number;
	private moveBool:Boolean = false;
	private distance:number = 150 + Math.random() * 100;
	private speedX:number = Math.floor(Math.random()*10 + 5);
	private speedY:number = 2;
	public priority:number;
	public dead:boolean = false;
	public role:any;
	private hp:MonsterHp;
	private attack_num:number;
	public constructor(_priority:number, _id:number, _x:number, _y:number, _nx:number, _ny:number) 
	{
		super();
		this.id = _id;
		this.nx = _nx;
		this.ny = _ny;
		this.x = _x;
		this.y = _y;
		this.priority = _priority;
		this.init();
		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		MessageManager.inst().addListener("MONSTER_HURT", this.subHp, this);
	}
	private init()
	{
		this.mc = new MovieClip();
		this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, -1, null, false, "run", null, 13);
		this.addChild(this.mc);
		this.mc_hurt = new MovieClip();
		this.mc_hurt.scaleX = this.mc_hurt.scaleY = 0.6;
		this.mc_hurt.y = -30;
		this.addChild(this.mc_hurt);

		egret.Tween.get(this)
		.to({x:this.nx + 150, y:this.ny}, 1000)
		.call(()=>{
			this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, -1, null, false, "idle", null, 13);
			egret.Tween.get(this)
			.wait(500)
			.call(()=>{
				this.setPos();
			});
		});
		
		var hp_num:number;
		if(this.id < 6)
		{	
			hp_num = Math.floor(GameConfig.roleData[this.id - 1].hp / 3);
			this.attack_num = Math.floor(GameConfig.roleData[this.id - 1].atk / 8);
		}else
		{	
			hp_num = Math.floor(GameConfig.roleData[this.id - 1 - 5].hp / 3);
			this.attack_num = Math.floor(GameConfig.roleData[this.id - 1 - 5].atk / 8);
		}
		this.hp = new MonsterHp(hp_num);
		switch(this.id)
		{
			case 1:
			case 9:
				this.hp.x = -this.hp.width / 2;
				this.hp.y = -80;
				break;
			case 2:
				this.hp.x = -this.hp.width / 2;
				this.hp.y = -70;
				break;
			case 3:
				this.hp.x = -this.hp.width / 2;
				this.hp.y = -100;
				break;
			case 4:
				this.hp.x = -this.hp.width / 2;
				this.hp.y = -90;
				break;
			case 5:
				this.hp.x = -this.hp.width / 2;
				this.hp.y = -130;
				break;
			case 6:
			case 8:
				this.hp.x = -this.hp.width / 2;
				this.hp.y = -50;
				break;
			case 7:
				this.hp.x = -this.hp.width / 2 - 15;
				this.hp.y = -90;
				break;
		}
		this.addChild(this.hp);
	}
	private update()
	{
		if(this.role == null)
		{
			this.chooseTarget();
		}else if(this.role != null && this.role.dead == true)
		{
			this.chooseTarget();
			this.setPos();
		}

		/**移动 */
		if(this.moveBool)
		{
			// this.y += this.speedY;
			// if(Math.abs(this.y - this.role.y) <= 15)
			// {
			// 	this.speedY = 0;
			// }
			if(this.x > this.role.x + this.distance)
			{
				this.x -= this.speedX;
			}
			if(this.x <= this.role.x + this.distance) 
			{
				this.moveBool = false;
				this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, Math.floor(Math.random()*4 + 3), ()=>{this.attack()}, false, "idle", null, 13);
			}
		}
	}
	/**伤害 */
	private subHp(evt:CustomEvt)
	{
		if(evt.data[0] == "all")
		{
			MessageManager.inst().dispatch("HURT_FONT", {any:this, hurt:evt.data[1] + 70});
			this.mc_hurt.visible = true;
			this.mc_hurt.playFile("resource/res/view/game/monster_hurt_effect", 1, null, false, "", null, 15);
			setTimeout(()=>{this.mc_hurt.visible = false}, 800);
			this.hp.setHp(evt.data[1]);
			if(this.hp.getHp()<= 0)
			{
				this.dead = true;
				this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, 1, ()=>{this.removeMySelf()}, false, "dead", null, 13);
			}
		}else if(this == evt.data[0])
		{
			/**伤害字体 */
			MessageManager.inst().dispatch("HURT_FONT", {any:this, hurt:evt.data[1]});
			this.mc_hurt.visible = true;
			this.mc_hurt.playFile("resource/res/view/game/monster_hurt_effect", 1, null, false, "", null, 15);
			setTimeout(()=>{this.mc_hurt.visible = false}, 800);
			this.hp.setHp(evt.data[1]);
			if(this.hp.getHp()<= 0)
			{
				this.dead = true;
				this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, 1, ()=>{this.removeMySelf()}, false, "dead", null, 13);
			}
		}
	}
	/**选择目标 */
	private chooseTarget()
	{
		if(GameConfig.player_qian.length > 0)
		{
			this.role = GameConfig.player_qian[Math.floor(Math.random()*GameConfig.player_qian.length)];
		}else if(GameConfig.player_hou.length > 0)
		{
			this.role = GameConfig.player_hou[Math.floor(Math.random()*GameConfig.player_hou.length)];
		}
	}
	/**靠近目标 */
	private setPos()
	{
		this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, -1, null, false, "run", null, 13);
		this.moveBool = true;
		this.speedY = (this.y < this.role.y)?-this.speedY:this.speedY;
	}
	/**攻击 */
	private attack()
	{
		this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, 1, ()=>{this.idle()}, false, "attack", null, 13);
		setTimeout(()=>{
			MessageManager.inst().dispatch("PLAYER_HURT", [this.role, this.attack_num + Math.floor(Math.random() * 10 - 5)]);
		}, 200)
	}
	/**站立 */
	private idle()
	{
		this.mc.playFile("resource/res/view/game/monster/monster_" + this.id, Math.floor(Math.random()*4 + 3), ()=>{this.attack()}, false, "idle", null, 13);
	}
	private removeMySelf()
	{
		MessageManager.inst().removeListener("MONSTER_HURT", this.subHp, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
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