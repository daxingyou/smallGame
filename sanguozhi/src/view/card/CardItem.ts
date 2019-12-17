class CardItem extends BaseView {
    private info_group: eui.Group;
    private skill_group: eui.Group;
    private level_group: eui.Group;

    private quality_label: eui.Label;
    private name_label: eui.Label;
    private level_label: eui.Label;
    private city_img: eui.Image;
    private own_label: eui.Label;
    private icon_img: eui.Image;
    private quality_img: eui.Image;
    private hp_label: eui.Label;
    private atk_label: eui.Label;
    private jieshao_label: eui.Label;
    private num_label: eui.Label;


    private _type: CardType;
    private _id: number;
    private _insid:number;
    private soldier_name = [
        `弓兵` , `步兵` , `骑兵`
    ]

    public constructor( type:CardType , id:number ) {
        super();
        this.skinName = `CardItemSkin`;
        this._type = type;
        this._id = id;
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
    }

    private add_view_handler():void {
        this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.init();
        this.addEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
    }

    private remove_view_handler():void {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.removeEventListener( egret.TouchEvent.TOUCH_TAP , this.touchTapHandler , this );
    }

    private init():void {
        let cfg = GlobalFun.getCardsFromType( this._type , false )[this._id];
        if(cfg){
            this._insid = cfg.insId;
        }
        switch( this._type ) {
            case CardType.general:
                this.skill_group.visible = false;
                this.level_label.text = `等级：${cfg.level}`;
                this.city_img.source = `city_${cfg.city}_png`;
                // this.own_label.text = `碎片：${cfg.ownNum}/${cfg.upgradeNum}`;
                this.hp_label.text = `生命：${cfg.hp}`;
                this.atk_label.text = `攻击：${cfg.atk}`;
                this.icon_img.source = `${cfg.cardModel}`;
                break;
            case CardType.special_skill:
                this.info_group.visible = false;
                this.skill_group.visible = true;
                this.num_label.text = `数量：${cfg.ownNum}`;
                this.jieshao_label.text = `${cfg.name}`;
                this.quality_img.source = `quality_${cfg.quality}_png`;
                this.icon_img.source = `${cfg.cardModel}`;
                break;
            case CardType.soldier:
                this.info_group.visible = false;
                this.skill_group.visible = true;
                // this.own_label.text = `碎片：${cfg.ownNum}/${cfg.upgradeNum}`;
                this.jieshao_label.text = `数量:${cfg.ownNum}`;
                this.icon_img.source = `${cfg.cardModel}`;
                this.num_label.visible = false;
                break;
        }
        
    }
    public get insId():number{
        return this._insid
    }
    public refreshGeneralData(id:number):void{
        if(this.insId == id){
            let cfg = GlobalFun.getCardsFromType( CardType.general , false )[this._id];
            this.skill_group.visible = false;
            this.level_label.text = `等级：${cfg.level}`;
            this.city_img.source = `city_${cfg.city}_png`;
            // this.own_label.text = `碎片：${cfg.ownNum}/${cfg.upgradeNum}`;
            this.hp_label.text = `生命：${cfg.hp}`;
            this.atk_label.text = `攻击：${cfg.atk}`;
            this.icon_img.source = `${cfg.cardModel}`;
        }
    }
    private touchTapHandler():void {
        MessageManager.inst().dispatch( CustomEvt.TOUCH_CARD , { type:this._type , id:this._id , insid:this._insid} );
    }
}