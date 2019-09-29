class StartView extends BaseEuiView {
    private start_btn: eui.Image;

    public constructor() {
        super();
    }

    open( ...param ):void {
        this.addTouchEvent( this.start_btn , this.startGameHandler , true );
    } 

    private startGameHandler():void {
        ViewManager.inst().open( MenuView );
    }

    close():void {
        this.removeTouchEvent( this.start_btn , this.startGameHandler );
    }
}
ViewManager.inst().reg(StartView,LayerManager.UI_Main);