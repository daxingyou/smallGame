/**
 * 自定义数据类型 以及枚举
 */

interface XY{
	x:number,
	y:number
}
interface AttrItem{
	name:string,
	potential:number,
	level:number,
	exp:number,
	hp:number,
	atk:number,
	brains:number,
	capacity:number,
	insId:number,
	icon:string,
	type:number
}
enum BuildType{
	/**矿洞 */
	kuangdong = 0,
	/**木材厂 */
	woods,
	/**粮仓 */
	goods
}
class ActionState{
	public static readonly RUN:string = "run";

	public static readonly ATTACK:string = "attack";

	public static readonly DEAD:string = 'dead';

	public static readonly STAND:string = "stand";

	public static readonly HIT:string = "hit";
}

