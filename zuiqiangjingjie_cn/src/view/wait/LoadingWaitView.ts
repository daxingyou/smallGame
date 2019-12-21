class LoadingWaitView extends BaseEuiView {
    private progress_mask: eui.Rect;
    private progress_img: eui.Image;
    private eff_img: eui.Image;

    private _arg: any;
    private _callback: any;

    public constructor(){
        super();
    }

    open( ...param ):void {
        this.progress_img.mask = this.progress_mask;

        this._arg = param[0].arg;
        this._callback = param[0].call;
        egret.Tween.get( this.progress_mask )
        .to( { scaleY:1 } , 4000 );
        
        egret.Tween.get( this.eff_img )
        .wait( 4000 )
        .to( { alpha:1 } , 300 )
        .call( this._callback , this._arg );
    }

    close():void {

    }
}
ViewManager.inst().reg( LoadingWaitView , LayerManager.UI_Pop );