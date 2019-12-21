class Build extends BaseView
{
	public id:number;
	private move:boolean = false;
	private hp:number;
	private hp_max:number;
	private attack:number;
	public vis:boolean = true;
	private card:CardAttrVo;
	private ta_img:eui.Image;
	private ani:MovieClip;
	private ani_1:MovieClip;
	public constructor(_id:number, _move:boolean) 
	{
		super();
		this.id = _id;
		this.move = _move;
		this.skinName = "BuildSkin";
		this.init();
		MessageManager.inst().addListener(LocalStorageEnum.REMOVE_MOVE_CARD, this.removeMove, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_START, this.gameStart, this);
		MessageManager.inst().addListener(LocalStorageEnum.GAME_PAUSE, this.gamePause, this);
	}
	private gameStart()
	{
		// this.ani.play();
		// this.ani_1.play();
		egret.Tween.resumeTweens(this);
	}
	private gamePause()
	{
		// this.ani.stop();
		// this.ani_1.stop();
		egret.Tween.pauseTweens(this);
	}
	private removeMove()
	{
		if(this.move)
		{
			this.removeMySelf();
		}
	}
	private init()
	{
		if(this.id == 10008)
		{
			this.ta_img.visible = true;
		}else 
		{
			this.ani = new MovieClip();
			egret.Tween.get(this)
			.wait(Math.floor(Math.random()*100))
			.call(()=>{
				this.ani.playFile(`${EFFECT}role_10009`, -1, null, false, "stand_right");
			});
			this.ani.scaleX = this.ani.scaleY = 0.5;
			this.addChild(this.ani);
		}
		this.card = GlobalFun.getCardDataFromId(this.id);
		this.hp_max = this.hp = this.card.hp;
		this.attack = this.card.atk;
	}
	public setStand()
	{
		this.ani.playFile(`${EFFECT}role_10009`, -1, null, false, "stand_right");
	}
	public setAttack()
	{
		this.ani.playFile(`${EFFECT}role_10009`, 1, null, false, "attack_right");
	}
	public setRun(str:string)
	{
		this.ani.playFile(`${EFFECT}role_10009`, -1, null, false, "run_" + str);
	}
	public setData(_hp:number, _attack:number)
	{
		this.hp_max = this.hp = _hp;
		this.attack = _attack;
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
		if(GameCfg.playerPH<=0)
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
		if(this.id == 10008)
		{
			this.removeMySelf();
		}else
		{
			this.ani.playFile(`${EFFECT}role_${this.id}`, 1, null, false, "die_right");
			egret.Tween.get(this)
			.wait(1500)
			.call(()=>{
				this.removeMySelf();
			});
		}
	}
	public addHp(_num:number)
	{
		this.ani_1 = new MovieClip();
		this.ani_1.x = -this.ani_1.width / 2;
		this.ani_1.y = -this.ani_1.height / 2;
		this.addChild(this.ani_1);
		
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
		if(this.hp >= this.card.hp)
		{
			this.hp = this.card.hp;
		}
	}
	public getAttack()
	{
		return this.attack;
	}
	public getHp()
	{
		return this.hp;
	}
	private removeMySelf()
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