class SelectEquipItem extends eui.ItemRenderer {
    private card: eui.Image;
    private bonus_0: eui.Label;
    private bonus_1: eui.Label;
    private state_img: eui.Image;

    public constructor() {
        super();
        this.skinName = "SelectEquipItemSkin";
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        MessageManager.inst().addListener(CustomEvt.SELECT_EQUIP,this.selectHandler,this);
    }

    dataChanged():void {
        super.dataChanged();
        this.card.texture = RES.getRes( "" + this.data.instId + "_jpg" );
        this.state_img.visible = false;
        if( this.data.type == ItemType.weapon || this.data.type == ItemType.weapon_ma ){
            this.bonus_0.text = "攻击:" + this.data.atk;
            if( this.data.type == ItemType.weapon ) {
                this.bonus_1.text = "命中:" + this.data.hit;
            }else {
                this.bonus_1.text = "暴击:" + this.data.crit;
            }
        }else {
            this.bonus_0.text = "防御:" + this.data.protect;
            if( this.data.type == ItemType.protection ) {
                this.bonus_1.text = "生命:" + this.data.hp;
            }else {
                this.bonus_1.text = "敏捷:" + this.data.agile;
            }
        }
        if(this.itemIndex == 0 && !UpgradeCfg.ins.select_equip){
            UpgradeCfg.ins.select_equip = this.data;
        }
    }

    private add_view_handler():void {
        this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
    }

    private selectHandler( e:CustomEvt ):void {
        console.log(e.data);
        
        if( e.data.id != this.itemIndex ) {
            this.state_img.visible = false;
        }
    }

    private touchTapHandler():void {
        UpgradeCfg.ins.select_equip = this.data;
        this.state_img.visible = true;
		MessageManager.inst().dispatch(CustomEvt.SELECT_EQUIP,{ id:this.itemIndex });
    }
}