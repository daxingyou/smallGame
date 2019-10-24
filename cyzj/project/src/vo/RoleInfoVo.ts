interface RoleInfoVo {
	/**名字 */
	name:string;
	/**拥有的碎片数量 */
	o_suipian:number;
	/**解锁的全部碎片 */
	t_suipian:number;
	/**卡片形象 */
	cardModel:string;
	/**对应的人物形象 */
	roleModel:string;
	/**头像图标 */
	icon:string;
	/**解锁等级 */
	unlock:number;
	/**是否已经解锁获取到人物 */
	isUnlock:boolean;
	/**人物攻击力 */
	atk:number;
	/**人物防御力 */
	def:number;
	/**人物血量值 */
	hp:number;
	/**人物背景介绍 */
	desc:string;
	/**技能名称 */
	skillName:string;
	/**技能描述 */
	skillDesc:string;
	/**id */
	id:number;
	/**人物等级 */
	level:number;
	/**人物当前经验 */
	exp:number
}