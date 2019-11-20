class CardInfo extends BaseView {
    private card_group: eui.Group;
    private upgrade_group: eui.Group;

    private jieshao_label: eui.Label;
    private close_img: eui.Image;
    private upgrade_img: eui.Image;
    private mianshu_label: eui.Label;
    private hp_label: eui.Label;
    private atk_label: eui.Label;
    private gold_cost: eui.Label;

    private _type: CardType;
    private _id: number;

    public constructor( type:CardType , id:number ){
        super();
        this.skinName = `CardInfoSkin`;
        this._type = type;
        this._id = id;
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
    }

    private add_view_handler():void {
        this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.init();
        this.addTouchEvent( this.close_img , this.touchTapHandler , true );
        this.addTouchEvent( this.upgrade_img , this.touchTapHandler , true );
    }

    private remove_view_handler():void {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.removeTouchEvent( this.close_img , this.touchTapHandler );
        this.removeTouchEvent( this.upgrade_img , this.touchTapHandler );
    }

    private init():void {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        let cfg = GlobalFun.getCardsFromType( this._type , false )[this._id];
        this.jieshao_label.textFlow = new egret.HtmlTextParser().parse(`${cfg.jieshao}`)
        // this.jieshao_label.text = `${cfg.jieshao}`;
        if( this._type == CardType.special_skill ) {
            this.hp_label.text = `无`;
            this.atk_label.text = `无`;
            this.upgrade_group.visible = false;
        } else {
            this.hp_label.text = `${cfg.hp}`;
            this.atk_label.text = `${cfg.atk}`;
        }
        this.gold_cost.text = `${cfg.cost}`;
        let card = new CardItem( this._type , this._id );
        this.card_group.addChild( card );
    }

    private touchTapHandler( e:egret.TouchEvent ):void {
        switch( e.target ) {
            case this.close_img:
                this.removeThis();
                break;
            case this.upgrade_img:
                let cfg = GlobalFun.getCardsFromType( this._type , false )[this._id];
                if( cfg.ownNum >= cfg.upgradeNum ) {
                    if( cfg.cost <= GameApp.gold ) {
                        GameApp.gold -= cfg.cost;
                        let _id = cfg.insId;
                        let _ownNum = cfg.ownNum - cfg.upgradeNum;
                        let _atk = cfg.atk + Math.floor(cfg.atk * 0.1);
                        let _hp = cfg.hp + Math.floor(cfg.hp * 0.1);
                        let _level = cfg.level + 1;
                        GlobalFun.refreshCardData( _id , { ownNum:_ownNum , atk:_atk , hp:_hp , level:_level } );
                        UserTips.inst().showTips( "升级成功！" );
                        this.removeThis();
                    } else {
                        UserTips.inst().showTips( "元宝不足！" );
                    }
                } else {
                    UserTips.inst().showTips( "卡牌不足！" );
                }
                break;
        }
    }

    public removeThis():void {
        if( this.parent && this.parent.contains( this ) ) {
            this.parent.removeChild( this );
        }
    }
}