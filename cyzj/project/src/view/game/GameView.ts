class GameView extends BaseEuiView
{
	private bg_0:eui.Image;
	private bg_1:eui.Image;
	private back_img:eui.Image;
	private auto_img:eui.Image;
	private round:eui.Label; /**回合 */
	private round_num:number = 1;
	private round_max:number = 3;
	private world_group:eui.Group;
	private map_speed:number = 5; /**地图速度 */
	private map_bool:boolean = true; /**地图是否移动 */
	private update_bool:boolean = true;
	private player_num:number = 5;
	private warnLab:eui.Image;
	private player_pos:any[] = [
		{x:StageUtils.inst().getWidth() / 2 - 100, y:StageUtils.inst().getHeight() / 2 + 80},
		{x:StageUtils.inst().getWidth() / 2 - 150 - 100, y:StageUtils.inst().getHeight() / 2 + 40},
		{x:StageUtils.inst().getWidth() / 2 - 300 - 100, y:StageUtils.inst().getHeight() / 2 + 120},
		{x:StageUtils.inst().getWidth() / 2 - 300 - 100, y:StageUtils.inst().getHeight() / 2 + 40},
		{x:StageUtils.inst().getWidth() / 2 - 150 - 100, y:StageUtils.inst().getHeight() / 2 + 120},
	]

	private rect:eui.Rect;

	public constructor() 
	{
		super();
		GameConfig.roleData = GameApp.roleData;
	}
	public open(...param):void{
		this.alpha = 0;
		this.warnLab.alpha = 0;
		egret.Tween.get(this)
		.to({alpha:1}, 300)
		.call(()=>{
			this.init();
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.addTouchEvent(this.back_img, this.touchBack);
			this.addTouchEvent(this.auto_img, this.touchAuto);
			MessageManager.inst().addListener("NEXT_ROUND", this.nextRound, this);
			MessageManager.inst().addListener("HURT_FONT", this.add_font, this);
			MessageManager.inst().addListener("FASHI_EFFECT", this.fashiEffect, this);
		});
	}
	public close():void{
		egret.Tween.removeTweens(this);
		MessageManager.inst().removeListener("NEXT_ROUND", this.nextRound, this);
		MessageManager.inst().removeListener("HURT_FONT", this.add_font, this);
		MessageManager.inst().removeListener("FASHI_EFFECT", this.fashiEffect, this);
		this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.removeTouchEvent(this.back_img, this.touchBack);
		this.removeTouchEvent(this.auto_img, this.touchAuto);
	}
	private update()
	{
		this.map_move();
		if(!this.update_bool)
			return;
		this.removeRole();
		/**合并数组 */
		GameConfig.hebing();
		/**更新层级 */
		for(let i = 0; i < GameConfig.always_any.length; i++)
		{
			this.world_group.addChildAt(GameConfig.always_any[i], i);
		}
		/**判断是否过关 */
		if(GameConfig.monsterFig.length <= 0)
		{
			this.update_bool = false;
			if(this.round_max == 1)
			{
				this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
				this.rest();
				ViewManager.inst().open(OverView, ["win"]);
				this.map_bool = false;
				MessageManager.inst().dispatch("GAME_OVER")
			}else if(this.round_num <= this.round_max)
			{	
				MessageManager.inst().dispatch("PLAYER_PLACE", this);
				MessageManager.inst().addListener("NEXT_ROUND", this.nextRound, this);
				this.round_num++;
				if(this.round_num <= this.round_max)
				{
					this.round.text = this.round_num + " / " + this.round_max;
				}
			}
			else if(this.round_num > this.round_max)
			{
				/**过关 */
				this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
				this.rest();
				ViewManager.inst().open(OverView, ["win"]);
				this.map_bool = false;
				MessageManager.inst().dispatch("GAME_OVER")
			}
		}
		if(GameConfig.playerFig.length <= 0)
		{
			/**过关 */
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.rest();
			ViewManager.inst().open(OverView, ["failure"]);
			this.map_bool = false;
			MessageManager.inst().dispatch("GAME_OVER")
		}
	}
	private touchBack()
	{
		ViewManager.inst().open(PauseView, [GameView]);
	}
	private rest()
	{
		GameConfig.monsterFig = [];
		GameConfig.playerFig = [];
		GameConfig.monster_qian = [];
		GameConfig.monster_zhong = [];
		GameConfig.monster_hou = [];
		GameConfig.player_qian = [];
		GameConfig.player_hou = [];
	}
	private touchAuto()
	{
		if(this.rect.visible == true)
		{
			this.rect.visible = false;
			GameConfig.auto_bool = true;
		}else
		{
			this.rect.visible = true;
			GameConfig.auto_bool = false;
		}
	}
	/**法师技能 */
	private fashiEffect()
	{
		var mc = new MovieClip();
			mc.playFile("resource/res/view/game/fashi_skill", 1, null, false, "", null, 15);
			mc.x = this.world_group.width / 2 + 150;
			mc.y = this.world_group.height / 2 + 50;
		this.world_group.addChild(mc);
		setTimeout(()=>{
			MessageManager.inst().dispatch("MONSTER_HURT", "all");
		}, 1200);
		setTimeout(()=>{
			mc.destroy();
		}, 1400);
	}
	/**伤害字体 */
	private add_font(evt:CustomEvt)
	{
		var font = new EffectFont(evt.data.hurt, evt.data.any.x, evt.data.any.y);
		this.world_group.addChild(font);
	}
	/**下一波 */
	private nextRound()
	{
		MessageManager.inst().removeListener("NEXT_ROUND", this.nextRound, this);
		this.map_bool = true;
		egret.Tween.get(this)
		.wait(1500)
		.call(()=>{
			this.createManster();
			this.fenlei();
			this.map_bool = false;
			this.update_bool = true;
		});
	}
	/**地图移动 */
	private map_move()
	{
		if(!this.map_bool)
			return;
		this.world_group.x += this.map_speed;
		this.x = -this.world_group.x;
		if(this.bg_0.x <= this.world_group.x - this.bg_0.width)
		{
			this.bg_0.x += 2*this.bg_0.width;
		}
		if(this.bg_1.x <= this.world_group.x - this.bg_1.width)
		{
			this.bg_1.x += 2*this.bg_1.width;
		}
	}
	private init()
	{	

		this.round_max = GameConfig.gqFig[GameConfig.gq].length;
		this.round.text = this.round_num + " / " + this.round_max;

		if(GameConfig.fight_state == "adventure")
		{
			this.round_max = 1;
			this.round.text = this.round_num + " / " + this.round_max;
		}

		this.world_group["autoSize"]();
		this.world_group.addChildAt(new GameIcon(), 999);
		
		/**创建英雄 */
		for(let i = 0; i < 5; i++)
		{
			if(GameConfig.roleData[i].isUnlock == true)
			{
				var role = new Role(i + 1, this.world_group.x - 100, this.world_group.y + this.world_group.height / 2 + 100, this.player_pos[i].x, this.player_pos[i].y);
				this.world_group.addChild(role);
				GameConfig.playerFig.push(role);
			}
		}
		/**创建怪物 */
		this.createManster();
		
		this.fenlei();
		egret.Tween.get(this)
		.wait(1000)
		.call(()=>{
			this.map_bool = false;
		})
	}
	/**创建怪物 */
	private createManster()
	{
		if(GameConfig.fight_state == "adventure")
		{
			var monster = new Monster(0, Math.floor(Math.random()*9 + 1), this.world_group.x + this.world_group.width + 100, this.world_group.y + this.world_group.height / 2 + 100, StageUtils.inst().getWidth() / 2 + 100, StageUtils.inst().getHeight() / 2 + 80);
			this.world_group.addChild(monster);
			GameConfig.monsterFig.push(monster);
		}else 
		{
			if(GameConfig.gqFig[GameConfig.gq][this.round_num - 1] != -1)
			{
				for(let i = 0; i < GameConfig.gqFig[GameConfig.gq][this.round_num - 1]; i++)
				{
					for(let j = 0; j < 3; j++)
					{
						var monster = new Monster(i, GameConfig.gqFig_monster[GameConfig.gq][this.round_num - 1], this.world_group.x + this.world_group.width + 100, this.world_group.y + this.world_group.height / 2 + 100, StageUtils.inst().getWidth() / 2 + 100 + i * 150 , StageUtils.inst().getHeight() / 2 + 40 + j * 40);
						this.world_group.addChild(monster);
						GameConfig.monsterFig.push(monster);
					}
				}
			}else if(GameConfig.gqFig[GameConfig.gq][this.round_num - 1] == -1)
			{
				GlobalFun.shakeObj(this,1,20,5);
				egret.Tween.get(this.warnLab).to({alpha:1},300).to({alpha:0},300).to({alpha:1},300).to({alpha:0},300).call(()=>{
					egret.Tween.removeTweens(this.warnLab);
					this.warnLab.alpha = 0;
				},this)
				var monster = new Monster(0, GameConfig.gqFig_monster[GameConfig.gq][this.round_num - 1], this.world_group.x + this.world_group.width + 100, this.world_group.y + this.world_group.height / 2 + 100, StageUtils.inst().getWidth() / 2 + 100, StageUtils.inst().getHeight() / 2 + 80);
				monster.scaleX = monster.scaleY = 1.5;
				this.world_group.addChild(monster);
				GameConfig.monsterFig.push(monster);
			}
			
		}
	}
	/**人物分类 */
	private fenlei()
	{
		GameConfig.monster_qian = [];
		GameConfig.monster_zhong = [];
		GameConfig.monster_hou = [];
		GameConfig.player_qian = [];
		GameConfig.player_hou = [];
		for(let i = 0; i < GameConfig.monsterFig.length; i++)
		{
			if(GameConfig.monsterFig[i].priority == 0)
				GameConfig.monster_qian.push(GameConfig.monsterFig[i]);
			else if(GameConfig.monsterFig[i].priority == 1)
				GameConfig.monster_zhong.push(GameConfig.monsterFig[i]);
			else if(GameConfig.monsterFig[i].priority == 2)
				GameConfig.monster_hou.push(GameConfig.monsterFig[i]);
		}
		for(let j = 0; j < GameConfig.playerFig.length; j++)
		{
			if(GameConfig.playerFig[j].priority == 0)
				GameConfig.player_qian.push(GameConfig.playerFig[j]);
			else if(GameConfig.playerFig[j].priority == 1)
				GameConfig.player_hou.push(GameConfig.playerFig[j]);
		}
	}
	/**删除人物 */
	private removeRole()
	{
		for(let i = 0; i < GameConfig.monsterFig.length; i++)
		{
			if(GameConfig.monsterFig[i].dead)
			{
				GameConfig.monsterFig.splice(i, 1);
				i--;
				this.fenlei();
				break;
			}
		}
		for(let j = 0; j < GameConfig.playerFig.length; j++)
		{
			if(GameConfig.playerFig[j].dead)
			{
				GameConfig.playerFig.splice(j, 1);
				j--;
				this.fenlei();
				break;
			}
		}
	}
	
}
ViewManager.inst().reg(GameView,LayerManager.UI_Main);