class StartCityItem extends BaseView {
    private name_label: eui.Label;
    private icon_img: eui.Image;

    private _id: number = 0;

    public constructor( id: number ){
        super();
        this.skinName = `StartCityItemSkin`;
        this._id = id;
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
    }

    private add_view_handler():void {
        this.init();
        this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
        MessageManager.inst().addListener( CustomEvt.SELECT_MAIN_CITY , this.selectCityHandler , this );
    }

    private remove_view_handler():void {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
        MessageManager.inst().removeListener( CustomEvt.SELECT_MAIN_CITY , this.selectCityHandler , this );
    }

    private init():void {
        this.name_label.text = `${NameList.inst().city_name[ this._id ]}`;
        this.icon_img.texture = RES.getRes( `start_city_${this._id}_png` );
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
    }

    private touchTapHandler():void {
        MessageManager.inst().dispatch( CustomEvt.SELECT_MAIN_CITY , this._id );
    }

    private selectCityHandler( e:CustomEvt ):void {
        if( this._id == e.data ) {
            this.icon_img.scaleX = this.icon_img.scaleY = 1.2;
        } else {
            this.icon_img.scaleX = this.icon_img.scaleY = 1;
        }
    }
}