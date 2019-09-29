class UpgradeCfg {
    private static _ins:UpgradeCfg;

    public constructor(){
    }

    public static get ins():UpgradeCfg {
        if( this._ins == null ) {
            this._ins = new UpgradeCfg();
        }
        return this._ins;
    }

	/** 装备上的 */
    public roleEquip = [
        [],[],[]
    ]

	/** 获取的背包 */
	public bag_equip = [
		[
			{
				type:ItemType.weapon,
				cost:500,
				icon:"10000.png",
				name:"诸葛连弩",
				forTar:Camp.owner,
				atk:25,
				hit:5,
				instId:10000
			},
			{
				type:ItemType.weapon,
				cost:1000,
				icon:"10001.png",
				name:"金火罐炮",
				forTar:Camp.owner,
				atk:39,
				hit:8,
				instId:10001
			}
		],
		[

		],
		[

		],
		[

		]
	]

    public select_equip = null;
	public role_ID:number = 0;

	/** 角色信息 */
    public roleData:HeroAttr[] = [
        {
			icon:"upgrade_icon_0_png", // 图标
			level:1, // 等级
			attr:{
				hp:77, // 生命
				agile:18, // 敏捷
				atk:10, // 攻击
				hit:15, // 命中
				protected:15, // 防御
				crit:5 // 暴击
			},
			weaponId:0, 
			protectedId:0,
			horseAtkId:0,
			horseProtId:0
		},
        {
			icon:"upgrade_icon_1_png", // 图标
			level:1, // 等级
			attr:{
				hp:101, // 生命
				agile:8, // 敏捷
				atk:20, // 攻击
				hit:12, // 命中
				protected:15, // 防御
				crit:8 // 暴击
			},
			weaponId:0, 
			protectedId:0,
			horseAtkId:0,
			horseProtId:0
		},
        {
			icon:"upgrade_icon_2_png", // 图标
			level:1, // 等级
			attr:{
				hp:104, // 生命
				agile:5, // 敏捷
				atk:25, // 攻击
				hit:8, // 命中
				protected:12, // 防御
				crit:12 // 暴击
			},
			weaponId:0, 
			protectedId:0,
			horseAtkId:0,
			horseProtId:0
		}
    ]

	/** 获取角色战斗所需信息 */
	public getRoleInfo():HeroAttr[] {
		let value:HeroAttr[] = [];
		for( let i = 0 ; i < 3 ; i ++ ) {
			let role = {
				icon:UpgradeCfg.ins.roleData[i].icon, // 图标
				level:UpgradeCfg.ins.roleData[i].level, // 等级
				attr:{
					hp:this.levelBonus( "hp" , UpgradeCfg.ins.roleData[i] , i , 0 ) + this.equipBonus( "hp" , this.roleEquip[i] ) , // 生命
					agile:this.levelBonus( "agile" , UpgradeCfg.ins.roleData[i] , i , 1 ) + this.equipBonus( "agile" , this.roleEquip[i] ), // 敏捷
					atk:this.levelBonus( "atk" , UpgradeCfg.ins.roleData[i] , i , 2 ) + this.equipBonus( "atk" , this.roleEquip[i] ), // 攻击
					hit:this.levelBonus( "hit" , UpgradeCfg.ins.roleData[i] , i , 3 ) + this.equipBonus( "hit" , this.roleEquip[i] ), // 命中
					protected:this.levelBonus( "protected" , UpgradeCfg.ins.roleData[i] , i , 4 ) + this.equipBonus( "protected" , this.roleEquip[i] ), // 防御
					crit:this.levelBonus( "crit" , UpgradeCfg.ins.roleData[i] , i , 5 ) + this.equipBonus( "crit" , this.roleEquip[i] ) // 暴击
				},
				weaponId: UpgradeCfg.ins.roleData[i].weaponId, 
				protectedId: UpgradeCfg.ins.roleData[i].protectedId,
				horseAtkId: UpgradeCfg.ins.roleData[i].horseAtkId,
				horseProtId: UpgradeCfg.ins.roleData[i].horseProtId
			}
			value.push( role );
		}
		return value;
	}
	public baseExp = [
		80 , 100 , 120
	]

	public mainExp = [
		0 , 0 , 0
	]

	/** 添加经验 */
	public addExp( exp:number ):void {
		for( let i = 0 ; i < 3 ; i ++ ) {
			UpgradeCfg.ins.mainExp[i] += exp;
			if( UpgradeCfg.ins.mainExp[i] >= UpgradeCfg.ins.baseExp[i] * UpgradeCfg.ins.roleData[i].level ) {
				UpgradeCfg.ins.mainExp[i] -= UpgradeCfg.ins.baseExp[i] * UpgradeCfg.ins.roleData[i].level;
				UpgradeCfg.ins.roleData[i].level ++;
				UpgradeCfg.ins.setLocalRoleInfo();
			}
		}
	}

	public levelBonusData = [
		[ 13, 2, 4, 6, 4, 2 ],
		[ 18, 6, 4, 2, 4, 2 ],
		[ 17, 20, 4, 2, 5, 4 ],
	]
	public levelBonus( _name:string , _data:HeroAttr , role:number , id:number ):number {
        let value = 0;
        value += _data.attr[ _name ] + UpgradeCfg.ins.levelBonusData[role][id] * ( _data.level - 1 );
        return value;
    }

    public equipBonus( _name:string , data:any[] ):number {
        let value = 0;
        for( let i = 0 ; i < data.length ; i++ ) {
            if( data[ i ][ _name ] ) {
                value += data[ i ][ _name ];
            }
        }
        return value;
    }

	public setLocalRoleInfo():void {
        egret.localStorage.setItem( "role_equip" , JSON.stringify( UpgradeCfg.ins.roleEquip ) );
		egret.localStorage.setItem( "role_info" , JSON.stringify( UpgradeCfg.ins.roleData ) );
		egret.localStorage.setItem( "have_exp" , JSON.stringify( UpgradeCfg.ins.mainExp ) );
    }

	public getLocalRoleInfo():void {
		if( !egret.localStorage.getItem( "role_equip") )  {
		}else {
			UpgradeCfg.ins.roleEquip = JSON.parse( egret.localStorage.getItem( "role_equip" ) );
		}
		if( !egret.localStorage.getItem( "role_info") )  {
		}else {
			UpgradeCfg.ins.roleData = JSON.parse( egret.localStorage.getItem( "role_info" ) );
		}
		if( !egret.localStorage.getItem( "have_exp") )  {
		}else {
			UpgradeCfg.ins.mainExp = JSON.parse( egret.localStorage.getItem( "have_exp" ) );
		}

	}
}