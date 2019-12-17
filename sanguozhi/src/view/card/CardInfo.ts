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

    private level_label: eui.Label;
    private level_have_label: eui.Label;
    private talent_label: eui.Label;
    private progress_img: eui.Image;
    private progress_mask: eui.Image;

    private hp_group: eui.Group;
    private xiangqing_group: eui.Group;
    private tianfu_group: eui.Group;
    private dengji_group: eui.Group;

    private _type: CardType;
    private _id: number;
    private _insid:number;
    private infoGroup:eui.Group;
    public constructor( type:CardType , id:number , insid:number){
        super();
        this.skinName = `CardInfoSkin`;
        this._type = type;
        this._id = id;
        this._insid = insid;
        this.addEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
    }

    private add_view_handler():void {
        this.infoGroup["autoSize"]();
        this.removeEventListener( egret.Event.ADDED_TO_STAGE , this.add_view_handler , this );
        MessageManager.inst().addListener(LocalStorageEnum.CLOSE_CARDINFO, this.removeThis, this);
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.init();
        this.addTouchEvent( this.close_img , this.touchTapHandler , true );
        this.addTouchEvent( this.upgrade_img , this.touchTapHandler , true );
    }

    private remove_view_handler():void {
        this.removeEventListener( egret.Event.REMOVED_FROM_STAGE , this.remove_view_handler , this );
        this.removeTouchEvent( this.close_img , this.touchTapHandler );
        this.removeTouchEvent( this.upgrade_img , this.touchTapHandler );
        MessageManager.inst().removeListener(LocalStorageEnum.CLOSE_CARDINFO, this.removeThis, this);
    }

    private init():void {
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
        this.progress_img.mask = this.progress_mask;
        let cfg = GlobalFun.getCardsFromType( this._type , false )[this._id];
        // this.jieshao_label.text = `${cfg.jieshao}`;
        switch( this._type ) {
            case CardType.special_skill:
                this.hp_label.text = `无`;
                this.atk_label.text = `无`;
                this.talent_label.text = `无`;
                this.jieshao_label.textFlow = new egret.HtmlTextParser().parse(`${cfg.jieshao}`);
                this.upgrade_group.visible = false;
                this.dengji_group.visible = false;
                this.hp_group.y -= 62;
                this.tianfu_group.y -= 62;
                this.xiangqing_group.y -= 62;
                break;
            case CardType.general:
                this.jieshao_label.textFlow = new egret.HtmlTextParser().parse(`${cfg.jieshao}`);
                this.talent_label.text = `${cfg.buffDesc}`
                this.tianfu_group.visible = true;
                this.xiangqing_group.y = 184.98;
                this.hp_label.text = `${cfg.hp}`;
                this.atk_label.text = `${cfg.atk}`;
                this.level_label.text = `等级：${cfg.level}`;
                let scale = GameApp.exp / cfg.cost;
                if( scale >= 1 ) scale = 1;
                this.progress_mask.scaleX = scale;
                this.level_have_label.text = `${GameApp.exp}/${cfg.cost}`;
                break;
            case CardType.soldier:
                 this.talent_label.text = `无`;
                // this.jieshao_label.textFlow = new egret.HtmlTextParser().parse(`${cfg.jieshao}`);
                let card:CardAttrVo = GlobalFun.getCardDataFromId(this._insid);
                // let c = CardTalentCfg.list.soldier[ this._id ];
                this.talent_label.text = `${card.jieshao}`;
                this.jieshao_label.text = `${card.jieshao}`;
                this.hp_label.text = `${card.hp}`;
                this.atk_label.text = `${card.atk}`;
                this.upgrade_group.visible = false;
                this.dengji_group.visible = false;
                this.hp_group.y -= 62;
                this.tianfu_group.y -= 62;
                this.xiangqing_group.y -= 62;
                break;
        }
        // this.gold_cost.text = `${cfg.cost}`;
        let card = new CardItem( this._type , this._id );
        this.card_group.addChild( card );
    }

    private UIReset():void {
        let cfg = GlobalFun.getCardsFromType( this._type , false )[this._id];
        this.hp_label.text = `${cfg.hp}`;
        this.atk_label.text = `${cfg.atk}`;
        this.level_label.text = `等级：${cfg.level}`;
        let scale = GameApp.exp / cfg.cost;
        if( scale >= 1 ) scale = 1;
        this.progress_mask.scaleX = scale;
        this.level_have_label.text = `${GameApp.exp}/${cfg.cost}`;
    }

    private touchTapHandler( e:egret.TouchEvent ):void {
        switch( e.target ) {
            case this.close_img:
                this.removeThis();
                break;
            case this.upgrade_img:
                let cfg = GlobalFun.getCardsFromType( this._type , false )[this._id];
                // if( cfg.ownNum >= cfg.upgradeNum ) {
                if( cfg.cost <= GameApp.exp ) {
                    GameApp.exp -= cfg.cost;
                    let _id = cfg.insId;
                    let _ownNum = cfg.ownNum - cfg.upgradeNum;
                    let _atk = cfg.atk + Math.floor(cfg.atk * 0.1);
                    let _hp = cfg.hp + Math.floor(cfg.hp * 0.1);
                    let _level = cfg.level + 1;
                    cfg.cost = 100 * cfg.level;
                    GlobalFun.refreshCardData( _id , { ownNum:_ownNum , atk:_atk , hp:_hp , level:_level , cost:cfg.cost} );
                    UserTips.inst().showTips( "升级成功！" );
                    // this.removeThis();
                    this.UIReset();
                    MessageManager.inst().dispatch("refreshItemCard",{id:_id});
                } else {
                    UserTips.inst().showTips( "经验不足！" );
                    // ViewManager.inst().open(RechargeTipPop);
                }
                // } else {
                //     UserTips.inst().showTips( "卡牌不足！" );
                // }
                break;
        }
    }

    public removeThis():void {
        if( this.parent && this.parent.contains( this ) ) {
            this.parent.removeChild( this );
        }
    }
}