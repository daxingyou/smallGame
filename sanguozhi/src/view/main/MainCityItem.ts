class MainCityItem extends BaseView {
    private name_label: eui.Label;
    private qi_img: eui.Image;
    private icon_img: eui.Image;

    private _id: number = 0;
    private qimc:MovieClip;
    private battleIcon:eui.Image;
    public constructor( id: number ) {
        super();
        this.touchChildren = false;
        this.touchEnabled = true;
        this.skinName = `MainCityItemSkin`;
        this._id = id;
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
    }

    private add_view_handler():void {
        this.init();
        this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
    }

    private remove_view_handler():void {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
    }

    private init():void {
        this.qimc = new MovieClip();
        this.addChild(this.qimc);
        this.qimc.playFile(`${EFFECT}flag`,-1);
        this.qimc.scaleX = this.qimc.scaleY = 0.6;
        this.qimc.x = 92;
        this.qimc.y = 86;
        this.name_label.text = `${NameList.inst().city_name[ this._id ]}`;
        this.icon_img.texture = RES.getRes( `main_city_${this._id}_png` );
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.icon_img.y + this.icon_img.height/2;
        let cityInfo:CityInfo = GlobalFun.getCityInfo( this._id + 1 );
        this.qimc.visible = cityInfo.isMain;
        
        this.qimc.alpha = 0;
        egret.Tween.get(this.qimc).to({alpha:1},1000).call(()=>{
            egret.Tween.removeTweens(this.qimc);
        },this)
    }
    public showBattleIcon():void{
        let cityInfo:CityInfo = GlobalFun.getCityInfo( this._id + 1 );
        if(!cityInfo.isMain){
            this.battleIcon.visible = true;
            GlobalFun.lighting(this.battleIcon);
            egret.Tween.get(this.battleIcon,{loop:true}).to({rotation:this.battleIcon.rotation - 5},50).to({rotation:this.battleIcon.rotation+5},50).to({rotation:this.battleIcon.rotation - 5},50).to({rotation:this.battleIcon.rotation+5},50).wait(800)
        }
        
    }
    public get cityId():number{
        return this._id+1;
    }
    public hideBattleIcon():void{
        this.battleIcon.visible = false;
        GlobalFun.clearFilters(this.battleIcon);
        egret.Tween.removeTweens(this.battleIcon);
    }
    private touchTapHandler():void {

    }
}