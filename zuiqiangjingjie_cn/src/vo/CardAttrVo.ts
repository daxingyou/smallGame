type CardAttrVo = {
	/**实例id */
	insId:number;
	/**卡牌实际模型值 */
	model:string;
	/**卡牌例会 */
	cardModel:string;
	/**等级 */
	level:number;
	/**名称 */
	name:string;
	/**商城花费 */
	cost:number;
	/**当前拥有数量 */
	ownNum:number;
	/**升级需求量*/
	upgradeNum:number;
	/**质量 - 只有技能 锦囊 生命卡 有 其余默认为1 */
	quality:number;
	/**卡牌类型  CardType */
	type:number;
	/**攻击力 */
	atk:number;
	/**血量值 */
	hp:number;
	/**国籍 魏蜀吴 123*/
	city:number;
	/**buff持续时间 */
	buffTime:number;
	/**介绍 */
	jieshao:string;
	/**士兵类型 */
	soldierType?:number;
	/**技能图标 */
	skillIcon?:number;
	/**天赋技能 */
	buffSkillRes?:string;
	/**天赋buff持续时间 */
	buffSkillTime?:number;
	/**天赋描述 */
	buffDesc?:string;
	/**天赋buff提升 */
	buffPrompt?:number;
	/**天赋buff条件 针对弓骑步*/
	buffCondition?:number;
	/**天赋buff提升的属性 */
	buffAttr?:string;
}
enum CardType{
	/**将军 */
	general,
	/**技能 */
	skill,
	/**锦囊 */
	special_skill,
	/**建筑 */
	build,
	/**道具卡 */
	prop,
	/**士兵 */
	soldier,
	/**经验 */
	exp
}