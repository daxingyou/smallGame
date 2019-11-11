/**
 * 国家配置
 */
class CampCfg {
	/**默认 魏 蜀 吴 */
	public static readonly campCfg:any[] = [
		{
			info:"\t\t曹操挟天子以令诸侯，雄才伟略。军事实力强大，麾下人才济济，在战乱中崛起，拥有更广袤的领土。",
			star_military:5,
			star_wisdom:3,
			star_defense:3,
			buffSkill:10000,
			time:5,
			cdTime:15,
			addBuffValue:15,
			roleName:"曹操",
			buffName:"战争鼓舞",
			buffDesc:"军事提升buff,军事临时增加"
		},
		{
			info:"\t\t主公刘备，仁德大义，。属地资源丰富，五虎上将威名远扬。有着肥沃土地和丰 富资源，人民团结。",
			star_military:4,
			star_wisdom:5,
			star_defense:2,
			buffSkill:10001,
			time:5,
			cdTime:15,
			addBuffValue:30,
			roleName:"刘备",
			buffName:"如沐清风",
			buffDesc:"智谋提升buff,智谋临时增加"
		},
		{
			info:"\t\t孙权为首，独霸一方。地理优势明显，国力经济发展迅速。吸引各路群英跃马扬鞭到此方一决雌雄。",
			star_military:2,
			star_wisdom:4,
			star_defense:5,
			buffSkill:10002,
			time:5,
			cdTime:15,
			addBuffValue:15,
			roleName:"孙权",
			buffName:"金刚不坏",
			buffDesc:"防御提升buff,防御临时增加"
		}
	]
}
