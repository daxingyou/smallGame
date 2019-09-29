class UpgradeItem extends BaseEuiView {
    private _data:HeroAttr;
    private icon: eui.Image;
    private level: eui.Label;
    // 按钮
    public equip_weapon_btn: eui.Image;
    private equip_protected_btn: eui.Image;
    private equip_horseAtk_btn: eui.Image;
    private equip_horseProt_btn: eui.Image;
    // 属性label
    private hp: eui.Label; // 生命
    private agile: eui.Label; // 敏捷
    private atk: eui.Label; // 攻击
    private hit: eui.Label; // 命中
    private protected: eui.Label; // 防御
    private crit: eui.Label; // 暴击

    // 装备
    private equip_weapon: eui.Image;
    private equip_protected: eui.Image;
    private equip_horseAtk: eui.Image;
    private equip_horseProt: eui.Image;

    private _id:number = 0;

    public constructor( data:HeroAttr , id:number ) {
        super();
        this._data = data;
        this._id = id;
        this.addEvent( egret.Event.ADDED_TO_STAGE , this , this.add_view_handler );
        
    }
    private add_view_handler():void {
        this.init();
        this.addTouchEvent( this.equip_weapon_btn , this.touchHandler , true );
        this.addTouchEvent( this.equip_protected_btn , this.touchHandler , true );
        this.addTouchEvent( this.equip_horseAtk_btn , this.touchHandler , true );
        this.addTouchEvent( this.equip_horseProt_btn , this.touchHandler , true );

        MessageManager.inst().addListener(CustomEvt.SELECT_EQUIP_UPDATA,this.selectEquipUpdate,this);
    }
    public onWeaponTouch():void{
        UpgradeCfg.ins.role_ID = this._id;
        ViewManager.inst().open( SelectEquipView  , [ 0 ] );
    }
    private init():void {
        this.icon.texture = RES.getRes( this._data.icon );
        this.selectEquipUpdate();
    }

    private selectEquipUpdate():void {
        UpgradeCfg.ins.roleEquip[this._id] = [];
        {
            // if( UpgradeCfg.ins.roleData[this._id].weaponId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].weaponId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].weaponId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }
            // if( UpgradeCfg.ins.roleData[this._id].protectedId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].protectedId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].protectedId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }
            // if( UpgradeCfg.ins.roleData[this._id].horseAtkId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].horseAtkId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].horseAtkId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }
            // if( UpgradeCfg.ins.roleData[this._id].horseProtId != 0 ) {
            //     for( let j = 0 ; j < ItemCfg.length ; j ++ ) {
            //         if( UpgradeCfg.ins.roleData[this._id].horseProtId == ItemCfg[this._id].instId ) {
            //             UpgradeCfg.ins.roleEquip.push( ItemCfg[this._id] );
            //         }
            //     }
            //     this.equip_weapon.texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id].weaponId + "_png" );
            // } else {
            //     this.equip_weapon.texture = null;
            // }   
        }
        let _name = [
            "weaponId" , "protectedId" , "horseAtkId" , "horseProtId"
        ]
        let _texture_name = [
            "equip_weapon" , "equip_protected" , "equip_horseAtk" , "equip_horseProt"
        ]
        for( let i = 0 ; i < _name.length ; i ++ ) {
            if( UpgradeCfg.ins.roleData[ this._id ][ _name[i] ] ) {
                for( let j = 0 ; j < ItemCfg.itemCfg.length ; j ++ ) {
                    if( UpgradeCfg.ins.roleData[this._id][ _name[i] ] == ItemCfg.itemCfg[j].instId ) {
                        console.log(UpgradeCfg.ins.roleData[this._id][ _name[i] ],ItemCfg.itemCfg[j].instId);
                        
                        UpgradeCfg.ins.roleEquip[this._id].push( ItemCfg.itemCfg[j] );
                        this[_texture_name[i]].texture = RES.getRes( "upgrade_" + UpgradeCfg.ins.roleData[this._id][ _name[i] ] + "_jpg" );
                    }
                }
            
            } else {
                this[_texture_name[i]].texture = null;
            }  
        }
        this.updataInfo();
    }

    private updataInfo():void {
        this.level.text = "Lv." + this._data.level.toString();
        this.hp.text = "生命:" + (this.levelBonus( "hp" , 0 ) + this.equipBonus( "hp" , UpgradeCfg.ins.roleEquip[this._id] ));
        this.agile.text = "敏捷:" + (this.levelBonus( "agile" , 1 ) + this.equipBonus( "agile" , UpgradeCfg.ins.roleEquip[this._id] ));
        this.atk.text = "攻击:" + (this.levelBonus( "atk" , 2 ) + this.equipBonus( "atk" , UpgradeCfg.ins.roleEquip[this._id] ));
        this.hit.text = "命中:" + (this.levelBonus( "hit" , 3 ) + this.equipBonus( "hit" , UpgradeCfg.ins.roleEquip[this._id] ));
        this.protected.text = "防御:" + (this.levelBonus( "protected" , 4 ) + this.equipBonus( "protected" , UpgradeCfg.ins.roleEquip[this._id] ));
        this.crit.text = "暴击:" + (this.levelBonus( "crit" , 5 ) + this.equipBonus( "crit" , UpgradeCfg.ins.roleEquip[this._id] ));
    }

    private touchHandler( e:egret.TouchEvent ):void {
        let num = 0;
        switch( e.target ) {
            case this.equip_weapon_btn:
                num = 0;
                break;
            case this.equip_protected_btn:
                num = 1;
                break;
            case this.equip_horseAtk_btn:
                num = 2;
                break;
            case this.equip_horseProt_btn:
                num = 3;
                break;    
        }
        UpgradeCfg.ins.role_ID = this._id;
        ViewManager.inst().open( SelectEquipView  , [ num ] );
    }

    private levelBonus( _name:string , num:number ):number {
        let value = 0;
        value += this._data.attr[ _name ] + UpgradeCfg.ins.levelBonusData[this._id][num] * (this._data.level - 1 );
        return value;
    }

    private equipBonus( _name:string , data:any[] ):number {
        let value = 0;
        for( let i = 0 ; i < data.length ; i++ ) {
            if( data[ i ][ _name ] ) {
                value += data[ i ][ _name ];
            }
        }
        console.log(value);
        
        return value;
    }

    open( ...param ):void {
        
    }

    close():void {

    }
}