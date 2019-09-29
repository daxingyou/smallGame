/**
 * 自定义数据类型 以及枚举
 */

interface XY{
	x:number,
	y:number
}
interface HeroAttr{
	icon:string,
	level:number,
	/**hp 血量 agile 敏捷 atk 攻击力 hit命中 protected:防御 crit暴击 */
	attr:{hp:number,agile:number,atk:number,hit:number,protected:number,crit:number}
	/**以下时装备的id与物品对应 */
	weaponId:number,
	protectedId:number,
	horseAtkId:number,
	horseProtId:number
}
