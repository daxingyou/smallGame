class Player extends egret.Sprite
{
	private mc:MovieClip;
	public id:number;
	private move:boolean = false;
	private hp:number;
	private hp_max:number;
	private attack:number;
	public vis:boolean = true;
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
			this.mc.playFile(`${EFFECT}role_${this.id}`, -1, null, false, "stand_right");
		})
		this.addChild(this.mc);
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

		if(this.hp - _num > 0)
		{
			GameCfg.playerPH -= _num;
		}else 
		{
			GameCfg.playerPH -= (_num - this.hp);
		}
		if(GameCfg.playerPH <= 0)
			GameCfg.playerPH = 0;
			
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
		this.mc.playFile(`${EFFECT}role_${this.id}`, 1, null, false, "die_right");
		egret.Tween.get(this)
		.wait(1500)
		.call(()=>{
			this.removeMySelf();
		});
	}
	public addHp(_num:number)
	{
		let ani:MovieClip = new MovieClip();
		ani.x = -ani.width / 2;
		ani.y = -ani.height / 2;
		this.addChild(ani);
		ani.playFile(`${EFFECT}hp_effect`, 1, null, true);

		if(_num > this.hp_max - this.hp)
		{
			GameCfg.playerPH += (this.hp_max - this.hp);
		}else 
		{
			GameCfg.playerPH += _num;
		}
		if(GameCfg.playerPH >= GameCfg.playerPH_max)
		{
			GameCfg.playerPH = GameCfg.playerPH_max;
		}
		
		this.hp += _num;
		if(this.hp >= this.hp_max)
		{
			this.hp = this.hp_max;
		}
	}
	public setStand()
	{
		if(this.yan)
			this.yan.destroy();
		this.mc.playFile(`${EFFECT}role_${this.id}`, -1, null, false, "stand_right");
	}
	public setAttack()
	{
		if(this.yan)
			this.yan.destroy();
		this.mc.playFile(`${EFFECT}role_${this.id}`, 1, null, false, "attack_right");
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
		if(this.parent)
		{
			if(this.parent.contains(this))
			{
				this.parent.removeChild(this);
			}
		}
	}
}