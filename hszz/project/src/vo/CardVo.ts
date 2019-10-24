class CardVo {
	/**卡片名称 */
	public name:string; 
	/**卡片等级 */
	public level:number;
	/**拥有的卡片熟练 */
	public ownNum:number;
	/**是否已经解锁 */
	public ifUnlock:boolean;
	/**攻击类型:单体 - 1还是范围 - 2 - 3(直接针对国王塔)*/
	public atktype:number;
	/**生成实体熟练 */
	public num:number;
	/**质量颜色 */
	public qualityColor:number;
	/**卡牌类型 - entity - 建筑 - 技能 0-1-2*/
	public cardType:number;
	/**攻击距离 */
	public atkDis:number;
	/**移动速度 */
	public spd:number;
	/**攻击速度 */
	public atkSpd:number;
	/**攻击值 */
	public atk:number;
	/**生命值 */
	public hp:number;
	/**卡牌id */
	public id:number;
	/**skillId 如果有 释放技能 。如果没有 。普通攻击 */
	public skillId:number;
	/**能量消耗 */
	public energy:number;
	/**模型 */
	public model:string;
	/**购买价格 */
	public cost:number;
	/**质量 */
	public quality:number;
	/**卡牌描述 */
	public desc:string;
}