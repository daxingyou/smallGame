/**
 * Custom data type And enumeration
 */

interface XY{
	x:number,
	y:number
}
interface ItemData{
	res:string,
	num:number
}
interface LevelItemCfg{
	/**Keep the name */
	name:string,
	/**Defensive occupation */
	job:number,
	/**Guarding resources */
	res:string,
	/**Have arms enumeration value */
	soldierEnum:number[],
	/**Skill resources */
	skillRes:string,
	/**Campaign name */
	campaigName:string,
	/**Guarding the headres */
	headIcon:string
	/**Checkpoint */
	level:number
}
class ActionState{
	public static readonly RUN:string = "run";

	public static readonly ATTACK:string = "attack";

	public static readonly DEAD:string = 'dead';

	public static readonly STAND:string = "stand";

	public static readonly HIT:string = "hit";
}
enum ActionEnum{
	run = 0,
	attack,
	dead,
	stand
}
enum EntityType{
	enemy = 0,
	energy
}
enum  DirectionEnum{
	TOP = 1,
	TR,
	RIGHT,
	RB,
	BOTTOM
}
enum SoldierType{
	/**Archer */
	SOLDIER_GONG = 1,
	/**Infantry */
	SOLDIER_BU,
	/**cavalry */
	SOLDIER_QI,
	
}
