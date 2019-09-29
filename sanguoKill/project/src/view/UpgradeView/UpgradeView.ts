class UpgradeView extends BaseEuiView {
    private role: eui.Group;
    private close_btn: eui.Image;
    private content:eui.Group;
    private guideRect:eui.Rect;
    public constructor() {
        super();
    }

    open( ...param ):void {

        this.content.x = (StageUtils.inst().getWidth()>>1) - 739/2;
        this.content.y = (StageUtils.inst().getHeight()>>1) - 470/2;

        this.close_btn.x = StageUtils.inst().getWidth() - 60;
        this.close_btn.y = 10;
        this.guideRect.x = this.content.width - 100;
        for( let i = 0 ; i < 3 ; i ++ ) {
            let data = UpgradeCfg.ins.roleData[i];
            let item = new UpgradeItem( data , i );
            this.role.addChild( item );
            item.y = i * 158;
        }
        this.addTouchEvent( this.close_btn , this.closeBtnHandler , true );

        // MessageManager.inst().addListener(CustomEvt.SELECT_EQUIP_UPDATA,this.onRandom,this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_CHANGE,this.onEquipChange,this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_Equip_CLOSE,this.onCloseEquip,this);
        if(GameApp.guilding){
            if(GameApp.guideView){
                
                GameApp.guideView.nextStep({id:"1_7",comObj:this.guideRect,width:100,height:40});
            }
        }
    }
    private onCloseEquip():void{
       this.closeBtnHandler();
       GameApp.isLast = true;
       ViewManager.inst().open(MenuView,[{guideId:"1_10"}]);
    }
	public refreshPage():void{
        if(GameApp.guilding){
            if(GameApp.guideView){
                GameApp.guideView.nextStep({id:"1_9",comObj:this.close_btn,width:55,height:55},-90);
            }
        }
    }
    private onEquipChange():void{
        let item:UpgradeItem = this.role.getChildAt(0) as UpgradeItem;
        if(item){
            item.onWeaponTouch();
        }
    }
    private closeBtnHandler():void {
        ViewManager.inst().close( UpgradeView );
    }

    close():void {
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_CHANGE,this.onEquipChange,this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_Equip_CLOSE,this.onCloseEquip,this);
    }
}
ViewManager.inst().reg(UpgradeView,LayerManager.UI_Main);