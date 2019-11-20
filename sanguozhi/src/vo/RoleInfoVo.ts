type RoleInfoVo = {
	/**名字 */
	name:string;
	/**城池信息 */
	citys:CityInfo[];
}
type CityInfo = {
	/**是否为驻地 */
	isOnly:boolean;
	/**当前城市id */
	cityId:number;
	/**是否已经解锁 */
	isOwn:boolean;
	/**是否已经全部占领*/
	isMain:boolean;
	/**是否开启*/
	isOpen:boolean; 
	/**名称 */
	name:string;
	/**最后一次征收的时间 */
	timespan:number;
	/**通过的小关卡 */
	passLevel:number;
	/**生产的单价粮草 */
	goodProduce:number;
}