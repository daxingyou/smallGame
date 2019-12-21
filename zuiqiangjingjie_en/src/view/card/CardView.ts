class CardView extends BaseEuiView {
    private select_group: eui.Group;
    private view_group: eui.Group;  

    private back_btn: eui.Button;

    private generalLab:eui.Label;

    private soldierLab:eui.Label;

    private skillLab:eui.Label;

    private list_name: string[]=[
        "wujiang" , "miaoji" , "qixie"
    ];

    private soldier_name: string[]=[
        "Bowmen" , "Infantry" , "cavalry" 
    ]

    public constructor(){
        super();
    }

    open( ...param ):void {
        this.init();
        for( let i = 0 ; i < this.list_name.length ; i ++ ) {
            this.addTouchEvent( this[`${this.list_name[i]}_txt`] , this.touchTapHandler , false );
            this.addTouchEvent( this[`${this.list_name[i]}_bg`] , this.touchTapHandler , false );
        }
        this.addTouchEvent( this.back_btn , this.touchTapHandler , true );
        MessageManager.inst().addListener( CustomEvt.TOUCH_CARD , this.touchCardHandler , this );
        MessageManager.inst().addListener("refreshItemCard",this.refreshCard,this);
        let generalNum:number = GlobalFun.getCardsFromType(CardType.general,false).length;
        this.generalLab.textFlow = new egret.HtmlTextParser().parse(`<font color=0x45df34>${generalNum}</font>`)

        let skillNum:number = GlobalFun.getCardsFromType(CardType.special_skill,false).length;
        this.skillLab.textFlow = new egret.HtmlTextParser().parse(`<font color=0x45df34>${skillNum}</font>`)

        let soldiercfgs:CardAttrVo[] = GlobalFun.getCardsFromType(CardType.soldier,false);
        let soldierNum:number = 0;
        soldiercfgs.forEach(cfg=>{
            soldierNum += cfg.ownNum;
        },this)
        this.soldierLab.textFlow = new egret.HtmlTextParser().parse(`<font color=0x45df34>${soldierNum}</font>`)
    }

    close():void {
        for( let i = 0 ; i < this.list_name.length ; i ++ ) {
            this.removeTouchEvent( this[`${this.list_name[i]}_txt`] , this.touchTapHandler );
            this.removeTouchEvent( this[`${this.list_name[i]}_bg`] , this.touchTapHandler );
        }
        this.removeTouchEvent( this.back_btn , this.touchTapHandler );
        MessageManager.inst().removeListener( CustomEvt.TOUCH_CARD , this.touchCardHandler , this );
        MessageManager.inst().removeListener("refreshItemCard",this.refreshCard,this);
    }

    private init():void {
        this.view_group.verticalCenter = -700;
        egret.Tween.get( this.view_group )
        .to( {verticalCenter:0},600,egret.Ease.circOut );
        this.adapter();
        this.select_list( 0 );
        this.listInit();
        this.soldierInit();
    }

    private soldierInit():void {
        for( let i = 0 ; i < 3 ; i ++ ) {
            this[ `soldier_${i}` ].text = `${this.soldier_name[i]}：${GameApp[ `soldier${i + 1}Num` ]}`;
        }
    }

    private touchTapHandler( e:egret.TouchEvent ):void {
        for( let i = 0 ; i < this.list_name.length ; i ++ ) {
            if( e.target == this[`${this.list_name[i]}_txt`] ||
             e.target == this[`${this.list_name[i]}_bg`]) {
                this.select_list( i );
            }
        }
        switch( e.target ){
            case this.back_btn:
                egret.Tween.get(this.view_group).to({verticalCenter:-700},600,egret.Ease.circOut).call(()=>{
                    egret.Tween.removeTweens(this.view_group);
                    ViewManager.inst().close(CardView);
                },this)
                break;
        }
    }

    private listInit():void{
        let type = [
            CardType.general , CardType.special_skill , CardType.soldier
        ]
        for( let j = 0 ; j < 3 ; j ++ ) {
            let length = GlobalFun.getCardsFromType( type[j] , false ).length;
            // if( j == 2 ) {
            //     length = 3;
            // }
            for( let i = 0 ; i < length ; i ++ ) {
                let card = new CardItem( type[j] , i );
                let interval_y = (this[ `${this.list_name[j]}_scroller` ].height - card.height * 2) / 3;
                let interval_x = (this[ `${this.list_name[j]}_scroller` ].width - card.width * 6) / 7;
                card.y = interval_y + (i % 2) * ( card.height + interval_y );
                card.x = interval_x + Math.floor( i / 2 ) * ( card.width + interval_x );
                this[ `${this.list_name[j]}_group` ].addChild( card );
            }
        }
        
    }
    private refreshCard(evt:CustomEvt):void{
        for(let i:number = 0;i<this["wujiang_group"].numChildren;i++){
            let cardItem:CardItem = this["wujiang_group"].getChildAt(i);
            if(!!cardItem){
                cardItem.refreshGeneralData(evt.data.id)
            }
        }
    }
    private touchCardHandler( e:CustomEvt ):void {
        MessageManager.inst().dispatch(LocalStorageEnum.CLOSE_CARDINFO, this);
        let cardInfo = new CardInfo( e.data.type , e.data.id , e.data.insid);
        this.addChild( cardInfo );
    }

    private select_list( id: number ):void {
        for( let i = 0 ; i < this.list_name.length ; i ++ ) {
            this[`${this.list_name[i]}_bg`].source = `card_btn_off_png`;
            this[`${this.list_name[i]}_txt`].source = `card_select_txt_${i}_1_png`;
            this[ `${this.list_name[i]}_scroller` ].visible = false;
        }
        this[`${this.list_name[id]}_bg`].source = `card_btn_on_png`;
        this[`${this.list_name[id]}_txt`].source = `card_select_txt_${id}_0_png`;
        this[`${this.list_name[id]}_scroller`].visible = true;
    }

    private adapter():void {
        let scale = this.stage.stageWidth / 1334;
        // this.select_group.scaleX = this.select_group.scaleY = scale;
        this.view_group.scaleX = this.view_group.scaleY = scale;
    }
}
ViewManager.inst().reg( CardView , LayerManager.UI_Pop );