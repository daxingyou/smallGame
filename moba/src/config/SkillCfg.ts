class SkillCfg {
	public static readonly cfg:any = {
		101:{
			skillId:101,
			skillName:"陷阱",
			skillDesc:"可连续种下3个陷阱，持续存在一定时间，敌人碰触后发生范围爆炸，造成范围伤害.",
			skillCd:3,
			atk:50,
			buffTime:60,
			usenum:3,
			atkDis:80
		},
		102:{
			skillId:102,
			skillName:"狂战",
			skillDesc:"增加2倍攻速攻击持续一段时间",
			skillCd:10,
			atk:100,
			buffTime:30,
			usenum:1,
			atkDis:0
		},
		103:{
			skillId:103,
			skillName:"分身",
			skillDesc:"召唤一个分身进行攻击，分身拥有本身的50%的属性",
			skillCd:15,
			atk:100,
			buffTime:30,
			usenum:0,
			atkDis:0
		},
		104:{
			skillId:104,
			skillName:"技能4",
			skillDesc:"一次性大范围伤害",
			skillCd:30,
			atk:300,
			buffTime:0,
			usenum:1,
			atkDis:150
		}
	}
}
type SkillVo = {
	/**技能id */
	skillId:number;
	/**技能名称 */
	skillName:string;
	/**技能描述 */
	skillDesc:string;
	/**技能cd */
	skillCd:number;
	/**攻击力 */
	atk:number;
	/**buff持续时间 */
	buffTime:number;
	/**可以使用的数量 */
	usenum:number;
	/**伤害范围 */
	atkDis:number;

}