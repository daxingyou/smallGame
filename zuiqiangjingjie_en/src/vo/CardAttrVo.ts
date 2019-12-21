type CardAttrVo = {
	/**Exampleid */
	insId:number;
	/**Card actual model value */
	model:string;
	/**Regular card meeting */
	cardModel:string;
	/**Grade */
	level:number;
	/**Name */
	name:string;
	/**Mall cost */
	cost:number;
	/**Current ownership */
	ownNum:number;
	/**Upgrade demand*/
	upgradeNum:number;
	/**quality - Only skills silk bag Life card Yes The rest defaults to1 */
	quality:number;
	/**Card type  CardType */
	type:number;
	/**Aggressivity */
	atk:number;
	/**Blood volume */
	hp:number;
	/**nationality Wei Shu Wu 123*/
	city:number;
	/**buffDuration */
	buffTime:number;
	/**introduce */
	jieshao:string;
	/**Soldier type */
	soldierType?:number;
	/**Skill Icon */
	skillIcon?:number;
	/**Talent skills */
	buffSkillRes?:string;
	/**talentbuffDuration */
	buffSkillTime?:number;
	/**Talent description */
	buffDesc?:string;
	/**talentbuffPromote */
	buffPrompt?:number;
	/**talentbuffcondition For bow riding*/
	buffCondition?:number;
	/**talentbuffPromoted properties */
	buffAttr?:string;
}
enum CardType{
	/**General */
	general,
	/**Skill */
	skill,
	/**silk bag */
	special_skill,
	/**Architecture */
	build,
	/**Prop card */
	prop,
	/**Rank-and-file soldiers */
	soldier,
	/**experience */
	exp
}