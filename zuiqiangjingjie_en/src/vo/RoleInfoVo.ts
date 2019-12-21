type RoleInfoVo = {
	/**Name */
	name:string;
	/**City Information */
	citys:CityInfo[];
}
type CityInfo = {
	/**Resident or not */
	isOnly:boolean;
	/**Current cityid */
	cityId:number;
	/**Is it unlocked */
	isOwn:boolean;
	/**Has it all been occupied*/
	isMain:boolean;
	/**Whether to open*/
	isOpen:boolean; 
	/**Name */
	name:string;
	/**Time of last collection */
	timespan:number;
	/**Small pass */
	passLevel:number;
	/**Unit price materials produced */
	goodProduce:number;
	/**Is it being invaded */
	isEnemy:boolean;
}