class Npc extends egret.Sprite
{
	private mc:MovieClip;
	public id:number;
	private move:boolean = false;
	private hp:number;
	private hp_max:number;
	private attack:number;
	public vis:boolean = true;
	private ani:MovieClip;
	private dir:string;
	private yan:MovieClip;
	public constructor(_id:number, _move:boolean) 
	{
		super();
		this.id = _id;
		this.move = _move;
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, this.removeMove, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
	}
	private gameStart()
	{
		egret.Tween.resumeTweens(this);
	}
	private gamePause()
	{
		egret.Tween.pauseTweens(this);
	}
	private init()
	{
		if(this.id == 1 || this.id == 2 || this.id == 3)
		{
			this.hp_max = this.hp = GameCfg.bingDate[this.id].hp;
			this.attack = GameCfg.bingDate[this.id].attack;
		}
		this.mc = new MovieClip();
		egret.Tween.get(this)
		.wait(Math.floor(Math.random()*100))
		.call(()=>{
			this.mc.playFile(`${EFFECT}role_${this.id}`, -1, null, false, "stand_left");
		});
		this.addChild(this.mc);
	}
	public setStand()
	{
		if(this.yan)
			this.yan.destroy();
		this.mc.playFile(`${EFFECT}role_${this.id}`, -1, null, false, "stand_left");
	}
	public setAttack()
	{
		if(this.yan)
			this.yan.destroy();
		this.mc.playFile(`${EFFECT}role_${this.id}`, 1, null, false, "attack_left");
	}
	
	public setRun(str:string)
	{
		if(this.yan)
			this.yan.destroy();
		if(str == "right")
		{
			this.yan = new MovieClip();
			this.yan.x = this.mc.x-this.mc.width /2;
			this.yan.y = this.mc.y + this.mc.height /2;
			this.addChild(this.yan);
			this.yan.scaleX = -0.1;
			this.yan.scaleY = 0.2;
			this.yan.playFile(`${EFFECT}yan`, -1);
		}else if(str == "left")
		{
			this.yan = new MovieClip();
			this.yan.x = this.mc.x+this.mc.width /2;
			this.yan.y = this.mc.y+this.mc.height /2;
			this.addChild(this.yan);
			this.yan.scaleX = 0.2;
			this.yan.scaleY = 0.2;
			this.yan.playFile(`${EFFECT}yan`, -1);
		}
		this.mc.playFile(`${EFFECT}role_${this.id}`, -1, null, false, "run_" + str);
	}
	private removeMove()
	{
		if(this.move)
		{
			this.removeMySelf();
		}
	}
	public setData(_hp:number, _attack:number)
	{
		this.hp_max = this.hp = _hp;
		this.attack = _attack;
	}
	public getData()
	{
		return {hp:this.hp, attack:this.attack};
	}
	public setHp(_num:number)
	{
		let hurt = new MovieClip();
		hurt.x = -hurt.width / 2 + Math.random() * 10;
		hurt.y = -hurt.height + Math.random() * 10;;
		this.addChild(hurt);
		hurt.playFile(`${EFFECT}hurt`, 1);

		let hurt_num = new Hurt(_num);
			hurt_num.x = -hurt_num.width / 2;
			hurt_num.y = -hurt_num.height;
			hurt_num.scaleX = hurt_num.scaleY = 1.5
		this.addChildAt(hurt_num, 99999999);

		if(this.hp - _num > 0)
		{
			GameCfg.npcPH -= _num;
		}else 
		{
			GameCfg.npcPH -= (_num - this.hp);
		}
		if(GameCfg.npcPH<=0)
			GameCfg.npcPH = 0;

		this.hp -= _num;
		if(this.hp <= 0)
		{
			egret.Tween.removeTweens(this);
			this.vis = false;
			
		}
	}
	public die()
	{
		if(this.yan)
			this.yan.destroy();
		this.mc.playFile(`${EFFECT}role_${this.id}`, 1, null, false, "die_left");
		egret.Tween.get(this)
		.wait(1500)
		.call(()=>{
			this.removeMySelf();
		});
	}
	public xuanyun()
	{
		this.ani = new MovieClip();
		this.ani.x = -this.ani.width / 2;
		this.ani.y = -this.ani.height;
		this.addChild(this.ani);
		this.ani.playFile(`${EFFECT}buff3`, -1);
	}
	public poisoning(_num:number, _effect:number)
	{
		setTimeout(()=>{
			let skill = new MovieClip();
			skill.x = -skill.width / 2;
			skill.y = -skill.height / 2;
			skill.scaleX = skill.scaleY = 1.5;
			this.addChild(skill);
			skill.playFile(`${EFFECT}${_effect}`, 1);
			this.setHp(_num);
		}, Math.random()*200);
		
	}
	public removeAni()
	{
		if(this.ani)
			this.ani.destroy();
	}
	public getAttack()
	{
		return this.attack;
	}
	public getHp()
	{
		return this.hp;
	}
	public removeMySelf()
	{
		egret.Tween.removeTweens(this);
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}