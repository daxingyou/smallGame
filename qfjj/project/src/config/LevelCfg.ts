/**
 * 关卡数据
 */
class LevelCfg 
{
	public static chapter:number = 1; /**章节 */
	public static gq:number = 1; /**关卡 */
	public static chapter_max:number = 1;
	public static gq_max:number = 1;
	public static readonly levelCfgs:any[] = [
		{
			chapter_id:1,
			chapter_name:"诺曼工业区",
			state:1,
			icon:"level_1_png",
			x:80,
			y:807,
			gq:[{gq_id:1, state:1},
				{gq_id:2, state:0},
				{gq_id:3, state:0},
				{gq_id:4, state:0},
				{gq_id:5, state:0},
				{gq_id:6, state:0}]
		},
		{
			chapter_id:2,
			chapter_name:"艾莎制造所",
			state:0,
			icon:"level_2_png",
			x:358,
			y:657,
			gq:[{gq_id:1, state:0},
				{gq_id:2, state:0},
				{gq_id:3, state:0},
				{gq_id:4, state:0},
				{gq_id:5, state:0},
				{gq_id:6, state:0}]
		},
		{
			chapter_id:3,
			chapter_name:"废品处理厂",
			state:0,
			icon:"level_3_png",
			x:180,
			y:418,
			gq:[{gq_id:1, state:0},
				{gq_id:2, state:0},
				{gq_id:3, state:0},
				{gq_id:4, state:0},
				{gq_id:5, state:0},
				{gq_id:6, state:0}]
		},
		{
			chapter_id:4,
			chapter_name:"卡拉兵工厂",
			state:0,
			icon:"level_4_png",
			x:432,
			y:226,
			gq:[{gq_id:1, state:0},
				{gq_id:2, state:0},
				{gq_id:3, state:0},
				{gq_id:4, state:0},
				{gq_id:5, state:0},
				{gq_id:6, state:0}]
		},
		{
			chapter_id:5,
			chapter_name:"伊甸研究所",
			state:0,
			icon:"level_5_png",
			x:60,
			y:96,
			gq:[{gq_id:1, state:0},
				{gq_id:2, state:0},
				{gq_id:3, state:0},
				{gq_id:4, state:0},
				{gq_id:5, state:0},
				{gq_id:6, state:0}]
		}
	] 

	public static getLeveldata()
	{
		if(egret.localStorage.getItem("chapter_max"))
		{
			let zhang = parseInt(egret.localStorage.getItem("chapter_max"));
			for(let i = 0; i < zhang; i++)
			{
				LevelCfg.levelCfgs[i].state = 1;
				if(i == zhang - 1)
				{
					var guan = parseInt(egret.localStorage.getItem("gq_max"));
				}else 
				{
					var guan = 6;
				}
				for(let j = 0; j < guan; j++)
				{
					LevelCfg.levelCfgs[i].gq[j].state = 1;
				}
			}
		}
	}
}