class MenuView extends BaseEuiView {
    private upgrade_btn: eui.Image;
    private shop_btn: eui.Image;
    private bag_btn: eui.Image;
    private back_btn: eui.Image;
    private _param:any[];
    public constructor() {
        super();
    }

    open( ...param ):void {

        this._param = param;
        this.addTouchEvent( this.upgrade_btn , this.touchHandler , true );
        this.addTouchEvent( this.shop_btn , this.touchHandler , true );
        this.addTouchEvent( this.bag_btn , this.touchHandler , true );
        this.addTouchEvent( this.back_btn , this.touchHandler , true );
        this.shop_btn.x = (StageUtils.inst().getWidth() >>1) - 105;
        this.upgrade_btn.x = (StageUtils.inst().getWidth() >>1) - 105;
        this.back_btn.x = (StageUtils.inst().getWidth() >>1) - 105;
        if(GameApp.guilding){
            if(GameApp.guideView){
                GameApp.guideView.nextStep({id:"1_2",comObj:this.shop_btn,width:210,height:51});
            }
        }
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_MENU_SHOP,this.onClickShop,this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_UPGRADE,this.onOpenUpgrade,this);
        MessageManager.inst().addListener(CustomEvt.GUIDE_CLICK_CLOSE_MENU,this.onCloseMenu,this);
    }
    private onCloseMenu():void{
        ViewManager.inst().close( MenuView );
        //引导已经结束
        GameApp.guilding = false;
        ViewManager.inst().close(GuideView);
        ViewManager.inst().open(GuideStory,[{tip:"最后，祝主公马到成功。"}])
    }
    private onOpenUpgrade():void{
        ViewManager.inst().open( UpgradeView );
    }
    private onClickShop():void{
         ViewManager.inst().open(ShopView);
    }
    public refreshPage():void{
        if(GameApp.guilding){
            if(GameApp.guideView){
                if(GameApp.isLast){
                    GameApp.guideView.nextStep({id:"1_10",comObj:this.back_btn,width:210,height:51});
                }else{
                    GameApp.guideView.nextStep({id:"1_6",comObj:this.upgrade_btn,width:210,height:51});
                }
                
            }
        }
    }
    private touchHandler( e:egret.TouchEvent ):void {
        switch( e.target ) {
            case this.upgrade_btn:
                ViewManager.inst().open( UpgradeView );
                break;
            case this.shop_btn:
                ViewManager.inst().open( ShopView );
                break;
            case this.bag_btn:
                ViewManager.inst().open( BagView );
                break;
            case this.back_btn:
                ViewManager.inst().close( MenuView );
                break;
        }
    }

    close():void {
        this.removeTouchEvent( this.upgrade_btn , this.touchHandler );
        this.removeTouchEvent( this.shop_btn , this.touchHandler  );
        this.removeTouchEvent( this.bag_btn , this.touchHandler);
        this.removeTouchEvent( this.back_btn , this.touchHandler );
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_MENU_SHOP,this.onClickShop,this);
        MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_UPGRADE,this.onOpenUpgrade,this);
         MessageManager.inst().removeListener(CustomEvt.GUIDE_CLICK_CLOSE_MENU,this.onCloseMenu,this);
    }
}
ViewManager.inst().reg(MenuView,LayerManager.UI_Main);