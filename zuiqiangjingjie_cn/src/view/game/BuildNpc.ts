class BuildNpc extends BaseView
{
	public id:number;
	private move:boolean = false;
	private hp:number;
	private hp_max:number;
	private attack:number;
	public vis:boolean = true;
	private ani:MovieClip;
	private ani_1:MovieClip;
	private ta_img:eui.Image;
	public constructor(_id:number, _move:boolean) 
	{
		super();
		this.id = _id;
		this.move = _move;
		this.skinName = "BuildNpcSkin";
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
	private init()
	{
		if(this.id == 10008)
		{
			this.ta_img.visible = true;
		}else 
		{
			this.ani_1 = new MovieClip();
			egret.Tween.get(this)
			.wait(Math.floor(Math.random()*100))
			.call(()=>{
				this.ani_1.playFile(`${EFFECT}role_10009`, -1, null, false, "stand_left");
			});
			this.ani_1.scaleX = this.ani_1.scaleY = 0.5;
			this.addChild(this.ani_1);
		}
		let card:CardAttrVo = GlobalFun.getCardDataFromId(this.id);
		this.hp_max = this.hp = card.hp;
		this.attack = card.atk;
	}
	public setStand()
	{
		this.ani_1.playFile(`${EFFECT}role_10009`, -1, null, false, "stand_left");
	}
	public setAttack()
	{
		this.ani_1.playFile(`${EFFECT}role_10009`, 1, null, false, "attack_left");
	}
	public setRun(str:string)
	{
		this.ani_1.playFile(`${EFFECT}role_10009`, -1, null, false, "run_" + str);
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
			hurt_num.scaleX = hurt_num.scaleY = 1.5;
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
		if(this.id == 10008)
		{
			this.removeMySelf();
		}else
		{
			this.ani_1.playFile(`${EFFECT}role_${this.id}`, 1, null, false, "die_left");
			egret.Tween.get(this)
			.wait(1500)
			.call(()=>{
				this.removeMySelf();
			});
		}
	}
	public poisoning(_num:number, _effect:number)
	{
		let skill = new MovieClip();
		skill.x = -skill.width / 2;
		skill.y = -skill.height / 2;
		skill.scaleX = skill.scaleY = 1.5;
		this.addChild(skill);
		skill.playFile(`${EFFECT}${_effect}`, 1);
		this.setHp(_num);
		
	}
	public getAttack()
	{
		return this.attack;
	}
	public getHp()
	{
		return this.hp;
	}
	public xuanyun()
	{
		this.ani = new MovieClip();
		this.ani.x = -this.ani.width / 2;
		this.ani.y = -this.ani.height;
		this.addChild(this.ani);
		this.ani.playFile(`${EFFECT}buff3`, -1);
	}
	public removeAni()
	{
		if(this.ani)
			this.ani.destroy();
	}
	private removeMove()
	{
		if(this.move)
		{
			this.removeMySelf();
		}
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