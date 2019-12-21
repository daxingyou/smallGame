class GameCfg 
{
	public static wjAny:number[] = [];
	public static chapter:number = 1;
	public static level:number = 1;
	public static gameStart:boolean = false;
	public static playerPH:number = 0;
	public static playerPH_max:number = 0;
	public static playerAttack:number = 0;
	public static npcAttack:number = 0;
	public static npcPH:number = 0;
	public static npcPH_max:number = 0;
	public static pp:PlayerPhalanx[] = [];
	public static np:NpcPhalanx[] = [];
	public static resultBool:boolean = false;
	public static bingDate:any = {
		1:{hp:80, attack:40},
		2:{hp:100, attack:20},
		3:{hp:120, attack:30}
	};
	public static levelCfg:SoldierRect[][][] = [
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		],
		[
			[{genrealRes:"role_10002",soldierType:1, soldierID:100105, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100113, generalId:0}],
			[{genrealRes:"role_10002",soldierType:1, soldierID:100109, generalId:0},{genrealRes:"role_10002",soldierType:1, soldierID:100110, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100109, generalId:0}],
			[{genrealRes:"role_10002",soldierType:3, soldierID:100112, generalId:0},{genrealRes:"role_10002",soldierType:3, soldierID:100106, generalId:0},{genrealRes:"role_10002",soldierType:2, soldierID:100107, generalId:0}]
		]
	]

	public static checkpoint:any[] = 
	[
		[
			{wj:[10000, 0, 0], bing:[{qian:3, hou:1}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:2, hou:2}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:1, hou:3}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:1, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:10009, hou:0}, {qian:0, hou:0}]},
		],
		[
			{wj:[10001, 0, 0], bing:[{qian:2, hou:2}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100011, 0, 0], bing:[{qian:1, hou:2}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100012, 0, 0], bing:[{qian:3, hou:3}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[10002, 0, 0], bing:[{qian:1, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:10008, hou:0}, {qian:0, hou:0}]},
		],
		[
			{wj:[10002, 0, 0], bing:[{qian:1, hou:1}, {qian:2, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100021, 0, 0], bing:[{qian:3, hou:3}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100022, 0, 0], bing:[{qian:3, hou:1}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[10002, 100021, 0], bing:[{qian:1, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:10008, hou:0}, {qian:0, hou:0}]},
		],
		[
			{wj:[10000, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:3, hou:2}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:1, hou:1}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:3, hou:0}, {qian:2, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:10009}, {qian:0, hou:0}, {qian:10009, hou:0}]},
		],
		[
			{wj:[10000, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:3, hou:2}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:1, hou:1}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:1, hou:0}, {qian:3, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:10009}, {qian:0, hou:0}, {qian:0, hou:0}]},
		],
		[
			{wj:[10000, 0, 0], bing:[{qian:1, hou:3}, {qian:2, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:1, hou:1}, {qian:1, hou:0}, {qian:2, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:0, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:1, hou:0}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:10009}, {qian:0, hou:0}, {qian:10009, hou:0}]},
		],
		[
			{wj:[10000, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:1, hou:1}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10009, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:1, hou:0}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:10009}, {qian:0, hou:0}, {qian:10009, hou:0}]},
		],
		[
			{wj:[10000, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:1, hou:1}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10009, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:1, hou:0}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:10009}, {qian:0, hou:0}, {qian:10009, hou:0}]},
		],
		[
			{wj:[10000, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[100001, 0, 0], bing:[{qian:1, hou:1}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10008, hou:0}]},
			{wj:[100002, 0, 0], bing:[{qian:3, hou:3}, {qian:3, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:0}, {qian:0, hou:0}, {qian:10009, hou:0}]},
			{wj:[10001, 0, 0], bing:[{qian:1, hou:0}, {qian:1, hou:0}, {qian:0, hou:0}], ta:[{qian:0, hou:10009}, {qian:0, hou:0}, {qian:10009, hou:0}]},
		]
	];
}