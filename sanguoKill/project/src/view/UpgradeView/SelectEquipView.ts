class SelectEquipView extends BaseEuiView {
    private confirm: eui.Image;
    private cancel: eui.Image;

    private scroller: eui.Scroller;
    private list: eui.List;
    private content:eui.Group;
    public constructor() {  
        super();
    }

    open( ...param ):void {
        let id = param[0];
        if( id >= 2 ) {
            id ++;
        }
        this.content.x = (StageUtils.inst().getWidth()>>1) - 850/2;
        this.content.y = (StageUtils.inst().getHeight()>>1) - 421/2;
        this.list.itemRenderer = SelectEquipItem;
        this.list.dataProvider = new eui.ArrayCollection(GlobalFun.getBagData(id)); // 此处获取设置装备时，所需要获取的装备
        
        this.addTouchEvent( this.confirm , this.touchHandler , true );
        this.addTouchEvent( this.cancel , this.touchHandler , true );
        if(GameApp.guilding){
            if(GameApp.guideView){
                GameApp.guideView.nextStep({id:"1_8",comObj:this.confirm,width:146,height:54});
            }
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_Equip,this.onEquip,this);
    }
    private onEquip():void{
        this.confirmHandler();
        ViewManager.inst().open(UpgradeView)
    }
    private touchHandler( e:egret.TouchEvent ):void {
        switch( e.target ) {
            case this.confirm:
                this.confirmHandler();
                break;
            case this.cancel:
                ViewManager.inst().close( SelectEquipView );
                break;
        }
    }
    public confirmHandler():void{
        if( UpgradeCfg.ins.select_equip == null ) {
            UserTips.inst().showTips("请先选择装备！");
        }else {
            let id = 0;
            switch( UpgradeCfg.ins.select_equip.type ) {
                case ItemType.weapon:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].weaponId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].weaponId = UpgradeCfg.ins.select_equip.instId;
                    break;
                case ItemType.protection:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].protectedId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].protectedId = UpgradeCfg.ins.select_equip.instId;
                    break;
                case ItemType.weapon_ma:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseAtkId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseAtkId = UpgradeCfg.ins.select_equip.instId;
                    break;
                case ItemType.protection_ma:
                    id = UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseProtId;
                    UpgradeCfg.ins.roleData[UpgradeCfg.ins.role_ID].horseProtId = UpgradeCfg.ins.select_equip.instId;
                    break;
            }
            MessageManager.inst().dispatch(CustomEvt.SELECT_EQUIP_UPDATA);
            // 设置穿上卸下装备方法
            if( id == 0 ) {
                GlobalFun.setBagData( UpgradeCfg.ins.select_equip.instId );
            } else {
                let equip;
                for( let i = 0 ; i < ItemCfg.itemCfg.length ; i ++ ) {
                    if( ItemCfg.itemCfg[i].instId == id ) {
                        equip = ItemCfg.itemCfg[i];
                    }
                }
                GlobalFun.change( UpgradeCfg.ins.select_equip , equip );
            }
            UpgradeCfg.ins.setLocalRoleInfo();
            /**  ****************  */
            ViewManager.inst().close( SelectEquipView );
        }
    }
    close():void {
        this.removeTouchEvent( this.confirm , this.touchHandler );
        this.removeTouchEvent( this.cancel , this.touchHandler );
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_Equip,this.onEquip,this);
    }
}
ViewManager.inst().reg(SelectEquipView,LayerManager.UI_Main);