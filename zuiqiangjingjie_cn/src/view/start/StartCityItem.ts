class StartCityItem extends BaseView {
    private name_label: eui.Label;
    private icon_img: eui.Image;

    private _id: number = 0;
    
    private selectGroup:eui.Group;
    private arrow:eui.Image;
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
        // this.icon_img.source = `main_city_${this._id}_png`
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        // this.qimc = new MovieClip();
        // this.addChild(this.qimc);
        // this.qimc.playFile(`${EFFECT}flag`,-1);
        // this.qimc.scaleX = this.qimc.scaleY = 0.6;
        // this.qimc.visible = false;
        // this.qimc.x = 92;
        // this.qimc.y = 86;
        if(this._id >= 9)
        {
            GlobalFun.filterToGrey(this);
        }
        this.selectGroup.visible = false;
        
    }

    private touchTapHandler():void {
        if(this._id >= 9)
        {
            UserTips.inst().showTips("暂未解锁");
            return;
        }
        SoundManager.inst().playEffect(`${MUSIC}collect.mp3`)
        MessageManager.inst().dispatch( CustomEvt.SELECT_MAIN_CITY , this._id );
    }

    private selectCityHandler( e:CustomEvt ):void {
        if( this._id == e.data ) {
            this.icon_img.scaleX = this.icon_img.scaleY = 1.2;
            this.selectGroup.visible = true;
            egret.Tween.get(this.arrow,{loop:true}).to({y:this.arrow.y - 10},1000).to({y:this.arrow.y},1000);
        } else {
            // this.icon_img.scaleX = this.icon_img.scaleY = 1;
            // this.qimc.visible =false;
            this.icon_img.scaleX = this.icon_img.scaleY = 1;
            this.selectGroup.visible =false;
            egret.Tween.removeTweens(this.arrow)
        }
    }
}