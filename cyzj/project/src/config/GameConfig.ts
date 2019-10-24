class GameConfig {
	public static gq:number = 0;
	public static auto_bool:boolean = false;
	public static playerFig:any[] = [];
	public static monsterFig:any[] = [];
	public static gqFig:any[][] = [
		[1,1,1,-1],
		[1,2,2,-1],
		[2,2,3,-1],
		[2,3,3,-1]
	]
	public static gqFig_monster:any[][] = [
		[6,6,1, 3],
		[2,2,7, 5],
		[8,8,9, 3],
		[9,9,3, 5],
	]
	public static monster_qian:any[] = [];
	public static monster_zhong:any[] = [];
	public static monster_hou:any[] = [];
	public static player_qian:any[] = [];
	public static player_hou:any[] = [];

	public static roleData:RoleInfoVo[];

	public static adventure:any[] = [
		{id:10000, name:"火晶", num:0},
		{id:10001, name:"木晶", num:0},
		{id:10002, name:"水晶", num:0},
		{id:10003, name:"中级火晶", num:0},
		{id:10004, name:"中级木晶", num:0},
		{id:10005, name:"中级水晶", num:0},
		{id:10006, name:"高级火晶", num:0},
		{id:10007, name:"高级木晶", num:0},
		{id:10008, name:"高级水晶", num:0},
		{id:10009, name:"初级卷轴", num:0},
		{id:10010, name:"中级卷轴", num:0},
		{id:10011, name:"高级卷轴", num:0},
		{id:10012, name:"英雄碎片", num:0},
		{id:10013, name:"英雄碎片", num:0},
		{id:10014, name:"英雄碎片", num:0}
	]
	public static setAdventure(_id:number)
	{
		for(let i = 0; i < GameConfig.adventure.length; i++)
		{
			if(GameConfig.adventure[i].id == _id)
			{
				GameConfig.adventure[i].num++;
			}
		}
	}

	public static fight_state:string = null;

	/**人物总数组 */
	public static always_any:any[] = [];
	public static hebing()
	{
		GameConfig.always_any = [];
		for(let i = 0; i < GameConfig.monsterFig.length; i++)
		{
			GameConfig.always_any.push(GameConfig.monsterFig[i]);
		}
		for(let i = 0; i < GameConfig.playerFig.length; i++)
		{
			GameConfig.always_any.push(GameConfig.playerFig[i]);
		}
		GameConfig.paixv();
	}
	/**排序 */
	public static paixv()
	{
		var n = GameConfig.always_any.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (GameConfig.always_any[j].y > GameConfig.always_any[j + 1].y) {
					var any = GameConfig.always_any[j];
					GameConfig.always_any[j] = GameConfig.always_any[j + 1];
					GameConfig.always_any[j + 1] = any;
                }
            }
        }
	}
}